"use client";
import React, { useEffect, useState } from "react";
import "./bank-tab.css";
import Modal, { ModalMenu, ModalToggle } from "../modal/modal";

function BankTab() {
  const [banks, setBanks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        const res = await fetch("http://localhost:4000/banks", {
          cache: "no-store",
          credentials: "include",
        });
        if (!res.ok) throw new Error("Something Went Wrong!");
        const data = await res.json();
        setBanks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBanks();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData.entries());

      const response = await fetch("http://localhost:4000/banks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Failed to Create Bank Card!");
      }

      const data = await response.json();
      console.log("Bank Card Created:", data);
      resetForm();
      router.refresh();
    } catch (error) {
      console.error("Error Submitting the Form :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/banks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete bank card");

      console.log("🗑️ Card deleted:", id);
      setBanks((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      console.error("❌ Error deleting card:", err);
    }
  };

  return (
    <div className="bank-tab">
      <div className="bank-controls">
        <div className="filters">
          <div className="filter-item active">All</div>
          <div className="filter-item">Done</div>
          <div className="filter-item">Ongoing</div>
          <div className="filter-item">Archived</div>
        </div>
        <Modal>
          <ModalToggle>
            <div className="new-bank">New Card</div>
          </ModalToggle>
          <ModalMenu>
            <div className="new-bank-menu">
              <form onSubmit={handleSubmit}>
                <div className="title">Create New Bank Card</div>
                <input type="text" placeholder="Bank Name" name="bank" />
                <input type="number" placeholder="Balance" name="balance" />
                <input type="text" placeholder="Card Number" name="cardNum" />
                <input type="text" placeholder="Owner Name" name="owner" />
                <input type="number" placeholder="CVV2" name="cvv" />
                <input type="text" placeholder="Expiry Date" name="expiry" />
                <input type="text" placeholder="IBAN Number" name="iban" />
                <button disabled={isLoading}>
                  {isLoading ? (
                    <i className="bx bx-loader-alt bx-spin bx-xs"></i>
                  ) : (
                    "Create"
                  )}
                </button>
              </form>
            </div>
          </ModalMenu>
        </Modal>
      </div>
      <div className="bank-list">
        {banks.length > 0 ? (
          banks.map((bank) => (
            <div className="bank-item" key={bank.id}>
              <div className="title">{bank.bank}</div>
              <div className="card-num">{bank.cardNum}</div>
              <div className="balance">
                {Number(bank.balance).toLocaleString("fa-IR")}
              </div>
              <button onClick={() => handleDelete(bank._id)}>
                <i className="bx  bxs-trash-alt"></i>
              </button>
            </div>
          ))
        ) : (
          <p>Bank is loading ...</p>
        )}
      </div>
    </div>
  );
}

export default BankTab;
