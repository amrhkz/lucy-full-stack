"use client";
import React from "react";
import "./bank-card.css";
import { toast } from "react-toastify";

function BankCard({ id, bank, balance, cardNum, cvv, expiry, owner, iban }) {
  const values = {
    bank,
    balance,
    cardNum,
    cvv,
    expiry,
    owner,
    iban,
  };

  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} با موفقیت کپی شد!`);
  };

  const renderField = (fieldName, label, className = "", copyable = false) => {
    const value = values[fieldName];
    const formatted =
      fieldName === "balance"
        ? Number(value).toLocaleString("fa-IR")
        : value;

    return (
      <div
        className={`readonly ${className} ${
          copyable ? "cursor-pointer" : ""
        }`}
        onClick={() => copyable && handleCopy(value, label || "مقدار")}
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
      
      {/* شماره کارت - کلیک = کپی */}
      {renderField("cardNum", "", "card-num", true)}

      <div className="flex flex-col gap-[3px] items-end w-full text-[14px]">
        <div className="row justify-between w-full">
          {renderField("cvv", "CVV2", "cvv")}
          {renderField("expiry", "انقضاء", "expiry")}
        </div>
        {renderField("owner", null, "name")}
      </div>

      {/* شماره شبا - کلیک = کپی */}
      {renderField("iban", "", "shaba", true)}
    </div>
  );
}

export default BankCard;
