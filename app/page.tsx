import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-slate-900">
      <div className="p-12 bg-black/30 backdrop-blur-xl rounded-lg shadow-2xl w-[450px] border border-white/5 text-center animate-fadeIn">
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
          Welcome to Chat App
        </h1>
        <p className="text-gray-400 mb-8">
          Connect and chat with your friends securely.
        </p>
        <div className="space-y-4">
          <Link href="/login">
            <button className="w-full p-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md text-sm hover:opacity-90 transition-all transform hover:scale-[1.02] hover:shadow-xl">
              Login
            </button>
          </Link>
          <Link href="/register">
            <button className="w-full p-4 bg-transparent text-white rounded-md text-sm border border-white/10 hover:bg-white/5 transition-all transform hover:scale-[1.02]">
              Register
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
