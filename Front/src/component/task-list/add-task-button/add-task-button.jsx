"use client";
import { createGoal, createTask } from "@/lib/action";
import "./add-task-button.css";
import React, { useRef, useState, useEffect } from "react";
import Modal, { ModalMenu, ModalToggle } from "@/component/modal/modal";

const AddTaskButton = (props) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [taskType, setTaskType] = useState("solo"); // حالت برای ذخیره نوع تسک
  const [title, setTitle] = useState(""); // ذخیره عنوان
  const [slug, setSlug] = useState(""); // ذخیره slug
  const popupRef = useRef(null);
  const buttonRef = useRef(null);

  const openPopup = () => {
    setIsPopupVisible(true);
  };

  const closePopup = (event) => {
    if (
      popupRef.current &&
      !popupRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsPopupVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", closePopup);
    return () => {
      document.removeEventListener("click", closePopup);
    };
  }, []);

  // تابع برای مدیریت تغییر نوع تسک
  const handleTaskTypeChange = (event) => {
    setTaskType(event.target.value); // به‌روزرسانی حالت نوع تسک
  };

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

  const parentSlug = props.parentSlug;

  return (
    <>
      <Modal>
        <ModalToggle>
          <button className="add-task-btn" ref={buttonRef} onClick={openPopup}>
            Add task
          </button>
        </ModalToggle>
        <ModalMenu>
          <form className="task-add" action={createTask}>
            <input
              className="desc-input input"
              type="text"
              placeholder="Task Title"
              name="title"
              value={title}
              onChange={handleTitleChange} // فراخوانی تابع تولید slug هنگام تغییر عنوان
            />
            <input
              className="desc-input input"
              type="hidden"
              placeholder="Task Slug"
              name="slug"
              value={slug} // نمایش slug به‌صورت خودکار
              readOnly
            />
            <select name="repeat" id="">
              <optgroup label="Repeat">
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="once">Once</option>
              </optgroup>
            </select>
            <select name="taskType" id="" onChange={handleTaskTypeChange}>
              <optgroup label="Type">
                <option value="solo">Solo</option>
                <option value="complex">Complex</option>
              </optgroup>
            </select>
            {taskType === "complex" && (
              <>
                <input
                  className="desc-input input"
                  type="number"
                  placeholder="Task Target"
                  name="target"
                />
                <input
                  className="desc-input input"
                  type="number"
                  placeholder="Task Progress"
                  name="progress"
                />
              </>
            )}
            <input
              className="grade-input input"
              type="hidden"
              name="parentId"
              value={props.parentId}
            />
            <input
              className="grade-input input"
              type="hidden"
              name="done"
              value="not"
            />
            <input
              className="grade-input input"
              type="hidden"
              name="parentSlug"
              value={parentSlug}
            />
            <button className="create-btn">Create Task</button>
          </form>
        </ModalMenu>
      </Modal>
    </>
  );
};

export default AddTaskButton;
