export type ProjectCategory = 'all' | 'ai-ml' | 'web-fullstack' | 'emobility';

export interface ProjectItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'ai-ml' | 'web-fullstack' | 'emobility';
  categoryLabel: string;
  period: string;
  description: string;
  keyFeatures: string[];
  techStack: string[];
  imageSrc?: string;
  liveUrl?: string;
  githubUrl?: string;
  demoType: 'stock-lstm' | 'disease-ml' | 'movie-recs' | 'task-manager' | 'scroll-hero' | 'hospital-system' | 'autocan';
  metrics?: { label: string; value: string }[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  department?: string;
  period: string;
  location: string;
  projectTitle: string;
  highlights: string[];
  technologies: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  period: string;
  focus: string;
  details: string;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: number; tags?: string[] }[];
}

export interface CertificateItem {
  id: string;
  title: string;
  issuer: string;
  year: string;
  topics: string[];
  verifyUrl?: string;
}
