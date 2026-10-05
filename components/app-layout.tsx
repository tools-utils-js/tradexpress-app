"use client";

import { useState } from "react";
import { 
  Terminal as TerminalIcon, 
  Home, 
  FolderGit2, 
  FileCode, 
  Activity, 
  Command, 
  Share2, 
  Search, 
  Sliders, 
  Moon, 
  Settings 
} from "lucide-react";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState("terminal");

  const navItems = [
    { id: "terminal", icon: TerminalIcon, label: "Terminal" },
    { id: "home", icon: Home, label: "Home" },
    { id: "files", icon: FolderGit2, label: "Projects" },
    { id: "code", icon: FileCode, label: "Code Editor" },
    { id: "activity", icon: Activity, label: "Telemetry" },
    { id: "command", icon: Command, label: "Commands" },
    { id: "share", icon: Share2, label: "Share" },
    { id: "search", icon: Search, label: "Search" },
  ];

  return (
    <div className="flex h-screen bg-[#07090e] text-slate-200 overflow-hidden font-sans">
      {/* Left Sidebar Icon Menu */}
      <aside className="w-16 bg-[#0b0f19] border-r border-slate-800 flex flex-col items-center justify-between py-4 select-none">
        {/* Top Navigation Icons */}
        <div className="flex flex-col items-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold mb-4 shadow-lg">
            v0
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                title={item.label}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 ${
                  isActive 
                    ? "bg-purple-600/20 text-purple-400 border border-purple-500/30 shadow-inner" 
                    : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
                }`}
              >
                <Icon className="w-5 h-5" />
              </button>
            );
          })}
        </div>

        {/* Bottom Utilities Icons */}
        <div className="flex flex-col items-center space-y-3">
          <button className="w-10 h-10 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 flex items-center justify-center transition-colors">
            <Sliders className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 flex items-center justify-center transition-colors">
            <Moon className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 flex items-center justify-center transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#07090e]">
        <div className="flex-1 overflow-y-auto p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
