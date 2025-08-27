import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "./Footer";
import testData from "../data/testData.json";

// Particle background component
function TestParticlesBG() {
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
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = (Math.random() - 0.5) * 0.3;
      this.size = Math.random() * 2 + 1;
      this.opacity = Math.random() * 0.3 + 0.1;
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

    for (let i = 0; i < 50; i++) {
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

    return () => {
      window.removeEventListener("resize", resize);
    };
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

const TestStartPage = () => {
  const [agreed, setAgreed] = useState(false);
  const [showFullscreenModal, setShowFullscreenModal] = useState(false);
  const navigate = useNavigate();
  const { testId } = useParams();

  // Get test data based on testId from URL params, default to first test
  const currentTest = testId
    ? testData.tests.find((test) => test.id === testId) || testData.tests[0]
    : testData.tests[0];

  const handleStartTest = () => {
    if (agreed) {
      setShowFullscreenModal(true);
    }
  };

  const handleEnterFullscreen = async () => {
    try {
      await document.documentElement.requestFullscreen();
      setShowFullscreenModal(false);
      // Navigate to actual test page with testId
      navigate(`/test/${currentTest.id}`);
    } catch (error) {
      console.error("Error entering fullscreen:", error);
      alert("Unable to enter fullscreen mode. Please try again.");
    }
  };

  const handleCloseModal = () => {
    setShowFullscreenModal(false);
  };

  // Handle ESC key to close modal and prevent body scroll
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && showFullscreenModal) {
        handleCloseModal();
      }
    };

    if (showFullscreenModal) {
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [showFullscreenModal]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const noteVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden">
      <TestParticlesBG />

      {/* Glass overlay */}
      <div
        className="absolute inset-0 z-2"
        style={{
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(1px)",
        }}
      />

      <div className="relative z-10">
        {/* Logo Header - Same as Auth/Contact pages */}
        <div className="relative z-10 pt-8 pb-6">
          <div className="max-w-7xl mx-auto px-6">
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

        <motion.div
          className="container mx-auto px-4 lg:px-20 py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Test Header */}
          <motion.div className="text-center mb-12" variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 text-[#e99b63] font-bold tracking-wide">
              {currentTest.title}
            </h1>
            <p className="text-lg text-gray-400 mb-6">
              {currentTest.description}
            </p>
            <div className="text-lg md:text-xl text-gray-300 space-y-2">
              <div className="flex justify-center items-center space-x-6 flex-wrap">
                <span className="flex items-center">
                  <span className="text-[#e99b63] mr-2">⏱</span>
                  {currentTest.duration} minutes
                </span>
                <span className="flex items-center">
                  <span className="text-[#e99b63] mr-2">📝</span>
                  {currentTest.totalQuestions} questions
                </span>
              </div>
            </div>
          </motion.div>

          {/* Instructions Container */}
          <motion.div className="max-w-4xl mx-auto" variants={itemVariants}>
            <div className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
              {/* Instructions Title */}
              <motion.h2
                className="text-2xl md:text-3xl font-bold mb-8 text-center text-[#e99b63]"
                variants={itemVariants}
              >
                Instructions
              </motion.h2>

              {/* Instructions Content */}
              <motion.div
                className="space-y-6 text-gray-200 leading-relaxed"
                variants={itemVariants}
              >
                <ul className="space-y-4">
                  {currentTest.instructions.map((instruction, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#e99b63] mr-3 mt-1 flex-shrink-0">
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                          className="transform rotate-45"
                        >
                          <rect width="16" height="16" rx="2" />
                        </svg>
                      </span>
                      <span className={index === 0 ? "text-lg" : ""}>
                        {instruction}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Important Notes */}
                {currentTest.importantNotes.map((note, index) => (
                  <motion.div
                    key={index}
                    className={`rounded-lg p-4 ${
                      note.type === "warning"
                        ? "bg-yellow-500/20 border border-yellow-500/30"
                        : note.type === "error"
                        ? "bg-red-500/20 border border-red-500/30"
                        : "bg-blue-500/20 border border-blue-500/30"
                    }`}
                    variants={noteVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex items-start">
                      <span
                        className={`mr-3 mt-1 flex-shrink-0 ${
                          note.type === "warning"
                            ? "text-yellow-300"
                            : note.type === "error"
                            ? "text-red-300"
                            : "text-blue-300"
                        }`}
                      >
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 16 16"
                          fill="currentColor"
                        >
                          <path d="M8 0L16 8L8 16L0 8Z" />
                        </svg>
                      </span>
                      <p
                        className={
                          note.type === "warning"
                            ? "text-yellow-300"
                            : note.type === "error"
                            ? "text-red-300"
                            : "text-blue-300"
                        }
                      >
                        <span className="font-semibold">
                          {note.type === "warning"
                            ? "Important:"
                            : note.type === "error"
                            ? "Important:"
                            : "Note:"}
                        </span>{" "}
                        {note.text}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Test Components */}
              <motion.div className="mt-10 mb-8" variants={itemVariants}>
                <h3 className="text-xl font-semibold mb-6 text-[#e99b63]">
                  Test Components
                </h3>

                <div
                  className={`grid gap-6 ${
                    currentTest.components.length > 2
                      ? "md:grid-cols-3"
                      : "md:grid-cols-2"
                  }`}
                >
                  {currentTest.components.map((component, index) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-[#e99b63]/20 to-[#e99b63]/10 border border-[#e99b63]/30 rounded-xl p-6"
                    >
                      <h4 className="text-lg font-semibold mb-3 text-[#e99b63]">
                        {component.name}
                      </h4>
                      <p className="text-gray-300 text-sm">
                        {component.description}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Agreement Checkbox */}
              <motion.div
                className="border-t border-white/20 pt-8"
                variants={itemVariants}
              >
                <div className="flex items-start space-x-4 mb-6">
                  <input
                    type="checkbox"
                    id="agreement"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded border-2 border-[#e99b63] bg-transparent checked:bg-[#e99b63] checked:border-[#e99b63] focus:ring-2 focus:ring-[#e99b63]/50 focus:ring-offset-0"
                  />
                  <label
                    htmlFor="agreement"
                    className="text-gray-200 cursor-pointer"
                  >
                    {currentTest.agreementText}
                  </label>
                </div>

                {/* Start Test Button */}
                <div className="text-center">
                  <motion.button
                    onClick={handleStartTest}
                    disabled={!agreed}
                    className={`
                      px-12 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform
                      ${
                        agreed
                          ? "bg-[#e99b63] text-black hover:bg-[#f9c199] hover:scale-105 shadow-lg cursor-pointer"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
                      }
                    `}
                    whileHover={agreed ? { scale: 1.05 } : {}}
                    whileTap={agreed ? { scale: 0.95 } : {}}
                  >
                    START TEST
                  </motion.button>
                </div>

                {!agreed && (
                  <motion.p
                    className="text-center text-gray-400 text-sm mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    Please agree to the instructions to start the test
                  </motion.p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        <Footer />
      </div>

      {/* Fullscreen Modal */}
      <AnimatePresence>
        {showFullscreenModal && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-gradient-to-br from-white/10 via-white/5 to-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl max-w-md w-full mx-4"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
            >
              {/* Modal Header */}
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-[#e99b63] mb-2">
                  Start {currentTest.title}
                </h3>
                <div className="w-16 h-1 bg-gradient-to-r from-[#e99b63] to-[#f9c199] mx-auto rounded-full"></div>
              </div>

              {/* Modal Content */}
              <div className="text-center text-gray-200 space-y-4 mb-8">
                <p className="text-lg">
                  This test must be taken in full-screen mode. The test will
                  automatically end if you exit full-screen mode for more than
                  45 seconds.
                </p>

                <div className="bg-yellow-500/20 border border-yellow-500/30 rounded-lg p-4">
                  <p className="text-yellow-300 font-medium">
                    Full-screen mode is required for this test.
                  </p>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  onClick={handleCloseModal}
                  className="flex-1 px-6 py-3 rounded-full border border-gray-600 text-gray-300 font-medium transition-all duration-300 hover:bg-gray-600/20 hover:border-gray-500"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>

                <motion.button
                  onClick={handleEnterFullscreen}
                  className="flex-1 px-6 py-3 rounded-full bg-[#e99b63] text-black font-medium transition-all duration-300 hover:bg-[#f9c199] shadow-lg"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enter Fullscreen & Start
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestStartPage;
