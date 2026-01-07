import React, { useState, useEffect } from "react";
import {
  FiX,
  FiImage,
  FiDollarSign,
  FiPackage,
  FiTag,
  FiFileText,
  FiUpload,
} from "react-icons/fi";

export default function ProductModal({ product, category, onClose, onSave }) {
  // Map backend product data to frontend format
  const getInitialFormData = () => {
    if (product) {
      // Reverse category mapping
      const categoryReverseMap = {
        men: "Men",
        women: "Women",
        jewelry: "Jewellery",
        footwear: "Juttis & Footwear",
      };

      return {
        id: product._id || product.id || null,
        name: product.name || "",
        description: product.description || "",
        price: product.price || 0,
        stock: product.stock || 0,
        category: categoryReverseMap[product.category] || category,
        tags: product.tags || [category],
        image:
          product.images?.[0]?.url ||
          product.image ||
          "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
      };
    }

    return {
      id: null,
      name: "",
      description: "",
      price: 0,
      stock: 0,
      category: category,
      tags: [category],
      image:
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=400&h=400&fit=crop",
    };
  };

  const [formData, setFormData] = useState(getInitialFormData());
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(formData.image);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Update image preview
    if (field === "image") {
      setImagePreview(value);
    }

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
      // Map frontend categories to backend enum values
      const categoryMap = {
        Men: "men",
        Women: "women",
        Jewellery: "jewelry",
        "Juttis & Footwear": "footwear",
      };

      // Transform data to match backend schema
      const productData = {
        name: formData.name,
        description: formData.description || "No description provided",
        price: formData.price,
        stock: formData.stock,
        category: categoryMap[formData.category] || "other",
        tags: formData.tags || [],
        images: formData.image
          ? [{ url: formData.image, isPrimary: true }]
          : [],
        status: "active",
        isPublished: true,
      };

      onSave(productData);
    }
  };

  return (
    <div className="admin-modal-overlay" onClick={onClose}>
      <div
        className="admin-modal admin-modal-enhanced"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="admin-modal-header">
            <div>
              <h3 className="admin-modal-title">
                {product ? "✨ Edit Product" : "🎉 Add New Product"}
              </h3>
              <p
                style={{
                  color: "#718096",
                  fontSize: "0.875rem",
                  marginTop: "0.25rem",
                }}
              >
                {product
                  ? "Update your product details"
                  : "Fill in the details to add a new product"}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="admin-modal-close-btn"
            >
              <FiX />
            </button>
          </div>

          <div className="admin-modal-body">
            {/* Product Image Preview */}
            <div className="product-image-section">
              <div className="product-image-preview">
                <img
                  src={
                    imagePreview ||
                    "https://via.placeholder.com/300x300?text=No+Image"
                  }
                  alt="Product Preview"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300x300?text=No+Image";
                  }}
                />
                <div className="image-overlay">
                  <FiUpload size={24} />
                  <span>Change Image</span>
                </div>
              </div>
              <div className="admin-form-group" style={{ marginBottom: 0 }}>
                <label className="admin-label" htmlFor="image">
                  <FiImage
                    style={{ display: "inline", marginRight: "0.5rem" }}
                  />
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
              </div>
            </div>

            {/* Product Name */}
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="name">
                <FiTag style={{ display: "inline", marginRight: "0.5rem" }} />
                Product Name *
              </label>
              <input
                id="name"
                type="text"
                className={`admin-input ${
                  errors.name ? "admin-input-error" : ""
                }`}
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                placeholder="e.g., Traditional Embroidered Kurta"
              />
              {errors.name && (
                <span className="admin-error-text">{errors.name}</span>
              )}
            </div>

            {/* Description */}
            <div className="admin-form-group">
              <label className="admin-label" htmlFor="description">
                <FiFileText
                  style={{ display: "inline", marginRight: "0.5rem" }}
                />
                Description
              </label>
              <textarea
                id="description"
                className="admin-textarea"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                placeholder="Describe your product in detail..."
                rows="4"
              />
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "#718096",
                  marginTop: "0.25rem",
                  textAlign: "right",
                }}
              >
                {formData.description.length} characters
              </div>
            </div>

            {/* Price and Stock */}
            <div className="admin-grid-2">
              <div className="admin-form-group">
                <label className="admin-label" htmlFor="price">
                  <FiDollarSign
                    style={{ display: "inline", marginRight: "0.5rem" }}
                  />
                  Price (₹) *
                </label>
                <div className="admin-input-with-icon">
                  <span className="input-icon">₹</span>
                  <input
                    id="price"
                    type="number"
                    step="0.01"
                    min="0"
                    className={`admin-input admin-input-with-prefix ${
                      errors.price ? "admin-input-error" : ""
                    }`}
                    value={formData.price}
                    onChange={(e) =>
                      handleChange("price", parseFloat(e.target.value) || 0)
                    }
                    placeholder="0.00"
                  />
                </div>
                {errors.price && (
                  <span className="admin-error-text">{errors.price}</span>
                )}
              </div>

              <div className="admin-form-group">
                <label className="admin-label" htmlFor="stock">
                  <FiPackage
                    style={{ display: "inline", marginRight: "0.5rem" }}
                  />
                  Stock Quantity *
                </label>
                <input
                  id="stock"
                  type="number"
                  min="0"
                  className={`admin-input ${
                    errors.stock ? "admin-input-error" : ""
                  }`}
                  value={formData.stock}
                  onChange={(e) =>
                    handleChange("stock", parseInt(e.target.value) || 0)
                  }
                  placeholder="0"
                />
                {errors.stock && (
                  <span className="admin-error-text">{errors.stock}</span>
                )}
                {formData.stock === 0 && !errors.stock && (
                  <span
                    style={{
                      color: "#f59e0b",
                      fontSize: "0.75rem",
                      marginTop: "0.25rem",
                      display: "block",
                    }}
                  >
                    ⚠️ Product will be marked as out of stock
                  </span>
                )}
              </div>
            </div>

            {/* Category */}
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
                <option value="Men">👔 Men</option>
                <option value="Women">👗 Women</option>
                <option value="Jewellery">💍 Jewellery</option>
                <option value="Juttis & Footwear">👞 Juttis & Footwear</option>
              </select>
            </div>

            {/* Tags */}
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
                placeholder="e.g., Traditional, Premium, Designer, Handcrafted"
              />
              <div
                style={{
                  marginTop: "0.5rem",
                  display: "flex",
                  gap: "0.5rem",
                  flexWrap: "wrap",
                }}
              >
                {formData.tags?.map((tag, index) => (
                  <span
                    key={index}
                    style={{
                      padding: "0.25rem 0.75rem",
                      background:
                        "linear-gradient(135deg, #001238 0%, #001a4d 100%)",
                      color: "white",
                      borderRadius: "9999px",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="admin-modal-footer">
            <button
              type="button"
              onClick={onClose}
              className="admin-btn admin-btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="admin-btn admin-btn-primary admin-btn-primary-gradient"
            >
              {product ? "💾 Update Product" : "✨ Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
