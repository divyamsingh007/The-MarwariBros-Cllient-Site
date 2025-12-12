import React, { useState, useEffect } from "react";
import { FiX, FiImage } from "react-icons/fi";
import api from "../../utils/api";
import { API_PATH } from "../../utils/apiPaths";

export default function ProductModal({ product, category, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: product?.id || null,
    name: product?.name || "",
    description: product?.description || "",
    price: product?.price || 0,
    stock: product?.stock || 0,
    category: product?.category || category,
    tags: product?.tags || [category],
    image:
      product?.image ||
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleTagsChange = (e) => {
    const tags = e.target.value.split(",").map((tag) => tag.trim());
    setFormData((prev) => ({ ...prev, tags }));
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (formData.price <= 0) {
      newErrors.price = "Price must be greater than 0";
    }

    if (formData.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validate()) {
      try {
        const response = await api.post(API_PATH.PRODUCTS,{
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          stock: formData.stock,
          images:{
            url: formData.image
          }

        })
        console.log(response)
      } catch (error) {
        
      }
      onSave(formData);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="admin-modal-header">
            <h3 className="admin-modal-title">
              {product ? "Edit Product" : "Add New Product"}
            </h3>
            <button
              type="button"
              onClick={onClose}
              style={{
                position: "absolute",
                right: "1.5rem",
                top: "1.5rem",
                background: "none",
                border: "none",
                fontSize: "1.5rem",
                cursor: "pointer",
                color: "#718096",
              }}
            >
              <FiX />
            </button>
          </div>

          <div className="admin-modal-body">
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="name">
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                className="admin-input"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="Enter product name"
              />
              {errors.name && (
                <span
                  style={{
                    color: "#e53e3e",
                    fontSize: "0.875rem",
                    marginTop: "0.25rem",
                    display: "block",
                  }}
                >
                  {errors.name}
                </span>
              )}
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                className="admin-textarea"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Enter product description"
              />
            </div>

            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label" htmlFor="price">
                  Price *
                </label>
                <input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  className="admin-input"
                  value={formData.price}
                  onChange={(e) =>
                    handleChange("price", parseFloat(e.target.value) || 0)
                  }
                  placeholder="0.00"
                />
                {errors.price && (
                  <span
                    style={{
                      color: "#e53e3e",
                      fontSize: "0.875rem",
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    {errors.price}
                  </span>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="stock">
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  className="admin-input"
                  value={formData.stock}
                  onChange={(e) =>
                    handleChange("stock", parseInt(e.target.value) || 0)
                  }
                  placeholder="0"
                />
                {errors.stock && (
                  <span
                    style={{
                      color: "#e53e3e",
                      fontSize: "0.875rem",
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    {errors.stock}
                  </span>
                )}
              </div>
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="category">
                Category
              </label>
              <select
                id="category"
                className="admin-select"
                value={formData.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="Men">Men</option>
                <option value="Women">Women</option>
                <option value="Jewellery">Jewellery</option>
                <option value="Juttis & Footwear">Juttis & Footwear</option>
              </select>
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="tags">
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                type="text"
                className="admin-input"
                value={formData.tags?.join(", ") || ""}
                onChange={handleTagsChange}
                placeholder="e.g., Traditional, Premium, Designer"
              />
            </div>

            <div className="admin-form-group">
              <label className="admin-label" htmlFor="image">
                <FiImage style={{ display: "inline", marginRight: "0.5rem" }} />
                Image URL
              </label>
              <input
                id="image"
                type="url"
                className="admin-input"
                value={formData.image}
                onChange={(e) => handleChange("image", e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {formData.image && (
                <div style={{ marginTop: "0.75rem" }}>
                  <img
                    src={formData.image}
                    alt="Preview"
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                      border: "1px solid #e2e8f0",
                    }}
                    onError={(e) => {
                      e.target.src =
                        "https://via.placeholder.com/100?text=No+Image";
                    }}
                  />
                </div>
              )}
            </div>
          </div>

          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="admin-btn admin-btn-secondary"
            >
              Cancel
            </button>
            <button type="submit" className="admin-btn admin-btn-primary">
              {product ? "Update Product" : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
