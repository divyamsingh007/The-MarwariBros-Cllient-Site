import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import Login from "./pages/Login";
import ScrollToTop from "./components/ScrollToTop";

import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import CollectionsPage from "./pages/admin/CollectionsPage";
import Settings from "./pages/admin/Settings";

// Protected Route Component
function ProtectedRoute({ children }) {
  const user = localStorage.getItem('user');
  const token = localStorage.getItem('accessToken');
  
  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }
  
  return children;
}

function App() {
  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
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
