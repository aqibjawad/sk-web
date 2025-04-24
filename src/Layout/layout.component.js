import React from "react";

import Header from "../components/Desktop/User.desktop";
import UserHead from "../components/Mobile/Header/User.mobile";

import Footer from "../components/Footer/Desktop/index.js"
import MobileFooter from "../components/Mobile/Footer";


import "./index.css"

const Layout= ({children})=>{
    return(
        <React.Fragment>

            {window.innerWidth > 480 ? (
                <Header />
            ):(
                <UserHead />   
            )}   

            <div className="main-body">
                {children}
            </div>

            {window.innerWidth > 480 ? (
                <Footer />
            ):(
                <MobileFooter />
            )} 

        </React.Fragment>
    );
}
export default Layout;