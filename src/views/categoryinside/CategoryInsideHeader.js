import React, { useState, useEffect, useRef } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { GET, POST } from "../../apicontroller/ApiController";
import { AddToCart } from "../../Helper";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { Col } from "react-bootstrap";
import { Auth } from "../../context/Auth.Context";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import ReactStars from "react-rating-stars-component";
import ReactImageMagnify from "react-image-magnify";
import CategoryReview from "./CategoryReview";
import RatingSummary from "./ratingSummary";
import "./styles.css";

import { Collapse } from "react-bootstrap";

const CategoryInsideHeader = () => {
  const [subcategories, setSubCategory] = useState([]);
  const [categorysimi, setCategorySimi] = useState([]);

  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  const [selectedRating, setSelectedRating] = useState(null);

  const [isSaved, setIsSaved] = useState(false);

  const { param } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = Auth();
  const notify2 = () => toast("You Save listing Successfully!");
  const notify = () => toast("Please log in to save listings.");
  const header = { "x-access-token": localStorage.getItem("token") };
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null;

  const id = param.split("-").pop();

  const { supercategory } = useParams(); // Example: "Shoes Men-6"
  // Check if supercategory is undefined before using substring
  const spc_id = supercategory
    ? supercategory.substring(supercategory.lastIndexOf("-") + 1)
    : null;

  // Fetch category and review data based on ID
  useEffect(() => {
    const id = param.split("-").pop();

    // Get user info from localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.id : null;

    GET(`subcategory/${id}`).then((result) => {
      setSubCategory(result);
      setImages(result.images);

      if (result.save === 1) {
        setIsSaved(true);
      }
    });

    GET(`reviews/${id}`).then((result) => {
      setReviews(result);
      setFilteredReviews(result); // Initialize filtered reviews
    });
  }, [param]);

  useEffect(() => {
    // Get the current URL path
    const path = window.location.pathname;

    // Extract the product segment (e.g., "Shoes%20Men-6")
    const matches = path.match(/\/product\/(.*?)\//);

    if (matches && matches[1]) {
      // Split by hyphen to separate name and ID
      const [superCatName, superCatId] = matches[1].split("-");

      // Decode the URL-encoded name
      const decodedName = decodeURIComponent(superCatName);

      // Make the API call with the super category ID
      GET(`category/random/${superCatId}`).then((result) => {
        setCategorySimi(result);
      });
    }
  }, []);

  const saveListing = () => {
    if (isAuthenticated) {
      const formData = { save: 1, productid: id };
      POST("listing/reaction", formData, header).then((res) => notify2());
    } else {
      notify();
    }
  };

  useEffect(() => {
    if (selectedRating) {
      setFilteredReviews(
        reviews.filter((review) => {
          // Handle cases where review.product might be null/undefined
          const reviewRating = review.product || 0;
          return Math.floor(reviewRating) === selectedRating;
        })
      );
    } else {
      setFilteredReviews(reviews);
    }
  }, [selectedRating, reviews]);

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1);
  };

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [open, setOpen] = useState(false); // State to track if the description is expanded

  const [activeIndex, setActiveIndex] = useState(0);
  const carouselRef = useRef(null);

  // Function to handle thumbnail click
  const handleThumbnailClick = (index) => {
    setActiveIndex(index);
    if (carouselRef.current) {
      carouselRef.current.to(index);
    }
  };

  const handleSaveToggle = () => {
    if (!userId) {
      // Redirect to login or show login prompt
      return;
    }

    if (isSaved) {
      // Call API to remove from saved
      POST(`remove-saved`, { userId, productId: id })
        .then(() => setIsSaved(false))
        .catch((err) => console.error("Error removing from saved", err));
    } else {
      // Call API to add to saved
      POST(`add-saved`, { userId, productId: id })
        .then(() => setIsSaved(true))
        .catch((err) => console.error("Error adding to saved", err));
    }
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <section className="">
        <div className="">
          <div className="row gx-5">
            {/* Image Section */}
            <aside className="col-lg-6">
              <div className="border rounded-4 mb-3 d-flex justify-content-center">
                <Carousel>
                  {images?.map((subcategoryImages, index) => {
                    const imageUrl = `${process.env.REACT_APP_AWS_URL}${subcategoryImages.images}`;
                    return (
                      <div key={index} className="relative group">
                        {subcategoryImages?.images && (
                          <>
                            {subcategoryImages.images.endsWith("jpg") && (
                              <div className="relative">
                                <ReactImageMagnify
                                  {...{
                                    smallImage: {
                                      alt: "Product Image",
                                      isFluidWidth: true,
                                      src: imageUrl,
                                    },
                                    largeImage: {
                                      src: imageUrl,
                                      width: 1200,
                                      height: 1800,
                                    },
                                    enlargedImagePosition: "over",
                                    hoverDelayInMs: 0,
                                    hoverOffDelayInMs: 0,
                                    lensStyle: {
                                      backgroundColor: "rgba(0,0,0,.6)",
                                    },
                                  }}
                                />
                                {/* Hover to Zoom Text Overlay */}
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                  <span className="text-sm font-medium">
                                    Hover to Zoom
                                  </span>
                                </div>
                              </div>
                            )}
                            {(subcategoryImages.images.endsWith("mp4") ||
                              subcategoryImages.images.endsWith("webm")) && (
                              <video
                                controls
                                style={{ maxWidth: "100%", maxHeight: "200vh" }}
                              >
                                <source
                                  src={imageUrl}
                                  type={`video/${subcategoryImages.images
                                    .split(".")
                                    .pop()}`}
                                />
                              </video>
                            )}
                            {(subcategoryImages.images.endsWith("png") ||
                              subcategoryImages.images.endsWith("jpeg") ||
                              subcategoryImages.images.endsWith("gif") ||
                              subcategoryImages.images.endsWith("svg") ||
                              subcategoryImages.images.endsWith("jfif")) && (
                              <div className="relative">
                                <ReactImageMagnify
                                  {...{
                                    smallImage: {
                                      alt: "Product Image",
                                      isFluidWidth: true,
                                      src: imageUrl,
                                    },
                                    largeImage: {
                                      src: imageUrl,
                                      width: 2000,
                                      height: 2000,
                                    },
                                    enlargedImagePosition: "over",
                                    hoverDelayInMs: 0,
                                    hoverOffDelayInMs: 0,
                                    lensStyle: {
                                      backgroundColor: "rgba(0,0,0,.6)",
                                    },
                                  }}
                                />
                                {/* Hover to Zoom Text Overlay */}
                                <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/75 text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                  <svg
                                    className="w-4 h-4"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M12 4v16m8-8H4"
                                    />
                                  </svg>
                                  <span className="text-sm font-medium">
                                    Hover to Zoom
                                  </span>
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </Carousel>
              </div>

              {/* Thumbnail Images */}
              <div className="d-flex justify-content-center mb-3">
                {images?.map((subcategoryImages, index) => {
                  const thumbUrl = `${process.env.REACT_APP_AWS_URL}${subcategoryImages.images}`;
                  return (
                    <a
                      key={index}
                      className={`border mx-1 rounded-2 ${
                        index === selectedIndex ? "border-primary" : ""
                      }`}
                      onClick={() => setSelectedIndex(index)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        width="60"
                        height="60"
                        className="rounded-2"
                        src={thumbUrl}
                        alt="Thumbnail"
                      />
                    </a>
                  );
                })}
              </div>
            </aside>

            {/* Product Details Section */}
            <main className="col-lg-6">
              <div className="ps-lg-3">
                <h4 className="title text-dark">{subcategories?.Category}</h4>

                {/* Ratings & Orders */}
                <div className="d-flex flex-row my-3">
                  {subcategories?.outstock === null ||
                  subcategories?.outstock === "0" ? (
                    <span className="text-success ms-2">In stock</span>
                  ) : (
                    <span className="text-danger ms-2">Out of stock</span>
                  )}
                </div>

                {/* Price */}
                <div className="mb-3">
                  {subcategories.discount > 0 ? (
                    <>
                      {/* Discounted Price */}
                      <span className="h5 text-danger">
                        {subcategories.currency}{" "}
                        {(
                          subcategories.price -
                          (subcategories.price * subcategories.discount) / 100
                        ).toFixed(2)}
                      </span>

                      {/* Original Price (Strikethrough) */}
                      <span className="text-muted ms-2">
                        <del className="ml-3">
                          {subcategories.currency} {subcategories.price}
                        </del>
                      </span>

                      {/* Discount Percentage */}
                      <span className="text-success ms-2 ml-2">
                        ({subcategories.discount}% OFF)
                      </span>
                    </>
                  ) : (
                    // When no discount (0%), show original price in red
                    <span
                      className="h5 text-danger"
                      style={{ textAlign: "justify" }}
                    >
                      {subcategories.currency} {subcategories.price}
                    </span>
                  )}
                </div>

                {/* Description */}
                <div>
                  <p>
                    {subcategories?.specifications
                      ? subcategories.specifications.slice(0, 600)
                      : ""}
                  </p>

                  <Collapse in={open}>
                    <div>
                      <p>
                        {subcategories?.specifications
                          ? subcategories.specifications
                          : ""}
                      </p>
                    </div>
                  </Collapse>

                  <button
                    onClick={() => setOpen(!open)}
                    aria-controls="collapse-text"
                    aria-expanded={open}
                  >
                    {open ? "See Less" : "See More"}
                  </button>
                </div>

                <hr />

                {/* Size & Quantity Selection */}
                <div className="row mb-4">
                  <div className="col-md-4 col-6 mb-3">
                    <label className="mb-2 d-block">Quantity</label>
                    <div
                      className="input-group mb-3"
                      style={{ width: "170px" }}
                    >
                      <button
                        className="btn btn-black border border-secondary px-3"
                        type="button"
                        onClick={decreaseQuantity}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="form-control text-center border border-secondary"
                        value={quantity}
                        readOnly
                      />
                      <button
                        className="btn btn-white border border-secondary px-3"
                        type="button"
                        onClick={increaseQuantity}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ marginTop: "-2rem" }}>
                  {!isAuthenticated ? (
                    <>
                      <a
                        href="/signin"
                        className="btn btn-warning shadow-0 me-2"
                      >
                        Buy now
                      </a>

                      <a
                        href="/signin"
                        className="btn btn-primary shadow-0 me-2 ml-3"
                      >
                        <i className="me-1 fa fa-shopping-basket"></i> Add to
                        cart
                      </a>

                      <a
                        href="/signin"
                        className="btn btn-light border border-secondary icon-hover ml-3"
                      >
                        <i className="me-1 fa fa-heart fa-lg"></i> Save
                      </a>
                    </>
                  ) : (
                    user &&
                    user.role !== "seller" && (
                      // <Button
                      //   className="modal-button mb-5"
                      //   variant="danger"
                      //   onClick={handleShow}
                      // >
                      //   Add Reviews
                      // </Button>
                      <>
                        <a
                          // href={`/checkout/${subcategories.SuperCategory}-${subcategories.spc_id}/${subcategories.Category}-${subcategories.id}`}
                          className="btn btn-warning shadow-0 me-2"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsLoading(true); // Start loading

                            // Create cart item with selected quantity
                            const cartItem = {
                              ...subcategories,
                              quantity: quantity,
                              // Calculate final price considering discount
                              finalPrice:
                                subcategories.discount > 0
                                  ? subcategories.price -
                                    (subcategories.price *
                                      subcategories.discount) /
                                      100
                                  : subcategories.price,
                            };

                            // Add to cart and get result
                            const added = AddToCart(cartItem);

                            setTimeout(() => {
                              setIsLoading(false); // Stop loading

                              // If you want to navigate only when successfully added:
                              if (added) {
                                navigate("/addcart");  // Uncomment if you want to navigate after adding
                              }
                            }, 800);
                          }}
                          disabled={isLoading}
                        >
                          Buy now
                        </a>

                        <a
                          href="#"
                          className="btn btn-primary shadow-0 me-2 ml-3"
                          onClick={(e) => {
                            e.preventDefault();
                            setIsLoading(true); // Start loading

                            // Create cart item with selected quantity
                            const cartItem = {
                              ...subcategories,
                              quantity: quantity,
                              // Calculate final price considering discount
                              finalPrice:
                                subcategories.discount > 0
                                  ? subcategories.price -
                                    (subcategories.price *
                                      subcategories.discount) /
                                      100
                                  : subcategories.price,
                            };

                            // Add to cart and get result
                            const added = AddToCart(cartItem);

                            setTimeout(() => {
                              setIsLoading(false); // Stop loading

                              // If you want to navigate only when successfully added:
                              if (added) {
                                // navigate("/addcart");  // Uncomment if you want to navigate after adding
                              }
                            }, 800);
                          }}
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span>
                              <i className="fa fa-spinner fa-spin"></i>{" "}
                              Adding...
                            </span>
                          ) : (
                            <span>
                              <i className="me-1 fa fa-shopping-basket"></i> Add
                              to cart
                            </span>
                          )}
                        </a>

                        <a
                          href="#"
                          className={`btn ${
                            isSaved
                              ? "btn-danger"
                              : "btn-light border border-secondary"
                          } icon-hover ml-3`}
                          onClick={isSaved ? null : saveListing}
                        >
                          <i
                            className={`me-1 fa fa-heart fa-lg ${
                              isSaved ? "text-white" : ""
                            }`}
                          ></i>
                          {isSaved ? "Saved" : "Save"}
                        </a>
                      </>
                    )
                  )}
                </div>
              </div>
            </main>
          </div>
        </div>

        {/* Reviews Section and Similar items section */}
        <section className="bg-light border-top">
          <div className="">
            <div className="row gx-4">
              <div className="col-lg-9 mb-4 mt-5">
                <CategoryReview
                  reviews={reviews}
                  productId={id}
                  style={{ marginTop: "-2rem" }}
                />

                <div
                  className="border rounded-2 bg-white"
                  style={{ marginTop: "-2rem" }}
                >
                  <RatingSummary
                    reviews={reviews}
                    selectedRating={selectedRating}
                    onRatingSelect={setSelectedRating}
                  />
                  {filteredReviews?.map((review, index) => (
                    <div
                      className="review-card mt-4"
                      style={{ width: "80%", marginLeft: "6rem" }}
                      key={index}
                    >
                      <div className="review-header">
                        <img
                          className="profile-image"
                          src={
                            review.image
                              ? `${process.env.REACT_APP_AWS_URL}${review.image}`
                              : "/userpic.jpg"
                          }
                          alt={`Profile of ${review.Name}`}
                        />
                        <p className="reviewer-name">{review.Name}</p>
                        <ReactStars
                          count={5}
                          value={review.product || 0}
                          size={35}
                          edit={false}
                        />
                      </div>
                      <h3 className="review-title">{review.reviewTitle}</h3>
                      <p className="review-description">{review.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="col-lg-3 mt-5 mb-2">
                <div className="px-0 border rounded-2 shadow-0">
                  <div className="card">
                    <div className="card-body">
                      <h5 className="card-title">Similar items</h5>
                      {categorysimi?.map((similar, index) => (
                        <div className="d-flex mb-3">
                          <a href="#" className="me-3">
                            <img
                              src={`${process.env.REACT_APP_AWS_URL}${similar.image}`}
                              style={{ minWidth: "96px", height: "96px" }}
                              className="img-md img-thumbnail"
                              alt="Rucksack Backpack"
                            />
                          </a>
                          <div className="info">
                            <a href="#" className="nav-link mb-1">
                              {similar.title}
                            </a>
                            <strong className="text-dark">
                              {" "}
                              {`${similar.currency} ${similar.price}`}{" "}
                            </strong>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default CategoryInsideHeader;
