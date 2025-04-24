import React from "react";

import { MainContentShop, ShopDiv } from "./styles";

import ShopSideBar from "../components/sidebar/desktop/ShopSideBar.component";
import Mobile from "../components/sidebar/mobile/mobile.component";

import ShopHeader from "../components/Desktop/shop.desktop"
// import ShopMobile from "../components/Header/mobile/shopmobhead";
import ShopHead from "../components/Mobile/Header/Shop.mobile";

import Footer from "../components/Footer/Desktop/index"
import ShopFooter from "../components/Mobile/Footer/shop.footer";

import "./index.css"

const ShopLayout = ({ children }) => {
    return (
        <React.Fragment>

            {window.innerWidth > 480 ? (
                <ShopHeader />
            ) : (
                <ShopHead />
            )}


            <ShopDiv>
                {window.innerWidth > 480 ? (
                    <ShopSideBar />
                ) : (
                    ""
                )}
            </ShopDiv>

                <div className="main-body-shop">
                    {children}
                </div>

            {window.innerWidth > 480 ? (
                <Footer />
            ) : (
                <ShopFooter />
            )}

        </React.Fragment>
    );
}
export default ShopLayout;