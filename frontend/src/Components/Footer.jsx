import React from "react";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitter,
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
} from "react-icons/bs";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-100 dark:bg-gray-900 text-gray-700 dark:text-gray-100 pt-12 pb-6 px-6 md:px-16">
      <div className="grid md:grid-cols-4 gap-10">
        {/* About */}
        <div>
          <img
            src="/z.png"
            alt="Logo"
            className="h-14 w-auto"
          />
          <h2 className="text-2xl font-bold text-blue-600 dark:text-yellow-400 mb-3">
            About Us
          </h2>
          <p className="text-sm leading-relaxed">
            Empowering learners and educators with accessible, modern, and quality education.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-blue-600">Home</a></li>
            <li><a href="#" className="hover:text-blue-600">Courses</a></li>
            <li><a href="#" className="hover:text-blue-600">About</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-2">
              <BsGeoAlt /> <span>123 Knowledge Street, India</span>
            </li>
            <li className="flex items-center gap-2">
              <BsTelephone /> <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center gap-2">
              <BsEnvelope /> <span>support@example.com</span>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <p className="text-sm mb-3">Get updates on new courses and features.</p>
          <form className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Your email"
              className="px-3 py-2 rounded bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-sm focus:outline-none"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm transition-all"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-300 dark:border-gray-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <span className="text-sm md:text-base font-medium">
          © {year} All rights reserved.
        </span>

        {/* Social Icons */}
        <div className="flex gap-5 text-xl md:text-2xl">
          <a href="#" className="hover:text-blue-600"><BsFacebook /></a>
          <a href="#" className="hover:text-pink-500"><BsInstagram /></a>
          <a href="#" className="hover:text-blue-500"><BsLinkedin /></a>
          <a href="#" className="hover:text-sky-400"><BsTwitter /></a>
        </div>
      </div>
    </footer>
  );
}
