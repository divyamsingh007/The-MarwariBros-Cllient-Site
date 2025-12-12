import React from "react";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ProductsTable({ products = [], onEdit, onDelete }) {
  if (products.length === 0) {
    return (
      <div
        className="admin-card"
        style={{ textAlign: "center", padding: "3rem" }}
      >
        <p style={{ color: "#718096", fontSize: "1.125rem" }}>
          No products found. Add your first product to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="admin-table-container">
      <table className="admin-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Category</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => {
            // Get primary image or first image from images array
            const primaryImage = product.images?.find(img => img.isPrimary)?.url 
              || product.images?.[0]?.url 
              || product.image 
              || 'https://via.placeholder.com/100?text=No+Image';
            
            return (
              <tr key={product._id || product.id}>
                <td>
                  <img
                    src={primaryImage}
                    alt={product.name}
                    className="product-img"
                  />
                </td>
                <td>
                  <div style={{ fontWeight: 600 }}>{product.name}</div>
                  {product.description && (
                    <div
                      style={{
                        fontSize: "0.875rem",
                        color: "#718096",
                        marginTop: "0.25rem",
                        maxWidth: "250px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {product.description}
                    </div>
                  )}
                </td>
                <td style={{ fontWeight: 600 }}>₹{product.price.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</td>
                <td>
                  <span
                    className={`stock-badge ${
                      product.stock > 0 ? "in-stock" : "out-of-stock"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </td>
                <td style={{ textTransform: 'capitalize' }}>{product.category}</td>
                <td>
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem" }}
                  >
                    {product.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        style={{
                          background: "#edf2f7",
                          color: "#4a5568",
                          padding: "0.125rem 0.5rem",
                          borderRadius: "0.25rem",
                          fontSize: "0.75rem",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>
                  <div style={{ display: "flex", gap: "0.5rem" }}>
                    <button
                      onClick={() => onEdit(product)}
                      className="admin-btn admin-btn-warning"
                      style={{ padding: "0.5rem" }}
                      title="Edit product"
                    >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => onDelete(product._id || product.id)}
                    className="admin-btn admin-btn-danger"
                    style={{ padding: "0.5rem" }}
                    title="Delete product"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </td>
            </tr>
          );
          })}
        </tbody>
      </table>
    </div>
  );
}
