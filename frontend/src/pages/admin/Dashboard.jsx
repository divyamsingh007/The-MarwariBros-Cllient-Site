import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FiShoppingCart,
  FiPackage,
  FiSettings,
  FiDollarSign,
  FiUsers,
  FiTrendingUp,
  FiShoppingBag,
} from "react-icons/fi";
import { adminService, productService } from "../../api/services";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Try to fetch admin dashboard stats
      try {
        const dashboardResponse = await adminService.getDashboardStats();
        if (dashboardResponse.data.success) {
          setStats(dashboardResponse.data.data.stats);
        }
      } catch (err) {
        // If admin endpoint fails, fetch basic product stats
        console.log('Admin endpoint not available, fetching basic stats');
        const productsResponse = await productService.getAllAdmin();
        
        if (productsResponse.data.success) {
          const products = productsResponse.data.data.products || productsResponse.data.data;
          
          // Calculate basic stats from products
          const basicStats = {
            totalProducts: products.length,
            inStockProducts: products.filter(p => p.stock > 0).length,
            outOfStockProducts: products.filter(p => p.stock === 0).length,
            categories: [...new Set(products.map(p => p.category))].length,
          };
          
          setStats(basicStats);
        }
      }
      
      setError(null);
    } catch (err) {
      console.error('Failed to fetch dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-fade-in">
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

      {/* Stats Grid */}
      {loading ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ color: '#718096' }}>Loading dashboard...</p>
        </div>
      ) : error ? (
        <div className="admin-card" style={{ 
          textAlign: 'center', 
          padding: '2rem',
          backgroundColor: '#FEE2E2',
          color: '#991B1B'
        }}>
          <p>{error}</p>
          <button 
            onClick={fetchDashboardData}
            style={{
              marginTop: '1rem',
              padding: '0.5rem 1.5rem',
              background: '#991B1B',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer'
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* Statistics Cards */}
          <div className="admin-grid-4 mb-6">
            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                <FiPackage />
              </div>
              <div className="stat-content">
                <p className="stat-label">Total Products</p>
                <p className="stat-value">{stats?.totalProducts || 0}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
                <FiShoppingBag />
              </div>
              <div className="stat-content">
                <p className="stat-label">In Stock</p>
                <p className="stat-value">{stats?.inStockProducts || 0}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' }}>
                <FiShoppingCart />
              </div>
              <div className="stat-content">
                <p className="stat-label">Categories</p>
                <p className="stat-value">{stats?.categories || 4}</p>
              </div>
            </div>

            <div className="stat-card">
              <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' }}>
                <FiTrendingUp />
              </div>
              <div className="stat-content">
                <p className="stat-label">Out of Stock</p>
                <p className="stat-value">{stats?.outOfStockProducts || 0}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="admin-card mb-6">
            <h3 className="admin-card-title" style={{ marginBottom: '1.5rem' }}>Quick Actions</h3>
            <div className="admin-grid-3" style={{ gap: '1rem' }}>
              <Link
                to="/admin/men"
                className="admin-btn admin-btn-primary"
                style={{ textDecoration: 'none', textAlign: 'center', padding: '1rem' }}
              >
                <FiPackage style={{ marginRight: '0.5rem' }} />
                Manage Men Collection
              </Link>
              <Link
                to="/admin/women"
                className="admin-btn admin-btn-primary"
                style={{ textDecoration: 'none', textAlign: 'center', padding: '1rem' }}
              >
                <FiPackage style={{ marginRight: '0.5rem' }} />
                Manage Women Collection
              </Link>
              <Link
                to="/admin/jewellery"
                className="admin-btn admin-btn-primary"
                style={{ textDecoration: 'none', textAlign: 'center', padding: '1rem' }}
              >
                <FiPackage style={{ marginRight: '0.5rem' }} />
                Manage Jewellery
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
