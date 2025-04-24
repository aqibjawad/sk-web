import React, { useState, useEffect } from "react";

import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Image, Button } from "react-bootstrap";

import { GET } from "../../apicontroller/ApiController";

const AllProducts = () => {
  const [products, setProduct] = useState([]);

  useEffect(() => {
    GET(`supercategory`).then((result) => {
      setProduct(result);
    });
  }, []);

  return (
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

            <span class="text-dark-50 mx-2"> / </span>
            <Link
              to=""
              className="text-dark-50"
              style={{ textDecoration: "none" }}
            >
              All Categories
            </Link>
          </h6>
        </nav>
      </div>

      {/* <Col> 
                <Row>
                    {products.map((product) => (
                        <Link className="ml-3" to={`/product/${product.title.replaceAll(" ", "-").toLowerCase()}-${product.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                            <div className="mb-3" style={{ borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)', backgroundColor: "#333333" }}>
                                <img src={`${process.env.REACT_APP_AWS_URL}${product.image}`} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", width: '100%', height: '200px', objectFit: "cover" }} fluid />
                                <div className="p-3">
                                    <span className="text-white">
                                        <strong> {product.title} </strong>
                                    </span>
                                </div>

                            </div>
                        </Link>
                    ))}
                </Row>
            </Col> */}

      <Row>
        {products.map((product) => (
          <div className="col-sm-3">
            <Link
              to={`/product/${product.title
                .replaceAll(" ", "-")
                .toLowerCase()}-${product.id}`}
              style={{ textDecoration: "none" }}
            >
              <div
                className="mb-3"
                style={{
                  borderRadius: "10px",
                  boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                }}
              >
                <img
                  src={`${process.env.REACT_APP_AWS_URL}${product.image}`}
                  style={{
                    borderTopLeftRadius: "10px",
                    borderTopRightRadius: "10px",
                    width: "100%",
                    height: "200px",
                    objectFit: "contain",
                  }}
                  fluid
                />
                <div className="p-3">
                  <div className="d-flex">
                    <span className="text-dark">
                      <strong> {product.title} </strong>
                    </span>
                  </div>
                </div>
                {/* <div className="text-center">
                                    <Link to={`/product/${product.title.replaceAll(" ", "-").toLowerCase()}-${product.id}`}>
                                        <div className="text-danger ml-5" > View Detail </div>
                                    </Link>
                                </div> */}
              </div>
            </Link>
          </div>
        ))}
      </Row>
    </div>
  );
};
export default AllProducts;
