import React from "react";
import { Form, Image } from "react-bootstrap";
import { lazy } from "react";
import { BsSearch } from "react-icons/bs";

import "./index.scss";
import LeftSidebar from "./Left.sidebar";
const favicon = "../../../../favicon.png";

function ShopHead() {

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];


  return (
    <div className="header  w-100">
      {/* <LeftSidebar className='align-self-center' /> */}
      <Form>
        <Form.Group className="mb-0 ml-3">
          <div className="col-xl-6 col-lg-5 text-center mt-1" style={{ fontSize: '40px', fontWeight: 'bold' }}>

            <span className='text-white'>
              {user.role.toUpperCase()}
            </span>

          </div>
        </Form.Group>
      </Form>
    </div>
  );
}
export default ShopHead;
