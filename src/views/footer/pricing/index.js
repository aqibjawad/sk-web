import { Link } from "react-router-dom";
import { Col, Image } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckSquare } from "@fortawesome/free-solid-svg-icons";
import {  Row } from "react-bootstrap";
const Upgrade = () => {
    return (
        <div>
            <div className=" px-md-0  upgrade my-md-4 my-0" style={{ margin: '0 43px' }}>
                <div className="row px-3 ">
                    <div className="card col-sm-6 px-5 card-upgrade">
                        <div className="text-center">
                            <h3 className="font-weight-bold text-uppercase">Lifetime</h3>

                            <p>
                                <span> 299 </span>
                                <small>USD</small>
                                <del className="px-2">299USD</del>
                            </p>
                            <p>one time fee, never pay again</p>
                        </div>
                        <hr />
                        <div className="upgrade-text">
                            {" "}
                            <p>
                                <FontAwesomeIcon
                                    style={{ fontSize: "14px" }}
                                    icon={faCheckSquare}
                                />
                                &nbsp; Highlighted listing
                            </p>{" "}
                            <p>
                                <FontAwesomeIcon
                                    style={{ fontSize: "14px" }}
                                    icon={faCheckSquare}
                                />
                                &nbsp; Top listing placement on:
                            </p>{" "}
                            <ul>
                                <li>Search results</li>
                                <li>Search results</li>
                                <li>Search results</li>
                            </ul>
                            <p>
                                Above premium <a href="#">Preview</a>
                            </p>
                            <p>100 Products</p>
                            <p>100 Products</p>
                            <p>100 Products</p>
                            <p>100 Products</p>
                            <div className="d-flex pb-5 justify-content-center">
                                <Link to='/user/checkout' className="btn rounded-pill btn-danger btn-upgrade mt-4">
                                    Upgrade
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="card col-sm-6 px-5 card-upgrade">
                        <div className="text-center">
                            <h3 className="font-weight-bold text-uppercase">Lifetime</h3>

                            <p>
                                <span> 299 </span>
                                <small>USD</small>
                                <del className="px-2">299USD</del>
                            </p>
                            <p>one time fee, never pay again</p>
                        </div>
                        <hr />
                        <div className="upgrade-text">
                            {" "}
                            <p>
                                <FontAwesomeIcon
                                    style={{ fontSize: "14px" }}
                                    icon={faCheckSquare}
                                />
                                &nbsp; Highlighted listing
                            </p>{" "}
                            <p>
                                <FontAwesomeIcon
                                    style={{ fontSize: "14px" }}
                                    icon={faCheckSquare}
                                />
                                &nbsp; Top listing placement on:
                            </p>{" "}
                            <ul>
                                <li>Search results</li>
                                <li>Search results</li>
                                <li>Search results</li>
                            </ul>
                            <p>
                                Above premium <a href="#">Preview</a>
                            </p>
                            <p>100 Products</p>
                            <p>100 Products</p>
                            <p>100 Products</p>
                            <p>100 Products</p>
                            <div className="d-flex pb-5 justify-content-center">
                                <Link to='/user/checkout' className="btn rounded-pill btn-danger btn-upgrade mt-4">
                                    Upgrade
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upgrade;
