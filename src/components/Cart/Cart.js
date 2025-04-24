import React, { useState, useEffect } from "react";

import { GetCart, AddToCart, RemoveCart, PriceCart } from "../../Helper";

import { Container, Row, Col, Image } from "react-bootstrap";

import { Link } from "react-router-dom";

import Item from "./Item.Cart";

const Cart = () => {
  return (
    <Container>
      <Row>
        <Col lg={12} md={12}>
          <Item />
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
