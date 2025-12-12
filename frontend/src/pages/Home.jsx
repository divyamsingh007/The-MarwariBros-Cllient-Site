import React from "react";
import HeroSection from "../components/HeroSection";
import SecondSection from "../components/SecondSection";
import Footer from "../components/Footer";
import api from "../utils/api";
import { API_PATH } from "../utils/apiPaths";

export default function Home() {
  return (
    <div className="page-fade-in">
      <HeroSection></HeroSection>
      <SecondSection></SecondSection>
      <Footer></Footer>
    </div>
  );
}
