import React, { useState, useRef } from 'react'

import { InputGroup, FormControl, Form, Card, Container, Row, Col } from "react-bootstrap";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { GET, POST } from "../../../apicontroller/ApiController";

const Bank = () => {

    const header = { "x-access-token": localStorage.getItem("token") };

    const [document, setDcoument] = useState([]);

    const [loading, setLoading] = useState(false);

    const acc_holdRef = useRef();
    const banknameRef = useRef();
    const codeRef = useRef();
    const acc_noRef = useRef();
    const cnicRef = useRef();

    const submit = async (event) => {
        event.preventDefault(); 
        setLoading(true);

        const formData = new FormData();
        formData.append("acc_hold", acc_holdRef.current.value);
        formData.append("bankname", banknameRef.current.value);
        formData.append("code", codeRef.current.value); 
        formData.append("acc_no", acc_noRef.current.value);
        formData.append("cnic", cnicRef.current.value); 

        formData.append("document", document);

 
        POST("listingbank", formData, header).then((res) => {
            
            toast("Your Bank Details Added Successfully");
        }); 
    };


    return (
        <Form className="mb-4">
            <Container>
                <Card className="rounded-0 border-0">
                    <Card.Body className="pb-3 pt-0 mt-4">
                        <Row className="bg-white rounded-0 border-0">
                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Bank Name </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        placeholder="e.g. Hungs Continental Foods" ref={banknameRef} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Account Holder Name </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        placeholder="e.g. Hungs Continental Foods" ref={acc_holdRef} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Branch Code </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        placeholder="e.g. 12000" ref={codeRef} />
                                </InputGroup>
                            </Col>

                            <Col md={6}> 
                                <Form.Label htmlFor="basic-url"> Account Number </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        placeholder="e.g. 12000" ref={acc_noRef} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url"> Your CNIC Number </Form.Label>
                                <InputGroup className="mb-3">
                                    <FormControl id="basic-url" aria-describedby="basic-addon3"
                                        placeholder="e.g. 12000" ref={cnicRef} />
                                </InputGroup>
                            </Col>

                            <Col md={6}>
                                <Form.Label htmlFor="basic-url">(Bank and CNIC ) <strong> Just PDF </strong> </Form.Label>
                                <InputGroup className="mb-3">
                                    <input type="file" onChange={(e) => setDcoument(e.target.files[0])} />
                                </InputGroup>

                            </Col>
                        </Row>
                        <hr />
                    </Card.Body>
                </Card>
            </Container>

            <Container>
                <button onClick={submit} className="btn-custom ml-3" >
                    Add Your Details
                </button>
            </Container>
            <ToastContainer />
        </Form>
    )
}
export default Bank