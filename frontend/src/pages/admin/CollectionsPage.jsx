import React, { useState, useEffect } from "react";
import ProductsTable from "./ProductsTable";
import ProductModal from "./ProductModal";
import { FiPlus, FiFilter } from "react-icons/fi";
import { productService } from "../../api/services";

export default function CollectionsPage({ category }) {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Build query parameters
        const params = {};
        
        // Add search keyword if exists
        if (searchQuery) {
          params.keyword = searchQuery;
        }
        
        // Add stock filter
        if (stockFilter === 'in') {
          params['stock[gt]'] = '0';
        } else if (stockFilter === 'out') {
          params['stock[lte]'] = '0';
        }
        
        // Add sorting (newest first)
        params.sort = '-createdAt';
        
        // Fetch products by category using the service
        const response = await productService.getByCategory(category, params);
        
        // Handle response structure
        if (response.data.success && response.data.data) {
          setProducts(response.data.data.products || response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError(error.response?.data?.message || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, searchQuery, stockFilter]);

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await productService.delete(id);
        setProducts((prev) => prev.filter((p) => p._id !== id));
      } catch (error) {
        console.error("Failed to delete product:", error);
        setError(error.response?.data?.message || "Failed to delete product");
      }
    }
  };

  const handleSave = async (productData) => {
    try {
      if (editing) {
        // Update existing product
        const response = await productService.update(editing._id, productData);
        const updatedProduct = response.data.data?.product || response.data.data;
        setProducts((prev) =>
          prev.map((p) => (p._id === editing._id ? updatedProduct : p))
        );
      } else {
        // Create new product
        const response = await productService.create({
          ...productData,
          category,
        });
        const newProduct = response.data.data?.product || response.data.data;
        setProducts((prev) => [newProduct, ...prev]);
      }
      setModalOpen(false);
      setEditing(null);
    } catch (error) {
      console.error("Failed to save product:", error);
      setError(error.response?.data?.message || "Failed to save product");
    }
  };

  const filteredProducts = products;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: "0.25rem" }}>
            {category} Collection
          </h2>
          <p style={{ color: "#718096", fontSize: "0.875rem" }}>
            {loading ? "Loading..." : `${filteredProducts.length} product${filteredProducts.length !== 1 ? "s" : ""} found`}
          </p>
        </div>
        <button onClick={handleAdd} className="admin-btn admin-btn-primary">
          <FiPlus /> Add New Item
        </button>
      </div>

      {error && (
        <div style={{ 
          padding: "1rem", 
          marginBottom: "1rem", 
          backgroundColor: "#FEE2E2", 
          color: "#991B1B", 
          borderRadius: "0.5rem" 
        }}>
          {error}
        </div>
      )}

      <div className="admin-filter-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="admin-input"
          style={{ maxWidth: "300px" }}
        />

        <div className="flex items-center gap-4" style={{ gap: "0.5rem" }}>
          <FiFilter style={{ color: "#718096" }} />
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className="admin-select"
            style={{ maxWidth: "200px" }}
          >
            <option value="all">All Products</option>
            <option value="in">In Stock</option>
            <option value="out">Out of Stock</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div style={{ 
          padding: "3rem", 
          textAlign: "center", 
          color: "#718096" 
        }}>
          Loading products...
        </div>
      ) : (
        <ProductsTable
          products={filteredProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}

      {isModalOpen && (
        <ProductModal
          product={editing}
          category={category}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
