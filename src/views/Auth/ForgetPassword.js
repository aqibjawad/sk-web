import Axios from "axios";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  Button,
  Form,
  InputGroup,
  FormControl,
  Spinner,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faTimes,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import queryString from "query-string";

export default function ForgetPassword() {

  const [email, setEmail] = useState();
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const value = queryString.parse(location.search);
  const [id, setId] = useState();

  const reset = () => {
    
    setLoading(true);

    if (email && email.length) {
      Axios.get(
        `${process.env.REACT_APP_API_URL}auth/reset-password?email=${email}`
      ).then((res) => {
        setLoading(false);
        toast.warn("Reset Email sent");
      });
    } else {
      toast.warn("Enter Email");
    }
  };

  useEffect(() => {
    setId(value?.id);

    if (id) {
      Axios.post(`${process.env.REACT_APP_API_URL}auth/reset-password`, {
        id: id,
      }).then((res) => {
        const { data } = res;
        if (data.error) {
          setError(true);
          toast.warn("Token Expired");
        } else {
          setLoading(!loading);
        }
      });
    }
  }, [id]);

  const submit = (e) => {
    e.preventDefault();

    Axios.post(`${process.env.REACT_APP_API_URL}auth/reset/password`, {
      id,
      password,
    }).then((res) => {
      const { data } = res;
      if (data.error) {
        setError(true);
        toast.warn("Error, Resetting");
      } else {
        toast.success("Password Reset");
      }
    });
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ padding: "50px 0px", backgroundColor: "#F3F3F3" }}
    >
      <Card style={{ width: "350px" }} className="border-0">
        <Card.Body style={{ padding: "29px" }}>
          <Card.Title
            style={{ color: "#233D7B", fontWeight: "700", fontSize: "24px" }}
          >
            Forgot your password?
          </Card.Title>

          {id ? (
            loading ? (
              <div className="card pt-3 rounded-0 border-0">
                <div className="card-body p-0">
                  <h5 className="font-weight-bold">Reset Password</h5>
                  <form onSubmit={submit}>
                    <div className="form-group mt-3">
                      <label htmlFor="password">Password</label>
                      <input
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        name="password"
                        minlength="8"
                        className="form-control"
                        placeholder="Enter Password"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <button className="btn-custom" type="submit">
                        Reset
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            ) : error ? (
              <>
                <div className="d-flex justify-content-center">
                  <FontAwesomeIcon
                    className="text-danger"
                    icon={faTimes}
                    style={{ fontSize: "80px" }}
                  />
                </div>
                <h5 className="text-center mt-3 font-weight-bold">
                  Token Expired, try again ...
                </h5>
              </>
            ) : (
              <>
                <div className="d-flex justify-content-center">
                  <FontAwesomeIcon
                    className="text-success"
                    icon={faSpinner}
                    spin
                    pulse
                    style={{ fontSize: "80px" }}
                  />
                </div>
                <h5 className="text-center mt-3 font-weight-bold">
                  Wait, while we verify your token ...
                </h5>
              </>
            )
          ) : (
            <div>
              <Form.Label
                htmlFor="inlineFormInputGroupUsername"
                visuallyHidden
                style={{ fontSize: "15px", marginTop: "20px" }}
              >
                Type your email below to reset your password.
              </Form.Label>
              <InputGroup>
                <InputGroup.Text>
                  <FontAwesomeIcon icon={faEnvelope} />
                </InputGroup.Text>
                <FormControl
                  type="email"
                  placeholder="Type Your Email"
                  id="inlineFormInputGroupUsername"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <Button
                className="border-0"
                onClick={reset}
                style={{
                  width: "290px",
                  backgroundColor: "#233D7B",
                  marginTop: "30px",
                }}
              >
                {loading ? (
                  <>
                    <Spinner animation="grow" size="sm" /> Reseting...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
