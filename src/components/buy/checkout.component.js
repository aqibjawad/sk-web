import React, { useState, useRef, useEffect } from "react";

import { useParams, useNavigate, Link, useLocation } from "react-router-dom";

import {
  InputGroup,
  FormControl,
  Form,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { GET, POST } from "../../apicontroller/ApiController";

import { toast } from "react-toastify";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const CheckOut = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const location = useLocation();

  let productData = location.state;

  const header = { "x-access-token": localStorage.getItem("token") };

  const { category, param } = useParams();

  const [subcats, setSub] = useState([]);

  const [cities, setCity] = useState(false);
  const [countries, setCountry] = useState(false);
  const [states, setState] = useState(false);

  const naviagtes = useNavigate();

  let array = param.split("-");
  const id = array[array.length - 1];

  useEffect(() => {
    GET(`subcategory/${id}`).then((result) => {
      setSub(result);
    });

    GET("city").then((result) => {
      setCity(result);
    });

    GET("country").then((result) => {
      setCountry(result);
    });

    GET("state").then((result) => {
      setState(result);
    });
  }, [param]);

  const notify = () =>
    toast("Your details of your Product Successfully Added!");

  const [checkout, setPCheckOut] = useState(0);

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const companynameRef = useRef();

  const countryRef = useRef();
  const streetRef = useRef();
  const townRef = useRef();
  const stateRef = useRef();

  const zipRef = useRef();
  const phoneRef = useRef();
  const emailRef = useRef();

  // Submit function
  const submit = async (event) => {
    event.preventDefault();
    const formData = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      companyname: companynameRef.current.value,

      country: countryRef.current.value,
      street: streetRef.current.value,
      town: townRef.current.value,
      state: stateRef.current.value,

      zip: zipRef.current.value,
      phone: phoneNumber,
      email: emailRef.current.value,
      productid: parseInt(id),
    };
    POST("checkout", formData, header).then((res) => {
      notify();
      naviagtes(`/invoice/${category}/${param}`, { state: productData });
    });
  };

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];

  return (
    <div>
      <h3 className="text-center"> Billing Details </h3>

      <Form className="mb-4">
        <Container>
          <Card className="rounded-0 border-0">
            <Card.Body className="pb-3 pt-0">
              <Row className="bg-white rounded-0 border-0">
                <Col md={6}>
                  <Form.Label htmlFor="basic-url"> First Name </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      defaultValue={user.firstname}
                      ref={firstnameRef}
                      disable
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Form.Label htmlFor="basic-url"> Last Name </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      defaultValue={user.lastname}
                      ref={lastnameRef}
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Form.Label htmlFor="basic-url"> Email Address </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      defaultValue={user.email}
                      ref={emailRef}
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Form.Label htmlFor="basic-url">
                    {" "}
                    Company Name (Optional){" "}
                  </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      ref={companynameRef}
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Form.Group className="">
                    <Form.Label> Country </Form.Label>
                    <Form.Control
                      className="form-control"
                      as="select"
                      ref={countryRef}
                    >
                      <option value=""> --- Select --- </option>
                      {countries &&
                        countries.map((country) => (
                          <option value={country.id}>{country.country}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Group className="">
                    <Form.Label> City </Form.Label>
                    <Form.Control
                      className="form-control"
                      as="select"
                      ref={townRef}
                    >
                      <option value=""> --- Select --- </option>
                      {cities &&
                        cities.map((city) => (
                          <option value={city.id}>{city.city}</option>
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
                      ref={stateRef}
                    >
                      <option value=""> --- Select --- </option>
                      {states &&
                        states.map((state) => (
                          <option value={state.id}>{state.state}</option>
                        ))}
                    </Form.Control>
                  </Form.Group>
                </Col>

                <Col md={6}>
                  <Form.Label htmlFor="basic-url"> Street Address </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      ref={streetRef}
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Form.Label htmlFor="basic-url"> Zip Code </Form.Label>
                  <InputGroup className="mb-3">
                    <FormControl
                      ref={zipRef}
                      id="basic-url"
                      aria-describedby="basic-addon3"
                    />
                  </InputGroup>
                </Col>

                <Col md={6}>
                  <Form.Label htmlFor="basic-url"> Phone </Form.Label>
                  <PhoneInput
                    country={"us"} // default country, can be set to your preferred default
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                  />
                </Col>
              </Row>
              <button
                type="submit"
                onClick={submit}
                className="btn-color border-0"
                style={{
                  backgroundColor: "#233D7B",
                  color: "white",
                  height: "50px",
                  borderRadius: "10px",
                }}
              >
                Submitt
              </button>
            </Card.Body>
          </Card>
        </Container>
      </Form>
    </div>
  );
};

export default CheckOut;
