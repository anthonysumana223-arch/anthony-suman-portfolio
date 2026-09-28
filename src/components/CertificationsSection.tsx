import React from 'react';
import { Award, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';
import { CERTIFICATIONS } from '../data/portfolioData';

export const CertificationsSection: React.FC = () => {
  return (
    <section id="certifications" className="py-20 bg-[#07080d] border-t border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <Award className="w-4 h-4" />
            <span>CREDENTIALS & INDUSTRY TRAINING</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Verified Certifications
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Professional competencies validated across enterprise job simulations, natural language processing, data science, and web systems.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-lg"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-indigo-400">{cert.issuer}</span>
                  <span className="text-slate-500 tabular-nums">{cert.year}</span>
                </div>

                <h3 className="text-base font-bold text-white tracking-tight group-hover:text-indigo-300 transition-colors">
                  {cert.title}
                </h3>

                <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-400 pt-1 font-mono">
                  {cert.topics.map((t, idx) => (
                    <span key={t} className="flex items-center gap-1.5 text-[11px] text-slate-400">
                      <span>{t}</span>
                      {idx < cert.topics.length - 1 && <span className="text-slate-700">·</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 pt-4 mt-3 border-t border-slate-800/80">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Verified Curriculum Completion</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
