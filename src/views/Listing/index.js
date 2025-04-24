import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import { GET } from "../../apicontroller/ApiController";

import { Auth } from "../../context/Auth.Context";

const Listing = () => {
  const [approve, setApproved] = useState([]);
  const [listing, setListing] = useState([]);

  useEffect(() => {
    GET(`listing/approve`).then((result) => {
      setApproved(result);
    });

    GET(`listing`).then((result) => {
      setListing(result);
    });
  }, []);

  return (
    <div>
      <div className="">
        <div className="container py-4">
          <nav className="d-flex">
            <h6 className="mb-0">
              <Link
                to="/"
                className="text-dark-50"
                style={{ textDecoration: "none" }}
              >
                Home
              </Link>
              <span className="text-dark-50 mx-2"> / </span>
              All Shops
            </h6>
          </nav>
        </div>
      </div>

      <Container className=" py-2" fluid>
        <Row>
          {approve.map((shop) => (
            <div className="col-sm-3">
              <Link
                style={{ textDecoration: "none" }}
                to={`/shop/${shop.shopname}-${shop.id}`}
              >
                <div
                  className="mb-3"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  <img
                    src={
                      shop.banner_image
                        ? `${process.env.REACT_APP_AWS_URL}${shop.banner_image}`
                        : "https://placehold.co/600x300"
                    }
                    style={{
                      objectFit: "cover",
                      objectPosition: "center center",
                      width: "100%",
                      height: "100%",
                    }}
                    alt="Shop Banner"
                  />

                  <div
                    className="p-3"
                    style={{ backgroundColor: "#272727", color: "white" }}
                  >
                    <div className="d-flex">
                      <span className="">
                        <strong> {shop.shopname} </strong>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Row>
      </Container>
    </div>
  );
};
export default Listing;
