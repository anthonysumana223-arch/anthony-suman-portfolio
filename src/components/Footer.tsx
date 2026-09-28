import React from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-[#06070a] border-t border-slate-900 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-300 font-display">
            Anthony Suman A
          </span>
          <span aria-hidden="true" className="text-slate-700">·</span>
          <span>B.Tech in Artificial Intelligence & Machine Learning</span>
        </div>

        <div className="flex items-center gap-6">
          <a href="#projects" className="hover:text-slate-300 transition-colors">
            Live Demos
          </a>
          <a href="#experience" className="hover:text-slate-300 transition-colors">
            AutoCAN Project
          </a>
          <a href="#skills" className="hover:text-slate-300 transition-colors">
            Capabilities
          </a>
          <a
            href={`mailto:${PERSONAL_INFO.email}`}
            className="text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {PERSONAL_INFO.email}
          </a>
        </div>
      </div>
    </footer>
  );
};
