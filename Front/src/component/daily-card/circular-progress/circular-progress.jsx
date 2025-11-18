import React from "react";
import "@/component/daily-card/circular-progress/circular-progress.css";

function CircularProgress({ progress }) {
  const radius = 20; // شعاع دایره
  const circumference = 2 * Math.PI * radius; // محیط دایره
  const offset = circumference - (progress / 100) * circumference; // محاسبه درصد پیشرفت

  return (
    <div className="progress-container">
      <svg width="50" height="50" className="circular-progress">
        <circle
          className="circle-bg"
          cx="25"
          cy="25"
          r={radius}
          strokeWidth="4"
        />
        <circle
          className="circle"
          cx="25"
          cy="25"
          r={radius}
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"  // اضافه کردن حالت گرد به انتهای خط
        />
      </svg>
      <div className="progress-text">{progress}%</div>
    </div>
  );
}

export default CircularProgress;
