import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { GET } from "../../apicontroller/ApiController"

import { Row, Card, Container } from 'react-bootstrap'


const FeaturePro = () => {

    const [features, setFeatures] = useState([])

    useEffect(() => {

        GET(`category/feature`).then((result) => {
            setFeatures(result)
        })


    }, [])

    const calculateDiscountedPrice = (price, disocunt) => {
        const discountAmount = (disocunt / 100) * price;
        const discountedPrice = price - discountAmount;
        return discountedPrice.toFixed(2); // Adjust to the desired number of decimal places
    };




    return (
        <div>
            <div className="featured-title">
                <p> Feature Products </p>
            </div>

            <Row>
                {features.map((featurepro) => (
                    <div className="ml-3" key={featurepro.id}>
                        <Link style={{ textDecoration: 'none' }} to={`/product/${featurepro.SuperCatgory}-${featurepro.spc_id}/${featurepro.title.replaceAll(" ", "-")}-${featurepro.id}`}>
                            <Card style={{ width: '18rem', color: 'black', height: '370px' }}>


                                {featurepro.discount > 0 ? (
                                    <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'red', color: 'white', padding: '5px', borderRadius: '5px' }}>
                                        {`${featurepro.discount}% OFF`}
                                    </div>
                                ) : null}


                                <img 
                                style={{ borderTopLeftRadius: "10px", borderTopRightRadius: "10px", width: '100%', height: '200px', objectFit: "contain" }} className="border CardImage" src={`${process.env.REACT_APP_AWS_URL}${featurepro.image}`} />
                                <Card.Body>
                                    <Card.Title style={{ fontSize: '14px', fontWeight: 'bold', fontFamily: 'Helvetica,Tahoma,Arial,Sans-serif' }}>
                                        {featurepro.title.slice(0, 60)}...
                                    </Card.Title>

                                    <Card.Text>
                                        <div className=" text-black">
                                            {featurepro.discount ? (
                                                <div style={{ display: 'flex', flexDirection: 'row' }}>

                                                    <span style={{ textAlign: 'center', fontSize: '18px', color: 'red', fontFamily: 'Helvetica,Tahoma,Arial,Sans-serif' }}>
                                                        {featurepro.currency} {calculateDiscountedPrice(featurepro.price, featurepro.discount)}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        <div className="text-black">
                                            {featurepro.discount && featurepro.discount != 0 ? (
                                                <div className="d-flex">
                                                    <span className="text-muted mt-1" style={{ textDecoration: 'line-through', fontSize: '15px', fontFamily: 'Helvetica,Tahoma,Arial,Sans-serif' }}>
                                                        {featurepro.currency} {featurepro.price}
                                                    </span>
                                                    <span className="ml-1">
                                                        -
                                                    </span>
                                                    <span className="">
                                                        {`${featurepro.discount}%`}
                                                    </span>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </div>

                                        {/* <div> <strong> {featurepro.currency} </strong> {featurepro.price} </div>
                                            <div> <strong> {featurepro.currency} </strong> 
                                                <div className="discounted-price">
                                                    {calculateDiscountedPrice(featurepro.price, featurepro.discount)}
                                                </div>
                                            </div>
                                        */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </div>
                ))}
            </Row>

        </div>
    );
}
export default FeaturePro;