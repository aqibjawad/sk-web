import React, { useState, useRef } from 'react'

import { InputGroup, FormControl, Form, Card, Container, Row, Col } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GET, POST } from "../../../apicontroller/ApiController";

const AddAnnouncements = () => {

    const header = { "x-access-token": localStorage.getItem("token") };

    const nameRef = useRef();
    const descriptionRef = useRef();

    const submit = async (event) => {
        event.preventDefault();
        const formData = {
            name: nameRef.current.value,
            description: descriptionRef.current.value,
        };
        POST("announcements", formData, header).then((res) => {
            toast("Announcements Added Successfully")
        });
    };

    return (
        <Form className="mb-4">
            <Container>
                <h3 className="mb-3 mt-3 text-white">Basic</h3>
                <Row className="rounded-0 border-0">
                    <Col md={12}>
                        <Form.Label className='text-white' htmlFor="basic-url"> Name </Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl id="basic-url" aria-describedby="basic-addon3"
                                placeholder="e.g. Hungs Continental Foods" ref={nameRef} />
                        </InputGroup>
                    </Col>

                    <Col md={12}>
                        <Form.Label className='text-white' htmlFor="basic-url"> Description </Form.Label>
                        <InputGroup className="mb-3">
                            <FormControl as="textarea" rows={4} placeholder="e.g. 12000" ref={descriptionRef} />
                        </InputGroup>
                    </Col>
                </Row>
                <hr />
            </Container>

            <Container>
                <button onClick={submit} className="btn-custom ml-3" >
                    Submit
                </button>
            </Container>
            <ToastContainer />
        </Form>
    )
}
export default AddAnnouncements