import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";

import "./App.css";

import Home from "./pages/Home";
import About from "./pages/About";

const apiTest = async () => {
  try {
    console.log("Fetching from:", `${import.meta.env.VITE_BACKEND_URL}/api`);
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("API Response:", data);
  } catch (error) {
    console.error("Error fetching API:", error);
  }
};

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    apiTest();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

      </Routes>
    </>
  );
}

export default App;
