import React, { useState } from "react";
import { Container, Row, Col, Image } from 'react-bootstrap';

const Increment = ({ quantity, setQuantity }) => {

    return (
        <div>
            <Col xs={4}>

                <div className="d-flex">
                    <button className="control__btn_-ve" disabled={!quantity} onClick={() => setQuantity(--quantity)}>
                        -
                    </button>

                    <div className="counter">
                        {quantity}
                    </div>
                    <button className="control__btn" onClick={() => setQuantity(++quantity)}>
                        +
                    </button>
                </div>
            </Col>
        </div>
    )
}

export default Increment