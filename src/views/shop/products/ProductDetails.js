import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Card,
  Container,
  Row,
  Col,
  Form,
  InputGroup,
  Button,
  Spinner,
} from "react-bootstrap";

import { GET, POST } from "../../../apicontroller/ApiController";

const ProductDetails = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const header = { "x-access-token": localStorage.getItem("token") };

  const [images, setImages] = useState([]);
  const [supercategory, setSuperCategory] = useState([]);
  const [listingcategory, setListingCategory] = useState([]);
  const [supercategoryId, setSuperCategoryId] = useState("");
  const [previewImages, setPreviewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false); // Loader state

  const supercategoryRef = useRef();
  const categoryRef = useRef();
  const specificationsRef = useRef();

  useEffect(() => {
    Promise.all([GET(`supercategory`), GET(`listing/category/${user.UserId}`)])
      .then(([superCats, listingCats]) => {
        setSuperCategory(superCats);
        setListingCategory(listingCats);
      })
      .catch((error) => {
        toast.error("Error loading categories");
      });
  }, [user.UserId]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  const submit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Enable loader

    const formData = new FormData();
    formData.append("supercategory", supercategoryRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("specifications", specificationsRef.current.value);
    formData.append("listingid", localStorage.getItem("listingid"));

    images.forEach((image, index) => {
      formData.append("subcategory[]", image);
    });

    try {
      await POST("subcategory", formData, header);
      toast.success("Product Details Added Successfully");
      navigate("/shopproduct");
    } catch (error) {
      toast.error("Failed to add product details");
    } finally {
      setIsSubmitting(false); // Disable loader
    }
  };

  return (
    <Container className="my-4">
      <Card style={{ width: "100%" }} className="shadow-sm">
        <Card.Body>
          <h2 className="text-center mb-4">Add Product Details</h2>

          <Form onSubmit={submit}>
            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Super Category</Form.Label>
                  <Form.Control
                    as="select"
                    ref={supercategoryRef}
                    onChange={(e) => setSuperCategoryId(e.target.value)}
                    required
                  >
                    <option value="">Select Super Category</option>
                    {supercategory.map((supercateg) => (
                      <option key={supercateg.id} value={supercateg.id}>
                        {supercateg.title}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Category</Form.Label>
                  <Form.Control as="select" ref={categoryRef} required>
                    <option value="">Select Category</option>
                    {listingcategory
                      .filter(
                        (listcateg) =>
                          listcateg.spc_id === parseInt(supercategoryId)
                      )
                      .map((listcateg) => (
                        <option key={listcateg.id} value={listcateg.id}>
                          {listcateg.title}
                        </option>
                      ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mb-4">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Product Images</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </InputGroup>
                  {previewImages.length > 0 && (
                    <div className="d-flex mt-2">
                      {previewImages.map((preview, index) => (
                        <img
                          key={index}
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          style={{
                            width: "60px",
                            height: "60px",
                            objectFit: "cover",
                            marginRight: "10px",
                          }}
                        />
                      ))}
                    </div>
                  )}
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>Product Specifications</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={5}
                    ref={specificationsRef}
                    placeholder="Enter product specifications"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                className="px-4"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                      className="me-2"
                    />
                    Adding...
                  </>
                ) : (
                  "Add Product Details"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ProductDetails;
