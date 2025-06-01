import React, { useState, useEffect } from "react";
import { GET } from "../../apicontroller/ApiController";
import "./shop.css";
import { Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const HomeShop = () => {
  const [shopCat, setShopCat] = useState([]);

  useEffect(() => {
    GET(`listing/shop`).then((result) => {
      setShopCat(result);
    });
  }, []);

  return (
    <div id="shop">
      <div className="companies-title">
        <p>Shops</p>
      </div>

      <Row className="shop-items-container">
        {shopCat.map((shop, index) => (
          <Col sm={3} key={shop.id} className="shop-item">
            <Link
              style={{ textDecoration: "none" }}
              to={`/shop-category/${shop.shopname.replace(/\s+/g, "-")}-${
                shop.id
              }`}
            >
              <div className="shop-image-container">
                <img
                  className="shop-image"
                  src={`${process.env.REACT_APP_AWS_URL}${shop.banner_image}`}
                  alt={shop.shopname}
                />
              </div>
              <div className="text-center shop-name">
                <p>{shop.shopname}</p>
              </div>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default HomeShop;
