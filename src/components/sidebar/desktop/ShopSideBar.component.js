import React, { useState, useEffect } from "react";

import { Link, useNavigate, useLocation } from "react-router-dom";

import { FaHome, FaBoxOpen, FaDollarSign, FaExpandAlt } from "react-icons/fa";

import {
  AiFillDashboard,
  AiFillBank,
  AiOutlinePlus,
  AiFillShop,
  AiOutlineShopping,
} from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { MdProductionQuantityLimits } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { TbDetails } from "react-icons/tb";

import { slide as Menu } from "react-burger-menu";

import "./style.scss";

import { Auth } from "../../../context/Auth.Context";

const ShopSideBar = () => {
  var Styles = {
    paddingBottom: "10px",
    bmOverlay: {
      background: "rgba(0, 0, 0, 0.3)",
    },
  };

  const location = useLocation();
  const [active, setActive] = useState(1);
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const auth = Auth();

  // Set active menu based on current path when component mounts
  useEffect(() => {
    const path = location.pathname;
    if (path === "/dashboard") setActive(1);
    else if (path === "/account") setActive(2);
    else if (path === "/bank") setActive(3);
    else if (path === "/shopbank") setActive(4);
    else if (path === "/addproduct") setActive(5);
    else if (path === "/shopproduct") setActive(6);
    else if (path === "/myannouncements") setActive(7);
    else if (path === "/addannouncements") setActive(8);
    else if (path === "/shop-order") setActive(9);
    else if (path === "/notifications") setActive(10);
  }, [location]);

  // Load active state from localStorage if available
  useEffect(() => {
    const savedActive = localStorage.getItem("activeMenuItem");
    if (savedActive) {
      setActive(parseInt(savedActive));
    }
  }, []);

  // Save active state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeMenuItem", active);
  }, [active]);

  const logout = () => {
    auth.activateAuthentication(false);
    auth.activateToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshCycle");
    localStorage.removeItem("listingid");
    localStorage.removeItem("user");
    localStorage.removeItem("activeMenuItem");
    navigate("/signin");
  };

  // Active menu item style
  const activeStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "4px",
    padding: "8px",
    fontWeight: "bold"
  };

  return (
    <Menu left className="menu-item" isOpen={open}>
      <div
        className="menu-item"
        style={{ fontSize: ".875rem", fontWeight: "bold", marginTop: "-25px" }}
      >
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            {" "}
            My Account{" "}
          </span>
        </div>
      </div>

      <Link
        id="home"
        className="menu-item mt-3"
        to="/dashboard"
        onClick={() => {
          setActive(1);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 1 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <AiFillDashboard
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Dashboard</p>
        </div>
      </Link>

      <Link
        id="home"
        className="menu-item mt-1"
        to="/account"
        onClick={() => {
          setActive(2);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 2 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <BsFillPersonFill
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Profile Settings</p>
        </div>
      </Link>

      <Link
        id="home"
        className="menu-item mt-1"
        to="/bank"
        onClick={() => {
          setActive(3);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 3 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <AiFillBank
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Add Bank Details</p>
        </div>
      </Link>

      <Link
        id="home"
        className="menu-item mt-1"
        to="/shopbank"
        onClick={() => {
          setActive(4);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 4 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <TbDetails
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>My Bank Details</p>
        </div>
      </Link>

      <Link
        id="home"
        className="menu-item mt-1"
        to="/signin"
        onClick={() => {
          logout();
          setOpen(false);
        }}
        style={{ textDecoration: "none" }}
      >
        <div className="d-flex">
          <GrLogout
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Logout</p>
        </div>
      </Link>

      <div
        className="menu-item mt-4"
        style={{ fontSize: ".875rem", fontWeight: "bold" }}
      >
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            {" "}
            My Products{" "}
          </span>
        </div>
      </div>

      <Link
        id="home"
        className="menu-item mt-3"
        to="/addproduct"
        onClick={() => {
          setActive(5);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 5 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <MdProductionQuantityLimits
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Add Product</p>
        </div>
      </Link>

      <Link
        id="home"
        className="menu-item mt-3"
        to="/shopproduct"
        onClick={() => {
          setActive(6);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 6 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <AiFillShop
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Shop Products</p>
        </div>
      </Link>

      <div
        className="menu-item mt-4"
        style={{ fontSize: ".875rem", fontWeight: "bold" }}
      >
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            {" "}
            Announcements{" "}
          </span>
        </div>
      </div>

      <Link
        id="home"
        className="menu-item mt-3"
        to="/myannouncements"
        onClick={() => {
          setActive(7);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 7 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <TfiAnnouncement
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>My Announcements</p>
        </div>
      </Link>

      <Link
        id="home"
        className="menu-item mt-3"
        to="/addannouncements"
        onClick={() => {
          setActive(8);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 8 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <AiOutlinePlus
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Add Announcements</p>
        </div>
      </Link>

      <div
        className="menu-item mt-4"
        style={{ fontSize: ".875rem", fontWeight: "bold" }}
      >
        <div className="menu-content pt-8 pb-2">
          <span className="menu-section text-muted text-uppercase fs-8 ls-1">
            {" "}
            Orders{" "}
          </span>
        </div>
      </div>

      <Link
        id="home"
        className="menu-item mt-3"
        to="/shop-order"
        onClick={() => {
          setActive(9);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 9 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <AiOutlineShopping
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>My Orders</p>
        </div>
      </Link>

      <Link
        id="home"
        className="menu-item mt-1"
        to="/notifications"
        onClick={() => {
          setActive(10);
          setOpen(false);
        }}
        style={{ 
          textDecoration: "none",
          ...(active === 10 ? activeStyle : {})
        }}
      >
        <div className="d-flex">
          <GrLogout
            style={{
              marginTop: "0.3rem",
              marginRight: "0.5rem",
              fontSize: "20px",
              color: "white",
            }}
          />
          <p>Notifications</p>
        </div>
      </Link>
    </Menu>
  );
};
export default ShopSideBar;