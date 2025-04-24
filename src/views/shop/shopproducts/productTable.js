import React from "react";

const ProductsTable = ({
  filteredListings,
  handleViewDetails,
  handleEdit,
  handleDelete,
  handleAddDetails,
}) => {
  console.log(filteredListings, "filtered");

  // Filter out items with null catId before rendering
  const validListings = filteredListings.filter((item) => item.catId !== null);

  return (
    <div className="table-responsive">
      <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>Product</th>
            <th>Category</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {validListings.length > 0 ? (
            validListings.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>
                  {item.super_category_title || item.SuperCatgory || "N/A"}
                </td>
                <td>{`${item.currency || ""} ${item.price || "N/A"}`}</td>
                <td>{item.discount ? `${item.discount}%` : "0%"}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      className="btn btn-sm btn-primary mr-3"
                      onClick={() => handleViewDetails(item.catId)}
                    >
                      View
                    </button>

                    {!item.specifications && (
                      <button
                        className="btn btn-sm btn-info text-white mr-3"
                        onClick={() => handleAddDetails(item.catId)}
                      >
                        <i className="bi bi-plus-circle"></i> Details
                      </button>
                    )}

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(item.catId)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center py-3">
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductsTable;
