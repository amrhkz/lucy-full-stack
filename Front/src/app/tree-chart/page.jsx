"use client";
import Container from "@/component/container/container";
import React, { useEffect, useState, useRef } from "react";
import "./tree-chart.css";
import { Controls } from "@/component/tree-chart/controls";
import { EdgesDiv } from "@/component/tree-chart/edges";
import { NodeDiv } from "@/component/tree-chart/node";

function Page() {
  const [treeData, setTreeData] = useState([]);
  const [collapsedNodes, setCollapsedNodes] = useState(new Set());
  const [selectedNodeId, setSelectedNodeId] = useState(null);

  // pan & zoom state
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const lastPos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const [editingNodeId, setEditingNodeId] = useState(null);

  // گرفتن داده‌ها
  const fetchData = async () => {
    const res = await fetch("http://localhost:4000/goals/tree", {
      credentials: "include",
    });

    const data = await res.json();

    const formatData = (node) => ({
      id: node.id,
      title: node.title,
      collapsed: node.collapsed || false,
      children: node.children?.map(formatData) || [],
    });

    setTreeData(data.map(formatData));

    // 👇 استخراج نودهای بسته از دیتابیس
    const collapsedIds = new Set();
    data.forEach((root) => {
      const collectCollapsed = (node) => {
        if (node.collapsed) collapsedIds.add(node.id);
        node.children.forEach(collectCollapsed);
      };
      collectCollapsed(root);
    });
    setCollapsedNodes(collapsedIds);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedNodeId || editingNodeId) return;

      switch (e.key) {
        case "Tab":
          e.preventDefault();
          addChild();
          break;
        case "Enter":
          e.preventDefault();
          addSibling();
          break;
        case "Delete":
          e.preventDefault();
          deleteNode();
          break;
        case "ArrowUp":
          e.preventDefault();
          reorderNode("up");
          break;
        case "ArrowDown":
          e.preventDefault();
          reorderNode("down");
          break;
        case "ArrowLeft":
          e.preventDefault();
          liftNode();
          break;
        case "ArrowRight":
          e.preventDefault();
          sinkNode();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedNodeId, editingNodeId]);

  const toggleNode = (id) => {
    setCollapsedNodes((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) newSet.delete(id);
      else newSet.add(id);
      return newSet;
    });
    setSelectedNodeId(id);
  };

  const layoutTree = (nodes, depth = 0, yStart = 0) => {
    let positions = [];
    let y = yStart;

    nodes.forEach((node) => {
      // اگر بچه داره و بسته نیست
      if (!collapsedNodes.has(node.id) && node.children.length > 0) {
        const childPositions = layoutTree(node.children, depth + 1, y);
        positions.push(...childPositions);

        // به جای استفاده از first و last، میانگین درست رو حساب کن
        const minY = Math.min(...childPositions.map((p) => p.y));
        const maxY = Math.max(...childPositions.map((p) => p.y));
        const parentY = (minY + maxY) / 2;

        positions.push({ ...node, x: depth * 220 + 100, y: parentY });

        // برو به پایین‌ترین نقطه‌ی subtree
        y = maxY + 100;
      } else {
        positions.push({ ...node, x: depth * 220 + 100, y });
        y += 100;
      }
    });

    return positions;
  };

  let positions = layoutTree(treeData);

  const findNodeById = (id) => positions.find((n) => n.id === id);

  const findParent = (nodes, id, parent = null) => {
    for (const node of nodes) {
      if (node.id === id) return parent;
      const found = findParent(node.children, id, node);
      if (found) return found;
    }
    return null;
  };

  const saveNode = async (parentId, title, isSibling = false) => {
    try {
      const res = await fetch("http://localhost:4000/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentId, title, isSibling }),
        credentials: "include",
      });

      const data = await res.json();
      await fetchData();

      if (!isSibling && parentId) {
        // مطمئن شو که والد باز باشه
        setCollapsedNodes((prev) => {
          const newSet = new Set(prev);
          newSet.delete(parentId);
          return newSet;
        });
      }

      setSelectedNodeId(data.id);
    } catch (error) {
      console.error("خطا در ارسال به بک‌اند:", error);
    }
  };

  const addSibling = () => {
    if (!selectedNodeId) return;
    const parent = findParent(treeData, selectedNodeId);
    saveNode(parent ? parent.id : null, "Sibling Node", true);
  };

  const addChild = () => {
    if (!selectedNodeId) return;
    saveNode(selectedNodeId, "Child Node", false);
  };

  // Pan handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const dx = e.clientX - lastPos.current.x;
    const dy = e.clientY - lastPos.current.y;
    setOffset((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
    lastPos.current = { x: e.clientX, y: e.clientY };
  };

  const handleMouseUp = () => setIsDragging(false);

  // Zoom handler (centered on mouse)
  const handleWheel = (e) => {
    e.preventDefault();
    const zoomIntensity = 0.1;
    const rect = containerRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - offset.x) / scale;
    const worldY = (mouseY - offset.y) / scale;

    const newScale = Math.min(
      Math.max(scale - e.deltaY * zoomIntensity * 0.01, 0.2),
      3
    );

    setOffset({
      x: mouseX - worldX * newScale,
      y: mouseY - worldY * newScale,
    });
    setScale(newScale);
  };

  const deleteNode = async () => {
    if (!selectedNodeId) return;
    try {
      await fetch(`http://localhost:4000/goals/${selectedNodeId}`, {
        method: "DELETE",
        credentials: "include",
      });

      await fetchData();
      setSelectedNodeId(null); // چون حذف شده دیگه نباید انتخاب باشه
    } catch (error) {
      console.error("خطا در حذف نود:", error);
    }
  };

  const updateNodeTitle = async (id, newTitle) => {
    try {
      await fetch(`http://localhost:4000/goals/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
        credentials: "include",
      });

      await fetchData();
    } catch (error) {
      console.error("خطا در آپدیت عنوان:", error);
    }
  };

  const handleNodeClick = (nodeId) => {
    if (selectedNodeId === nodeId) {
      // کلیک دوم → حالت تایپ
      setEditingNodeId(nodeId);
    } else {
      // کلیک اول → فقط انتخاب
      setSelectedNodeId(nodeId);
      setEditingNodeId(null);
    }
  };

  const reorderNode = async (direction) => {
    if (!selectedNodeId) return;

    try {
      await fetch(`http://localhost:4000/goals/${selectedNodeId}/order`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
        credentials: "include",
      });

      await fetchData();
    } catch (error) {
      console.error("خطا در تغییر ترتیب:", error);
    }
  };

  const liftNode = async () => {
    if (!selectedNodeId) return;
    try {
      await fetch(`http://localhost:4000/goals/${selectedNodeId}/lift`, {
        method: "PUT",
        credentials: "include",
      });

      await fetchData();
    } catch (error) {
      console.error("خطا در انتقال نود به سطح بالاتر:", error);
    }
  };

  const sinkNode = async () => {
    if (!selectedNodeId) return;
    try {
      await fetch(`http://localhost:4000/goals/${selectedNodeId}/sink`, {
        method: "PUT",
        credentials: "include",
      });

      await fetchData();
    } catch (error) {
      console.error("خطا در انتقال نود به سطح پایین‌تر:", error);
    }
  };

  return (
    <Container>
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: "100vh",
          overflow: "hidden",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onClick={(e) => {
          // جلوگیری از لغو شدن انتخاب وقتی روی نود کلیک شد
          if (e.target.closest(".node")) return;
          setSelectedNodeId(null);
          setEditingNodeId(null);
        }}
      >
        <EdgesDiv
          positions={positions}
          collapsedNodes={collapsedNodes}
          findNodeById={findNodeById}
          offset={offset}
          scale={scale}
        />

        {positions.map((node) => (
          <NodeDiv
            key={node.id}
            node={node}
            selected={selectedNodeId === node.id}
            offset={offset}
            scale={scale}
            isRoot={node.id === "dream-list-root"}
            editingNodeId={editingNodeId}
            setEditingNodeId={setEditingNodeId}
            collapsedNodes={collapsedNodes}
            onClick={handleNodeClick}
            onToggle={async (id) => {
              setCollapsedNodes((prev) => {
                const newSet = new Set(prev);
                newSet.has(id) ? newSet.delete(id) : newSet.add(id);
                return newSet;
              });
              try {
                await fetch(`http://localhost:4000/goals/${id}/collapse`, {
                  method: "PUT",
                  credentials: "include",
                });
              } catch (error) {
                console.error("خطا در toggle collapse:", error);
              }
            }}
            onUpdate={async (id, newTitle) => {
              await fetch(`http://localhost:4000/goals/${id}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title: newTitle }),
              });
              await fetchData();
            }}
          />
        ))}

        <Controls
          onAddSibling={addSibling}
          onAddChild={addChild}
          onDelete={deleteNode}
          onOrderUp={() => reorderNode("up")}
          onOrderDown={() => reorderNode("down")}
          onLift={liftNode}
          onSink={sinkNode}
          disabled={!selectedNodeId}
        />
      </div>
    </Container>
  );
}

export default Page;
