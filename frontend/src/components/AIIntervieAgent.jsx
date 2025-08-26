import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMicrophone, FaStop, FaDownload } from "react-icons/fa";

const AVATAR_URL = "/interviewer-avatar.svg"; // Use your AI avatar or a nice SVG asset

export default function AIInterviewAgent() {
  const [messages, setMessages] = useState([
    { sender: "ai", text: "Welcome to your AI Interview. Press the mic and answer. Ready? 'Introduce yourself briefly.'" }
  ]);
  const [listening, setListening] = useState(false);
  const [recordedWaveform, setRecordedWaveform] = useState([]);
  const [transcriptLog, setTranscriptLog] = useState([]);
  const [interviewScore, setInterviewScore] = useState(null);

  // --- Web Speech API, waveform, etc ---
  const recognitionRef = useRef(null);

  // --- Live waveform dummy ---
  function WaveformBar({ active }) {
    return (
      <div className="flex items-end h-6 gap-[2px] w-36 mx-auto mb-2 transition-all">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="w-[4px] rounded bg-[#e99b63] shadow"
            animate={{
              height: active
                ? [2, 16 + (i % 4) * 6, 10, 10, 2]
                : [6, 8, 12, 6, 4],
            }}
            transition={{
              duration: 1.1 + i * 0.03,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
              delay: i * 0.045,
            }}
            style={{ opacity: active ? 0.75 : 0.25 + 0.04 * (i % 3) }}
          />
        ))}
      </div>
    );
  }

  // --- Handle voice input (mocking waveform recording & backend integration) ---
  const handleMic = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Voice recognition not supported in this browser.");
      return;
    }
    if (listening && recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
      setRecordedWaveform([]); // Reset waveform
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.onstart = () => setListening(true);
    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event) => {
      const userInput = event.results[0][0].transcript;
      setListening(false);
      setMessages((m) => [...m, { sender: "user", text: userInput }]);
      setTranscriptLog((t) => [
        ...t,
        { sender: "user", text: userInput, time: Date.now() },
      ]);
      sendToBackend(userInput);
    };
    recognitionRef.current = recognition;
    recognition.start();
  };

  // --- Integration: Real backend with OpenAI/Firebase ---
  async function sendToBackend(userInput) {
    // Replace with your own backend endpoint!
    const body = { message: userInput, transcript: transcriptLog };
    try {
      const res = await fetch("/api/ai-interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      setMessages((m) => [...m, { sender: "ai", text: data.reply }]);
      setTranscriptLog((t) => [
        ...t,
        { sender: "ai", text: data.reply, time: Date.now() },
      ]);
      setInterviewScore(data.score); // For scoring support
      speakAI(data.reply);
    } catch {
      setMessages((m) => [
        ...m,
        { sender: "ai", text: "Sorry, backend unavailable." },
      ]);
    }
  }

  // --- Voice output (AI's speech) ---
  function speakAI(text) {
    if ("speechSynthesis" in window) {
      const utter = new window.SpeechSynthesisUtterance(text);
      utter.rate = 1;
      utter.pitch = 1.08;
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);
    }
  }

  // --- Download transcript as .txt ---
  function downloadTranscript() {
    const txt = transcriptLog
      .map((e) => `[${new Date(e.time).toLocaleTimeString()}] ${e.sender === "ai" ? "AI" : "You"}: ${e.text}`)
      .join("\n");
    const blob = new Blob([txt], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "ai-interview-transcript.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  function ChatBubble({ sender, text }) {
    const isAI = sender === "ai";
    return (
      <motion.div
        layout
        className={`flex mb-3 items-start ${isAI ? "" : "justify-end"}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {isAI && (
          <motion.span
            className="mr-2 w-12 h-12 rounded-full bg-[#222] flex items-center justify-center shadow-xl border-2 border-[#e99b63]"
            initial={{ scale: 0.8 }}
            animate={{ scale: [1, 1.09, 1], boxShadow: ["0 0px #ffd36a", "0 10px 32px #e99b6344", "0 0px #ffd36a"] }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            <img src={AVATAR_URL} className="w-9 h-9" alt="AI" />
          </motion.span>
        )}
        <motion.div
          className={`rounded-xl px-5 py-3 shadow-lg max-w-[80vw] sm:max-w-[33vw] text-lg font-medium leading-relaxed
          ${isAI ? "bg-[#232226] text-white border-l-4 border-[#e99b63]" :
              "bg-[#f5eee9]/85 text-black border-r-4 border-[#ffb675] animate-slidein_user"}`
          }
          whileHover={isAI ? { scale: 1.025 } : {}}
        >
          {text}
        </motion.div>
        {!isAI && (
          <span className="ml-2 w-10 h-10 rounded-full bg-gradient-to-tr from-[#f7c073] to-[#e99b63] flex items-center justify-center text-black font-bold text-lg shadow-lg select-none">
            👤
          </span>
        )}
      </motion.div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#171413] via-black to-[#2a190e] flex items-center justify-center py-10 px-2">
      <section className="w-full max-w-3xl rounded-3xl shadow-2xl bg-[#191818]/90 border border-[#e99b6329] px-0 sm:px-8 py-10 flex flex-col justify-between">
        <header className="flex items-center gap-4 mb-7 px-6">
          <WaveformBar active={listening} />
          <span className="text-2xl text-[#e99b63] font-extrabold drop-shadow">AI Interview Agent</span>
          <button
            onClick={downloadTranscript}
            className="ml-auto flex gap-2 items-center text-xs text-[#e99b63]/80 hover:text-[#e99b63] bg-[#232226]/50 px-4 py-2 rounded-full border border-[#e99b6380] shadow transition"
            title="Download transcript"
          >
            <FaDownload className="mr-1" /> Transcript
          </button>
        </header>
        <div className="flex-1 px-2 sm:px-7 overflow-y-auto max-h-[60vh] scroll-smooth mb-7">
          <AnimatePresence>
            {messages.map((m, idx) => <ChatBubble key={idx} sender={m.sender} text={m.text} />)}
          </AnimatePresence>
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            onClick={handleMic}
            className={`rounded-full p-8 shadow-xl border-4 outline-none transition-all
              ${listening
                  ? "bg-gradient-to-tr from-green-400 to-[#e99b63] border-orange-200 scale-110 animate-pulse"
                  : "bg-gradient-to-tr from-[#e99b63] to-[#ffd36a] border-[#e99b63] hover:scale-110"}
            `}
            aria-label={listening ? "Stop Listening" : "Start Listening"}
          >
            {listening ? (
              <FaStop className="w-8 h-8 text-black" />
            ) : (
              <FaMicrophone className="w-8 h-8 text-black" />
            )}
          </button>
          <div className="mt-4 mb-2 text-[#aaa] text-base" aria-live="polite">
            {listening ? "Listening..." : "Press the mic and answer aloud"}
          </div>
          {interviewScore && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="mt-4 py-3 px-6 rounded-xl shadow-lg bg-gradient-to-l from-[#56fa9a66] to-[#ffd36a55] text-lg font-bold text-[#191818]"
            >
              Score: {interviewScore.score}/10 &mdash; {interviewScore.remark}
            </motion.div>
          )}
        </div>
      </section>
      <style>{`
        .animate-slidein_user {
          animation: slideUser .28s cubic-bezier(.69,.17,.18,1.02);
        }
        @keyframes slideUser {
          from { transform: translateX(68px) scale(.96); opacity: .38;}
          to { transform: none; opacity: 1;}
        }
      `}</style>
    </div>
  );
}

// Helper waveform bar
function WaveformBar({ active }) {
  return (
    <div className="flex items-end h-6 gap-[2px] w-28 mx-auto">
      {[...Array(18)].map((_, i) => (
        <motion.div
          key={i}
          className="w-[3px] rounded bg-[#e99b63] shadow"
          animate={{
            height: active
              ? [2, 16 + (i % 5) * 6, 12, 19, 8]
              : [6, 9, 8, 7, 6],
          }}
          transition={{
            duration: 1 + i * 0.02,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
            delay: i * 0.045,
          }}
          style={{ opacity: active ? 0.76 : 0.28 + 0.04 * (i % 3) }}
        />
      ))}
    </div>
  );
}
