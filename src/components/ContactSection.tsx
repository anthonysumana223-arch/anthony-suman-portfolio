import React, { useState } from 'react';
import { Mail, Copy, Check, ExternalLink, Github, Linkedin, Send, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('Engineering Role / Internship Opportunity');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sentFeedback, setSentFeedback] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendMail = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Hi Anthony,\n\nMy name is ${senderName}.\n\n${message}\n\nBest regards,\n${senderName}`
    )}`;
    window.location.href = mailtoUrl;
    setSentFeedback(true);
    setTimeout(() => setSentFeedback(false), 4000);
  };

  return (
    <section id="contact" className="py-20 bg-[#090a0f] border-t border-slate-900 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info & Socials (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                <span>DIRECT INVITATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-display">
                Let's Build Something Exceptional
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed">
                Currently open to software engineering internships, AI/ML research roles, and collaborative technical initiatives.
              </p>
            </div>

            {/* Email quick-action card */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs font-mono text-slate-400 block">Direct Contact Email</span>
              <div className="flex items-center justify-between gap-2">
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="text-sm sm:text-base font-mono font-semibold text-white hover:text-indigo-400 transition-colors truncate"
                >
                  {PERSONAL_INFO.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 shrink-0"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px] font-mono text-emerald-400">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span className="text-[11px] font-mono">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* External Links */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 block uppercase">Profiles & Repositories</span>
              <div className="flex flex-wrap gap-2.5">
                <a
                  href={PERSONAL_INFO.portfolioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                >
                  <span>Vercel Live Project</span>
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                </a>

                <a
                  href="https://github.com/anthonysumana"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  <span>GitHub Profile</span>
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3.5 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
                >
                  <Linkedin className="w-3.5 h-3.5 text-sky-400" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Message Box (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-7 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">
                Send a Direct Message
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Launches your default mail client with pre-formatted inquiry parameters.
              </p>
            </div>

            <form onSubmit={handleSendMail} className="space-y-3.5">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Your Name / Organization</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sarah Jenkins (Technical Recruiter)"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Inquiry Purpose</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
                >
                  <option value="Engineering Role / Internship Opportunity">
                    Software Engineering / AI Role Inquiry
                  </option>
                  <option value="Project Collaboration & Open Source">
                    Technical Collaboration / Open Source Project
                  </option>
                  <option value="e-Mobility CAN Bus Inquiry">
                    e-Mobility & Embedded Telematics Discussion
                  </option>
                  <option value="General Technical Inquiry">General Question</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1">Message Context</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell Anthony about the role, team, or project requirements..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500 leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Dispatch Mail to Anthony</span>
                </button>

                {sentFeedback && (
                  <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Mail client triggered!
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
