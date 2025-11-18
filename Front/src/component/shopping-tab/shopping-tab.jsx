import React from "react";
import Carousel from "../carousel/carousel";
import "./shopping-tab.css";

function ShoppingTab() {
  return (
    <div className="shopping-tab">
      <Carousel />
      <Carousel />
      <Carousel />
    </div>
  );
}

export default ShoppingTab;
