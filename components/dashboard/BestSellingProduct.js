import React from "react";
import { ProgressBar } from "primereact/progressbar";


const BestSellingProduct = ({ name, category, value, color }) => {
  return (
    <div className="best__selling__products__product">
      <div className="info">
        <p className="info__name">{name}</p>
        <small className="info__category">{category}</small>
      </div>
      <div className="progress__container">
        <div className="progress__container__bar">
        <ProgressBar
          showValue={false}
          value={value}
          color={color}
        ></ProgressBar>
        </div>
        <small className="progress__container__text" style={{ color:color }}>%{value}</small>
      </div>
    </div>
  );
};

export default BestSellingProduct;
