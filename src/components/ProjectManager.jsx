import React, { useMemo, useState } from 'react';
import { Plus, Send, Calendar, IndianRupee, ListChecks } from 'lucide-react';

export default function ProjectManager({ members, projects, onAddProject, onAddAdvance, onAddPayout }) {
  const [projectName, setProjectName] = useState('');
  const [projectBudget, setProjectBudget] = useState('');

  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [advanceAmount, setAdvanceAmount] = useState('');
  const [advanceDate, setAdvanceDate] = useState('');

  const [payoutMemberId, setPayoutMemberId] = useState('');
  const [payoutAmount, setPayoutAmount] = useState('');
  const [payoutDate, setPayoutDate] = useState('');

  const selectedProject = useMemo(() => projects.find((p) => p.id === selectedProjectId), [projects, selectedProjectId]);

  const addProject = (e) => {
    e.preventDefault();
    const name = projectName.trim();
    const budget = Number(projectBudget);
    if (!name || !budget || budget <= 0) return;
    onAddProject({ name, totalBudget: budget });
    setProjectName('');
    setProjectBudget('');
  };

  const addAdvance = (e) => {
    e.preventDefault();
    const amount = Number(advanceAmount);
    if (!selectedProjectId || !amount || amount <= 0) return;
    onAddAdvance(selectedProjectId, { amount, date: advanceDate || new Date().toISOString().slice(0, 16) });
    setAdvanceAmount('');
  };

  const addPayout = (e) => {
    e.preventDefault();
    const amount = Number(payoutAmount);
    if (!selectedProjectId || !payoutMemberId || !amount || amount <= 0) return;
    onAddPayout(selectedProjectId, { memberId: payoutMemberId, amount, date: payoutDate || new Date().toISOString().slice(0, 16) });
    setPayoutAmount('');
  };

  return (
    <section className="mt-6 grid gap-4 lg:grid-cols-2">
      <div className="rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60">
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Create Project</h3>
        <form onSubmit={addProject} className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            placeholder="Project name"
            className="col-span-1 sm:col-span-2 rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
          />
          <input
            type="number"
            min="0"
            value={projectBudget}
            onChange={(e) => setProjectBudget(e.target.value)}
            placeholder="Total budget"
            className="rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
          />
          <button type="submit" className="sm:col-span-3 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-indigo-600/30 transition hover:brightness-110">
            <Plus size={16} /> Add project
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60">
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Record Advance & Payout</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <form onSubmit={addAdvance} className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Calendar size={14} className="text-fuchsia-500" />
              Advance
            </div>
            <select
              value={selectedProjectId}
              onChange={(e) => setSelectedProjectId(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">Select project</option>
              {projects.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
              placeholder="Amount"
              className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
            />
            <input
              type="datetime-local"
              value={advanceDate}
              onChange={(e) => setAdvanceDate(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
            />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-emerald-500/30 transition hover:brightness-110">
              <IndianRupee size={16} /> Add advance
            </button>
          </form>

          <form onSubmit={addPayout} className="space-y-2">
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
              <Send size={14} className="text-blue-500" />
              Payout to member
            </div>
            <select
              value={payoutMemberId}
              onChange={(e) => setPayoutMemberId(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
            >
              <option value="">Select member</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>{m.name}</option>
              ))}
            </select>
            <input
              type="number"
              min="0"
              value={payoutAmount}
              onChange={(e) => setPayoutAmount(e.target.value)}
              placeholder="Amount"
              className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
            />
            <input
              type="datetime-local"
              value={payoutDate}
              onChange={(e) => setPayoutDate(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 outline-none backdrop-blur dark:bg-slate-950/60 dark:text-white"
            />
            <button type="submit" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-pink-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110">
              <Send size={16} /> Send payout
            </button>
          </form>
        </div>

        {selectedProject && (
          <div className="mt-4 rounded-xl border border-white/10 bg-white/50 p-3 backdrop-blur-md dark:bg-slate-900/50">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="font-medium text-slate-800 dark:text-slate-100">{selectedProject.name}</span>
              <span className="text-slate-600 dark:text-slate-300">Budget: ₹{Number(selectedProject.totalBudget).toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-emerald-500/10 p-2">Received: ₹{selectedProject.advances.reduce((s, a) => s + Number(a.amount || 0), 0).toLocaleString()}</div>
              <div className="rounded-lg bg-amber-500/10 p-2">Pending: ₹{Math.max(Number(selectedProject.totalBudget) - selectedProject.advances.reduce((s, a) => s + Number(a.amount || 0), 0), 0).toLocaleString()}</div>
            </div>
          </div>
        )}
      </div>

      <div className="lg:col-span-2 rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60">
        <div className="mb-3 flex items-center gap-2">
          <ListChecks size={16} className="text-blue-500" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Projects</h3>
        </div>
        <div className="overflow-auto">
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="text-xs text-slate-500 dark:text-slate-400">
                <th className="px-2 py-2">Project</th>
                <th className="px-2 py-2">Budget</th>
                <th className="px-2 py-2">Received</th>
                <th className="px-2 py-2">Pending</th>
                <th className="px-2 py-2">Payouts</th>
              </tr>
            </thead>
            <tbody>
              {projects.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-2 py-4 text-slate-600 dark:text-slate-300">No projects yet. Create your first project.</td>
                </tr>
              )}
              {projects.map((p) => {
                const received = p.advances.reduce((s, a) => s + Number(a.amount || 0), 0);
                const pending = Math.max(Number(p.totalBudget) - received, 0);
                const payouts = p.payouts.reduce((s, pay) => s + Number(pay.amount || 0), 0);
                return (
                  <tr key={p.id} className="border-t border-white/10">
                    <td className="px-2 py-2 font-medium text-slate-800 dark:text-slate-100">{p.name}</td>
                    <td className="px-2 py-2">₹{Number(p.totalBudget).toLocaleString()}</td>
                    <td className="px-2 py-2">₹{received.toLocaleString()}</td>
                    <td className="px-2 py-2">₹{pending.toLocaleString()}</td>
                    <td className="px-2 py-2">₹{payouts.toLocaleString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
