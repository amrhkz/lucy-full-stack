import React from "react";
import ReactFlow, { Background, Controls, MiniMap } from "reactflow";
import "reactflow/dist/style.css";
import "@/component/mind-map/mind-tab/mind-tab.css"

const initialNodes = [
  { id: "1", position: { x: 100, y: 0 }, data: { label: "Start Here" } },
  { id: "2", position: { x: 200, y: 100 }, data: { label: "Step 1" } },
  { id: "3", position: { x: 0, y: 100 }, data: { label: "Step 2" } },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e1-3", source: "1", target: "3", animated: true },
];

const Roadmap = () => {
  return (
    <div style={{ width: "100%", height: "600px" }}>
      <ReactFlow
        nodes={initialNodes}
        edges={initialEdges}
        fitView
        style={{ background: "#f0f2f5" }}
      >
        <MiniMap />
        <Controls />
        <Background color="#888" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default Roadmap;
