import React from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar, Radio, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { EXPERIENCES, EDUCATION } from '../data/portfolioData';

interface ExperienceSectionProps {
  onLaunchAutoCanDemo: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onLaunchAutoCanDemo }) => {
  return (
    <section id="experience" className="py-20 bg-[#07080d] border-t border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Work Experience & CoE e-Mobility Focus (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                <Briefcase className="w-4 h-4" />
                <span>PROFESSIONAL PRACTICE</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
                Industrial & Lab Experience
              </h2>
            </div>

            {EXPERIENCES.map((exp) => (
              <div
                key={exp.id}
                className="p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4 relative group hover:border-slate-700 transition-all shadow-xl"
              >
                {/* Header line */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">
                      {exp.role} · <span className="text-indigo-400">{exp.company}</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{exp.department}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                {/* Project Title Banner */}
                <div className="p-3 rounded-lg bg-indigo-950/30 border border-indigo-900/40 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono uppercase text-indigo-400 block font-semibold">
                      Featured Automotive Project
                    </span>
                    <span className="text-xs font-semibold text-white">
                      {exp.projectTitle}
                    </span>
                  </div>

                  <button
                    onClick={onLaunchAutoCanDemo}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap shadow-sm shrink-0"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Test CAN Demo</span>
                  </button>
                </div>

                {/* Highlights */}
                <ul className="space-y-2 pt-1">
                  {exp.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0 mt-1.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Technologies */}
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs pt-3 border-t border-slate-800/80 text-slate-400 font-mono">
                  <span className="text-slate-500">Core Tools:</span>
                  {exp.technologies.map((tech, i) => (
                    <span key={tech} className="flex items-center gap-2 text-slate-300">
                      <span>{tech}</span>
                      {i < exp.technologies.length - 1 && <span className="text-slate-700">·</span>}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Academic Pedigree (5 cols) */}
          <div id="education" className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                <GraduationCap className="w-4 h-4" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <h2 className="text-3xl font-extrabold text-white tracking-tight font-display">
                Education
              </h2>
            </div>

            <div className="space-y-4">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.id}
                  className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                    <span>{edu.period}</span>
                    <span className="text-slate-500">Accredited Degree</span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-white tracking-tight">{edu.degree}</h4>
                    <p className="text-xs text-slate-400 mt-0.5">{edu.institution}</p>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">
                    {edu.details}
                  </p>

                  <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                    <span className="text-slate-500">Specialization: </span>
                    {edu.focus}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
