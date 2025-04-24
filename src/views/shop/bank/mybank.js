import React, { useState, useEffect } from "react";

import { GET } from '../../../apicontroller/ApiController'

import { Row, Col, Table, Breadcrumb } from "react-bootstrap";

const ShopBank = () => {

    const header = { "x-access-token": localStorage.getItem("token") };

    const user = JSON.parse(localStorage.getItem("user"))

    const [bank, setBank] = useState([]);

    useEffect(() => {

        GET(`listingbank/${user.UserId}`).then((result) => {
            setBank(result)
        })
    }, [])

    return (
        <Row>

            <Col sm={12} className="mt-3">
                <div className="card">
                    <div className="card-body">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th> Bank Name </th>
                                    <th> Account No </th>
                                    <th> Bank Name </th>
                                    <th> Code </th>
                                 </tr>
                            </thead>
                            <tbody>
                                {bank && bank.map((listingbank) => (
                                    <tr>
                                        <td> {listingbank.id} </td>
                                        <td> {listingbank.acc_hold} </td>
                                        <td> {listingbank.acc_no} </td>
                                        <td> {listingbank.bankname} </td>
                                        <td> {listingbank.code} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </Col>
        </Row>
    )
}

export default ShopBank