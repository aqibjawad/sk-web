import React, { useState, useEffect } from "react";
import { Star, Heart, ShoppingCart, ZoomIn, Truck, Shield } from "lucide-react";
import { Card, Tab, Tabs, Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { GET, POST } from "../../apicontroller/ApiController";
import { AddToCart } from "../../Helper";
import ReactImageMagnify from "react-image-magnify";
import ReactStars from "react-rating-stars-component";
import { Auth } from "../../context/Auth.Context";
import { toast } from "react-toastify";

const CategoryInsideHeader = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [subcategories, setSubCategory] = useState({});
  const [categorysimi, setCategorySimi] = useState([]);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [isWishlist, setIsWishlist] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState("reviews");
  const [isLogoVisible, setIsLogoVisible] = useState(true);
  const [redirecting, setRedirecting] = useState(false);

  const { param } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = Auth();
  const notify2 = () => toast("You Save listing Successfully!");
  const notify = () => toast("Please log in to save listings.");
  const header = { "x-access-token": localStorage.getItem("token") };
  const id = param.split("-").pop();

  // Fetch initial data
  useEffect(() => {
    // Fetch subcategory details
    GET(`subcategory/${id}`).then((result) => {
      setSubCategory(result);
      setImages(result.images);
    });

    // Fetch reviews
    GET(`reviews/${id}`).then((result) => {
      setReviews(result);
      setFilteredReviews(result);
    });

    // Fetch similar items
    GET(`subcategory/category/${id}`).then((result) => {
      setCategorySimi(result);
    });
  }, [param]);

  // Calculate discounted price
  const calculateDiscountedPrice = () => {
    if (!subcategories.price) return 0;
    return (
      subcategories.price - subcategories.price * (subcategories.discount / 100)
    );
  };

  // Handle wishlist/save
  const handleSave = () => {
    if (isAuthenticated) {
      const formData = { save: 1, productid: id };
      POST("listing/reaction", formData, header).then(() => {
        setIsWishlist(!isWishlist);
        notify2();
      });
    } else {
      notify();
    }
  };

  // Handle add to cart
  const handleAddToCart = () => {
    setIsLogoVisible(false);
    setTimeout(() => {
      setRedirecting(true);
      navigate("/cart");
    }, 2000);
    AddToCart(subcategories);
  };

  // Handle buy now
  const handleBuyNow = () => {
    navigate(
      `/checkout/${subcategories.SuperCategory}-${subcategories.spc_id}/${subcategories.Category}-${subcategories.id}`
    );
  };

  // Filter reviews by rating
  useEffect(() => {
    if (selectedRating) {
      setFilteredReviews(
        reviews.filter(
          (review) => Math.floor(review.product) === selectedRating
        )
      );
    } else {
      setFilteredReviews(reviews);
    }
  }, [selectedRating, reviews]);

  return (
    <Container fluid className="py-4">
      <Row className="">
        {/* Image Gallery */}
        <Col md={5}>
          <div className="position-relative rounded overflow-hidden bg-light">
            {images?.[selectedImage]?.images && (
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Product Image",
                    isFluidWidth: true,
                    src: `${process.env.REACT_APP_AWS_URL}${images[selectedImage].images}`,
                  },
                  largeImage: {
                    src: `${process.env.REACT_APP_AWS_URL}${images[selectedImage].images}`,
                    width: 1200,
                    height: 1800,
                  },
                  enlargedImagePosition: "over",
                  hoverDelayInMs: 0,
                  hoverOffDelayInMs: 0,
                  lensStyle: { backgroundColor: "rgba(0,0,0,.6)" },
                }}
              />
            )}
            {isHovered && (
              <div className="position-absolute top-0 start-50 translate-middle-x mt-3 bg-dark bg-opacity-75 text-white px-3 py-2 rounded-pill d-flex align-items-center gap-2">
                <ZoomIn size={16} />
                <span className="fs-6 fw-medium">Hover to Zoom</span>
              </div>
            )}
          </div>
          <div className="d-flex gap-2 overflow-auto mt-3">
            {images?.map((img, idx) => (
              <Button
                key={idx}
                variant="outline-primary"
                className={`p-1 border-2 ${
                  selectedImage === idx
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(idx)}
              >
                <img
                  src={`${process.env.REACT_APP_AWS_URL}${img.images}`}
                  alt={`View ${idx + 1}`}
                  style={{ width: "80px", height: "80px" }}
                  className="object-fit-cover rounded"
                />
              </Button>
            ))}
          </div>
        </Col>

        {/* Product Details */}
        <Col md={4}>
          <div className="mb-4">
            <h1 className="fs-2 fw-bold">{subcategories?.Category}</h1>
            <div className="d-flex align-items-center gap-3 mt-2">
              <ReactStars
                count={5}
                value={
                  reviews.reduce((acc, review) => acc + review.product, 0) /
                  reviews.length
                }
                size={20}
                edit={false}
              />
              <span className="text-secondary">({reviews.length} Reviews)</span>
            </div>
          </div>

          <div className="d-flex align-items-baseline gap-3 mb-4">
            <span className="fs-2 fw-bold">
              {subcategories?.currency}
              {calculateDiscountedPrice()}
            </span>{" "}
            &nbsp; &nbsp;
            {subcategories?.discount > 0 && (
              <>
                <span className="fs-5 text-secondary text-decoration-line-through">
                  {subcategories?.currency}
                  {subcategories?.price}
                </span>{" "}
                &nbsp; &nbsp; &nbsp;
                <span className="text-success fw-semibold">
                  {subcategories?.discount}% OFF
                </span>
              </>
            )}
          </div>

          <div className="d-flex flex-column gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={handleBuyNow}
              className="w-100"
            >
              Buy Now
            </Button>
            <div className="d-flex gap-3">
              <Button
                variant="dark"
                className="flex-grow-1 d-flex align-items-center justify-content-center gap-2"
                onClick={handleAddToCart}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button
                variant="outline-secondary"
                onClick={handleSave}
                className="px-3"
              >
                <Heart
                  size={24}
                  className={isWishlist ? "text-danger" : ""}
                  fill={isWishlist ? "currentColor" : "none"}
                />
              </Button>
            </div>
          </div>

          <Row className="g-2">
            <Col xs={6}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-3 d-flex align-items-center gap-2">
                  <Truck className="text-primary" size={20} />
                  <div>
                    <p className="fw-medium mb-0 fs-7">Free Shipping</p>
                    <p className="text-secondary mb-0 small">
                      On orders over $100
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Body className="p-3 d-flex align-items-center gap-2">
                  <Shield className="text-primary" size={20} />
                  <div>
                    <p className="fw-medium mb-0 fs-7">Quality Guarantee</p>
                    <p className="text-secondary mb-0 small">
                      100% satisfaction
                    </p>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>

        {/* Similar Items */}
        <Col md={3}>
          <Card>
            <Card.Body>
              <h2 className="fs-5 fw-bold mb-3">Similar Items</h2>
              <div className="d-flex flex-column gap-3">
                {categorysimi?.map((similar) => (
                  <div key={similar.id} className="d-flex gap-3">
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}${similar.image}`}
                      alt={similar.Category}
                      className="rounded object-fit-cover"
                      style={{ width: "80px", height: "80px" }}
                    />
                    <div>
                      <h3 className="fs-6 fw-medium mb-1">
                        {similar.Category.slice(0, 50)}...
                      </h3>
                      <p className="text-primary fw-bold mb-0">
                        {similar.currency} {similar.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Reviews Section */}
      <div className="mt-5">
        <Tabs
          id="product-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-4"
        >
          <Tab eventKey="reviews" title="Reviews">
            <div className="d-flex gap-2 mb-4">
              {[5, 4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={selectedRating === rating ? "primary" : "light"}
                  onClick={() =>
                    setSelectedRating(selectedRating === rating ? null : rating)
                  }
                  className="px-3 py-2 rounded-pill"
                >
                  {rating} ★
                </Button>
              ))}
            </div>

            <div className="d-flex flex-column gap-4">
              {filteredReviews?.map((review) => (
                <Card key={review.id}>
                  <Card.Body>
                    <div className="d-flex gap-3">
                      <img
                        src={
                          review.image
                            ? `${process.env.REACT_APP_AWS_URL}${review.image}`
                            : "https://i.stack.imgur.com/SE2cv.jpg"
                        }
                        alt={review.Name}
                        className="rounded-circle"
                        style={{ width: "48px", height: "48px" }}
                      />
                      <div className="flex-grow-1">
                        <div className="d-flex justify-content-between">
                          <h3 className="fs-6 fw-semibold mb-0">
                            {review.Name}
                          </h3>
                          <ReactStars
                            count={5}
                            value={review.product}
                            size={16}
                            edit={false}
                          />
                        </div>
                        <h4 className="fs-6 fw-medium mt-2 mb-1">
                          {review.reviewTitle}
                        </h4>
                        <p className="text-secondary mb-0">
                          {review.description}
                        </p>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </Tab>

          <Tab eventKey="description" title="Description">
            <Card>
              <Card.Body>
                <p className="text-secondary mb-0">
                  {subcategories?.specifications}
                </p>
              </Card.Body>
            </Card>
          </Tab>

          <Tab eventKey="shipping" title="Shipping">
            <Card>
              <Card.Body>
                <h3 className="fs-4 fw-semibold mb-3">Shipping Information</h3>
                <p className="text-secondary mb-0">
                  Free shipping on orders over $100. Standard delivery takes 3-5
                  business days.
                </p>
              </Card.Body>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </Container>
  );
};

export default CategoryInsideHeader;
