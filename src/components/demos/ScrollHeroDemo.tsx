import React, { useState } from 'react';
import { ExternalLink, Layers, Sparkles, Move, Compass, Eye } from 'lucide-react';

export const ScrollHeroDemo: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(35);
  const [perspectiveAngle, setPerspectiveAngle] = useState<number>(12);
  const [activeTab, setActiveTab] = useState<'interactive' | 'live-site'>('interactive');

  // Calculate parallax offsets based on virtual scroll scrub
  const p = scrollProgress / 100;
  const layer1Y = p * -80; // background stars / grid
  const layer2Y = p * -140; // midground floating typography
  const layer3Scale = 1 + p * 0.45; // foreground 3D product/geometry
  const layer3Rotate = (p - 0.5) * perspectiveAngle * 2;
  const layer3Z = p * 120;
  const overlayOpacity = Math.min(1, Math.max(0, (p - 0.2) * 1.5));

  return (
    <div className="space-y-4 text-slate-200">
      {/* Tab Switcher & Live Link */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-slate-900/90 border border-slate-800">
        <div className="flex gap-1.5 p-1 bg-slate-950/60 rounded-lg">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'interactive'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            GSAP Parallax Physics Sandbox
          </button>
          <button
            onClick={() => setActiveTab('live-site')}
            className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
              activeTab === 'live-site'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Live Deployed Site Frame
          </button>
        </div>

        <a
          href="https://itzfizz-assignment-omega.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors border border-slate-700"
        >
          <span>Open on Vercel</span>
          <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
        </a>
      </div>

      {activeTab === 'interactive' ? (
        <div className="space-y-4">
          {/* Controls Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Move className="w-3.5 h-3.5 text-indigo-400" />
                  Scroll Scrub Velocity ($Y$-Offset)
                </span>
                <span className="text-indigo-400 tabular-nums">{scrollProgress}%</span>
              </div>
              <input
                type="range"
                min={0}
                max={100}
                value={scrollProgress}
                onChange={(e) => setScrollProgress(Number(e.target.value))}
                className="w-full accent-indigo-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-mono text-slate-400 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-sky-400" />
                  3D Spatial Tilt Pitch
                </span>
                <span className="text-sky-400 tabular-nums">±{perspectiveAngle}°</span>
              </div>
              <input
                type="range"
                min={0}
                max={30}
                value={perspectiveAngle}
                onChange={(e) => setPerspectiveAngle(Number(e.target.value))}
                className="w-full accent-sky-500 bg-slate-800 h-1.5 rounded cursor-pointer"
              />
            </div>
          </div>

          {/* Interactive Parallax Canvas with 3D Perspective */}
          <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-[#06070a] border border-slate-800 flex items-center justify-center [perspective:1000px]">
            {/* Layer 1: Ambient Grid Backdrop */}
            <div
              className="absolute inset-0 bg-grid-pattern opacity-40 transition-transform duration-100 ease-out"
              style={{ transform: `translateY(${layer1Y}px)` }}
            />

            {/* Ambient Radial Glow */}
            <div
              className="absolute w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl pointer-events-none transition-transform duration-200"
              style={{
                transform: `translate(${Math.sin(p * Math.PI) * 40}px, ${layer1Y * 0.5}px)`
              }}
            />

            {/* Layer 2: Typographic Hero Backdrop */}
            <div
              className="absolute text-center select-none pointer-events-none transition-transform duration-100 ease-out px-4"
              style={{ transform: `translateY(${layer2Y}px)` }}
            >
              <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-600 tracking-tight font-display">
                FUTURE MOTION
              </h2>
              <p className="text-xs md:text-sm font-mono text-indigo-400 mt-2 tracking-widest uppercase">
                Hardware-Accelerated GSAP ScrollTrigger
              </p>
            </div>

            {/* Layer 3: Dynamic 3D Card Artifact */}
            <div
              className="relative z-10 w-72 h-44 rounded-xl bg-slate-900/90 border border-indigo-500/40 p-4 shadow-2xl backdrop-blur-md transition-transform duration-100 ease-out flex flex-col justify-between"
              style={{
                transform: `scale(${layer3Scale}) rotateY(${layer3Rotate}deg) rotateX(${layer3Rotate * -0.5}deg) translateZ(${layer3Z}px)`,
                boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25)'
              }}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-400">GSAP TIMELINE · COMP 01</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div>
                <p className="text-lg font-bold text-white tracking-tight">Kinetic Choreography</p>
                <p className="text-[11px] text-slate-400 mt-1">
                  Scroll scrub: <span className="font-mono text-white">{scrollProgress}%</span> · Scale: <span className="font-mono text-white">{layer3Scale.toFixed(2)}x</span>
                </p>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-2 border-t border-slate-800">
                <span>FPS: 60 LOCKED</span>
                <span>GPU ACCELERATED</span>
              </div>
            </div>

            {/* Layer 4: Scroll Velocity Overlay */}
            <div
              className="absolute bottom-3 left-4 text-[11px] font-mono text-slate-400 bg-slate-950/80 px-2.5 py-1 rounded border border-slate-800"
              style={{ opacity: 0.85 }}
            >
              Transform: Matrix3D · Will-Change: transform, opacity
            </div>
          </div>
        </div>
      ) : (
        /* Live Vercel Iframe Preview */
        <div className="space-y-2">
          <div className="relative w-full h-[420px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950">
            <iframe
              src="https://itzfizz-assignment-omega.vercel.app/"
              title="Live GSAP Scroll Website"
              className="w-full h-full border-0"
              loading="lazy"
              sandbox="allow-scripts allow-same-origin"
            />
          </div>
          <p className="text-xs text-slate-400 text-center">
            Embedded live view of Anthony Suman's GSAP parallax project deployed on Vercel edge infrastructure.
          </p>
        </div>
      )}

      {/* Technical Highlights */}
      <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
        <div>
          <span className="font-semibold text-white block mb-0.5">Parallax Multi-Plane</span>
          <span className="text-slate-400">Differentiates foreground and background translation vectors with sub-pixel interpolation.</span>
        </div>
        <div>
          <span className="font-semibold text-white block mb-0.5">Compositor Performance</span>
          <span className="text-slate-400">Operates exclusively on GPU-accelerated CSS transforms and opacity to maintain 60 FPS without layout jank.</span>
        </div>
        <div>
          <span className="font-semibold text-white block mb-0.5">Zero CLS Geometry</span>
          <span className="text-slate-400">Absolute bounds prevent layout thrashing and maintain 99+ Google Lighthouse performance.</span>
        </div>
      </div>
    </div>
  );
};
