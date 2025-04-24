import React, { useState, useEffect, useMemo, useRef } from "react";
import { GetCart, RemoveCart, PriceCart } from "../../Helper";
import ProductCart from "./product.cart";
import { Link, useNavigate } from "react-router-dom";
import { GET, POST } from "../../apicontroller/ApiController";
import { toast } from "react-toastify";

import {
  InputGroup,
  FormControl,
  Form,
  Card,
  Container,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

const Item = () => {
  const [cartGet, setCartGet] = useState([]);
  const [removeCart, setRemoveCart] = useState([]);
  const [cartPrice, setCartPrice] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const header = { "x-access-token": localStorage.getItem("token") };

  // Add refs for form fields
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const companynameRef = useRef();
  const streetRef = useRef();
  const zipRef = useRef();
  const emailRef = useRef();
  const [phoneNumber, setPhoneNumber] = useState("");

  // State for dropdown data
  const [cities, setCity] = useState([]);
  const [countries, setCountry] = useState([]);
  const [states, setState] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    setCartGet(GetCart());
    setRemoveCart(RemoveCart());
  }, []);

  // Fetch dropdown data
  useEffect(() => {
    GET("city").then((result) => {
      setCity(result);
    });

    GET("country").then((result) => {
      setCountry(result);
    });

    GET("state").then((result) => {
      setState(result);
    });
  }, []);

  const totalPrice = useMemo(() => {
    let sum = 0;
    Object.keys(cartPrice).map((key) => (sum = sum + cartPrice[key]));
    return sum;
  }, [cartPrice]);

  const onRemoveProduct = (id) => {
    setCartGet((prev) => {
      const products = prev.filter((product) => product.id !== id);
      localStorage.setItem("cart", JSON.stringify(products));
      return products;
    });
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartGet([]);
    setCartPrice({});
    toast.info("Cart has been cleared!");
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    // Get cart items from localStorage
    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];

    // Create form data
    const formData = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      companyname: companynameRef.current.value,
      country: selectedCountry,
      street: streetRef.current.value,
      town: selectedCity,
      state: selectedState,
      zip: zipRef.current.value,
      phone: phoneNumber,
      email: emailRef.current.value,
      status: "pending",
      created_at: new Date().toISOString(),
      userid: JSON.parse(localStorage.getItem("user"))?.UserId || JSON.parse(localStorage.getItem("user"))?.id,
    };

    try {
      // Store the form data in localStorage so Invoice page can access it
      localStorage.setItem("checkout_data", JSON.stringify(formData));

      // Create an array of promises for each cart item
      const checkoutPromises = [];

      cartItems.forEach((item) => {
        // Create entry for each item
        const checkoutData = {
          ...formData,
          productid: item.id,
        };
        checkoutPromises.push(POST("checkout", checkoutData, header));
      });

      // Wait for all checkout items to be processed
      await Promise.all(checkoutPromises);

      // Show success notification
      toast.success("Order submitted successfully!");

      const firstItem = cartItems[0] || {};
      const category = firstItem.Category || "default";

      // Create a param string using the first item's ID or a default
      const param = `product-${firstItem.id || "default"}`;

      // Navigate to invoice page
      navigate(`/invoice/${category}/${param}`, {
        state: {
          checkoutData: formData,
          products: cartItems,
        },
      });
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="row">
        <div className="col-12 mb-4">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <Link to="/" className="text-decoration-none">
                  Home
                </Link>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Cart
              </li>
            </ol>
          </nav>
          <h2 className="fw-bold mb-4">Shopping Cart</h2>
        </div>

        <div className="col-lg-8 col-md-12 mb-4">
          <div className="card shadow-sm rounded-3 border-0">
            <div className="card-header bg-white py-3">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">
                  Cart Items{" "}
                  <span className="badge bg-primary rounded-pill">
                    {cartGet?.length || 0}
                  </span>
                </h5>
                {cartGet && cartGet.length > 0 && (
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                )}
              </div>
            </div>
            <div className="card-body">
              {cartGet && cartGet.length > 0 ? (
                cartGet.map((categ) => (
                  <ProductCart
                    key={categ.id}
                    categ={categ}
                    cartPrice={cartPrice}
                    setCartPrice={setCartPrice}
                    onRemoveProduct={onRemoveProduct}
                    setRemoveCart={setRemoveCart}
                  />
                ))
              ) : (
                <div className="text-center py-4">
                  <i className="bi bi-cart" style={{ fontSize: "2rem" }}></i>
                  <p className="mt-2">Your cart is empty</p>
                  <Link to="/" className="btn btn-primary">
                    Continue Shopping
                  </Link>
                </div>
              )}

              <div className="d-flex justify-content-between align-items-center mt-3">
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-12">
          <div className="card shadow-sm rounded-3 border-0 mb-4">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Order Summary</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-3">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between fw-bold">
                <span>Total (Incl. taxes)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="card shadow-sm rounded-3 border-0">
            <div className="card-header bg-white py-3">
              <h5 className="mb-0">Shipping Information</h5>
            </div>
            <div className="card-body">
              <form onSubmit={submit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={firstnameRef}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={lastnameRef}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Company (Optional)</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={companynameRef}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      ref={emailRef}
                      required
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>

                  <Col md={12}>
                    <Form.Group className="">
                      <Form.Label> Country </Form.Label>
                      <Form.Control
                        className="form-control"
                        as="select"
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                      >
                        <option value=""> --- Select --- </option>
                        {countries &&
                          countries.map((country) => (
                            <option key={country.id} value={country.id}>
                              {country.country}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <div className="col-12">
                    <label className="form-label">Street Address</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={streetRef}
                      required
                    />
                  </div>

                  <Col md={6}>
                    <Form.Group className="">
                      <Form.Label> City </Form.Label>
                      <Form.Control
                        className="form-control"
                        as="select"
                        onChange={(e) => setSelectedCity(e.target.value)}
                      >
                        <option value=""> --- Select --- </option>
                        {cities &&
                          cities.map((city) => (
                            <option key={city.id} value={city.id}>
                              {city.city}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <Col md={6}>
                    <Form.Group className="">
                      <Form.Label> State </Form.Label>
                      <Form.Control
                        className="form-control"
                        as="select"
                        onChange={(e) => setSelectedState(e.target.value)}
                      >
                        <option value=""> --- Select --- </option>
                        {states &&
                          states.map((state) => (
                            <option key={state.id} value={state.id}>
                              {state.state}
                            </option>
                          ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>

                  <div className="col-md-12">
                    <label className="form-label">ZIP</label>
                    <input
                      type="text"
                      className="form-control"
                      ref={zipRef}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-4"
                  style={{ background: "#d03737", borderColor: "#d03737" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Item;
