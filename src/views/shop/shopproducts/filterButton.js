// FilterBar.jsx
import React from "react";

const FilterBar = ({ 
  selectedCategory, 
  superCategories, 
  handleCategoryFilter, 
  searchTerm, 
  handleSearch 
}) => {
  return (
    <div className="row g-3 mb-4">
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-label">Filter by Category</label>
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => handleCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {superCategories.map((category) => (
              <option key={category.id} value={category.title}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="col-md-6">
        <div className="form-group">
          <label className="form-label">Search Products</label>
          <input
            type="text"
            className="form-control"
            placeholder="Search by name, category, serial number..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
