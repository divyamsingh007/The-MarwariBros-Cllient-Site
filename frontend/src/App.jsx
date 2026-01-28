import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import ScheduleConsultation from "./pages/ScheduleConsultation";
import Collections from "./pages/Collections";
import ProductDetail from "./pages/ProductDetail";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CollectionsPage from "./pages/admin/CollectionsPage";
import Settings from "./pages/admin/Settings";
import AdminLogin from "./pages/admin/Login";

function App() {
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/schedule" element={<ScheduleConsultation />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/product/:productId" element={<ProductDetail />} />
        <Route path="/login" element={<Login />} />

        {/* Admin Login Route - No protection needed */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Protected Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="men" element={<CollectionsPage category="Men" />} />
          <Route path="women" element={<CollectionsPage category="Women" />} />
          <Route
            path="jewellery"
            element={<CollectionsPage category="Jewellery" />}
          />
          <Route
            path="juttis-footwear"
            element={<CollectionsPage category="Juttis & Footwear" />}
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
