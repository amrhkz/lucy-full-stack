import React, { useState } from "react";
import "@/component/top-tasks/complex-task/complex-task.css";
import { updateTaskProgress } from "@/lib/action"; // ایمپورت اکشن

function ComplexTask({
  title,
  target,
  initialProgress,
  taskId,
  onTaskComplete,
}) {
  const [progress, setProgress] = useState(initialProgress);

  const handleClick = async () => {
    const updatedProgress = progress + 1;

    // اگر به هدف رسید، تسک تکمیل می‌شود
    if (updatedProgress >= target) {
      onTaskComplete();
    } else {
      setProgress(updatedProgress);

      // آپدیت مقدار progress در دیتابیس
      await updateTaskProgress(taskId, updatedProgress);
    }
  };

  return (
    <div className="complex-task" onClick={handleClick}>
      <div className="task-title">{title}</div>
      <div className="task-prog-num">
        {progress} / {target}
      </div>
      <div className="task-prog">
        <div
          className="prog-bar"
          style={{ width: `${(progress / target) * 100}%` }}
        ></div>
      </div>
    </div>
  );
}

export default ComplexTask;
