import React, { useState, useEffect, useMemo } from "react";

// import { StyledTool } from './styles';

import { Link, useNavigate } from "react-router-dom";

import { GET } from "../../apicontroller/ApiController";
import { Auth } from "../../context/Auth.Context";

import { AiOutlineShopping } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";

import { BsSearch } from "react-icons/bs";

import { GrLogout } from "react-icons/gr";

import { Row, Col, Button, Dropdown } from "react-bootstrap";

import "./header.scss";

const Header = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  const { isAuthenticated } = Auth();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const auth = Auth();

  const logout = () => {
    auth.activateAuthentication(false);
    auth.activateToken("");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshCycle");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  const [supercategory, setSuperCategory] = useState([]);

  const [notifications, setNoti] = useState([]);

  const [shops, setShops] = useState([]);

  console.log(shops);

  useEffect(() => {
    GET(`supercategory`).then((result) => {
      setSuperCategory(result);
    });

    GET(`notification/${user.UserId}`).then((result) => {
      setNoti(result);
    });

    GET(`listing/shop/${user.UserId}`)
      .then((result) => {
        setShops(result);
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
      });
  }, []);

  const MenuOptions = useMemo(() => {
    return [{}, ...supercategory];
  }, [supercategory]);

  var inputStyle = {
    outline: "none",
    boxShadow: "none",
  };

  var buttonStyle = {
    height: "47px",
    borderRadius: "0px",
    backgroundColor: "#343A40",
  };

  return (
    <div id="userheader">
      <div style={{ backgroundColor: "#272727" }}>
        <div className="d-flex justify-content-between w-100 p-3">
          <div>
            <Link
              to="/dashboard"
              style={{ color: "white", textDecoration: "none" }}
            >
              <h3 className="mb-0 mt-3" style={{ marginLeft: "5rem" }}>
                SoukCenter
              </h3>
            </Link>
          </div>

          <div
            className="col-xl-6 col-lg-5 text-center mt-1"
            style={{ fontSize: "40px", fontWeight: "bold" }}
          >
            <Link
              to="/account"
              style={{ color: "white", textDecoration: "none" }}
            >
              <span className="text-white">
                {user.role.toUpperCase()} / {shops[0]?.shopname}{" "}
              </span>
            </Link>
          </div>

          <div>
            <div className="d-flex" style={{ fontWeight: "bold" }}>
              {!isAuthenticated && (
                <>
                  <div className="d-flex menu-item">
                    <Link
                      className="text-white text-decoration-none"
                      to="/signin"
                    >
                      Login
                    </Link>
                    <span className="text-white"> / </span>
                    <Link
                      className="text-white text-decoration-none"
                      to="/signup"
                    >
                      Signup
                    </Link>
                  </div>

                  <div className="d-flex menu-item">
                    <Link
                      className="text-white text-decoration-none"
                      to="/shop"
                    >
                      Shops{" "}
                      <AiOutlineShopping
                        style={{ fontSize: "25px", marginTop: "-0.5rem" }}
                      />
                    </Link>
                  </div>
                </>
              )}
            </div>

            {isAuthenticated && (
              <div className="d-flex">
                <Dropdown className="dropdown-toggle">
                  <Dropdown.Toggle
                    style={{
                      backgroundColor: "transparent",
                      border: "transparent",
                      color: "white",
                    }}
                  >
                    {user.image ? (
                      <img
                        src={`${process.env.REACT_APP_AWS_URL}${user.image}`}
                        style={{
                          borderRadius: "50px",
                          height: "50px",
                          objectFit: "contain",
                          marginLeft: "2rem",
                          cursor: "pointer",
                        }}
                      />
                    ) : (
                      <img
                        src="/userpic.jpg"
                        style={{
                          borderRadius: "50px",
                          height: "50px",
                          objectFit: "contain",
                          marginLeft: "2rem",
                          cursor: "pointer",
                        }}
                      />
                    )}
                  </Dropdown.Toggle>

                  <Dropdown.Menu
                    style={{
                      backgroundColor: "white",
                      width: "300px",
                      marginLeft: "-10rem",
                      marginTop: "1rem",
                    }}
                  >
                    <div
                      className="text-dark mt-2 text-center"
                      style={{ fontWeight: "bold", fontSize: "18px" }}
                    >
                      <span>Use the website as:</span>
                    </div>

                    <div
                      className="mt-3"
                      style={{
                        borderTop: "1px solid black",
                        marginLeft: "1rem",
                        marginRight: "1rem",
                      }}
                    ></div>

                    <div className="d-flex mt-2">
                      {user.image ? (
                        <img
                          src={`${process.env.REACT_APP_AWS_URL}${user.image}`}
                          style={{
                            borderRadius: "50px",
                            height: "50px",
                            objectFit: "contain",
                            marginLeft: "2rem",
                            cursor: "pointer",
                            marginTop: "1rem",
                          }}
                        />
                      ) : (
                        <img
                          src="/userpic.jpg"
                          style={{
                            marginTop: "1rem",
                            borderRadius: "50px",
                            height: "50px",
                            objectFit: "contain",
                            marginLeft: "2rem",
                            cursor: "pointer",
                          }}
                        />
                      )}

                      <div className=" d-flex flex-column text-dark mt-1">
                        <span className="ml-3">
                          <Link
                            to="/account"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            {user.name.toUpperCase()}
                          </Link>
                        </span>

                        <span className="ml-3">
                          <Link
                            to="/account"
                            style={{ color: "black", textDecoration: "none" }}
                          >
                            {user.email}
                          </Link>
                        </span>

                        <span className="ml-3 text-dark">
                          {user.role} Account
                        </span>
                      </div>
                    </div>

                    <div
                      className="mt-3"
                      style={{
                        borderTop: "1px solid black",
                        marginLeft: "1rem",
                        marginRight: "1rem",
                      }}
                    ></div>

                    <Link
                      className="menu-item text-white"
                      to="/signin"
                      onClick={() => setOpen(false)}
                      style={{ textDecoration: "none", marginTop: "1rem" }}
                    >
                      <div className="d-flex">
                        <GrLogout
                          onClick={logout}
                          style={{
                            marginLeft: "3rem",
                            fontSize: "30px",
                            color: "white",
                          }}
                        />
                        <span className="ml-4 text-dark" onClick={logout}>
                          Logout
                        </span>
                      </div>
                    </Link>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;
