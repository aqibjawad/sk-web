import React, { useState, useRef } from "react";

import { POST } from "../../../apicontroller/ApiController";

import { toast } from "react-toastify";

const Account = () => {
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : [];
  const header = { "x-access-token": localStorage.getItem("token") };

  const [image, setImage] = useState();
  const firstnameRef = useRef();
  const lastnameRef = useRef();
  const emailRef = useRef();
  const addressRef = useRef();
  const phoneRef = useRef();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    if (image) formData.append("profileimage", image); // Changed from "image" to "profileimage"

    formData.append("firstname", firstnameRef.current.value);
    formData.append("lastname", lastnameRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("address", addressRef.current.value); // Fixed the address reference
    formData.append("phone", phoneRef.current.value);

    POST("auth/update", formData, header).then((res) => {
      toast("Users Update successfully Successfully");
    });
  };

  return (
    <>
      <div className="Dahboard">
        <div className="" style={{ margin: "0 43px " }}>
          <form className="card-body">
            <div className="row">
              <div className="form-group col-sm-12 pr-0">
                <strong for="exampleInputEmail1">
                  {user.image ? (
                    <img
                      src={`${process.env.REACT_APP_AWS_URL}${user.image}`}
                      style={{
                        borderTopLeftRadius: "10px",
                        borderTopRightRadius: "10px",
                        width: "100%",
                        height: "300px",
                      }}
                    />
                  ) : (
                    <img
                      src="https://i.stack.imgur.com/SE2cv.jpg"
                      style={{
                        borderRadius: "50px",
                        height: "50px",
                        objectFit: "contain",
                        marginLeft: "2rem",
                        cursor: "pointer",
                      }}
                    />
                  )}
                </strong>
              </div>

              <div className="form-group col-sm-6 pr-0">
                <strong for="exampleInputEmail1">
                  Hello {user.name}
                  <span className="text-danger">*</span>
                </strong>
              </div>

              <div className="form-group col-sm-12 pr-0">
                <span for="exampleInputEmail1">How are you today?</span>
              </div>

              <div className="form-group col-sm-12 pr-0">
                <span for="exampleInputEmail1">
                  <em> Your Account Details are given! </em>
                </span>
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-12 pr-0">
                <strong for="exampleInputEmail1">{user.address}</strong>
              </div>
            </div>

            <div className="d-flex">
              <div className="form-group col-sm-6 pr-0">
                <strong for="exampleInputEmail1">{user.email}</strong>
              </div>

              <div className="form-group col-sm-6 pr-0">
                <strong for="exampleInputEmail1">{user.phone}</strong>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="Update">
        <div className=" mb-5 account-form" style={{ margin: "0 43px " }}>
          <form className="card-body">
            <div className="form-group">
              <label for="exampleFormControlFile1"> Photo(s) </label>
              {image && (
                <div>
                  <img
                    src={URL.createObjectURL(image)}
                    className="bg-light rounded p-2 mb-2"
                    height="220px"
                    width="auto"
                  />
                </div>
              )}
              <div className="border col-sm-612 p-2 bg-light">
                <input
                  accept="image/*"
                  type="file"
                  className="fs-6 form-control-file"
                  id="exampleFormControlFile1"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              <small style={{ color: "rgb(150, 141, 141)" }}>
                Accepted formats: JPG, GIF, or PNG Maximum 10MB.
              </small>
            </div>

            <div className="row">
              <div className="form-group col-sm-6 pr-0">
                <label for="exampleInputEmail1">
                  First Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  ref={firstnameRef}
                  defaultValue={user.firstname}
                  type="text"
                  className="rounded-0 bg-light form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
              </div>

              <div className="form-group col-sm-6 pr-0">
                <label for="exampleInputEmail1">
                  Last Name
                  <span className="text-danger">*</span>
                </label>
                <input
                  ref={lastnameRef}
                  defaultValue={user.lastname}
                  type="text"
                  className="rounded-0 bg-light form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Name"
                />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-sm-6">
                <label for="exampleInputEmail1">
                  Email Address <span className="text-danger">*</span>
                </label>
                <input
                  disabled
                  ref={emailRef}
                  defaultValue={user.email}
                  type="email"
                  className="rounded-0 bg-light form-control"
                  placeholder="email@example.com"
                />
              </div>

              <div className="form-group col-sm-6">
                <label for="exampleInputEmail1">
                  Role <span className="text-danger">*</span>
                </label>
                <input
                  defaultValue={user.role}
                  disabled
                  className="rounded-0 bg-light form-control"
                />
              </div>

              <div className="form-group col-sm-6">
                <label for="exampleInputEmail1">
                  Address <span className="text-danger">*</span>
                </label>
                <input
                  defaultValue={user.address}
                  type="text"
                  className="rounded-0 bg-light form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Address"
                  ref={addressRef}
                />
              </div>

              <div className="form-group col-sm-6">
                <label for="exampleInputEmail1">
                  {" "}
                  Phone <span className="text-danger">*</span>{" "}
                </label>
                <input
                  defaultValue={user.phone}
                  type="text"
                  className="rounded-0 bg-light form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  placeholder="Enter Your Address"
                  ref={phoneRef}
                />
              </div>
            </div>
            <div className="row m-0 pt-3">
              <button onClick={submit} className="save-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default Account;
