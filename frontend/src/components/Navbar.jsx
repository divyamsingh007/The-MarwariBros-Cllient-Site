import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div>
      <nav className="z-50 w-full bg-[#F9F9F9] border-b-2 border-black fixed top-0 left-0 mt-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
            

            <div className="nav-logo-name flex-1 md:flex-none text-center md:text-left">
              <h1 className="heading-primary !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl">
                The MarwariBros
              </h1>
            </div>

            <div className="nav-logo-items hidden md:block">
              <ul className="flex items-center gap-4 lg:gap-7">
                <li>
                  <Link
                    to={"/"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <h3 className="heading-quaternary !text-sm lg:!text-xl">
                      Home
                    </h3>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/about"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <h3 className="heading-quaternary !text-sm lg:!text-xl">
                      About Us
                    </h3>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/collections"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <h3 className="heading-quaternary !text-sm lg:!text-xl">
                      Collections
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
    </div>
  );
}
