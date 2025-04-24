import { useRef, useState, useEffect } from "react";
import Axios from "axios";
import { Card, Button, Form, Spinner } from "react-bootstrap";
import { Auth } from "../../context/Auth.Context";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Verify = () => {
  const codeRef = useRef();
  const navigation = useNavigate();
  const location = useLocation();
  const auth = Auth();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  // Get email from URL parameters
  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    // Redirect if no email in URL
    if (!email) {
      navigation("/signup");
      toast.error("Please sign up first");
    }
  }, [email, navigation]);

  /* Submit Form */
  const submit = async (e) => {
    e.preventDefault();

    if (!codeRef.current.value) {
      toast.error("Please enter verification code");
      return;
    }

    setIsVerifying(true);
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}auth/verify-email`,
        {
          email: email,
          verificationCode: codeRef.current.value,
        }
      );

      if (result.data.status) {
        toast.success("Email verified successfully");
        navigation("/signin");
      } else {
        toast.error(result.data.message || "Verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response?.data?.message || "Verification failed");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const result = await Axios.post(
        `${process.env.REACT_APP_API_URL}auth/resend-verification`,
        { email }
      );
      if (result.data.status) {
        toast.success("Verification code resent");
      }
    } catch (error) {
      toast.error("Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ padding: "50px 0px", minHeight: "80vh" }}
    >
      <Card
        style={{ width: "350px", backgroundColor: "#F3F3F3" }}
        className="border-0"
      >
        <Card.Body style={{ padding: "29px" }}>
          <Card.Title
            style={{
              color: "#233D7B",
              fontWeight: "700",
              fontSize: "24px",
              marginBottom: "20px",
            }}
          >
            Verify Your Account
          </Card.Title>

          <Form onSubmit={submit}>
            <div
              className="mb-3"
              style={{
                color: "#666",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Verification code has been sent to: {email}
            </div>

            <Form.Group className="mb-3 mt-3">
              <Form.Control
                ref={codeRef}
                type="text"
                placeholder="Enter verification code"
                maxLength="6"
                style={{ fontSize: "16px" }}
              />
            </Form.Group>

            <Button
              type="submit"
              className="w-100 mb-2"
              style={{
                backgroundColor: "#233D7B",
                color: "white",
                border: "none",
                padding: "10px",
                fontSize: "16px",
              }}
              disabled={isVerifying}
            >
              {isVerifying ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Verifying...
                </>
              ) : (
                "Verify"
              )}
            </Button>

            <Button
              type="button"
              variant="link"
              className="w-100"
              onClick={handleResendCode}
              disabled={isResending}
              style={{
                color: "#233D7B",
                textDecoration: "none",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              {isResending ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Resending code...
                </>
              ) : (
                "Resend Code"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Verify;
