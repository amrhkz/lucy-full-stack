"use client";

import React, { useState } from "react";
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  Handle,
  Position,
} from "reactflow";
import "reactflow/dist/style.css";
import "./radar-chart.css";

const CustomNode = ({ data }) => {
  return (
    <div className={`chart-node ${data.isParent ? "parent-node" : "child-node"}`}>
      {data.label}
      {data.isParent && <Handle type="source" position={Position.Bottom} />}
      {!data.isParent && (
        <Handle type="target" position={data.handlePosition || Position.Top} />
      )}
    </div>
  );
};


const nodeTypes = { custom: CustomNode };

const StudyFlowChart = () => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [hasMainNode, setHasMainNode] = useState(false);
  const [childCount, setChildCount] = useState(0);

  const centerX = 300;
  const centerY = 300;
  const radius = 180;

  // اضافه کردن نود اصلی
  const addMainNode = () => {
    if (hasMainNode) return;
    const newNode = {
      id: "1",
      type: "custom",
      position: { x: centerX, y: centerY },
      data: { label: "موضوع اصلی", isParent: true },
    };
    setNodes([newNode]);
    setHasMainNode(true);
  };

  // اضافه کردن نودهای فرزند با چیدمان دایره‌ای
  const addChildNode = () => {
    const newIndex = childCount + 1; // به روزرسانی شمارش نود جدید
    const angle = (newIndex * (360 / (childCount + 1))) * (Math.PI / 180); // محاسبه زاویه
    const x = centerX + (radius + 50) * Math.cos(angle); // موقعیت X (اضافه کردن فاصله)
    const y = centerY + (radius + 50) * Math.sin(angle); // موقعیت Y (اضافه کردن فاصله)
    const nodeId = `${newIndex + 1}`; // به‌روزرسانی ID نود
  
    // محاسبه نزدیک‌ترین نقطه اتصال
    let handlePosition = Position.Top; // پیش‌فرض
    if (angle >= -Math.PI / 4 && angle < Math.PI / 4) {
      handlePosition = Position.Right; // راست
    } else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) {
      handlePosition = Position.Top; // بالا
    } else if (angle >= (3 * Math.PI) / 4 || angle < -(3 * Math.PI) / 4) {
      handlePosition = Position.Left; // چپ
    } else {
      handlePosition = Position.Bottom; // پایین
    }
  
    const newNode = {
      id: nodeId,
      type: "custom",
      position: { x, y },
      data: { label: `بخش ${newIndex}`, isParent: false, handlePosition },
    };
  
    const newEdge = {
      id: `e1-${nodeId}`,
      source: "1",
      target: nodeId,
      style: { stroke: "#007bff", strokeWidth: 2 },
      markerEnd: { type: "arrowclosed" },
    };
  
    // اضافه کردن نود جدید به لیست
    setNodes((prev) => [...prev, newNode]);
    setEdges((prev) => [...prev, newEdge]);
    setChildCount(newIndex); // بروزرسانی شمارش نودها
  };  
  

  return (
    <div className="spider-chart">
      {!hasMainNode ? (
        <button className="add-main-btn" onClick={addMainNode}>
          اضافه کردن موضوع اصلی
        </button>
      ) : (
        <button className="add-child-btn" onClick={addChildNode}>
          اضافه کردن نود فرزند
        </button>
      )}
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes}>
        <Background />
      </ReactFlow>
    </div>
  );
};

export default StudyFlowChart;
