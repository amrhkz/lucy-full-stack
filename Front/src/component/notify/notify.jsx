"use client";
import { createContext, useContext, useState, useCallback } from "react";
import "./notify.css";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = "info", duration = 3000) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), duration);
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <i className="bx bx-check-circle"></i>;
      case "error":
        return <i className="bx bx-x-circle"></i>;
      case "info":
      default:
        return <i className="bx bx-info-circle"></i>;
    }
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className={`custom-toast ${toast.type}`}>
          {getIcon(toast.type)}
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};
