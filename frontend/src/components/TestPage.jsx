import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiClock,
  FiCheckCircle,
  FiXCircle,
  FiEye,
  FiBookmark,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiChevronUp,
  FiArrowLeft,
  FiGrid,
  FiList,
  FiUser,
  FiTarget,
  FiTrendingUp,
} from "react-icons/fi";
import testData from "../data/testData.json";
import questionData from "../data/questionData.json";

const TestPage = () => {
  const { testId } = useParams();
  const navigate = useNavigate();

  // Get test data
  const currentTest =
    testData.tests.find((test) => test.id === testId) || testData.tests[0];

  // Get questions from JSON data
  const testQuestions =
    questionData.questions[testId] || questionData.questions["mock-test-1"];

  // State management
  const [questions, setQuestions] = useState(testQuestions);
  const [currentView, setCurrentView] = useState("dashboard"); // dashboard or question
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(currentTest.duration * 60); // in seconds
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [collapsedSections, setCollapsedSections] = useState({});

  const toggleSection = (sectionName) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Auto submit when time is up
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time display
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Update question status and answer
  const updateQuestion = (questionId, updates) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === questionId ? { ...q, ...updates } : q))
    );
  };

  // Navigate to question
  const goToQuestion = (questionId) => {
    const question = questions.find((q) => q.id === questionId);
    if (question && question.status === "unseen") {
      updateQuestion(questionId, { status: "unattempted" });
    }
    setCurrentQuestionId(questionId);
    setCurrentView("question");
  };

  // Go to next/previous question
  const navigateQuestion = (direction) => {
    const currentIndex = questions.findIndex((q) => q.id === currentQuestionId);
    let newIndex;

    if (direction === "next" && currentIndex < questions.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === "prev" && currentIndex > 0) {
      newIndex = currentIndex - 1;
    } else {
      return;
    }

    goToQuestion(questions[newIndex].id);
  };

  // Submit test
  const handleSubmitTest = () => {
    setShowSubmitModal(true);
  };

  // Check if submit is allowed (all questions seen at least once)
  const canSubmit = questions.every((q) => q.status !== "unseen");

  // Get statistics
  const stats = {
    total: questions.length,
    attempted: questions.filter((q) => q.answer !== null).length,
    unattempted: questions.filter((q) => q.status === "unattempted").length,
    unseen: questions.filter((q) => q.status === "unseen").length,
    marked: questions.filter((q) => q.markedForReview).length,
  };

  // Get sections for dashboard
  const sections = currentTest.components.map((component, index) => ({
    id: index + 1,
    name: component.name,
    questions: questions.filter((q) => q.sectionName === component.name),
  }));

  const currentQuestion = questions.find((q) => q.id === currentQuestionId);

  return (
    <div className="min-h-screen bg-gray-50 select-none">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <h1 className="text-xl font-bold text-gray-800">
              {currentTest.name}
            </h1>
            {currentView === "question" && (
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600 flex items-center">
                  <FiList className="mr-1" />
                  Question {currentQuestion?.questionNumber} of{" "}
                  {questions.length}
                </span>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded flex items-center">
                  <FiTarget className="mr-1 text-xs" />
                  {currentQuestion?.sectionName}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-6">
            <div className="text-right">
              <div className="text-sm text-gray-600 flex items-center justify-end">
                <FiClock className="mr-1" />
                Time Remaining
              </div>
              <div
                className={`text-lg font-mono font-bold flex items-center justify-end ${
                  timeRemaining < 300 ? "text-red-600" : "text-gray-800"
                }`}
              >
                {formatTime(timeRemaining)}
              </div>
            </div>

            <button
              onClick={handleSubmitTest}
              disabled={!canSubmit}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                canSubmit
                  ? "bg-green-600 text-white hover:bg-green-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              <FiCheckCircle className="mr-2" />
              Submit Test
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        {currentView === "dashboard" ? (
          <TestDashboard
            sections={sections}
            onQuestionClick={goToQuestion}
            stats={stats}
            collapsedSections={collapsedSections}
            toggleSection={toggleSection}
          />
        ) : (
          <QuestionView
            question={currentQuestion}
            questions={questions}
            stats={stats}
            onUpdateQuestion={updateQuestion}
            onNavigate={navigateQuestion}
            onBackToDashboard={() => setCurrentView("dashboard")}
            onGoToQuestion={goToQuestion}
            collapsedSections={collapsedSections}
            toggleSection={toggleSection}
          />
        )}
      </div>

      {/* Submit Modal */}
      <AnimatePresence>
        {showSubmitModal && (
          <SubmitModal
            stats={stats}
            onConfirm={() => navigate("/")}
            onCancel={() => setShowSubmitModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Dashboard Component
const TestDashboard = ({
  sections,
  onQuestionClick,
  stats,
  collapsedSections,
  toggleSection,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <FiGrid className="text-blue-500 mr-2" />
            <div>
              <div className="text-2xl font-bold text-gray-800">
                {stats.total}
              </div>
              <div className="text-sm text-gray-600">Total Questions</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <FiCheckCircle className="text-green-500 mr-2" />
            <div>
              <div className="text-2xl font-bold text-green-600">
                {stats.attempted}
              </div>
              <div className="text-sm text-gray-600">Attempted</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <FiXCircle className="text-red-500 mr-2" />
            <div>
              <div className="text-2xl font-bold text-red-600">
                {stats.unattempted}
              </div>
              <div className="text-sm text-gray-600">Unattempted</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <FiEye className="text-gray-500 mr-2" />
            <div>
              <div className="text-2xl font-bold text-gray-600">
                {stats.unseen}
              </div>
              <div className="text-sm text-gray-600">Unseen</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm">
          <div className="flex items-center">
            <FiBookmark className="text-orange-500 mr-2" />
            <div>
              <div className="text-2xl font-bold text-orange-600">
                {stats.marked}
              </div>
              <div className="text-sm text-gray-600">Marked for Review</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => (
        <div
          key={section.id}
          className="bg-white rounded-lg border border-gray-200 shadow-sm"
        >
          <button
            onClick={() => toggleSection(section.name)}
            className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center">
              <FiTarget className="mr-2" />
              {section.name}
              <span className="ml-2 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {section.questions.length} questions
              </span>
            </h2>
            {collapsedSections[section.name] ? (
              <FiChevronDown />
            ) : (
              <FiChevronUp />
            )}
          </button>

          {!collapsedSections[section.name] && (
            <div className="border-t border-gray-200">
              <div className="p-4 space-y-2">
                {section.questions.map((question) => (
                  <motion.button
                    key={question.id}
                    onClick={() => onQuestionClick(question.id)}
                    className={`
                      w-full p-3 rounded-lg border-2 transition-all hover:shadow-md text-left
                      ${getQuestionStatusStyle(question)}
                    `}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <span className="text-lg font-bold text-gray-900">
                            Q{question.questionNumber}
                          </span>
                          {question.markedForReview && (
                            <FiBookmark className="ml-2 text-orange-500" />
                          )}
                        </div>
                        <div className="text-sm text-gray-700">
                          {question.question.length > 60
                            ? question.question.substring(0, 60) + "..."
                            : question.question}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                          {question.type.toUpperCase()}
                        </span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          {question.marks} mark{question.marks > 1 ? "s" : ""}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded ${
                            question.difficulty === "Easy"
                              ? "bg-green-100 text-green-700"
                              : question.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </motion.div>
  );
};

// Question View Component
const QuestionView = ({
  question,
  questions,
  stats,
  onUpdateQuestion,
  onNavigate,
  onBackToDashboard,
  onGoToQuestion,
  collapsedSections,
  toggleSection,
}) => {
  const handleAnswerChange = (answer) => {
    onUpdateQuestion(question.id, {
      answer,
      status: "attempted",
    });
  };

  const handleMarkForReview = () => {
    onUpdateQuestion(question.id, {
      markedForReview: !question.markedForReview,
    });
  };

  const sections = questions.reduce((acc, q) => {
    if (!acc[q.sectionName]) {
      acc[q.sectionName] = [];
    }
    acc[q.sectionName].push(q);
    return acc;
  }, {});

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Question Content */}
      <div className="lg:col-span-3 space-y-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-lg border border-gray-200 p-6"
        >
          {/* Question Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBackToDashboard}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <FiArrowLeft className="mr-1" />
              </button>
              <div className="h-6 border-l border-gray-300"></div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-bold flex items-center">
                  <FiTarget className="mr-1" />Q{question.questionNumber}
                </span>
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm flex items-center">
                  <FiList className="mr-1 text-xs" />
                  {question.type.toUpperCase()}
                </span>
                <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded text-sm flex items-center">
                  <FiTrendingUp className="mr-1 text-xs" />
                  {question.marks} mark{question.marks > 1 ? "s" : ""}
                </span>
                <span
                  className={`px-2 py-1 rounded text-sm flex items-center ${
                    question.difficulty === "Easy"
                      ? "bg-green-100 text-green-800"
                      : question.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {question.difficulty}
                </span>
              </div>
            </div>

            <button
              onClick={handleMarkForReview}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                question.markedForReview
                  ? "bg-orange-100 text-orange-800 border border-orange-300"
                  : "bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200"
              }`}
            >
              <FiBookmark className="mr-2" />
              {question.markedForReview ? "Unmark Review" : "Mark for Review"}
            </button>
          </div>

          {/* Question Text */}
          <div className="mb-6">
            <p className="text-lg text-gray-800 leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Answer Section */}
          <AnswerSection
            question={question}
            onAnswerChange={handleAnswerChange}
          />

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={() => onNavigate("prev")}
              disabled={question.questionNumber === 1}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <FiChevronLeft className="mr-1" />
              Previous
            </button>

            <button
              onClick={() => onNavigate("next")}
              disabled={question.questionNumber === questions.length}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {question.questionNumber === questions.length
                ? "Last Question"
                : "Next"}
              <FiChevronRight className="ml-1" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Question Panel */}
      <div className="lg:col-span-1">
        <QuestionPanel
          sections={sections}
          currentQuestionId={question.id}
          stats={stats}
          onGoToQuestion={onGoToQuestion}
          collapsedSections={collapsedSections}
          toggleSection={toggleSection}
        />
      </div>
    </div>
  );
};

// Answer Section Component
const AnswerSection = ({ question, onAnswerChange }) => {
  if (question.type === "mcq" && question.options) {
    return (
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <label
            key={index}
            className={`
              flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors
              ${
                question.answer === index
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <input
              type="radio"
              name={`question-${question.id}`}
              value={index}
              checked={question.answer === index}
              onChange={() => onAnswerChange(index)}
              className="mr-3 text-blue-600"
            />
            <span className="text-gray-800">{option}</span>
          </label>
        ))}
      </div>
    );
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Your Answer:
      </label>
      <textarea
        value={question.answer || ""}
        onChange={(e) => onAnswerChange(e.target.value)}
        placeholder="Type your answer here..."
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
        rows={4}
      />
    </div>
  );
};

// Question Panel Component
const QuestionPanel = ({
  sections,
  currentQuestionId,
  stats,
  onGoToQuestion,
  collapsedSections,
  toggleSection,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-4 sticky top-24"
    >
      {/* Stats */}
      <div className="mb-6">
        <h3 className="font-bold text-gray-800 mb-3 flex items-center">
          <FiTrendingUp className="mr-2" />
          Progress
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="flex items-center">
              <FiGrid className="mr-2 text-blue-500" />
              Total:
            </span>
            <span className="font-medium">{stats.total}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center">
              <FiCheckCircle className="mr-2 text-green-500" />
              Attempted:
            </span>
            <span className="font-medium">{stats.attempted}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center">
              <FiXCircle className="mr-2 text-red-500" />
              Unattempted:
            </span>
            <span className="font-medium">{stats.unattempted}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center">
              <FiEye className="mr-2 text-gray-500" />
              Unseen:
            </span>
            <span className="font-medium">{stats.unseen}</span>
          </div>
          <div className="flex justify-between">
            <span className="flex items-center">
              <FiBookmark className="mr-2 text-orange-500" />
              Marked:
            </span>
            <span className="font-medium">{stats.marked}</span>
          </div>
        </div>
      </div>

      {/* Question Grid */}
      <div className="space-y-3">
        {Object.entries(sections).map(([sectionName, sectionQuestions]) => (
          <div key={sectionName}>
            <button
              onClick={() => toggleSection(sectionName)}
              className="w-full flex items-center justify-between text-sm font-medium text-gray-700 mb-2 hover:text-gray-900"
            >
              <span className="flex items-center">
                <FiTarget className="mr-1" />
                {sectionName}
              </span>
              {collapsedSections[sectionName] ? (
                <FiChevronDown size={14} />
              ) : (
                <FiChevronUp size={14} />
              )}
            </button>
            {!collapsedSections[sectionName] && (
              <div className="grid grid-cols-5 gap-1 mb-3">
                {sectionQuestions.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => onGoToQuestion(q.id)}
                    className={`
                      relative w-8 h-8 text-xs font-medium rounded border-2 transition-all
                      ${
                        q.id === currentQuestionId
                          ? "border-blue-500 bg-blue-500 text-white scale-110"
                          : getQuestionStatusStyle(q)
                      }
                    `}
                  >
                    {q.questionNumber}
                    {q.markedForReview && (
                      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-orange-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
};

// Submit Modal Component
const SubmitModal = ({ stats, onConfirm, onCancel }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Submit Test</h3>

        <div className="space-y-3 mb-6">
          <p className="text-gray-600">
            Are you sure you want to submit your test?
          </p>

          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Questions:</span>
              <span className="font-medium">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span>Attempted:</span>
              <span className="font-medium text-green-600">
                {stats.attempted}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Unattempted:</span>
              <span className="font-medium text-red-600">
                {stats.unattempted}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Marked for Review:</span>
              <span className="font-medium text-orange-600">
                {stats.marked}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Submit Test
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Helper function for question status styling
const getQuestionStatusStyle = (question) => {
  if (question.answer !== null) {
    return "border-green-500 bg-green-100 text-green-900";
  } else if (question.status === "unattempted") {
    return "border-red-500 bg-red-100 text-red-900";
  } else {
    return "border-gray-300 bg-gray-100 text-gray-800";
  }
};

export default TestPage;
