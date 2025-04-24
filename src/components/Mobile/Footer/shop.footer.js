import React from "react";

import { BsPerson } from "react-icons/bs";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { AiOutlineShop, AiOutlineShoppingCart, AiOutlineHome } from "react-icons/ai";

import { Link } from "react-router-dom";
import RightSidebar from "./Right.sidebar";

import "./index.scss"

function ShopFooter() {


    return (
        <div id="footer">
            <div className="footer">
                <div className="d-flex justify-content-between">


                    <div>
                        <MdOutlineProductionQuantityLimits className="footer-icon" />
                        <RightSidebar />
                        <p> More </p>
                    </div>

                    <Link to="/dashboard">
                        <div>
                            <AiOutlineHome className="footer-icon" />

                            <p>Home</p>
                        </div>
                    </Link>


                    <Link to="/account">
                        <div>
                            <BsPerson className="footer-icon" />
                            <p>Profile</p>
                        </div>
                    </Link>


                    {/* <div>
              <AiOutlineShoppingCart className="footer-icon" />
              <p>Cart</p>
            </div> */}
                </div>
            </div>
        </div>
    );

}
export default ShopFooter;
