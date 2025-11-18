"use client";
import React, { useState, useEffect } from "react";
import "@/component/daily-card/daily-card.css";
import CircularProgress from "./circular-progress/circular-progress";

// تابع برای ذخیره تسک‌ها در Local Storage
const saveTasksToLocalStorage = (tasks) => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("lastSavedDate", new Date().toLocaleDateString());
};

// تابع برای بازیابی تسک‌ها از Local Storage
const loadTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem("tasks");
  const lastSavedDate = localStorage.getItem("lastSavedDate");
  const currentDate = new Date().toLocaleDateString();

  if (lastSavedDate !== currentDate) {
    // اگر تاریخ ذخیره‌شده با تاریخ جاری متفاوت است، یعنی روز جدید شروع شده و باید لیست‌ها ریست شوند
    return null;
  }
  return tasks ? JSON.parse(tasks) : null;
};


function DailyCard() {
  // لیست اولیه تسک‌ها
  const initialTasks = [
    { id: 1, title: "نماز صبح", isCompleted: false },
    { id: 2, title: "نماز ظهر", isCompleted: false },
    { id: 3, title: "نماز عصر", isCompleted: false },
    { id: 4, title: "نماز مغرب", isCompleted: false },
    { id: 5, title: "نماز عشاء", isCompleted: false },
    { id: 6, title: "Platiner 30'", isCompleted: false },
    { id: 7, title: "45' Focus Work + Tea", isCompleted: false },
    { id: 8, title: "Platiner 30'", isCompleted: false },
    { id: 9, title: "45' Focus Work + Tea", isCompleted: false },
  ];

  // استفاده از Local Storage برای بازیابی یا تنظیم تسک‌های اولیه
  const [tasks, setTasks] = useState(
    loadTasksFromLocalStorage() || initialTasks
  );

  // حالت برای باز و بسته بودن لیست‌ها
  const [showIncompleteTasks, setShowIncompleteTasks] = useState(true);
  const [showCompletedTasks, setShowCompletedTasks] = useState(false);
  const [showMore, setShowMore] = useState(false); // حالت برای نمایش تسک‌های بیشتر

  // ذخیره‌سازی در Local Storage هر بار که تسک‌ها تغییر می‌کنند
  useEffect(() => {
    saveTasksToLocalStorage(tasks);
  }, [tasks]);

  const incompleteTasks = tasks.filter((task) => !task.isCompleted);
  const completedTasks = tasks.filter((task) => task.isCompleted);

  // تابع برای تغییر وضعیت تسک و انتقال آن بین دو لیست
  const handleTaskClick = (taskId, isCompleted) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !isCompleted } : task
    );
    setTasks(updatedTasks);
  };

  // محاسبه درصد پیشرفت بر اساس تعداد تسک‌های انجام‌شده
  const progress = ((completedTasks.length / tasks.length) * 100).toFixed(0);

  // تابع برای تغییر نمایش تسک‌های بیشتر
  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  return (
    <div className="daily-card">
      <div className="card-header">
        <div className="date">{new Date().toLocaleDateString("fa-IR")}</div>
        <CircularProgress progress={progress} />
      </div>

      {/* بخش لیست تسک‌های انجام‌نشده */}
      <div className="toggle" onClick={toggleShowMore}>
        <h3>Incomplete Tasks</h3>
        <i className={`bx bx-chevron-${showMore ? "up" : "down"} bx-sm`}></i>
      </div>

      {showIncompleteTasks && (
        <div className="tasks-list">
          {incompleteTasks.slice(0, 3).map((task, index) => (
            <div
              key={task.id}
              className="task-item"
              onClick={() => handleTaskClick(task.id, false)} // کلیک روی تسک برای تغییر وضعیت
            >
              <div className="task-num">{index + 1}.</div>
              <div className="task-title">{task.title}</div>
              <div className="check-box">
                <i className="bx bx-checkbox bx-sm"></i>
              </div>
            </div>
          ))}

          {/* نمایش تسک‌های اضافی در صورت باز شدن */}
          {showMore &&
            incompleteTasks.slice(3).map((task, index) => (
              <div
                key={task.id}
                className="task-item"
                onClick={() => handleTaskClick(task.id, false)}
              >
                <div className="task-num">{index + 4}.</div>
                <div className="task-title">{task.title}</div>
                <div className="check-box">
                  <i className="bx bx-checkbox bx-sm"></i>
                </div>
              </div>
            ))}
        </div>
      )}

      {/* بخش لیست تسک‌های انجام‌شده */}
      <div
        className="toggle"
        onClick={() => setShowCompletedTasks(!showCompletedTasks)}
      >
        <h3>Completed Tasks</h3>
        <i
          className={`bx bx-chevron-${
            showCompletedTasks ? "up" : "down"
          } bx-sm`}
        ></i>
      </div>

      {showCompletedTasks && (
        <div className="done-task-list">
          {completedTasks.map((task, index) => (
            <div
              key={task.id}
              className="task-item completed"
              onClick={() => handleTaskClick(task.id, true)} // کلیک روی تسک انجام‌شده برای بازگرداندن به لیست انجام‌نشده
            >
              <div className="task-num">{index + 1}.</div>
              <div className="task-title">{task.title}</div>
              <div className="check-box">
                <i className="bx bxs-checkbox-checked bx-sm"></i>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DailyCard;
