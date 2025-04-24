import { useRef } from "react";
import Axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { Auth } from "../../context/Auth.Context";
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";

const Signin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  let navigation = useNavigate();

  /* Auth Context */
  const auth = Auth();

  /* Submit Form */
  const submit = async (e) => {
    e.preventDefault();

    var check = 0;
    /* Form Validators - Empty Check */
    emailRef.current.value.length === 0 && check++;
    passwordRef.current.value.length === 0 && check++;

    if (check === 0) {
      const formData = {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      };
      try {
        const result = await Axios.post(`${process.env.REACT_APP_API_URL}auth/login`, formData);

        if (result.data.error === 0) {
          /* Successful Login */
          auth.activateToken(localStorage.setItem("token", result.data.token));
          localStorage.setItem("user", JSON.stringify(result.data.user));
          auth.activateToken(localStorage.setItem("token", result.data.token));
          auth.activateAuthentication(true);
          if (result.data.user.role === "user") {
            navigation("/userinfo");
          } else {
            navigation("/dashboard");
          }
        } else if (result.data.message === true) {
          toast.error("Not approved!"); // Display the error message
        } else {
          // Handle other error cases
        }
      } catch (error) {
        // Handle any errors that occur during the API call
        console.error("Error:", error);
        // Display an error message to the user
        toast.error("An error occurred. Please try again later.");
      }
    }
  };

  // Handle Google login success
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const success = await auth.socialLogin("google", credentialResponse);
      if (success) {
        navigation("/userinfo");
      } else {
        toast.error("Google login failed. Please try again.");
      }
    } catch (error) {
      toast.error("Google login failed. Please try again.");
      console.error("Google login error:", error);
    }
  };

  return (
    <div className="d-flex justify-content-center" style={{ padding: "50px 0px" }} >
      <Card style={{ width: "350px", backgroundColor: "#F3F3F3" }} className="border-0">
        <Card.Body style={{ padding: "29px" }}>
          <Card.Title style={{ color: "#233D7B", fontWeight: "700", fontSize: "24px" }} >
            Log in to Souk Center
          </Card.Title>

          <div className="mt-4 mb-2" style={{ fontSize: "14px" }}>
            Sign in using your registered account:
          </div>

          <div>
            <GoogleLogin
              clientId="204873419204-bs04v2dp6gmlpudmj9feljr5es1ophvo.apps.googleusercontent.com"
              onSuccess={handleGoogleLogin}
              onError={() => {
                toast.error("Google login failed");
              }}
              render={renderProps => (
                <Button 
                  onClick={renderProps.onClick} 
                  disabled={renderProps.disabled}
                  className="border-0 d-flex align-items-center justify-content-center gap-2" 
                  style={{ width: "290px", backgroundColor: "#DF4A31", marginTop: "10px" }}
                >
                  <FaGoogle /> Continue with Google
                </Button>
              )}
            />
          </div>

          <Form onSubmit={submit}>
            <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
              <Form.Control
                ref={emailRef}
                type="text"
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Control
                ref={passwordRef}
                type="password"
                placeholder="Password"
              />
              <div
                id="login-error-msg"
                className="mt-3 text-danger font-weight-bold"
              ></div>
            </Form.Group>

            <Button
              type="submit"
              className="btn-color border-0 w-100"
              style={{ backgroundColor: "#233D7B", color: 'white' }}
            >
              Log in
            </Button>
          </Form>

          <div className="d-flex">
            <Link
              to="/signup"
              style={{ fontSize: "12px", float: "right", margin: "10px 10px" }}
            >
              Sign Up!
            </Link>

            <Link
              to="/forget-password"
              style={{ fontSize: "12px", float: "right", margin: "10px 10px" }}
            >
              Forget Password
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Signin;