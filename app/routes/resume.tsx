import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { usePuterStore } from "~/lib/puter";
import Summary from "~/component/Summary";
import ATS from "~/component/ATS";
import Details from "~/component/Details";

export const meta = () => [
  { title: "Visen | Resume Review" },
  {
    name: "description",
    content:
      "An AI-powered career intelligence platform that helps job seekers optimize their resumes and simulate real interview experiences with personalized feedback.",
  },
];

const Resume = () => {
  const { auth, isLoading, fs, kv } = usePuterStore();

  const { id } = useParams();

  const [imageUrl, setImageUrl] = useState("");
  const [resumeUrl, setResumeUrl] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated)
      navigate("/auth?next=/resume/${id}");
  }, [isLoading]);

  useEffect(() => {
    const loadResume = async () => {
      const resume = await kv.get(`resume:${id}`);

      if (!resume) return;

      const data = JSON.parse(resume);

      const resumeBlob = await fs.read(data.resumePath);
      if (!resumeBlob) return;

      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);

      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;

      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);

      setFeedback(data.feedback);
      console.log({ resumeUrl, imageUrl, feedback: data.feedback });
    };

    loadResume();
  }, [id]);

  return (
    <main className="!pt-0 min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">
      <style>{`
                @keyframes float {
                  0%, 100% { transform: translateY(0px); }
                  50% { transform: translateY(-20px); }
                }
                
                .animate-float {
                  animation: float 6s ease-in-out infinite;
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
        <nav className="resume-nav">
          <Link to="/" className="back-button">
            <span className="text-white text-sm font-semibold">Home</span>
          </Link>
        </nav>
        <div className="flex flex-row w-full max-lg:flex-col-reverse">
          <section className="feedback-section h-[100vh] sticky top-0 items-center justify-center">
            {imageUrl && resumeUrl && (
              <div className="animate-in fade-in duration-1000 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
                <a href={resumeUrl} target={"_blank"}>
                  <img
                    src={imageUrl}
                    className="w-full h-full object-contain rounded-2xl"
                    title="resume"
                  />
                </a>
              </div>
            )}
          </section>
          <section className="feedback-section">
            <h2 className="text-4xl text-white font-bold">Resume Review</h2>
            {feedback ? (
              <div className="flex flex-col gap-8 animate-in fade-in duration-1000">
                <Summary feedback={feedback} />
                <ATS
                  score={feedback.ATS.score || 0}
                  suggestions={feedback.ATS.tips || []}
                />
                <Details feedback={feedback} />
              </div>
            ) : (
              <div className="glass-card p-8 rounded-3xl">
                <img src="/images/resume-scan-2.gif" className="w-full" />
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
};

export default Resume;
