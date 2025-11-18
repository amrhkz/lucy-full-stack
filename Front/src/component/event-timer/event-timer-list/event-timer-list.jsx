"use client";
import React, { useEffect, useState } from "react";
import EventTimer from "../event-timer";

const EventTimerList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("http://localhost:4000/events", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);
  
  return (
    <div className="event-timer-list">
      {events.map((event) => (
        <EventTimer key={event._id} {...event} />
      ))}
    </div>
  );
};

export default EventTimerList;
