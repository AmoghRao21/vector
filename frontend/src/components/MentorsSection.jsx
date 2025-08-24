import React, { useEffect, useRef } from "react";
import { FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

// Your actual data here
const MENTORS = [
  {
    name: "Shaurya Verma",
    role: "Co-Founder",
    tagline: "Guided 25+ aspirants for NSET",
    image: "/avatars/shaurya.jpg",
    achievements: [
      "Offered 20% scholarship at SST",
      "Member @NoIgn-Club-SST",
      "⭐⭐ @CodeChef",
    ],
    linkedin: "https://www.linkedin.com/in/shauryaverma",
  },
  {
    name: "Rudhar Bajaj",
    role: "Co-Founder",
    tagline: "Guided 20+ aspirants for NSET",
    image: "/avatars/rudhar.jpg",
    achievements: [
      "Offered 20% scholarship at SST",
      "AIR 24k in JEE Advanced",
      "AIR 3 in NSTISE",
    ],
    linkedin: "https://www.linkedin.com/in/rudharbajaj",
  },
  {
    name: "Aatmik Panse",
    role: "",
    tagline: "",
    image: "/avatars/aatmik.jpg",
    achievements: [
      "Ex intern @Skai Lama",
      "Core member @XR Club-SST",
      "Founding member of innovation lab",
    ],
    linkedin: "https://www.linkedin.com/in/aatmikpanse",
  },
  {
    name: "Srinidhi Nanda",
    role: "",
    tagline: "",
    image: "/avatars/srinidhi.jpg",
    achievements: [
      "Female president @SST",
      "Member @NoIgn-Club-SST",
      "⭐⭐ @CodeChef",
    ],
    linkedin: "https://www.linkedin.com/in/srinidhinanda",
  },
];

// Particle background: canvas-based for performance and beauty
function OrangeParticlesBG() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    const dots = 44; // Controls effect density
    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 1.5;
      createParticles();
    }
    function createParticles() {
      particles = [];
      for (let i = 0; i < dots; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: 1 + Math.random() * 2,
          dx: -0.1 + Math.random() * 0.2,
          dy: -0.1 + Math.random() * 0.2,
          opacity: 0.33 + Math.random() * 0.33,
        });
      }
    }
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        ctx.beginPath();
        let gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 8);
        gradient.addColorStop(0, "rgba(233,155,99," + p.opacity + ")");
        gradient.addColorStop(1, "rgba(233,155,99,0)");
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.r * 8, 0, 2 * Math.PI);
        ctx.fill();
        p.x += p.dx;
        p.y += p.dy;
        // Wrap around
        if (p.x < -16) p.x += canvas.width + 32;
        if (p.x > canvas.width + 16) p.x -= canvas.width + 32;
        if (p.y < -16) p.y += canvas.height + 32;
        if (p.y > canvas.height + 16) p.y -= canvas.height + 32;
      }
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
        height: "60vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
      width={window.innerWidth}
      height={window.innerHeight / 1.5}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

function MentorCard({ mentor, idx }) {
  return (
    <motion.div
      className="mentor-card relative w-[325px] max-w-[90vw] rounded-2xl flex-shrink-0 p-8 mx-3 mb-4 overflow-hidden bg-gradient-to-tr from-[#171717]/90 via-[#222]/95 to-[#191919]/90 border border-[#e99b6341] backdrop-blur-lg shadow-lg hover:shadow-[#e99b63ab] transition duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: idx * 0.14,
        type: "spring",
        stiffness: 80,
        damping: 11,
      }}
      whileHover={{
        scale: 1.04,
        zIndex: 10,
        boxShadow: "0 6px 28px #e99b63c2",
      }}
      style={{ minWidth: "280px" }}
    >
      <div className="flex justify-center mb-4 relative">
        <div className="relative w-20 h-20">
          <span
            className="absolute inset-0 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{
              background:
                "radial-gradient(circle, #e99b63cc 50%, transparent 100%)",
              filter: "blur(16px)",
              zIndex: 0,
            }}
          />
          <img
            alt={mentor.name}
            src={mentor.image}
            className="relative z-10 w-20 h-20 rounded-full object-cover border-[3px] border-[#e99b63] shadow-xl"
          />
        </div>
      </div>
      <div className="text-center mb-3">
        <h3 className="text-xl font-bold text-white tracking-wider">
          {mentor.name}{" "}
          {mentor.role && (
            <span className="text-gray-400">({mentor.role})</span>
          )}
        </h3>
        {mentor.tagline && (
          <p className="text-[#e99b63] mt-1 text-xs font-semibold">
            {mentor.tagline}
          </p>
        )}
      </div>
      <div className="p-4 rounded-lg bg-[#212129] bg-opacity-97 mb-6 text-xs text-gray-200">
        <div className="font-semibold mb-2 text-white tracking-wide">
          ACHIEVEMENTS
        </div>
        <ul className="list-disc list-inside space-y-1">
          {mentor.achievements.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center">
        <a
          href={mentor.linkedin}
          rel="noopener noreferrer"
          target="_blank"
          className="inline-flex items-center gap-2 px-5 py-2 bg-[#e99b63] hover:bg-[#f9c199] font-semibold rounded-full text-black hover:text-[#222] shadow-md transition duration-300"
        >
          <FaLinkedin />
          Connect on LinkedIn
        </a>
      </div>
    </motion.div>
  );
}

export default function MentorsSection() {
  return (
    <section
      className="w-full relative overflow-hidden py-20 min-h-[80vh]"
      style={{
        background: "#131313",
      }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 w-full h-[65vh] z-0 overflow-hidden pointer-events-none">
        <OrangeParticlesBG />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <h2
          className="text-center text-4xl md:text-5xl font-extrabold mb-5 text-white"
          style={{ letterSpacing: "0.01em" }}
        >
          Our{" "}
          <span className="bg-gradient-to-r from-[#e99b63] via-[#fff6ec] to-[#e99b63] text-transparent bg-clip-text">
            Mentors
          </span>
        </h2>
        <p className="text-center mb-10 max-w-2xl mx-auto text-gray-300 text-base md:text-lg">
          Learn from experienced SST students who've excelled in the NSET exam
          and are ready to guide you to success.
        </p>
        <div
          className="mentor-scroll-area w-full overflow-x-auto overflow-y-hidden flex space-x-4 scroll-smooth py-2 scrollbar-hide"
          style={{
            WebkitOverflowScrolling: "touch",
          }}
        >
          {MENTORS.map((mentor, idx) => (
            <MentorCard key={mentor.name} mentor={mentor} idx={idx} />
          ))}
        </div>
        <p className="text-center text-sm text-gray-500 mt-8 select-none cursor-default">
          &larr; Scroll to see more mentors &rarr;
        </p>
        <p className="mt-4 text-center text-xs text-gray-600">
          Our mentors have successfully navigated the NSET journey and are
          passionate about helping you succeed.
        </p>
      </div>
      <style>{`
        /* Hide scrollbar for Chrome/Safari/Webkit */
        .scrollbar-hide::-webkit-scrollbar {
          display: none !important;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
