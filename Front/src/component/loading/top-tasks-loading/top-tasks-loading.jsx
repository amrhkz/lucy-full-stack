import React from "react";
import "@/component/loading/top-tasks-loading/top-tasks-loading.css";

function TopTasksLoading() {
  return (
    <div className="top-tasks-loading-list">
      <div className="skeleton top-tasks-loading"></div>
      <div className="skeleton top-tasks-loading"></div>
      <div className="skeleton top-tasks-loading"></div>
    </div>
  );
}

export default TopTasksLoading;
