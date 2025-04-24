import React, { useRef, useState, useEffect } from "react";

import { Card, Button, Form, Row, Col } from "react-bootstrap";

import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

import { POST, GET } from "../../apicontroller/ApiController";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import "./auth.css";

const Business = () => {
  const [phoneNumber, setPhoneNumber] = useState("");

  const [password, setPassword] = useState("");
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });
  const validatePassword = () => {
    // Define your validation criteria
    const lengthRegex = /^.{8,}$/;
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    const specialRegex = /[!@#$%^&*(),.?":{}|<>]/;

    // Update validation state based on criteria
    setValidations({
      length: lengthRegex.test(password),
      uppercase: uppercaseRegex.test(password),
      number: numberRegex.test(password),
      special: specialRegex.test(password),
    });
  };

  // ---------------------- Password Validation Start -------------------------------------- //

  // const [password, setPassword] = useState('');
  const [isValid, setIsValidPass] = useState(false);
  const [isValidemail, setIsValidEmail] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = (event) => {
    const newPassword = event.target.value;
    setPassword(newPassword);

    // Perform password validation
    const hasNumber = /\d/.test(newPassword);
    const hasSpecialCharacter = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
      newPassword
    );
    const hasAlphabet = /[a-zA-Z]/.test(newPassword);

    setIsValidPass(hasNumber && hasSpecialCharacter && hasAlphabet);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Password Check
  const [passError, setPassError] = useState(false);

  /* Function to match password */
  /* Function to match password */
  const matchPass = (confirm) => {
    // Only validate if both fields have content
    if (confirm.length > 0 && password.length > 0) {
      if (password === confirm) {
        setPassError(false);
      } else {
        setPassError(true);
      }
    } else {
      // Don't show error if fields are empty
      setPassError(false);
    }
  };

  // ---------------------- Password Validation End -------------------------------------- //

  // ---------------------- Email Validation Start -------------------------------------- //
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    // Perform email validation using a regular expression
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailPattern.test(newEmail));
  };
  // ---------------------- Email Validation End -------------------------------------- //

  let navigation = useNavigate();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const shopnameRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();
  const typeRef = useRef();

  const [bannerimage, setBannerImage] = useState();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    if (bannerimage) formData.append("bannerimage", bannerimage);

    formData.append("firstname", firstnameRef.current.value);
    formData.append("lastname", lastnameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneNumber);
    formData.append("address", addressRef.current.value);

    formData.append("password", passwordRef.current.value);
    formData.append("shopname", shopnameRef.current.value);
    formData.append("type", typeRef.current.value);

    formData.append("role", 3);

    try {
      const response = await POST("auth", formData);

      // Check if response contains error property
      if (response && response.error === true) {
        // Display the specific error message from the backend
        toast.error(response.message || "Failed to create account.");
      } else {
        toast.success("Account created successfully!");
        navigation(
          `/verify?email=${encodeURIComponent(emailRef.current.value)}`
        );
      }
    } catch (error) {
      // Check if the error response contains our custom error message
      if (error.response && error.response.data) {
        toast.error(
          error.response.data.message ||
            "Failed to create account. Please try again."
        );
      } else {
        toast.error("Failed to create account. Please try again.");
      }
    }
  };

  const [shopcategories, setShopCategories] = useState([]);

  const fetchData = async () => {
    GET("shopcategory").then((result) => {
      setShopCategories(result);
      console.log(result);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      className="d-flex justify-content-center"
      style={{ padding: "50px 0px" }}
    >
      <Card style={{ width: "450px" }} className="border-0">
        <Card.Body style={{ padding: "29px", backgroundColor: "#F3F3F3" }}>
          <Card.Title
            className="mb-4 text-center"
            style={{ color: "#233D7B", fontWeight: "700", fontSize: "24px" }}
          >
            Sign Up
          </Card.Title>

          {/* <div className="">
            <Button
              className="border-0 w-100"
              style={{
                width: "290px",
                backgroundColor: "#DF4A31",
                marginTop: "10px",
              }}
            >
              Continue with Google
            </Button>

            <Button
              className="border-0 w-100"
              style={{
                width: "290px",
                backgroundColor: "#405A94",
                marginTop: "10px",
              }}
            >
              Continue with Facebook
            </Button>
          </div> */}

          <Form onSubmit={submit}>
            <Row className="mt-4">
              <Col sm={6}>
                <Form.Group className="" controlId="formBasicName">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    ref={firstnameRef}
                    required
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="" controlId="formBasicEamil">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    ref={lastnameRef}
                    required
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="" controlId="formBasicName">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    ref={emailRef}
                    required
                    onChange={handleEmailChange}
                  />
                </Form.Group>
                {isValidemail ? (
                  <p style={{ color: "green" }}>Email is valid!</p>
                ) : (
                  <p style={{ color: "red" }}>Invalid email.</p>
                )}
              </Col>

              <Col>
                <input
                  accept="image/*"
                  type="file"
                  className="fs-6 form-control-file mt-1"
                  id="exampleFormControlFile1"
                  onChange={(e) => setBannerImage(e.target.files[0])}
                />
              </Col>

              <Col sm={6}>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <div className="d-flex">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      ref={passwordRef}
                      required
                      value={password}
                      onChange={(e) => {
                        const newPassword = e.target.value;
                        setPassword(newPassword);
                        passwordRef.current.value = newPassword; // Keep ref in sync
                        validatePassword();
                      }}
                    />

                    <button onClick={togglePasswordVisibility}>
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                </Form.Group>
                {/* <p>Password must contain at least one number, one special character, and one alphabet character.</p>
                                {isValid ? (
                                    <p style={{ color: 'green' }}>Password is valid!</p>
                                ) : (
                                    <p style={{ color: 'red' }}>Password is invalid.</p>
                                )} */}
              </Col>

              <Col sm={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicConfirmPassword"
                >
                  <Form.Control
                    onChange={(e) =>
                      matchPass(e.target.value, passwordRef.current.value)
                    }
                    type="password"
                    placeholder="Confirm Password"
                    required
                  />
                  {passError && (
                    <span
                      style={{ fontSize: "0.8rem" }}
                      className="text-danger"
                    >
                      Both passwords don't match
                    </span>
                  )}
                </Form.Group>
              </Col>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <p
                  style={{
                    color: validations.length ? "green" : "red",
                    fontSize: "0.8em",
                    margin: "0 10px",
                  }}
                >
                  1: Min 8 characters
                </p>
                <p
                  style={{
                    color: validations.uppercase ? "green" : "red",
                    fontSize: "0.8em",
                    margin: "0 10px",
                  }}
                >
                  2: At least one uppercase
                </p>
                <p
                  style={{
                    color: validations.number ? "green" : "red",
                    fontSize: "0.8em",
                    margin: "0 10px",
                  }}
                >
                  3: At least one number
                </p>
                <p
                  style={{
                    color: validations.special ? "green" : "red",
                    fontSize: "0.8em",
                    margin: "0 10px",
                  }}
                >
                  4: At least one special character
                </p>
              </div>

              <Col sm={6}>
                <Form.Group className="" controlId="formBasicName">
                  <Form.Control
                    type="text"
                    placeholder="Shop name"
                    ref={shopnameRef}
                    required
                  />
                </Form.Group>
              </Col>

              <Col sm={6}>
                <Form.Group className="">
                  <Form.Control
                    className="form-control"
                    as="select"
                    ref={typeRef}
                  >
                    <option value=""> Shop Category </option>
                    {shopcategories.map((shopcategory) => (
                      <option value={shopcategory.title}>
                        {shopcategory.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col sm={12}>
                <Form.Group className="" controlId="formBasicName">
                  <PhoneInput
                    country={"us"} // default country, can be set to your preferred default
                    value={phoneNumber}
                    onChange={(phone) => setPhoneNumber(phone)}
                  />
                </Form.Group>
              </Col>

              <Col sm={12}>
                <Form.Group className="" controlId="formBasicName">
                  <Form.Control
                    type="text"
                    placeholder="Address"
                    ref={addressRef}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="d-flex justify-content-center">
              <Button
                disabled={!Object.values(validations).every(Boolean)}
                className="border-0"
                type="submit"
                style={{
                  width: "290px",
                  backgroundColor: "#233D7B",
                  color: "white",
                }}
              >
                Create Account
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Business;
