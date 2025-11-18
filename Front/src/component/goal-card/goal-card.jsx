"use client";
import "./goal-card.css";
import React, { useEffect, useState } from "react";
import AddGoal from "@/component/add-goal/add-goal";
import GoalCardItem from "./goal-card-item/goal-card-item";

const GoalCard = () => {
  const [goals, setGoals] = useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await fetch("http://localhost:4000/goals", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        console.log("📦 Goals received:", data);
        setGoals(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGoals();
  }, []);

  const sortedPosts = goals
    .filter((post) => post.mainGoal === true || post.mainGoal === "true")
    .sort((a, b) => a.order - b.order);

  return (
    <div className="main-goal-row">
      <div className="goal-card-list">
        {sortedPosts.map((post) => (
          <GoalCardItem key={post._id} post={post} />
        ))}
        {sortedPosts.length < 4 && (
          <AddGoal main="true" parentId="000000000000000000000000" />
        )}
      </div>
    </div>
  );
};

export default GoalCard;
