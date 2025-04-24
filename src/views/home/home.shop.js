import React, { useState, useEffect } from "react";
// import Carousel from 'react-bootstrap/Carousel';
import { GET } from "../../apicontroller/ApiController";

import "./home.css";

import { Row } from "react-bootstrap";

import { Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

import {
  CarouselProvider,
  Slider,
  Slide,
  DotGroup,
  Dot,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const HomeShop = () => {
  const [shopCat, setShopCat] = useState([]);

  useEffect(() => {
    GET(`shopcategory`).then((result) => {
      setShopCat(result);
    });
  }, []);

  const getRouteByType = (type) => {
    if (type === "apparel") {
      return "/apparel-route";
    } else if (type === "art") {
      return "/art-route";
    } else if (type === "electronics") {
      return "/electronics-route";
    } else {
      // Handle other types or provide a default route
      return "/";
    }
  };

  return (
    <div id="shop">
      <div className="companies-title">
        <p> Shops </p>
      </div>

      <Row>
        {shopCat.map((shop, index) => (
          <Col sm={3}>
            <Link
              style={{ textDecorationn: "none" }}
              to={`/shop-category/${shop.title}-${shop.id}`}
            >
              <div>
                <img
                  className="circular-image"
                  src={`${process.env.REACT_APP_AWS_URL}${shop.image}`}
                />
              </div>

              <div className="text-center">
                <p> {shop.title} </p>
              </div>
            </Link>
          </Col>
        ))}

        {/* <Col sm={3}>
                    <div>
                        <img className="circular-image" src="/assets/categories/Food.webp" />
                    </div>

                    <div className='text-center'>
                        <p>Food</p>
                    </div>
                </Col>

                <Col sm={3}>
                    <div>
                        <img className="circular-image" src="/assets/categories/health-beauty.webp" />
                    </div>

                    <div className='text-center'>
                        <p>Health & Beauty</p>
                    </div>
                </Col>

                <Col sm={3}>
                    <div>
                        <img className="circular-image" src="/assets/categories/health-care.webp" />
                    </div>

                    <div className='text-center'>
                        <p>Health Care</p>
                    </div>
                </Col>

                <Col sm={3}>
                    <div>
                        <img className="circular-image" src="/assets/categories/home-garden.webp" />
                    </div>

                    <div className='text-center'>
                        <p>Home & Garden</p>
                    </div>
                </Col>

                <Col sm={3}>
                    <div>
                        <img className="circular-image" src="/assets/categories/sporting-goods.webp" />
                    </div>

                    <div className='text-center'>
                        <p>Sporting Goods</p>
                    </div>
                </Col>

                <Col sm={3}>
                    <div>
                        <img className="circular-image" src="/assets/categories/toys-games.webp" />
                    </div>

                    <div className='text-center'>
                        <p>Toyes and Games</p>
                    </div>
                </Col>

                <Col sm={3}>
                    <div>
                        <img className="circular-image" src="/assets/categories/pet-supplies.webp" />
                    </div>

                    <div className='text-center'>
                        <p> Others </p>
                    </div>
                </Col> */}
      </Row>
    </div>
  );
};

export default HomeShop;
