import React, { useEffect, useState, useMemo } from "react";
import { GET } from "../../apicontroller/ApiController";
import { useLocation } from "react-router-dom";
import { Card, Container, Row, Col, Table, Spinner } from "react-bootstrap";
import { Receipt, Package, User, MapPin, CreditCard } from "lucide-react";

const Invoice = () => {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [invoice, setInvoice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [checkoutData, setCheckoutData] = useState(null);

  const location = useLocation();
  let productData = location.state;

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        setUser(null);
      }
    }

    const storedProducts = localStorage.getItem("cart");
    if (storedProducts) {
      try {
        const parsedProducts = JSON.parse(storedProducts);
        setProducts(Array.isArray(parsedProducts) ? parsedProducts : []);
      } catch (error) {
        console.error("Error parsing products from localStorage:", error);
        setProducts([]);
      }
    }

    // Check if there's checkout data in location state
    const checkoutData = location.state?.checkoutData;
    if (checkoutData) {
      // Use the checkout data for display
      setCheckoutData(checkoutData);
    }

    // Check if there are products in location state
    const productsFromState = location.state?.products;
    if (productsFromState) {
      setProducts(productsFromState);
    }

    setIsLoading(false);
  }, [location.state]);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (user?.UserId) {
        try {
          const result = await GET(`checkout/invoice/${user.UserId}`);
          setInvoice(Array.isArray(result) ? result : []);
        } catch (error) {
          console.error("Error fetching invoice data:", error);
          setInvoice([]);
        }
      }
    };

    fetchInvoice();
  }, [user?.UserId]);

  // With this:
  const cartProduct = useMemo(() => {
    // If we have checkout data from the current transaction, only use those products
    if (location.state?.products || location.state?.checkoutData) {
      return products;
    }
    // Otherwise fall back to historical invoice data
    return products.length > 0 ? products : invoice;
  }, [invoice, products, location.state]);

  const totalAmount = useMemo(() => {
    return cartProduct
      .reduce((total, item) => total + parseFloat(item.price || 0), 0)
      .toFixed(2);
  }, [cartProduct]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100">
        <div className="text-center">
          <User className="mb-3" size={48} />
          <h3 className="h4">No User Data</h3>
          <p className="text-muted">Please log in to view your invoice.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-light">
      <Card className="shadow">
        <Card.Header className="bg-white border-bottom">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <Receipt className="me-2" />
              <h4 className="mb-0">Billing Invoice</h4>
            </div>
            <small className="text-muted">
              Invoice Date: {new Date().toLocaleDateString()}
            </small>
          </div>
        </Card.Header>

        <Card.Body>
          <Row className="mb-4">
            <Col md={6} className="mb-4 mb-md-0">
              <div className="d-flex align-items-center mb-2">
                <User className="me-2" size={20} />
                <h5 className="mb-0">Customer Details</h5>
              </div>
              <div className="ms-4">
                <p className="h5 mb-1">{user.firstname}</p>
                <p className="text-muted mb-0">
                  {user.email || "No email provided"}
                </p>
                <p className="text-muted mb-0">
                  {invoice.phone || "No Phone provided"}
                </p>
              </div>
            </Col>

            <Col md={6}>
              <div className="d-flex align-items-center mb-2">
                <MapPin className="me-2" size={20} />
                <h5 className="mb-0">Billing Address</h5>
              </div>
              <div className="ms-4">
                <p className="text-muted mb-0">
                  {user.address || "No address provided"}
                </p>
              </div>
            </Col>
          </Row>

          <div className="mb-4">
            <div className="d-flex align-items-center mb-3">
              <Package className="me-2" size={20} />
              <h5 className="mb-0">Order Items</h5>
            </div>
            <Table hover responsive className="shadow-sm">
              <thead className="bg-light">
                <tr>
                  <th>Product</th>
                  <th className="text-end">Price</th>
                </tr>
              </thead>
              <tbody>
                {cartProduct.map((item, index) => (
                  <tr key={index}>
                    <td>{item.Category}</td>
                    <td className="text-end">
                      {item.currency} {parseFloat(item.price).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          <div className="border-top pt-4">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <CreditCard className="me-2 text-success" size={24} />
                <h5 className="mb-0">Total Amount</h5>
              </div>
              <div className="h3 text-success mb-0">
                {cartProduct[0]?.currency} {totalAmount}
              </div>
            </div>
          </div>

          <div className="text-center text-muted mt-4">
            <small>Thank you for your business!</small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Invoice;
