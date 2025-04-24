import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GET } from "../../apicontroller/ApiController";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "./home.css";

import { Row } from "react-bootstrap";

const HomeShopVendor = () => {
  const handleOnSlideChange = (e) => {
    // Handle slide change event
  };

  const [approve, setApproved] = useState([]);

  useEffect(() => {
    GET(`listing/approve`).then((result) => {
      setApproved(result);
    });
  }, []);

  return (
    <div id="shop">
      <div className="container">
        <div className="category-title">SHOP BY CATEGORY</div>
        <div className="line mt-4"></div>
      </div>
      {/* <Swiper
                spaceBetween={20}
                navigation
                pagination={{ clickable: true }}
                breakpoints={{
                    // When window width is >= 320px
                    320: {
                        slidesPerView: 1
                    },
                    // When window width is >= 480px
                    480: {
                        slidesPerView: 2
                    },
                    // When window width is >= 768px
                    768: {
                        slidesPerView: 3
                    },
                    // When window width is >= 992px
                    992: {
                        slidesPerView: 4
                    }
                }}
            >
                {approve.map((shop) => (
                    <SwiperSlide key={shop.id}>
                        <div className="card" style={{ width: '18rem', border: 'none', backgroundColor: '#f0f0f0' }}>
                            <Link to={`/shop/${shop.shopname}-${shop.id}`}>
                                <img
                                    className="home-shop-image"
                                    src={`${process.env.REACT_APP_AWS_URL}${shop.banner_image}`}
                                    alt={shop.shopname}
                                    style={{ objectFit: 'cover', objectPosition: 'center center', width: '100%', height: '100%' }}
                                />
                            </Link>

                            <div className="card-body">
                                <h5 className="card-title text-center">{shop.shopname}</h5>
                                <p className="card-text">{shop.description} ...</p>
                                <div>
                                    <hr className="custom-hr" />
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper> */}

      <Row>
        {approve.map((shop) => (
          <div className="col-6 col-sm-6 col-md-3 mb-5" key={shop.id}>
            <Link
              to={`/shop/${shop.shopname}-${shop.id}`}
              style={{ color: "black", textDecoration: "none" }}
            >
              <div className="card">
                <img
                  className="card-img-top"
                  src={`${process.env.REACT_APP_AWS_URL}${shop.banner_image}`}
                  alt={shop.shopname}
                  style={{
                    objectFit: "contain",
                    objectPosition: "center center",
                    width: "100%",
                    height: "200px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{shop.name}</h5>
                  <p className="card-text">{shop.description} ...</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Row>
    </div>
  );
};

export default HomeShopVendor;
