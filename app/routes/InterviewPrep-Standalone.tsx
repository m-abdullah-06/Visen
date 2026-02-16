import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Navbar from "~/component/Navbar";
import { Brain, Clock, Target, Play, Sparkles } from "lucide-react";
import { generateUUID } from "~/lib/utils";

export const meta = () => [
  { title: "Visen | Interview Prep" },
  {
    name: "description",
    content:
      "An AI-powered career intelligence platform that helps job seekers optimize their resumes and simulate real interview experiences with personalized feedback.",
  },
];

interface InterviewSession {
  id: string;
  jobTitle: string;
  jobDescription: string;
  numberOfQuestions: number;
  createdAt: string;
  completed: boolean;
  questionsAnswered: number;
  averageScore: number;
}

const InterviewPrep = () => {
  const { auth, kv, ai } = usePuterStore();
  const navigate = useNavigate();

  const [sessions, setSessions] = useState<InterviewSession[]>([]);
  const [loadingSessions, setLoadingSessions] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/interview-prep");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    loadSessions();
  }, []);

  const loadSessions = async () => {
    setLoadingSessions(true);
    const sessionData = (await kv.list("interview:*", true)) as KVItem[];
    const parsedSessions = sessionData?.map(
      (session) => JSON.parse(session.value) as InterviewSession,
    );
    setSessions(parsedSessions || []);
    setLoadingSessions(false);
  };

  const handleCreateSession = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!jobTitle.trim() || !jobDescription.trim()) {
      alert("Please fill in all fields");
      return;
    }

    setGeneratingQuestions(true);

    try {
      // Generate questions using AI
      const prompt = `Generate ${numberOfQuestions} interview questions for a ${jobTitle} position.

Job Description:
${jobDescription}

Create a balanced mix of:
- Behavioral questions (STAR method)
- Technical questions (role-specific)
- Situational questions (problem-solving)

For EACH question, provide:
1. The question text
2. Category: "behavioral", "technical", or "situational"
3. Difficulty: "easy", "medium", or "hard"
4. 2-3 tips for answering well

Return as JSON array ONLY (no other text):
[
  {
    "question": "Tell me about a time...",
    "category": "behavioral",
    "difficulty": "medium",
    "tips": ["Use STAR method", "Focus on impact", "Be specific with metrics"]
  }
]`;

      const response = await ai.chat(prompt);
      const responseText =
        typeof response.message.content === "string"
          ? response.message.content
          : response.message.content[0].text;

      // Parse AI response
      const cleanJson = responseText.replace(/```json|```/g, "").trim();
      const questions = JSON.parse(cleanJson);

      // Add IDs to questions
      const questionsWithIds = questions.map((q: any) => ({
        ...q,
        id: generateUUID(),
        answer: "",
        score: 0,
        feedback: "",
      }));

      // Create new session
      const sessionId = generateUUID();
      const newSession: InterviewSession = {
        id: sessionId,
        jobTitle,
        jobDescription,
        numberOfQuestions,
        createdAt: new Date().toISOString(),
        completed: false,
        questionsAnswered: 0,
        averageScore: 0,
      };

      // Save session with questions
      await kv.set(
        `interview:${sessionId}`,
        JSON.stringify({
          ...newSession,
          questions: questionsWithIds,
        }),
      );

      // Navigate to practice session
      navigate(`/interview-prep/session/${sessionId}`);
    } catch (error) {
      console.error("Error generating questions:", error);
      alert("Failed to generate questions. Please try again.");
    }

    setGeneratingQuestions(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        
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
        
        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(102, 126, 234, 0.5);
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-80 h-80 bg-blue-600 rounded-full opacity-10 blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />

        <section className="main-section px-6 md:px-12">
          {/* Header */}
          <div className="page-heading py-16 text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Ace Your <span className="gradient-text">Interview</span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300">
              Practice with AI-generated questions tailored to any job
            </h2>
          </div>

          {/* Create New Session Form */}
          <div className="max-w-3xl mx-auto mb-16">
            <div className="glass-card p-8 rounded-3xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold">
                  Start New Practice Session
                </h3>
              </div>

              <form onSubmit={handleCreateSession} className="space-y-6">
                {/* Job Title */}
                <div className="form-div">
                  <label
                    htmlFor="job-title"
                    className="text-gray-300 mb-2 block font-semibold"
                  >
                    Job Title
                  </label>
                  <input
                    type="text"
                    id="job-title"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="e.g. Senior React Developer"
                    required
                    className="w-full"
                  />
                </div>

                {/* Job Description */}
                <div className="form-div">
                  <label
                    htmlFor="job-description"
                    className="text-gray-300 mb-2 block font-semibold"
                  >
                    Job Description
                  </label>
                  <textarea
                    id="job-description"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    placeholder="Paste the job description here or describe the role requirements..."
                    rows={6}
                    required
                    className="w-full"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    💡 Tip: The more detailed, the better the questions will be
                  </p>
                </div>

                {/* Number of Questions */}
                <div className="form-div">
                  <label
                    htmlFor="num-questions"
                    className="text-gray-300 mb-2 block font-semibold"
                  >
                    Number of Questions
                  </label>
                  <select
                    id="num-questions"
                    value={numberOfQuestions}
                    onChange={(e) =>
                      setNumberOfQuestions(Number(e.target.value))
                    }
                    className="w-full bg-transparent border border-gray-700 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value={5} className="text-black font-bold ">
                      5 questions (Quick practice)
                    </option>
                    <option value={10} className="text-black font-bold">
                      10 questions (Standard)
                    </option>
                    <option value={15} className="text-black font-bold ">
                      15 questions (Comprehensive)
                    </option>
                    <option value={20} className="text-black font-bold">
                      20 questions (Full prep)
                    </option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={generatingQuestions}
                  className="w-full primary-button py-4 rounded-full font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {generatingQuestions ? (
                    <>
                      <div className="animate-spin w-5 h-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Generating Questions...
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5" />
                      Generate Questions & Start
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Previous Sessions */}
          {sessions.length > 0 && (
            <div className="max-w-5xl mx-auto pb-20">
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Clock className="w-6 h-6 text-indigo-400" />
                Recent Practice Sessions
              </h3>

              <div className="grid grid-cols-1 gap-4">
                {sessions.map((session) => (
                  <Link
                    key={session.id}
                    to={`/interview-prep/session/${session.id}`}
                    className="glass-card p-6 rounded-2xl hover:bg-white/10 transition cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="text-xl font-bold mb-2">
                          {session.jobTitle}
                        </h4>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                          {session.jobDescription}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(session.createdAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Target className="w-4 h-4" />
                            {session.questionsAnswered}/
                            {session.numberOfQuestions} answered
                          </span>
                          {session.averageScore > 0 && (
                            <span className="flex items-center gap-1">
                              <Brain className="w-4 h-4" />
                              {session.averageScore}% avg
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        {session.completed ? (
                          <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-semibold">
                            Completed
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold">
                            In Progress
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loadingSessions && sessions.length === 0 && (
            <div className="max-w-3xl mx-auto text-center pb-20">
              <div className="glass-card p-12 rounded-3xl">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <Brain className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  No Practice Sessions Yet
                </h3>
                <p className="text-gray-400">
                  Fill out the form above to generate your first set of
                  interview questions!
                </p>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default InterviewPrep;
