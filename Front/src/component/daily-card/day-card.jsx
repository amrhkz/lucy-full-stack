"use client";
import React, { useState, useEffect } from "react";
import HabitList from "../calendar/habit-list/habit-list";
import { isSameDay } from "date-fns";
import "./day-card.css";
import CircularProgress from "./circular-progress/circular-progress";

const getHabit = async () => {
  const res = await fetch("http://localhost:3000/api/habits", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong!");
  }
  return res.json();
};

function DayCard() {
  const [habits, setHabits] = useState([]);
  const [progress, setProgress] = useState(0);
  const today = new Date();

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const data = await getHabit();
        setHabits(data); // همه عادت‌ها رو نگه می‌داریم

        let total = 0;
        let done = 0;

        data.forEach((habit) => {
          const isMulti = habit.habitType === "multi";
          if (isMulti) {
            const count = habit.count || 1;
            const doneCountToday =
              habit.multiDates?.filter((entry) =>
                isSameDay(new Date(entry.date), today)
              ).length || 0;

            total += count;
            done += Math.min(doneCountToday, count); // بیشتر از مقدار موردنیاز حساب نشه
          } else {
            total += 1;
            const isDone = habit.dates?.some((date) =>
              isSameDay(new Date(date), today)
            );
            if (isDone) done += 1;
          }
        });

        const calculatedProgress = total > 0 ? Math.round((done / total) * 100) : 0;
        setProgress(calculatedProgress);
      } catch (err) {
        console.error("Failed to fetch habits:", err);
      }
    };

    fetchHabits();
  }, []);

  const incompleteHabits = habits.filter((habit) => {
    const isMulti = habit.habitType === "multi";
    if (isMulti) {
      const count = habit.count || 1;
      const doneCountToday =
        habit.multiDates?.filter((entry) =>
          isSameDay(new Date(entry.date), today)
        ).length || 0;
      return doneCountToday < count;
    } else {
      return !habit.dates?.some((date) =>
        isSameDay(new Date(date), today)
      );
    }
  });

  return (
    <div className="day-card">
      <div className="header">
        <div className="date">{today.toLocaleDateString("fa-IR")}</div>
        <CircularProgress progress={progress} />
      </div>
      <HabitList habits={incompleteHabits} day={today} />
    </div>
  );
}

export default DayCard;
