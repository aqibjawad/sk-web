import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Image, Button, Modal } from "react-bootstrap";
import { GET, GETID } from "../../apicontroller/ApiController";
import { CiLocationOn } from "react-icons/ci";
import { MdContactPhone } from "react-icons/md";

const ShopInside = () => {
  const { name } = useParams();
  const [shops, setShop] = useState([]);
  const [listing, setListing] = useState([]);
  const [productid, setProductId] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let array = name.split("-");
    const id = array[array.length - 1];

    GET(`listing/shop/${id}`).then((result) => {
      setShop(result[0]);
    });

    GET(`listing/${id}`).then((result) => {
      setListing(result);
    });
  }, [name]);

  const view = async (event, id) => {
    setProductId(id);
    GETID("listing", id, "");
    handleShow();
  };

  return (
    <div className="centered-columns-container">
      <Row>
        <Col sm={4} className="mt-3 mb-4">
          <div
            className="card"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            }}
          >
            <div className="d-flex justify-content-center">
              <img
                src={
                  shops && shops.banner_image
                    ? `${process.env.REACT_APP_AWS_URL}${shops.banner_image}`
                    : "https://placehold.co/800x400"
                }
                style={{
                  objectPosition: "center center",
                  width: "100%",
                  height: "100%",
                }}
                alt="Shop Banner"
              />
            </div>

            <div className="text-center">
              <Row>
                <Col className="">
                  <span className="text-dark">
                    <strong> {shops && shops.shopname} </strong>
                  </span>
                </Col>

                <Col>
                  <div>
                    <span className="text-dark">
                      {" "}
                      <strong> {shops && shops.email} </strong>{" "}
                    </span>
                  </div>
                </Col>
              </Row>

              <Row className="mb-4 mt-4">
                <Col sm={12}>
                  <div className="text-dark">
                    <CiLocationOn /> <strong> {shops && shops.address} </strong>
                  </div>
                </Col>

                <Col sm={12}>
                  <div className="mt-3">
                    <div className="text-muted">
                      <MdContactPhone />
                      <a
                        style={{ color: "black", textDecoration: "none" }}
                        href={`tel:${shops && shops.phone}`}
                      >
                        {shops && shops.phone}
                      </a>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>

          <div
            className="card mt-3"
            style={{
              borderRadius: "10px",
              boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3 className="text-center mt-3"> Notifications </h3>
            <div className="p-3 text-center">
              <span className="text-dark">
                <strong> {shops && shops.name} </strong>
              </span>

              <div>
                <span className="text-muted">
                  {" "}
                  <strong> {shops && shops.ShopDescp} </strong>{" "}
                </span>
              </div>
            </div>
          </div>
        </Col>

        <Col sm={8}>
          <Row>
            {listing &&
              listing.map((prod) => (
                <Col sm={4} className="mt-3" key={prod.id}>
                  <div
                    className="mb-3 text-center h-100"
                    style={{
                      borderRadius: "10px",
                      boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <div style={{ height: "200px", overflow: "hidden" }}>
                      <img
                        src={
                          prod.image
                            ? `${process.env.REACT_APP_AWS_URL}${prod.image}`
                            : "https://placehold.co/600x400"
                        }
                        style={{
                          objectPosition: "center center",
                          width: "100%",
                          height: "100%",
                          objectFit: "contain",
                        }}
                        alt={prod.title || "Product Image"}
                      />
                    </div>
                    <div className="p-3 d-flex flex-column flex-grow-1">
                      <span className="text-dark mb-2">
                        <strong>{prod.title}</strong>
                      </span>

                      <div className="d-flex justify-content-center mb-3">
                        {/* <span className="text-dark mr-1">{prod.currency}</span>
                        <span className="text-muted">
                          <strong>{prod.price}</strong>
                        </span> */}
                        {prod.discount > 0 ? (
                          <>
                            {/* Product Pricing */}
                            <div className="pricing-container">
                              {/* Discounted Price */}
                              <div className="h5 text-danger">
                                {prod.currency}{" "}
                                {(
                                  prod.price -
                                  (prod.price * prod.discount) / 100
                                ).toFixed(2)}
                              </div>

                              {/* Original Price (Strikethrough) */}
                              <div className="text-muted">
                                <del>
                                  {prod.currency} {prod.price}
                                </del>
                              </div>

                              {/* Discount Percentage */}
                              <div className="text-success">
                                ({prod.discount}% OFF)
                              </div>
                            </div>
                          </>
                        ) : (
                          // When no discount (0%), show original price in red
                          <span
                            className="h5 text-danger"
                            style={{ textAlign: "justify" }}
                          >
                            {prod.currency} {prod.price}
                          </span>
                        )}
                      </div>

                      <div className="mt-auto">
                        <Link
                          to={`/product/${prod.super_category_title}-${prod.spc_id}/${prod.title}-${prod.catId}`}
                          className="text-danger"
                        >
                          View Detail
                        </Link>
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default ShopInside;
