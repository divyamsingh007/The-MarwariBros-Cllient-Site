import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Collections() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState(null);

  const categories = [
    { id: "all", name: "All Collections" },
    { id: "men", name: "Men's Wear" },
    { id: "women", name: "Women's Wear" },
    { id: "jewelry", name: "Jewelry" },
    { id: "footwear", name: "Footwear" },
    { id: "accessories", name: "Accessories" },
  ];

  const collections = [
    // Men's Collection
    {
      id: 1,
      category: "men",
      name: "Royal Sherwani Collection",
      subtitle: "Majestic Elegance",
      price: "₹45,000 - ₹85,000",
      image:
        "https://images.unsplash.com/photo-1605731426514-077f3a81b6f5?w=600&h=800&fit=crop",
      description:
        "Handcrafted sherwanis with intricate gold embroidery and traditional motifs.",
      features: [
        "Hand Embroidery",
        "Pure Silk",
        "Custom Fitting",
        "Heritage Design",
      ],
    },
    {
      id: 2,
      category: "men",
      name: "Contemporary Kurta Sets",
      subtitle: "Modern Tradition",
      price: "₹12,000 - ₹25,000",
      image:
        "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=600&h=800&fit=crop",
      description:
        "Elegant kurta sets blending traditional craftsmanship with contemporary design.",
      features: ["Pure Cotton Silk", "Modern Cuts", "Versatile Style", "Comfort Fit"],
    },
    {
      id: 3,
      category: "men",
      name: "Bandhgala Suit Collection",
      subtitle: "Regal Sophistication",
      price: "₹35,000 - ₹65,000",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
      description:
        "Classic bandhgala suits with modern tailoring and traditional elements.",
      features: [
        "Structured Tailoring",
        "Premium Fabric",
        "Royal Buttons",
        "Perfect Fit",
      ],
    },
    // Women's Collection
    {
      id: 4,
      category: "women",
      name: "Bridal Lehenga Collection",
      subtitle: "Dream Wedding Ensembles",
      price: "₹85,000 - ₹2,50,000",
      image:
        "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&h=800&fit=crop",
      description:
        "Exquisite bridal lehengas with heavy embellishments and traditional artistry.",
      features: [
        "Heavy Embellishment",
        "Handwork",
        "Premium Fabrics",
        "Custom Design",
      ],
    },
    {
      id: 5,
      category: "women",
      name: "Designer Saree Collection",
      subtitle: "Timeless Elegance",
      price: "₹25,000 - ₹75,000",
      image:
        "https://images.unsplash.com/photo-1583391733985-2e583d36aa6d?w=600&h=800&fit=crop",
      description:
        "Beautiful designer sarees with contemporary draping and traditional motifs.",
      features: [
        "Designer Blouse",
        "Rich Fabrics",
        "Unique Prints",
        "Modern Drape",
      ],
    },
    {
      id: 6,
      category: "women",
      name: "Anarkali Suit Collection",
      subtitle: "Royal Grace",
      price: "₹18,000 - ₹45,000",
      image:
        "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=800&fit=crop",
      description:
        "Flowing anarkali suits with intricate work and graceful silhouettes.",
      features: [
        "Flowy Design",
        "Intricate Work",
        "Comfortable Fit",
        "Elegant Style",
      ],
    },
    // Jewelry Collection
    {
      id: 7,
      category: "jewelry",
      name: "Heritage Kundan Sets",
      subtitle: "Royal Radiance",
      price: "₹55,000 - ₹1,25,000",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop",
      description:
        "Authentic kundan jewelry with traditional craftsmanship and precious stones.",
      features: [
        "Kundan Work",
        "Precious Stones",
        "Gold Plated",
        "Traditional Design",
      ],
    },
    {
      id: 8,
      category: "jewelry",
      name: "Modern Temple Jewelry",
      subtitle: "Divine Beauty",
      price: "₹35,000 - ₹85,000",
      image:
        "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&h=800&fit=crop",
      description:
        "Contemporary temple jewelry with traditional motifs and modern appeal.",
      features: [
        "Temple Design",
        "Antique Finish",
        "Detailed Work",
        "Cultural Heritage",
      ],
    },
    // Footwear Collection
    {
      id: 9,
      category: "footwear",
      name: "Handcrafted Juttis",
      subtitle: "Traditional Comfort",
      price: "₹3,500 - ₹12,000",
      image:
        "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=600&h=800&fit=crop",
      description:
        "Authentic handmade juttis with traditional embroidery and comfort.",
      features: [
        "Handmade",
        "Comfortable Sole",
        "Traditional Embroidery",
        "Authentic Design",
      ],
    },
    {
      id: 10,
      category: "footwear",
      name: "Designer Mojaris",
      subtitle: "Royal Steps",
      price: "₹5,000 - ₹18,000",
      image:
        "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=600&h=800&fit=crop",
      description:
        "Elegant mojaris with rich embellishments perfect for special occasions.",
      features: [
        "Rich Embellishment",
        "Premium Leather",
        "Comfortable Fit",
        "Elegant Design",
      ],
    },
    // Accessories
    {
      id: 11,
      category: "accessories",
      name: "Royal Turbans & Safas",
      subtitle: "Crowning Glory",
      price: "₹8,000 - ₹25,000",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=800&fit=crop",
      description:
        "Traditional turbans and safas with intricate work and royal appeal.",
      features: [
        "Traditional Tying",
        "Rich Fabrics",
        "Royal Appeal",
        "Custom Colors",
      ],
    },
    {
      id: 12,
      category: "accessories",
      name: "Heritage Bags & Clutches",
      subtitle: "Elegant Companions",
      price: "₹4,500 - ₹15,000",
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=800&fit=crop",
      description:
        "Beautifully crafted bags and clutches with traditional and modern designs.",
      features: [
        "Handcrafted",
        "Multiple Styles",
        "Quality Materials",
        "Unique Designs",
      ],
    },
  ];

  const filteredCollections =
    activeCategory === "all"
      ? collections
      : collections.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f9f9f9]">
      {/* Navigation */}
      <Navbar></Navbar>

      {/* Hero Section */}
      <section className="mt-16 pt-24 md:pt-32 pb-20 bg-[#001238] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 border border-[#c5a46d] rotate-45"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-[#c5a46d] rotate-12"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 border border-[#c5a46d] rotate-45"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-primary !text-[#f9f9f9] !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl mb-6">
              Our Collections
            </h1>
            <h2 className="heading-tertiary !text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl mb-8">
              Where Heritage Meets Contemporary Elegance
            </h2>
            <p className="paragraph !text-[#f9f9f9] !text-lg sm:!text-xl max-w-3xl mx-auto opacity-90">
              Explore our curated collections of traditional and contemporary
              pieces, each crafted with meticulous attention to detail and
              authentic artistry.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-20 bg-gradient-to-r from-[#f9f9f9] via-white to-[#f9f9f9] shadow-xl z-40 border-b border-[#c5a46d]/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="heading-tertiary !text-2xl mb-2">
              Explore Our Collectionsssssss
            </h3>
            <div className="w-24 h-1 bg-gradient-to-r from-[#c5a46d] to-[#001238] mx-auto"></div>
          </div>

          <div className="flex flex-wrap justify-center gap-2 lg:gap-4">
            {categories.map((category, index) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`relative px-8 py-4 text-sm lg:text-base font-bold tracking-wide uppercase transition-all duration-500 transform hover:scale-105 cursor-pointer ${
                  activeCategory === category.id
                    ? "bg-[#001238] text-[#f9f9f9] shadow-xl"
                    : "bg-white text-[#001238] hover:bg-[#001238] hover:text-[#f9f9f9] shadow-lg hover:shadow-xl border border-[#001238]/20 hover:border-[#001238]"
                }`}
                style={{
                  clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <span className="relative z-10">{category.name}</span>

                {/* Active indicator */}
                {activeCategory === category.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#c5a46d] via-[#d4b578] to-[#c5a46d]"></div>
                )}

                {/* Hover effect overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#c5a46d]/10 via-transparent to-[#c5a46d]/10 transition-opacity duration-300 ${
                    activeCategory === category.id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                  style={{
                    clipPath: "polygon(8% 0%, 100% 0%, 92% 100%, 0% 100%)",
                  }}
                ></div>
              </button>
            ))}
          </div>

          {/* Category count indicator */}
          <div className="mt-8 text-center">
            <p className="paragraph-small !text-[#666]">
              Showing {filteredCollections.length} item
              {filteredCollections.length !== 1 ? "s" : ""}
              {activeCategory !== "all" && (
                <span className="text-[#c5a46d] font-semibold ml-1">
                  in {categories.find((cat) => cat.id === activeCategory)?.name}
                </span>
              )}
            </p>
          </div>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-12">
            {filteredCollections.map((item, index) => (
              <div
                key={item.id}
                className="group cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="bg-white overflow-hidden shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  {/* Image Container */}
                  <div className="relative overflow-hidden h-80 lg:h-96">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001238]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Overlay Content */}
                    <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="paragraph-small !text-[#f9f9f9] !text-sm">
                        {item.description.substring(0, 80)}...
                      </p>
                    </div>

                    {/* Price Tag */}
                    <div className="absolute top-4 right-4 bg-[#c5a46d] text-[#001238] px-3 py-1 rounded-full text-sm font-bold">
                      {item.price.split(" - ")[0]}+
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8 space-y-4">
                    <div>
                      <h3 className="heading-tertiary !text-base !text-[#c5a46d] mb-2">
                        {item.subtitle}
                      </h3>
                      <h2 className="heading-secondary !text-xl !text-[#001238] mb-3">
                        {item.name}
                      </h2>
                      <p className="heading-quaternary !text-[#666] !text-lg font-bold">
                        {item.price}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2">
                      {item.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-[#f9f9f9] text-[#001238] rounded-full text-xs border border-[#c5a46d]/30"
                        >
                          {feature}
                        </span>
                      ))}
                      {item.features.length > 2 && (
                        <span className="px-3 py-1 bg-[#c5a46d]/10 text-[#c5a46d] rounded-full text-xs">
                          +{item.features.length - 2} more
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                      <button className="flex-1 bg-[#001238] text-[#f9f9f9] py-2 px-4 rounded-full text-sm font-semibold hover:bg-[#001f50] transition-all duration-300">
                        View Details
                      </button>
                      <button className="px-4 py-2 border border-[#c5a46d] text-[#c5a46d] rounded-full hover:bg-[#c5a46d] hover:text-[#001238] transition-all duration-300">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection Banner */}
      <section className="py-20 bg-[#001238] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-20 w-32 h-32 border border-[#c5a46d] rotate-45"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 border border-[#c5a46d] rotate-12"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="heading-primary !text-[#f9f9f9] mb-6">
            Custom Collections Available
          </h2>
          <h3 className="heading-tertiary !text-[#c5a46d] mb-8">
            Your Vision, Our Craftsmanship
          </h3>
          <p className="paragraph !text-[#f9f9f9] !text-lg max-w-3xl mx-auto mb-10 opacity-90">
            Don't see exactly what you're looking for? We specialize in custom
            designs tailored to your specific requirements, occasion, and
            personal style preferences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#c5a46d] text-[#001238] py-4 px-8 rounded-full font-bold text-lg hover:bg-[#d4b578] transform hover:scale-105 transition-all duration-300 shadow-xl">
              Request Custom Design
            </button>
            <button className="border-2 border-[#c5a46d] text-[#c5a46d] py-4 px-8 rounded-full font-bold text-lg hover:bg-[#c5a46d] hover:text-[#001238] transition-all duration-300">
              Schedule Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Quick Modal for Item Details */}
      {selectedItem && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              <img
                src={selectedItem.image}
                alt={selectedItem.name}
                className="w-full h-64 object-cover"
              />
              <button
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <h3 className="heading-secondary !text-2xl !text-[#001238] mb-2">
                {selectedItem.name}
              </h3>
              <p className="heading-tertiary !text-lg !text-[#c5a46d] mb-4">
                {selectedItem.subtitle}
              </p>
              <p className="paragraph !text-lg mb-6">
                {selectedItem.description}
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="heading-quaternary !text-lg mb-2">
                    Features:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedItem.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#f9f9f9] border border-[#c5a46d] text-[#001238] rounded-full text-sm"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-4 border-t">
                  <span className="heading-secondary !text-xl !text-[#001238]">
                    {selectedItem.price}
                  </span>
                  <div className="flex gap-3">
                    <button className="bg-[#001238] text-white py-2 px-6 rounded-full font-semibold hover:bg-[#001f50] transition-colors">
                      Inquire Now
                    </button>
                    <button className="border border-[#c5a46d] text-[#c5a46d] py-2 px-6 rounded-full hover:bg-[#c5a46d] hover:text-white transition-colors">
                      Add to Wishlist
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
