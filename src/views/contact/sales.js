import React, { useState, useRef } from "react"

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowRight, faComments, faDharmachakra } from "@fortawesome/free-solid-svg-icons";

import { POST } from "../../../src/apicontroller/ApiController.js"

import "./contact.scss";

import { toast } from "react-toastify";

export default function Sales() {

  const [contact, setContact] = useState([]);

  const firstnameRef = useRef()
  const lastnameRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const messageRef = useRef()

  const submit = async (event) => {
    event.preventDefault()
    const formData = {
      firstname: firstnameRef.current.value,
      lastname: lastnameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      message: messageRef.current.value,
    }
    POST("contact", formData).then((res) => {
      toast("Your message recieve Successfully")
    });
  }
  return (
    <div id="sales">

      <Container className="text-center px-5 py-3 pt-lg-5 hero">
        <h1>Contact our sales team</h1>
      </Container>
      <div style={{ backgroundColor: " #dc3545" }}>
        <Container className="px-lg-5  pt-5">
          <Row className="px-lg-5 ">
            <Col lg={7} md={12} className="rounded mx-3 mx-md-0 sale-form" style={{ backgroundColor: "#ffffff" }} >
              <Form className="px-2 pt-4">
                <Row >
                  <Form.Group as={Col} lg={4} md={4} className="  my-0 my-md-0 " controlId="formGridEmail" >
                    <Form.Label className="form-fields">First name</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} lg={8} md={8} className=" my-0 my-md-0 " controlId="formGridPassword" >
                    <Form.Control ref={firstnameRef} className="border-0 bg-color" type="text" placeholder="Jane" />
                  </Form.Group>
                </Row>
                <Row className='pt-3'>
                  <Form.Group as={Col} lg={4} md={4} className="  my-0 my-md-0 " controlId="formGridEmail" >
                    <Form.Label className="form-fields">Last name</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} lg={8} md={8} className=" my-0 my-md-0 " controlId="formGridPassword" >
                    <Form.Control ref={lastnameRef} className="border-0 bg-color" type="text" placeholder="Doe" />
                  </Form.Group>
                </Row>
                <Row className='pt-3'>
                  <Form.Group as={Col} lg={4} md={4} className="  my-0 my-md-0 " controlId="formGridEmail" >
                    <Form.Label className="form-fields">Work email</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} lg={8} md={8} className=" my-0 my-md-0 " controlId="formGridPassword" >
                    <Form.Control ref={emailRef} className="border-0 bg-color" type="text" placeholder="jane.doe@gmail.com" />
                  </Form.Group>
                </Row>
                <Row className='pt-3'>
                  <Form.Group as={Col} lg={4} md={4} className="  my-0 my-md-0 " controlId="formGridEmail" >
                    <Form.Label className="form-fields">Work phone</Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} lg={8} md={8} className=" my-0 my-md-0 " controlId="formGridPassword" >
                    <Form.Control ref={phoneRef} className="border-0 bg-color" type="text" placeholder="+92355-55555555" />
                  </Form.Group>
                </Row>

                <Row className='pt-3'>
                  <Form.Group as={Col} lg={4} md={4} className="  my-0 my-md-0 " controlId="formGridEmail" >
                    <Form.Label className="form-fields"> Your Message </Form.Label>
                  </Form.Group>
                  <Form.Group as={Col} lg={8} md={8} className=" my-0 my-md-0 " controlId="formGridPassword" >
                    <Form.Control as="textarea" rows="5" ref={messageRef} className="border-0 bg-color" placeholder="+92355-55555555" />
                  </Form.Group>
                </Row>

                <Row className='pt-3'>
                  <Form.Group as={Col} lg={12} xs={12} className=" d-flex justify-content-end py-4 my-md-0 " controlId="formGridPassword" >
                    <Button onClick={(e) => submit(e)} variant="primary" className="border-0 submit-btn" type="submit" >
                      CONTACT SALES
                    </Button>
                  </Form.Group>
                </Row>
                {/*
                  <Row className='pt-3'>
                    <Form.Group as={Col} lg={4} md={4} className="  my-0 my-md-0 " controlId="formGridEmail" >
                      <Form.Label className="form-fields">
                        Company website
                      </Form.Label>
                    </Form.Group>
                    <Form.Group as={Col} lg={8} md={8} className=" my-0 my-md-0 " controlId="formGridPassword" >
                      <Form.Control   className="border-0 bg-color" type="text" placeholder="example.com" />
                    </Form.Group>
                  </Row>
                  <Row className='pt-3'>
                    <Form.Group
                      as={Col}
                      lg={4}
                      md={4}
                      className="  my-0 my-md-0 "
                      controlId="formGridEmail"
                    >
                      <Form.Label className="form-fields">
                        Company Size
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      lg={8}
                      md={8}
                      className=" my-0 my-md-0 "
                      controlId="formGridPassword"
                    >
                      <Form.Control
                        className="border-0 bg-color"
                        type="text"
                        required
                        placeholder="Select a range of employees"
                      />
                    </Form.Group>
                  </Row>
                  <Row className='pt-3'>
                    <Form.Group
                      as={Col}
                      lg={4}
                      md={4}
                      className="  my-0 my-md-0 "
                      controlId="formGridEmail"
                    >
                      <Form.Label className="form-fields">
                        Country
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      lg={8}
                      md={8}
                      className=" my-0 my-md-0 "
                      controlId="formGridPassword"
                    >
                      <Form.Control
                        className="border-0 bg-color"
                        type="text"
                        required
                        placeholder="Pakistan"
                      />
                    </Form.Group>
                  </Row>
                  <Row className='pt-3'>
                    <Form.Group
                      as={Col}
                      lg={4}
                      md={4}
                      className="  my-0 my-md-0 "
                      controlId="formGridEmail"
                    >
                      <Form.Label className="form-fields">
                      Payments volume
                      <p>
                     How much money your business processes online each month.
                      </p>
                      </Form.Label>


                    </Form.Group>
                    <Form.Group
                      as={Col}
                      lg={8}
                      md={8}
                      className=" my-0 my-md-0 "
                      controlId="formGridPassword"
                    >
                      <Form.Control
                        className="border-0 bg-color"
                        type="text"
                        required
                        placeholder="Select a monthly amouont "
                      />
                    </Form.Group>
                  </Row>
                  <Row className='pt-lg-0 pt-3'>
                    <Form.Group
                      as={Col}
                      lg={4}
                      md={4}
                      className="  my-0 my-md-0 "
                      controlId="formGridEmail"
                    >
                      <Form.Label className="form-fields">
                      Anything else?
                      </Form.Label>
                    </Form.Group>
                    <Form.Group
                      as={Col}
                      lg={8}
                      md={8}
                      className=" my-0 my-md-0 "
                      controlId="formGridPassword"
                    >
                      <Form.Control
                      as="textarea"
                      className="border-0 bg-color"
                      placeholder="Tell us more about yout project, needs, and timeline."
                      style={{ height: "120px" }}
                    />
                    </Form.Group>
                  </Row>
              */}
              </Form>
            </Col>
            <Col lg={5} md={12} className="py-3 px-0 mx-0 align-self-center side-info">
              <ul>
                <p>With Stripe you can:</p>
                <li>
                  <FontAwesomeIcon
                    style={{ fontSize: "12px" }}
                    className="tick-icon"
                    icon={faCheckCircle}
                  />{" "}
                  Focus critical developer resources on your core business
                </li>
                <li>
                  <FontAwesomeIcon
                    style={{ fontSize: "12px" }}
                    className="tick-icon"
                    icon={faCheckCircle}
                  />{" "}
                  Launch new products faster with less payments code
                </li>
                <li>
                  <FontAwesomeIcon
                    style={{ fontSize: "12px" }}
                    className="tick-icon"
                    icon={faCheckCircle}
                  />{" "}
                  Improve conversion from international customers
                </li>
              </ul>
            </Col>
          </Row>
        </Container>



        {/* ==========================info======================= */}
        <Container className="py-lg-5 px-5 ">
          <Row className="d-flex  justify-content-center">
            <Col md={6} className="pt-4 Gernal-Communication  px-lg-4">
              {" "}
              <div className="flex-lg-start d-flex ">
                {" "}
                <FontAwesomeIcon
                  style={{ fontSize: "30px" }}
                  className="comment-icon"
                  icon={faComments}
                />
                <div className="pl-3">
                  {" "}
                  <h3> General communication</h3>
                  <p>
                    For general queries, including partnership opportunities,
                    please email{" "}
                    <a href="mailto:info@stripe.com" class="common-Link ">
                      info@stripe.com
                    </a>
                  </p>
                </div>{" "}
              </div>{" "}
            </Col>
            <Col
              md={6}
              className=" pt-4 Gernal-Communication  info-border  px-lg-4"
            >
              <div className="d-flex">
                <FontAwesomeIcon
                  style={{ fontSize: "30px" }}
                  className="comment-icon"
                  icon={faDharmachakra}
                />
                <div className="pl-3">
                  <h3>Technical or account support</h3>
                  <p>
                    We’re here to help! If you have technical issues,{" "}
                    <a
                      href="https://stripe.com/go/developer-chat"
                      class="common-Link common-Link--arrow"
                    >
                      <strong>
                        contact support{" "}
                        <FontAwesomeIcon
                          style={{ fontSize: "12px" }}
                          icon={faArrowRight}
                        />
                      </strong>
                    </a>
                    .
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
