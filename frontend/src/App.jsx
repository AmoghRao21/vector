import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import AuthPage from "./components/AuthPage";
import MockTestsPage from "./components/MockTestsPage";
import ContactPage from "./components/ContactPage";
import AIInterviewAgent from "./components/AIIntervieAgent"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/mock-tests" element={<MockTestsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/ai-interview" element={<AIInterviewAgent />} />
      </Routes>
    </Router>
  );
}
