import "./habit-card.css";
import React from "react";

const getHabit = async () => {
  const res = await fetch("http://localhost:3000/api/habits", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong!");
  }
  return res.json();
};

const HabitCard = async (props) => {
  const habits = await getHabit();
  return (
    <>
      <div className="habit-list">
        {habits.map((habit) => (
          <div className="habit" key={habit._id}>
            <div className="title">{habit.title}</div>
            <div className="repeat">{habit.repeat}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HabitCard;
