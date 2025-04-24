import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { GET } from "../../../apicontroller/ApiController";
import {
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  stepConnectorClasses,
} from "@mui/material";
import PendingIcon from "@mui/icons-material/Pending";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InventoryIcon from "@mui/icons-material/Inventory";
import { styled } from "@mui/material/styles";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(25, 118, 210) 0%, rgb(25, 118, 210) 50%, rgb(25, 118, 210) 100%)",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundImage:
        "linear-gradient(95deg, rgb(25, 118, 210) 0%, rgb(25, 118, 210) 50%, rgb(25, 118, 210) 100%)",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    height: 3,
    border: 0,
    backgroundColor:
      theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
    borderRadius: 1,
  },
}));

const Order = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [checkout, setCheckOut] = useState([]);

  useEffect(() => {
    GET(`checkout/${user.UserId}`).then((result) => {
      // Normalize the status values to handle the "Shippping" typo
      const normalizedResults = result.map((item) => ({
        ...item,
        status: item.status.toLowerCase().includes("ship")
          ? "Shipping"
          : item.status,
      }));
      setCheckOut(normalizedResults);
    });
  }, []);

  const getStepNumber = (status) => {
    const normalizedStatus = status.toLowerCase().trim();

    if (normalizedStatus === "pending") return 0;
    if (normalizedStatus === "approved") return 1;
    if (normalizedStatus.includes("ship")) return 2; // This will match both "shipping" and "shippping"
    if (normalizedStatus === "delivered") return 3;

    return 0; // Default case
  };

  const steps = [
    { label: "Pending", icon: <PendingIcon /> },
    { label: "Approved", icon: <InventoryIcon /> },
    { label: "Shipping", icon: <LocalShippingIcon /> },
    { label: "Delivered", icon: <CheckCircleIcon /> },
  ];

  return (
    <Row className="container">
      {checkout &&
        checkout.map((check) => (
          <Col lg={12} className="mt-3" key={check.id}>
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <img
                src={`${process.env.REACT_APP_AWS_URL}${check.image}`}
                alt="Logo"
                style={{ width: "100px", height: "100px", borderRadius: "50%" }}
              />
              <h4 style={{ marginTop: "10px" }}>{check.ProductName}</h4>
              <p>{check.phone}</p>
            </div>

            <Stepper
              activeStep={getStepNumber(check.status)}
              alternativeLabel
              connector={<ColorlibConnector />}
            >
              {steps.map((step) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <div
                        style={{
                          color:
                            getStepNumber(check.status) >= steps.indexOf(step)
                              ? "#1976d2"
                              : "#bdbdbd",
                        }}
                      >
                        {step.icon}
                      </div>
                    )}
                  >
                    {step.label}
                  </StepLabel>
                </Step>
              ))}
            </Stepper>

            <Row className="mt-4">
              <Col md={3}>
                <strong>Order ID:</strong> {check.OrderId}
              </Col>
              <Col md={3}>
                <strong>Category:</strong> {check.MainProduct}
              </Col>
              <Col md={3}>
                <strong>Product:</strong> {check.ProductName}
              </Col>
              <Col md={3}>
                <strong>Status:</strong> {check.status}
              </Col>
            </Row>
          </Col>
        ))}
    </Row>
  );
};

export default Order;
