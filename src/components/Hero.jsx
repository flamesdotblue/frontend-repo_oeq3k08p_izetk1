import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket, Sparkles } from 'lucide-react';

export default function Hero({ dark }) {
  return (
    <section className="relative w-full min-h-[60vh] md:min-h-[70vh] lg:min-h-[80vh] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950 shadow-xl">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/41MGRk-UDPKO-l6W/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft neon overlay to enhance contrast without blocking interaction */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/20 to-transparent dark:from-slate-950/80 dark:via-slate-950/20" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center text-center p-6 md:p-10 lg:p-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/60 px-3 py-1 text-xs font-medium text-slate-700 backdrop-blur-md dark:bg-slate-900/50 dark:text-slate-200">
          <Sparkles size={14} className="text-fuchsia-500" />
          3D Fintech Dashboard
        </div>

        <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-br from-slate-900 via-fuchsia-600 to-blue-700 bg-clip-text text-transparent dark:from-white dark:via-fuchsia-400 dark:to-blue-300">
          Undefined Developers
        </h1>
        <p className="mt-3 max-w-2xl text-sm sm:text-base md:text-lg text-slate-600 dark:text-slate-300">
          Track project budgets, advances, and team payouts in a beautiful 3D, neon-infused experience.
        </p>

        <div className="mt-6 flex items-center gap-3">
          <a
            href="#dashboard"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-500 to-blue-500 px-4 py-2 text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-fuchsia-400"
          >
            <Rocket size={16} />
            Open Dashboard
          </a>
          <span className="text-xs text-slate-600 dark:text-slate-300">Light & Dark neon modes</span>
        </div>
      </div>
    </section>
  );
}
