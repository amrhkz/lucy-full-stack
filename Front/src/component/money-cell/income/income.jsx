"use client";
import React, { useEffect, useRef, useState } from "react";
import "@/component/money-cell/income/income.css";

function Income() {
  const [isIncomePopupVisible, setIsIncomePopupVisible] = useState(false);
  const [isOutcomePopupVisible, setIsOutcomePopupVisible] = useState(false);
  const [incomeType, setIncomeType] = useState(false); // state برای مدیریت lastSub
  const incomePopupRef = useRef(null);
  const outcomePopupRef = useRef(null);
  const incomeButtonRef = useRef(null);
  const outcomeButtonRef = useRef(null);

  const openIncomePopup = () => {
    setIsIncomePopupVisible(true);
    setIsOutcomePopupVisible(false);
  };

  const openOutcomePopup = () => {
    setIsOutcomePopupVisible(true);
    setIsIncomePopupVisible(false);
  };
  // تابع toggle برای تغییر مقدار lastSub
  const toggleIncomeType = () => {
    setIncomeType(!incomeType);
  };
  const closePopup = (event) => {
    // بررسی کلیک خارج از پاپ‌آپ‌ها
    if (
      incomePopupRef.current &&
      !incomePopupRef.current.contains(event.target) &&
      incomeButtonRef.current &&
      !incomeButtonRef.current.contains(event.target)
    ) {
      setIsIncomePopupVisible(false);
      resetForm(); // بازنشانی مقدار lastSub به false هنگام بستن
    }

    if (
      outcomePopupRef.current &&
      !outcomePopupRef.current.contains(event.target) &&
      outcomeButtonRef.current &&
      !outcomeButtonRef.current.contains(event.target)
    ) {
      setIsOutcomePopupVisible(false);
      resetForm(); // بازنشانی مقدار lastSub به false هنگام بستن
    }
  };

  useEffect(() => {
    document.addEventListener("click", closePopup);
    return () => {
      document.removeEventListener("click", closePopup);
    };
  }, []);

  // تابع برای بازنشانی فرم و مقدار lastSub
  const resetForm = () => {
    setIncomeType(false); // مقدار lastSub را به false برمی‌گرداند
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData(e.target);
      const amount = parseFloat(formData.get("incomeAmount")); // مقدار ورودی

      console.log("Submitting amount: ", amount); // برای اطمینان از فراخوانی تابع

      // فراخوانی تابع برای تخصیص مبلغ
      await fetch("http://localhost:4000/moneys/allocate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // برای ارسال کوکی (توکن)
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
      <button
        className="income-toggle"
        ref={incomeButtonRef}
        onClick={openIncomePopup}
      >
        Income
      </button>
      <button
        className="outcome-toggle"
        ref={outcomeButtonRef}
        onClick={openOutcomePopup}
      >
        Outcome
      </button>

      {/* پاپ‌آپ مربوط به Income */}
      {isIncomePopupVisible && (
        <>
          <div className="popup-background"></div>
          <div className="income-menu" ref={incomePopupRef}>
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
                  <p>Earn ?</p>
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
                  <p>Borrow ?</p>
                </div>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </>
      )}

      {/* پاپ‌آپ مربوط به Outcome */}
      {isOutcomePopupVisible && (
        <>
          <div className="popup-background"></div>
          <div className="income-menu" ref={outcomePopupRef}>
            <form action="">
              <input type="number" placeholder="Outcome" />
              <button>Submit</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}

export default Income;
