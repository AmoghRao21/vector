import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function OrangeParticlesBG() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    const particles = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight / 2;
    }

    function Particle() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.5;
      this.size = Math.random() * 3 + 1;
      this.opacity = Math.random() * 0.5 + 0.1;
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
        height: "40vh",
        pointerEvents: "none",
        zIndex: 1,
      }}
      width={window.innerWidth}
      height={window.innerHeight / 2}
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}

export default function CallToAction() {
  return (
    <section
      className="w-full relative overflow-hidden py-20 min-h-[60vh]"
      style={{
        background: "#131313",
      }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 w-full h-[45vh] z-0 overflow-hidden pointer-events-none">
        <OrangeParticlesBG />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-4xl md:text-5xl font-extrabold mb-6 text-white"
          style={{ letterSpacing: "0.01em" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Start Your{" "}
          <span className="bg-gradient-to-r from-[#e99b63] via-[#fff6ec] to-[#e99b63] text-transparent bg-clip-text">
            NSET Preparation
          </span>{" "}
          Today
        </motion.h2>

        <motion.p
          className="text-lg md:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Join hundreds of students who are preparing for Scaler School of
          Technology's entrance exam with Vector.
        </motion.p>

        <motion.div
          className="flex justify-center items-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-[#e99b63] to-[#f9c199] hover:from-[#f9c199] hover:to-[#e99b63] font-bold rounded-full text-black hover:text-[#222] shadow-2xl hover:shadow-[0_0_40px_#e99b63] transition-all duration-300 text-xl md:text-2xl border-2 border-transparent hover:border-[#fff6ec]"
          >
            Get Started Now
            <i className="bx bx-right-arrow-alt text-2xl"></i>
          </a>
        </motion.div>

        <motion.div
          className="inline-block p-6 rounded-xl bg-gradient-to-tr from-[#171717]/90 via-[#222]/95 to-[#191919]/90 border border-[#e99b6341] backdrop-blur-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
        >
          <p className="text-sm text-gray-400 mb-2">
            By signing up, you agree to our{" "}
            <a href="#" className="text-[#e99b63] hover:underline">
              Terms
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#e99b63] hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </motion.div>
      </div>
    </section>
  );
}
