import React from "react";
import "@/component/loading/task-loading/task-loading.css";

function TaskLoading() {
  return (
    <div className="task-loading-list">
      <div className="skeleton task-loading"></div>
      <div className="skeleton task-loading"></div>
      <div className="skeleton task-loading"></div>
    </div>
  );
}

export default TaskLoading;
