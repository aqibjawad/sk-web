import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { POST, GET } from "../../../apicontroller/ApiController";
import {
  FaUpload,
  FaInfoCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Add style manually
import "react-upload-gallery/dist/style.css"; // or scss

const Account = () => {
  const navigate = useNavigate();
  const [profileimage, setImageProfile] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  const header = { "x-access-token": localStorage.getItem("token") };

  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const addressRef = useRef();
  const descriptionRef = useRef();

  const submit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const formData = new FormData();

    if (profileimage) formData.append("profileimage", profileimage);

    formData.append("firstname", firstnameRef.current.value);
    formData.append("lastname", lastnameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("phone", phoneRef.current.value);
    formData.append("address", addressRef.current.value);
    formData.append("description", descriptionRef.current.value);

    POST("auth/update", formData, header)
      .then((res) => {
        toast.success("Profile updated successfully");
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error("Failed to update profile");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const [shops, setShops] = useState([]);

  const fetchData = async () => {
    GET(`listing/shop/${user.UserId}`)
      .then((result) => {
        setShops(result[0]);
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container py-5">
      <div className="card border-0 shadow-sm rounded-3 mb-4">
        <div className="card-body p-4">
          <form onSubmit={submit}>
            {/* Profile Image Section */}
            <div className="row mb-4">
              <div className="col-md-12">
                <label className="form-label fw-bold mb-3">
                  Shop Profile Photo
                </label>
                <div className="d-flex gap-4 align-items-start flex-wrap">
                  <div className="profile-preview">
                    {/* Banner Image as Profile Photo */}
                    <div
                      className="border shadow-sm rounded"
                      style={{
                        width: "280px",
                        height: "200px",
                        overflow: "hidden",
                      }}
                    >
                      {shops && shops.userimage ? (
                        <img
                          className="w-100 h-100 object-fit-cover"
                          src={`${process.env.REACT_APP_AWS_URL}${shops.userimage}`}
                          alt="Shop Banner"
                        />
                      ) : profileimage ? (
                        <img
                          src={`${process.env.REACT_APP_AWS_URL}${shops.userimage}`}
                          className="w-100 h-100 object-fit-cover"
                          alt="Profile Preview"
                        />
                      ) : (
                        <div className="w-100 h-100 d-flex justify-content-center align-items-center bg-light">
                          <p className="text-secondary">
                            No banner image available
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="upload-section flex-grow-1 ml-5 mt-5">
                    <div className="input-group mb-2">
                      <input
                        accept="image/*"
                        type="file"
                        className="form-control"
                        id="profileImageInput"
                        onChange={(e) => setImageProfile(e.target.files[0])}
                      />
                      <label
                        className="input-group-text"
                        htmlFor="profileImageInput"
                      >
                        <FaUpload className="me-2" />
                        Upload
                      </label>
                    </div>
                    <small className="text-muted">
                      Accepted formats: JPG, GIF, or PNG. Maximum 5MB.
                    </small>
                    {profileimage && (
                      <div className="alert alert-info mt-3 d-flex align-items-center">
                        <FaInfoCircle className="me-2" />
                        <span>
                          New image selected. Click "Update Profile" to save
                          changes.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Information */}
            <div className="mb-4">
              <h5 className="card-title fw-bold mb-3">Personal Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">
                    First Name <span className="text-danger">*</span>
                  </label>
                  <input
                    ref={firstnameRef}
                    defaultValue={user.firstname}
                    type="text"
                    className="form-control"
                    id="firstName"
                    placeholder="Enter First Name"
                    required
                  />
                </div>

                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">
                    Last Name <span className="text-danger">*</span>
                  </label>
                  <input
                    ref={lastnameRef}
                    defaultValue={user.lastname}
                    type="text"
                    className="form-control"
                    id="lastName"
                    placeholder="Enter Last Name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="mb-4">
              <h5 className="card-title fw-bold mb-3">Contact Information</h5>
              <div className="row g-3">
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                    <input
                      ref={emailRef}
                      defaultValue={user.email}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">
                    Phone Number <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaPhone />
                    </span>
                    <input
                      ref={phoneRef}
                      defaultValue={user.phone}
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter phone number"
                      required
                    />
                  </div>
                </div>

                <div className="col-md-12">
                  <label htmlFor="address" className="form-label">
                    Address <span className="text-danger">*</span>
                  </label>
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaMapMarkerAlt />
                    </span>
                    <input
                      ref={addressRef}
                      defaultValue={user.address}
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Your Address"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shop Description */}
            <div className="mb-4">
              <h5 className="card-title fw-bold mb-3">Shop Information</h5>
              <div className="row g-3">
                <div className="col-md-12">
                  <label htmlFor="description" className="form-label">
                    Shop Description <span className="text-danger">*</span>
                  </label>
                  <textarea
                    ref={descriptionRef}
                    defaultValue={user.description}
                    className="form-control"
                    id="description"
                    placeholder="Describe your shop"
                    rows={4}
                    required
                  />
                  <div className="form-text">
                    Provide details about your shop, products, and services
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-end mt-4">
              <button
                type="button"
                className="btn btn-outline-secondary me-2 mr-5"
                onClick={() => navigate("/dashboard")}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary px-4"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm me-2"
                      role="status"
                      aria-hidden="true"
                    ></span>
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Account;
