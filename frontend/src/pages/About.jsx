import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function About() {
  const teamMembers = [
    {
      name: "Rajesh Marwari",
      role: "Master Craftsman & Founder",
      experience: "35+ Years",
      specialty: "Traditional Embroidery & Sherwanis",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Priya Marwari",
      role: "Design Director",
      experience: "20+ Years",
      specialty: "Women's Ethnic Wear & Jewellery Design",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    },
    {
      name: "Arjun Singh",
      role: "Heritage Specialist",
      experience: "15+ Years",
      specialty: "Footwear & Traditional Accessories",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    },
  ];

  const milestones = [
    {
      year: "1985",
      event: "Foundation",
      description: "Started as a small family business in Rajasthan",
    },
    {
      year: "1995",
      event: "Expansion",
      description: "Opened our first flagship store in Delhi",
    },
    {
      year: "2005",
      event: "Innovation",
      description:
        "Introduced modern techniques with traditional craftsmanship",
    },
    {
      year: "2015",
      event: "Recognition",
      description: "Awarded 'Best Traditional Wear Brand' by Fashion Council",
    },
    {
      year: "2025",
      event: "Digital Era",
      description: "Launched online platform to reach global customers",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f9f9] page-fade-in">
      <Navbar></Navbar>

      <section className="mt-16 pt-24 md:pt-32 pb-16 bg-[#001238] relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-20 h-20 border border-[#c5a46d] rotate-45"></div>
          <div className="absolute top-40 right-20 w-16 h-16 border border-[#c5a46d] rotate-12"></div>
          <div className="absolute bottom-40 left-1/4 w-12 h-12 border border-[#c5a46d] rotate-45"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="heading-primary !text-[#f9f9f9] !text-4xl sm:!text-5xl md:!text-6xl lg:!text-7xl mb-6">
              Our Legacy
            </h1>
            <h2 className="heading-tertiary !text-xl sm:!text-2xl md:!text-3xl lg:!text-4xl mb-8">
              Four Decades of Craftsmanship Excellence
            </h2>
            <p className="paragraph !text-[#f9f9f9] !text-lg sm:!text-xl md:!text-2xl max-w-3xl mx-auto opacity-90">
              From humble beginnings in the heart of Rajasthan to becoming a
              symbol of traditional Indian craftsmanship, our journey is woven
              with threads of passion, dedication, and unwavering commitment to
              excellence.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h2 className="heading-primary mb-4">About Us</h2>
                <h3 className="heading-tertiary mb-6">
                  Custodians of a Royal Legacy
                </h3>
              </div>
              <div className="space-y-6">
                <p className="paragraph !text-lg">
                  At The Marwari Brothers, we understand that your wedding is
                  not merely an event; it is the culmination of your legacy—a
                  moment where heritage meets the future. For those who seek to
                  adorn this moment with more than opulence—with authentic
                  narrative and uncompromised artistry— your journey ends here.
                </p>

                <p className="paragraph !text-lg">
                  We are not a brand; we are a curated collective. A
                  meticulously assembled atelier of Rajasthan’s most revered,
                  multi-generational master karigars—artisans whose hands have
                  shaped elegance for royal families and whose legacies are
                  woven into the very fabric of Jodhpur’s history. These are not
                  just anonymous tailors; we have partnered with them to bring
                  their genius to your story.
                </p>

                <h3 className="paragraph !text-lg !font-bold">
                  The TMB Promise: Seamless, End-to-End Excellence
                </h3>

                <p className="paragraph !text-lg">
                  We solve the fundamental inconvenience faced by the
                  discerning: the arduous task of sourcing the finest elements
                  from scattered corners of the country. Why journey to Jodhpur
                  for footwear, Surat for fabrics, and Jaipur for jewellery,
                  acting as your own quality curator?
                </p>

                <p className="paragraph !text-lg">
                  The Marwari Brothers offers an unparalleled, end-to-end
                  experience. From the initial sketch of your bespoke sherwani
                  or bridal lehenga to the final placement of a handcrafted
                  katar or the fold of a regal safa, every element is conceived,
                  crafted, and delivered under one trusted standard of
                  excellence. We are your single point of contact for an empire
                  of craftsmanship.
                </p>

                <h3 className="paragraph !text-lg !font-bold">
                  The ‘Amul of Tailoring’: A Standard of Trust
                </h3>

                <p className="paragraph !text-lg">
                  In a world of mass-produced luxury, we are building what
                  ‘Amul’ is to dairy—a household name synonymous with
                  authenticity, quality, and trust. This is our guiding
                  principle. It means that when you wear a TMB creation, you are
                  not wearing a label; you are wearing a promise. A promise of
                  heritage-driven design, of fabrics that speak of richness, and
                  of stitches that hold a legacy.
                </p>

                <h3 className="paragraph !text-lg !font-bold">
                  Your Wedding, Our Heritage
                </h3>

                <p className="paragraph !text-lg">
                  We invite you to not just wear an outfit, but to inherit a
                  narrative. Let us be the custodians of your appearance on the
                  most important day of your life. Entrust us with the craft, so
                  you can focus on the celebration.
                </p>

                <p className="paragraph !text-lg">
                  To begin the conversation about crafting your legacy, we
                  invite you to schedule a private consultation.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=700&fit=crop"
                  alt="Traditional craftsmanship workshop"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001238]/30 via-transparent to-transparent"></div>
              </div>
              {/* <div className="absolute -bottom-4 -right-4 w-24 h-24 border-2 border-[#c5a46d] rounded-full bg-[#f9f9f9] flex items-center justify-center shadow-xl">
                <span className="heading-secondary !text-[#001238] !text-2xl">
                  40+
                </span>
              </div> */}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#001238]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="heading-primary !text-[#f9f9f9] mb-4">Our Values</h2>
            <h3 className="heading-tertiary !text-[#c5a46d] mb-8">
              The Pillars of Our Craft
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Heritage Preservation",
                description:
                  "We safeguard traditional techniques passed down through generations, ensuring authentic craftsmanship lives on.",
                icon: "🏛️",
              },
              {
                title: "Quality Excellence",
                description:
                  "Every stitch, every embellishment is executed with meticulous attention to detail and uncompromising quality.",
                icon: "✨",
              },
              {
                title: "Customer Devotion",
                description:
                  "We treat each client as family, understanding their vision and crafting pieces that exceed expectations.",
                icon: "❤️",
              },
              {
                title: "Sustainable Practice",
                description:
                  "We source materials responsibly and follow eco-friendly processes in our commitment to the environment.",
                icon: "🌱",
              },
              {
                title: "Innovation Spirit",
                description:
                  "While respecting tradition, we embrace innovation to create contemporary interpretations of classic designs.",
                icon: "💡",
              },
              {
                title: "Artisan Support",
                description:
                  "We provide fair wages and development opportunities to our skilled craftsmen and their families.",
                icon: "🤝",
              },
            ].map((value, index) => (
              <div
                key={index}
                className="bg-[#f9f9f9]/10 backdrop-blur-sm rounded-xl p-6 border border-[#c5a46d]/20 hover:border-[#c5a46d]/60 transition-all duration-300"
              >
                {/* <div className="text-4xl mb-4">{value.icon}</div> */}
                <h4 className="heading-quaternary !text-[#c5a46d] !text-xl mb-3">
                  {value.title}
                </h4>
                <p className="paragraph-small !text-[#f9f9f9] !leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F9F9F9]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="heading-primary !text-[#f9f9f9] mb-6">
            Ready to Begin Your Journey?
          </h2>
          <h3 className="heading-tertiary !text-[#c5a46d] mb-8">
            Let's Create Something Beautiful Together
          </h3>
          <p className="paragraph !text-[#000000] !text-lg max-w-2xl mx-auto mb-10">
            Whether it's a wedding ensemble, a festive outfit, or a custom piece
            that tells your story, we're here to bring your vision to life with
            our time-honored craftsmanship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => navigate("/scheduleconsultation")}
              className="bg-[#c5a46d] text-[#001238] py-4 px-8 rounded-full font-bold text-lg hover:bg-[#d4b578] transform hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Schedule Consultation
            </button>
            {/* <button className="border-2 border-[#c5a46d] text-[#c5a46d] py-4 px-8 rounded-full font-bold text-lg hover:bg-[#c5a46d] hover:text-[#001238] transition-all duration-300">
              View Portfolio
            </button> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
