import React, {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaFilter, FaThLarge, FaListUl } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

// Particle background
function MockTestParticlesBG() {
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

const SUBJECTS = [
  "All Subjects",
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
];
const SUBJECT_COLORS = {
  Mathematics: "#e99b63",
  Physics: "#7cdfff",
  Chemistry: "#fb6281",
  Biology: "#41e27e",
  "Computer Science": "#fbbf24",
};
const DIFFICULTIES = ["All", "Easy", "Medium", "Hard"];
const DIFFICULTY_COLORS = {
  Easy: "#56fa9a",
  Medium: "#ffd36a",
  Hard: "#fb6281",
};
const MOCK_TESTS = [
  {
    id: 1,
    title: "Algebra Basics",
    subject: "Mathematics",
    difficulty: "Easy",
    duration: 60,
    totalQuestions: 25,
  },
  {
    id: 2,
    title: "Advanced Mechanics",
    subject: "Physics",
    difficulty: "Hard",
    duration: 90,
    totalQuestions: 40,
  },
  {
    id: 3,
    title: "Organic Chemistry Concepts",
    subject: "Chemistry",
    difficulty: "Medium",
    duration: 75,
    totalQuestions: 35,
  },
  {
    id: 4,
    title: "Data Structures",
    subject: "Computer Science",
    difficulty: "Medium",
    duration: 80,
    totalQuestions: 30,
  },
  {
    id: 5,
    title: "Genetics Overview",
    subject: "Biology",
    difficulty: "Easy",
    duration: 45,
    totalQuestions: 20,
  },
];

function Tag({ text, color }) {
  return (
    <motion.span
      whileHover={{ scale: 1.14 }}
      className="px-3 py-1 rounded-full text-xs font-bold mx-1 shadow cursor-pointer transition border"
      style={{
        background: color + "22",
        color,
        borderColor: color,
        backdropFilter: "blur(2px)",
      }}
    >
      {text}
    </motion.span>
  );
}

function MockTestCard({ test, view }) {
  const subjectColor = SUBJECT_COLORS[test.subject] || "#e99b63";
  const difficultyColor = DIFFICULTY_COLORS[test.difficulty] || "#fff";
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 80, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.97 }}
      whileHover={{
        scale: 1.045,
        boxShadow: `0 8px 38px ${subjectColor}44, 0 1px 10px ${difficultyColor}33, 0 0 0 3px #e99b63`,
        borderColor: subjectColor,
        transition: { duration: 0.25 },
      }}
      className={`group relative bg-gradient-to-br from-[#191919]/90 via-[#26262a]/80 to-[#181818] border border-[#26262a] rounded-2xl shadow-2xl ${
        view === "list"
          ? "flex-row px-10 py-7 min-h-[100px] flex items-center"
          : "flex flex-col min-h-[280px] px-7 py-7"
      } justify-between overflow-hidden`}
      style={{ transition: "box-shadow .2s cubic-bezier(.6,.4,0,1)" }}
    >
      <HiOutlineSparkles
        className={`absolute text-[#e99b63]/10 ${
          view === "list"
            ? "left-2 top-2 text-3xl opacity-30 blur-sm"
            : "left-8 top-7 text-6xl opacity-40 blur-lg"
        } pointer-events-none`}
        style={{ zIndex: 0 }}
      />
      <div
        className={`relative z-10 ${
          view === "list" ? "flex items-center gap-7 flex-1" : ""
        }`}
      >
        <div className="flex items-center mb-2">
          <Tag text={test.subject} color={subjectColor} />
          <Tag text={test.difficulty} color={difficultyColor} />
        </div>
        <div>
          <h3 className="text-xl font-black text-white mb-1 tracking-tight group-hover:text-[#e99b63] transition">
            {test.title}
          </h3>
          <p className="text-gray-400 text-sm mb-2">
            <span>{test.totalQuestions} Questions</span>
            <span className="mx-2 opacity-60">•</span>
            <span>{test.duration} minutes</span>
          </p>
        </div>
      </div>
      <motion.button
        whileHover={{
          scale: 1.055,
          background: "linear-gradient(90deg,#e99b63,#ffd36a 90%)",
          boxShadow: `0 4px 32px #e99b6333, 0 0 12px #ffd36a55`,
        }}
        transition={{ type: "spring", stiffness: 280, damping: 16 }}
        className={`ml-auto w-full ${
          view === "list" ? "max-w-[220px]" : ""
        } bg-gradient-to-r from-[#ffffff] to-[#ffffff] text-black font-extrabold py-2 mt-2 rounded-full shadow-xl hover:from-[#ffd36a] hover:to-[#e99b63] focus:outline-none focus:ring-2 focus:ring-[#ffd36a] transition text-lg`}
        aria-label={`Start test ${test.title}`}
      >
        Start Test
      </motion.button>
    </motion.div>
  );
}

export default function MockTestsPage() {
  const [subject, setSubject] = useState("All Subjects");
  const [difficulty, setDifficulty] = useState("All");
  const [search, setSearch] = useState("");
  const [view, setView] = useState("grid");

  const filteredTests = useMemo(() => {
    return MOCK_TESTS.filter((test) => {
      const subjectMatch =
        subject === "All Subjects" || test.subject === subject;
      const difficultyMatch =
        difficulty === "All" || test.difficulty === difficulty;
      const searchMatch = test.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return subjectMatch && difficultyMatch && searchMatch;
    });
  }, [subject, difficulty, search]);

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden"
      style={{
        background: "#131313",
      }}
    >
      {/* Particle Background */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        <MockTestParticlesBG />
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
      <div className="relative z-10 flex flex-col items-center py-8 px-6">
        <header className="pb-6 w-full max-w-7xl flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="text-5xl md:text-6xl font-black tracking-tight text-white text-center"
          >
            <span className="text-white font-astron">Mock Tests</span>
          </motion.h1>
          <p className="mt-4 mb-0 text-xl max-w-2xl text-gray-500 font-medium text-center">
            Master your preparation. Filter by subject, difficulty, or search
            and start instantly.
          </p>
        </header>

        <motion.section
          initial={{ opacity: 0, y: 19 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: "spring", stiffness: 110 }}
          className="sticky top-3 z-30 w-full max-w-5xl mb-10 px-4 relative bg-[#1a1111cc] rounded-3xl shadow-lg backdrop-blur-lg border border-[#e99b6322] flex flex-col md:flex-row md:items-center gap-5 px-5 py-4"
        >
          <div className="flex items-center gap-2">
            <FaFilter className="text-[#e99b63] text-xl" />
            <select
              className="bg-[#23232a] text-[#e99b63] border border-[#393337]/40 rounded-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-[#e99b63] font-semibold transition"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              {SUBJECTS.map((s) => (
                <option value={s} key={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#ffd36a] text-lg font-bold">•</span>
            <select
              className="bg-[#23232a] text-[#e99b63] border border-[#393337]/40 rounded-full py-2 px-5 focus:outline-none focus:ring-2 focus:ring-[#e99b63] font-semibold transition"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              {DIFFICULTIES.map((d) => (
                <option value={d} key={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div className="relative flex-1 min-w-[220px]">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-[#e99b63] text-base" />
            <input
              type="search"
              aria-label="Search mock tests"
              placeholder="Search by title..."
              className="pl-9 pr-3 py-2 w-full rounded-full bg-[#23232a] text-[#e99b63] border border-[#e99b63]/30 font-semibold shadow focus:outline-none focus:ring-2 focus:ring-[#ffd36a] transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 ml-2">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition ${
                view === "grid"
                  ? "bg-[#e99b63]/80 text-black shadow-lg"
                  : "bg-[#23232a] text-[#e99b63]"
              }`}
              title="Grid View"
            >
              <FaThLarge className="text-xl" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition ${
                view === "list"
                  ? "bg-[#e99b63]/80 text-black shadow-lg"
                  : "bg-[#23232a] text-[#e99b63]"
              }`}
              title="List View"
            >
              <FaListUl className="text-xl" />
            </button>
          </div>
        </motion.section>

        <motion.section
          layout
          className={`w-full px-4 pb-16 min-h-[50vh] ${
            view === "grid"
              ? "grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 max-w-7xl mx-auto"
              : "flex flex-col gap-7 w-full max-w-4xl mx-auto"
          }`}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.12 },
            },
          }}
        >
          <AnimatePresence>
            {filteredTests.length > 0 ? (
              filteredTests.map((test) => (
                <MockTestCard key={test.id} test={test} view={view} />
              ))
            ) : (
              <motion.p
                exit={{ opacity: 0 }}
                className="text-center col-span-full text-gray-500 font-semibold text-lg"
              >
                No tests found matching filters.
              </motion.p>
            )}
          </AnimatePresence>
        </motion.section>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none !important; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
