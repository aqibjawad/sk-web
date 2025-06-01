import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import { GET } from "../../apicontroller/ApiController";

const ShopCatProducts = () => {
  const { title } = useParams();
  let array = title.split("-");
  const id = array[array.length - 1];
  
  const [shopcategory, setShopCategory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    GET(`listing/shop/${id}`)
      .then((result) => {
        setShopCategory(result || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching shop data:", error);
        setLoading(false);
      });
  }, [title, id]);

  const calculateDiscountedPrice = (price, discount) => {
    if (!price || isNaN(price)) return "0.00";
    const discountAmount = ((discount || 0) / 100) * price;
    const discountedPrice = price - discountAmount;
    return discountedPrice.toFixed(2);
  };

  if (loading) {
    return (
      <Container className="py-4">
        <div className="text-center">Loading products...</div>
      </Container>
    );
  }

  if (!shopcategory || shopcategory.length === 0) {
    return (
      <Container className="py-4">
        <div className="text-center">
          <div style={{ 
            padding: "30px", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "10px",
            marginTop: "20px",
            marginBottom: "20px"
          }}>
            <p>No products available in this category.</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-2" fluid>
      <Row>
        {shopcategory.map((categ) => {
          // Skip rendering if essential data is missing
          if (!categ || !categ.id || !categ.title) return null;
          
          return (
            <div className="col-lg-3 col-md-4 col-sm-6 mb-4" key={categ.id}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/product/${categ.SuperCatgory || "category"}-${
                  categ.spc_id || "0"
                }/${categ.title}-${categ.catId}`}
              >
                <div
                  className="mb-3"
                  style={{
                    borderRadius: "10px",
                    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
                  }}
                >
                  {categ.discount > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: "red",
                        color: "white",
                        padding: "5px",
                        borderRadius: "5px",
                      }}
                    >
                      {`${categ.discount}% OFF`}
                    </div>
                  )}

                  <img
                    src={categ.image ? `${process.env.REACT_APP_AWS_URL}${categ.image}` : "/placeholder-image.jpg"}
                    style={{
                      borderTopLeftRadius: "10px",
                      borderTopRightRadius: "10px",
                      width: "100%",
                      height: "200px",
                      objectFit: "contain",
                    }}
                    alt={categ.title || "Product"}
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                  <div
                    className="p-3"
                    style={{ backgroundColor: "#272727", color: "white" }}
                  >
                    <div className="d-flex justify-content-between">
                      <div className="text-white">
                        <span>
                          <strong>{categ.title || "Unnamed Product"}</strong>
                        </span>
                      </div>

                      {window.innerWidth > 480 ? (
                        <div className="text-white">
                          {categ.discount > 0 ? (
                            <div>
                              <span
                                style={{
                                  textDecoration: "line-through",
                                  fontSize: "12px",
                                }}
                              >
                                {categ.currency || ""} {categ.price || "0.00"}
                              </span>
                              <br />
                              <div className="text-center">
                                <span style={{ fontSize: "20px", color: "red" }}>
                                  {`${categ.currency || ""} ${calculateDiscountedPrice(
                                    categ.price,
                                    categ.discount
                                  )}`}
                                </span>
                              </div>
                            </div>
                          ) : (
                            <span>{`${categ.currency || ""} ${categ.price || "0.00"}`}</span>
                          )}
                        </div>
                      ) : (
                        <>
                          <div className="text-white">
                            {categ.discount > 0 ? (
                              <div>
                                <span
                                  style={{
                                    textDecoration: "line-through",
                                    fontSize: "12px",
                                  }}
                                >
                                  {categ.currency || ""} {categ.price || "0.00"}
                                </span>
                              </div>
                            ) : (
                              <span>{`${categ.currency || ""} ${categ.price || "0.00"}`}</span>
                            )}
                          </div>

                          {categ.discount > 0 && (
                            <div>
                              <div className="text-center">
                                <span style={{ fontSize: "20px", color: "red" }}>
                                  {`${categ.currency || ""} ${calculateDiscountedPrice(
                                    categ.price,
                                    categ.discount
                                  )}`}
                                </span>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Row>
    </Container>
  );
};

export default ShopCatProducts;