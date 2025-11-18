"use client";
import "@/component/goal-card/sub-goal-card/delete-button/delete-button.css";
import { deleteGoal } from "@/lib/action";

const DeleteButton = ({ id, onClick }) => {

  const handleDelete = async (e) => {
    e.preventDefault();
    onClick?.(e);
    const formData = new FormData();
    formData.append("id", id);
    try {
      await deleteGoal(formData);
      console.log("Goal deleted successfully");
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  return (
    <button className="delete-btn" onClick={handleDelete}>
      <i className="bx bxs-trash-alt bx-xs"></i>
    </button>
  );
};

export default DeleteButton;
