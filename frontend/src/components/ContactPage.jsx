import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  FaPhone,
  FaEnvelope,
  FaArrowLeft,
  FaPaperPlane,
  FaUser,
  FaTag,
} from "react-icons/fa";

// Particle background
function ContactParticlesBG() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.4 + 0.1;
    }

    Particle.prototype.update = function () {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
      if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    };

    Particle.prototype.draw = function () {
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = "#e99b63";
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    };

    for (let i = 0; i < 60; i++) {
      particles.push(new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });
      requestAnimationFrame(animate);
    }
    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
      width={window.innerWidth}
      height={window.innerHeight}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

const contactInfo = [
  {
    icon: <FaPhone />,
    title: "Call Us",
    details: ["+91 12345 67890"],
    description: "Available Mon-Fri, 9 AM - 6 PM",
  },
  {
    icon: <FaEnvelope />,
    title: "Email Us",
    details: ["support@vector.com"],
    description: "We'll respond within 24 hours",
  },
];

function ContactCard({ info, index }) {
  return (
    <motion.div
      className="bg-gradient-to-tr from-[#171717]/90 via-[#222]/95 to-[#191919]/90 border border-[#e99b6341] backdrop-blur-lg rounded-2xl p-6 shadow-lg hover:shadow-[#e99b63ab] transition-all duration-300 text-center min-w-[280px] flex-1"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      whileHover={{ scale: 1.05, boxShadow: "0 8px 32px #e99b63c2" }}
    >
      <div className="flex flex-col items-center mb-4">
        <div className="p-4 bg-[#e99b63] text-black rounded-full mb-3 text-xl">
          {info.icon}
        </div>
        <h3 className="text-xl font-bold text-white">{info.title}</h3>
      </div>
      <div className="space-y-2 mb-3">
        {info.details.map((detail, idx) => (
          <p key={idx} className="text-[#e99b63] font-semibold text-lg">
            {detail}
          </p>
        ))}
      </div>
      <p className="text-gray-400 text-sm">{info.description}</p>
    </motion.div>
  );
}

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    // Reset form
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: "#131313",
      }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <ContactParticlesBG />
      </div>

      {/* Background gradient effects */}
      <div className="absolute top-20 right-20 w-[40rem] h-[40rem] bg-[#e99b63] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-[35rem] h-[35rem] bg-[#e99b63] opacity-5 rounded-full blur-3xl"></div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-6">
        <div className="max-w-7xl mx-auto px-6">
          {/* Logo */}
          <motion.a
            href="/"
            className="inline-block"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.05 }}
          >
            <h1 className="font-astron text-2xl md:text-3xl font-light">
              <span className="bg-gradient-to-r from-[#e99b63] via-[#fff6ec] to-[#e99b63] text-transparent bg-clip-text">
                VECTOR
              </span>
            </h1>
          </motion.a>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-extrabold mb-6 text-white"
            style={{ letterSpacing: "0.01em" }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-[#e99b63] via-[#fff6ec] to-[#e99b63] text-transparent bg-clip-text">
              Touch
            </span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have questions about NSET preparation? Need guidance on our courses?
            We're here to help you succeed in your journey to Scaler School of
            Technology.
          </motion.p>
        </div>

        {/* Contact Cards - Centered */}
        <motion.div
          className="flex flex-col md:flex-row gap-8 justify-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {contactInfo.map((info, index) => (
            <ContactCard key={info.title} info={info} index={index} />
          ))}
        </motion.div>

        {/* Contact Form - Centered */}
        <div className="flex justify-center">
          <motion.div
            className="w-full max-w-2xl bg-gradient-to-tr from-[#171717]/95 via-[#222]/98 to-[#191919]/95 backdrop-blur-xl border border-[#e99b6330] rounded-3xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send us a Message
              </h3>
              <p className="text-gray-400">
                We'd love to hear from you. Send us a message and we'll respond
                as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Your Name"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-[#e99b6330] rounded-xl text-white placeholder-gray-400 focus:border-[#e99b63] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Email Field */}
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Your Email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-[#e99b6330] rounded-xl text-white placeholder-gray-400 focus:border-[#e99b63] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Subject Field */}
              <div className="relative">
                <FaTag className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Subject"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-[#1a1a1a] border border-[#e99b6330] rounded-xl text-white placeholder-gray-400 focus:border-[#e99b63] focus:outline-none transition-colors duration-300"
                />
              </div>

              {/* Message Field */}
              <div className="relative">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Your Message"
                  required
                  rows="5"
                  className="w-full p-4 bg-[#1a1a1a] border border-[#e99b6330] rounded-xl text-white placeholder-gray-400 focus:border-[#e99b63] focus:outline-none transition-colors duration-300 resize-none"
                />
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#e99b63] to-[#f9c199] hover:from-[#f9c199] hover:to-[#e99b63] text-black font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#e99b63ab]"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaPaperPlane />
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Need Quick Answers?
          </h3>
          <p className="text-gray-400 mb-6">
            Check out our frequently asked questions for instant help.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-[#e99b63] hover:text-[#f9c199] font-semibold transition-colors duration-300"
          >
            Visit FAQ Section
            <i className="bx bx-right-arrow-alt"></i>
          </a>
        </motion.div>
      </div>
    </div>
  );
}
