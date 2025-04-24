import React from "react";
import { Form } from "react-bootstrap";

import { BsPerson } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";

import "./index.scss"

function MobileFooter() {


  return (
    <div id="footer">
      <div className="footer">
        <div className="d-flex justify-content-between">
          <Link to='/allproducts'>
            <div>
              <MdOutlineProductionQuantityLimits className="footer-icon" />
              {/* <RightSidebar  /> */}
              <p> Categories </p>
            </div>
          </Link>

          <Link to='/shop'>
            <div>
              <AiOutlineShop className="footer-icon" />
              {/* <RightSidebar  /> */}
              <p> Shops </p>
            </div>
          </Link>

          <Link to="/">
            <div>
              <AiOutlineHome className="footer-icon" />
              <p>Home</p>
            </div>
          </Link>

            <Link to="/signin">
              <div>
                <BsPerson className="footer-icon" />
                <p>Profile</p>
              </div>
            </Link>


            <div>
              <AiOutlineShoppingCart className="footer-icon" />
              <p>Cart</p>
            </div>
        </div>
      </div>
    </div>
  );

}
export default MobileFooter;
