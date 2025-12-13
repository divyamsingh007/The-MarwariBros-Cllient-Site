import React, { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  FiHome,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiExternalLink,
} from "react-icons/fi";
import { clearAuthToken } from "../../utils/api";
import "./admin.css";

function SidebarLink({ to, icon: Icon, children, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `admin-nav-link ${isActive ? "admin-nav-link--active" : ""}`
      }
      title={children}
    >
      <Icon className="admin-nav-icon" />
      <span className="admin-nav-text">{children}</span>
    </NavLink>
  );
}

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const getBreadcrumb = () => {
    const path = location.pathname.split("/").filter(Boolean);
    if (path.length === 1) return "Dashboard Overview";
    return path[path.length - 1]
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleLogout = () => {
    // Clear all authentication tokens
    clearAuthToken();
    closeSidebar();
    // Redirect to login page
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="admin-root">
      <aside
        className={`admin-sidebar ${sidebarOpen ? "admin-sidebar--open" : ""}`}
      >
        <div className="admin-brand">
          <h2 className="admin-brand-title">The MarwariBros Admin</h2>
          <button
            className="admin-sidebar-close"
            onClick={closeSidebar}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <nav className="admin-nav">
          <SidebarLink to="/admin" icon={FiHome} onClick={closeSidebar}>
            Dashboard Overview
          </SidebarLink>

          <div className="admin-nav-section">
            <span className="admin-nav-section-title">Collections</span>
            <SidebarLink
              to="/admin/men"
              icon={FiShoppingBag}
              onClick={closeSidebar}
            >
              Men
            </SidebarLink>
            <SidebarLink
              to="/admin/women"
              icon={FiShoppingBag}
              onClick={closeSidebar}
            >
              Women
            </SidebarLink>
            <SidebarLink
              to="/admin/jewellery"
              icon={FiShoppingBag}
              onClick={closeSidebar}
            >
              Jewellery
            </SidebarLink>
            <SidebarLink
              to="/admin/juttis-footwear"
              icon={FiShoppingBag}
              onClick={closeSidebar}
            >
              Juttis & Footwear
            </SidebarLink>
          </div>

          <SidebarLink
            to="/admin/settings"
            icon={FiSettings}
            onClick={closeSidebar}
          >
            Settings
          </SidebarLink>

          <button
            className="admin-logout-btn"
            onClick={handleLogout}
            title="Logout"
          >
            <FiLogOut className="admin-nav-icon" />
            <span className="admin-nav-text">Logout</span>
          </button>
        </nav>
      </aside>

      {sidebarOpen && (
        <div
          className="admin-overlay"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <div className="admin-main">
        <header className="admin-header">
          <div className="admin-header-left">
            <button
              className="admin-menu-btn"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <FiMenu />
            </button>
            <div className="admin-breadcrumb">
              <h1 className="admin-title">Admin Dashboard</h1>
              <span className="admin-breadcrumb-divider">/</span>
              <span className="admin-breadcrumb-current">
                {getBreadcrumb()}
              </span>
            </div>
          </div>

          <div className="admin-header-right">
            <a href="/" className="admin-back-to-store" title="Back to Store">
              <FiExternalLink className="admin-back-icon" />
              <span>Back to Store</span>
            </a>
          </div>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
