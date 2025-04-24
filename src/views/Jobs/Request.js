import React, { useState, useRef } from "react"

import { Container, Row, Col, Form, Button } from "react-bootstrap";

import { POST } from "../../apicontroller/ApiController";

import { toast } from "react-toastify";

import "./Jobs.scss";
export default function ApplyNow() {

  const [document, setDcoument] = useState([]);

  const notify = () => toast("Your Job Request Added Successfully");


  const nameRef = useRef();
  const numberRef = useRef();
  const emailRef = useRef([]);
  const typeRef = useRef([]);
  const titleRef = useRef([]);

  // Submit function of Listing Product Form
  const formsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("document", document);
    formData.append("name", nameRef.current.value);
    formData.append("number", numberRef.current.value);
    formData.append("email", emailRef.current.value);
    formData.append("type", typeRef.current.value);
    formData.append("title", titleRef.current.value);

    POST("jobrequest", formData).then((res) => {
      notify();
    });
  };

  return (
    <div id="jobInside">
      <Container>
        <Row className="px-md-4 py-5">
          {/* intro section (left ) */}
          <Col md={4} className='px-md-0'>
            <img src="/career.jpg" style={{ height: '300px', width: '100%' }} />
          </Col>

          <Col md={8} className="py-5 py-md-0">
            <div className="px-md-4 px-2 ">
              <div>
                <div className="pb-4">
                  <p>Help us shape Soukcenter.com </p>
                </div>

                <div>
                  <Form>
                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label> Name </Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Enter Your full name" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label> Number </Form.Label>
                        <Form.Control ref={numberRef} type="text" placeholder="enter you number" />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control ref={emailRef} type="email" placeholder="Enter email" />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label> Type </Form.Label>
                        <Form.Control ref={typeRef} type="text" placeholder="Enter Job type eg full time" />
                      </Form.Group>
                    </Form.Row>

                    <Form.Row>
                      <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Label> Job title </Form.Label>
                        <Form.Control ref={titleRef} type="text" placeholder="Enter Job Title eg marketing.." />
                      </Form.Group>

                      <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label> Upload your cv </Form.Label>
                        <Form.File onChange={(e) => setDcoument(e.target.files[0])} style={{ marginTop: '0.3rem' }} />
                      </Form.Group>
                    </Form.Row>

                    <Button onClick={formsubmit} variant="primary" type="submit">
                      Submit
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
