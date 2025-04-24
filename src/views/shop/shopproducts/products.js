import React, { useState, useEffect, useRef } from "react";
import {
  GET,
  DELETE,
  GETID,
  PUT,
  POST,
} from "../../../apicontroller/ApiController";
import { toast } from "react-toastify";

// Import components
import ProductsTable from "./productTable";
import FilterBar from "./filterButton";
import EditProductModal from "./editProduct";
import DetailModal from "./detailsModal";
import LoadingSpinner from "./loaderSpinner";

const ShopProducts = () => {
  const [image, setImage] = useState(null);
  const token = localStorage.getItem("token");
  const header = { "x-access-token": token };
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [subcategories, setSubCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddDetailsModal, setShowAddDetailsModal] = useState(false);
  const [superCategories, setSuperCategories] = useState([]);
  const [listingCategories, setListingCategories] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);  

  const [selectedItemDetails, setSelectedItemDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [supercategoryId, setSuperCategoryId] = useState("");
  const [listingId, setListingId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  // Track which products have details - now managed differently
  const [productsWithDetails, setProductsWithDetails] = useState([]);

  // Form refs
  const titleRef = useRef(null);
  const priceRef = useRef(null);
  const currencyRef = useRef(null);
  const discountRef = useRef(null);
  const serialNoRef = useRef(null);
  // Add Details form refs
  const specificationsRef = useRef();

  const fetchData = async () => {
    setIsLoading(true);
    try {
      // First, fetch the initial data
      const [listingsData, categoriesData, listingCategoriesData] =
        await Promise.all([
          GET(`listing/${user.UserId}`),
          GET("supercategory"),
          GET(`listing/category/${user.UserId}`),
        ]);

      // Set state for the initial data
      const listingsArray = Array.isArray(listingsData) ? listingsData : [];

      // We'll now determine which products have details by checking each one individually
      const enhancedListings = await Promise.all(
        listingsArray.map(async (item) => {
          let hasDetails = false;
          if (item.catId) {
            try {
              const details = await GETID("listing/sub", item.catId);
              hasDetails = details && details.length > 0;
            } catch (e) {
              // Silently handle errors
            }
          }
          return {
            ...item,
            hasDetails,
          };
        })
      );

      setListings(enhancedListings);
      setFilteredListings(enhancedListings);
      setSuperCategories(Array.isArray(categoriesData) ? categoriesData : []);
      setListingCategories(
        Array.isArray(listingCategoriesData) ? listingCategoriesData : []
      );

      // If there are listings with catId, fetch subcategory data
      if (listingsArray.length > 0 && listingsArray[0].catId) {
        const catId = listingsArray[0].catId;
        const subCategoryData = await GET(`listing/sub/${catId}`);
        setSubCategories(Array.isArray(subCategoryData) ? subCategoryData : []);
      }
    } catch (error) {
      toast.error("Failed to load data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Effect to update form fields when selectedItem changes
  useEffect(() => {
    if (selectedItem && showModal) {
      // Add null checks before accessing .current.value
      if (titleRef.current) titleRef.current.value = selectedItem.SuperCategory || "";
      if (priceRef.current) priceRef.current.value = selectedItem.price || "";
      if (currencyRef.current) currencyRef.current.value = selectedItem.currency || "";
      if (discountRef.current) discountRef.current.value = selectedItem.discount || "";
      if (serialNoRef.current) serialNoRef.current.value = selectedItem.Category || "";
    }
  }, [selectedItem, showModal]);

  const handleCategoryFilter = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
    const filtered =
      categoryTitle === "all"
        ? listings
        : listings.filter(
            (item) =>
              item.super_category_title === categoryTitle ||
              item.SuperCatgory === categoryTitle
          );
    setFilteredListings(filtered);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    const searchFiltered = listings.filter((item) =>
      Object.values(item).join(" ").toLowerCase().includes(value.toLowerCase())
    );

    const categoryFiltered =
      selectedCategory === "all"
        ? searchFiltered
        : searchFiltered.filter(
            (item) =>
              item.super_category_title === selectedCategory ||
              item.SuperCatgory === selectedCategory
          );

    setFilteredListings(categoryFiltered);
  };

  const handleEdit = async (catId) => {
    try {
      const result = await GETID("listing/sub", catId);
      setSelectedItem(result);
      setShowModal(true);
    } catch (error) {
      toast.error("Error fetching item details: " + error.message);
    }
  };

  const handleViewDetails = async (catId) => {
    if (!catId) {
      toast.error("Category ID is missing");
      return;
    }

    try {
      setIsLoading(true);
      // Using subcategory/details endpoint to get details based on catId
      const details = await GETID("listing/sub", catId);

      if (details) {
        setSelectedItemDetails(details);
        setShowDetailModal(true);
      } else {
        toast.error("No details found for this product");
      }
    } catch (error) {
      toast.error("Error fetching product details: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDetails = async (catId) => {
    if (!catId) {
      toast.error("Category ID is missing");
      return;
    }

    try {
      setIsLoading(true);
      // Call the same API as handleEdit
      const result = await GETID("listing/edit", catId);

      if (result && result.data && result.data.length > 0) {
        const categoryData = result.data[0];

        // Store the category ID directly from the response
        // localStorage.setItem("listingid", catId);

        // Set the category ID from the response
        setCategoryId(categoryData.id || "");

        // Set the supercategory ID from the response
        setSuperCategoryId(categoryData.spc_id || "");

        setListingId(categoryData.listingid || "");

        // Set the selected item with API response data
        setSelectedItem(categoryData);

        // Reset image states
        setSelectedImages([]);
        setImagePreview([]);

        // Show the modal
        setShowAddDetailsModal(true);
      } else {
        toast.error("No details found for this product");
      }
    } catch (error) {
      toast.error("Error fetching product details: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveChanges = async (formData) => {
    if (!selectedItem || !selectedItem.ctg_id) {
      toast.error("Category ID is missing");
      return;
    }
  
    try {
      // Add catId to formData if needed by the backend
      formData.append("ctg_id", selectedItem.ctg_id);
      
      // Call PUT with correct parameter order: route, id, formData, header
      await PUT("listing/update", selectedItem.ctg_id, formData, header);
      toast.success("Product updated successfully");
      setShowModal(false);
      fetchData(); // Refresh the data
    } catch (error) {
      toast.error("Error updating product: " + error.message);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);

    // Create image previews
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleSaveDetails = async () => {
    if (!selectedItem) return;
    try {
      const formData = new FormData();
      // Directly use the category ID and supercategory ID from the state
      formData.append("supercategory", supercategoryId);
      formData.append("category", categoryId);
      formData.append("specifications", specificationsRef.current.value);
      formData.append("listingid", listingId);

      selectedImages.forEach((image) => {
        formData.append("subcategory[]", image);
      });

      await POST("subcategory", formData, header);
      toast.success("Product details added successfully");
      setShowAddDetailsModal(false);

      // Update the listings to mark this product as having details
      const updatedListings = listings.map((item) => {
        if (item.catId === listingId) {
          return { ...item, hasDetails: true };
        }
        return item;
      });

      setListings(updatedListings);
      setFilteredListings(
        selectedCategory === "all"
          ? updatedListings
          : updatedListings.filter(
              (item) =>
                item.super_category_title === selectedCategory ||
                item.SuperCatgory === selectedCategory
            )
      );
    } catch (error) {
      toast.error("Error adding product details: " + error.message);
    }
  };

  const handleDelete = async (catId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    try {
      await DELETE("listing/delete", catId, "");
      toast.success("Item deleted successfully");
      fetchData();
    } catch (error) {
      toast.error("Error deleting item: " + error.message);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-fluid py-4 px-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h4 className="card-title mb-4">Shop Products</h4>

          <FilterBar
            selectedCategory={selectedCategory}
            superCategories={superCategories}
            handleCategoryFilter={handleCategoryFilter}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
          />

          <ProductsTable
            filteredListings={filteredListings}
            handleViewDetails={handleViewDetails}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleAddDetails={handleAddDetails}
          />
        </div>
      </div>

      <EditProductModal
        showModal={showModal}
        setShowModal={setShowModal}
        selectedItem={selectedItem}
        titleRef={titleRef}
        priceRef={priceRef}
        currencyRef={currencyRef}
        discountRef={discountRef}
        serialNoRef={serialNoRef}
        handleSaveChanges={handleSaveChanges}
      />

      <DetailModal
        showDetailModal={showDetailModal}
        setShowDetailModal={setShowDetailModal}
        selectedItemDetails={selectedItemDetails}
      />

      {/* Add Details Modal - Modified to hide category selection */}
      <div
        className={`modal fade ${showAddDetailsModal ? "show d-block" : ""}`}
        style={{ background: showAddDetailsModal ? "rgba(0,0,0,0.5)" : "none" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Product Details</h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowAddDetailsModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                {/* Hidden fields for category and supercategory IDs */}
                <input type="hidden" value={supercategoryId} />
                <input type="hidden" value={categoryId} />

                {/* Display the selected category information */}
                {selectedItem && (
                  <div className="row mb-3">
                    <div className="col-12">
                      <div className="alert alert-info">
                        <strong>Selected Category:</strong>{" "}
                        {selectedItem.SuperCatgory} - {selectedItem.title}
                      </div>
                    </div>
                  </div>
                )}

                <div className="row mb-3">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">Product Images</label>
                      <input
                        type="file"
                        className="form-control"
                        multiple
                        accept="image/*"
                        onChange={handleImageUpload}
                      />

                      {imagePreview.length > 0 && (
                        <div className="d-flex flex-wrap mt-2">
                          {imagePreview.map((preview, index) => (
                            <img
                              key={index}
                              src={preview}
                              alt={`Preview ${index + 1}`}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                margin: "5px",
                                borderRadius: "4px",
                              }}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="form-group">
                      <label className="form-label">
                        Product Specifications
                      </label>
                      <textarea
                        className="form-control"
                        rows="5"
                        ref={specificationsRef}
                        placeholder="Enter product specifications"
                        required
                      ></textarea>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setShowAddDetailsModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveDetails}
              >
                Save Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;