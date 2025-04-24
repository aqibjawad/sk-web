import React, {useState, useEffect} from"react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, Form, Image, CardGroup, Breadcrumb } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faArrowRight, faComments, faDharmachakra, faQuestionCircle, faEye } from "@fortawesome/free-solid-svg-icons";
import "./Jobs.scss";
import { GET } from "../../../src/apicontroller/ApiController.js"

export default function Jobs() {

  const [careers, setCareer]= useState([]);

   useEffect(async()=>{
      const result= await GET('career');
      setCareer(result);
   }, [])
  return (
    <div id="jobs">
      <Container>
        <Form className="pt-5 px-md-3 px-lg-5 ">
          <Row>
            <Form.Group as={Col} lg={3} md={6} xs={12} controlId="formGridPassword" >
              <Form.Control
                className="border-0 fields"
                type="text"
                placeholder="Search"
              />
            </Form.Group>
            <Form.Group
              as={Col}
              lg={3}
              md={6}
              xs={12}
              controlId="formGridPassword"
            >
              <Form.Control className="border-0 fields" as="select">
                <option>1 team selected</option>
                <option>Graphic Designing</option>
                <option>Content Writing </option>
                <option>Marketing</option>
                <option>Sales</option>
                <option>Management</option>
                <option>Data Entry</option>
              </Form.Control>
            </Form.Group>{" "}
            <Form.Group
              as={Col}
              lg={3}
              md={6}
              xs={12}
              controlId="formGridPassword"
            >
              <Form.Control className="border-0 fields" as="select">
                <option>1 location selected</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>{" "}
            <Form.Group
              as={Col}
              lg={3}
              md={6}
              xs={12}
              controlId="formGridPassword"
            >
              <Form.Control className="border-0 fields" as="select">
                <option>1 type selected</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </Form.Control>
            </Form.Group>{" "}
          </Row>
        </Form>
      </Container>

      <div className="py-5">
        {careers.map(career => (
          <div className="jobs ">
            <div style={{ backgroundColor: "#F0FFFF" }}>
              <Container>
                <Row className="py-3 d-flex justify-content-between ">
                  <Col md={5} className="heading text-center">
                    <Link to={`/career/${career.title.replaceAll(' ', '-').toLowerCase()}-${career.id}`}>
                      <h6> {career.title} </h6>
                    </Link>
                  </Col>
                  <Col md={3} className="text-center">
                    <h6 className="text-muted"> {career.type} </h6>
                  </Col>
                  <Col md={3} className="text-center">
                    <h6 className="text-muted">
                      {career.city}
                    </h6>
                  </Col>
                </Row>
              </Container>{" "}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
