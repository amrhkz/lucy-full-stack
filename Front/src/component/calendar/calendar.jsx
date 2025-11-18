"use client";
import { useState, useEffect } from "react";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isAfter,
  isToday,
} from "date-fns";
import "./calendar.css";
import HabitList from "./habit-list/habit-list";
import YmwProg from "./ymw-prog/ymw-prog";

const getHabit = async () => {
  const res = await fetch("http://localhost:4000/habits", {
    cache: "no-store",
    credentials: "include",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong!");
  }
  return res.json();
};

export default function Calendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [habits, setHabits] = useState([]);
  const startDate = new Date(2024, 12, 31);

  useEffect(() => {
    getHabit().then(setHabits).catch(console.error);
  }, []);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(monthStart);
  const weekStart = startOfWeek(monthStart);
  const weekEnd = endOfWeek(monthEnd);
  const days = eachDayOfInterval({ start: weekStart, end: weekEnd });

  return (
    <div className="calendar-container">
      <div className="calendar-top">
        <div className="calendar-header">
          <h2>{format(currentMonth, "MMMM yyyy")}</h2>
          {/* <YmwProg type="daily" /> */}
          <div className="navigate-field">
            <i onClick={prevMonth} className="bx bx-chevron-left bx-sm"></i>
            <button onClick={() => setCurrentMonth(new Date())}>Today</button>
            <i onClick={nextMonth} className="bx bx-chevron-right bx-sm"></i>
          </div>
        </div>
        <div className="calendar-weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div className="calendar-weekdays-item" key={day}>
              {day}
            </div>
          ))}
        </div>
      </div>
      <div className="calendar-days">
        {days.map((day, index) => (
          <div
            key={index}
            className={`calendar-day ${
              format(day, "MM") === format(currentMonth, "MM")
                ? "current-month"
                : "other-month"
            }`}
          >
            <div className="day-header">
              <div className={`day-num ${isToday(day) ? "today" : ""}`}>
                {format(day, "d")}
              </div>
            </div>
            <div className="day-event">
              {isAfter(day, startDate) && (
                <div className="habit-card">
                  <div className="title">Daily Habits</div>
                  <div className="habit-list">
                    <HabitList habits={habits} day={day} />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
