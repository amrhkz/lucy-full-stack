"use client";
import { useRouter } from "next/navigation";
import "@/component/goal-card/sub-goal-card/back-button/back-button.css"
import { revalidatePath } from "next/cache";

const BackButton = () => {
  const router = useRouter();
  const backHandler = () => {
    router.back();
  };
  return (
    <button className="back-btn" onClick={backHandler}>
      <i className="bx bx-chevron-left bx-sm"></i>
    </button>
  );
};

export default BackButton;
