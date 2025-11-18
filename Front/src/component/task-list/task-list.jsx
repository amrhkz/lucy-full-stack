import "./task-list.css";
import React, { Suspense } from "react";
import AddTaskButton from "./add-task-button/add-task-button";
import DeleteTask from "./delete-task/delete-task";
import { calTaskProg } from "@/lib/action";

const getTask = async () => {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong!");
  }
  return res.json();
};

const TaskList = async (props) => {
  const tasks = await getTask();
  return (
    <>
      <div className="task-list">
        {tasks
          .filter((task) => task.parentId === props.parentId)
          .map((task) => (
            <div className="task" key={task._id}>
              <div className="task-row">
                <div className="title">{task.title}</div>
                <i
                  className={`bx ${
                    task.done == "not" ? "bx-checkbox" : "bxs-checkbox-checked"
                  } bx-sm`}
                ></i>
              </div>
              <div className="edit-menu">
                <DeleteTask
                  id={task._id}
                  parentId={props.parentId}
                  parentSlug={props.slug}
                />
                <i className="bx bxs-pencil bx-xs"></i>
              </div>
            </div>
          ))}
        <AddTaskButton parentId={props.parentId} parentSlug={props.slug} />
      </div>
    </>
  );
};

export default TaskList;
