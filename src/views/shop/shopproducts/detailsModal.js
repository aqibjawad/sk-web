import React from "react";

const DetailModal = ({
  showDetailModal,
  setShowDetailModal,
  selectedItemDetails,
}) => {
  return (
    <div
      className={`modal fade ${showDetailModal ? "show d-block" : ""}`}
      style={{ background: showDetailModal ? "rgba(0,0,0,0.5)" : "none" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Product Details</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowDetailModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            {selectedItemDetails ? (
              <div>
                <div className="row mb-4">
                  <div className="col-md-6">
                    <h6 className="fw-bold">Basic Information</h6>
                    <table className="table table-bordered">
                      <tbody>
                        <tr>
                          <th>ID</th>
                          <td>{selectedItemDetails.id}</td>
                        </tr>
                        <tr>
                          <th>Super Category</th>
                          <td>{selectedItemDetails.SuperCategory || "N/A"}</td>
                        </tr>
                        <tr>
                          <th>Category</th>
                          <td>{selectedItemDetails.Category || "N/A"}</td>
                        </tr>
                        <tr>
                          <th>Price</th>
                          <td>
                            {selectedItemDetails.currency || ""}{" "}
                            {selectedItemDetails.price || "N/A"}
                          </td>
                        </tr>
                        <tr>
                          <th>Discount</th>
                          <td>
                            {selectedItemDetails.discount
                              ? `${selectedItemDetails.discount}%`
                              : "0%"}
                          </td>
                        </tr>
                        {selectedItemDetails.outstock !== null && (
                          <tr>
                            <th>In Stock</th>
                            <td>
                              {selectedItemDetails.outstock === 0
                                ? "Yes"
                                : "No"}
                            </td>
                          </tr>
                        )}
                        {selectedItemDetails.feature !== null && (
                          <tr>
                            <th>Featured</th>
                            <td>
                              {selectedItemDetails.feature === 1 ? "Yes" : "No"}
                            </td>
                          </tr>
                        )}

                        {selectedItemDetails.image !== null && (
                          <tr>
                            <th>Image</th>
                            <td>
                              <img
                                src={`${process.env.REACT_APP_AWS_URL}${selectedItemDetails.image}`}
                                alt="Category"
                                height="30px"
                                width="30px"
                                style={{ margin: "0.5rem" }}
                              />
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                  <div className="col-md-6">
                    <h6 className="fw-bold">Specifications</h6>
                    <div className="border p-3 rounded h-100">
                      {selectedItemDetails.specifications ||
                        "No specifications available"}
                    </div>
                  </div>
                </div>

                {/* Product Images */}
                {selectedItemDetails.images &&
                  selectedItemDetails.images.length > 0 && (
                    <div className="row mb-3">
                      <div className="col-12">
                        <h6 className="fw-bold">Product Images</h6>
                        <div className="d-flex flex-wrap">
                          {selectedItemDetails.images.map((img, index) => (
                            <div key={index} className="me-3 mb-3">
                              <img
                                src={`${process.env.REACT_APP_AWS_URL}${img.images}`}
                                alt={`Product ${index + 1}`}
                                style={{
                                  width: "150px",
                                  height: "150px",
                                  objectFit: "cover",
                                  borderRadius: "4px",
                                  border: "1px solid #dee2e6",
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                {/* Main Product Image */}
                {/* {selectedItemDetails.image && (
                  <div className="row">
                    <div className="col-12">
                      <h6 className="fw-bold">Main Product Image</h6>
                      <div className="border p-2 rounded w-fit-content">
                        <img
                          src={`${process.env.REACT_APP_API_URL || ""}/${
                            selectedItemDetails.image
                          }`}
                          alt="Main Product"
                          style={{
                            maxWidth: "100%",
                            height: "auto",
                            maxHeight: "300px",
                            borderRadius: "4px",
                          }}
                        />
                      </div>
                    </div>
                  </div> 
                )} */}
              </div>
            ) : (
              <div className="text-center py-4">Loading details...</div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setShowDetailModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
