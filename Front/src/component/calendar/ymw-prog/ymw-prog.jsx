import React, { useEffect, useState } from "react";
import "./ymw-prog.css";
import { isSameDay } from "date-fns";

// گرفتن عادت‌ها
const getHabits = async () => {
  const res = await fetch("http://localhost:3000/api/habits", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Error Getting Habits!");
  }
  return res.json();
};

function YmwProg() {
  const [progress, setProgress] = useState(0);
  const [title, setTitle] = useState("پیشرفت روزانه");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const habits = await getHabits();
        const now = new Date();

        let totalPercent = 0;
        let totalHabits = 0;

        habits.forEach((habit) => {
          let habitProgress = 0;

          if (habit.habitType === "simple") {
            const isDoneToday = habit.dates.some((d) =>
              isSameDay(now, new Date(d))
            );
            habitProgress = isDoneToday ? 100 : 0;
          } else if (habit.habitType === "multi") {
            // فیلتر کردن فقط آیتم‌های امروز
            const todayEntries = habit.multiDates.filter((entry) =>
              isSameDay(now, new Date(entry.date))
            );

            // استخراج indexهای یکتا
            const uniqueIndexes = new Set(
              todayEntries.map((entry) => entry.index)
            );

            // محاسبه درصد
            const target = habit.count || 1; // count همون target هست
            habitProgress = Math.min((uniqueIndexes.size / target) * 100, 100);
          }

          totalPercent += habitProgress;
          totalHabits += 1;
        });

        const avgProgress =
          totalHabits > 0 ? (totalPercent / totalHabits).toFixed(1) : 0;

        setProgress(avgProgress);
        setTitle("Daily");
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="prog-field daily">
      <div className="top">
        <div className="title">{title}</div>
        <div className="prog-percent">{progress}%</div>
      </div>
      <div className="prog">
        <div className="prog-bar">
          <div className="prog-navar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    </div>
  );
}

export default YmwProg;
