import React, { useState } from "react";
import ProductsTable from "./ProductsTable";
import ProductModal from "./ProductModal";
import { FiPlus, FiFilter } from "react-icons/fi";

export default function CollectionsPage({ category }) {
  // Mock data - in real app, this would come from API
  const initialProducts = [
    {
      id: 1,
      image:
        "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=100&h=100&fit=crop",
      name: `${category} Traditional Kurta`,
      description:
        "Premium quality traditional kurta with intricate embroidery",
      price: 89.99,
      stock: 12,
      category: category,
      tags: [category, "Traditional", "Premium"],
    },
    {
      id: 2,
      image:
        "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=100&h=100&fit=crop",
      name: `${category} Designer Collection`,
      description: "Exclusive designer piece with modern aesthetics",
      price: 149.99,
      stock: 0,
      category: category,
      tags: [category, "Designer", "Exclusive"],
    },
    {
      id: 3,
      image:
        "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=100&h=100&fit=crop",
      name: `${category} Casual Wear`,
      description: "Comfortable casual wear for everyday use",
      price: 59.99,
      stock: 25,
      category: category,
      tags: [category, "Casual", "Comfort"],
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [stockFilter, setStockFilter] = useState("all");

  const handleAdd = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const handleEdit = (product) => {
    setEditing(product);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const handleSave = (product) => {
    if (product.id) {
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? product : p))
      );
    } else {
      const newProduct = { ...product, id: Date.now() };
      setProducts((prev) => [newProduct, ...prev]);
    }
    setModalOpen(false);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (stockFilter === "in") return matchesSearch && p.stock > 0;
    if (stockFilter === "out") return matchesSearch && p.stock === 0;
    return matchesSearch;
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: "0.25rem" }}>
            {category} Collection
          </h2>
          <p style={{ color: "#718096", fontSize: "0.875rem" }}>
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <button onClick={handleAdd} className="admin-btn admin-btn-primary">
          <FiPlus /> Add New Item
        </button>
      </div>

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

      <ProductsTable
        products={filteredProducts}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

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
