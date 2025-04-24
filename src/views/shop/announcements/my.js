import React, { useState, useEffect } from "react";

import { GET, GETID, DELETE } from '../../../apicontroller/ApiController'

import { Row, Col, Table, Container, Modal, Button } from "react-bootstrap";

import { AiFillDelete } from 'react-icons/ai';

import { toast } from "react-toastify";

const MyAnnouncements = () => {

    const header = { "x-access-token": localStorage.getItem("token") };

    const user = JSON.parse(localStorage.getItem("user"))

    const [announcements, setAnnouncements] = useState([]);

    const [announcementsId, setAnnouncementsId] = useState([]);

    const fetchData = async () => {
        GET(`announcements/${user.UserId}`).then((result) => {
            setAnnouncements(result)
        })
    };

    useEffect(() => {
        fetchData()
    }, [])

    const [delShow, setDelShow] = useState(false);
    const handleCloseDel = () => setDelShow(false);
    const handleShowDel = () => setDelShow(true);

    const delView = async (event, id) => {
        GETID("announcements", id, '').then((result) => {
            setAnnouncementsId(result[0]);
        });
        handleShowDel();
    };

    const remove = async (event, id) => {
        await DELETE("announcements/delete", id, "").then((result) => {
            toast("announcements deleted! ")
            fetchData();
            handleCloseDel();
        })
    };

    return (
        <div>
            <Container>
                <Row>

                    <Col sm={12} className="mt-3">
                        <div className="card">
                            <div className="card-body">
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th> Name </th>
                                            <th> Description </th>
                                            <th> Actions </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {announcements && announcements.map((announcement) => (
                                            <tr>
                                                <td> {announcement.id} </td>
                                                <td> {announcement.name} </td>
                                                <td> {announcement.description} </td>
                                                <td> <AiFillDelete onClick={(e) => delView(e, announcement.id)} /> </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            <Modal show={delShow} onHide={handleCloseDel}>
                <Modal.Header closeButton>
                    <Modal.Title> Delete Details </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <span>
                            Are you Sure you want to delete !
                        </span>

                        <div className="my-2 pl-3 mb-5">
                            <Button className="btn-custom border-0 mx-3" variant="danger" onClick={(e) => remove(e, announcementsId.id)} >
                                Delete
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default MyAnnouncements