import React, { useEffect } from 'react';
import { X, Printer, Download, Mail, ExternalLink, GraduationCap, Briefcase, Award } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCES, EDUCATION, SKILL_CATEGORIES, CERTIFICATIONS } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0b0d14] border border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Toolbar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/80">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-white font-display">Resume Document · Anthony Suman A</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close resume"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable/Viewable Resume Sheet */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 bg-[#0d0f18] text-slate-200">
          {/* Resume Header */}
          <div className="border-b border-slate-800 pb-6 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-display">
                {PERSONAL_INFO.name}
              </h1>
              <span className="text-xs font-mono text-indigo-400">
                {PERSONAL_INFO.location} · {PERSONAL_INFO.email}
              </span>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider font-mono">
              AI & Machine Learning Engineer · Full-Stack Developer
            </p>
            <p className="text-xs text-slate-300 leading-relaxed pt-1">
              {PERSONAL_INFO.about}
            </p>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold border-b border-slate-800 pb-1">
              Education
            </h2>
            <div className="space-y-3">
              {EDUCATION.map((edu) => (
                <div key={edu.id} className="text-xs space-y-1">
                  <div className="flex justify-between font-bold text-white">
                    <span>{edu.institution}</span>
                    <span className="font-mono text-slate-400">{edu.period}</span>
                  </div>
                  <div className="text-slate-300 font-medium">{edu.degree}</div>
                  <div className="text-slate-400 text-[11px]">{edu.focus}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold border-b border-slate-800 pb-1">
              Experience
            </h2>
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="text-xs space-y-1.5">
                <div className="flex justify-between font-bold text-white">
                  <span>{exp.role} — {exp.company}, {exp.department}</span>
                  <span className="font-mono text-slate-400">{exp.period}</span>
                </div>
                <div className="text-indigo-300 font-mono text-[11px]">{exp.projectTitle}</div>
                <ul className="list-disc pl-4 space-y-1 text-slate-300 text-[11px]">
                  {exp.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Key Projects Summary */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold border-b border-slate-800 pb-1">
              Key Projects
            </h2>
            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-white">Stock Price Prediction using LSTM Neural Networks</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Multi-layered LSTM with Dropout for time-series forecasting. Processed market indicators via yfinance API with Streamlit dashboard.
                </p>
              </div>

              <div>
                <span className="font-bold text-white">Disease Prediction System using Machine Learning</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Random Forest multi-attribute clinical classifier on symptom matrices with real-time Streamlit triage interface.
                </p>
              </div>

              <div>
                <span className="font-bold text-white">Collaborative Movie Recommendation System</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Item-based collaborative filtering using cosine similarity over MovieLens rating matrices with cold-start fallback.
                </p>
              </div>

              <div>
                <span className="font-bold text-white">Scroll-Driven Hero Animation Website (Vercel)</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  GSAP ScrollTrigger parallax interactive hero section with 60 FPS hardware acceleration.
                </p>
              </div>

              <div>
                <span className="font-bold text-white">Task Manager Web App (React)</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Responsive task manager with full CRUD, localStorage persistence, and functional state updates.
                </p>
              </div>

              <div>
                <span className="font-bold text-white">Hospital Management System (Django, PostgreSQL)</span>
                <p className="text-slate-300 text-[11px] mt-0.5">
                  Full-stack healthcare web app with role-based access (doctor/patient) and appointment booking.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Skills */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold border-b border-slate-800 pb-1">
              Technical Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.category}>
                  <span className="font-bold text-white block">{cat.category}</span>
                  <span className="text-[11px] text-slate-400">
                    {cat.skills.map((s) => s.name).join(', ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-3">
            <h2 className="text-xs font-mono uppercase tracking-wider text-indigo-400 font-bold border-b border-slate-800 pb-1">
              Certifications
            </h2>
            <ul className="text-xs space-y-1 text-slate-300 list-disc pl-4 text-[11px]">
              {CERTIFICATIONS.map((c) => (
                <li key={c.id}>
                  <strong className="text-white">{c.title}</strong> — {c.issuer} ({c.year})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
