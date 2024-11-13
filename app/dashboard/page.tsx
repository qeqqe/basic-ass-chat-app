"use client";
import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";

interface Message {
  _id: string;
  content: string;
  username: string;
  createdAt: string;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const POLLING_INTERVAL = 3000;

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setMessages(data.data);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3001/new-message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ content: newMessage }),
      });
      const data = await res.json();
      if (data.success) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
      return;
    }

    fetchMessages();

    const pollInterval = setInterval(fetchMessages, POLLING_INTERVAL);

    return () => clearInterval(pollInterval);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-slate-900 flex flex-col">
      <nav className="bg-black/30 backdrop-blur-xl border-b border-white/5">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 text-transparent bg-clip-text">
            Chat App
          </h1>
          <button
            onClick={logout}
            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md text-sm hover:opacity-90 transition-all transform hover:scale-[1.02]"
          >
            Logout
          </button>
        </div>
      </nav>

      <div
        className="flex-1 container mx-auto p-4 flex flex-col"
        style={{ height: "calc(100vh - 73px)" }}
      >
        <div
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 space-y-4 p-4 bg-black/30 backdrop-blur-xl rounded-lg border border-white/5"
        >
          {messages.map((msg) => (
            <div
              key={msg._id}
              className={`flex flex-col ${
                msg.username === user?.username ? "items-end" : "items-start"
              }`}
            >
              <span className="text-xs text-gray-400">{msg.username}</span>
              <div
                className={`mt-1 px-4 py-2 rounded-md ${
                  msg.username === user?.username
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500"
                    : "bg-black/50 border border-white/10"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={sendMessage} className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-4 rounded-md bg-black/50 text-white text-sm border border-white/10 focus:border-white/30 focus:outline-none transition-all placeholder:text-gray-500"
          />
          <button
            type="submit"
            className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md text-sm hover:opacity-90 transition-all transform hover:scale-[1.02] hover:shadow-xl"
          >
            Send
          </button>
        </form>
      </div>
    </main>
  );
}
