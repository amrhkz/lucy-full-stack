import React from "react";
import "@/component/loading/goal-loading/goal-loading.css";

function GoalLoading() {
  return (
    <div className="goal-loading-list">
      <div className="skeleton goal-loading"></div>
      <div className="skeleton goal-loading"></div>
      <div className="skeleton goal-loading"></div>
    </div>
  );
}

export default GoalLoading;
