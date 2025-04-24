import React, { useState, useEffect } from "react";

import { Container, Row, Col } from 'react-bootstrap'

import { GET, DELETE } from "../../../apicontroller/ApiController"

import { AiFillDelete } from 'react-icons/ai';

import { toast } from "react-toastify";

import { Link } from "react-router-dom";

const Save = () => {

    const [categories, setCategory] = useState([])

    const user = JSON.parse(localStorage.getItem("user"))

    const fetchData = async () => {

        GET(`listing/save/${user.UserId}`).then((result) => {
            setCategory(result)
        })
    };

    useEffect(() => {
        fetchData()
    }, [])


    const remove = async (event, id) => {
        await DELETE("listing/reaction/delete", id, "").then((result) => {
            fetchData();
            toast("Deleted Successfully");
        })
    };



    return (
        <div>
            <Container className=" py-2" fluid>
                <Row>
                    <Col sm={12} md={12} lg={12} className="my-2">
                        <Row>
                            {categories.map((categ) => (
                                <Col sm={4}>

                                    <div className="mb-3" style={{ borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
                                        <img src={`${process.env.REACT_APP_AWS_URL}${categ.image}`} style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", width: '100%', height: '200px', objectFit: "contain" }} fluid />
                                        <div className="p-3">
                                            <Link className="text-decoration-none" to={`/product/${categ.SuperCatgory}-${categ.spc_id}/${categ.title.replaceAll(" ", "-")}-${categ.ctg_id}`}>
                                                <span className="text-dark">
                                                    <strong> {categ.title} </strong>
                                                </span>
                                            </Link>

                                            <div className="d-flex">
                                                <span className="text-muted"> <strong>{categ.currency} {categ.price} </strong> </span>
                                                <div className="ml-5">
                                                    <AiFillDelete style={{ color: 'red' }} onClick={(e) => remove(e, categ.id)} />
                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Save