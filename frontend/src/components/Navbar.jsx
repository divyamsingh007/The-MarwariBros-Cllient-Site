import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { FiHeart } from "react-icons/fi";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { wishlistCount } = useWishlist();

  return (
    <div>
      <nav className="z-50 w-full bg-[#F9F9F9] border-b-2 border-black fixed top-0 left-0 -mt-12 navbar-slide-down">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4 md:py-6 lg:py-8">
            <div className="nav-logo-name flex-1 md:flex-none text-center md:text-left navbar-logo-animate">
              <h1 className="heading-primary !text-2xl sm:!text-3xl md:!text-4xl lg:!text-5xl">
                The MarwariBros
              </h1>
            </div>

            <div className="nav-logo-items hidden md:block">
              <ul className="flex items-center gap-9 lg:gap-7">
                <li
                  className="navbar-link-animate"
                  style={{ animationDelay: "0.2s" }}
                >
                  <Link
                    to={"/"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <h3 className="heading-quaternary !text-sm lg:!text-xl">
                      Home
                    </h3>
                  </Link>
                </li>
                <li
                  className="navbar-link-animate"
                  style={{ animationDelay: "0.3s" }}
                >
                  <Link
                    to={"/about"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <h3 className="heading-quaternary !text-sm lg:!text-xl">
                      About Us
                    </h3>
                  </Link>
                </li>
                <li
                  className="navbar-link-animate"
                  style={{ animationDelay: "0.4s" }}
                >
                  <Link
                    to={"/collections"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <h3 className="heading-quaternary !text-sm lg:!text-xl">
                      Collections
                    </h3>
                  </Link>
                </li>
                <li
                  className="navbar-link-animate"
                  style={{ animationDelay: "0.5s" }}
                >
                  <Link
                    to={"/admin"}
                    className="hover:opacity-80 transition-opacity"
                  >
                    <h3 className="heading-quaternary !text-sm lg:!text-xl">
                      Admin
                    </h3>
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/wishlist"}
                    className="hover:opacity-80 transition-opacity relative"
                  >
                    <FiHeart className="text-xl lg:text-2xl" />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>
                </li>
              </ul>
            </div>

            <button
              className="md:hidden p-2 rounded-md hover:bg-gray-100 transition-colors navbar-hamburger-animate"
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
                to={"/"}
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h3 className="heading-quaternary !text-base">Home</h3>
              </Link>
              <Link
                to={"/about"}
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h3 className="heading-quaternary !text-base">About Us</h3>
              </Link>
              <Link
                to={"/collections"}
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h3 className="heading-quaternary !text-base">Collections</h3>
              </Link>
              <Link
                to={"/admin"}
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <h3 className="heading-quaternary !text-base">Admin</h3>
              </Link>
              <Link
                to={"/wishlist"}
                className="block px-3 py-2 hover:bg-gray-100 rounded-md transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <h3 className="heading-quaternary !text-base">Wishlist</h3>
                  {wishlistCount > 0 && (
                    <span className="bg-red-500 text-white text-xs rounded-full px-2 py-0.5">
                      {wishlistCount}
                    </span>
                  )}
                </div>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
