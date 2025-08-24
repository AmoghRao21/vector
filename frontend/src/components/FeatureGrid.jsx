import React, { useRef, useEffect } from "react";
import {
  HiOutlineClipboardList,
  HiOutlineLightBulb,
  HiOutlineBookOpen,
  HiOutlineChartBar,
  HiOutlineUserGroup,
  HiOutlineClock,
} from "react-icons/hi";
import { motion, useAnimation } from "framer-motion";

// Features with colors & shapes
const FEATURES = [
  {
    icon: HiOutlineClipboardList,
    title: "Comprehensive Test Series",
    description:
      "Practice with a variety of question types that closely mimic the actual NSET exam format to build confidence and improve your score.",
    bgColors: ["#311f02", "#633b06"],
    svgPath: "M5 20 L15 10 L25 20 Z",
  },
  {
    icon: HiOutlineLightBulb,
    title: "Targeted Topic Practice",
    description:
      "Focus on specific topics and concepts that are frequently tested in the NSET exam to strengthen your understanding and skills.",
    bgColors: ["#091214", "#123b43"],
    svgPath: "M3 16 Q12 4 21 16 T39 16",
  },
  {
    icon: HiOutlineBookOpen,
    title: "Detailed Solutions",
    description:
      "Understand the concepts behind each question with comprehensive explanations and step-by-step solutions to improve your problem-solving skills.",
    bgColors: ["#32141c", "#5f3140"],
    svgPath: "M7 22 H30 Q38 10 47 22",
  },
  {
    icon: HiOutlineChartBar,
    title: "Performance Analysis",
    description:
      "Track your progress and identify areas for improvement with detailed performance analytics and personalized insights.",
    bgColors: ["#061014", "#1a3b43"],
    svgPath: "M2 12 L8 26 L14 12",
  },
  {
    icon: HiOutlineUserGroup,
    title: "Mentorship from SST Students",
    description:
      "Get guidance and tips from current Scaler School of Technology students who have successfully cleared the NSET exam.",
    bgColors: ["#3e1e0f", "#734628"],
    svgPath: "M7 25 L39 8 L55 26",
  },
  {
    icon: HiOutlineClock,
    title: "Time Management Strategies",
    description:
      "Learn effective strategies to manage your time during the exam and maximize your score with our timed practice tests and tips.",
    bgColors: ["#1a1711", "#4c473f"],
    svgPath: "M3 24 Q15 10 40 24",
  },
];

function useTilt(active) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current || !active) return;

    const handleMouseMove = (e) => {
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const dx = (x - midX) / midX;
      const dy = (y - midY) / midY;

      ref.current.style.setProperty("--px", dx);
      ref.current.style.setProperty("--py", dy);
    };

    ref.current.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (ref.current)
        ref.current.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);
  return ref;
}

function Card({ icon: Icon, title, description, bgColors, svgPath, index }) {
  const controls = useAnimation();
  const ref = useTilt(true);
  const spotlightRef = useRef(null);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.15,
        type: "spring",
        stiffness: 80,
        damping: 12,
      },
    });
  }, [controls, index]);

  const onMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (spotlightRef.current) {
      spotlightRef.current.style.left = `${x}px`;
      spotlightRef.current.style.top = `${y}px`;
    }
  };

  const onMouseLeave = () => {
    if (spotlightRef.current) {
      spotlightRef.current.style.left = "-100%";
      spotlightRef.current.style.top = "-100%";
    }
  };

  return (
    <motion.div
      ref={ref}
      tabIndex={0}
      role="region"
      aria-label={title}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative cursor-default rounded-3xl p-8 shadow-lg outline-none"
      style={{
        backgroundImage: `linear-gradient(135deg, ${bgColors[0]}, ${bgColors[1]})`,
        boxShadow: `0 10px 40px 0 ${bgColors[1]}88, inset 0 0 20px 8px ${bgColors[0]}cc`,
        transformStyle: "preserve-3d",
        transform: `rotateY(calc(var(--px, 0) * 15deg)) rotateX(calc(var(--py, 0) * -15deg))`,
        transition: "transform 0.2s ease-out",
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={controls}
      whileHover={{
        scale: 1.07,
        boxShadow: `0 15px 60px 0 ${bgColors[1]}ee, inset 0 0 30px 10px ${bgColors[0]}ff`,
      }}
    >
      {/* Animated SVG background shape */}
      <svg
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 opacity-10 select-none"
        width="120"
        height="80"
        fill="none"
        viewBox="0 0 60 40"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={svgPath} stroke="#e99b63" strokeWidth="1" />
      </svg>

      {/* Spotlight / cursor glow */}
      <div
        ref={spotlightRef}
        className="pointer-events-none absolute w-[150px] h-[150px] rounded-full bg-gradient-radial from-[#e99b63]/50 to-transparent opacity-0 blur-[26px] transition-opacity duration-300"
        style={{ left: "-100%", top: "-100%" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-6">
        <Icon
          className="w-14 h-14 text-[#e99b63] drop-shadow-lg"
          aria-hidden="true"
        />
        <h3 className="text-3xl font-extrabold tracking-wide text-white drop-shadow-lg">
          {title}
        </h3>
        <p className="text-gray-300 text-base leading-relaxed">{description}</p>
      </div>

      {/* Accent line */}
      <span className="absolute bottom-8 right-8 w-14 h-1 bg-gradient-to-r from-[#e99b63] to-[#f3b27a] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  );
}

export default function FeatureGrid() {
  return (
    <section className="w-full py-24 bg-[#111]">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="mb-12 text-center text-6xl font-extrabold text-white tracking-wide leading-tight">
          Everything You Need to{" "}
          <span className="bg-gradient-to-r from-[#e99b63] via-[#fff] to-[#e99b63] text-transparent bg-clip-text">
            Succeed
          </span>
        </h2>
        <p className="text-center max-w-4xl mx-auto mb-24 text-xl text-gray-400 tracking-wide">
          Our comprehensive preparation resources are designed to help you excel
          in the Scaler NSET exam
        </p>

        <div className="grid gap-14 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, idx) => (
            <Card key={feature.title} index={idx} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
