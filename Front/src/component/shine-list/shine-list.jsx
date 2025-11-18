"use client";
import React, { useEffect, useState } from "react";
import Shine from "../shine/shine";

const ShineList = () => {
  const [shines, setShines] = useState([]);

  useEffect(() => {
    const fetchShine = async () => {
      try {
        const res = await fetch("http://localhost:4000/shines", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setShines(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchShine();
  }, []);

  const activeShines = shines.filter((shine) => shine.status !== "archived");
  return (
    <div className="shine-list">
      {activeShines.map((shine) => (
        <Shine
          key={shine._id}
          shineId={shine._id}
          title={shine.title}
          target={shine.target}
          initialProgress={shine.progress}
          doneAt={shine.doneAt}
          status={shine.status}
        />
      ))}
    </div>
  );
};

export default ShineList;
