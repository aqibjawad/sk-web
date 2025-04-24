import React, { useState, useEffect, useRef } from "react";
import { GET, POST } from "../../../apicontroller/ApiController";

import {
  InputGroup,
  FormControl,
  Form,
  Card,
  Container,
  Row,
  Col,
} from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useNavigate } from "react-router-dom";

// Add style manually
import "react-upload-gallery/dist/style.css"; // or scss

const AddProduct = () => {
  const navigate = useNavigate();

  const header = { "x-access-token": localStorage.getItem("token") };

  const [image, setImage] = useState();

  const [loading, setLoading] = useState(false);

  const titleRef = useRef();
  const priceRef = useRef();
  const supercategoryRef = useRef();
  const currencyRef = useRef();

  const discountRef = useRef();
  const serialnoRef = useRef();

  const submit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", titleRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("supercategory", supercategoryRef.current.value);
    formData.append("currency", currencyRef.current.value);
    formData.append("discount", discountRef.current.value);
    formData.append("serialno", serialnoRef.current.value);

    if (image) formData.append("category", image);

    POST("listing", formData, header).then((res) => {
      localStorage.setItem("listingid", res.data);
      toast("Product Added Successfully");
      navigate("/shopproduct");
    });
  };

  const [supercategory, setSuperCategory] = useState([]);

  useEffect(() => {
    GET(`supercategory`).then((result) => {
      setSuperCategory(result);
    });
  }, []);

  return (
    <Form className="mb-4">
      <Container>
        <Card className="rounded-0 border-0 mt-5">
          <Card.Body className="pb-3 pt-0">
            <h3 className="mb-3 text-center"> Add Products </h3>
            <Row className="bg-white rounded-0 border-0">
              <Col md={6}>
                <Form.Group className="">
                  <Form.Label> Super Category </Form.Label>
                  <Form.Control
                    className="form-control"
                    as="select"
                    ref={supercategoryRef}
                  >
                    <option value=""> --- Select --- </option>
                    {supercategory.map((supercate) => (
                      <option value={supercate.id}>{supercate.title}</option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="basic-url"> Product Name </Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="e.g. Hungs Continental Foods"
                    ref={titleRef}
                  />
                </InputGroup>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="basic-url"> Product Price </Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="e.g. 12000"
                    ref={priceRef}
                  />
                </InputGroup>
              </Col>

              <Col md={6}>
                <Form.Group className="">
                  <Form.Label> Currency </Form.Label>
                  <Form.Control
                    className="form-control"
                    as="select"
                    ref={currencyRef}
                  >
                    <option value=""> --- Select --- </option>
                    <option value="USD - $"> USD - $ </option>
                    <option value="AUD - $"> AUD - $ </option>
                    <option value="CAD - $"> CAD - $ </option>
                    <option value="GGP - £"> GGP - £ </option>
                    <option value="DZD - DA"> DZD - DA </option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="basic-url"> Discount </Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="e.g. Hungs Continental Foods"
                    ref={discountRef}
                  />
                </InputGroup>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="basic-url"> Serial No </Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    id="basic-url"
                    aria-describedby="basic-addon3"
                    placeholder="e.g. Hungs Continental Foods"
                    ref={serialnoRef}
                  />
                </InputGroup>
              </Col>

              <Col md={6}>
                <Form.Label htmlFor="basic-url"> Product Image </Form.Label>
                <InputGroup className="mb-3">
                  <FormControl
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                  />
                </InputGroup>
              </Col>
            </Row>
            <hr />
          </Card.Body>
        </Card>
      </Container>

      <Container>
        <button
          onClick={submit}
          className="btn-custom ml-3"
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm mr-2"
                role="status"
                aria-hidden="true"
              ></span>
              Submitting...
            </>
          ) : (
            "Submit your Details"
          )}
        </button>
      </Container>

      <ToastContainer />
    </Form>
  );
};
export default AddProduct;
