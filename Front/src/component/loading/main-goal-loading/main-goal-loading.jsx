import React from "react";
import "@/component/loading/main-goal-loading/main-goal-loading.css"

function MainGoalLoading() {
  return (
    <div className="main-goal-loading-list">
      <div className="skeleton main-goal-loading"></div>
      <div className="skeleton main-goal-loading"></div>
      <div className="skeleton main-goal-loading"></div>
      <div className="skeleton main-goal-loading"></div>
    </div>
  );
}

export default MainGoalLoading;
