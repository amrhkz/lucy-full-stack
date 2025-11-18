import "./mind-tasks.css";
import React from "react";

const getTask = async () => {
  const res = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong!");
  }
  return res.json();
};

const MindTasks = async (props) => {
  const tasks = await getTask();
  return (
    <>
      <div className="mind-task-list">
        {tasks
          .map((task) => (
            <div className="mind-task" key={task._id}>
              <div className="task-row">
                <div className="title">{task.title}</div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default MindTasks;
