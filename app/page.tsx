"use client";

import Image from "next/image";
import Link from "next/link";
import {
  PhoneCall,
  MapPin,
  Globe,
  Star,
  Check,
  Instagram,
  Facebook,
  Clock,
  ChevronDown,
  Search,
  Menu as MenuIcon,
  X as XIcon,
} from "lucide-react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import clsx from "clsx";
import Footer from "../components/Footer";
import { LoadScript, GoogleMap } from "@react-google-maps/api";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
// import required modules
import { Pagination } from "swiper/modules";

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [activeQuestion, setActiveQuestion] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const toggleQuestion = (index: number) => {
    if (activeQuestion === index) {
      setActiveQuestion(null);
    } else {
      setActiveQuestion(index);
    }
  };

  const faqQuestions = [
    {
      question: "Do I need an appointment or can I walk in?",
      answer:
        "We welcome both appointments and walk-ins. However, we recommend booking in advance to ensure your preferred time slot, especially on weekends. You can book through our website, by phone, or via WhatsApp.",
      category: "general",
    },
    {
      question: "How long does a typical haircut take?",
      answer:
        "A standard men's haircut takes approximately 30-45 minutes. Services like beard trims add 15-20 minutes, while premium services like hot towel shaves may take up to an hour. We take our time to ensure quality results.",
      category: "general",
    },
    {
      question: "What form of payment do you accept?",
      answer:
        "We accept cash, all major credit/debit cards, Apple Pay, Google Pay, and Venmo for your convenience.",
      category: "services",
    },
    {
      question: "Do you offer any loyalty programs or discounts?",
      answer:
        "Yes, we offer a loyalty program where your 10th haircut is free. We also offer discounts for military personnel, first responders, seniors, and students with valid ID.",
      category: "pricing",
    },
    {
      question: "What hair products do you use and sell?",
      answer:
        "We use and sell premium men's grooming products from brands like Uppercut Deluxe, Layrite, and American Crew. Our barbers can recommend the best products for your hair type and style.",
      category: "support",
    },
  ];

  // Filter questions based on active tab and search query
  const filteredQuestions = faqQuestions.filter((faq) => {
    // First filter by category
    const categoryMatch = activeTab === "all" || faq.category === activeTab;

    // Then filter by search query if one exists
    if (!searchQuery) return categoryMatch;

    const query = searchQuery.toLowerCase();
    return (
      categoryMatch &&
      (faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query))
    );
  });

  const openModal = (image: string) => {
    setCurrentImage(image);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 33.2142,
    lng: -97.1333,
  };

  const libraries: ("places" | "drawing" | "geometry")[] = ["places"];

  return (
    <>
      <div className="min-h-screen bg-black text-white">
        {/* Header/Navigation - Sticky */}
        <header className="sticky top-0 z-50 bg-[#1A1A1A] backdrop-blur-sm border-b border-zinc-800 shadow-md w-full py-4">
          <div className="container mx-auto px-4 flex items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex items-center">
                <Image
                  src="/logo.png"
                  alt="PMC Barbershop Logo"
                  width={80}
                  height={80}
                  className="h-14 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() =>
                  document
                    .getElementById("hero")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-white hover:text-[#F4BF38] transition-colors"
              >
                Home
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("about")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-white hover:text-[#F4BF38] transition-colors"
              >
                About
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-white hover:text-[#F4BF38] transition-colors"
              >
                Services
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("gallery")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-white hover:text-[#F4BF38] transition-colors"
              >
                Gallery
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="text-white hover:text-[#F4BF38] transition-colors"
              >
                Contact
              </button>
            </nav>

            <div className="hidden lg:flex items-center space-x-4">
              <button className="hidden md:flex items-center text-white hover:text-[#F4BF38] transition-colors">
                <Globe className="h-5 w-5" />
              </button>
              <Link
                href="tel:+19406129127"
                className="hidden md:flex items-center text-white hover:text-[#F4BF38] transition-colors"
              >
                <PhoneCall className="h-5 w-5 mr-2" />
                +1 940-612-9127
              </Link>
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "auto" })
                }
                className="bg-[#F4BF38] hover:bg-amber-500 text-black font-medium px-4 py-2 rounded-md transition-colors"
              >
                Book an Appointment
              </button>
            </div>
          </div>
        </header>
        {/* Hero Section */}
        <section id="hero" className="bg-[#212121] px-4 py-20 md:py-32">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center -mt-16">
            {/* Left: Text Content */}
            <div className="space-y-6">
              <p className="text-[#F4BF38] font-medium text-md">Barber shop</p>
              <h1 className="text-4xl md:text-[45px] font-extrabold text-white leading-tight">
                Fama Barber Shop and Beauty Salon
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span className="bg-[#F4BF38] text-black font-bold px-3 py-1 rounded-full text-sm">
                  4.6 ★ (116+ reviews)
                </span>
                <span className="text-green-400 font-semibold">
                  Open ⋅ Closes 7 pm
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#F4BF38] mb-2 inline-block border-b-4 border-[#F4BF38] pb-1">
                Premium Barber Shop
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl">
                At PMC Barbershop, we combine traditional barbering techniques
                with modern styling to give you the perfect look. Our
                experienced barbers deliver precision cuts, beard grooming, and
                relaxing hot towel shaves in a classic barbershop atmosphere.
              </p>
              <div className="flex items-center mt-4">
                <span className="flex items-center bg-transparent border hover:border-[#F4BF38] hover:text-[#F4BF38] rounded-full px-4 py-1 text-md font-light">
                  <MapPin className="h-5 w-5 mr-2 text-[#F4BF38]" /> Denton, TX
                </span>
              </div>
              <div className="flex flex-col gap-4 w-full max-w-xl mt-8">
                <button
                  onClick={() =>
                    document
                      .getElementById("services")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center justify-center border border-zinc-400 text-[14px] text-white hover:text-black hover:bg-[#F4BF38] font-medium py-1.5 rounded-md transition-colors w-full transform duration-200 hover:-translate-y-0.5"
                >
                  <PhoneCall className="mr-4 h-5 w-5 hover:text-black" />
                  Our Services
                </button>
                <button
                  onClick={() =>
                    document
                      .getElementById("contact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="flex items-center justify-center bg-[#F4BF38] hover:bg-amber-500 text-[14px] text-white font-medium py-1.5 rounded-md transition-colors w-full transform transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <PhoneCall className="h-5 w-5 mr-4" />
                  Book Now
                </button>
                {/* Animated Down Arrow */}
                <div className="flex justify-center mt-6">
                  <button
                    type="button"
                    aria-label="Scroll Down"
                    onClick={() =>
                      document
                        .getElementById("about")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                    className="focus:outline-none"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="26"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F4BF38] animate-bounce"
                    >
                      <path d="M12 5v14M5 12l7 7 7-7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            {/* Right: Team Image */}
            <div className="flex justify-center items-center overflow-visible rounded-lg transition-transform duration-500 hover:scale-105">
              <Image
                src="/team-new.png"
                alt="PMC Barbershop Team"
                width={700}
                height={500}
                className="rounded-lg object-cover shadow-lg"
              />
            </div>
          </div>
        </section>
        {/* About Section */}
        <section id="about" className="px-4 py-16 md:py-24 bg-[#1A1A1A]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Our Story</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                About PMC Barbershop
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Established in 2018, PMC Barbershop has been providing premium
                grooming services to the men of Denton, TX. Our mission is to
                deliver exceptional haircuts and grooming services in a
                welcoming, classic barbershop environment.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="relative overflow-hidden rounded-lg group">
                <Image
                  src="/storefront-new.png"
                  alt="PMC Barbershop Storefront"
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="md:-mt-10 border-[#F4BF38] pl-6 py-2 text-[16px]">
                <blockquote className="border-l-4 border-[#F4BF38] text-gray-500 pl-4 py-1">
                  <p className="mt-2">
                    Established in 2018, PMC Barbershop has been providing
                    premium grooming services to the men of Denton, TX. Our
                    mission is to deliver exceptional haircuts and grooming
                    services in a welcoming, classic barbershop environment.
                  </p>
                </blockquote>
                <blockquote className="mt-10 text-gray-500 bg-[#292929] rounded-lg p-4">
                  <span className="text-[#F4BF38] text-4xl font-serif">"</span>
                  <p className="">
                    We take pride in our attention to detail and personalized
                    service, ensuring each client leaves looking and feeling
                    their best. Our skilled barbers combine traditional
                    techniques with modern trends to create custom styles that
                    suit each individual's personality and lifestyle.
                  </p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>
        {/* Scroll to Top Button */}
        <div className="fixed bottom-6 right-6">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="bg-[#F4BF38] hover:bg-amber-500 text-black p-3 rounded-full shadow-lg transition-colors"
            aria-label="Scroll to top"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m18 15-6-6-6 6" />
            </svg>
          </button>
        </div>
        {/* Services Section */}
        <section id="services" className="px-4 py-16 md:py-24 bg-[#1E1E1E]">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Premium Grooming</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Our Barber Services
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Professional barbering services to keep you looking sharp for
                everyday confidence or special occasions.
              </p>
            </div>

            {/* Swiper Container - Replaces the grid for small screens */}
            <Swiper
              slidesPerView={1} // Show 1 slide at a time on smallest screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  // When screen width is 640px or more
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  // When screen width is 768px or more
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {/* Haircuts Card - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 relative bg-[#222222] rounded-lg p-8 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-[0.5px] hover:border-[#F4BF38] hover:text-[#F4BF38]">
                  {/* True 'L' animation: left then top border */}
                  <span className="absolute left-0 top-0 w-1 h-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 group-hover:h-full" />
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 delay-200 group-hover:w-full" />
                  <div className="bg-zinc-800 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 mt-8">
                    <div className="bg-teal-900/50 w-12 h-12 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M7 21 12 9l5 12M3 9l9-6 9 6M8 12l4-2 4 2" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-8">Haircuts</h3>
                  <p className="text-[#71717B] mb-6 mt-10">
                    Our skilled barbers deliver precision haircuts tailored to
                    your style and face shape. From classic cuts to modern
                    fades, we ensure you leave looking sharp and confident.
                  </p>
                  <ul className="space-y-2 text-[#71717B] mb-5">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Classic Cuts
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Modern Styles
                    </li>
                  </ul>
                </div>
              </SwiperSlide>

              {/* Beard Services Card - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 relative bg-[#222222] rounded-lg p-8 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-[0.5px] hover:border-[#F4BF38] hover:text-[#F4BF38]">
                  {/* True 'L' animation: left then top border */}
                  <span className="absolute left-0 top-0 w-1 h-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 group-hover:h-full" />
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 delay-200 group-hover:w-full" />
                  <div className="bg-zinc-800 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 mt-8">
                    <div className="bg-teal-900/50 w-12 h-12 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-8">
                    Beard Services
                  </h3>
                  <p className="text-[#71717B] mb-6 mt-10">
                    Maintain your facial hair with our premium beard services.
                    Our barbers specialize in perfect beard shaping, precise
                    trims, and luxurious hot towel shaves for the ultimate
                    grooming experience.
                  </p>
                  <ul className="space-y-2 text-[#71717B] mb-5">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Beard Trims
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Beard Shaping
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
              {/* Premium Services Card - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 relative bg-[#222222] rounded-lg p-8 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-[0.5px] hover:border-[#F4BF38] hover:text-[#F4BF38]">
                  {/* True 'L' animation: left then top border */}
                  <span className="absolute left-0 top-0 w-1 h-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 group-hover:h-full" />
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 delay-200 group-hover:w-full" />
                  <div className="bg-zinc-800 w-16 h-16 rounded-lg flex items-center justify-center mb-6 mx-auto md:mx-0 mt-8">
                    <div className="bg-amber-900/50 w-12 h-12 rounded-full flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-white"
                      >
                        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-8">
                    Premium Services
                  </h3>
                  <p className="text-[#71717B] mb-6 mt-10">
                    Enhance your look with our premium barbering services
                    including expert hair coloring, revitalizing scalp
                    treatments, and styling for special occasions when you need
                    to look your absolute best.
                  </p>
                  <ul className="space-y-2 text-[#71717B] mb-5">
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Hair Coloring
                    </li>
                    <li className="flex items-center">
                      <span className="mr-2">•</span>
                      Scalp Treatments
                    </li>
                  </ul>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/* Why Choose Us Section */}
        <section
          id="why-choose-us"
          className="px-4 py-16 md:py-24 bg-[#1A1A1A]"
        >
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Our Commitment</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Why Choose PMC Barbershop?
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                What makes us the premier barbershop in Denton, TX.
              </p>
            </div>

            {/* Swiper Container - Replaces the grid for small screens */}
            <Swiper
              slidesPerView={1} // Show 1 slide at a time on smallest screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  // When screen width is 640px or more
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  // When screen width is 768px or more
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {/* Expert Barbers Card - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 relative bg-[#222222] rounded-lg p-8 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-[0.5px] hover:border-[#F4BF38] hover:text-[#F4BF38]">
                  {/* True 'L' animation: left then top border */}
                  <span className="absolute left-0 top-0 w-1 h-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 group-hover:h-full" />
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 delay-200 group-hover:w-full" />
                  <div className="bg-zinc-800/50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F4BF38]"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-8">
                    Expert Barbers
                  </h3>
                  <p className="text-[#71717B] mt-8 mb-5">
                    Our team consists of certified barbers with years of
                    experience in classic and modern cutting techniques, beard
                    grooming, and men's styling.
                  </p>
                </div>
              </SwiperSlide>

              {/* Premium Tools Card - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 relative bg-[#222222] rounded-lg p-8 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-[0.5px] hover:border-[#F4BF38] hover:text-[#F4BF38]">
                  {/* True 'L' animation: left then top border */}
                  <span className="absolute left-0 top-0 w-1 h-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 group-hover:h-full" />
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 delay-200 group-hover:w-full" />
                  <div className="bg-zinc-800/50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F4BF38]"
                    >
                      <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z" />
                      <line x1="16" x2="2" y1="8" y2="22" />
                      <line x1="17.5" x2="9" y1="15" y2="15" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-8">
                    Premium Tools & Products
                  </h3>
                  <p className="text-[#71717B] mt-8 mb-5">
                    We use only high-quality barbering tools and premium men's
                    grooming products to ensure the best results for your hair
                    and skin.
                  </p>
                </div>
              </SwiperSlide>

              {/* Classic Experience Card - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 relative bg-[#222222] rounded-lg p-8 overflow-hidden group transition-all duration-300 hover:-translate-y-2 hover:border-[0.5px] hover:border-[#F4BF38] hover:text-[#F4BF38]">
                  {/* True 'L' animation: left then top border */}
                  <span className="absolute left-0 top-0 w-1 h-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 group-hover:h-full" />
                  <span className="absolute left-0 top-0 h-1 w-0 bg-[#F4BF38] rounded-tl-lg transition-all duration-200 delay-200 group-hover:w-full" />
                  <div className="bg-zinc-800/50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#F4BF38]"
                    >
                      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold mb-4 mt-8">
                    Classic Barbershop Experience
                  </h3>
                  <p className="text-[#71717B] mt-8 mb-5">
                    Enjoy a comfortable, clean shop with a classic barbershop
                    atmosphere where you can relax while getting a great cut or
                    shave.
                  </p>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/* Testimonials Section */}
        <section id="testimonials" className="bg-[#1E1E1E] px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Testimonials</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                What Our Clients Say
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            {/* Swiper Container - Replaces the grid for small screens */}
            <Swiper
              slidesPerView={1} // Show 1 slide at a time on smallest screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  // When screen width is 640px or more
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  // When screen width is 768px or more
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {/* Testimonial 1 - Wrap each testimonial card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 max-w-md mx-auto bg-[#222222] rounded-2xl overflow-hidden shadow-lg border border-neutral-800 transition-all duration-300 hover:-translate-y-2">
                  <div className="p-6 relative my-7">
                    <span className="text-yellow-600 text-3xl absolute top-4 left-4">
                      "
                    </span>
                    <p className="text-gray-300 italic mt-6">
                      I've been getting my hair cut at PMC Barbershop for over 2
                      years now. The attention to detail is unmatched, and the
                      atmosphere is always welcoming. My barber remembers
                      exactly how I like my fade every time!
                    </p>
                    <span className="text-yellow-600 text-3xl absolute bottom-4 right-4">
                      "
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-neutral-700"></div>

                  {/* Rating and name */}
                  <div className="flex items-center justify-start p-6 space-x-3 py-10">
                    {/* Stars */}
                    <div className="text-yellow-400 text-xl">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    {/* Separator line */}
                    <div className="w-px h-5 bg-yellow-500"></div>
                    {/* Name */}
                    <span className="text-white font-semibold">
                      Mike Johnson
                    </span>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 2 - Wrap each testimonial card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 max-w-md mx-auto bg-[#222222] rounded-2xl overflow-hidden shadow-lg border border-neutral-800 transition-all duration-300 hover:-translate-y-2">
                  {/* Testimonial text */}
                  <div className="p-6 relative my-7">
                    <span className="text-yellow-600 text-3xl absolute top-4 left-4">
                      "
                    </span>
                    <p className="text-gray-300 italic mt-6 p-2">
                      As someone who's particular about their haircut, I was
                      nervous trying a new place. The team at PMC took their
                      time to understand what I wanted and delivered exactly
                      that. Will definitely be coming back!
                    </p>
                    <span className="text-yellow-600 text-3xl absolute bottom-4 right-4">
                      "
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-neutral-700"></div>

                  {/* Rating and name */}
                  <div className="flex items-center justify-start p-6 space-x-3 py-10">
                    {/* Stars */}
                    <div className="text-yellow-400 text-xl">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    {/* Separator line */}
                    <div className="w-px h-5 bg-yellow-500"></div>
                    {/* Name */}
                    <span className="text-white font-semibold">
                      David Martinez
                    </span>
                  </div>
                </div>
              </SwiperSlide>

              {/* Testimonial 3 - Wrap each testimonial card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 max-w-md mx-auto bg-[#222222] rounded-2xl overflow-hidden shadow-lg border border-neutral-800 transition-all duration-300 hover:-translate-y-2">
                  {/* Testimonial text */}
                  <div className="p-6 pb-16 relative my-7">
                    <span className="text-yellow-600 text-3xl absolute top-4 left-4">
                      "
                    </span>
                    <p className="text-gray-300 italic mt-6">
                      The hot towel shave experience at PMC Barbershop is
                      phenomenal! It's the perfect blend of old-school barbering
                      with modern techniques. My beard has never looked better.
                    </p>
                    <span className="text-yellow-600 text-3xl absolute bottom-4 right-4">
                      "
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-neutral-700"></div>

                  {/* Rating and name */}
                  <div className="flex items-center justify-start p-6 space-x-3 py-10">
                    {/* Stars */}
                    <div className="text-yellow-400 text-xl">
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                      <span>★</span>
                    </div>
                    {/* Separator line */}
                    <div className="w-px h-5 bg-yellow-500"></div>
                    {/* Name */}
                    <span className="text-white font-semibold">
                      Chris Taylor
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/* Pricing Section */}
        <section id="pricing" className="bg-[#1A1A1A] px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">
                Quality Barbering at Fair Prices
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Our Service Prices
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Choose from our range of professional barbering services.
              </p>
            </div>

            {/* Swiper Container - Replaces the grid for small screens */}
            <Swiper
              slidesPerView={1} // Show 1 slide at a time on smallest screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  // When screen width is 640px or more
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  // When screen width is 768px or more
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {/* Classic Services - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 bg-[#222222] rounded-lg overflow-hidden border border-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2">
                  <div className="bg-[#F4BF38] text-black py-1 px-4 absolute right-0 top-6 font-medium text-sm rounded-l-md">
                    Most Popular
                  </div>
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-6 border-b border-[#F4BF38] pb-2 inline-block">
                      Classic Services
                    </h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-[#F4BF38]">
                        $25
                      </span>
                      <span className="text-[#71717B] ml-1">/mo</span>
                    </div>
                    <ul className="space-y-8 my-10 text-[#FFFFFF] text-sm">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Men's Haircut</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Kids Haircut (12 & under)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Senior Haircut (65+)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Military/First Responder Cut</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Basic Beard Trim</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Neck & Line Cleanup (between cuts)</span>
                      </li>
                    </ul>
                    <button
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "auto" })
                      }
                      className="w-full bg-[#F4BF38] hover:bg-amber-500 text-white font-medium py-3 rounded-md mt-8 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              {/* Premium Services - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38]">
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-6 border-b border-[#F4BF38] pb-2 inline-block">
                      Premium Services
                    </h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-[#F4BF38]">
                        $35
                      </span>
                      <span className="text-[#71717B] ml-1">/mo</span>
                    </div>
                    <ul className="space-y-8 my-10 text-[#FFFFFF] text-sm">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Haircut & Beard Combo</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Hot Towel Shave</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Full Beard Shaping & Design</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Color Camo (Gray Blending)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Hair & Scalp Treatment</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Head Shave with Hot Towel</span>
                      </li>
                    </ul>
                    <button
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "auto" })
                      }
                      className="w-full bg-[#1A1A1A] hover:bg-[#F4BF38] text-black font-medium py-3 rounded-md mt-8 transition-colors"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              {/* Packages - Wrap each card in SwiperSlide */}
              <SwiperSlide>
                <div className="mt-2 bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38]">
                  <div className="p-8">
                    <h3 className="text-xl font-bold mb-6 border-b border-[#F4BF38] pb-2 inline-block">
                      Packages
                    </h3>
                    <div className="flex items-baseline mb-6">
                      <span className="text-4xl font-bold text-[#F4BF38]">
                        $50
                      </span>
                      <span className="text-[#71717B] ml-1">/mo</span>
                    </div>
                    <ul className="space-y-8 my-10 text-[#FFFFFF] text-sm">
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>The Works (Cut, Shave, Treatment)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Father & Son Combo</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Groom's Package</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Monthly Membership (2 cuts/mo)</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>First-Time Client Special</span>
                      </li>
                      <li className="flex items-center">
                        <Check className="h-5 w-5 mr-3 text-white bg-[#F4BF38] rounded-full p-1" />
                        <span>Loyalty Program</span>
                      </li>
                    </ul>
                    <button
                      onClick={() =>
                        document
                          .getElementById("contact")
                          ?.scrollIntoView({ behavior: "auto" })
                      }
                      className="w-full bg-[#1A1A1A] hover:bg-[#F4BF38] text-black font-medium py-3 rounded-md mt-8 transition-colors"
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/* Gallery Section */}
        <section id="gallery" className="bg-[#1E1E1E] px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Our Work & Shop</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Our Barbershop Gallery
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Take a look at our shop atmosphere and the quality cuts we
                deliver to our clients.
              </p>
            </div>

            {/* Swiper Container - Replaces the grid for small screens */}
            <Swiper
              slidesPerView={1} // Show 1 slide at a time on smallest screens
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  // When screen width is 640px or more
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  // When screen width is 768px or more
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {/* Gallery Image 1 - Wrap each image div in SwiperSlide */}
              <SwiperSlide>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image
                    src="/gallery-1.png"
                    alt="Close-up of a haircut"
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      className="bg-[#F4BF38] text-black px-4 py-2 rounded-md font-medium"
                      onClick={() => openModal("/gallery-1.png")}
                    >
                      View
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              {/* Gallery Image 2 - Wrap each image div in SwiperSlide */}
              <SwiperSlide>
                <div className="relative group overflow-hidden rounded-lg border-2 border-[#F4BF38]">
                  <Image
                    src="/storefront.png"
                    alt="PMC Barbershop storefront"
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      className="bg-[#F4BF38] text-black px-4 py-2 rounded-md font-medium"
                      onClick={() => openModal("/storefront.png")}
                    >
                      View
                    </button>
                  </div>
                </div>
              </SwiperSlide>

              {/* Gallery Image 3 - Wrap each image div in SwiperSlide */}
              <SwiperSlide>
                <div className="relative group overflow-hidden rounded-lg">
                  <Image
                    src="/gallery-3.png"
                    alt="Barbershop interior with products"
                    width={600}
                    height={400}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <button
                      className="bg-[#F4BF38] text-black px-4 py-2 rounded-md font-medium"
                      onClick={() => openModal("/gallery-3.png")}
                    >
                      View
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </section>
        {/* Meet Our Barbers Section */}
        <section id="barbers" className="bg-[#1A1A1A] px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Our Team</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Meet Our Barbers
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Our team of skilled barbers is dedicated to providing you with
                the perfect cut and grooming experience.
              </p>
            </div>
            {/* Swiper for mobile, grid for desktop */}
            <div className="block md:hidden">
              <Swiper
                slidesPerView={1}
                spaceBetween={30}
                pagination={{ clickable: true }}
                modules={[Pagination]}
                className="mySwiper"
              >
                {/* Barber 1 */}
                <SwiperSlide>
                  <div className="bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                    <div className="relative h-[350px] top-6">
                      <Image
                        src="/barber-1.png"
                        alt="Marcus Williams"
                        width={600}
                        height={400}
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="px-6 pb-10 text-center group">
                      <div className="w-16 h-1 bg-[#F4BF38] mx-auto mb-4 transition-all duration-300 group-hover:w-full"></div>
                      <h3 className="text-xl font-bold">Marcus Williams</h3>
                      <p className="text-[#F4BF38] mb-4 text-sm">
                        Senior Barber
                      </p>
                      <p className="text-[#71717B] mb-6 text-sm">
                        Marcus specializes in modern men's styling, textured
                        cuts, and hair designs. With his creative approach and
                        technical skill, he excels at creating unique looks.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href="#"
                          className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                        <a
                          href="#"
                          className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Barber 2 */}
                <SwiperSlide>
                  <div className="bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                    <div className="relative h-[350px] top-6">
                      <Image
                        src="/barber-2.png"
                        alt="Terrence Jackson"
                        width={600}
                        height={400}
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="px-6 pb-10 text-center group">
                      <div className="w-16 h-1 bg-[#F4BF38] mx-auto mb-4 transition-all duration-300 group-hover:w-full"></div>
                      <h3 className="text-xl font-bold">Terrence Jackson</h3>
                      <p className="text-[#F4BF38] mb-4 text-sm">
                        Barber & Stylist
                      </p>
                      <p className="text-[#71717B] mb-6 text-sm">
                        Terrence is known for his attention to detail and
                        classic barbering skills. He loves helping clients find
                        their signature style.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href="#"
                          className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                        <a
                          href="#"
                          className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                {/* Barber 3 */}
                <SwiperSlide>
                  <div className="bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                    <div className="relative h-[350px] top-6">
                      <Image
                        src="/barber-3.png"
                        alt="Alex Kim"
                        width={600}
                        height={400}
                        className="w-full object-cover"
                      />
                    </div>
                    <div className="px-6 pb-10 text-center group">
                      <div className="w-16 h-1 bg-[#F4BF38] mx-auto mb-4 transition-all duration-300 group-hover:w-full"></div>
                      <h3 className="text-xl font-bold">Alex Kim</h3>
                      <p className="text-[#F4BF38] mb-4 text-sm">
                        Fade Specialist
                      </p>
                      <p className="text-[#71717B] mb-6 text-sm">
                        Alex is a master of fades and sharp lines. He brings
                        energy and passion to every cut, ensuring every client
                        leaves happy.
                      </p>
                      <div className="flex justify-center space-x-4">
                        <a
                          href="#"
                          className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                        >
                          <Instagram className="h-5 w-5" />
                        </a>
                        <a
                          href="#"
                          className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                        >
                          <Facebook className="h-5 w-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
            {/* Grid for desktop */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Barber 1 */}
              <div className="bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                <div className="relative h-[350px] top-6">
                  <Image
                    src="/barber-1.png"
                    alt="Marcus Williams"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
                <div className="px-6 pb-10 text-center group">
                  <div className="w-16 h-1 bg-[#F4BF38] mx-auto mb-4 transition-all duration-300 group-hover:w-full"></div>
                  <h3 className="text-xl font-bold">Marcus Williams</h3>
                  <p className="text-[#F4BF38] mb-4 text-sm">Senior Barber</p>
                  <p className="text-[#71717B] mb-6 text-sm">
                    Marcus specializes in modern men's styling, textured cuts,
                    and hair designs. With his creative approach and technical
                    skill, he excels at creating unique looks.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              {/* Barber 2 */}
              <div className="bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                <div className="relative h-[350px] top-6">
                  <Image
                    src="/barber-2.png"
                    alt="Terrence Jackson"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
                <div className="px-6 pb-10 text-center group">
                  <div className="w-16 h-1 bg-[#F4BF38] mx-auto mb-4 transition-all duration-300 group-hover:w-full"></div>
                  <h3 className="text-xl font-bold">Terrence Jackson</h3>
                  <p className="text-[#F4BF38] mb-4 text-sm">
                    Barber & Stylist
                  </p>
                  <p className="text-[#71717B] mb-6 text-sm">
                    Terrence is known for his attention to detail and classic
                    barbering skills. He loves helping clients find their
                    signature style.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
              {/* Barber 3 */}
              <div className="bg-[#222222] rounded-lg overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                <div className="relative h-[350px] top-6">
                  <Image
                    src="/barber-3.png"
                    alt="Alex Kim"
                    width={600}
                    height={400}
                    className="w-full object-cover"
                  />
                </div>
                <div className="px-6 pb-10 text-center group">
                  <div className="w-16 h-1 bg-[#F4BF38] mx-auto mb-4 transition-all duration-300 group-hover:w-full"></div>
                  <h3 className="text-xl font-bold">Alex Kim</h3>
                  <p className="text-[#F4BF38] mb-4 text-sm">Fade Specialist</p>
                  <p className="text-[#71717B] mb-6 text-sm">
                    Alex is a master of fades and sharp lines. He brings energy
                    and passion to every cut, ensuring every client leaves
                    happy.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href="#"
                      className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                    <a
                      href="#"
                      className="bg-zinc-800 p-2 rounded-full hover:bg-[#F4BF38] hover:text-black transition-colors"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Location Section */}
        <section id="location" className="bg-[#1A1A1A] px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Visit Our Shop</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Our Location
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Conveniently located in Denton, TX:
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
              {/* Map on the left */}
              <div className="w-full h-[300px] md:h-[400px] rounded-lg overflow-hidden shadow-lg bg-[#222222] transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                <iframe
                  title="PMC Barbershop Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.393073964479!2d-97.1354886848136!3d33.2142359808497!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864db5b6e2e2e2e3%3A0x7e2e2e2e2e2e2e2e!2sDenton%2C%20TX!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              {/* Contact Card on the right */}
              <div className="w-full flex justify-center">
                <div className="bg-[#232323] rounded-2xl border border-[#333] p-8 md:p-10 w-full shadow-lg flex flex-col justify-between h-full transition-all duration-300 hover:-translate-y-2 hover:border hover:border-[#F4BF38] hover:text-[#F4BF38]">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      Contact Information
                    </h3>
                    <div className="w-12 h-1 bg-[#F4BF38] mb-8 rounded"></div>
                    {/* Address */}
                    <div className="flex items-start mb-8">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F4BF38] flex items-center justify-center mr-4">
                        <MapPin className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-lg">
                          Address
                        </div>
                        <div className="text-[#71717B] text-base">
                          500 N Bell Ave #109, Denton, TX 76209
                        </div>
                      </div>
                    </div>
                    {/* Phone */}
                    <div className="flex items-start mb-8">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F4BF38] flex items-center justify-center mr-4">
                        <PhoneCall className="h-6 w-6 text-black" />
                      </div>
                      <div>
                        <div className="text-white font-semibold text-lg">
                          Phone
                        </div>
                        <div className="text-[#71717B] text-base">
                          +1 940-612-9127
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Buttons */}
                  <div className="flex flex-col md:flex-row gap-4 mt-4">
                    <a
                      href="https://www.google.com/maps/dir/?api=1&destination=500+N+Bell+Ave+%23109,+Denton,+TX+76209"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center bg-[#F4BF38] hover:bg-[#FFD369] text-black font-semibold py-3 rounded-xl transition-colors text-base gap-2"
                    >
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
                          d="M9 20l-5.447-2.724A2 2 0 013 15.382V6a2 2 0 012-2h14a2 2 0 012 2v9.382a2 2 0 01-1.553 1.894L15 20m-6 0V10m0 10h6"
                        />
                      </svg>
                      Get Directions
                    </a>
                    <a
                      href="tel:+19406129127"
                      className="flex-1 flex items-center justify-center border border-[#333] text-[#71717B] font-semibold py-3 rounded-xl transition-colors text-base gap-2 cursor-not-allowed opacity-60"
                      tabIndex={-1}
                      aria-disabled="true"
                    >
                      <PhoneCall className="h-5 w-5" />
                      Call Us
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Frequently Asked Questions Section */}
        <section id="faq" className="bg-[#1A1A1A] px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">Common Questions</p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Frequently Asked Questions
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Answers to common questions about our barbershop services.
              </p>
            </div>

            <div className="max-w-2xl w-full flex mb-6 items-center bg-[#232323] rounded-lg px-4 py-2 mx-auto">
              <Search className="h-5 w-5 text-[#F4BF38] mr-2" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none text-white w-full placeholder:text-[#71717B]"
              />
            </div>
            <div className="flex justify-center gap-4 my-6 md:mt-0">
              <button
                className={`px-6 py-3 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "all"
                    ? "bg-[#F4BF38] text-black"
                    : "bg-[#232323] text-[#F4BF38]"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "general"
                    ? "bg-[#F4BF38] text-black"
                    : "bg-[#232323] text-[#F4BF38]"
                }`}
                onClick={() => setActiveTab("general")}
              >
                General
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "services"
                    ? "bg-[#F4BF38] text-black"
                    : "bg-[#232323] text-[#F4BF38]"
                }`}
                onClick={() => setActiveTab("services")}
              >
                Services
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "pricing"
                    ? "bg-[#F4BF38] text-black"
                    : "bg-[#232323] text-[#F4BF38]"
                }`}
                onClick={() => setActiveTab("pricing")}
              >
                Pricing
              </button>
              <button
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeTab === "support"
                    ? "bg-[#F4BF38] text-black"
                    : "bg-[#232323] text-[#F4BF38]"
                }`}
                onClick={() => setActiveTab("support")}
              >
                Support
              </button>
            </div>
            <div className="max-w-4xl mx-auto">
              {filteredQuestions.length === 0 ? (
                <div className="text-[#F4BF38] text-center py-8">
                  No questions found.
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredQuestions.map((faq, idx) => (
                    <div key={idx} className="bg-[#232323] rounded-lg p-6">
                      <button
                        className="flex items-center justify-between w-full text-left text-lg font-semibold text-white focus:outline-none"
                        onClick={() => toggleQuestion(idx)}
                      >
                        {faq.question}
                        <ChevronDown
                          className={`h-5 w-5 ml-2 transition-transform duration-300 ${
                            activeQuestion === idx
                              ? "rotate-180 text-[#F4BF38]"
                              : "text-[#F4BF38]"
                          }`}
                        />
                      </button>
                      <div
                        className={`mt-4 text-[#71717B] text-base transition-all duration-300 ${
                          activeQuestion === idx ? "block" : "hidden"
                        }`}
                      >
                        {faq.answer}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="bg-[#1A1A1A] px-4 py-16 md:py-24">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <p className="text-[#F4BF38] font-medium">
                Book Your Appointment
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mt-2 relative inline-block group">
                Contact Us
                <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F4BF38] transition-all duration-300 group-hover:w-full"></span>
              </h2>
            </div>

            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="text-[#71717B]">
                Ready for a fresh look? Book your appointment today or contact
                us for any questions.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start h-screen">
              {/* Left: Contact Info Card */}
              <div className="rounded-2xl p-8 md:p-10 w-full max-w-lg mx-auto flex flex-col gap-10 mt-2 bg-[#222222]  overflow-hidden border hover:border-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2 h-full">
                {/* Address */}
                <div className="flex items-start gap-4 relative transition-all duration-300 hover:-translate-y-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F4BF38] flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-black" />
                  </div>
                  <div className="">
                    <div className="text-white font-bold text-lg mb-1">
                      Address
                    </div>
                    <div className="text-[#71717B] text-base">
                      500 N Bell Ave #109, Denton, TX 76209
                    </div>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-4 relative transition-all duration-300 hover:-translate-y-2">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F4BF38] flex items-center justify-center">
                    <PhoneCall className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">
                      Phone
                    </div>
                    <div className="text-[#71717B] text-base">
                      +1 940-612-9127
                    </div>
                  </div>
                </div>
                {/* Business Hours */}
                <div className="flex items-start gap-4 relative transition-all duration-300 hover:-translate-y-2 hover:bg-">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#F4BF38] flex items-center justify-center">
                    <Clock className="h-6 w-6 text-black" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg mb-1">
                      Business Hours
                    </div>
                    <div className="text-[#71717B] text-base">
                      Open ⋅ Closes 7 pm
                    </div>
                  </div>
                </div>
              </div>
              {/* Right: Contact Form */}
              <div className="bg-[#232323] rounded-2xl border border-[#333] p-8 md:p-10 w-full mx-auto overflow-hidden hover:border-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2 h-full">
                <Formik
                  initialValues={{
                    name: "",
                    phone: "",
                    service: "",
                    date: "",
                    message: "",
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Name is required"),
                    phone: Yup.string().required("Phone is required"),
                    service: Yup.string().required("Please select a service"),
                    date: Yup.string().required("Please select a date"),
                    message: Yup.string().required("Message is required"),
                  })}
                  onSubmit={(values, { resetForm }) => {
                    alert("Thank you for contacting us!");
                    resetForm();
                  }}
                >
                  {({ isSubmitting }) => (
                    <Form className="space-y-6">
                      <div className="overflow-hidden hover:text-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2">
                        <label
                          typeof="text"
                          className="block text-[#bdbdbd] font-semibold mb-1 hover:text-[#F4BF38]"
                        >
                          Your Name
                        </label>
                        <Field
                          name="name"
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full bg-transparent border border-[#bdbdbd] rounded-md px-4 py-3 text-white placeholder:text-[#71717B] focus:outline-none hover:border-[#F4BF38] transition"
                        />
                        <ErrorMessage
                          name="name"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="overflow-hidden hover:text-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2">
                        <label className="block text-[#bdbdbd] font-semibold mb-1 hover:text-[#F4BF38] transition">
                          Phone Number
                        </label>
                        <Field
                          name="phone"
                          type="text"
                          placeholder="Enter your phone number"
                          className="w-full bg-transparent border border-[#bdbdbd] rounded-md px-4 py-3 text-white placeholder:text-[#71717B] focus:outline-none hover:border-[#F4BF38] transition"
                        />
                        <ErrorMessage
                          name="phone"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="overflow-hidden hover:text-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2">
                        <label className="block text-[#bdbdbd] font-semibold mb-1 hover:text-[#F4BF38] transition">
                          Service Interested In
                        </label>
                        <Field
                          as="select"
                          name="service"
                          className="w-full bg-transparent border border-[#bdbdbd] rounded-md px-4 py-3 text-white focus:outline-none hover:border-[#F4BF38] transition"
                        >
                          <option value="">Select an option</option>
                          <option value="Haircut">Haircut</option>
                          <option value="Beard Trim">Beard Trim</option>
                          <option value="Shave">Shave</option>
                          <option value="Coloring">Coloring</option>
                          <option value="Other">Other</option>
                        </Field>
                        <ErrorMessage
                          name="service"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="overflow-hidden hover:text-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2">
                        <label className="block text-[#bdbdbd] font-semibold mb-1 hover:text-[#F4BF38] transition">
                          Preferred Date
                        </label>
                        <Field
                          name="date"
                          type="date"
                          className="w-full bg-transparent border border-[#bdbdbd] rounded-md px-4 py-3 text-white focus:outline-none hover:border-[#F4BF38] transition"
                        />
                        <ErrorMessage
                          name="date"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <div className="overflow-hidden hover:text-[#F4BF38] relative transition-all duration-300 hover:-translate-y-2">
                        <label className="block text-[#bdbdbd] font-semibold mb-1 hover:text-[#F4BF38] transition">
                          Message
                        </label>
                        <Field
                          name="message"
                          as="textarea"
                          placeholder="Tell us about your style preferences or any questions you have"
                          rows={5}
                          className="w-full bg-transparent border border-[#bdbdbd] rounded-md px-4 py-3 text-white placeholder:text-[#71717B] focus:outline-none hover:border-[#F4BF38] transition"
                        />
                        <ErrorMessage
                          name="message"
                          component="div"
                          className="text-red-500 text-sm mt-1"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-40 bg-[#F4BF38] hover:bg-[#FFD369] text-black font-semibold py-3 rounded-md transition-colors mt-4"
                      >
                        {isSubmitting ? "Sending..." : "Submit"}
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative bg-[#F4BF38] py-24 flex items-center justify-center overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute left-0 top-0 w-96 h-96 bg-[#FFD369] rounded-full opacity-40 -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-[#FFD369] rounded-full opacity-40 translate-x-1/2 translate-y-1/2"></div>
          <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center">
            <h2 className="text-3xl md:text-3xl font-extrabold text-white mb-6 px-4 py-2 rounded inline-block">
              Ready for a Fresh Cut?
            </h2>
            <p className="text-white text-lg md:text-lg mb-10 max-w-3xl">
              Visit PMC Barbershop for premium men's grooming services. Our
              expert barbers are ready to give you a clean, precise cut and a
              relaxing barbershop experience.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <button
                onClick={() =>
                  document
                    .getElementById("contact")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-[#F4BF38] font-semibold px-4 py-0 rounded-lg shadow hover:bg-[#FFF6D6] text-sm relative transition-all duration-300 hover:-translate-y-1"
              >
                Book an Appointment
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-black rounded-lg border border-white text-[#F4BF38] font-semibold px-4 py-2 shadow hover:bg-[#F4BF38] hover:text-black text-sm relative transition-all duration-300 hover:-translate-y-1"
              >
                View Our Services
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
}
