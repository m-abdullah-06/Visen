import { usePuterStore } from "~/lib/puter";

export const meta = () => [
  { title: "Visen | Auth" },
  { name: "description", content: "Log into your account" },
];

import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import AuthHeader from "~/component/AuthHeader";

const Auth = () => {
  const { isLoading, auth } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();

  useEffect(() => {
    if (auth.isAuthenticated) navigate(next);
  }, [auth.isAuthenticated, next]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-indigo-950 flex flex-col px-6 text-white overflow-hidden">
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
        
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .auth-button {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          transition: all 0.3s ease;
          box-shadow: 0 0 20px rgba(102, 126, 234, 0.3);
        }
        
        .auth-button:hover {
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
        <AuthHeader />

        <div className="flex-1 flex items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-sm glass-card rounded-2xl p-8 animate-fade-in-up">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Sign in</h1>
              <p className="text-gray-400 text-sm">Access your dashboard</p>
            </div>

            {isLoading ? (
              <button
                className="w-full py-4 rounded-full glass-card text-gray-400 animate-pulse cursor-not-allowed"
                disabled
              >
                Preparing account…
              </button>
            ) : auth.isAuthenticated ? (
              <button
                onClick={auth.signOut}
                className="w-full py-4 rounded-full text-white glass-card hover:bg-blue-500 transition cursor-pointer font-semibold"
              >
                Log out
              </button>
            ) : (
              <button
                onClick={auth.signIn}
                className="w-full py-4 rounded-full text-white auth-button cursor-pointer font-semibold text-lg"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Auth;
