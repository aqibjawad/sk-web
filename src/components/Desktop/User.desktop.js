import React, { useState, useEffect, useMemo } from "react";
import { SecondAppBar } from "./styles";
import Options from "./options";
import { Link, useNavigate } from "react-router-dom";
import { GET } from "../../apicontroller/ApiController";
import { Auth } from "../../context/Auth.Context";
import { AiOutlineShopping, AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { BsSearch } from "react-icons/bs";
import { GrLogout } from "react-icons/gr";
import { Row, Col, Button, Dropdown } from "react-bootstrap";
import "./header.scss";
import "./header.css";
import { IoMdPerson } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";
import { IoList } from "react-icons/io5";
import { Cascader } from "antd";
import DropdownComponent from "./MultiLevel.dropdown";

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
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryClick = (subCategory) => {
    setSelectedSubCategory(subCategory);
  };

  useEffect(() => {
    GET(`supercategory`).then((result) => {
      setSuperCategory(result);
    });

    GET(`notification/${user.UserId}`).then((result) => {
      setNoti(result);
    });

    return () => {
      setIsHovered(false);
    };
  }, []);

  const MenuOptions = useMemo(() => {
    return [{}, ...supercategory];
  }, [supercategory]);

  // Function to handle search submission
  const handleSearchSubmit = (e) => {
    if (e) {
      e.preventDefault(); // Prevent form submission default behavior
    }

    if (searchQuery.trim()) {
      // Redirect to search results page with the query parameter
      navigate(`/search-results?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Handle key press for Enter key
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearchSubmit(e);
    }
  };

  const inputStyle = {
    height: "35px",
    fontSize: "14px",
  };

  const buttonStyle = {
    height: "50px",
    border: "none",
    backgroundColor: "#007bff",
  };

  return (
    <div id="userheader">
      <div style={{ backgroundColor: "#272727" }}>
        <div className="d-flex justify-content-between w-100 pt-2">
          <div className="ml-4 mt-1">
            <Link to="/" style={{ color: "white", textDecoration: "none" }}>
              <h3 className="mb-0 mt-2">SoukCenter</h3>
            </Link>
          </div>

          <div className="col-xl-6 col-lg-5">
            {/* Wrap the search section in a form tag */}
            <form onSubmit={handleSearchSubmit}>
              <Row
                className="no-gutters mr-xl-5 mr-lg-5"
                style={{
                  boxShadow: "0px 0px 20px rgba(0,0,0,0.08)",
                  borderRadius: "6px",
                }}
              >
                {/* Search Input Section */}
                <Col xl={11} lg={10} xs={5}>
                  <Row className="no-gutters bg-white rounded-left p-2 mt-1">
                    <Col xl={6} lg={5} md={6}>
                      <div className="border-right">
                        <input
                          className="form-control form-control-sm border-0"
                          style={inputStyle}
                          placeholder="You can search Here"
                          onChange={(e) => setSearchQuery(e.target.value)}
                          onKeyPress={handleKeyPress}
                          value={searchQuery}
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>

                {/* Search Button */}
                <Col xl={1} lg={2} xs={2}>
                  <Button
                    style={buttonStyle}
                    className="rounded-right w-100 mt-1"
                    onClick={handleSearchSubmit}
                    type="submit"
                  >
                    <span style={{ fontSize: "20px" }}>
                      <BsSearch color="white" />
                    </span>
                  </Button>
                </Col>
              </Row>
            </form>
          </div>

          <div>
            <div className="d-flex" style={{ fontWeight: "bold" }}>
              {!isAuthenticated && (
                <>
                  <div className="d-flex menu-item">
                    <Link
                      className="text-white text-decoration-none"
                      to="/shop"
                    >
                      <AiOutlineShopping
                        style={{ fontSize: "25px", marginTop: "-0.5rem" }}
                      />{" "}
                      Shops
                    </Link>
                  </div>

                  <div className="d-flex menu-item">
                    <Link
                      className="text-white text-decoration-none"
                      to="/signin"
                    >
                      <IoMdPerson /> Login
                    </Link>

                    <span className="text-white ml-2 mr-2"> </span>
                    <Link
                      className="text-white text-decoration-none"
                      to="/signup"
                    >
                      <IoMdPersonAdd /> Signup
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
                      marginTop: "-1rem",
                    }}
                  >
                    {user.image ? (
                      <img
                        src={`${process.env.REACT_APP_AWS_URL}${user.image}`}
                        onError={(e) => (e.target.src = "/userpic.jpeg")}
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

                    <Link
                      to={user.role === "seller" ? "/account" : "/userinfo"}
                      style={{ color: "black", textDecoration: "none" }}
                    >
                      <div className="d-flex mt-2">
                        {user.image ? (
                          <img
                            src={`${process.env.REACT_APP_AWS_URL}${user.image}`}
                            style={{
                              marginTop: "1rem",
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
                          <span className="ml-3">{user.name}</span>
                          <span className="ml-3">{user.email}</span>
                          <span className="ml-3 text-dark">
                            {user.role} Account
                          </span>
                        </div>
                      </div>
                    </Link>

                    <div
                      className="mt-3"
                      style={{
                        borderTop: "1px solid black",
                        marginLeft: "1rem",
                        marginRight: "1rem",
                      }}
                    ></div>

                    {user.role !== "seller" && (
                      <>
                        <Link
                          className="menu-item text-white"
                          to="/addcart"
                          onClick={() => setOpen(false)}
                          style={{ textDecoration: "none", marginTop: "1rem" }}
                        >
                          <div className="d-flex">
                            <AiOutlineShoppingCart
                              style={{
                                marginLeft: "3rem",
                                fontSize: "30px",
                                color: "black",
                              }}
                            />
                            <span className="ml-4 text-dark">Cart</span>
                          </div>
                        </Link>
                        <div
                          className="mt-3"
                          style={{
                            borderTop: "1px solid black",
                            marginLeft: "1rem",
                            marginRight: "1rem",
                          }}
                        ></div>
                      </>
                    )}

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
        <SecondAppBar style={{ marginTop: "2rem", backgroundColor: "gray" }}>
          {MenuOptions.map(
            (option, i) => !!option.header && <Options option={option} />
          )}
        </SecondAppBar>
      </div>
    </div>
  );
};

export default Header;
