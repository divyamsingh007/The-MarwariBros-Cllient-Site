import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";
import Collections from "./pages/Collections";
import ScrollToTop from "./components/ScrollToTop";


function App() {

  return (
    <>
      <ScrollToTop></ScrollToTop>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/collections" element={<Collections />} />
      </Routes>
    </>
  );
}

export default App;
