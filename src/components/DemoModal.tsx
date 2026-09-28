import React, { useEffect } from 'react';
import { X, ExternalLink, Github, Maximize2, Minimize2, Sparkles } from 'lucide-react';
import { ProjectItem } from '../types/portfolio';
import { StockPredictionDemo } from './demos/StockPredictionDemo';
import { DiseasePredictionDemo } from './demos/DiseasePredictionDemo';
import { MovieRecommendationDemo } from './demos/MovieRecommendationDemo';
import { TaskManagerDemo } from './demos/TaskManagerDemo';
import { ScrollHeroDemo } from './demos/ScrollHeroDemo';
import { HospitalManagementDemo } from './demos/HospitalManagementDemo';
import { AutoCanDemo } from './demos/AutoCanDemo';

interface DemoModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const DemoModal: React.FC<DemoModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const renderDemoComponent = () => {
    switch (project.demoType) {
      case 'stock-lstm':
        return <StockPredictionDemo />;
      case 'disease-ml':
        return <DiseasePredictionDemo />;
      case 'movie-recs':
        return <MovieRecommendationDemo />;
      case 'task-manager':
        return <TaskManagerDemo />;
      case 'scroll-hero':
        return <ScrollHeroDemo />;
      case 'hospital-system':
        return <HospitalManagementDemo />;
      case 'autocan':
        return <AutoCanDemo />;
      default:
        return (
          <div className="text-center py-12 text-slate-400">
            Interactive demo module initialized for this project.
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col rounded-2xl bg-[#0b0d14] border border-slate-800 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800/80 bg-slate-950/70">
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wider uppercase">
                Live Interactive Sandbox
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              >
                <span>Live URL</span>
                <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
              >
                <Github className="w-3.5 h-3.5" />
                <span>Code</span>
              </a>
            )}
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
              aria-label="Close interactive demo"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* Active Interactive Demo */}
          {renderDemoComponent()}

          {/* Project Details Footer in Modal */}
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold text-white">Project Implementation Highlights</span>
              <span className="font-mono text-indigo-400">{project.period}</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <span className="text-slate-500 font-mono">Tech Stack:</span>
              {project.techStack.map((tech, i) => (
                <span key={tech} className="flex items-center gap-1.5">
                  <span className="text-slate-300">{tech}</span>
                  {i < project.techStack.length - 1 && <span className="text-slate-600">·</span>}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
