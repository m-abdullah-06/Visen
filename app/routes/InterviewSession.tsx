import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import {
  Mic,
  MicOff,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
import { generateUUID } from "~/lib/utils";
export const meta = () => [
  { title: "Visen | Interview Prep" },
  {
    name: "description",
    content:
      "An AI-powered career intelligence platform that helps job seekers optimize their resumes and simulate real interview experiences with personalized feedback.",
  },
];

interface Question {
  id: string;
  question: string;
  category: "behavioral" | "technical" | "situational";
  difficulty: "easy" | "medium" | "hard";
  tips: string[];
  answer?: string;
  score?: number;
  feedback?: string;
}

const InterviewSession = () => {
  const { auth, kv, ai } = usePuterStore();
  const navigate = useNavigate();
  const { id } = useParams(); // Session ID (or "new")
  const [searchParams] = useSearchParams();
  const resumeId = searchParams.get("resumeId");

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [answer, setAnswer] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadOrGenerateQuestions = async () => {
      if (id === "new" && resumeId) {
        // Generate new questions
        await generateQuestions(resumeId);
      } else if (id !== "new") {
        // Load existing session
        await loadSession(id);
      }
    };

    loadOrGenerateQuestions();
  }, [id, resumeId]);

  // Timer effect
  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isTimerRunning]);

  const generateQuestions = async (resumeId: string) => {
    setLoadingQuestions(true);

    // Get resume data
    const resumeData = await kv.get(`resume:${resumeId}`);
    if (!resumeData) return;

    const resume = JSON.parse(resumeData);

    // Generate questions using AI
    const prompt = `Based on this resume for a ${resume.jobTitle} at ${resume.companyName}, generate 10 interview questions.

Resume details:
- Job Title: ${resume.jobTitle}
- Company: ${resume.companyName}
- Job Description: ${resume.jobDescription}

Generate a mix of:
- 4 behavioral questions (STAR method)
- 3 technical questions (role-specific)
- 3 situational questions (problem-solving)

For EACH question, provide:
1. The question
2. Category (behavioral/technical/situational)
3. Difficulty (easy/medium/hard)
4. 2-3 tips for answering

Return as JSON array with this structure:
[
  {
    "question": "Tell me about a time...",
    "category": "behavioral",
    "difficulty": "medium",
    "tips": ["Use STAR method", "Focus on impact", "Be specific"]
  }
]

Return ONLY the JSON array, no other text.`;

    try {
      const response = await ai.chat(prompt);

      // Check if response exists
      if (!response || !response.message || !response.message.content) {
        throw new Error("AI did not return a valid response");
      }

      const responseText =
        typeof response.message.content === "string"
          ? response.message.content
          : response.message.content[0].text;

      // Parse questions
      const cleanJson = responseText.replace(/```json|```/g, "").trim();
      const generatedQuestions = JSON.parse(cleanJson);

      const questionsWithIds = generatedQuestions.map((q: any) => ({
        ...q,
        id: generateUUID(),
      }));

      setQuestions(questionsWithIds);

      // Save session
      const sessionId = generateUUID();
      const session = {
        id: sessionId,
        resumeId,
        jobTitle: resume.jobTitle,
        companyName: resume.companyName,
        createdAt: new Date().toISOString(),
        questions: questionsWithIds,
        questionsAnswered: 0,
        totalQuestions: questionsWithIds.length,
        averageScore: 0,
      };

      await kv.set(`interview:${sessionId}`, JSON.stringify(session));

      // Update URL to show session ID
      navigate(`/interview-prep/session/${sessionId}`, { replace: true });
    } catch (error) {
      console.error("Error generating questions:", error);
      alert(
        "Failed to generate questions. Please try again or check your internet connection.",
      );
      navigate("/interview-prep");
    }

    setLoadingQuestions(false);
  };

  const loadSession = async (sessionId: string) => {
    setLoadingQuestions(true);
    const sessionData = await kv.get(`interview:${sessionId}`);
    if (sessionData) {
      const session = JSON.parse(sessionData);
      setQuestions(session.questions || []);
    }
    setLoadingQuestions(false);
  };

  const handleStartRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/webm" });
        // Convert to text (would need speech-to-text API)
        // For now, just show recording stopped
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsTimerRunning(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream
        .getTracks()
        .forEach((track) => track.stop());
      setIsRecording(false);
      setIsTimerRunning(false);
    }
  };

  const handleAnalyzeAnswer = async () => {
    if (!answer.trim()) return;

    setIsAnalyzing(true);

    const currentQuestion = questions[currentIndex];

    const prompt = `Evaluate this interview answer:

Question: ${currentQuestion.question}
Category: ${currentQuestion.category}
Difficulty: ${currentQuestion.difficulty}

Answer: ${answer}

Provide:
1. Score out of 100
2. Strengths (what was good)
3. Areas for improvement
4. Suggested better answer

Return as JSON:
{
  "score": 85,
  "strengths": ["Clear structure", "Good examples"],
  "improvements": ["Could add more metrics", "Expand on outcome"],
  "suggestedAnswer": "Here's a better version..."
}

Return ONLY JSON, no other text.`;

    try {
      const response = await ai.chat(prompt);

      // Check if response exists
      if (!response || !response.message || !response.message.content) {
        throw new Error("AI did not return a valid response");
      }

      const responseText =
        typeof response.message.content === "string"
          ? response.message.content
          : response.message.content[0].text;

      const cleanJson = responseText.replace(/```json|```/g, "").trim();
      const evaluation = JSON.parse(cleanJson);

      // Update question with answer and feedback
      const updatedQuestions = [...questions];
      updatedQuestions[currentIndex] = {
        ...currentQuestion,
        answer,
        score: evaluation.score,
        feedback: JSON.stringify(evaluation),
      };

      setQuestions(updatedQuestions);

      // Save updated session
      if (id !== "new") {
        const sessionData = await kv.get(`interview:${id}`);
        if (sessionData) {
          const session = JSON.parse(sessionData);
          const answeredCount = updatedQuestions.filter((q) => q.answer).length;
          const avgScore =
            updatedQuestions
              .filter((q) => q.score)
              .reduce((acc, q) => acc + (q.score || 0), 0) / answeredCount || 0;

          session.questions = updatedQuestions;
          session.questionsAnswered = answeredCount;
          session.averageScore = Math.round(avgScore);

          await kv.set(`interview:${id}`, JSON.stringify(session));
        }
      }
    } catch (error) {
      console.error("Error analyzing answer:", error);
      alert("Failed to analyze your answer. Please try again.");
    }

    setIsAnalyzing(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentQuestion = questions[currentIndex];
  const feedback = currentQuestion?.feedback
    ? JSON.parse(currentQuestion.feedback)
    : null;

  if (loadingQuestions) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl text-center">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-400">Generating personalized questions...</p>
        </div>
      </main>
    );
  }

  if (!currentQuestion) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white flex items-center justify-center">
        <div className="glass-card p-8 rounded-3xl text-center">
          <p className="text-gray-400">No questions found</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .primary-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }
        
        .primary-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 py-12 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate("/interview-prep")}
            className="glass-card px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            Back
          </button>
          <div className="glass-card px-6 py-2 rounded-full">
            <span className="text-gray-400">
              Question {currentIndex + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-8 rounded-3xl mb-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentQuestion.category === "behavioral"
                      ? "bg-blue-500/20 text-blue-400"
                      : currentQuestion.category === "technical"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-green-500/20 text-green-400"
                  }`}
                >
                  {currentQuestion.category}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    currentQuestion.difficulty === "easy"
                      ? "bg-green-500/20 text-green-400"
                      : currentQuestion.difficulty === "medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {currentQuestion.difficulty}
                </span>
              </div>
              <h2 className="text-3xl font-bold mb-6">
                {currentQuestion.question}
              </h2>

              {/* Tips */}
              <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 mb-6">
                <p className="text-sm font-semibold text-indigo-400 mb-2">
                  💡 Tips:
                </p>
                <ul className="space-y-1">
                  {currentQuestion.tips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-indigo-400">•</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Timer */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-4xl font-bold font-mono">
              {formatTime(timer)}
            </div>
            <button
              onClick={() => {
                setTimer(0);
                setIsTimerRunning(false);
              }}
              className="glass-card p-2 rounded-lg hover:bg-white/10 transition"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Recording Controls */}
          <div className="flex justify-center gap-4 mb-6">
            {!isRecording ? (
              <button
                onClick={handleStartRecording}
                className="primary-button px-8 py-4 rounded-full flex items-center gap-2 font-semibold text-lg"
              >
                <Mic className="w-6 h-6" />
                Start Recording "Coming Soon"
              </button>
            ) : (
              <button
                onClick={handleStopRecording}
                className="bg-red-500 hover:bg-red-600 px-8 py-4 rounded-full flex items-center gap-2 font-semibold text-lg transition"
              >
                <MicOff className="w-6 h-6" />
                Stop Recording
              </button>
            )}
          </div>

          {/* Text Answer */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-400 mb-2">
              Type Your Answer:
            </label>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Type your answer here..."
              rows={8}
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:border-indigo-500 text-white placeholder-gray-500"
            />
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyzeAnswer}
            disabled={!answer.trim() || isAnalyzing}
            className="w-full primary-button py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                Analyzing...
              </>
            ) : (
              <>
                <Check className="w-5 h-5" />
                Get Feedback
              </>
            )}
          </button>
        </div>

        {/* Feedback Card */}
        {feedback && (
          <div className="glass-card p-8 rounded-3xl mb-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">Your Performance</h3>
              <div className="text-4xl font-bold gradient-text">
                {feedback.score}/100
              </div>
            </div>

            {/* Strengths */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-green-400 mb-3">
                ✅ Strengths
              </h4>
              <ul className="space-y-2">
                {feedback.strengths.map((strength: string, idx: number) => (
                  <li
                    key={idx}
                    className="text-gray-300 flex items-start gap-2"
                  >
                    <span className="text-green-400">•</span>
                    {strength}
                  </li>
                ))}
              </ul>
            </div>

            {/* Improvements */}
            <div className="mb-6">
              <h4 className="text-lg font-semibold text-yellow-400 mb-3">
                💡 Areas for Improvement
              </h4>
              <ul className="space-y-2">
                {feedback.improvements.map(
                  (improvement: string, idx: number) => (
                    <li
                      key={idx}
                      className="text-gray-300 flex items-start gap-2"
                    >
                      <span className="text-yellow-400">•</span>
                      {improvement}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Suggested Answer */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-6">
              <h4 className="text-lg font-semibold text-indigo-400 mb-3">
                💭 Suggested Approach
              </h4>
              <p className="text-gray-300 leading-relaxed">
                {feedback.suggestedAnswer}
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              setCurrentIndex(Math.max(0, currentIndex - 1));
              setAnswer("");
              setTimer(0);
              setIsTimerRunning(false);
            }}
            disabled={currentIndex === 0}
            className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <button
            onClick={() => {
              setCurrentIndex(Math.min(questions.length - 1, currentIndex + 1));
              setAnswer("");
              setTimer(0);
              setIsTimerRunning(false);
            }}
            disabled={currentIndex === questions.length - 1}
            className="glass-card px-6 py-3 rounded-full hover:bg-white/10 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </main>
  );
};

export default InterviewSession;
