import React, { useState } from "react";
import { Link } from "react-router-dom";

//Internationalization
import { withTranslation } from 'react-i18next';

import "./adminNav.css";

const AdminNav = ({ t }) => {

  const [activeState, setactiveState] = useState("")
  const handleClickActiveState = (value) => {
    return setactiveState(value)
  }
  return (
    <main className="--admin--main">
      <Link
        onClick={() => handleClickActiveState("Admin Dashboard")}
        className={activeState === "Admin Dashboard" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/admin">
        {t('headers.adminHeader.adminNav.adminDashboard')}
      </Link>
      <Link
        onClick={() => handleClickActiveState("List Products")}
        className={activeState === "List Products" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/admin/listproducts">
        {t('headers.adminHeader.adminNav.listBeats')}
      </Link>
      <Link
        onClick={() => handleClickActiveState("Add Product")}
        className={activeState === "Add Product" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/add">
        {t('headers.adminHeader.adminNav.addBeats')}
      </Link>
      <Link
        onClick={() => handleClickActiveState("List Oferts")}
        className={activeState === "List Oferts" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/admin/oferts">
        Add Oferts
      </Link>
      <Link
        onClick={() => handleClickActiveState("List Coupons")}
        className={activeState === "List Coupons" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/admin/coupons/list">
        List Coupons
      </Link>
      <Link
        onClick={() => handleClickActiveState("Add Coupons")}
        className={activeState === "Add Coupons" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/admin/coupons/add">
        Add Coupons
      </Link>
      <Link
        onClick={() => handleClickActiveState("List Categories")}
        className={activeState === "List Categories" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/listcat">
        {t('headers.adminHeader.adminNav.listGenre')}
      </Link>

      <Link
        onClick={() => handleClickActiveState("Add Categories")}
        className={activeState === "Add Categories" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/addcategories">
        {t('headers.adminHeader.adminNav.addGenre')}
      </Link>
      <Link
        onClick={() => handleClickActiveState("List Users")}
        className={activeState === "List Users" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/admin/ListUsers">
        {t('headers.adminHeader.adminNav.listUsers')}
      </Link>
      <Link
        onClick={() => handleClickActiveState("List Orders")}
        className={activeState === "List Orders" ? "--admin--main-btn --admin--main-btn-active" : "--admin--main-btn"} to="/admin/listorders">
                {t('headers.adminHeader.adminNav.orderList')}
      </Link>
    </main>
  );
};

export default withTranslation()(AdminNav);
