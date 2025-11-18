"use client";
import { useState, useRef } from "react";
import "./count-down-timer.css";

export default function CountdownTimer() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef(null);
  // const alarmRef = useRef(new Audio("./alarm.mp3"));

  const startStopTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      let totalMilliseconds = (minutes * 60 + seconds) * 1000;
      timerRef.current = setInterval(() => {
        totalMilliseconds -= 10;
        if (totalMilliseconds <= 0) {
          clearInterval(timerRef.current);
          setIsRunning(false);
          totalMilliseconds = 0;
          // alarmRef.current.play();
        }
        setMinutes(Math.floor(totalMilliseconds / 60000));
        setSeconds(Math.floor((totalMilliseconds % 60000) / 1000));
        setMilliseconds(Math.floor((totalMilliseconds % 1000) / 10));
      }, 10);
      setIsRunning(true);
    }
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setMilliseconds(0);
  };

  return (
    <div className="count-down-timer">
      <div className="timer-field">
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}.
        {String(milliseconds).padStart(2, "0")}
      </div>
      <div className="input-field">
        <div className="input-col">
          <input
            type="number"
            placeholder="Min"
            value={minutes}
            onChange={(e) =>
              setMinutes(Math.max(0, parseInt(e.target.value) || 0))
            }
            disabled={isRunning}
          />
        </div>
        <div className="input-col">
          <input
            type="number"
            placeholder="Sec"
            value={seconds}
            onChange={(e) =>
              setSeconds(
                Math.max(0, Math.min(59, parseInt(e.target.value) || 0))
              )
            }
            disabled={isRunning}
          />
        </div>
      </div>

      <div className="btn-field">
        <button
          onClick={startStopTimer}
        >
          <i className={`bx ${isRunning ? "bx-stop" : "bx-play"} bx-sm`}></i>
        </button>
        <button
          onClick={resetTimer}
        >
          <i className="bx bx-reset bx-sm"></i>
        </button>
      </div>
    </div>
  );
}
