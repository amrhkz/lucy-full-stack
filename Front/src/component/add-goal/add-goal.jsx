"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Modal, { ModalToggle, ModalMenu } from "@/component/modal/modal";
import "./add-goal.css";
import { revalidatePath } from "next/cache";

const AddGoal = (props) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [lastSub, setLastSub] = useState(false);

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setTitle(newTitle);

    const generatedSlug = newTitle
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    setSlug(generatedSlug);
  };

  const toggleLastSub = () => {
    setLastSub(!lastSub);
  };

  const resetForm = () => {
    setTitle("");
    setSlug("");
    setLastSub(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch("http://localhost:4000/goals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to create goal");
      }

      const data = await response.json();
      console.log("Goal created:", data);
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error submitting the form:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal>
      <ModalToggle>
        <div className="goal-add-title">
          <span>+</span>New
        </div>
      </ModalToggle>
      <ModalMenu>
        <form onSubmit={handleSubmit}>
          <input
            className="grade-input input"
            type="text"
            placeholder="Goal Title"
            name="title"
            onChange={handleTitleChange}
            value={title}
            required
          />
          <input
            className="grade-input input"
            type="text"
            placeholder="Description"
            name="desc"
            spellCheck="false"
          />
          <input type="hidden" name="slug" value={slug} />
          <input type="hidden" name="prog" />
          <input type="hidden" name="parentId" value={props.parentId} />
          <input
            className="grade-input input"
            type="text"
            placeholder="Image"
            name="image"
            accept=".jpg"
          />
          <input
            type="hidden"
            name="lastSub"
            value={lastSub ? "true" : "false"}
          />

          <div className="flex justify-between gap-[24px]">
            <div className="check-box-field" onClick={toggleLastSub}>
              <i
                className={`bx ${
                  lastSub ? "bxs-checkbox-checked bx-sm" : "bx-checkbox bx-sm"
                }`}
              ></i>
              <p>Last Goal?</p>
            </div>
            <input
              className="grade-input input"
              type="number"
              name="order"
              placeholder="Goal Order"
            />
          </div>
          <input type="hidden" name="mainGoal" value={props.main} />

          <button className="create-btn" disabled={isLoading}>
            {isLoading ? (
              <i className="bx bx-loader-alt bx-spin bx-xs"></i>
            ) : (
              "Create"
            )}
          </button>
        </form>
      </ModalMenu>
    </Modal>
  );
};

export default AddGoal;
