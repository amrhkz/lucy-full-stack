"use client"
import React from "react";
import "@/component/container/container.css";

function Container({children}) {
  return <div className="container-x">{children}</div>;
}

export default Container;
