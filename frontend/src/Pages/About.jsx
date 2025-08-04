import React from "react";
import aboutMainImage from "../assets/images/about.png";
import CarouselSlide from "../Components/CarouselSlide";
import { celebrities } from "../Constants/CelebrityData";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Layout from "../Layout/Layout";

function AboutUs() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 800,
    autoplaySpeed: 3500,
    pauseOnHover: true,
  };

  return (
    <Layout>
      <section className="min-h-screen px-6 md:px-20 py-20 bg-gradient-to-br from-white to-slate-100 dark:from-[#0f0f0f] dark:to-[#1a1a1a] text-gray-800 dark:text-white overflow-hidden">

        {/* Hero Section */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 md:gap-24">

          {/* Left Text */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-10">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight tracking-tight bg-gradient-to-r from-yellow-400 via-pink-500 to-blue-600 text-transparent bg-clip-text animate-fadeIn">
              Affordable and <span className="text-blue-600 dark:text-white">Quality Education</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed font-nunito-sans">
              We aim to democratize learning through accessible, high-quality education. Our platform brings together passionate teachers and curious learners to empower creativity, skills, and growth.
            </p>
            <div>
              <a
                href="#"
                className="inline-block mt-4 bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-700 transition-all shadow-lg"
              >
                Explore Courses
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full md:w-1/2 flex justify-center relative">
            <img
              src={aboutMainImage}
              alt="About Us"
              className="w-[90%] max-w-md rounded-2xl transform hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-pink-500 to-blue-500 blur-3xl opacity-20 -z-10 rounded-full"></div>
          </div>
        </div>

        {/* Slider Section */}
        <div className="mt-20 bg-white dark:bg-[#2b2f40] rounded-3xl px-4 md:px-12 py-10 shadow-2xl border dark:border-none backdrop-blur-lg">
          <h2 className="text-3xl font-bold text-center text-blue-600 dark:text-yellow-400 mb-10">
            GET INSPIRED
          </h2>
          <Slider {...settings}>
            {celebrities.map((details, index) => (
              <CarouselSlide key={index} details={details} />
            ))}
          </Slider>
        </div>
      </section>
    </Layout>
  );
}

export default AboutUs;
