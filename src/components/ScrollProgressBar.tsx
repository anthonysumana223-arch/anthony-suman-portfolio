import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        const currentProgress = (window.scrollY / totalScroll) * 100;
        setScrollProgress(currentProgress);
        setShowScrollTop(window.scrollY > 400);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Pinned Top Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-[2.5px] z-50 bg-slate-900/40">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Scroll-to-Top with Tabular % */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 p-2.5 rounded-full bg-slate-900/90 text-slate-300 hover:text-white border border-slate-700 shadow-xl backdrop-blur-md transition-all hover:scale-105 group flex items-center gap-1.5"
          aria-label="Scroll back to top"
        >
          <ArrowUp className="w-4 h-4 text-indigo-400 group-hover:-translate-y-0.5 transition-transform" />
          <span className="text-[10px] font-mono tabular-nums pr-1 text-slate-400">
            {Math.round(scrollProgress)}%
          </span>
        </button>
      )}
    </>
  );
};
