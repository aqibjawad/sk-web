import React, { useState } from 'react';
import './header.css';

const DropdownComponent = () => {

    return (
        <nav>
            <ul className="menu">

                <li>
                    <a href="#">Categories</a>
                    <ul className="submenu">
                        <li>
                            <a href="#">Apparel</a>
                            <ul className="submenu">
                                <li><a href="#">Men's Clothing</a></li>
                                <li><a href="#">Women's Clothing</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Art</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Electronics</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Food and Beverages</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Health and Beauty</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Health Care</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Home & Garden</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Sporting Goods</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Toys</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>

                        <li>
                            <a href="#">Others</a>
                            <ul className="submenu">
                                <li><a href="#">Smartphones</a></li>
                                <li><a href="#">Laptops</a></li>
                            </ul>
                        </li>
                    </ul>
                </li>
            </ul>
        </nav>
    );
};

export default DropdownComponent;
