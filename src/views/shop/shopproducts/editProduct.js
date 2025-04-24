import React, { useEffect, useRef } from "react";

const EditProductModal = ({
  showModal,
  setShowModal,
  selectedItem,
  handleSaveChanges,
}) => {
  // Create refs for form elements
  const superCategoryRef = useRef(null);
  const categoryRef = useRef(null);
  const priceRef = useRef(null);
  const currencyRef = useRef(null);
  const discountRef = useRef(null);
  const specificationsRef = useRef(null);
  
  // File input refs
  const categoryImageRef = useRef(null);
  const productImagesRef = useRef(null);
  
  // Populate form fields when selectedItem changes
  useEffect(() => {
    if (selectedItem && showModal) {
      // Set text input values
      if (superCategoryRef.current) superCategoryRef.current.value = selectedItem.SuperCategory || "";
      if (categoryRef.current) categoryRef.current.value = selectedItem.Category || "";
      if (priceRef.current) priceRef.current.value = selectedItem.price || "";
      if (currencyRef.current) currencyRef.current.value = selectedItem.currency || "";
      if (discountRef.current) discountRef.current.value = selectedItem.discount || "";
      if (specificationsRef.current) specificationsRef.current.value = selectedItem.specifications || "";
    }
  }, [selectedItem, showModal]);

  // Handle form submission
  const onSaveChanges = () => {
    if (!selectedItem) return;
    
    // Create FormData object to handle file uploads
    const formData = new FormData();
  
    // Add text fields
    formData.append("id", selectedItem.id);
    formData.append("supercategory", superCategoryRef.current.value);
    formData.append("category", categoryRef.current.value);
    formData.append("price", priceRef.current.value);
    formData.append("currency", currencyRef.current.value);
    formData.append("discount", discountRef.current.value);
    
    // Ensure specifications is never null by providing a default empty string
    const specificationsValue = specificationsRef.current.value || "";
    formData.append("specifications", specificationsValue);
    
    // Add category image if selected
    if (categoryImageRef.current && categoryImageRef.current.files[0]) {
      formData.append("image", categoryImageRef.current.files[0]);
    }
    
    // Add product images if selected
    if (productImagesRef.current && productImagesRef.current.files.length > 0) {
      for (let i = 0; i < productImagesRef.current.files.length; i++) {
        formData.append("subcategory", productImagesRef.current.files[i]);
      }
    }
    
    // Call the parent's handler
    handleSaveChanges(formData);
  };

  // Get image URL helper function
  const getImageUrl = (imagePath) => {
    if (!imagePath) return "";
    // Adjust this path to match your server's file structure
    return `/uploads/${imagePath}`;
  };

  return (
    <div
      className={`modal fade ${showModal ? "show d-block" : ""}`}
      style={{ background: showModal ? "rgba(0,0,0,0.5)" : "none" }}
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit Product</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowModal(false)}
            ></button>
          </div>
          <div className="modal-body">
            {selectedItem && (
              <form className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Super Category</label>
                  <input
                    className="form-control"
                    ref={superCategoryRef}
                    defaultValue={selectedItem.SuperCategory}
                    required
                    disable
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Category</label>
                  <input
                    className="form-control"
                    ref={categoryRef}
                    defaultValue={selectedItem.Category}
                    required
                    disable
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    ref={priceRef}
                    defaultValue={selectedItem.price}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Currency</label>
                  <input
                    className="form-control"
                    ref={currencyRef}
                    defaultValue={selectedItem.currency}
                    required
                  />
                </div>
                <div className="col-md-12">
                  <label className="form-label">Discount (%)</label>
                  <input
                    type="number"
                    className="form-control"
                    ref={discountRef}
                    defaultValue={selectedItem.discount}
                    required
                  />
                </div>
                <div className="col-12">
                  <label className="form-label">Specifications</label>
                  <textarea
                    className="form-control"
                    ref={specificationsRef}
                    defaultValue={selectedItem.specifications}
                    rows="4"
                  />
                </div>
                
                <div className="col-12">
                  <label className="form-label">Current Category Image</label>
                  {selectedItem.image && (
                    <div>
                      <img 
                        src={getImageUrl(selectedItem.image)} 
                        alt="Category" 
                        className="img-thumbnail" 
                        style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                      />
                    </div>
                  )}
                </div>
                
                <div className="col-12">
                  <label className="form-label">New Category Image</label>
                  <input
                    type="file"
                    className="form-control"
                    ref={categoryImageRef}
                    accept="image/*"
                  />
                </div>
                
                <div className="col-12">
                  <label className="form-label">Current Product Images</label>
                  <div className="d-flex flex-wrap gap-2">
                    {selectedItem.images && selectedItem.images.map((img, index) => (
                      <div key={index}>
                        <img 
                          src={getImageUrl(img.images)} 
                          alt={`Product ${index}`} 
                          className="img-thumbnail" 
                          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="col-12">
                  <label className="form-label">New Product Images</label>
                  <input
                    type="file"
                    className="form-control"
                    ref={productImagesRef}
                    accept="image/*"
                    multiple
                  />
                </div>
              </form>
            )}
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button className="btn btn-primary" onClick={onSaveChanges}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductModal;