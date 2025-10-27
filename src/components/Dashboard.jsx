import React, { useMemo } from 'react';
import { Wallet, Briefcase, CheckCircle2, Clock, Users } from 'lucide-react';

export default function Dashboard({ projects, members }) {
  const stats = useMemo(() => {
    const totalProjects = projects.length;
    const totalBudget = projects.reduce((s, p) => s + (Number(p.totalBudget) || 0), 0);
    const totalReceived = projects.reduce(
      (s, p) => s + p.advances.reduce((sa, a) => sa + (Number(a.amount) || 0), 0),
      0
    );
    const totalPayouts = projects.reduce(
      (s, p) => s + p.payouts.reduce((sp, pay) => sp + (Number(pay.amount) || 0), 0),
      0
    );

    const pendingByBudget = Math.max(totalBudget - totalReceived, 0);
    const pendingToTeam = Math.max(totalReceived - totalPayouts, 0);

    const perMember = members.map((m) => ({
      id: m.id,
      name: m.name,
      received: projects.reduce(
        (s, p) => s + p.payouts.filter((pay) => pay.memberId === m.id).reduce((ss, pay) => ss + Number(pay.amount || 0), 0),
        0
      ),
    }));

    return { totalProjects, totalBudget, totalReceived, totalPayouts, pendingByBudget, pendingToTeam, perMember };
  }, [projects, members]);

  const Card = ({ icon: Icon, label, value, accent }) => (
    <div className="rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60">
      <div className="flex items-center gap-3">
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${accent}`}>
          <Icon className="text-white" size={18} />
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
        </div>
      </div>
    </div>
  );

  return (
    <section id="dashboard" className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card icon={Briefcase} label="Projects" value={stats.totalProjects} accent="bg-gradient-to-br from-indigo-500 to-blue-500" />
      <Card icon={Wallet} label="Total Budget" value={`₹${stats.totalBudget.toLocaleString()}`} accent="bg-gradient-to-br from-fuchsia-500 to-pink-500" />
      <Card icon={CheckCircle2} label="Received" value={`₹${stats.totalReceived.toLocaleString()}`} accent="bg-gradient-to-br from-emerald-500 to-teal-500" />
      <Card icon={Clock} label="Pending (By Budget)" value={`₹${stats.pendingByBudget.toLocaleString()}`} accent="bg-gradient-to-br from-amber-500 to-orange-500" />

      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60">
        <div className="mb-3 flex items-center gap-2">
          <Users size={16} className="text-fuchsia-500" />
          <h3 className="text-sm font-semibold text-slate-900 dark:text-white">Team payouts</h3>
          <span className="ml-auto text-xs text-slate-500 dark:text-slate-400">Pending to team: ₹{stats.pendingToTeam.toLocaleString()}</span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {stats.perMember.length === 0 && (
            <p className="text-sm text-slate-600 dark:text-slate-300">Add team members to see their stats.</p>
          )}
          {stats.perMember.map((m) => (
            <div key={m.id} className="rounded-xl border border-white/10 bg-white/50 p-3 backdrop-blur-md dark:bg-slate-900/50">
              <p className="text-xs text-slate-500 dark:text-slate-400">{m.name}</p>
              <p className="text-base font-semibold text-slate-900 dark:text-white">₹{m.received.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="md:col-span-2 rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60">
        <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Overview</h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-lg bg-gradient-to-br from-indigo-500/10 to-blue-500/10 p-3 dark:from-indigo-400/10 dark:to-blue-400/10">
            <p className="text-xs text-slate-600 dark:text-slate-300">Budget</p>
            <p className="text-lg font-semibold text-indigo-600 dark:text-indigo-300">₹{stats.totalBudget.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-emerald-500/10 to-teal-500/10 p-3 dark:from-emerald-400/10 dark:to-teal-400/10">
            <p className="text-xs text-slate-600 dark:text-slate-300">Received</p>
            <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-300">₹{stats.totalReceived.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-amber-500/10 to-orange-500/10 p-3 dark:from-amber-400/10 dark:to-orange-400/10">
            <p className="text-xs text-slate-600 dark:text-slate-300">Pending</p>
            <p className="text-lg font-semibold text-amber-600 dark:text-amber-300">₹{stats.pendingByBudget.toLocaleString()}</p>
          </div>
          <div className="rounded-lg bg-gradient-to-br from-fuchsia-500/10 to-pink-500/10 p-3 dark:from-fuchsia-400/10 dark:to-pink-400/10">
            <p className="text-xs text-slate-600 dark:text-slate-300">Team Pending</p>
            <p className="text-lg font-semibold text-fuchsia-600 dark:text-fuchsia-300">₹{stats.pendingToTeam.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
