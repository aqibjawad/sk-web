import React, { useState, useEffect } from "react";


import { GET } from "../../apicontroller/ApiController"

import { Row, Card } from 'react-bootstrap'

import { Link } from "react-router-dom"

import './home.css'
const Upcoming = () => {

    const [upcoming, setUpComing] = useState([])

    useEffect(() => {

        GET(`category/upcoming`).then((result) => {
            setUpComing(result)
        })

    }, [])

    const calculateDiscountedPrice = (price, disocunt) => {
        const discountAmount = (disocunt / 100) * price;
        const discountedPrice = price - discountAmount;
        return discountedPrice.toFixed(2); // Adjust to the desired number of decimal places
    };


    return (
        <div>
            <div className="upcoming-title">
                <p> Upcoming Products </p>
            </div>

            <Row>
                {upcoming.map((upcoming) => (
                    <div className="col-6 col-sm-6 col-md-3 mb-5">
                        <Link to={`/product/${upcoming.SuperCatgory}-${upcoming.spc_id}/${upcoming.title.replaceAll(" ", "- ")}-${upcoming.id}`} style={{ color: 'black', textDecoration: 'none' }}>
                            <Card style={{ width: '18rem', color: 'black', height: '370px' }}>


                                <img className="border CardImage" src={`${process.env.REACT_APP_AWS_URL}${upcoming.image}`} />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Helvetica,Tahoma,Arial,Sans-serif' }}>
                                        {upcoming.title.slice(0, 60)}...
                                    </Card.Title>

                                    <Card.Text>
                                        <div className=" text-black">
                                            {upcoming.discount ? (
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>

                                                    <span style={{ textAlign: 'center', fontSize: '18px', color: 'red', fontFamily: 'Helvetica,Tahoma,Arial,Sans-serif' }}>
                                                        {upcoming.currency} {calculateDiscountedPrice(upcoming.price, upcoming.discount)}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="text-black">
                                            {upcoming.discount && upcoming.discount != 0 ? (
                                                <div className="d-flex">
                                                    <span className="text-muted mt-1" style={{ textDecoration: 'line-through', fontSize: '15px', fontFamily: 'Helvetica,Tahoma,Arial,Sans-serif' }}>
                                                        {upcoming.currency} {upcoming.price}
                                                    </span>
                                                    <span className="ml-1">
                                                        -
                                                    </span>
                                                    <span className="">
                                                        {`${upcoming.discount}%`}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))
                }
            </Row >
        </div >
    );
}
export default Upcoming;