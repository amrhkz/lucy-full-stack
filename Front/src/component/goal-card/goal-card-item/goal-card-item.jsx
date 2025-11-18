"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const GoalCardItem = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setLoading(true);
    router.push(`/goals/${post.slug}`);
  };

  return (
    <div className="goal-card relative" onClick={handleClick}>
      {loading && (
        <div className="overlay">
          <div className="spinner"></div>
        </div>
      )}
      <div className="goal-image">
        <img src={`/img/${post.image}`} alt={post.title} />
        <div className="goal-order">{post.order}</div>
      </div>
      <div className="goal-card-content">
        <div className="goal-card-title">
          <p>{post.title}</p>
          <span>{post.prog}%</span>
        </div>
        <div className="goal-card-progress">
          <span style={{ width: `${post.prog}%` }}></span>
        </div>
      </div>
    </div>
  );
};

export default GoalCardItem;
