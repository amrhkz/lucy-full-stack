"use client";
import CustomToast, { useToast } from "@/component/notify/notify";
import { isSameDay } from "date-fns";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // 👈 اضافه شد

// 📌 تابع آپدیت در Express
const UpdateHabit = async (id, body) => {
  try {
    const res = await fetch(`http://localhost:4000/habits/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      credentials: "include",
    });

    if (!res.ok) throw new Error("Failed to update habit");
    return await res.json();
  } catch (err) {
    console.error("❌ Error updating habit:", err);
  }
};

const HabitList = ({ habits, day }) => {
  const { showToast } = useToast();
  const [updatedHabits, setUpdatedHabits] = useState([]);

  useEffect(() => {
    setUpdatedHabits(
      habits.map((habit) => ({
        ...habit,
        multiDates: habit.multiDates ?? [],
        dates: habit.dates ?? [],
      }))
    );
  }, [habits]);

  const dayOfWeek = day.getDay();

  const filteredHabits = updatedHabits.filter((habit) => {
    if (habit.customDate) {
      return isSameDay(new Date(habit.customDate), day);
    }

    if (habit.startDate && new Date(day) < new Date(habit.startDate)) {
      return false;
    }

    switch (habit.repeat) {
      case "daily":
        return true;
      case "week-days":
        return [6, 0, 1, 2, 3].includes(dayOfWeek);
      case "specific-days":
        return habit.specificDays?.includes(dayOfWeek);
      default:
        return false;
    }
  });

  const handleToggleHabit = async (habit, index) => {
    if (!habit) return console.error("habit is undefined!");

    const isMulti = habit.habitType === "multi";
    const multiDatesArray = habit.multiDates ?? [];
    const datesArray = habit.dates ?? [];

    const isCompleted = isMulti
      ? multiDatesArray.some(
          (entry) =>
            entry.index === index && isSameDay(new Date(entry.date), day)
        )
      : datesArray.some((date) => isSameDay(new Date(date), day));

    if (isMulti) {
      const updatedMultiDates = isCompleted
        ? multiDatesArray.filter(
            (entry) =>
              !(entry.index === index && isSameDay(new Date(entry.date), day))
          )
        : [...multiDatesArray, { index, date: day.toISOString() }];

      await UpdateHabit(habit._id, { multiDates: updatedMultiDates });

      setUpdatedHabits((prev) =>
        prev.map((h) =>
          h._id === habit._id ? { ...h, multiDates: updatedMultiDates } : h
        )
      );
    } else {
      const updatedDates = isCompleted
        ? datesArray.filter((date) => !isSameDay(new Date(date), day))
        : [...datesArray, day.toISOString()];

      await UpdateHabit(habit._id, { dates: updatedDates });

      setUpdatedHabits((prev) =>
        prev.map((h) =>
          h._id === habit._id ? { ...h, dates: updatedDates } : h
        )
      );
    }

    if (!isCompleted) {
      showToast("Done", "success");
    } else {
      showToast("Removed", "info");
    }
  };

  return (
    <>
      {filteredHabits.length > 0 ? (
        filteredHabits.map((habit) =>
          Array.from({
            length: habit.habitType === "multi" ? habit.count || 1 : 1,
          }).map((_, idx) => {
            const isMulti = habit.habitType === "multi";
            const isCompleted = isMulti
              ? habit.multiDates.some(
                  (entry) =>
                    entry.index === idx && isSameDay(new Date(entry.date), day)
                )
              : habit.dates.some((date) => isSameDay(new Date(date), day));

            return (
              <div
                key={`${habit._id}-${idx}`}
                className="habit-item"
                onClick={() => handleToggleHabit(habit, idx)}
              >
                <div className={`check-box ${isCompleted ? "done" : ""}`}>
                  <svg viewBox="0 0 14 14" className="roundedSquareCheckbox">
                    <rect x="0.5" y="0.5" width="12" height="12" rx="2.5" />
                    {isCompleted && (
                      <svg
                        aria-hidden="true"
                        role="graphics-symbol"
                        viewBox="0 0 13 14"
                        className="roundedCheck"
                        width={12}
                        height={12}
                      >
                        {" "}
                        <path d="M6.00879 11.4033C5.70605 11.4033 5.45378 11.2829 5.25195 11.042L2.73242 7.99023C2.64453 7.88932 2.58268 7.79167 2.54688 7.69727C2.51107 7.60286 2.49316 7.50521 2.49316 7.4043C2.49316 7.17318 2.56966 6.98275 2.72266 6.83301C2.87891 6.68001 3.07422 6.60352 3.30859 6.60352C3.56901 6.60352 3.78548 6.70931 3.95801 6.9209L5.98926 9.43555L9.97852 3.13184C10.0794 2.97884 10.1836 2.87142 10.291 2.80957C10.4017 2.74447 10.5368 2.71191 10.6963 2.71191C10.9307 2.71191 11.1243 2.78678 11.2773 2.93652C11.4303 3.08626 11.5068 3.27507 11.5068 3.50293C11.5068 3.58757 11.4922 3.67546 11.4629 3.7666C11.4336 3.85775 11.388 3.95215 11.3262 4.0498L6.78027 11.0078C6.60124 11.2715 6.34408 11.4033 6.00879 11.4033Z" />{" "}
                      </svg>
                    )}
                  </svg>
                </div>
                <div className="title">{habit.title}</div>
              </div>
            );
          })
        )
      ) : (
        <p className="empty-card">Loading Habit...</p>
      )}
    </>
  );
};

export default HabitList;
