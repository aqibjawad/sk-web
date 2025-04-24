import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { AiOutlineArrowRight } from "react-icons/ai";
import { FaCcApplePay, FaAngleRight } from "react-icons/fa";
import { BiConversation } from "react-icons/bi";
import { IoPeople } from "react-icons/io5";
import { Link } from "react-router-dom";
import "./terms.scss";

const TermsCondition = () => {

  const [active, setActive] = useState(1);
  
  return (

    <div id="Termscondition">
      {/* hero content */}

      <div style={{ backgroundColor: "rgb(255, 251, 251)" }}>
        <Container className="py-md-5 py-4 px-4 hero">
          <div>
            <h1>Legal & privacy information for our valued customers' ease</h1>

            <div className="bring-ideas">
              <p>
                Bring your ideas to life with professional digital assets,
                resource and services
              </p>
            </div>

            <div className="bring-ideas">
              <span>
                <a href="#">
                  Find the right productfor you <AiOutlineArrowRight />
                </a>{" "}
              </span>
            </div>
          </div>
        </Container>
      </div>
      {/* information */}
      <Container className="py-md-5 px-4 information">
        <Row>
          <Col md={8}>
            
            <h3>Intoduction</h3>
            <p>
              In our mission to make commerce better for everyone at Shopify, we
              collect and use information about you, our
            </p>
            <ul>
              <li> merchants using Shoaily to power your business</li>
              <li> customers who shop at Shopify powered business</li>
              <li>
                {" "}
                partners who develop apps for merchants to use, build stores on
                behalf of merchants, refer potential your information
                entrepreneurs to Shopify, or otherwise help merchants operate or
                improve their Shopify-powered
              </li>
              <li>
                users of Stopify.apps and services like Shop or Shop Par logies
              </li>{" "}
              <li>
                visitors to Shopify's websites, or anyone contacting Shopify
                support each us{" "}
              </li>{" "}
            </ul>
            <p>
              This Privacy Policy will help you better understand how we
              collect, use, and share your personal information. If we change
              our privacy practices, we may update this privacy policy. If any
              changes are significant, we will let you know (for example,
              through the Shopify admin or by email).
            </p>
          </Col>
        </Row>
      </Container>
      {/* link component */}
      <div className="box">
        <Container className="support-link px-4 py-md-5 py-3  ">
          <Row className=" justify-content-around">
            
            <Col md={3}>
              <div className="content">
                <BiConversation className="icon" />
                <h4>Apple communities</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
                <Link>
                  Ask or search now <FaAngleRight />
                </Link>
              </div>
            </Col>

            <Col md={3}>
              <div className="content">
                <IoPeople className="icon" />
                <h4>Get support</h4>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum is simply dummy text of the
                  printing and typesetting industry.
                </p>
                <Link>
                  Start now <FaAngleRight />
                </Link>
              </div>
            </Col>

          </Row>
        </Container>
      </div>
    </div>
  );
};

export default TermsCondition;
