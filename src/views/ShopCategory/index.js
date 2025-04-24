import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";

import { Col, Row, Container } from "react-bootstrap";

import { GET } from "../../apicontroller/ApiController";

const ShopCatProducts = () => {
  const { title } = useParams();

  let array = title.split("-");
  const id = array[array.length - 1];

  const [shopcategory, setShopCategory] = useState([]);

  useEffect(() => {
    GET(`listing/shop/category`).then((result) => {
      setShopCategory(result);
    });
  }, [title]);

  const calculateDiscountedPrice = (price, discount) => {
    const discountAmount = (discount / 100) * price;
    const discountedPrice = price - discountAmount;
    return discountedPrice.toFixed(2);
  };

  return (
    <Container className=" py-2" fluid>
      <Row>
        {shopcategory.map((categ) => (
          <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={categ.id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/product/${categ.SuperCatgory}-${
                categ.spc_id
              }/${categ.title.replaceAll(" ", "-")}-${categ.id}`}
            >
              <div
                className="mb-3"
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                }}
              >
                {categ.discount > 0 ? (
                  <div
                    style={{
                      position: "absolute",
                      top: "10px",
                      right: "10px",
                      backgroundColor: "red",
                      color: "white",
                      padding: "5px",
                      borderRadius: "5px",
                    }}
                  >
                    {`${categ.discount}% OFF`}
                  </div>
                ) : null}

                <img
                  src={`${process.env.REACT_APP_AWS_URL}${categ.image}`}
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  alt={`${categ.title}`}
                />
                <div
                  className="p-3"
                  style={{ backgroundColor: "#272727", color: "white" }}
                >
                  <div className="d-flex justify-content-between">
                    <div className="text-white">
                      <span>
                        <strong>{categ.title}</strong>
                      </span>
                    </div>

                    {window.innerWidth > 480 ? (
                      <div className="text-white">
                        {categ.discount > 0 ? (
                          <div>
                            <span
                              style={{
                                textDecoration: "line-through",
                                fontSize: "12px",
                              }}
                            >
                              {categ.currency} {categ.price}
                            </span>
                            <br />
                            <div className="text-center">
                              <span style={{ fontSize: "20px", color: "red" }}>
                                {`${categ.currency} ${calculateDiscountedPrice(
                                  categ.price,
                                  categ.discount
                                )}`}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span>{`${categ.currency} ${categ.price}`}</span>
                        )}
                      </div>
                    ) : (
                      <>
                        <div className="text-white">
                          {categ.discount ? (
                            <div>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  fontSize: "12px",
                                }}
                              >
                                {categ.currency} {categ.price}
                              </span>
                            </div>
                          ) : (
                            <span>{`${categ.currency} ${categ.price}`}</span>
                          )}
                        </div>

                        <div>
                          <div className="text-center">
                            <span style={{ fontSize: "20px", color: "red" }}>
                              {`${categ.currency} ${calculateDiscountedPrice(
                                categ.price,
                                categ.discount
                              )}`}
                            </span>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default ShopCatProducts;
