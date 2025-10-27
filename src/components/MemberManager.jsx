import React, { useState } from 'react';
import { UserPlus, Trash2 } from 'lucide-react';

export default function MemberManager({ members, onAddMember, onRemoveMember }) {
  const [name, setName] = useState('');

  const add = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddMember({ name: name.trim() });
    setName('');
  };

  return (
    <section className="mt-6 rounded-2xl border border-white/10 bg-white/60 p-4 shadow-sm backdrop-blur-md dark:bg-slate-900/60">
      <h3 className="mb-3 text-sm font-semibold text-slate-900 dark:text-white">Team Members</h3>
      <form onSubmit={add} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Member name"
          className="flex-1 rounded-xl border border-white/20 bg-white/70 px-3 py-2 text-sm text-slate-900 placeholder-slate-400 outline-none ring-0 backdrop-blur dark:bg-slate-950/60 dark:text-white"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110"
        >
          <UserPlus size={16} /> Add member
        </button>
      </form>

      <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {members.length === 0 && (
          <p className="text-sm text-slate-600 dark:text-slate-300">No members yet. Add your team to start tracking payouts.</p>
        )}
        {members.map((m) => (
          <div key={m.id} className="flex items-center justify-between rounded-xl border border-white/10 bg-white/50 px-3 py-2 backdrop-blur-md dark:bg-slate-900/50">
            <span className="text-sm font-medium text-slate-800 dark:text-slate-100">{m.name}</span>
            <button onClick={() => onRemoveMember(m.id)} className="rounded-lg p-1 text-slate-500 hover:bg-white/30 dark:text-slate-400">
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
