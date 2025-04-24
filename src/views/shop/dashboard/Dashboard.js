import React, { useEffect, useState } from "react";

import { Card, Row, Col } from "react-bootstrap";

import "./index.css";

import { GET } from "../../../apicontroller/ApiController";

import { Link } from "react-router-dom";

import { BiStats } from "react-icons/bi";
import { IoMdStats } from "react-icons/io";
import { AiOutlineUserAdd, AiOutlineShoppingCart } from "react-icons/ai";
import { MdQueryStats } from "react-icons/md";

const Dashboard = () => {
  const listingId = localStorage.getItem("listingid");

  const [supercategory, setSuperCategory] = useState([]);
  const [category, setCategory] = useState([]);
  const [subcategory, setSubCategory] = useState([]);

  const [user, setUser] = useState([]);

  const [request, setRequest] = useState([]);

  const [shop, setShop] = useState([]);

  useEffect(() => {
    if (listingId) {
      GET(`listing/count/${listingId}`).then((result) => {
        setCategory(result[0]);
      });
    }

    GET("subcategory/count").then((result) => {
      setSubCategory(result[0]);
    });

    GET("supercategory/count").then((result) => {
      setSuperCategory(result[0]);
    });

    GET("category/count").then((result) => {
      setCategory(result[0]);
    });

    GET("subcategory/count").then((result) => {
      setSubCategory(result[0]);
    });

    GET("auth/count").then((result) => {
      setUser(result[0]);
    });

    GET("jobrequest/count").then((result) => {
      setRequest(result[0]);
    });

    GET("listing/count").then((result) => {
      setShop(result[0]);
    });
  }, [listingId]);

  return (
    <div className="container-fluid">
      <Row>
        <Col lg={6} md={3}>
          <Card
            style={{
              marginTop: "1rem",
              backgroundColor: "#1E1E1E",
              marginBottom: "1rem",
            }}
          >
            <Card.Body>
              <Card.Title>
                <div className="d-flex" style={{ color: "white" }}>
                  <span>Announcements</span>

                  <Link
                    to="/addannouncements"
                    className="btn"
                    style={{
                      color: "#FF6B00",
                      border: "1px solid #FF6B00",
                      marginLeft: "11rem",
                    }}
                  >
                    Add +
                  </Link>
                </div>
              </Card.Title>
              <Card.Text>
                <Link
                  to="/myannouncements"
                  className="btn"
                  style={{
                    marginTop: "1rem",
                    backgroundColor: "#FF6B00",
                    color: "white",
                    width: "100%",
                    borderRadius: "8px",
                    height: "50px",
                  }}
                >
                  Announcement List
                </Link>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} md={3}>
          <Card style={{ marginTop: "1rem", backgroundColor: "#1E1E1E" }}>
            <Card.Body>
              <Card.Title>
                <div className="text-center" style={{ color: "white" }}>
                  <span>Orders</span>
                </div>
              </Card.Title>
              <Card.Text>
                <div>
                  <Link
                    to="/shop-order"
                    className="btn"
                    style={{
                      marginTop: "1rem",
                      backgroundColor: "#FF6B00",
                      color: "white",
                      width: "100%",
                      borderRadius: "8px",
                      height: "50px",
                    }}
                  >
                    Order List
                  </Link>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6} md={3}>
          <Card
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#1E1E1E",
            }}
          >
            <Card.Body>
              <Card.Title>
                <div className="text-center" style={{ color: "white" }}>
                  <span>Products</span>
                </div>
              </Card.Title>
              <Card.Text>
                <div>
                  <Link
                    to="/addproduct"
                    className="btn"
                    style={{
                      marginTop: "1rem",
                      backgroundColor: "#FF6B00",
                      color: "white",
                      width: "100%",
                      borderRadius: "8px",
                      height: "50px",
                    }}
                  >
                    Products List
                  </Link>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={6} md={3}>
          <Card
            style={{
              marginTop: "1rem",
              marginBottom: "1rem",
              backgroundColor: "#1E1E1E",
            }}
          >
            <Card.Body>
              <Card.Title>
                <div className="text-center" style={{ color: "white" }}>
                  <span>Bank Details</span>
                </div>
              </Card.Title>
              <Card.Text>
                <div>
                  <Link
                    to="/shopbank"
                    className="btn"
                    style={{
                      marginTop: "1rem",
                      backgroundColor: "#FF6B00",
                      color: "white",
                      width: "100%",
                      borderRadius: "8px",
                      height: "50px",
                    }}
                  >
                    Bank List
                  </Link>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
