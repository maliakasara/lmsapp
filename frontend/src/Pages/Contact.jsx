import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { axiosInstance } from "../Helpers/axiosInstance";
import { isEmail } from "../Helpers/regexMatcher";
import InputBox from "../Components/InputBox/InputBox";
import TextArea from "../Components/InputBox/TextArea";
import Layout from "../Layout/Layout";
import { FaPaperPlane } from "react-icons/fa";

export default function Contact() {
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(e) {
    const { name, value } = e.target;
    setUserInput((prev) => ({ ...prev, [name]: value }));
  }

  async function onFormSubmit(e) {
    e.preventDefault();
    if (!userInput.email || !userInput.name || !userInput.message) {
      toast.error("All fields are mandatory");
      return;
    }
    if (!isEmail(userInput.email)) {
      toast.error("Invalid email");
      return;
    }

    setIsLoading(true);
    const loadingMessage = toast.loading("Sending message...");
    try {
      const res = await axiosInstance.post("/contact", userInput);
      toast.success(res?.data?.message || "Message sent!", { id: loadingMessage });
      setUserInput({ name: "", email: "", message: "" });
    } catch (error) {
      toast.error("Message sending failed", { id: loadingMessage });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-tr from-gray-100 via-white to-gray-100 dark:from-[#121212] dark:via-[#1b1b1b] dark:to-[#121212]">
        <div className="w-full max-w-2xl p-8 rounded-2xl backdrop-blur-xl bg-white/80 dark:bg-[#1f1f1f]/80 shadow-2xl border border-gray-200 dark:border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold font-inter text-center text-gray-800 dark:text-white mb-6">
            Contact Us
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
            We'd love to hear from you! Fill out the form and we’ll get back to you soon.
          </p>

          <form onSubmit={onFormSubmit} className="space-y-6 font-bold" autoComplete="off" noValidate>
            <InputBox
              label="Your Name"
              name="name"
              type="text"
              placeholder="John Doe"
              value={userInput.name}
              onChange={handleInputChange}
            />
            <InputBox
              label="Your Email"
              name="email"
              type="email"
              placeholder="john@example.com"
              value={userInput.email}
              onChange={handleInputChange}
            />
            <TextArea
              label="Message"
              name="message"
              rows={6}
              placeholder="Write your message here..."
              value={userInput.message}
              onChange={handleInputChange}
            />

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 text-lg font-semibold rounded-md transition-all duration-300 ${
                isLoading
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-md"
              }`}
            >
              {isLoading ? "Sending..." : "Send Message"}
              {!isLoading && <FaPaperPlane className="animate-pulse" />}
            </button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
