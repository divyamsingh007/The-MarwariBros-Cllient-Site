import React from "react";
import { Link } from "react-router-dom";

export default function SecondSection() {
  const categories = [
    {
      title: "Men's Collection",
      subtitle: "Traditional & Contemporary",
      description:
        "Exquisite sherwanis, kurtas, and tailored suits crafted with precision",
      backgroundImage:
        "https://lh3.googleusercontent.com/sitesv/AICyYda6Hmw2Aqn8e-gE-mgcQ5Xukua_1iOgY3VMpEZ_ujbyR7eq6UY6LPDFKfT2SBRa7kenF3R3xaiadl_Qxu3i0mSlSfB6vPk4LrgCHFa62dG0nVyMxKsJJR22SyKk_0nqBQjS3sIL7eMIIwq-rHHeH6WRGsd-PJs0XOoxaRj3aoaHrwQr_zvFend0Xah9KHf8BOyaev9wFfNLMVLosFwzhAgSNdq9KkskMx8oV0Y=w1280",
    },
    {
      title: "Women's Collection",
      subtitle: "Elegant & Timeless",
      description:
        "Beautiful lehengas, sarees, and designer outfits for every occasion",
      backgroundImage:
        "https://lh3.googleusercontent.com/sitesv/AICyYdZ2nzZmG7BeXS5ru6OMEddG0xY8B1TIAE1Mu4FzMwfS_ZeVLj_owScPnkF570_6arD9Lkr3SeD2mkCxY8GWnq3i-GNbGbB6j5LtsjWyXAd6fIfVj5BKXXXsUaW-8jy3LabgZ1oOm1beFg1stayGxziw6qK2dsdMosgu9RWDxvU5sq1Rd624V_gIxBAHukvmqgeJgHx9OYToozV3ydCYQ32IHAcxmANY9Hcc=w1280",
    },
    {
      title: "Jewellery",
      subtitle: "Heritage & Modern",
      description:
        "Handcrafted pieces that blend traditional artistry with contemporary design",
      backgroundImage:
        "https://lh3.googleusercontent.com/sitesv/AICyYdb6LV-V7WbAT7pKUpDfqL015MQOavvmGzx-YyEHx4NtiGJyHVq-rMVO-Vsw2nQOVMgNvCYHx0PbKx1SpJM1okmBa04jTF_UxNXWMJ_F66HUBmXgcyW7tH1OTs3Vm19xRqhQPEZf11nonueGfP6f08HkVBB48_7xJzZRo5zBvlPAeqKvMY7RyY7aqMFc62dLUv5BJXswYhoPyblrUVM1x6ixX8cN57TZNCj0_Fk=w1280",
    },
    {
      title: "Juttis & Footwear",
      subtitle: "Comfort & Style",
      description: "Authentic handmade juttis and premium footwear collection",
      backgroundImage:
        "https://lh3.googleusercontent.com/sitesv/AICyYdaLU9WItsCb4PhoaQknfb_OYXaw4GtPSyTvaKMFrglpnWWKr-kRAMQA0qnmobGUKFX80gzCBWcX9gdDUhVq9vYpoScNiPWzY7_dgmaus609Qd5sEk_v_LcJPXokQ5ZaRUxAdPN0EqZ5cMqa1MX2mJvpAzMvwmeZczn82LTB5D2s9gGy8yuesiG9vnRWFOQzouEy9aP66dhQ06UKq2PppxY9AuBJZq08cyguNS0=w1280",
    },
  ];

  return (
    <main id="second-section" className="py-16 px-6 md:px-12 lg:px-24">
      <div className="heading-primary text-center mb-16">
        Discover the Legacy of Marwari Craftsmanship
      </div>

      <Link to={"/collections"}>
        <div className="grid-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <div
              key={index}
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
      </Link>

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
