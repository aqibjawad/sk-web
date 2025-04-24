import React, { useEffect } from "react";

import Upcoming from "./home.card";

import Banner from "./home.banner";
import Appearl from "./home.appearl";

import HomeShop from "./home.shop";

import Products from "./home.product";

import FeaturePro from "./home.feattured";

import DiscountProduct from "./home.discountProducts";

import HomeShopVendor from "./Home.ShopVendor";

import { Col, Row } from "react-bootstrap";

import "./home.scss";

const Home = () => {
  return (
    <div id="home-page-wrapper">
      <div>
        <Row>
          <Col sm={3}>
            <div>{window.innerWidth > 480 ? <Products /> : ""}</div>
          </Col>

          <Col sm={9}>
            <Banner />
          </Col>
        </Row>
      </div>
      <FeaturePro />

      <Appearl />

      <div>
        <Row>
          {/* <Col sm={12}>
            <HomeShopVendor />
          </Col> */}

          <Col sm={6}>
            <HomeShop />
          </Col>
        </Row>
      </div>

      {/* <hr />
            <Upcoming /> */}
    </div>
  );
};
export default Home;
