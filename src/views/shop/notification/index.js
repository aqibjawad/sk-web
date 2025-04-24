import React, { useState, useEffect } from "react";

import { GET } from '../../../apicontroller/ApiController'

import { Row, Col, Table, Breadcrumb } from "react-bootstrap";

const MyNotification = () => {

    const header = { "x-access-token": localStorage.getItem("token") };

    const user = JSON.parse(localStorage.getItem("user"))

    const [notifications, setNotifications] = useState([]);

    useEffect(() => {

        GET(`notification/${user.UserId}`).then((result) => {
            setNotifications(result)
        })
    }, [])

    return (
        <Row className="container">
            <Col sm={12} className="mt-3 mb-3">
                <div className="card">
                    <div className="card-body">
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th> Title </th>
                                    <th> Notification </th>
                                 </tr>
                            </thead>
                            <tbody>
                                {notifications && notifications.map((sellernoti) => (
                                    <tr>
                                        <td> {sellernoti.id} </td>
                                        <td> {sellernoti.title} </td>
                                        <td> {sellernoti.description} </td>
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

export default MyNotification