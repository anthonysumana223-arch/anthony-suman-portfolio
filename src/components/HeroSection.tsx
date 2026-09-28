import React from 'react';
import { ArrowDown, Play, FileText, Mail, Sparkles, MapPin, Terminal, Cpu } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroSectionProps {
  onExploreDemos: () => void;
  onOpenContact: () => void;
  onViewResume: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreDemos,
  onOpenContact,
  onViewResume
}) => {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[350px] h-[350px] bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Bold Typographic Pitch & Metrics (7 cols) */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Status indicator line */}
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/80 text-emerald-300 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Available for AI/ML & Engineering Roles
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-slate-500">
                <MapPin className="w-3.5 h-3.5" />
                {PERSONAL_INFO.location}
              </span>
            </div>

            {/* Display Headline */}
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight font-display leading-[1.1] text-balance">
                Architecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-300 to-emerald-300">Intelligent Systems</span> & Interactive Software
              </h1>
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed pt-2">
                B.Tech in Artificial Intelligence & Machine Learning at CHRIST University. From training deep LSTM recurrent neural networks to sniffing vehicle CAN bus frames and engineering responsive full-stack applications.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onExploreDemos}
                className="flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl transition-all shadow-lg shadow-indigo-900/30 hover:shadow-indigo-800/50 hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Test Live Project Demos</span>
              </button>

              <button
                onClick={onViewResume}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-200 bg-slate-900/90 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all hover:text-white"
              >
                <FileText className="w-4 h-4 text-indigo-400" />
                <span>Resume & Experience</span>
              </button>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-slate-400" />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Quantified Metrics Proof Adjacency */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
              {PERSONAL_INFO.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums block">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 mt-0.5 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Fidelity Workspace Visual & Live System Pod (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl group">
              <img
                src={PERSONAL_INFO.heroImage}
                alt="Anthony Suman A - AI Workspace and Research Setup"
                className="w-full h-80 sm:h-96 object-cover opacity-80 group-hover:scale-105 transition-transform duration-700 ease-out"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('hero_engineer_workspace.jpg')) {
                    target.src = '/images/hero_engineer_workspace.jpg';
                  }
                }}
              />

              {/* Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a0f] via-slate-950/40 to-transparent" />

              {/* Overlay Terminal Badge */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-xl bg-slate-950/90 border border-slate-800/80 backdrop-blur-md space-y-1.5 font-mono text-xs">
                <div className="flex items-center justify-between text-slate-400 pb-1.5 border-b border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    <span>anthony-core-engine</span>
                  </div>
                  <span className="text-[10px] text-emerald-400">READY</span>
                </div>

                <div className="text-[11px] text-slate-300 space-y-0.5">
                  <p className="text-slate-400">
                    <span className="text-indigo-400">&gt;</span> Stack: <span className="text-white">Python · TensorFlow · React · CAN Bus</span>
                  </p>
                  <p className="text-slate-400">
                    <span className="text-indigo-400">&gt;</span> Active Focus: <span className="text-emerald-400">Deep Learning & e-Mobility Systems</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll down prompt */}
        <div className="mt-14 flex flex-col items-center justify-center text-slate-500 hover:text-slate-300 transition-colors">
          <a href="#projects" className="flex flex-col items-center gap-2 group">
            <span className="text-xs font-mono tracking-wider uppercase">Scroll to Projects & Live Demos</span>
            <div className="w-8 h-8 rounded-full border border-slate-800 group-hover:border-slate-600 flex items-center justify-center transition-colors">
              <ArrowDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
