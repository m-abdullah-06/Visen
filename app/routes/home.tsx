import type { Route } from "./+types/home";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import Navbar from "~/component/Navbar";
import ResumeCard from "~/component/resumecards";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Visen - AI-Powered Career Intelligence Platform" },
    {
      name: "description",
      content:
        "An AI-powered career intelligence platform that helps job seekers optimize their resumes and simulate real interview experiences with personalized feedback.",
    },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map(
        (resume) => JSON.parse(resume.value) as Resume,
      );

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
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

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl animate-float"
          style={{ animationDelay: "0s" }}
        />
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
          <div className="page-heading py-16 text-center max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight animate-fade-in-up">
              Next-Gen Resume Analysis for Your{" "}
              <span className="gradient-text">Dream Job</span>
            </h1>
            {!loadingResumes && resumes?.length === 0 ? (
              <h2
                className="text-xl md:text-2xl text-gray-300 animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                No resumes found. Upload your first resume to get feedback.
              </h2>
            ) : (
              <h2
                className="text-xl md:text-2xl text-gray-300 animate-fade-in-up"
                style={{ animationDelay: "0.1s" }}
              >
                Review your submissions and check AI-powered feedback.
              </h2>
            )}
          </div>

          {loadingResumes && (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="glass-card p-8 rounded-3xl">
                <img
                  src="/images/resume-scan-2.gif"
                  className="w-[200px]"
                  alt="Loading"
                />
                <p className="text-center mt-4 text-gray-400">
                  Analyzing your resumes...
                </p>
              </div>
            </div>
          )}

          {!loadingResumes && resumes.length > 0 && (
            <div className="resumes-section">
              {resumes.map((resume, idx) => (
                <div
                  key={resume.id}
                  className="animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <ResumeCard resume={resume} />
                </div>
              ))}
            </div>
          )}

          {!loadingResumes && resumes?.length === 0 && (
            <div className="flex flex-col items-center justify-center mt-10 gap-6 pb-20">
              <div className="glass-card p-12 rounded-3xl text-center max-w-2xl">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-3">
                  Ready to Get Started?
                </h3>
                <p className="text-gray-400 mb-6">
                  Upload your resume and let our AI provide instant feedback
                </p>
                <Link
                  to="/upload"
                  className="primary-button inline-block px-8 py-4 rounded-full text-lg font-semibold"
                >
                  Upload Resume
                </Link>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
