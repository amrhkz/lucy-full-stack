import React, { useState } from "react";
import "./modal.css";

const Modal = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => setIsVisible(true);
  const closeModal = () => setIsVisible(false);

  return (
    <>
      {React.Children.map(children, (child) => {
        if (child.type === ModalToggle) {
          return React.cloneElement(child, { openModal });
        }
        if (child.type === ModalMenu) {
          return React.cloneElement(child, { isVisible, closeModal });
        }
        return child;
      })}
    </>
  );
};

export const ModalToggle = ({ openModal , children }) => {
  return (
    <div className="modal-toggle" onClick={openModal}>
      {children}
    </div>
  );
};

export const ModalMenu = ({ isVisible, closeModal, children }) => {
  if (!isVisible) return null;

  return (
    <>
      <div className="modal-background" onClick={closeModal}></div>
      <div className="modal-menu show">
        {children}
      </div>
    </>
  );
};

export default Modal;
