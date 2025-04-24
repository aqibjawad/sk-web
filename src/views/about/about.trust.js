import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaLinkedin } from "react-icons/fa";
import { GET } from "../../apicontroller/ApiController";
import "./about.scss";
import "./about.css";

const AboutUs = () => {
  const [about, setAbout] = useState({});
  const [staffs, setStaff] = useState([]);

  useEffect(() => {
    GET(`about`).then((result) => {
      setAbout(result[0]);
    });

    GET(`staff`).then((result) => {
      setStaff(result);
    });
  }, []);

  return (
    <div id="aboutus">
      {/* Hero Section with Clean, Modern Design */}
      <div className="about-hero py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={10} className="text-center mb-4">
              <h1 className="display-4 fw-bold mb-3">About SoukCenter</h1>
              <div className="divider mx-auto mb-5"></div>
            </Col>
          </Row>

          <div className="about-card shadow rounded overflow-hidden">
            <Row className="g-0">
              <Col lg={5} className="about-image-container">
                {about.image && (
                  <img
                    src={`${process.env.REACT_APP_AWS_URL}${about.image}`}
                    alt="About SoukCenter"
                    className="about-image w-100 h-100"
                  />
                )}
              </Col>
              <Col lg={7}>
                <div className="about-content p-4 p-lg-5">
                  <h2 className="h3 mb-4">Our Story</h2>
                  <p className="about-description lead">
                    {about.description || "Loading..."}
                  </p>

                  <div className="social-links mt-5">
                    <h3 className="h5 mb-3">Connect With Us</h3>
                    <div className="d-flex gap-4">
                      {about.facebook && (
                        <a
                          href={about.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon facebook"
                        >
                          <FaFacebookF />
                        </a>
                      )}
                      {about.instagram && (
                        <a
                          href={about.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon instagram"
                        >
                          <FaInstagram />
                        </a>
                      )}
                      {about.linkedin && (
                        <a
                          href={about.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon linkedin"
                        >
                          <FaLinkedin />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>

      {/* Staff Section (Commented out in your original, but I'll provide an improved version) */}
      {staffs.length > 0 && (
        <div className="staff-section py-5 mt-5">
          <Container>
            <Row className="justify-content-center">
              <Col md={8} className="text-center mb-5">
                <h2 className="display-5 fw-bold">Meet Our Team</h2>
                <div className="divider mx-auto mb-4"></div>
                <p className="lead text-muted">
                  The talented people behind our success
                </p>
              </Col>
            </Row>

            <Row className="g-4">
              {staffs.map((staff, index) => (
                <Col md={4} key={index}>
                  <div className="staff-card h-100 shadow-sm rounded overflow-hidden">
                    <div className="staff-image-container">
                      <img
                        src={`${process.env.REACT_APP_AWS_URL}${staff.image}`}
                        alt={staff.name}
                        className="staff-image w-100"
                      />
                    </div>
                    <div className="staff-info p-4 text-center">
                      <h3 className="h4 mb-1">{staff.name}</h3>
                      <p className="staff-position mb-3">{staff.designation}</p>
                      <div className="staff-divider mx-auto mb-3"></div>
                      <p className="staff-bio">
                        {staff.bio || "Team member at SoukCenter"}
                      </p>
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

export default AboutUs;
