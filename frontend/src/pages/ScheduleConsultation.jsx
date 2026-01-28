import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ScheduleConsultation() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    preferredDate: "",
    preferredTime: "",
    services: [],
    budget: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const serviceOptions = [
    { id: "sherwani", label: "Sherwani & Groom Wear" },
    { id: "lehenga", label: "Bridal Lehenga & Women's Wear" },
    { id: "jewellery", label: "Traditional Jewellery" },
    { id: "footwear", label: "Juttis & Footwear" },
    { id: "accessories", label: "Accessories (Safa, Katar, etc.)" },
    { id: "complete", label: "Complete Wedding Ensemble" },
  ];

  const eventTypes = [
    "Wedding",
    "Engagement",
    "Reception",
    "Sangeet",
    "Mehendi",
    "Anniversary",
    "Festival Celebration",
    "Other",
  ];

  const budgetRanges = [
    "₹25,000 - ₹50,000",
    "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹2,50,000",
    "₹2,50,000 - ₹5,00,000",
    "₹5,00,000+",
    "Flexible / To be discussed",
  ];

  const timeSlots = [
    "10:00 AM - 12:00 PM",
    "12:00 PM - 2:00 PM",
    "2:00 PM - 4:00 PM",
    "4:00 PM - 6:00 PM",
    "6:00 PM - 8:00 PM",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleServiceToggle = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Consultation Request:", formData);
    setIsSubmitting(false);
    setSubmitSuccess(true);

    // Reset form after success
    setTimeout(() => {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        eventType: "",
        eventDate: "",
        preferredDate: "",
        preferredTime: "",
        services: [],
        budget: "",
        message: "",
      });
    }, 500);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-[#f9f9f9] page-fade-in">
        <Navbar />
        <section className="mt-16 pt-24 md:pt-32 pb-16 min-h-[80vh] flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <div className="w-24 h-24 bg-[#c5a46d] rounded-full flex items-center justify-center mx-auto mb-8">
                <svg
                  className="w-12 h-12 text-[#001238]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="heading-primary !text-3xl sm:!text-4xl md:!text-5xl mb-6">
                Thank You!
              </h1>
              <h2 className="heading-tertiary !text-xl sm:!text-2xl mb-6">
                Your Consultation Request Has Been Received
              </h2>
              <p className="paragraph !text-lg mb-8">
                Our team will review your request and contact you within 24-48
                hours to confirm your consultation appointment. We look forward
                to crafting your legacy together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="bg-[#c5a46d] text-[#001238] py-3 px-8 rounded-full font-bold text-lg hover:bg-[#d4b578] transform hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  Schedule Another
                </button>
                <button
                  onClick={() => navigate("/collections")}
                  className="border-2 border-[#001238] text-[#001238] py-3 px-8 rounded-full font-bold text-lg hover:bg-[#001238] hover:text-[#f9f9f9] transition-all duration-300"
                >
                  Browse Collections
                </button>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9f9f9] page-fade-in">
      <Navbar />

      {/* Hero Section */}
      <section className="mt-16 pt-24 md:pt-32 pb-16 bg-[#001238] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 border border-[#c5a46d] rotate-45"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-[#c5a46d] rotate-12"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 border border-[#c5a46d] rotate-45"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-primary !text-[#f9f9f9] !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl mb-6">
              Schedule Consultation
            </h1>
            <h2 className="heading-tertiary !text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl mb-8">
              Begin Your Bespoke Journey
            </h2>
            <p className="paragraph !text-[#f9f9f9] !text-lg sm:!text-xl md:!text-2xl max-w-3xl mx-auto opacity-90">
              Experience personalized attention from our master craftsmen. Share
              your vision, and let us transform it into a masterpiece that
              reflects your heritage and individuality.
            </p>
          </div>
        </div>
      </section>

      {/* Consultation Benefits */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Personal Attention",
                description:
                  "One-on-one sessions with our expert designers who understand your unique style and requirements.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                ),
              },
              {
                title: "Curated Experience",
                description:
                  "Explore our exclusive fabric library, design archives, and get expert guidance on traditional motifs.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                ),
              },
              {
                title: "No Obligation",
                description:
                  "Our consultations are complimentary. Discuss your vision freely without any commitment.",
                icon: (
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                ),
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-xl shadow-lg border border-[#c5a46d]/20"
              >
                <div className="w-16 h-16 bg-[#001238] text-[#c5a46d] rounded-full flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="heading-quaternary !text-xl mb-3">
                  {benefit.title}
                </h3>
                <p className="paragraph-small !text-[#666]">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-20 bg-[#001238]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-primary !text-[#f9f9f9] mb-4">
                Request Your Consultation
              </h2>
              <h3 className="heading-tertiary !text-[#c5a46d] mb-6">
                Tell Us About Your Vision
              </h3>
              <p className="paragraph !text-[#f9f9f9] !text-lg max-w-2xl mx-auto opacity-80">
                Fill out the form below with your details and preferences. Our
                team will reach out to confirm your appointment.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Personal Information */}
              <div className="bg-[#f9f9f9]/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#c5a46d]/20">
                <h4 className="heading-quaternary !text-[#c5a46d] !text-xl mb-6">
                  Personal Information
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Full Name <span className="text-[#c5a46d]">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Email Address <span className="text-[#c5a46d]">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Phone Number <span className="text-[#c5a46d]">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                </div>
              </div>

              {/* Event Details */}
              <div className="bg-[#f9f9f9]/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#c5a46d]/20">
                <h4 className="heading-quaternary !text-[#c5a46d] !text-xl mb-6">
                  Event Details
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Event Type <span className="text-[#c5a46d]">*</span>
                    </label>
                    <select
                      name="eventType"
                      value={formData.eventType}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                    >
                      <option value="">Select event type</option>
                      {eventTypes.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="eventDate"
                      value={formData.eventDate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Services Required */}
              <div className="bg-[#f9f9f9]/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#c5a46d]/20">
                <h4 className="heading-quaternary !text-[#c5a46d] !text-xl mb-6">
                  Services Required{" "}
                  <span className="text-[#f9f9f9]/60 text-sm font-normal">
                    (Select all that apply)
                  </span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {serviceOptions.map((service) => (
                    <label
                      key={service.id}
                      className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer transition-all duration-300 ${
                        formData.services.includes(service.id)
                          ? "bg-[#c5a46d] text-[#001238]"
                          : "bg-[#f9f9f9]/5 text-[#f9f9f9] hover:bg-[#f9f9f9]/10"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.services.includes(service.id)}
                        onChange={() => handleServiceToggle(service.id)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                          formData.services.includes(service.id)
                            ? "border-[#001238] bg-[#001238]"
                            : "border-[#c5a46d]"
                        }`}
                      >
                        {formData.services.includes(service.id) && (
                          <svg
                            className="w-3 h-3 text-[#c5a46d]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium">{service.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Consultation Preferences */}
              <div className="bg-[#f9f9f9]/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#c5a46d]/20">
                <h4 className="heading-quaternary !text-[#c5a46d] !text-xl mb-6">
                  Consultation Preferences
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Preferred Date <span className="text-[#c5a46d]">*</span>
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Preferred Time Slot{" "}
                      <span className="text-[#c5a46d]">*</span>
                    </label>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                    >
                      <option value="">Select time slot</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                      Budget Range
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors"
                    >
                      <option value="">Select budget range</option>
                      {budgetRanges.map((range) => (
                        <option key={range} value={range}>
                          {range}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Message */}
              <div className="bg-[#f9f9f9]/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-[#c5a46d]/20">
                <h4 className="heading-quaternary !text-[#c5a46d] !text-xl mb-6">
                  Additional Details
                </h4>
                <div>
                  <label className="block text-[#f9f9f9] text-sm font-medium mb-2">
                    Tell us about your vision
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg bg-[#f9f9f9] text-[#001238] border-2 border-transparent focus:border-[#c5a46d] focus:outline-none transition-colors resize-none"
                    placeholder="Share any specific requirements, design inspirations, color preferences, or questions you may have. The more details you provide, the better we can prepare for your consultation..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#c5a46d] text-[#001238] py-4 px-12 rounded-full font-bold text-lg transform transition-all duration-300 shadow-xl ${
                    isSubmitting
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:bg-[#d4b578] hover:scale-105"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-3">
                      <svg
                        className="animate-spin h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Request Consultation"
                  )}
                </button>
                <p className="paragraph-small !text-[#f9f9f9]/60 mt-4">
                  We typically respond within 24-48 hours
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-[#f9f9f9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="heading-primary mb-4">
                Prefer to Reach Out Directly?
              </h2>
              <p className="paragraph !text-lg">
                Feel free to contact us through any of the following channels
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-[#001238] text-[#c5a46d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <h4 className="heading-quaternary !text-lg mb-2">Phone</h4>
                <p className="paragraph-small !text-[#666]">
                  +91 6376504188 / 8769096165
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-14 h-14 bg-[#001238] text-[#c5a46d] rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h4 className="heading-quaternary !text-lg mb-2">Email</h4>
                <p className="paragraph-small !text-[#666]">
                  contact@themarwaribrothers.com
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
