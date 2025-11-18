"use client";
import React, { useState, createContext, useContext } from "react";
import "./tab.css"

const TabContext = createContext();

export function Tab({ defaultActive = 0, children }) {
  const [activeIndex, setActiveIndex] = useState(defaultActive);

  return (
    <TabContext.Provider value={{ activeIndex, setActiveIndex }}>
      <div>{children}</div>
    </TabContext.Provider>
  );
}

export function TabMenu({ children }) {
  return <div className="tabs">{children}</div>;
}

export function TabItem({ index, icon, children }) {
  const { activeIndex, setActiveIndex } = useContext(TabContext);
  const active = activeIndex === index;

  return (
    <div
      className={`tab ${active ? "active" : ""}`}
      onClick={() => setActiveIndex(index)}
    >
      {icon && <i className={`bx ${icon} bx-sm`}></i>} {children}
    </div>
  );
}

export function TabPanel({ index, children }) {
  const { activeIndex } = useContext(TabContext);
  if (activeIndex !== index) return null;
  return <div className="panel">{children}</div>;
}
