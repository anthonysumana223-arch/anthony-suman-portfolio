import React, { useState } from 'react';
import { Play, ExternalLink, Github, Sparkles, ChevronDown, ChevronUp, Layers, CheckCircle2 } from 'lucide-react';
import { ProjectItem, ProjectCategory } from '../types/portfolio';
import { PROJECTS } from '../data/portfolioData';
import { StockPredictionDemo } from './demos/StockPredictionDemo';
import { DiseasePredictionDemo } from './demos/DiseasePredictionDemo';
import { MovieRecommendationDemo } from './demos/MovieRecommendationDemo';
import { TaskManagerDemo } from './demos/TaskManagerDemo';
import { ScrollHeroDemo } from './demos/ScrollHeroDemo';
import { HospitalManagementDemo } from './demos/HospitalManagementDemo';
import { AutoCanDemo } from './demos/AutoCanDemo';

interface ProjectsSectionProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<ProjectCategory>('all');
  const [inlineOpenMap, setInlineOpenMap] = useState<Record<string, boolean>>({
    'stock-lstm': false,
    'autocan-emobility': false
  });

  const toggleInlineDemo = (id: string) => {
    setInlineOpenMap((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const filteredProjects = PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.category === activeFilter;
  });

  const renderInlineDemo = (demoType: ProjectItem['demoType']) => {
    switch (demoType) {
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
        return null;
    }
  };

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <span>ENGINEERED ARTIFACTS & EXPERIMENTS</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display text-balance">
              Featured Projects & Live Interactive Demos
            </h2>
            <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
              Every project below includes a functional real-time simulator or live deployed frame. Click "Launch Live Demo" or expand inline to test model inference and subsystem controls.
            </p>
          </div>

          {/* Interactive Filter Segmented Control */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 bg-slate-900/90 border border-slate-800 rounded-xl self-start md:self-auto">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'all'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All Projects ({PROJECTS.length})
            </button>
            <button
              onClick={() => setActiveFilter('ai-ml')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'ai-ml'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              AI & Machine Learning (3)
            </button>
            <button
              onClick={() => setActiveFilter('web-fullstack')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'web-fullstack'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Web & Full-Stack (3)
            </button>
            <button
              onClick={() => setActiveFilter('emobility')}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap ${
                activeFilter === 'emobility'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              e-Mobility & CAN Bus (1)
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {filteredProjects.map((project, index) => {
            const isInlineOpen = inlineOpenMap[project.id] ?? false;

            return (
              <div
                key={project.id}
                className="rounded-2xl bg-[#0d0f18] border border-slate-800/90 overflow-hidden hover:border-slate-700/80 transition-all duration-300 shadow-xl"
              >
                {/* Project Header & Main Card Body */}
                <div className="p-6 sm:p-8">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left details (7 or 8 cols) */}
                    <div className="lg:col-span-8 space-y-4">
                      {/* Zero-Pill Unboxed Metadata line */}
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                        <span className="text-indigo-400 font-mono font-medium">
                          0{index + 1}. {project.categoryLabel}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span className="font-mono">{project.period}</span>
                        {project.metrics && project.metrics.length > 0 && (
                          <>
                            <span aria-hidden="true" className="text-slate-600">·</span>
                            <span className="text-emerald-400 font-mono font-semibold">
                              {project.metrics[project.metrics.length - 1].label}: {project.metrics[project.metrics.length - 1].value}
                            </span>
                          </>
                        )}
                      </div>

                      {/* Title & Subtitle */}
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display">
                          {project.title}
                        </h3>
                        <p className="text-sm font-medium text-slate-400 mt-1">
                          {project.subtitle}
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Key Engineering Features */}
                      <ul className="space-y-1.5 pt-1">
                        {project.keyFeatures.map((feat, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack - Unboxed text with typographic separators */}
                      <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs pt-3 border-t border-slate-800/80">
                        <span className="text-slate-500 font-mono font-medium">Stack:</span>
                        {project.techStack.map((tech, i) => (
                          <span key={tech} className="flex items-center gap-2 text-slate-300 font-mono text-[11px]">
                            <span>{tech}</span>
                            {i < project.techStack.length - 1 && (
                              <span className="text-slate-700" aria-hidden="true">/</span>
                            )}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Action & Quick Preview Panel (4 cols) */}
                    <div className="lg:col-span-4 flex flex-col justify-between h-full space-y-4 bg-slate-950/60 p-5 rounded-xl border border-slate-800/80">
                      {/* Image Thumbnail if available */}
                      {project.imageSrc && (
                        <div className="relative rounded-lg overflow-hidden border border-slate-800 h-36">
                          <img
                            src={project.imageSrc}
                            alt={project.title}
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                          <div className="absolute bottom-2 left-2 text-[10px] font-mono text-emerald-300 bg-slate-950/80 px-2 py-0.5 rounded border border-slate-800">
                            Live Simulated Model
                          </div>
                        </div>
                      )}

                      {/* Metrics Showcase */}
                      {project.metrics && (
                        <div className="space-y-2 py-2">
                          {project.metrics.map((m) => (
                            <div key={m.label} className="flex items-center justify-between text-xs">
                              <span className="text-slate-400">{m.label}</span>
                              <span className="font-mono font-bold text-white tabular-nums">{m.value}</span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2 border-t border-slate-800/80">
                        {/* Primary: Launch Live Demo in Modal */}
                        <button
                          onClick={() => onSelectProject(project)}
                          className="w-full flex items-center justify-center gap-2 py-2.5 px-4 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span>Launch Live Interactive Demo</span>
                        </button>

                        {/* Secondary: Inline Toggle */}
                        <button
                          onClick={() => toggleInlineDemo(project.id)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-medium text-slate-300 hover:text-white bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                        >
                          <span>{isInlineOpen ? 'Collapse Inline Demo' : 'Quick Inline Preview'}</span>
                          {isInlineOpen ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>

                        {/* Direct External Links */}
                        <div className="flex items-center gap-2 pt-1">
                          {project.liveUrl && (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-900/60 rounded border border-slate-800 transition-colors"
                            >
                              <span>Live Vercel</span>
                              <ExternalLink className="w-3 h-3 text-indigo-400" />
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[11px] font-mono text-slate-400 hover:text-white bg-slate-900/60 rounded border border-slate-800 transition-colors"
                            >
                              <Github className="w-3 h-3" />
                              <span>Repository</span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inline Live Demo Drawer (Expands smoothly on demand) */}
                {isInlineOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 bg-slate-950/40">
                    <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800/60">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                        <span className="text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
                          Inline Running Environment · {project.title}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleInlineDemo(project.id)}
                        className="text-xs text-slate-400 hover:text-white transition-colors"
                      >
                        Hide
                      </button>
                    </div>

                    {renderInlineDemo(project.demoType)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
