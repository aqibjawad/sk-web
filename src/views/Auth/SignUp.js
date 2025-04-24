import React, { useRef, useState } from "react";
import { Card, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { POST } from "../../apicontroller/ApiController";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// Import Google login component and Facebook login
import { GoogleLogin } from "@react-oauth/google";
import { LoginSocialFacebook } from "reactjs-social-login";

// Import Auth context
import { Auth } from "../../context/Auth.Context";

const Signup = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [validations, setValidations] = useState({
    length: false,
    uppercase: false,
    number: false,
    special: false,
  });

  const [passError, setPassError] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsValidEmail] = useState(false);
  const navigate = useNavigate();

  // Get socialLogin function from Auth context
  const { socialLogin } = Auth();

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const addressRef = useRef();

  const validatePassword = (newPassword) => {
    setValidations({
      length: /^.{8,}$/.test(newPassword),
      uppercase: /[A-Z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
    });
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail));
  };

  const matchPass = (confirm, password) => {
    setPassError(confirm.length > 0 && confirm !== password);
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      address: addressRef.current.value,
      phone: phoneNumber,
      role: 1,
    };

    try {
      const response = await POST("auth", formData);

      // Check if response contains error
      if (response && response.error) {
        // Display the specific error message from the backend
        toast.error(response.message || "Failed to create account.");
      } else {
        toast.success("Account created successfully!");
        navigate(`/verify?email=${encodeURIComponent(emailRef.current.value)}`);
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
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (credentialResponse) => {
    setIsLoading(true);
    try {
      // Use socialLogin function from Auth context
      const success = await socialLogin("google", credentialResponse);

      // Navigation is handled in the Auth context if successful
      if (!success) {
        toast.error("Google login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error("Google login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Facebook login
  const handleFacebookLogin = async (response) => {
    setIsLoading(true);
    try {
      // Use socialLogin function from Auth context
      const success = await socialLogin("facebook", response.data);

      // Navigation is handled in the Auth context if successful
      if (!success) {
        toast.error("Facebook login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Facebook login failed. Please try again.");
      console.error("Facebook login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <Card className="shadow-sm" style={{ width: "400px" }}>
        <Card.Body className="p-4">
          <Card.Title className="text-center mb-4 fw-bold h4 text-primary">
            Create Your Account
          </Card.Title>

          <div className="d-grid gap-2 mb-4">
            <GoogleLogin
              clientId="204873419204-bs04v2dp6gmlpudmj9feljr5es1ophvo.apps.googleusercontent.com" // Add this line
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error("Google login failed");
                setIsLoading(false);
              }}
              useOneTap
              theme="filled_blue"
              text="continue_with"
              shape="pill"
              width="100%"
            />

            <LoginSocialFacebook
              appId={process.env.REACT_APP_FACEBOOK_APP_ID}
              onResolve={handleFacebookLogin}
              onReject={(error) => {
                console.error("Facebook login error:", error);
                toast.error("Facebook login failed");
                setIsLoading(false);
              }}
            >
              {/* <Button
                variant="primary"
                className="d-flex align-items-center justify-content-center gap-2 w-100"
                disabled={isLoading}
              >
                <FaFacebook /> Continue with Facebook
              </Button> */}
            </LoginSocialFacebook>
          </div>

          <div className="text-center mb-4">
            <span className="bg-white px-2 text-muted">or</span>
            <hr className="mt-0" />
          </div>

          <Form onSubmit={submit} className="d-flex flex-column gap-3">
            <Row>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    ref={firstnameRef}
                    required
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    ref={lastnameRef}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group>
              <Form.Control
                type="email"
                placeholder="Email"
                ref={emailRef}
                onChange={handleEmailChange}
                isValid={isEmailValid}
                isInvalid={email.length > 0 && !isEmailValid}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please enter a valid email address
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                ref={passwordRef}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePassword(e.target.value);
                }}
                required
              />
              <Button
                variant="link"
                className="position-absolute end-0 top-50 translate-middle-y"
                onClick={() => setShowPassword(!showPassword)}
                style={{ zIndex: 10 }}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </Button>
            </Form.Group>

            <div className="password-requirements small mt-3">
              <Row className="g-2">
                <Col xs={6}>
                  <span
                    className={
                      validations.length ? "text-success" : "text-muted"
                    }
                  >
                    ✓ Min 8 characters
                  </span>
                </Col>
                <Col xs={6}>
                  <span
                    className={
                      validations.uppercase ? "text-success" : "text-muted"
                    }
                  >
                    ✓ One uppercase
                  </span>
                </Col>
                <Col xs={6}>
                  <span
                    className={
                      validations.number ? "text-success" : "text-muted"
                    }
                  >
                    ✓ One number
                  </span>
                </Col>
                <Col xs={6}>
                  <span
                    className={
                      validations.special ? "text-success" : "text-muted"
                    }
                  >
                    ✓ One special char
                  </span>
                </Col>
              </Row>
            </div>

            <Form.Group>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                onChange={(e) =>
                  matchPass(e.target.value, passwordRef.current.value)
                }
                isInvalid={passError}
                required
              />
              <Form.Control.Feedback type="invalid">
                Passwords don't match
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Address"
                ref={addressRef}
                required
              />
            </Form.Group>

            <Form.Group>
              <PhoneInput
                country={"us"}
                value={phoneNumber}
                onChange={setPhoneNumber}
                containerClass="w-100"
                inputClass="w-100"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              className="w-100 py-2"
              disabled={!Object.values(validations).every(Boolean) || isLoading}
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
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </Form>

          <div className="text-center mt-4">
            <small className="text-muted">
              Already have an account?{" "}
              <Link to="/signin" className="text-decoration-none">
                Sign In
              </Link>
            </small>
            <br />
            <small className="text-muted">
              Are you a business?{" "}
              <Link to="/business" className="text-decoration-none">
                Business Sign Up
              </Link>
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signup;
