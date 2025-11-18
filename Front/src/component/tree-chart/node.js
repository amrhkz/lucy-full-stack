import { useEffect, useRef, useState } from "react";

export function NodeDiv({
  node,
  selected,
  offset,
  scale,
  isRoot,
  onClick,
  onToggle,
  collapsedNodes,
  editingNodeId,
  setEditingNodeId,
  onUpdate,
}) {
  const [title, setTitle] = useState(node.title);
  const inputRef = useRef(null);
  const isEditing = editingNodeId === node.id;
  const isCollapsed = collapsedNodes.has(node.id);

  useEffect(() => setTitle(node.title), [node.title]);
  useEffect(() => {
    if (isEditing && inputRef.current) inputRef.current.focus();
  }, [isEditing]);

  const finishEditing = () => {
    if (title.trim() && title !== node.title) {
      onUpdate(node.id, title.trim());
    }
    setEditingNodeId(null);
  };

  return (
    <div
      className={`node ${selected ? "selected" : ""} ${
        isCollapsed ? "collapsed" : ""
      }`}
      style={{
        position: "absolute",
        left: node.x * scale + offset.x,
        top: node.y * scale + offset.y,
        transform: `translate(-50%, -50%) scale(${scale})`,
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={(e) => {
        // اگر روی آیکون کلیک شد، جلوگیری از انتخاب
        if (e.target.classList.contains("toggle-icon")) return;
        onClick(node.id);
      }}
    >
      {/* آیکن باز/بسته کردن */}
      {node.children.length > 0 && (
        <span
          className="toggle-icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggle(node.id);
          }}
        >
          {isCollapsed ? (
            <span className="child-count">{node.children.length}</span>
          ) : (
            <i className="bx bx-minus"></i>
          )}
        </span>
      )}

      {/* متن یا ورودی ویرایش */}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={finishEditing}
          onKeyDown={(e) => e.key === "Enter" && finishEditing()}
          className="node-input"
        />
      ) : (
        <div className="node-title">{node.title}</div>
      )}

      {isRoot && <div className="root-badge"></div>}
    </div>
  );
}
