import React, { useState, useEffect } from "react";

import ShopProducts from "../shopproducts/products";

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



const Profile = () => {

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  const header = { "x-access-token": localStorage.getItem("token") };

  return (
    <div className="w-100">
      {/* ===================== Hero Header ==================== */}

      <Row>
        <Col>
          <img src={`${process.env.REACT_APP_AWS_URL}${user.image}`} style={{width: '80%', height: '200px', objectFit: "contain", marginLeft:'5rem' }} />
        </Col>
        <Col>
          <div className="mt-5" >
            <div className="text-center">
              <h3 className=" text-dark"> {user.name} </h3>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-dark"> {user.email} </h3>
            </div>

            <div className="text-center mt-4">
              <h3 className="text-dark"> {user.address} </h3>
            </div>
          </div>
        </Col>
      </Row>

      <div>
        <h3 className="mt-3 text-center"> Products </h3>
        <ShopProducts />
      </div>
    </div>
  );
};

export default Profile;
