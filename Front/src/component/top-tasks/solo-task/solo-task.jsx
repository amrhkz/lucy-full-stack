import React from "react";
import "@/component/top-tasks/solo-task/solo-task.css";

function SoloTask(props) {
  return (
    <div className="solo-task">
      <div className="task-title">{props.title}</div>
      <div className="check-box">
        <i className="bx bx-checkbox bx-sm"></i>
      </div>
    </div>
  );
}

export default SoloTask;
