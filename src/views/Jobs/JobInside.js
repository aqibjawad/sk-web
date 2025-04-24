import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom";

import { Container, Row, Col, Card, Form, Image, CardGroup, Breadcrumb } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faGlobeAsia, faClock, faIdBadge } from "@fortawesome/free-solid-svg-icons";

import { GET } from "../../apicontroller/ApiController"

import "./Jobs.scss";
export default function JobInside() {

  const { id } = useParams()
  const [jobs, setJob]=useState([])

  useEffect(() => {

    let array = id.split('-')
    const list = array[ array.length - 1 ]
  
    GET(`career/${list}`).then((result) => {
      setJob(result)
    })

}, [id])

  return (
    <div id="jobInside">
      <Container>
        <Row className="px-md-4 py-5">
          {/* intro section (left ) */}
          <Col md={4} className='px-md-0'>
            <div>
              {jobs.map(jobs => (
                <div className="px-lg-4 px-2 px-md-0 py-3">
                  <p className=" py-3 border-bottom">
                    <FontAwesomeIcon className="align-self-center " style={{ fontSize: "16px" }} icon={faClock} />
                    <span className="pl-2"> {jobs.category} </span>
                  </p>
                  <p className=" py-2 border-bottom">
                    <FontAwesomeIcon className="align-self-center " style={{ fontSize: "16px" }} icon={faIdBadge} />
                    <span className="pl-2"> {jobs.type} </span>
                  </p>
                </div>
              ))}

              <div className="py-2">
                <Link to="/applynow" className="btn-primary rounded apply-btn px-4 py-2" >
                  Apply Now
                </Link>
              </div>
            </div>
          </Col>

          {/* description section (right) */}
          {jobs.map(job => (
            <Col md={8} className="py-5 py-md-0">
              <div className="px-md-4 px-2 ">
                <div>
                  <div className="pb-4">
                    <h2> {job.title} </h2>
                    <p>Help us shape Soukcenter.com </p>
                  </div>
                  <p className="py-2">
                    {job.description}
                  </p>
                  <h3>About the Web Presence & Platform teams</h3>
                  <p className="py-2">
                    There are two teams under the banner of Web Presence &
                    Platform (WPP) at Stripe Experiences and Content Platform. All
                    told, it's a tightly coupled group of interactive designers,
                    front-end specialists, web strategists, platform engineers,
                    and every skill set in between The Experiences team focuses on
                    the craft of pages on stripe.com-UX design, frontend code,
                    information architecture. The Content Platform team supports
                    them and other partners around Stripe by ensuring there's a
                    fast, efficient platform on which to build and run these
                    pages.
                  </p>
                  <p className="py-2">
                    Together we design and build stripe.com and other sites that
                    amount to what is, for many, their first impression of Stripe.
                    We want to make every pixel count, we want it to be
                    enthralling, and we want to help other Stripes seamlessly
                    benefit from our systematic work
                  </p>
                  <h3>Please include these in your application:</h3>
                  <p className="py-2">
                    <ul>
                      <li>A portfolio, preferably online</li>{" "}
                      <li>Your resume and/or Linkedin profile</li>{" "}
                      <li>
                        A1-2 paragraph summary of your favorite project from any
                        of your work or personal experiences
                      </li>
                      <li>
                        A short paragraph on why you have faith you'll flourish at
                        Stripe
                      </li>
                    </ul>
                  </p>
                </div>
              </div> 
              <div className="py-lg-5 p-3 d-lg-flex justify-content-around rounded" style={{ backgroundColor: "#ffcccb " }} >
                <h5>We look forward to hearing from you</h5>
                <div className="pt-2 pt-lg-0 d-flex justify-content-end">
                  <Link to="/applynow" className="btn-primary apply-btn rounded px-4 py-2" >
                    APPLY NOW
                  </Link>
                </div>
              </div>
            </Col>
         ))}
        </Row>
      </Container>
    </div>
  );
}
