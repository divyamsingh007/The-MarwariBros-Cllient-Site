import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import "./index.css";
import App from "./App";

// Initialize AOS
AOS.init({
  duration: 1000, // Animation duration in milliseconds
  easing: "ease-in-out", // Animation easing
  once: true, // Whether animation should happen only once - while scrolling down
  mirror: false, // Whether elements should animate out while scrolling past them
  offset: 100, // Offset (in px) from the original trigger point
  delay: 0, // Delay in milliseconds
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
