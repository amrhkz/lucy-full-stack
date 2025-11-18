"use client";
import React, { useEffect, useRef, useState } from "react";
import "./add-product.css";
import Modal, { ModalMenu, ModalToggle } from "@/component/modal/modal";

function AddProduct() {
  const [title, setTitle] = useState(""); // ذخیره عنوان
  const [slug, setSlug] = useState(""); // ذخیره slug
  // تابع تولید slug از عنوان
  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    // تولید slug به صورت دستی
    const generatedSlug = newTitle
      .toLowerCase() // تبدیل به حروف کوچک
      .replace(/[^\w\s-]/g, "") // حذف کاراکترهای غیرمجاز
      .trim() // حذف فاصله‌های اضافی از ابتدا و انتها
      .replace(/\s+/g, "-"); // جایگزینی فاصله‌ها با خط تیره

    setSlug(generatedSlug);
  };

  return (
    <>
      <Modal>
        <ModalToggle>
          <button className="add-product">
            +
          </button>
        </ModalToggle>
        <ModalMenu>
          <form>
            <input
              className="desc-input input"
              type="text"
              placeholder="Task Title"
              name="title"
              value={title}
              onChange={handleTitleChange}
            />
            <input
              className="desc-input input"
              type="hidden"
              placeholder="Task Slug"
              name="slug"
              value={slug}
              readOnly
            />
            <button className="create-btn">Create Task</button>
          </form>
        </ModalMenu>
      </Modal>
    </>
  );
}

export default AddProduct;
