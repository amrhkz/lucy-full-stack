"use client";
import { UpdateGoal } from "@/lib/action";
import { useEffect, useRef, useState } from "react";
import "@/component/goal-card/sub-goal-card/update-button/update-button.css";
import Modal, { ModalMenu, ModalToggle } from "@/component/modal/modal";

const UpdateButton = (props) => {

  return (
    <>
      {/* <Modal>
        <ModalToggle>
          <button className="update-btn">
            <i className="bx bxs-pencil bx-xs"></i>
          </button>
        </ModalToggle>
        <ModalMenu>
          <div className="goal-add-popup">
            <div className="icon-section">
              <div className="icon-select">
                <svg role="graphics-symbol" viewBox="0 0 14 14">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 0c3.861 0 7 3.139 7 7s-3.139 7-7 7-7-3.139-7-7 3.139-7 7-7zM3.561 5.295a1.027 1.027 0 1 0 2.054 0 1.027 1.027 0 0 0-2.054 0zm5.557 1.027a1.027 1.027 0 1 1 0-2.054 1.027 1.027 0 0 1 0 2.054zm1.211 2.816a.77.77 0 0 0-.124-1.087.786.786 0 0 0-1.098.107c-.273.407-1.16.958-2.254.958-1.093 0-1.981-.55-2.244-.945a.788.788 0 0 0-1.107-.135.786.786 0 0 0-.126 1.101c.55.734 1.81 1.542 3.477 1.542 1.668 0 2.848-.755 3.476-1.541z"
                  ></path>
                </svg>
                Add icon
              </div>
              <div className="icon-select">
                <svg role="graphics-symbol" viewBox="0 0 14 14">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 0a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm0 12h10L8.5 5.5l-2 4-2-1.5L2 12z"
                  ></path>
                </svg>
                Add cover
              </div>
            </div>
            <form action={UpdateGoal}>
              <input type="hidden" name="id" value={props.goalId} />
              <input
                className="title-input input"
                type="text"
                placeholder="Goal Title"
                name="title"
              />
              <input
                className="desc-input input"
                type="text"
                placeholder="Description"
                name="desc"
              />
              <input
                className="grade-input input"
                type="text"
                placeholder="Goal Slug"
                name="slug"
              />
              <input
                className="grade-input input"
                type="text"
                placeholder="Goal Prog"
                name="prog"
              />
              <input type="hidden" name="parentId" value={props.parentId} />
              <input
                className="grade-input input"
                type="text"
                placeholder="Image"
                name="image"
              />
              <input
                className="grade-input input"
                type="text"
                placeholder="Last Goal?"
                name="lastSub"
              />
              <button type="submit" className="create-btn">
                Update Goal
              </button>
            </form>
          </div>
        </ModalMenu>
      </Modal> */}
    </>
  );
};

export default UpdateButton;
