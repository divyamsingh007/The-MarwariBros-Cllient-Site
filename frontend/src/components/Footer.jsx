import React, { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";

// EmailJS Configuration - Replace these with your actual EmailJS credentials
// 1. Go to https://www.emailjs.com/ and create a free account
// 2. Add an email service (Gmail, Outlook, etc.)
// 3. Create an email template with variables: {{from_name}}, {{from_email}}, {{phone}}, {{message}}
// 4. Replace the values below with your Service ID, Template ID, and Public Key
const EMAILJS_SERVICE_ID = "service_lpnsr9s";
const EMAILJS_TEMPLATE_ID = "template_adedjqa";
const EMAILJS_PUBLIC_KEY = "166XiT9IgMZxq5YNt";

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, phone, message } = formData;

    const templateParams = {
      from_name: name,
      from_email: email,
      phone: phone || "Not provided",
      message: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "Not provided"}\n\nMessage:\n${message}`,
      to_email: "legendprice007@gmail.com",
    };

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY,
      );
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error(
        "Failed to send message. Please try again or contact us directly.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="min-h-[60vh] lg:min-h-screen bg-[#001238] text-[#f9f9f9] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 border border-[#c5a46d] rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-[#c5a46d] rotate-12"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 border border-[#c5a46d] rotate-45"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 border border-[#c5a46d] rotate-12"></div>
      </div>

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex-1 container mx-auto px-4 sm:px-6 py-8 sm:py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center max-w-7xl">
          <div
            className="space-y-8"
            data-aos="fade-right"
            data-aos-duration="800"
          >
            <div className="space-y-6">
              <h1 className="heading-primary !text-[#f9f9f9] !text-4xl lg:!text-5xl">
                TheMarwariBrothers
              </h1>
              <div className="heading-tertiary !text-[#c5a46d] !text-xl">
                Crafting Legacy, One Thread at a Time
              </div>
              <p className="paragraph !text-[#f9f9f9] !text-lg max-w-lg leading-relaxed">
                Experience the finest in traditional Marwari craftsmanship. From
                bespoke garments to exquisite jewellery, we bring heritage to
                life with modern elegance.
              </p>
            </div>

            {/* <div className="grid grid-cols-2 gap-8">
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
                      to="/collections?category=jewelry"
                      className="text-[#f9f9f9] hover:text-[#c5a46d] transition-colors duration-300"
                    >
                      Jewellery
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
            </div> */}

            <div
              className="space-y-4"
              data-aos="fade-up"
              data-aos-duration="800"
              data-aos-delay="100"
            >
              <h3 className="heading-quaternary !text-[#c5a46d] !text-lg">
                Get in Touch
              </h3>
              <div className="space-y-2">
                <p className="flex items-center gap-3">
                  <span className="text-[#c5a46d]">📍</span>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=P%20no.%2072%2C%20near%20DPS%20Pal%2C%20Jinishver%20Nagar%2C%20Dhinana%20ki%20Dhani%2C%20Jodhpur%2C%20342001"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#c5a46d] transition-colors duration-300"
                  >
                    P no. 72, near DPS Pal, Jinishver Nagar, Dhinana ki Dhani,
                    Jodhpur, 342001
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#c5a46d]">📞</span>
                  <a
                    href="tel:+916376504188"
                    className="hover:text-[#c5a46d] transition-colors duration-300"
                  >
                    +91 6376504188
                  </a>
                  <span className="text-[#f9f9f9]/60"> / </span>
                  <a
                    href="tel:+918769096165"
                    className="hover:text-[#c5a46d] transition-colors duration-300"
                  >
                    8769096165
                  </a>
                </p>
                <p className="flex items-center gap-3">
                  <span className="text-[#c5a46d]">✉️</span>
                  <a
                    href="mailto:contact@themarwaribrothers.com"
                    className="hover:text-[#c5a46d] transition-colors duration-300"
                  >
                    contact@themarwaribrothers.com
                  </a>
                </p>
              </div>
            </div>
          </div>

          <div
            className="relative"
            data-aos="fade-left"
            data-aos-duration="800"
          >
            {/* Minimal decorative accent */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-l-2 border-t-2 border-[#c5a46d]/40"></div>
            <div className="absolute -bottom-4 -right-4 w-16 h-16 border-r-2 border-b-2 border-[#c5a46d]/40"></div>

            <div className="bg-gradient-to-br from-[#f9f9f9]/[0.03] to-transparent backdrop-blur-sm p-10 lg:p-12">
              {/* Header */}
              <div className="mb-10">
                <span className="text-[#c5a46d] text-sm font-medium tracking-[0.2em] uppercase">
                  Contact
                </span>
                <h2 className="text-[#f9f9f9] text-3xl lg:text-4xl font-light mt-2 leading-tight">
                  Let's Connect
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Name & Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Name"
                      required
                      className="w-full bg-transparent border-b border-[#f9f9f9]/20 py-3 text-[#f9f9f9] placeholder-[#f9f9f9]/40 focus:border-[#c5a46d] focus:outline-none transition-colors duration-500 text-base"
                    />
                  </div>
                  <div className="group">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Email"
                      required
                      className="w-full bg-transparent border-b border-[#f9f9f9]/20 py-3 text-[#f9f9f9] placeholder-[#f9f9f9]/40 focus:border-[#c5a46d] focus:outline-none transition-colors duration-500 text-base"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone"
                    className="w-full bg-transparent border-b border-[#f9f9f9]/20 py-3 text-[#f9f9f9] placeholder-[#f9f9f9]/40 focus:border-[#c5a46d] focus:outline-none transition-colors duration-500 text-base"
                  />
                </div>

                {/* Message */}
                <div className="group">
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Your message...(Tell us all about your wedding plans or custom outfit ideas! Share the details of occasion, your style preferences, and any specific requirements you have in mind.)"
                    rows="3"
                    required
                    className="w-full bg-transparent border-b border-[#f9f9f9]/20 py-3 text-[#f9f9f9] placeholder-[#f9f9f9]/40 focus:border-[#c5a46d] focus:outline-none transition-colors duration-500 text-base resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group relative inline-flex items-center gap-3 text-[#c5a46d] font-medium tracking-wide hover:text-[#f9f9f9] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                    {!isSubmitting && (
                      <svg
                        className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    )}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#c5a46d] group-hover:w-full transition-all duration-500"></span>
                  </button>
                </div>
              </form>

              {/* Social Links */}
              <div className="mt-12 pt-8 border-t border-[#f9f9f9]/10">
                <div className="flex items-center gap-6">
                  <span className="text-[#f9f9f9]/40 text-sm">Follow us</span>
                  <div className="flex gap-4">
                    <a
                      href="https://instagram.com/themarwaribrothers"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-[#f9f9f9]/20 flex items-center justify-center text-[#f9f9f9]/60 hover:border-[#c5a46d] hover:text-[#c5a46d] transition-all duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    <a
                      href="https://wa.me/916376504188"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full border border-[#f9f9f9]/20 flex items-center justify-center text-[#f9f9f9]/60 hover:border-[#c5a46d] hover:text-[#c5a46d] transition-all duration-300"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.889 3.386" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
