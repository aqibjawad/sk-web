import React, { useState, useEffect } from "react";

import { slide as Menu } from "react-burger-menu";
import { Link } from "react-router-dom";

import { AiOutlineShop } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";

import { GET } from "../../../apicontroller/ApiController"

function LeftSidebar() {

  const [topCat, setTopCat] = useState([])

  useEffect(() => { 

    GET(`supercategory/top`).then((result) => {
      setTopCat(result)
    })


  }, [])

  return (
    <div id="left-sidebar">
      <Menu left>
        <div className="d-flex">
          <div className="ml-3">
            <p>
              <AiOutlineShop className="mr-2" />
              Shop
            </p>
          </div>

          <div>
            <p className="ml-2">
              <BsPerson className="mr-2" />
              Account
            </p>
          </div>
        </div>
        {topCat.map((topcat) => (

          <Link to={`/product/${topcat.title.replaceAll(" ", "-").toLowerCase()}-${topcat.id}`} id="home" className="menu-item">
            <div className="d-flex">
              <img className="mt-3" src={`${process.env.REACT_APP_AWS_URL}${topcat.image}`} style={{ objectFit: 'contain', width: '20%', height: '30px' }} />
                <p className="mt-3 ml-2">
                {topcat.title} 
                </p>
            </div>
          </Link>
        ))}

      </Menu>
    </div>
  );
}
export default LeftSidebar;
