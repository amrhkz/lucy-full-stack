"use client";
import React from "react";

export function ToggleButtons({ positions, collapsedNodes, findNodeById, onToggle }) {
  return (
    <>
      {positions
        .filter((node) => node.children.length > 0)
        .map((node) => {
          const firstChild = findNodeById(node.children[0]?.id);
          if (!firstChild) return null;

          const midX = node.x + (firstChild.x - node.x) / 2;

          return (
            <div
              key={node.id}
              style={{
                position: "absolute",
                left: midX - 10,
                top: node.y - 10,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "white",
                border: "1px solid black",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "14px",
                cursor: "pointer",
                pointerEvents: "auto",
                zIndex: 10,
              }}
              onClick={(e) => {
                e.stopPropagation();
                onToggle(node.id);
              }}
            >
              {collapsedNodes.has(node.id) ? "➕" : "➖"}
            </div>
          );
        })}
    </>
  );
}
