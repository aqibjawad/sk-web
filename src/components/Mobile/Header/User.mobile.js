import React from "react";
import { Form } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import "./index.css"; // Assuming you have some styles defined in index.scss
import "./index.scss";

import LeftSidebar from "./Left.sidebar";


function MobileHeader() {
  return (
    <div className="mobile-header">
      <LeftSidebar className='align-self-center' />
      <div className="logo-container">
        {/* <img src="/assets/logos/souk center-logos.jpeg" alt="Logo" className="logo" /> */}
        <h2 style={{color:'white'}}> SoukCenter </h2>
      </div>

      {/* Second Row: Search Bar */}
      <Form className="search-form">
        <Form.Group className="mb-0">
          <div className="d-flex search">
            <Form.Control className="search-bar" type="text" placeholder="What Are You Looking For?" />
            <BsSearch className="search-icon" />
          </div>
        </Form.Group>
      </Form>
    </div>
  );
}

export default MobileHeader;
