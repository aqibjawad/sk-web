import React, { useState, useEffect } from "react";
import { Option, FooterOptions, Options } from "./styles";

import { Link } from "react-router-dom";

import ScrollToTop from "./ScrollTop"

import { GET } from "../../../apicontroller/ApiController"
const Footer = () => {

    const [categories, setCategory] = useState([])

    useEffect(() => {

        GET(`supercategory`).then((result) => {
            setCategory(result)
        })
    }, [])
    return (
        <div>

            <div className="text-center" style={{ backgroundColor: '#233D7B', color: 'white' }}>
                {/* <button className="text-uppercase border-0">back to top</button> */}
                <ScrollToTop />
            </div>

            <div className="mx-auto row p-4" style={{ backgroundColor: '#131a22', color: 'whitesmoke' }}>
                <div className="col-md-4 col-6 my-2">
                    <h4> Quick Links </h4>

                    <Link to="aboutus" style={{ textDecoration: 'none', color: 'white' }}>
                        <Option> About Us </Option>
                    </Link>

                    <Link to="jobs" style={{ textDecoration: 'none', color: 'white' }}>
                        <Option> Career </Option>
                    </Link>

                    <Link to="/signup" style={{ textDecoration: 'none', color: 'white' }}>
                       <Option> Sign up </Option>
                    </Link>

                    <Link to="/signin" style={{ textDecoration: 'none', color: 'white' }}>
                        <Option> Login </Option>
                    </Link>

                    <Link to="/shop" style={{ textDecoration: 'none', color: 'white' }}>
                        <Option> Shops </Option>
                    </Link>
                </div>
{/* 
                <div className="col-md-4 col-6 my-2">
                    <h4> Categories </h4>

                    {categories && categories.map((category) => (
                        <Link to={`/product/${category.title.replaceAll(" ", "-").toLowerCase()}-${category.id}`} style={{ textDecoration: 'none', color: 'white' }}>
                            <Option> {category.title} </Option>
                        </Link>
                    ))}

                </div> */}
            </div>

            <FooterOptions>

                {/* <Develope>
                    Designed & Developed By <br />
                    AJ Solutions
                </Develope> */}
                <Options>
                    Copyright © 2022 - 2030 SoukCnter, Inc. <br />
                    All Rights Reserved
                </Options>
            </FooterOptions>
        </div>
    );
}
export default Footer