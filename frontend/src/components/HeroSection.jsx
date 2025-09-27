import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <main>
      <nav className="z-50 w-full bg-[#F9F9F9] border-b-2 border-black fixed top-0 left-0 mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
            <div className="nav-contact-us hidden md:block">
              <Link className="flex items-baseline gap-2 lg:gap-2 hover:opacity-80 transition-opacity">
                <span className="text-lg lg:text-xl">+</span>
                <h2 className="heading-quaternary !text-sm lg:!text-base">
                  Contact Us
                </h2>
              </Link>
            </div>

            <div className="nav-logo-name flex-1 md:flex-none text-center md:text-left">
              <h1 className="heading-primary !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl">
                The MarwariBros
              </h1>
            </div>

            <div className="nav-logo-items hidden md:block">
              <ul className="flex items-center gap-4 lg:gap-7">
                <li>
                  <Link className="hover:opacity-80 transition-opacity">
                    <h3 className="heading-quaternary !text-sm lg:!text-base">
                      Home
                    </h3>
                  </Link>
                </li>
                <li>
                  <Link className="hover:opacity-80 transition-opacity">
                    <h3 className="heading-quaternary !text-sm lg:!text-base">
                      About Us
                    </h3>
                  </Link>
                </li>
              </ul>
            </div>

            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="w-6 h-6 flex flex-col justify-center items-center">
                <span
                  className={`bg-[#001238] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen
                      ? "rotate-45 translate-y-1"
                      : "-translate-y-0.5"
                  }`}
                ></span>
                <span
                  className={`bg-[#001238] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                ></span>
                <span
                  className={`bg-[#001238] block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                    isMobileMenuOpen
                      ? "-rotate-45 -translate-y-1"
                      : "translate-y-0.5"
                  }`}
                ></span>
              </div>
            </button>
          </div>

          <div
            className={`md:hidden transition-all duration-300 ease-in-out ${
              isMobileMenuOpen
                ? "max-h-48 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <div className="px-2 pt-2 pb-4 space-y-3 border-t border-gray-200">
              <Link
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h3 className="heading-quaternary !text-base">Home</h3>
              </Link>
              <Link
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h3 className="heading-quaternary !text-base">About Us</h3>
              </Link>
              <Link
                className="flex items-center gap-3 px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>+</span>
                <h3 className="heading-quaternary !text-base">Contact Us</h3>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <header className="min-h-screen w-full bg-[#001238] relative overflow-hidden mt-16 flex items-center justify-around">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 border border-[#c5a46d] rotate-45 hidden lg:block"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-[#c5a46d] rotate-12 hidden lg:block"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 border border-[#c5a46d] rotate-45 hidden md:block"></div>
        </div>

        <div className="relative z-10 min-h-screen flex items-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center min-h-[calc(100vh-120px)] pt-16 sm:pt-20 md:pt-24 lg:pt-8">
              <div className="lg:col-span-5 xl:col-span-4 order-2 lg:order-1 lg:flex justify-center lg:justify-start hidden">
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-2xl shadow-2xl transform transition-transform duration-500 group-hover:scale-105">
                    <img
                      src="/Dress-01.jpg"
                      alt="Marwari Brothers Traditional Wear"
                      className="w-64 h-80 sm:w-72 sm:h-96 md:w-80 md:h-[26rem] lg:w-72 lg:h-[28rem] xl:w-80 xl:h-[32rem] object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#001238]/20 via-transparent to-transparent"></div>
                  </div>

                  <div className="absolute -inset-2 border border-[#c5a46d]/30 rounded-2xl -z-10 transform rotate-3 transition-transform duration-500 group-hover:rotate-6"></div>
                </div>
              </div>

              <div className="lg:col-span-7 xl:col-span-8 order-1 lg:order-2 text-center lg:text-left space-y-6 sm:space-y-8 lg:space-y-10">
                <div className="space-y-4 lg:space-y-6">
                  <h1 className="heading-primary !text-[#F9F9F9] !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl xl:!text-8xl !leading-tight">
                    The MarwariBros
                  </h1>

                  <h2 className="heading-tertiary !text-lg sm:!text-xl md:!text-2xl lg:!text-3xl xl:!text-4xl !leading-relaxed">
                    The Legacy & Suit Is What We Wear
                  </h2>
                </div>

                <div className="space-y-4">
                  <p className="paragraph !text-[#F9F9F9] !text-base sm:!text-lg md:!text-xl lg:!text-xl xl:!text-2xl !leading-relaxed max-w-none lg:max-w-2xl opacity-90">
                    At The Marwari Brothers, what you see is just the beginning.
                  </p>
                  <p className="paragraph !text-[#F9F9F9] !text-sm sm:!text-base md:!text-lg lg:!text-lg xl:!text-xl !leading-relaxed max-w-none lg:max-w-3xl opacity-80">
                    We craft bespoke outfits and accessories, from talwars and
                    katars to handcrafted safas and jewellery, each piece
                    tailored to your story and event.
                  </p>
                </div>

                <div className="pt-4 sm:pt-6 lg:pt-8">
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center lg:items-start lg:justify-start">
                    <div className="relative w-full sm:w-auto sm:flex-1 lg:flex-initial">
                      <input
                        type="text"
                        placeholder="Search collections..."
                        className="w-full sm:w-80 lg:w-72 xl:w-80 py-3 sm:py-4 px-5 pr-14 rounded-full bg-[#F9F9F9] text-[#001238] placeholder-[#0D0D0D] outline-none focus:ring-4 focus:ring-[#c5a46d]/30 transition-all duration-300 text-sm sm:text-base lg:text-lg shadow-lg backdrop-blur-sm"
                      />
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#001238] text-white rounded-full p-2.5 sm:p-3 hover:bg-[#001f50] hover:scale-110 transition-all duration-300 cursor-pointer shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4 sm:h-5 sm:w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                          />
                        </svg>
                      </button>
                    </div>

                    <button className="bg-[#c5a46d] text-[#001238] py-3 sm:py-4 px-8 sm:px-10 lg:px-12 rounded-full font-bold shadow-xl hover:shadow-2xl transition-all duration-300 text-base sm:text-lg lg:text-xl hover:scale-105 hover:bg-[#d4b578] transform whitespace-nowrap">
                      Explore Collection
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
