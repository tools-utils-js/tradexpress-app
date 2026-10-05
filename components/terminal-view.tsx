"use client";

import { useState } from "react";
import { motion } from "motion/react";

export default function TerminalView() {
  const [input, setInput] = useState("");
  const [logs, setLogs] = useState<string[]>([
    "Welcome to Tradexpress Warp-inspired Terminal",
    "Connected to backend telemetry server..."
  ]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setLogs((prev) => [...prev, `> ${input}`, `Executed: ${input}`]);
    setInput("");
  };

  return (
    <div className="bg-[#0b0f19] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-sm text-slate-200">
      {/* Top Bar / Tabs */}
      <div className="bg-[#0f172a] px-4 py-2 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <span className="px-3 py-1 bg-slate-800 text-cyan-400 rounded-md text-xs font-semibold border border-slate-700">
            Terminal
          </span>
          <span className="px-3 py-1 text-slate-400 hover:text-slate-200 text-xs cursor-pointer">
            SSH: tradexpress@remote
          </span>
        </div>
        <div className="flex items-center space-x-2 text-xs text-slate-500">
          <span>main</span>
          <span>•</span>
          <span>utf-8</span>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 h-[350px] overflow-y-auto space-y-2">
        <div className="text-purple-400 bg-purple-950/30 border border-purple-900/50 p-3 rounded-lg">
          ✨ Welcome to Warp-inspired Terminal
        </div>
        {logs.map((log, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-slate-300"
          >
            {log}
          </motion.div>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleCommand} className="p-3 bg-[#0f172a] border-t border-slate-800 flex items-center">
        <span className="text-emerald-400 mr-2 font-bold">❯</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a command..."
          className="bg-transparent flex-1 focus:outline-none text-slate-100 placeholder-slate-500 font-mono"
        />
      </form>
    </div>
  );
}
