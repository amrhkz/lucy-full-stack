"use client";
import React, { useState } from "react";
import "./income.css";
import Modal, { ModalMenu, ModalToggle } from "@/component/modal/modal";

function Income() {
  const [incomeType, setIncomeType] = useState(false);

  const toggleIncomeType = () => {
    setIncomeType(!incomeType);
  };

  const resetForm = () => {
    setIncomeType(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.target);
      const amount = parseFloat(formData.get("incomeAmount"));
      console.log("Submitting amount: ", amount);
      await fetch("http://localhost:4000/moneys/allocate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ amount }),
      });
      resetForm();
      setIsIncomePopupVisible(false);
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };

  return (
    <div className="income">
      <Modal>
        <ModalToggle>
          <button className="income-toggle">Income</button>
        </ModalToggle>
        <ModalMenu>
          <div className="income-menu">
            <form onSubmit={handleSubmit}>
              <input type="number" name="incomeAmount" placeholder="Income" />
              <div className="form-row">
                <input
                  type="hidden"
                  name="incomeType"
                  value={incomeType ? "borrow" : "earn"}
                />
                <div className="check-box-field" onClick={toggleIncomeType}>
                  <i
                    className={`bx ${
                      incomeType
                        ? "bx-checkbox bx-sm"
                        : "bxs-checkbox-checked bx-sm"
                    }`}
                  ></i>
                  <p>Earn</p>
                </div>
                <input
                  type="hidden"
                  name="incomeType"
                  value={incomeType ? "borrow" : "earn"}
                />
                <div className="check-box-field" onClick={toggleIncomeType}>
                  <i
                    className={`bx ${
                      incomeType
                        ? "bxs-checkbox-checked bx-sm"
                        : "bx-checkbox bx-sm"
                    }`}
                  ></i>
                  <p>Borrow</p>
                </div>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </ModalMenu>
      </Modal>
      <Modal>
        <ModalToggle>
          <button className="outcome-toggle">Outcome</button>
        </ModalToggle>
        <ModalMenu>
          <div className="income-menu">
            <form action="">
              <input type="number" placeholder="Outcome" />
              <button>Submit</button>
            </form>
          </div>
        </ModalMenu>
      </Modal>
    </div>
  );
}

export default Income;
