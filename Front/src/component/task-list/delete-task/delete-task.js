"use client";
import { deleteTask } from "@/lib/action";
import "./delete-task.css"

const DeleteTask = ({ id , parentSlug , parentId}) => {
  const handleDelete = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("parentSlug", parentSlug);
    formData.append("parentId", parentId);
    try {
      await deleteTask(formData);
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <button
      className="delete-task"
      onClick={handleDelete}
    >
      <i className="bx bxs-trash-alt bx-xs"></i>
    </button>
  );
};

export default DeleteTask;
