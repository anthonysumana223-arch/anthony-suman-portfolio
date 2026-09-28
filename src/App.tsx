/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ProjectItem } from './types/portfolio';
import { PROJECTS } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { HeroSection } from './components/HeroSection';
import { ProjectsSection } from './components/ProjectsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { SkillsSection } from './components/SkillsSection';
import { CertificationsSection } from './components/CertificationsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { DemoModal } from './components/DemoModal';
import { ResumeModal } from './components/ResumeModal';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const handleOpenContact = () => {
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleExploreDemos = () => {
    const projectsElem = document.getElementById('projects');
    if (projectsElem) {
      projectsElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLaunchAutoCanDemo = () => {
    const autoCanProject = PROJECTS.find((p) => p.id === 'autocan-emobility');
    if (autoCanProject) {
      setSelectedProject(autoCanProject);
    }
  };

  return (
    <div className="min-h-screen bg-[#090A0F] text-[#F3F4F6] relative overflow-x-hidden">
      {/* Top Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Navigation */}
      <Navbar onOpenContact={handleOpenContact} />

      {/* Main Content Sections */}
      <main>
        {/* Hero Section */}
        <HeroSection
          onExploreDemos={handleExploreDemos}
          onOpenContact={handleOpenContact}
          onViewResume={() => setIsResumeOpen(true)}
        />

        {/* Featured Projects with Live Demos */}
        <ProjectsSection onSelectProject={setSelectedProject} />

        {/* Industry Experience & Academic Timeline */}
        <ExperienceSection onLaunchAutoCanDemo={handleLaunchAutoCanDemo} />

        {/* Technical Skills Matrix */}
        <SkillsSection />

        {/* Verified Credentials */}
        <CertificationsSection />

        {/* Contact & Inquiry Dispatch */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Full-Screen Interactive Demo Modal */}
      <DemoModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Printable Interactive Resume Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
