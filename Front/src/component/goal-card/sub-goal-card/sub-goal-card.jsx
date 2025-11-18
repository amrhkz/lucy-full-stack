import Link from "next/link";
import "./sub-goal-card.css";
import React, { Suspense } from "react";
import TaskList from "@/component/task-list/task-list";
import TaskLoading from "@/component/loading/task-loading/task-loading";
import AddGoal from "@/component/add-goal/add-goal";

const getData = async () => {
  const res = await fetch("http://localhost:4000/goals", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Something Went Wrong!");
  }
  return res.json();
};

const SubGoalCard = async (props) => {
  const posts = await getData();
  var totalProg = 0;
  const sihlug = props.slug;
  return (
    <>
      <div className="sub-goal-row">
        <div className="sub-goal-card-list">
          {posts
            .filter((post) => post.parentId === props.parentId)
            .map((post) => (
              <Link
                href={`/goals/${post.slug}`}
                key={post._id}
                className="sub-goal-card"
              >
                <div className="goal-image">
                  <img src={`/img/${post.image}`} alt="" />
                </div>
                <div className="sub-goal-card-content">
                  <div className="sub-goal-card-title">
                    <p>{post.title}</p>
                    <span>{post.prog}%</span>
                  </div>
                  <div className="sub-goal-card-progress">
                    <span style={{ width: `${post.prog}%` }}></span>
                  </div>
                </div>
              </Link>
            ))}
          {props.lastTask === "false" && <AddGoal parentId={props.parentId} />}
          {props.lastTask === "true" && (
            <Suspense fallback={<TaskLoading />}>
              <TaskList slug={sihlug} parentId={props.parentId} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
};

export default SubGoalCard;
