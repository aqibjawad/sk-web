import { Link } from "react-router-dom";
import {
    Container,
    Row,
    Col,
    Image,
    Button,
    Navbar,
    Nav,
    NavDropdown,
} from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import "./contact.scss";

export default function Contact() {
    return (
        <div id="contact">
            <div style={{ backgroundColor: "#748DF8" }}>

                <Container className="text-center pt-lg-5 pt-3 hero">
                    <h1>Contact us</h1>
                    <p>Get in touch and let us know how we can help.</p>
                </Container> 

                {/*======================= contact cards=============== */}
                <Container >
                    <Row className="d-flex justify-content-center px-lg-5 py-5 py-md-4 mx-lg-5">
                        <Col md={4} className="  my-2 px-2  rounded">
                            <div className="contactCalloutBox mx-md-0 mx-4 px-lg-0  my-1  rounded ">
                                <a href="/sales">
                                    <div className="pt-3">
                                        <div className="contactCallout-Icon sales"></div>
                                        <h2 className="text-center">Sales</h2>
                                        <p className="text-center pb-lg-2 px-lg-3 px-md-0">
                                            We’d love to talk about how we can work together.
                                        </p>
                                    </div>
                                    <div className="ContactCalloutFooter rounded">
                                        <div className="text-center py-2">
                                            <b>Contact sales </b>&nbsp;
                                            <FontAwesomeIcon style={{ fontSize: "12px" }} className="me-2" icon={faArrowRight} />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </Col>

                        <Col md={4} className="my-2 px-2 rounded ">
                            <div className="contactCalloutBox mx-md-0 mx-4 px-lg-0  my-1  rounded ">
                                <a href="/help-support/">
                                    <div className="contactCalloutInnerContainer pt-3">
                                        <div className="contactCallout-Icon support"></div>
                                        <h2 className="text-center">Help &amp; Support</h2>
                                        <p className="text-center  pb-lg-2 px-lg-3">
                                            We’re here to help with any questions or code.
                                        </p>
                                    </div>
                                    <div className="ContactCalloutFooter rounded">
                                        <div className="text-center py-2">
                                            <b>Get support</b> &nbsp;
                                            <FontAwesomeIcon
                                                style={{ fontSize: "12px" }}
                                                className="me-2"
                                                icon={faArrowRight}
                                            />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </Col>

                        <Col md={4} className="  my-2 px-2 rounded">
                            <div className="contactCalloutBox mx-md-0 mx-4 px-lg-0  my-1  rounded ">
                                <a href="/newsroom/">
                                    <div className="contactCalloutInnerContainer pt-3">
                                        <div className="contactCallout-Icon media"></div>
                                        <h2 className="text-center">Media &amp; Press</h2>
                                        <p className="text-center pb-lg-2 px-lg-3">
                                            Get Stripe news, company info, and media resources.
                                        </p>
                                    </div>
                                    <div className="ContactCalloutFooter rounded">
                                        <div className="text-center  py-2">
                                            <b>Visit newsroom </b>&nbsp;
                                            <FontAwesomeIcon
                                                style={{ fontSize: "12px" }}
                                                className="me-2"
                                                icon={faArrowRight}
                                            />
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            {/* ==========================info======================= */}
            <Container className="py-lg-5 px-5 ">
                <Row className="d-flex  justify-content-center">
                    <Col md={5} className=" pt-4 info-body  info-border text-center px-lg-4">
                        <h3>Join us on Discord</h3>
                        <p>
                            If you have technical questions, chat live with developers in the
                            official{" "}
                            <a
                                href="https://stripe.com/go/developer-chat"
                                class="common-Link common-Link--arrow"
                            >
                                <strong>Stripe Discord server <FontAwesomeIcon
                                    style={{ fontSize: "12px" }}
                                    className="me-2"
                                    icon={faArrowRight}
                                /></strong>
                            </a>
                            .
                        </p>
                    </Col>
                    <Col md={5} className="pt-4 info-body text-center px-lg-4">
                        <h3>General communication</h3>
                        <p>
                            For general queries, including partnership opportunities, please
                            email{" "}
                            <a href="mailto:info@stripe.com" class="common-Link ">
                                info@stripe.com
                            </a>
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}
