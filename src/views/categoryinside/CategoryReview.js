import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Row, Form, Col, Modal, Button, Container } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { POST } from "../../apicontroller/ApiController";
import { toast } from "react-toastify";
import { Auth } from "../../context/Auth.Context";
import "./category.css";

const CategoryReview = ({ productId, reviews }) => {
  console.log("Current productId:", productId);
  console.log("Reviews data:", reviews);

  const { isAuthenticated } = Auth();
  const [product, setProduct] = useState(0);
  const header = { "x-access-token": localStorage.getItem("token") };
  const user = JSON.parse(localStorage.getItem("user"));

  console.log("Current user:", user);

  // Check if the current user has already left a review for this product
  const hasUserReviewed = () => {
    if (!user || !reviews || reviews.length === 0) {
      console.log("No user or reviews found");
      return false;
    }

    // Log to help debug
    console.log("Checking if user has reviewed. User ID:", user.UserId || user.UserId);
    console.log(
      "Review user IDs:",
      reviews.map((review) => review.userid)
    );

    // Check if current user's ID exists in any of the reviews for this specific product
    const hasReviewed = reviews.some((review) => {
      const matchesUserId =
        review.userid === user.UserId || review.userid === user.UserId;
      const matchesProductId =
        parseInt(review.productid) === parseInt(productId);

      console.log(
        `Review ID ${review.userid}, productId ${review.productid}, matches: ${
          matchesUserId && matchesProductId
        }`
      );

      return matchesUserId && matchesProductId;
    });

    console.log("Has user reviewed this product:", hasReviewed);
    return hasReviewed;
  };

  // Call the function once on component mount to check
  useEffect(() => {
    const result = hasUserReviewed();
    console.log("Initial check - Has user reviewed:", result);
  }, [reviews, user, productId]);

  // --------------------------- Modal ------------------------------------------
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const notify = () => toast("Reviews Added Successfully");

  const titleRef = useRef();
  const descriptionRef = useRef();

  // Submit function
  const submit = async (event) => {
    event.preventDefault();

    // Additional check before submission to prevent duplicate reviews
    if (hasUserReviewed()) {
      toast.error("You have already reviewed this product");
      handleClose();
      return;
    }

    const formData = {
      product: product,
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      productid: productId,
    };

    POST("reviews", formData, header).then((res) => {
      if (res.error === false) {
        notify();
        handleClose();
        window.location.reload();
      } else {
        toast.error(res.message);
      }
    });
  };

  // Calculate whether to show the button or not
  const shouldShowButton =
    isAuthenticated && user && user.role !== "seller" && !hasUserReviewed();
  console.log("Should show button:", shouldShowButton);

  return (
    <div>
      {!isAuthenticated ? (
        <Link to="/signin" className="cat-button mb-5" variant="danger">
          Add Reviews
        </Link>
      ) : shouldShowButton ? (
        <Button
          className="modal-button mb-5"
          variant="danger"
          onClick={handleShow}
        >
          Add Reviews
        </Button>
      ) : null}

      <Modal show={show} onHide={handleClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title> Reviews </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-content">
          <Container fluid className="">
            <Row className="">
              <Col sm={12}>
                {/* Add Review */}
                <Container className="" fluid>
                  <Row>
                    <Col md={12} xs={12}>
                      <div className="d-flex justify-content-between flex-row">
                        <div className="d-flex justify-content-between rating-category">
                          <div className="d-flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <div
                                key={star}
                                className="p-md-3 p-2 align-self-center bg-white rating"
                              >
                                <button onClick={() => setProduct(star)}>
                                  <FontAwesomeIcon
                                    className={`rating-star ${
                                      star <= product
                                        ? "selected-star"
                                        : "text-muted"
                                    }`}
                                    icon={faStar}
                                  />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Container>

                <div className="">
                  <Form>
                    <Row>
                      <Col sm={12}>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Control as="select" ref={titleRef}>
                            <option disabled selected>
                              Select Title for Reviews
                            </option>
                            <option value="Excellent">Excellent</option>
                            <option value="Good">Good</option>
                            <option value="Normal">Normal</option>
                            <option value="Bad">Bad</option>
                            <option value="Worst">Worst</option>
                          </Form.Control>
                        </Form.Group>
                      </Col>

                      <Col sm={12}>
                        <Form.Group
                          className="mb-3"
                          controlId="formBasicPassword"
                        >
                          <Form.Label> Description </Form.Label>
                          <Form.Control
                            ref={descriptionRef}
                            as="textarea"
                            rows="4"
                            type="text"
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Form>
                </div>
              </Col>
            </Row>
          </Container>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            onClick={submit}
            className="bg-danger text-white border rounded-pill px-5 py-2"
            type="submit"
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CategoryReview;
