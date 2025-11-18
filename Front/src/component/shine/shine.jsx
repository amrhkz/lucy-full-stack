"use client";
import React, { useEffect, useState } from "react";
import "./shine.css";

function Shine({
  shineId,
  target = 7,
  initialProgress = 0,
  title = "",
  doneAt = null,
  status = "",
}) {
  const [checkboxes, setCheckboxes] = useState(Array(target).fill(false));
  const [timeLeft, setTimeLeft] = useState(null);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    const updated = Array(target)
      .fill(false)
      .map((_, i) => i < initialProgress);
    setCheckboxes(updated);
  }, [initialProgress, target]);

  const toggleCheckbox = (index) => {
    const updated = [...checkboxes];
    updated[index] = !updated[index];
    const newProgress = updated.filter(Boolean).length;

    setCheckboxes(updated);
    UpdateShine(shineId, newProgress);
  };

  const resetCheckboxes = () => {
    const updated = Array(target).fill(false);
    setCheckboxes(updated);
    UpdateShine(shineId, 0);
  };

  const UpdateShine = async (shineId, newProgress) => {
    try {
      const res = await fetch(`http://localhost:4000/shines/${shineId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ progress: newProgress }),
      });

      if (!res.ok) throw new Error("Failed to update shine");

      return await res.json();
    } catch (err) {
      console.error("Frontend UpdateShine Error:", err);
      return { error: "Update failed" };
    }
  };

  const ArchiveShine = async (shineId) => {
    try {
      const res = await fetch(
        `http://localhost:4000/shines/${shineId}/archive`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!res.ok) throw new Error("Failed to archive shine");

      return await res.json();
    } catch (err) {
      console.error("Frontend ArchiveShine Error:", err);
      return { error: "Archive failed" };
    }
  };

  useEffect(() => {
    if (!doneAt) return;

    const doneDate = new Date(doneAt);
    const archiveTime = new Date(doneDate.getTime() + 40 * 24 * 60 * 60 * 1000);

    const interval = setInterval(() => {
      const now = new Date();
      const diff = archiveTime - now;

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          ms: 0,
        });
        setIsTimeUp(true);
        clearInterval(interval);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const ms = diff % 1000;

      setTimeLeft({ days, hours, minutes, seconds, ms });
    }, 50); // هر 50 میلی‌ثانیه آپدیت

    return () => clearInterval(interval);
  }, [doneAt]);

  const handleProgressIncrease = () => {
    const currentProgress = checkboxes.filter(Boolean).length;
    if (currentProgress >= target) return; // جلوتر از هدف نرو

    const updated = [...checkboxes];
    updated[currentProgress] = true; // تیک زدن آیتم بعدی
    setCheckboxes(updated);

    UpdateShine(shineId, currentProgress + 1);
  };

  return (
    <>
      <div className="shine">
        <div className="bg-image"></div>
        <div className="shine-content">
          <div className="shine-counter" onClick={handleProgressIncrease}>
            <span>{checkboxes.filter(Boolean).length}</span>
          </div>

          <h2 className="shine-title">{title}</h2>

          {status === "done" && !isTimeUp && timeLeft && (
            <div className="shine-timer">
              {String(Math.floor(timeLeft.days)).padStart(2, "0")} d :
              {String(Math.floor(timeLeft.hours)).padStart(2, "0")} h :
              {String(Math.floor(timeLeft.minutes)).padStart(2, "0")} m :
              {String(Math.floor(timeLeft.seconds)).padStart(2, "0")} s :
              {String(Math.floor(timeLeft.ms / 10)).padStart(2, "0")}
            </div>
          )}
          {status === "ongoing" && (
            <button className="shine-button" onClick={resetCheckboxes}>
              Reset Shine
            </button>
          )}

          {status === "done" && isTimeUp && (
            <button
              className="shine-button"
              onClick={() => ArchiveShine(shineId)}
            >
              Archive Shine
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default Shine;
