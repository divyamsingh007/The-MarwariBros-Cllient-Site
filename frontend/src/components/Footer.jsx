import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <footer className="h-screen bg-[#001238] text-[#f9f9f9] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#c5a46d] rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-[#c5a46d] rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-[#c5a46d] rotate-45"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 border border-[#c5a46d] rotate-12"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 container mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center max-w-7xl">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="heading-primary !text-[#f9f9f9] !text-4xl lg:!text-5xl">
                The MarwariBros
              </h1>
              <div className="heading-tertiary !text-[#c5a46d] !text-xl">
                Crafting Legacy, One Thread at a Time
              </div>
              <p className="paragraph !text-[#f9f9f9] !text-lg max-w-lg leading-relaxed">
                Experience the finest in traditional Marwari craftsmanship. From
                bespoke garments to exquisite jewelry, we bring heritage to life
                with modern elegance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="heading-quaternary !text-[#c5a46d] mb-4 !text-lg">
                  Collections
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Men's Wear
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Women's Wear
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Jewellery
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Accessories
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="heading-quaternary !text-[#c5a46d] mb-4 !text-lg">
                  Company
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Our Story
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="#"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Press
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="heading-quaternary !text-[#c5a46d] !text-lg">
                Get in Touch
              </h3>
              <div className="space-y-2">
                <p className="flex items-center gap-3">
                  <span className="text-[#c5a46d]">📍</span>
                  <span>Sangariya, Jodhpur, Rajasthan</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#c5a46d]">📞</span>
                  <span>+91 8769096165</span>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#c5a46d]">✉️</span>
                  <span>example@themarwaribros.com</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-[#f9f9f9]/10 backdrop-blur-sm rounded-2xl p-8 border border-[#c5a46d]/20">
            <div className="mb-6">
              <h2 className="heading-secondary !text-[#c5a46d] !text-2xl mb-2">
                Let's Create Something Beautiful
              </h2>
              <p className="paragraph-small !text-[#f9f9f9]/80">
                Share your vision with us and we'll bring it to life
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your Name"
                    required
                    className="w-full px-4 py-3 bg-[#f9f9f9]/5 border border-[#c5a46d]/30 rounded-lg text-[#f9f9f9] placeholder-[#f9f9f9]/60 focus:border-[#c5a46d] focus:outline-none focus:ring-2 focus:ring-[#c5a46d]/20 transition-all duration-300"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Your Email"
                    required
                    className="w-full px-4 py-3 bg-[#f9f9f9]/5 border border-[#c5a46d]/30 rounded-lg text-[#f9f9f9] placeholder-[#f9f9f9]/60 focus:border-[#c5a46d] focus:outline-none focus:ring-2 focus:ring-[#c5a46d]/20 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 bg-[#f9f9f9]/5 border border-[#c5a46d]/30 rounded-lg text-[#f9f9f9] placeholder-[#f9f9f9]/60 focus:border-[#c5a46d] focus:outline-none focus:ring-2 focus:ring-[#c5a46d]/20 transition-all duration-300"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about your requirements..."
                  rows="4"
                  required
                  className="w-full px-4 py-3 bg-[#f9f9f9]/5 border border-[#c5a46d]/30 rounded-lg text-[#f9f9f9] placeholder-[#f9f9f9]/60 focus:border-[#c5a46d] focus:outline-none focus:ring-2 focus:ring-[#c5a46d]/20 transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-[#c5a46d] text-[#001238] py-3 px-6 rounded-lg font-semibold hover:bg-[#d4b578] transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Send Message
              </button>
            </form>

            <div className="mt-8 pt-6 border-t border-[#c5a46d]/20">
              <div className="flex justify-center space-x-6">
                <Link
                  to="#"
                  className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </Link>
                <Link
                  to="#"
                  className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                >
                  <span className="sr-only">WhatsApp</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.889 3.386" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#c5a46d]/20 py-6">
          <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center max-w-7xl">
            <div className="text-[#f9f9f9]/70 text-sm mb-4 md:mb-0">
              © 2025 The Marwari Brothers. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link
                to="#"
                className="text-[#f9f9f9]/70 hover:text-[#c5a46d] transition-colors duration-300"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-[#f9f9f9]/70 hover:text-[#c5a46d] transition-colors duration-300"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-[#f9f9f9]/70 hover:text-[#c5a46d] transition-colors duration-300"
              >
                Shipping Info
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
