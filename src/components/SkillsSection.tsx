import React, { useState } from 'react';
import { Code2, Brain, Database, Cpu, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [selectedCategoryIdx, setSelectedCategoryIdx] = useState<number>(0);

  const activeCategory = SKILL_CATEGORIES[selectedCategoryIdx];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Programming Languages':
        return <Code2 className="w-4 h-4" />;
      case 'Artificial Intelligence & Machine Learning':
        return <Brain className="w-4 h-4" />;
      case 'Frameworks & Scientific Libraries':
        return <Cpu className="w-4 h-4" />;
      case 'Generative AI & LLMs':
        return <Sparkles className="w-4 h-4" />;
      case 'Databases, Cloud & Systems':
        return <Database className="w-4 h-4" />;
      default:
        return <Wrench className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="py-20 bg-[#090a0f] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="space-y-2 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span>CAPABILITIES TAXONOMY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
            Technical Skills & Engineering Stack
          </h2>
          <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
            Proficiencies categorized across machine learning architectures, mathematical frameworks, full-stack web platforms, and embedded telematics.
          </p>
        </div>

        {/* Category Tabs & Active Skills View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Category Selector List (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            {SKILL_CATEGORIES.map((cat, idx) => (
              <button
                key={cat.category}
                onClick={() => setSelectedCategoryIdx(idx)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl text-left transition-all border ${
                  selectedCategoryIdx === idx
                    ? 'bg-indigo-600/15 border-indigo-500/80 text-white font-medium shadow-md shadow-indigo-950/40'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={selectedCategoryIdx === idx ? 'text-indigo-400' : 'text-slate-500'}>
                    {getCategoryIcon(cat.category)}
                  </span>
                  <span className="text-xs font-semibold">{cat.category}</span>
                </div>
                <span className="text-xs font-mono text-slate-500">
                  {cat.skills.length}
                </span>
              </button>
            ))}
          </div>

          {/* Right Active Skills Grid (8 cols) */}
          <div className="lg:col-span-8 p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-6">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white tracking-tight font-display">
                  {activeCategory.category}
                </h3>
                <span className="text-xs font-mono text-indigo-400">
                  Category {selectedCategoryIdx + 1} of {SKILL_CATEGORIES.length}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {activeCategory.description}
              </p>
            </div>

            <div className="space-y-5">
              {activeCategory.skills.map((skill) => (
                <div key={skill.name} className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{skill.name}</span>
                    <span className="font-mono text-slate-400 tabular-nums">
                      {skill.level}% Proficiency
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>

                  {/* Associated sub-tags - unboxed with typographic separators */}
                  {skill.tags && skill.tags.length > 0 && (
                    <div className="flex flex-wrap items-center gap-x-2 text-[11px] text-slate-400 font-mono pt-0.5">
                      <span className="text-slate-500">Applied in:</span>
                      {skill.tags.map((tag, i) => (
                        <span key={tag} className="flex items-center gap-1.5">
                          <span className="text-slate-300">{tag}</span>
                          {i < skill.tags!.length - 1 && <span className="text-slate-700">·</span>}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
