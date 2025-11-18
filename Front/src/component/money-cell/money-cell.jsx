import React from "react";
import "@/component/money-cell/money-cell.css";

function MoneyCell(props) {
  const formattedTarget = Number(props.target).toLocaleString("fa-IR"); // یا "fa-IR" برای نقطه
  const formattedCurrent = Number(props.current).toLocaleString("fa-IR");
  return (
    <div className="money-cell">
      <div className="cell-content">
        <div className="title">{props.title}</div>
        <div className="prog-num">{props.prog}%</div>
        <div className="current">{formattedCurrent}</div>
        <div className="target">{formattedTarget}</div>
        <div className="prog" style={{ height: `${props.prog}%` }}></div>
      </div>
      <div className="cell-edit">
        <i className="bx bxs-pencil"></i>
        {/* <i className="bx bx-plus"></i> */}
      </div>
    </div>
  );
}

export default MoneyCell;
