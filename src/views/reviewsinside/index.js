import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { Container, Row, Col } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import { toast } from "react-toastify";

import { POST, GET } from "../../apicontroller/ApiController"

import "./reviews.scss"


const ReviewInside = () => {

  const header = { "x-access-token": localStorage.getItem("token") };

  const { param } = useParams()

  const [subcats, setSub] = useState([])

  const navigate = useNavigate()

  let array = param.split('-')
  const id = array[array.length - 1]

  useEffect(() => {
    GET(`subcategory/${id}`).then((result) => {
      setSub(result)
    })
  }, [param])

  const notify = () => toast("Reviews Added Successfully");
  const [product, setProduct] = useState(0);

  const titleRef = useRef();
  const descriptionRef = useRef();


  // Submit function
  const submit = async (event) => {
    event.preventDefault();
    const formData = {
      product: product,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      productid: id,
    };
    POST("reviews", formData, header).then((res) => {
      if (res.error === false) {
        notify()
      } else {
        toast.error(res.message)
      }
    })
  }; 

  return (
    <Container fluid className="py-5">

      <Row className="bg-light p-2 mt-3">
        <Col sm={12}>

          {/* Add Review */}
          <Container className="bg-white p-3 mt-3" fluid>
            <Row>
              <Col md={12} xs={12}>
                <div className="d-flex  justify-content-between flex-row">
                  <div className="d-flex justify-content-between rating-category">
                    <div className="align-self-center">
                      <h3> Reviews </h3>
                    </div>
                    <div className="d-flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <div key={star} className="p-md-3 p-2 align-self-center bg-white rating">
                          <button onClick={() => setProduct(star)}>
                            <FontAwesomeIcon className={`rating-star ${star <= product ? "selected-star" : "text-muted"}`} icon={faStar} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>


          <div className="py-3">
            <Form>
              <Row>
                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="review-title">
                      Title
                    </Form.Label>
                    <Form.Control ref={titleRef} className="bg-light" type="text" placeholder="Enter Title" />
                  </Form.Group>
                </Col>

                <Col sm={6}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label> Description </Form.Label>
                    <Form.Control ref={descriptionRef} as="textarea" rows="4" type="text" />
                  </Form.Group>
                </Col>
              </Row>

              <Button onClick={submit} className="bg-danger text-white border rounded-pill px-5 py-2" type="submit">
                Submit
              </Button>
            </Form>
          </div>

        </Col>
      </Row>
    </Container>
  );
};

export default ReviewInside;
