import React from "react";
import { motion } from "framer-motion";
import {
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
  FaExternalLinkAlt,
  FaQuestionCircle,
  FaHeadset,
  FaBook,
  FaChartLine,
} from "react-icons/fa";

const footerSections = [
  {
    title: "PREPARATION",
    icon: <FaChartLine className="text-[#e99b63]" />,
    links: [
      {
        name: "Test Series",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Topic-Wise Practice",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Mock Interviews",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Live Sessions",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Performance Analysis",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
    ],
  },
  {
    title: "RESOURCES",
    icon: <FaBook className="text-[#e99b63]" />,
    links: [
      {
        name: "About NSET Exam",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Syllabus",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Blog",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Success Stories",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "FAQ",
        href: "#",
        icon: <FaQuestionCircle className="text-xs" />,
      },
    ],
  },
  {
    title: "SUPPORT",
    icon: <FaHeadset className="text-[#e99b63]" />,
    links: [
      {
        name: "Help Center",
        href: "#",
        icon: <FaQuestionCircle className="text-xs" />,
      },
      {
        name: "Contact Us",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Privacy Policy",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Terms of Service",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
      {
        name: "Cookie Policy",
        href: "#",
        icon: <FaExternalLinkAlt className="text-xs" />,
      },
    ],
  },
];

const socialLinks = [
  {
    name: "YouTube",
    href: "#",
    icon: <FaYoutube />,
    hoverColor: "hover:text-red-500",
  },
  {
    name: "Instagram",
    href: "#",
    icon: <FaInstagram />,
    hoverColor: "hover:text-pink-500",
  },
  {
    name: "Twitter",
    href: "#",
    icon: <FaTwitter />,
    hoverColor: "hover:text-blue-400",
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: <FaLinkedin />,
    hoverColor: "hover:text-blue-600",
  },
];

function FooterSection({ section, index }) {
  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <div className="flex items-center gap-3 mb-6">
        {section.icon}
        <h3 className="text-lg font-bold text-white tracking-wider">
          {section.title}
        </h3>
      </div>
      <ul className="space-y-3">
        {section.links.map((link, linkIndex) => (
          <motion.li
            key={link.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.4,
              delay: index * 0.1 + linkIndex * 0.05,
            }}
          >
            <a
              href={link.href}
              className="flex items-center gap-2 text-gray-400 hover:text-[#e99b63] transition-colors duration-300 group"
            >
              <span className="group-hover:translate-x-1 transition-transform duration-300">
                {link.name}
              </span>
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {link.icon}
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer
      className="w-full relative overflow-hidden py-16"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #131313 50%, #0f0f0f 100%)",
      }}
    >
      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[60rem] h-1 bg-gradient-to-r from-transparent via-[#e99b63] to-transparent opacity-30"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Section */}
          <motion.div
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <h2 className="font-astron text-3xl font-light mb-4">
                <span className="bg-gradient-to-r from-[#e99b63] via-[#fff6ec] to-[#e99b63] text-transparent bg-clip-text">
                  VECTOR
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed text-sm">
                Comprehensive preparation resources to help you crack the Scaler
                School of Technology NSET entrance exam.
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm tracking-wide">
                FOLLOW US
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    className={`p-3 rounded-full bg-gradient-to-tr from-[#171717]/90 via-[#222]/95 to-[#191919]/90 border border-[#e99b6320] text-gray-400 ${social.hoverColor} hover:border-[#e99b63] transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Footer Sections */}
          {footerSections.map((section, index) => (
            <FooterSection
              key={section.title}
              section={section}
              index={index + 1}
            />
          ))}
        </div>

        {/* Bottom Border */}
        <div className="border-t border-[#e99b6320] pt-8">
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <p className="text-gray-500 text-sm">
              © 2025 Vector. All rights reserved.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
