"use client"
import React, { useRef, useEffect, useState } from "react";
import "./shopping-list.css";

const products = [
  { id: 1, img: "./img/product-1.png", title: "Product 1", desc: "Lorem ipsum...", price: "100,000 $" },
  { id: 2, img: "./img/product-2.png", title: "Product 2", desc: "Lorem ipsum...", price: "1,000,000 $" },
  { id: 3, img: "./img/product-3.png", title: "Product 3", desc: "Lorem ipsum...", price: "300,000 $" },
  { id: 4, img: "./img/product-4.png", title: "Product 4", desc: "Lorem ipsum...", price: "150,000 $" },
  { id: 5, img: "./img/product-5.png", title: "Product 5", desc: "Lorem ipsum...", price: "10,000 $" },
  { id: 6, img: "./img/product-6.png", title: "Product 6", desc: "Lorem ipsum...", price: "75,000 $" }
];

function ShoppingList() {
  const carouselRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState(3); // پیش‌فرض: 3 آیتم
  const itemWidth = 220; // عرض آیتم + فاصله

  // محاسبه تعداد آیتم‌های قابل نمایش
  useEffect(() => {
    const updateVisibleItems = () => {
      if (carouselRef.current) {
        const width = carouselRef.current.offsetWidth;
        setVisibleItems(Math.floor(width / itemWidth));
      }
    };

    updateVisibleItems();
    window.addEventListener("resize", updateVisibleItems);
    return () => window.removeEventListener("resize", updateVisibleItems);
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -itemWidth * visibleItems, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: itemWidth * visibleItems, behavior: "smooth" });
    }
  };

  return (
    <div className="shopping-carousel">
      <button className="nav-btn left" onClick={scrollLeft}>{"<"}</button>
      <div className="shopping-list" ref={carouselRef}>
        {products.map((product) => (
          <div key={product.id} className="shopping-item">
            <img src={product.img} alt={product.title} />
            <div className="detail">
              <div className="title">{product.title}</div>
              <div className="desc">{product.desc}</div>
              <div className="price">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
      <button className="nav-btn right" onClick={scrollRight}>{">"}</button>
    </div>
  );
}

export default ShoppingList;
