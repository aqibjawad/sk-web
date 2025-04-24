import React, { useState, useEffect, useMemo } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { toast } from "react-toastify";
import { GET } from "../../../apicontroller/ApiController";
import { useTable } from "react-table";

const ShopProductDetails = () => {
  const [listingCategory, setListingCategory] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTitle, setSearchTitle] = useState("");

  const user = JSON.parse(localStorage.getItem("user"));

  const handleClose = () => setShow(false);
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const fetchData = async () => {
    try {
      const listingCategoryData = await GET(`listing/category/${user.UserId}`);
      setListingCategory(listingCategoryData);
      setFilteredData(listingCategoryData);
    } catch (error) {
      toast.error("Error fetching data: " + error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(listingCategory.map((item) => item.SuperCategory))];
  }, [listingCategory]);

  useEffect(() => {
    let filtered = [...listingCategory];
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (item) => item.SuperCategory === selectedCategory
      );
    }
    if (searchTitle) {
      filtered = filtered.filter((item) =>
        item.title.toLowerCase().includes(searchTitle.toLowerCase())
      );
    }
    setFilteredData(filtered);
  }, [selectedCategory, searchTitle, listingCategory]);

  const columns = useMemo(
    () => [
      {
        Header: "Main Product",
        accessor: "SuperCategory",
      },
      {
        Header: "Product",
        accessor: "title",
      },
      {
        Header: "Serial No",
        accessor: "serialno",
      },
      {
        Header: "Price",
        accessor: (row) => `${row.currency} ${row.price}`,
      },
      {
        Header: "Actions",
        accessor: "id",
        Cell: ({ row }) => (
          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
            onClick={() => handleShow(row.original)}
          >
            <AiOutlineEye /> View
          </button>
        ),
      },
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: filteredData,
    });

  return (
    <div className="container-fluid p-4">
      <div className="card shadow-sm">
        <div className="card-header bg-white py-3">
          <h5 className="card-title mb-0 text-primary">Shop Product Details</h5>
        </div>

        <div className="card-body">
          <div className="row g-3 mb-4">
            <div className="col-md-4">
              <label className="form-label fw-semibold">
                Filter by Category
              </label>
              <select
                className="form-select shadow-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-semibold">Search Products</label>
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Enter product name..."
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover" {...getTableProps()}>
              <thead className="table-light">
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th {...column.getHeaderProps()} className="fw-semibold">
                        {column.render("Header")}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => (
                        <td {...cell.getCellProps()} className="align-middle">
                          {cell.render("Cell")}
                        </td>
                      ))}
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={5} className="text-center py-4 text-muted">
                      No products found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Details Modal */}
      <div
        className={`modal fade ${show ? "show" : ""}`}
        style={{ display: show ? "block" : "none" }}
        tabIndex="-1"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-primary">Product Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={handleClose}
              ></button>
            </div>
            <div className="modal-body">
              {selectedProduct && (
                <div>
                  <h6 className="fw-bold mb-4">{selectedProduct.title}</h6>
                  <div className="row g-4">
                    <div className="col-md-6">
                      <div className="card h-100">
                        <div className="card-body">
                          <h6 className="card-subtitle mb-3 text-muted">
                            Basic Details
                          </h6>
                          <ul className="list-unstyled mb-0">
                            <li className="mb-2">
                              <span className="fw-semibold">Category:</span>{" "}
                              {selectedProduct.SuperCategory}
                            </li>
                            <li className="mb-2">
                              <span className="fw-semibold">Price:</span>{" "}
                              {selectedProduct.currency} {selectedProduct.price}
                            </li>
                            <li className="mb-2">
                              <span className="fw-semibold">Serial No:</span>{" "}
                              {selectedProduct.serialno}
                            </li>
                            <li>
                              <span className="fw-semibold">Discount:</span>{" "}
                              {selectedProduct.discount}%
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="card h-100">
                        <div className="card-body">
                          <h6 className="card-subtitle mb-3 text-muted">
                            Specifications
                          </h6>
                          {selectedProduct.specifications ? (
                            <p className="mb-0">
                              {selectedProduct.specifications}
                            </p>
                          ) : (
                            <p className="text-muted mb-0">
                              No specifications available
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h6 className="text-muted mb-3">Product Images</h6>
                    {selectedProduct.images &&
                    selectedProduct.images.length > 0 ? (
                      <div className="row g-3">
                        {selectedProduct.images.map((image, index) => (
                          <div key={index} className="col-md-4 col-6">
                            <img
                              src={`${process.env.REACT_APP_AWS_URL}${image}`}
                              alt={`Product ${index + 1}`}
                              className="img-thumbnail w-100"
                              style={{
                                height: "150px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted">No images available</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleClose}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {show && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default ShopProductDetails;
