import ShineLoading from "@/component/loading/shine-loading/shine-loading";
import React, { useEffect, useState } from "react";
import "./shine-tab.css";

function ShineTab() {
  const [shines, setShines] = useState([]);

  useEffect(() => {
    const fetchShines = async () => {
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
    fetchShines();
  }, []);
  return (
    <div className="shine-tab">
      <div className="shine-controls">
        <div className="filters">
          <div className="filter-item active">All</div>
          <div className="filter-item">Done</div>
          <div className="filter-item">Ongoing</div>
          <div className="filter-item">Archived</div>
        </div>
        <div className="new-shine">New Shine</div>
      </div>

      <div className="shine-list">
        {shines.length > 0 ? (
          shines.map((shine) => (
            <div className="shine-item" key={shine.id}>
              {shine.title}
              {shine.progress}
              {shine.status}
              {shine.doneAt}
            </div>
          ))
        ) : (
          <ShineLoading />
        )}
      </div>
    </div>
  );
}

export default ShineTab;
