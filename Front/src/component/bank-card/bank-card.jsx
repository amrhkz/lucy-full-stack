"use client";
import React, { useState, useRef, useEffect } from "react";
import "./bank-card.css";

function BankCard({ id, bank, balance, cardNum, cvv, expiry, owner, iban }) {
  const [editingField, setEditingField] = useState(null);
  const [values, setValues] = useState({
    bank,
    balance,
    cardNum,
    cvv,
    expiry,
    owner,
    iban,
  });
  console.log(id);
  const inputRef = useRef(null);

  // تمرکز خودکار روی input وقتی شروع به ویرایش می‌کنیم
  useEffect(() => {
    if (editingField && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editingField]);

  // وقتی بیرون کلیک شد، ذخیره و بستن input
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        handleSave();
      }
    };
    if (editingField) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editingField]);

  const handleChange = (e) => {
    setValues((prev) => ({
      ...prev,
      [editingField]: e.target.value,
    }));
  };

  const handleSave = async () => {
  if (!editingField) return;

  const newValue = inputRef.current?.value; // مستقیم از input بگیر
  const updatedValue = { [editingField]: newValue };
  setEditingField(null);

  try {
    console.log("🟢 Sending update:", id, updatedValue);
    const res = await fetch(`http://localhost:4000/banks/${id}`, {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // 👈 خیلی مهم
  body: JSON.stringify(updatedValue),
});


    if (!res.ok) throw new Error("Failed to update bank field");

    const updatedCard = await res.json();
    console.log("✅ Updated:", updatedCard);

    setValues((prev) => ({ ...prev, ...updatedCard }));
  } catch (err) {
    console.error("❌ Update error:", err);
  }
};


  const renderField = (fieldName, label, className = "") => {
    const value = values[fieldName];
    const formatted =
      fieldName === "balance" ? Number(value).toLocaleString("fa-IR") : value;

    if (editingField === fieldName) {
      return (
        <input
          ref={inputRef}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          className={`editable-input ${className}`}
        />
      );
    }

    return (
      <div
        onClick={() => setEditingField(fieldName)}
        className={`editable ${className}`}
      >
        {label ? `${label}: ` : ""}
        {formatted || "—"}
      </div>
    );
  };

  return (
    <div className="bank-card">
      {renderField("bank", null, "bank-name")}
      {renderField("balance", null, "balance")}
      {renderField("cardNum", null, "card-num")}
      <div className="flex flex-col gap-[3px] items-end w-full text-[14px]">
        <div className="row justify-between w-full">
          {renderField("cvv", "CVV2", "cvv")}
          {renderField("expiry", "انقضاء", "expiry")}
        </div>
        {renderField("owner", null, "name")}
      </div>
      {renderField("iban", "", "shaba")}
    </div>
  );
}

export default BankCard;
