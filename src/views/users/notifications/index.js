import React, { useState, useEffect } from "react";

import { Col, Table } from 'react-bootstrap'

import { GET, DELETE } from "../../../apicontroller/ApiController"

import { AiFillDelete } from 'react-icons/ai';

const Notifications = () => {

    const [notifications, setNoti] = useState([])

    const user = JSON.parse(localStorage.getItem("user"))

    useEffect(() => {

        GET(`notification/${user.UserId}`).then((result) => {
            setNoti(result)
        })

    }, []) 


    return (
        <Col  className="mt-3">
            <Table className="w-100" striped bordered hover responsive>
                <thead>
                    <tr>
                        <th> Title </th>
                        <th> Notification </th>
                        <th> Date </th>
                    </tr>
                </thead>
                <tbody>
                    {notifications && notifications.map((notiuser) => (
                        <tr>
                            <td> {notiuser.title} </td>
                            <td> {notiuser.description} </td>
                            <td> {notiuser.created_at} </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
        </Col>
    )
}

export default Notifications