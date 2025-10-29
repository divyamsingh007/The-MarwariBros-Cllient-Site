import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SecondSection() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCategoryClick = () => {
    setIsLoading(true);

    setTimeout(() => {
      navigate("/collections");
    }, 800); 
  };

  const categories = [
    {
      title: "Men's Collection",
      subtitle: "Traditional & Contemporary",
      description:
        "Exquisite sherwanis, kurtas, and tailored suits crafted with precision",
      backgroundImage: "/Dress-01.jpg", // Placeholder - replace with actual
    },
    {
      title: "Women's Collection",
      subtitle: "Elegant & Timeless",
      description:
        "Beautiful lehengas, sarees, and designer outfits for every occasion",
      backgroundImage: "/Dress-01.jpg", // Placeholder - replace with actual
    },
    {
      title: "Jewellery",
      subtitle: "Heritage & Modern",
      description:
        "Handcrafted pieces that blend traditional artistry with contemporary design",
      backgroundImage: "/Dress-01.jpg", // Placeholder - replace with actual
    },
    {
      title: "Juttis & Footwear",
      subtitle: "Comfort & Style",
      description: "Authentic handmade juttis and premium footwear collection",
      backgroundImage: "/Dress-01.jpg", // Placeholder - replace with actual
    },
  ];

  return (
    <main id="second-section" className="py-16 px-6 md:px-12 lg:px-24 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-gradient-to-br from-[#001238]/95 via-[#001a4d]/95 to-[#001238]/95 backdrop-blur-md z-50 flex items-center justify-center transition-all duration-500 animate-fadeIn">
          <div className="text-center relative">
            <div className="absolute inset-0 -m-12">
              <div className="w-32 h-32 mx-auto border-2 border-[#c5a46d]/10 rounded-full animate-ping"></div>
            </div>

            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#c5a46d]/20 to-transparent"></div>

              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#c5a46d] border-r-[#c5a46d]/70 animate-spin"></div>

              <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-[#d4b578] border-l-[#d4b578]/70 animate-spin-slow-reverse"></div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-[#c5a46d] rounded-full animate-pulse-scale"></div>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[#c5a46d] text-xl font-bold tracking-[0.2em] animate-slideUp">
                LOADING
              </p>
              <div className="flex items-center justify-center space-x-1">
                <span className="w-2 h-2 bg-[#c5a46d] rounded-full animate-bounce-delay-0"></span>
                <span className="w-2 h-2 bg-[#c5a46d] rounded-full animate-bounce-delay-1"></span>
                <span className="w-2 h-2 bg-[#c5a46d] rounded-full animate-bounce-delay-2"></span>
              </div>
              <p className="text-[#c5a46d]/70 text-sm font-light tracking-wider animate-fadeInUp">
                Preparing your experience
              </p>
            </div>

            <div className="absolute -top-16 -left-16 w-32 h-32 border border-[#c5a46d]/10 rounded-full animate-spin-very-slow"></div>
            <div className="absolute -bottom-16 -right-16 w-32 h-32 border border-[#c5a46d]/10 rounded-full animate-spin-very-slow-reverse"></div>
          </div>
        </div>
      )}

      <div className="heading-primary text-center mb-16">
        Discover the Legacy of Marwari Craftsmanship
      </div>

      <div className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {categories.map((category, index) => (
          <div
            key={index}
            onClick={handleCategoryClick}
            className="category-card group relative h-96 overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${category.backgroundImage})`,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#001238]/90 via-[#001238]/40 to-transparent group-hover:from-[#001238]/95 transition-all duration-300" />
            <div className="absolute inset-0 flex flex-col justify-end p-6">
              <div className="transform transition-all duration-300 group-hover:translate-y-[-8px]">
                <h3 className="heading-tertiary !text-[#c5a46d] mb-2 !text-xl">
                  {category.subtitle}
                </h3>
                <h2 className="heading-secondary !text-white mb-3 !text-2xl">
                  {category.title}
                </h2>
                <p className="paragraph-small !text-[#f9f9f9] opacity-0 group-hover:opacity-100 transition-opacity duration-300 !text-sm leading-relaxed">
                  {category.description}
                </p>
                <button className="mt-4 bg-[#c5a46d] text-[#001238] px-4 py-2 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 hover:bg-[#d4b578]">
                  Explore Collection
                </button>
              </div>
            </div>
            <div className="absolute inset-0 border-2 border-[#c5a46d]/20 group-hover:border-[#c5a46d]/60 transition-all duration-300" />
          </div>
        ))}
      </div>

      <div className="mt-20 text-center">
        <div className="heading-tertiary mb-4">
          Crafted with Passion, Delivered with Pride
        </div>
        <p className="paragraph max-w-3xl mx-auto">
          Each piece in our collection tells a story of heritage, craftsmanship,
          and attention to detail. From traditional Marwari designs to
          contemporary interpretations, we bring you the finest in Indian
          fashion and accessories.
        </p>
      </div>
    </main>
  );
}
