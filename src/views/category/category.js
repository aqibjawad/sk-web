import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";

import { GET } from "../../apicontroller/ApiController";

import { Auth } from "../../context/Auth.Context";

const Category = () => {
  const isAuthenticated = Auth().isAuthenticated;

  const { category } = useParams();

  const [categories, setCategory] = useState([]);

  const [supercategory, setSuperCategory] = useState([]);

  const [filter, setFilter] = useState([]);

  const [clicklike, setClickLike] = useState(true);

  let array = category.split("-");
  const id = array[array.length - 1];

  useEffect(() => {
    GET(`supercategory/${id}`).then((result) => {
      setSuperCategory(result);
    });

    GET(`category/${id}`).then((result) => {
      setCategory(result);
    });
  }, [category]);

  var eventStyle = {
    boxShadow: "0 3px 6px rgb(0 0 0 / 8%)",
  };

  const range = async (start, end) => {
    const result = await GET(`category/pricerange?start=${start}&end=${end}`);
    setFilter(result);
  };

  const calculateDiscountedPrice = (price, discount) => {
    const discountAmount = (discount / 100) * price;
    const discountedPrice = price - discountAmount;
    return discountedPrice.toFixed(2);
  };

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
              {categories[0] && categories[0].SuperCatgory}
            </h6>
          </nav>
        </div>
      </div>

      <Container className=" py-2" fluid>
        <Row>
          {categories.map((categ) => (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={categ.id}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/product/${categ.SuperCatgory}-${
                  categ.spc_id
                }/${categ.title.replaceAll(" ", "-")}-${categ.catId}`}
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
                                <span
                                  style={{ fontSize: "20px", color: "red" }}
                                >
                                  {`${
                                    categ.currency
                                  } ${calculateDiscountedPrice(
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
    </div>
  );
};
export default Category;
