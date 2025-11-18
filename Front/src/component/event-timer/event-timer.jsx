"use client";
import { useEffect, useState, useRef } from "react";
import "@/component/event-timer/event-timer.css";
import CircularProgress from "../daily-card/circular-progress/circular-progress";

const UpdateEvent = async (id, status) => {
  try {
    const res = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    if (!res.ok) throw new Error("Failed to update event");
    return await res.json();
  } catch (err) {
    console.error(err);
  }
};

const EventTimer = ({ _id, startDate, endDate, title, status }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [progress, setProgress] = useState(0);
  const [localStatus, setLocalStatus] = useState(status);
  const updatedToDone = useRef(false);
  const updatedToOngoing = useRef(false);

  useEffect(() => {
  // اگر آرشیو شده، هیچ عملی انجام نده
  if (localStatus === "Archived") return;

  if (!startDate || !endDate) return;

  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  if (isNaN(start) || isNaN(end)) {
    console.error("start or end is NaN");
    return;
  }

  let animationFrameId;

  const updateTimer = async () => {
    const now = Date.now();
    const totalDuration = end - start;
    const timeElapsed = now - start;
    const remaining = Math.max(end - now, 0);

    // ======= تغییر به Done =======
    if (remaining <= 0 && !updatedToDone.current) {
      setTimeLeft(0);
      setProgress(100);
      await UpdateEvent(_id, "Done");
      setLocalStatus("Done");
      updatedToDone.current = true;
      return;
    }

    // ======= تغییر به Ongoing =======
    if (
      remaining > 0 &&
      !updatedToOngoing.current &&
      localStatus !== "Ongoing"
    ) {
      await UpdateEvent(_id, "Ongoing");
      setLocalStatus("Ongoing");
      updatedToOngoing.current = true;
    }

    setTimeLeft(remaining);
    const rawProgress = (timeElapsed / totalDuration) * 100;
    setProgress(Math.min(rawProgress, 100).toFixed(0));

    animationFrameId = requestAnimationFrame(updateTimer);
  };

  updateTimer();

  return () => cancelAnimationFrame(animationFrameId);
}, [startDate, endDate, _id, localStatus]);


  // =====================
  // تابع فرمت زمان
  // =====================
  const formatTime = (ms) => {
    const months = Math.floor(ms / (30 * 24 * 60 * 60 * 1000))
      .toString()
      .padStart(2, "0");
    const days = Math.floor(
      (ms % (30 * 24 * 60 * 60 * 1000)) / (24 * 60 * 60 * 1000)
    )
      .toString()
      .padStart(2, "0");
    const hours = Math.floor((ms % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((ms % (60 * 60 * 1000)) / (60 * 1000))
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor((ms % (60 * 1000)) / 1000)
      .toString()
      .padStart(2, "0");
    const milliseconds = Math.floor((ms % 1000) / 10)
      .toString()
      .padStart(2, "0");

    return (
      <>
        <span className="number">{months}</span>
        <span className="unit">M </span>
        <span className="number">{days}</span>
        <span className="unit">D </span>
        <span className="number">{hours}</span>
        <span className="unit">H </span>
        <span className="number">{minutes}</span>
        <span className="unit">m </span>
        <span className="number">{seconds}</span>
        <span className="unit">s </span>
        <span className="number">{milliseconds}</span>
      </>
    );
  };

  // =====================
  // رندر کامپوننت
  // =====================
  return (
    <div className={`event-timer ${localStatus === "Archived" ? "hidden" : ""}`}>
      <div className="content">
        <div className="left">
          <div className="row">
            <div className="title">{title}</div>
            <div className="status">{localStatus}</div>
          </div>
          <div className="row">
            {localStatus === "Done" ? (
              <button
                className="archive-btn"
                onClick={async () => {
                  await UpdateEvent(_id, "Archived");
                  setLocalStatus("Archived");
                  updatedToOngoing.current = false; // دوباره اجازه Ongoing
                }}
              >
                Archive
              </button>
            ) : (
              <div className="timer">{formatTime(timeLeft)}</div>
            )}
          </div>
        </div>
        <div className="right">
          <CircularProgress progress={progress} />
        </div>
      </div>
    </div>
  );
};

export default EventTimer;
