import React from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiPackage,
  FiSettings,
} from "react-icons/fi";

export default function Dashboard() {
  return (
    <div>
      <div
        className="admin-card mb-6"
        style={{ textAlign: "center", padding: "3rem 2rem" }}
      >
        <h1
          style={{ fontSize: "2.5rem", color: "#001238", marginBottom: "1rem" }}
        >
          Welcome to The Marwari Bros Admin Dashboard
        </h1>
        <p
          style={{
            fontSize: "1.1rem",
            color: "#666",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Manage your products, collections, and store settings all in one
          place.
        </p>
      </div>

      <div className="admin-grid-4 mb-6">
        <Link
          to="/collections"
          className="stat-card"
          style={{
            cursor: "pointer",
            transition: "transform 0.2s",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              color: "#001238",
              marginBottom: "1rem",
            }}
          >
            <FiShoppingCart />
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              color: "#001238",
              marginBottom: "0.5rem",
            }}
          >
            Collections
          </h3>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Manage your product collections
          </p>
        </Link>

        <Link
          to="/admin/men"
          className="stat-card"
          style={{
            cursor: "pointer",
            transition: "transform 0.2s",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              color: "#c5a46d",
              marginBottom: "1rem",
            }}
          >
            <FiPackage />
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              color: "#001238",
              marginBottom: "0.5rem",
            }}
          >
            Products
          </h3>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Add, edit, or remove products
          </p>
        </Link>

        <Link
          to="/admin/settings"
          className="stat-card"
          style={{
            cursor: "pointer",
            transition: "transform 0.2s",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              fontSize: "2.5rem",
              color: "#c5a46d",
              marginBottom: "1rem",
            }}
          >
            <FiSettings />
          </div>
          <h3
            style={{
              fontSize: "1.25rem",
              color: "#001238",
              marginBottom: "0.5rem",
            }}
          >
            Settings
          </h3>
          <p style={{ color: "#666", fontSize: "0.9rem" }}>
            Configure store settings
          </p>
        </Link>
      </div>

      <div className="admin-card">
        <h3 className="admin-card-title">Store Overview</h3>
        <div
          className="admin-grid-3"
          style={{ padding: "1.5rem", gap: "2rem" }}
        >
          <div style={{ textAlign: "center" }}>
            <p
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#001238" }}
            >
              24
            </p>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>Total Products</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#c5a46d" }}
            >
              4
            </p>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>Categories</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p
              style={{ fontSize: "2rem", fontWeight: "bold", color: "#001238" }}
            >
              18
            </p>
            <p style={{ color: "#666", marginTop: "0.5rem" }}>In Stock</p>
          </div>
        </div>
      </div>
    </div>
  );
}
