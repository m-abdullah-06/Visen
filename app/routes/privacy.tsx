import { Link } from "react-router";
import { Sparkles, ArrowLeft } from "lucide-react";

export const meta = () => [
  { title: "Privacy Policy - Visen | AI Career Intelligence Platform" },
  {
    name: "description",
    content:
      "Visen privacy policy. Learn how we protect your resume data and interview practice sessions on our AI-powered career intelligence platform.",
  },
];

export default function Privacy() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white">
      <style>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-indigo-600 rounded-full opacity-20 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-600 rounded-full opacity-20 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <nav className="px-6 py-6 md:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <h1 className="text-3xl font-black tracking-wider">VISEN</h1>
            </Link>
            <Link
              to="/"
              className="glass-card px-4 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </nav>

        {/* Content */}
        <div className="px-6 py-12 md:px-12">
          <div className="max-w-4xl mx-auto glass-card p-12 rounded-3xl">
            <h1 className="text-4xl md:text-5xl font-black mb-8">
              Privacy Policy
            </h1>

            <div className="space-y-8 text-gray-300 leading-relaxed">
              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Introduction
                </h2>
                <p>
                  Visen ("we", "our", or "us") is an AI-powered career
                  intelligence platform committed to protecting your privacy. We
                  offer two core tools — a Resume Analyzer and an Interview
                  Coach — both powered by AI to help job seekers land their
                  dream jobs. This Privacy Policy explains how we collect, use,
                  and safeguard your information when you use either of these
                  services.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Information We Collect
                </h2>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Resume Analyzer Data
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Resume files you upload (PDF format)</li>
                  <li>Job titles and descriptions you provide</li>
                  <li>Company names for tailored analysis</li>
                  <li>Resume scores and AI feedback history</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">
                  Interview Coach Data
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Job titles and descriptions for question generation</li>
                  <li>Your written interview answers</li>
                  <li>Practice session history and scores</li>
                  <li>AI-generated feedback on your answers</li>
                </ul>

                <h3 className="text-xl font-semibold text-white mb-3 mt-4">
                  Account Information
                </h3>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Authentication data (handled securely by Puter.js)</li>
                  <li>Usage statistics across both tools</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  How We Use Your Information
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>To analyze your resume using AI technology</li>
                  <li>
                    To generate personalized interview questions for your target
                    role
                  </li>
                  <li>To evaluate and score your interview answers</li>
                  <li>
                    To provide personalized feedback and career recommendations
                  </li>
                  <li>To improve our AI models and service quality</li>
                  <li>
                    To track your usage within free tier limits (10 uses/day
                    across both tools)
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Data Storage & Security
                </h2>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>All data is encrypted in transit and at rest</li>
                  <li>Storage is handled by Puter.js infrastructure</li>
                  <li>
                    Your resumes and interview sessions are never shared with
                    third parties
                  </li>
                  <li>We do not sell or rent your personal information</li>
                  <li>Data is isolated per user account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  AI Processing
                </h2>
                <p>
                  Your resume content and interview answers are processed by AI
                  algorithms to provide analysis, scoring, and personalized
                  feedback across both our Resume Analyzer and Interview Coach
                  tools. This processing is done securely and your data is not
                  used to train third-party AI models without your explicit
                  consent.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Your Rights
                </h2>
                <p className="mb-3">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access your data at any time through your account</li>
                  <li>Delete your resumes and analysis history</li>
                  <li>Delete your interview practice sessions and scores</li>
                  <li>Request data export (contact us)</li>
                  <li>Close your account and have all data removed</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Cookies & Tracking
                </h2>
                <p>
                  We use minimal cookies for authentication and session
                  management. We do not use tracking cookies or sell your data
                  to advertisers.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Third-Party Services
                </h2>
                <p className="mb-3">
                  We use the following trusted service providers:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    <strong>Puter.js</strong> - Authentication, storage, and AI
                    processing
                  </li>
                  <li>
                    <strong>Netlify</strong> - Web hosting and content delivery
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy from time to time. We will
                  notify users of any material changes by posting the new
                  Privacy Policy on this page and updating the "Last Updated"
                  date.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-white mb-4">
                  Contact Us
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or our
                  data practices, please contact us at:
                </p>
                <p className="mt-4">
                  <a
                    href="mailto:abdullah.muhammad.xyz@gmail.com"
                    className="text-indigo-400 hover:text-indigo-300 transition"
                  >
                    privacy@visen.ai
                  </a>
                </p>
              </section>

              <section className="pt-8 border-t border-white/10">
                <p className="text-sm text-gray-500">
                  Last Updated: February 17, 2026
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
