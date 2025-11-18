"use client";
import React, { useState, useEffect } from "react";
import "@/component/top-tasks/top-tasks.css";
import SoloTask from "./solo-task/solo-task";
import ComplexTask from "./complex-task/complex-task";
import { updateTaskStatus } from "@/lib/action"; // ایمپورت اکشن

const getTask = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const res = await fetch("http://localhost:3000/api/tasks", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong!");
  }
  return res.json();
};

const TopTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasksData = await getTask();
      setTasks(tasksData);
    };

    fetchTasks();
  }, []);

  const handleTaskCompletion = async (taskId) => {
    // آپدیت وضعیت در دیتابیس به "done"
    await updateTaskStatus(taskId, "done");

    // آپدیت محلی برای حذف تسک از لیست
    const updatedTasks = tasks.map((task) =>
      task._id === taskId ? { ...task, done: "done" } : task
    );
    setTasks(updatedTasks.filter((task) => task.done === "not"));
  };

  return (
    <div className="top-tasks">
      {tasks
        .filter((task) => task.done === "not") // فقط تسک‌های انجام‌نشده نمایش داده می‌شوند
        .slice(0, 3) // فقط ۳ تسک اول نمایش داده می‌شوند
        .map((task) =>
          task.taskType === "solo" ? (
            <div onClick={() => handleTaskCompletion(task._id)} key={task._id}>
              <SoloTask title={task.title} />
            </div>
          ) : task.taskType === "complex" ? (
            <ComplexTask
              title={task.title}
              target={task.target}
              initialProgress={task.progress}
              taskId={task._id} // ارسال taskId به ComplexTask
              key={task._id}
              onTaskComplete={() => handleTaskCompletion(task._id)}
            />
          ) : null
        )}
    </div>
  );
};

export default TopTasks;
