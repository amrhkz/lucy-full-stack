// component/tree-chart/edges-div.jsx
"use client";
import React from "react";

export function EdgesDiv({
  positions,
  collapsedNodes,
  findNodeById,
  offset,
  scale,
}) {
  const edges = [];

  positions.forEach((node) => {
    if (!collapsedNodes.has(node.id)) {
      node.children.forEach((child) => {
        const childPos = findNodeById(child.id);
        if (childPos) {
          edges.push({
            from: { x: node.x, y: node.y },
            to: { x: childPos.x, y: childPos.y },
          });
        }
      });
    }
  });

  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0, // خطوط پشت نودها باشن
        pointerEvents: "none", // موس از خطوط رد بشه
        transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
        transformOrigin: "0 0",
      }}
    >
      {edges.map((edge, i) => {
        const midX = edge.from.x + (edge.to.x - edge.from.x) / 2;

        return (
          <React.Fragment key={i}>
            {/* خط افقی از والد تا وسط */}
            <div
              style={{
                position: "absolute",
                left: Math.min(edge.from.x, midX),
                top: edge.from.y,
                width: Math.abs(midX - edge.from.x),
                height: 2,
                backgroundColor: "#666",
              }}
            />
            {/* خط عمودی از y والد تا y فرزند */}
            <div
              style={{
                position: "absolute",
                left: midX,
                top: Math.min(edge.from.y, edge.to.y),
                width: 2,
                height: Math.abs(edge.to.y - edge.from.y),
                backgroundColor: "#666",
              }}
            />
            {/* خط افقی از وسط تا فرزند */}
            <div
              style={{
                position: "absolute",
                left: Math.min(midX, edge.to.x),
                top: edge.to.y,
                width: Math.abs(edge.to.x - midX),
                height: 2,
                backgroundColor: "#666",
              }}
            />
          </React.Fragment>
        );
      })}
    </div>
  );
}
