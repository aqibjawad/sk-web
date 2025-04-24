import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Table,
  Form,
  Breadcrumb,
  Button,
  Modal,
} from "react-bootstrap";
import { GET, PUT } from "../../../apicontroller/ApiController";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

const Order = () => {
  const [checkout, setCheckOut] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loadingStates, setLoadingStates] = useState({});
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  const updateStatus = async (id, endpoint, successMessage) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
    try {
      await PUT(endpoint, id);
      toast.success(successMessage);
      await fetchData();
    } catch (error) {
      toast.error(`Failed to update order status: ${error.message}`);
    } finally {
      setLoadingStates((prev) => ({ ...prev, [id]: false }));
    }
  };

  const statusApprove = (id) =>
    updateStatus(id, "checkout/status/approve", "Order Approved!");
  const statusShipped = (id) =>
    updateStatus(id, "checkout/status/shipping", "Order Shipped!");
  const statusDeliver = (id) =>
    updateStatus(id, "checkout/status/deliever", "Order Delivered!");

  const fetchData = async () => {
    try {
      const result = await GET(`listing/order/${user.UserId}`);
      setCheckOut(result);
    } catch (error) {
      toast.error("Failed to fetch orders");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredCheckout = checkout.filter(
    (item) =>
      item.OrderId?.toString().includes(searchTerm) ||
      item.BuyerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.BuyerEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.MainCategory?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.CategoryName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getButtonStates = (status) => {
    const statuses = ["pending", "approved", "shipped", "delivered"];
    const currentIndex = statuses.indexOf(status.toLowerCase());

    return {
      approveDisabled: currentIndex >= 1,
      shippedDisabled: currentIndex < 1 || currentIndex >= 2,
      deliveredDisabled: currentIndex < 2 || currentIndex >= 3,
    };
  };

  const handleShowModal = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const OrderDetailModal = () => {
    if (!selectedOrder) return null;

    return (
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Order Details - {selectedOrder.OrderId}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <h5>Customer Information</h5>
              <p>
                <strong>Name:</strong> {selectedOrder.BuyerName}
              </p>
              <p>
                <strong>Email:</strong> {selectedOrder.BuyerEmail}
              </p>
              <p>
                <strong>Phone:</strong> {selectedOrder.BuyerPhone}
              </p>
            </Col>
            <Col md={6}>
              <h5>Shipping Address</h5>
              <p>
                <strong>Country:</strong> {selectedOrder.country}
              </p>
              <p>
                <strong>City:</strong> {selectedOrder.city}
              </p>
              <p>
                <strong>Street:</strong> {selectedOrder.street}
              </p>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={6}>
              <h5>Product Details</h5>
              <p>
                <strong>Category:</strong> {selectedOrder.MainCategory}
              </p>
              <p>
                <strong>Product:</strong> {selectedOrder.CategoryName}
              </p>
              <img
                src={`${process.env.REACT_APP_AWS_URL}${selectedOrder.image}`}
                alt="Product"
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            </Col>
            <Col md={6}>
              <h5>Order Status</h5>
              <p>
                <strong>Current Status:</strong> {selectedOrder.status}
              </p>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <Row>
      <Col sm={12} className="mt-3">
        <div className="card">
          <div className="card-body">
            <div className="mb-3">
              <Form.Control
                type="text"
                placeholder="Search by name, email, or product..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Sr No</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCheckout.map((item, index) => {
                  const buttonStates = getButtonStates(item.status);
                  return (
                    <tr key={index}>
                      <td
                        onClick={() => handleShowModal(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {index + 1}
                      </td>
                      <td
                        onClick={() => handleShowModal(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.BuyerName}
                      </td>
                      <td
                        onClick={() => handleShowModal(item)}
                        style={{ cursor: "pointer" }}
                      >
                        {item.BuyerEmail}
                      </td>
                      <td>{item.status}</td>
                      <td>
                        <div className="d-flex flex-column">
                          <Button
                            variant="primary"
                            size="sm"
                            className="mb-1"
                            onClick={() => statusApprove(item.OrderId)}
                            disabled={buttonStates.approveDisabled}
                          >
                            {loadingStates[item.OrderId] ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              "Approve"
                            )}
                          </Button>
                          <Button
                            variant="info"
                            size="sm"
                            className="mb-1"
                            onClick={() => statusShipped(item.OrderId)}
                            disabled={buttonStates.shippedDisabled}
                          >
                            {loadingStates[item.OrderId] ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              "Ship"
                            )}
                          </Button>
                          <Button
                            variant="success"
                            size="sm"
                            onClick={() => statusDeliver(item.OrderId)}
                            disabled={buttonStates.deliveredDisabled}
                          >
                            {loadingStates[item.OrderId] ? (
                              <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                              />
                            ) : (
                              "Deliver"
                            )}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </div>
      </Col>
      <OrderDetailModal />
    </Row>
  );
};

export default Order;
