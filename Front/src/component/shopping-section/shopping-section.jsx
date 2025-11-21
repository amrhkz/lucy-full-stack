import React from "react";
import Carousel from "../carousel/carousel";
import "./shopping-section.css";

function ShoppingSection() {
  return (
    <div className="shopping-section">
      <Carousel title="Short Term" />
      <Carousel title="Mid Term" />
      <Carousel title="Long Term" />
    </div>
  );
}

export default ShoppingSection;
