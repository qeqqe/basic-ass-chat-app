"use client";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(username, email, password);
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-slate-900">
      <div className="p-12 bg-black/30 backdrop-blur-xl rounded-lg shadow-2xl w-[450px] border border-white/5 animate-fadeIn">
        <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-8 text-sm">
          Join our community today
        </p>
        {error && (
          <div className="mb-6 text-red-400 text-center text-sm bg-red-500/10 border border-red-500/20 rounded-md p-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full p-4 rounded-md bg-black/50 text-white text-sm border border-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-500"
              required
            />
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 rounded-md bg-black/50 text-white text-sm border border-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 rounded-md bg-black/50 text-white text-sm border border-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-500"
              required
            />
          </div>
          <button className="w-full p-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md text-sm hover:opacity-90 transition-all transform hover:scale-[1.02] hover:shadow-xl">
            Register
          </button>
        </form>
      </div>
    </main>
  );
}
