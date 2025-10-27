import React, { useMemo, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import MemberManager from './components/MemberManager';
import ProjectManager from './components/ProjectManager';

function uid() {
  return Math.random().toString(36).slice(2, 10);
}

export default function App() {
  const [dark, setDark] = useState(true);
  const [members, setMembers] = useState([]);
  const [projects, setProjects] = useState([]);

  const onAddMember = ({ name }) => {
    setMembers((prev) => [...prev, { id: uid(), name }]);
  };
  const onRemoveMember = (id) => setMembers((prev) => prev.filter((m) => m.id !== id));

  const onAddProject = ({ name, totalBudget }) => {
    setProjects((prev) => [
      ...prev,
      { id: uid(), name, totalBudget, advances: [], payouts: [] },
    ]);
  };

  const onAddAdvance = (projectId, { amount, date }) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, advances: [...p.advances, { id: uid(), amount, date }] } : p)));
  };

  const onAddPayout = (projectId, { memberId, amount, date }) => {
    setProjects((prev) => prev.map((p) => (p.id === projectId ? { ...p, payouts: [...p.payouts, { id: uid(), memberId, amount, date }] } : p)));
  };

  const headerGlow = useMemo(
    () => (dark ? 'from-fuchsia-500/40 via-blue-500/40 to-cyan-500/30' : 'from-fuchsia-400/30 via-blue-400/30 to-cyan-400/20'),
    [dark]
  );

  return (
    <div className={`${dark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-gradient-to-b from-slate-100 via-white to-white text-slate-900 antialiased dark:from-slate-950 dark:via-slate-950 dark:to-slate-950 dark:text-white">
        <header className="sticky top-0 z-50 mx-auto w-full max-w-7xl px-4 py-4">
          <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/70 backdrop-blur-md dark:bg-slate-900/60">
            <div className={`pointer-events-none absolute inset-0 bg-gradient-to-r ${headerGlow}`} />
            <div className="relative z-10 flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-fuchsia-500 to-blue-500 shadow-md" />
                <div className="text-sm">
                  <p className="font-bold tracking-tight">Undefined Developers</p>
                  <p className="-mt-0.5 text-[11px] text-slate-600 dark:text-slate-300">Project Finance Dashboard</p>
                </div>
              </div>
              <button
                onClick={() => setDark((d) => !d)}
                className="relative inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/70 px-3 py-2 text-xs font-medium text-slate-700 backdrop-blur hover:bg-white/80 dark:bg-slate-800/70 dark:text-slate-200"
              >
                {dark ? <Sun size={14} /> : <Moon size={14} />}
                {dark ? 'Light' : 'Dark'} mode
              </button>
            </div>
          </div>
        </header>

        <main className="mx-auto w-full max-w-7xl px-4 pb-16">
          <Hero dark={dark} />
          <Dashboard projects={projects} members={members} />
          <MemberManager members={members} onAddMember={onAddMember} onRemoveMember={onRemoveMember} />
          <ProjectManager
            members={members}
            projects={projects}
            onAddProject={onAddProject}
            onAddAdvance={onAddAdvance}
            onAddPayout={onAddPayout}
          />
        </main>

        <footer className="mx-auto w-full max-w-7xl px-4 pb-8 text-center text-xs text-slate-500 dark:text-slate-400">
          Built with love by Undefined Developers
        </footer>
      </div>
    </div>
  );
}
