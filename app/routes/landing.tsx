import { Link } from "react-router";
import {
  Brain,
  Target,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Mic,
  FileText,
} from "lucide-react";

export const meta = () => [
  {
    title:
      "Visen - AI Career Intelligence Platform | Resume Analysis & Interview Prep",
  },
  {
    name: "description",
    content:
      "An AI-powered career intelligence platform that helps job seekers optimize their resumes and simulate real interview experiences with personalized feedback.",
  },
  {
    name: "keywords",
    content:
      "resume analyzer, interview prep, AI career coach, ATS score, interview questions, job application, career intelligence, resume feedback, interview simulation",
  },
  {
    property: "og:title",
    content: "Visen - AI Career Intelligence Platform",
  },
  {
    property: "og:description",
    content:
      "Optimize your resume and master your interviews with AI-powered personalized feedback. Your complete career preparation platform.",
  },
  {
    property: "og:type",
    content: "website",
  },
];

export default function Landing() {
  const features = [
    {
      icon: FileText,
      title: "Smart Resume Analysis",
      description:
        "AI scans your resume for ATS compatibility, tone, structure, and content quality with detailed scoring",
    },
    {
      icon: Mic,
      title: "Interview Simulator",
      description:
        "Practice with AI-generated questions tailored to any job role and get real-time feedback on your answers",
    },
    {
      icon: TrendingUp,
      title: "Personalized Feedback",
      description:
        "Receive specific, actionable recommendations to improve both your resume and interview performance",
    },
    {
      icon: Shield,
      title: "100% Private & Secure",
      description:
        "Your data is encrypted and never shared. Complete confidentiality guaranteed",
    },
  ];

  const benefits = [
    "Instant resume analysis in under 10 seconds",
    "Detailed ATS scoring across 4 key categories",
    "AI-generated interview questions for any job role",
    "Real-time answer evaluation and feedback",
    "Industry-specific career recommendations",
    "Track resume and interview improvements over time",
    "Practice unlimited interview scenarios",
    "Free tier with 10 daily uses",
  ];

  const howItWorks = [
    {
      step: "01",
      title: "Upload Your Resume",
      description:
        "Drop your resume (PDF) and add job details for tailored analysis",
    },
    {
      step: "02",
      title: "Get AI Feedback",
      description:
        "Receive instant scoring on tone, content, structure, and ATS compatibility",
    },
    {
      step: "03",
      title: "Practice Interviews",
      description:
        "Simulate real interviews with AI-generated questions for your target role",
    },
    {
      step: "04",
      title: "Land Your Dream Job",
      description:
        "Apply with a polished resume and walk into interviews with confidence",
    },
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 text-white overflow-hidden">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s ease-in-out infinite;
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
        
        .secondary-button {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(102, 126, 234, 0.5);
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
        {/* Navigation */}
        <nav className="px-6 py-6 md:px-12">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Sparkles className="w-8 h-8 text-indigo-400" />
              <h1 className="text-3xl font-black tracking-wider">VISEN</h1>
            </div>
            <Link
              to="/auth"
              className="glass-card px-6 py-2.5 rounded-full text-sm font-bold hover:bg-white/10 transition"
            >
              Sign In
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="px-6 pt-20 pb-32 md:px-12">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 animate-fade-in-up">
              <span className="glass-card px-4 py-2 rounded-full text-sm font-mono font-bold text-indigo-300 border border-indigo-400/30">
                ✨ AI Career Intelligence Platform
              </span>
            </div>

            <h1
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              Your AI-Powered
              <br />
              <span className="gradient-text">Career Co-Pilot</span>
            </h1>

            <p
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              An AI-powered career intelligence platform that helps job seekers
              optimize their resumes and simulate real interview experiences
              with personalized feedback.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-10 justify-center items-center animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Link
                to="/auth"
                className="w-full sm:w-auto primary-button px-10 py-5 rounded-full font-bold text-xl flex items-center justify-center gap-2"
              >
                <span>Start For Free</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              <Link
                to="/auth"
                className="secondary-button px-10 py-5 rounded-full font-bold text-xl"
              >
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-20 max-w-3xl mx-auto">
              {[
                { value: "2-in-1", label: "Resume + Interview" },
                { value: "10 sec", label: "Analysis Time" },
                { value: "Free", label: "10 Daily Uses" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl animate-fade-in-up"
                  style={{ animationDelay: `${0.4 + idx * 0.1}s` }}
                >
                  <div className="text-3xl md:text-4xl font-black gradient-text mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-20 md:px-12 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Why Choose <span className="gradient-text">VISEN</span>?
              </h2>
              <p className="text-xl text-gray-400">
                Cutting-edge AI technology meets complete career preparation
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, idx) => {
                const Icon = feature.icon;
                return (
                  <div
                    key={idx}
                    className="glass-card p-8 rounded-2xl hover:bg-white/10 transition group"
                  >
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Two Tools Section */}
        <section className="px-6 py-20 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                One Platform.{" "}
                <span className="gradient-text">Two Superpowers.</span>
              </h2>
              <p className="text-xl text-gray-400">
                Everything you need to go from application to offer
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Resume Tool */}
              <div className="glass-card p-10 rounded-3xl group hover:bg-white/10 transition">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <FileText className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black mb-4">Resume Analyzer</h3>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  Upload your resume and get instant AI-powered feedback. Our
                  platform scores your resume across tone, content, structure,
                  and ATS compatibility so you never get filtered out again.
                </p>
                <ul className="space-y-3">
                  {[
                    "ATS compatibility score",
                    "Tone & style analysis",
                    "Content quality feedback",
                    "Structure optimization",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Interview Tool */}
              <div className="glass-card p-10 rounded-3xl group hover:bg-white/10 transition">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Mic className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black mb-4">Interview Coach</h3>
                <p className="text-gray-400 text-lg mb-6 leading-relaxed">
                  Simulate real interview experiences with AI-generated
                  questions tailored to any job role. Practice your answers and
                  get instant feedback to walk into every interview with
                  confidence.
                </p>
                <ul className="space-y-3">
                  {[
                    "Role-specific questions",
                    "Behavioral & technical prep",
                    "Answer scoring & tips",
                    "Unlimited practice sessions",
                  ].map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="px-6 py-20 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Simple. Fast. <span className="gradient-text">Effective.</span>
              </h2>
              <p className="text-xl text-gray-400">
                Get professional career guidance in 4 easy steps
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {howItWorks.map((item, idx) => (
                <div key={idx} className="text-center">
                  <div className="relative inline-block mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-2xl font-black">
                      {item.step}
                    </div>
                    {idx < howItWorks.length - 1 && (
                      <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-indigo-500/50 to-transparent"></div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-6 py-20 md:px-12 bg-black/20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Everything You Need to{" "}
                <span className="gradient-text">Stand Out</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 glass-card p-6 rounded-xl"
                >
                  <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-200">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-20 md:px-12 mb-20">
          <div className="max-w-4xl mx-auto">
            <div
              className="glass-card p-12 rounded-3xl text-center"
              style={{
                boxShadow: "0 0 40px rgba(102, 126, 234, 0.3)",
              }}
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4">
                Ready to Take Control of Your Career?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join job seekers who prep smarter with AI-powered career
                intelligence
              </p>
              <Link
                to="/auth"
                className="primary-button inline-flex items-center text-center px-10 py-5 rounded-full font-bold text-xl gap-3"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-6 h-6" />
              </Link>
              <p className="text-sm text-gray-500 mt-6">
                No credit card required • Resume analysis + Interview prep •
                Start in seconds
              </p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 px-6 py-12 md:px-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {/* Brand */}
              <div className="md:col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <Sparkles className="w-8 h-8 text-indigo-400" />
                  <span className="text-2xl font-black">VISEN</span>
                </div>
                <p className="text-gray-400 mb-4">
                  An AI-powered career intelligence platform helping job seekers
                  optimize their resumes and ace their interviews worldwide.
                </p>
                <p className="text-gray-500 text-sm">
                  Made with ❤️ for job seekers worldwide
                </p>
              </div>

              {/* Product */}
              <div>
                <h4 className="font-bold mb-4">Product</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link to="/auth" className="hover:text-white transition">
                      Resume Analyzer
                    </Link>
                  </li>
                  <li>
                    <Link to="/auth" className="hover:text-white transition">
                      Interview Prep
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company */}
              <div>
                <h4 className="font-bold mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400">
                  <li>
                    <Link to="/privacy" className="hover:text-white transition">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2026 VISEN AI. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm">
                Free tier: 10 daily uses per user • Resume Analysis + Interview
                Prep
              </p>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}
