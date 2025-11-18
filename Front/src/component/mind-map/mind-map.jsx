import React, { useEffect, useRef, useState } from "react";
import "./mind-map.css";

const getGoals = async () => {
  const res = await fetch("http://localhost:4000/goals", {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Failed to fetch goals");
  return res.json();
};

const getGoalById = async (id) => {
  if (!id) return null;
  const res = await fetch(`http://localhost:4000/goals/${id}`, {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) return null;
  return res.json();
};

const swapMindOrder = async (taskA, taskB) => {
  try {
    // جا‌به‌جایی در بک‌اند
    await fetch(`http://localhost:4000/goals/swap-mindorder`, {
      method: "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ idA: taskA._id, idB: taskB._id }),
    });
  } catch (err) {
    console.error("Failed to update mindOrder:", err);
  }
};

function Task({
  task,
  pos,
  isDone,
  displayTitle,
  toggleTask,
  onSelect,
  isSelected,
}) {
  const style = {
    left: pos.x,
    top: pos.y,
  };

  return (
    <div
      className={`task ${isDone ? "task-done" : "task-not"} ${
        isSelected ? "selected" : ""
      }`}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(task._id);
      }}
      onDoubleClick={() => toggleTask(task._id)} // دو کلیک = تغییر وضعیت
    >
      {displayTitle}
    </div>
  );
}

function MindMap() {
  const spacingX = 140;
  const spacingY = 100;
  const containerRef = useRef(null);

  const [tasks, setTasks] = useState([]);
  const [positions, setPositions] = useState([]);
  const [titlesMap, setTitlesMap] = useState({});
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const moveTask = async (direction) => {
    if (!selectedTaskId) return;

    const index = tasks.findIndex((t) => t._id === selectedTaskId);
    if (index === -1) return;

    const newTasks = [...tasks];

    // پایین بردن (با قبلی عوض کن)
    if (direction === "lower" && index > 0) {
      [newTasks[index - 1], newTasks[index]] = [
        newTasks[index],
        newTasks[index - 1],
      ];
      setTasks(newTasks);
      await swapMindOrder(newTasks[index], newTasks[index - 1]);
    }

    // بالا بردن (با بعدی عوض کن)
    if (direction === "higher" && index < tasks.length - 1) {
      [newTasks[index + 1], newTasks[index]] = [
        newTasks[index],
        newTasks[index + 1],
      ];
      setTasks(newTasks);
      await swapMindOrder(newTasks[index], newTasks[index + 1]);
    }
  };

  // بارگذاری تسک‌ها
  useEffect(() => {
    getGoals()
      .then((data) => {
        const parentMap = new Set(
          data.map((g) => g.parentId?.toString()).filter(Boolean)
        );
        const leafGoals = data.filter((g) => !parentMap.has(g._id.toString()));

        // 🔹 مرتب‌سازی بر اساس mindOrder (اگر مقدارش وجود نداشت، به انتها بره)
        leafGoals.sort((a, b) => (a.mindOrder ?? 9999) - (b.mindOrder ?? 9999));

        setTasks(leafGoals);
      })
      .catch((err) => console.error(err));
  }, []);

  // گرفتن عنوان‌ها فقط عنوان هر تسک (بدون لایه‌بندی)
  useEffect(() => {
    if (tasks.length === 0) return;
    const titlesMapTemp = {};
    tasks.forEach((task) => {
      titlesMapTemp[task._id] = task.title;
    });
    setTitlesMap(titlesMapTemp);
  }, [tasks]);

  // تغییر وضعیت تسک
  const toggleTask = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/goals/${id}/toggle`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to toggle goal");

      const updatedGoal = await res.json();
      setTasks((prev) =>
        prev.map((task) => (task._id === updatedGoal._id ? updatedGoal : task))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // محاسبه موقعیت‌ها
  useEffect(() => {
    if (tasks.length === 0) return;
    const containerWidth = containerRef.current?.clientWidth || 800;
    const columns = Math.floor(containerWidth / spacingX);

    const result = [];
    let row = 0;
    let direction = 1;

    for (let i = 0; i < tasks.length; ) {
      const remaining = tasks.length - i;
      const rowCount = Math.min(columns, remaining);

      for (let j = 0; j < rowCount; j++) {
        let col;
        if (direction === 1) {
          col = j;
        } else {
          col = columns - rowCount + (rowCount - 1 - j);
        }
        result.push({
          x: col * spacingX + spacingX / 2,
          y: row * spacingY + spacingY / 2,
        });
        i++;
      }
      row++;
      direction *= -1;
    }
    setPositions(result);
  }, [tasks]);

  return (
    <>
      <div className="controls">
        <button onClick={() => moveTask("lower")}>lower</button>
        <button onClick={() => moveTask("higher")}>higher</button>
        <button>Done</button>
        <button>Ongoing</button>
      </div>

      <div className="mind-map-container" ref={containerRef}>
        <svg className="lines">
          {positions.map((pos, index) => {
            if (index === 0) return null;
            const prev = positions[index - 1];
            return (
              <line
                key={index}
                x1={prev.x}
                y1={prev.y}
                x2={pos.x}
                y2={pos.y}
                stroke="var(--second)"
                strokeWidth="2"
              />
            );
          })}
        </svg>

        {positions.map((pos, index) => {
          const task = tasks[index];
          const isDone = task?.status === "done";
          const displayTitle =
            titlesMap[task._id] || task.title || "بدون عنوان";

          return (
            <Task
              key={task?._id}
              task={task}
              pos={pos}
              isDone={isDone}
              displayTitle={displayTitle}
              toggleTask={toggleTask}
              onSelect={setSelectedTaskId}
              isSelected={selectedTaskId === task._id}
            />
          );
        })}
      </div>
    </>
  );
}

export default MindMap;
