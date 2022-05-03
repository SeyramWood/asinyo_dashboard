import React from "react";
import Dashboard from './Dashboard'
import RecentSale from './RecentSale'
import BestSellingProduct from './BestSellingProduct'

const DashboardCTACard = ({label, value, icon, iconColor, subValue, subText}) => {
  return (
    <div className="dashboard__top__card">
      <div className="dashboard__top__card__main">
        <div className="text">
          <p>{label}</p>
          <p>{value}</p>
        </div>
        <div className={`icon blue ${iconColor}`}>
          <i className={`pi ${icon}`}></i>
        </div>
      </div>
      <p className="dashboard__top__card__sub">
        <span>{subValue}</span> {subText}
      </p>
    </div>
  );
}


  export {Dashboard, DashboardCTACard, RecentSale, BestSellingProduct}