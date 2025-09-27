import React from "react";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <main>
      <nav className="z-50 w-full bg-[#F9F9F9] flex items-center justify-around pt-16 border-b-2 border-black fixed">
        <div className="nav-contact-us">
          <Link className=" flex gap-3">
            <span>+</span>
            <h2 className="heading-quaternary">Contact Us</h2>
          </Link>
        </div>
        <div className="nav-logo-name">
          <h1 className="heading-primary" >The MarwariBros</h1>
        </div>
        <div className="nav-logo-items">
          <ul className="flex items-center gap-7">
            <li>
              <Link>
                <h3 className="heading-quaternary">Home</h3>
              </Link>
            </li>
            <li>
              <Link>
                <h3 className="heading-quaternary">About Us</h3>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      <header className="h-screen pt-29 w-full bg-[#001238] overflow-hidden flex items-center-safe justify-around">
        <div className="header-img-container">
          <img src="/Dress-01.jpg" alt="" />
        </div>
        <div className="header-text-container text-right w-2/3 px-16">
          <h1 className="heading-primary !text-[#F9F9F9]">The MarwariBros</h1>
          <h2 className="heading-tertiary ">
            The Legacy & Suit Is What We Wear
          </h2>
          <p className="paragraph !text-[#F9F9F9] mt-12">
            At The Marwari Brothers, what you see is just the beginning. We
            craft bespoke outfits and accessories, from talwars and katars to
            handcrafted safas and jewellery, each piece tailored to your story
            and event. Connect with us to schedule a private consultation or
            place your order.
          </p>
          <div className="header-call-to-action mt-16">
            <div className="flex flex-col gap-4 items-end">
              <div className="relative w-64">
                <input
                  type="text"
                  placeholder="Search collections..."
                  className="w-full py-2 px-4 pr-12 rounded-full bg-[#F9F9F9] text-[#001238] placeholder-[#0D0D0D] outline-none focus:ring-2 focus:ring-[#c5a46d] transition-all"
                />
                <button className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-[#001238] text-white rounded-full p-2 hover:bg-[#001f50] transition-colors cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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

              <button className="bg-white text-[#001238] py-2 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer">
                Explore Collection
              </button>
            </div>
          </div>
        </div>
      </header>
    </main>
  );
}
