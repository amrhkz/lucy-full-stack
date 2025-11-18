import React from "react";
import CustomSwiper from "../custom-swiper/custom-swiper";

function ShoppingRow() {
  return (
    <div className="shopping-row">
      <div className="title">Short Term List</div>
      <CustomSwiper slidesPerView={3} autoPlay delay={4000} gap={20}>
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-indigo-500 to-purple-600 h-64 flex items-center justify-center text-white text-2xl font-bold rounded-2xl shadow-md"
          >
            Slide {i + 1}
          </div>
        ))}
      </CustomSwiper>
    </div>
  );
}

export default ShoppingRow;
