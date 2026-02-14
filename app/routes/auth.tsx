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
    <main className="min-h-screen bg-zinc-950 flex flex-col px-6">
      <AuthHeader />

      <div className="flex-1 flex items-center justify-center">
        <div className="absolute w-[500px] h-[500px] bg-indigo-600/20 blur-[120px] rounded-full top-[-120px]" />
        <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-xl font-medium text-white">Sign in</h1>
            <p className="text-zinc-400 text-sm mt-2">Access your dashboard</p>
          </div>

          {isLoading ? (
            <button className="w-full py-3 rounded-lg bg-zinc-800 text-zinc-400 animate-pulse">
              Preparing account…
            </button>
          ) : auth.isAuthenticated ? (
            <button
              onClick={auth.signOut}
              className="w-full py-3 rounded-lg text-white bg-zinc-800 hover:bg-zinc-700 transition cursor-pointer"
            >
              Log out
            </button>
          ) : (
            <button
              onClick={auth.signIn}
              className="w-full py-3 rounded-lg bg-white text-black hover:bg-zinc-400 transition cursor-pointer font-bold"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Auth;
