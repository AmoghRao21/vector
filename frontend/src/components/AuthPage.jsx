import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGoogle, FaArrowLeft } from "react-icons/fa";


function LoginParticlesBG() {
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

    for (let i = 0; i < 80; i++) {
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

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleGoogleAuth = () => {
    // Google OAuth logic here
    console.log("Google authentication triggered");
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
      style={{
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #131313 50%, #0f0f0f 100%)",
      }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <LoginParticlesBG />
      </div>

      {/* Background gradient effects */}
      <div className="absolute top-10 right-10 w-[30rem] h-[30rem] bg-[#e99b63] opacity-10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-[25rem] h-[25rem] bg-[#e99b63] opacity-5 rounded-full blur-3xl"></div>

      {/* Back to home button */}
      <motion.a
        href="/"
        className="absolute top-8 left-8 flex items-center gap-2 text-gray-400 hover:text-[#e99b63] transition-colors duration-300 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        whileHover={{ x: -5 }}
      >
        <FaArrowLeft />
        <span>Back to Home</span>
      </motion.a>

      {/* Logo */}
      <motion.div
        className="absolute top-8 right-8 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h1 className="font-astron text-2xl md:text-3xl font-light">
          <span className="bg-gradient-to-r from-[#e99b63] via-[#fff6ec] to-[#e99b63] text-transparent bg-clip-text">
            VECTOR
          </span>
        </h1>
      </motion.div>

      {/* Main Auth Container */}
      <motion.div
        className="relative z-10 w-full max-w-md mx-4"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        {/* Auth Card */}
        <div className="bg-gradient-to-tr from-[#171717]/95 via-[#222]/98 to-[#191919]/95 backdrop-blur-xl border border-[#e99b6330] rounded-3xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              {isLogin ? "Welcome Back" : "Get Started"}
            </motion.h2>
            <motion.p
              className="text-gray-400 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {isLogin
                ? "Continue your NSET preparation journey"
                : "Begin your NSET preparation with Vector"}
            </motion.p>
          </div>

          {/* Google Auth Button */}
          <motion.button
            onClick={handleGoogleAuth}
            className="w-full flex items-center justify-center gap-4 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl border border-gray-200 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaGoogle className="text-xl text-red-500" />
            <span className="text-lg">
              {isLogin ? "Sign in with Google" : "Sign up with Google"}
            </span>
          </motion.button>

          {/* Divider */}
          <motion.div
            className="flex items-center my-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e99b63] to-transparent"></div>
            <span className="px-4 text-gray-500 text-sm">
              {isLogin ? "New to Vector?" : "Already have an account?"}
            </span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#e99b63] to-transparent"></div>
          </motion.div>

          {/* Toggle Mode Button */}
          <motion.button
            onClick={toggleMode}
            className="w-full text-[#e99b63] hover:text-[#f9c199] font-semibold py-3 px-6 rounded-2xl border border-[#e99b63] hover:border-[#f9c199] transition-all duration-300 hover:bg-[#e99b63]/5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            {isLogin ? "Create new account" : "Sign in instead"}
          </motion.button>

          {/* Terms and Privacy */}
          <motion.p
            className="text-center text-xs text-gray-500 mt-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            By {isLogin ? "signing in" : "signing up"}, you agree to our{" "}
            <a href="#" className="text-[#e99b63] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#e99b63] hover:underline">
              Privacy Policy
            </a>
          </motion.p>
        </div>

        {/* Additional Info */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
        >
          <div className="inline-flex items-center gap-2 text-gray-400 text-sm">
            <div className="w-2 h-2 bg-[#e99b63] rounded-full animate-pulse"></div>
            <span>Join 500+ students preparing for NSET</span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
