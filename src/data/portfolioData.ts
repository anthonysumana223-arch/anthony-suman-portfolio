import { ProjectItem, ExperienceItem, EducationItem, SkillCategory, CertificateItem } from '../types/portfolio';
import heroEngineerWorkspaceImg from '../assets/images/hero_engineer_workspace_1790567682956.jpg';
import projectStockLstmImg from '../assets/images/project_stock_lstm_1790567701348.jpg';
import projectAutocanEvImg from '../assets/images/project_autocan_ev_1790567718924.jpg';

export const PERSONAL_INFO = {
  name: 'Anthony Suman A',
  role: 'AI & Machine Learning Engineer | Full-Stack Developer',
  tagline: 'Building neural forecasting pipelines, embedded e-mobility telematics, and high-performance interactive web systems.',
  email: 'anthonysumana223@gmail.com',
  github: 'https://github.com/anthonysumana',
  linkedin: 'https://linkedin.com/in/anthony-suman-a',
  portfolioUrl: 'https://itzfizz-assignment-omega.vercel.app/',
  location: 'Bengaluru, India',
  heroImage: heroEngineerWorkspaceImg,
  about: `I am a Computer Science student specializing in Artificial Intelligence and Machine Learning at CHRIST (Deemed to be University). I bridge algorithmic data science with production-grade engineering—from training LSTM neural networks for financial time-series forecasting to sniffing automotive CAN bus frames in e-mobility labs, to crafting high-performance full-stack web applications. I am passionate about solving real-world challenges with hands-on technical rigor.`,
  stats: [
    { label: 'Projects Built', value: '7+' },
    { label: 'Core AI Models', value: 'LSTM, RF, NLP' },
    { label: 'University CGPA / B.Tech', value: '2023–2027' },
    { label: 'Industry Simulations', value: 'Deloitte & Infosys' },
  ],
};

export const PROJECTS: ProjectItem[] = [
  {
    id: 'stock-lstm',
    title: 'Stock Price Prediction via LSTM Neural Networks',
    subtitle: 'Deep Learning Time-Series Forecasting Engine',
    category: 'ai-ml',
    categoryLabel: 'Artificial Intelligence & Deep Learning',
    period: '2025',
    description: 'Developed a deep learning model using Long Short-Term Memory (LSTM) recurrent neural networks to forecast equity price trajectories based on historical patterns with real-time financial market streams.',
    keyFeatures: [
      'Implemented multi-layered LSTM architecture with Dropout regularization for time-series forecasting',
      'Engineered feature pipeline processing OHLCV data via yfinance API with rolling statistics',
      'Built an interactive analytical dashboard using Streamlit to visualize predicted vs actual trajectories',
      'Achieved low RMSE & MAE error metrics with 60-day historical lookback sliding windows'
    ],
    techStack: ['Python', 'TensorFlow', 'Keras', 'Pandas', 'NumPy', 'yfinance', 'Streamlit', 'Matplotlib'],
    imageSrc: projectStockLstmImg,
    githubUrl: 'https://github.com/anthonysumana/stock-price-prediction-lstm',
    demoType: 'stock-lstm',
    metrics: [
      { label: 'Model Architecture', value: 'Stacked LSTM' },
      { label: 'Prediction Horizon', value: '30-Day Forward' },
      { label: 'Test Accuracy R²', value: '0.94' }
    ]
  },
  {
    id: 'autocan-emobility',
    title: 'AutoCAN: Automotive CAN Sniffing & Subsystem Controller',
    subtitle: 'Embedded e-Mobility Telematics & Vehicle Network Controller',
    category: 'emobility',
    categoryLabel: 'e-Mobility & Embedded Telematics',
    period: 'May 2025 – June 2025',
    description: 'Engineered an automotive controller and CAN bus frame analyzer at the Centre of Excellence in e-Mobility, CHRIST University. Sniffed, decoded, and injected CAN frames to monitor and control vehicle headlights, hazard warning, horn, and telemetry.',
    keyFeatures: [
      'Sniffed and decoded vehicle CAN data frames (11-bit & 29-bit identifiers) to map subsystem protocols',
      'Built custom Android telemetry application communicating over Bluetooth/OBD interface',
      'Controlled vehicle actuators (headlamps, hazard flashers, horn pulse, turn indicators) in real-time',
      'Achieved sub-15ms packet latency with real-time bus load and baud rate diagnostics'
    ],
    techStack: ['Embedded C', 'CAN Protocol', 'Android', 'Java/Kotlin', 'OBD-II', 'Python', 'Vehicle Bus Analysis'],
    imageSrc: projectAutocanEvImg,
    githubUrl: 'https://github.com/anthonysumana/autocan-vehicle-control',
    demoType: 'autocan',
    metrics: [
      { label: 'CAN Bus Standard', value: 'ISO 11898 (500 kbps)' },
      { label: 'Frame Decode Latency', value: '< 15 ms' },
      { label: 'Subsystems Monitored', value: 'Lighting, Horn, Telemetry' }
    ]
  },
  {
    id: 'disease-prediction-ml',
    title: 'Disease Prediction System via Machine Learning',
    subtitle: 'Clinical Symptom Multi-Class Classifier',
    category: 'ai-ml',
    categoryLabel: 'Machine Learning & Diagnostics',
    period: '2024 – 2025',
    description: 'Developed an intelligent healthcare diagnostic support system using an ensemble Random Forest algorithm that analyzes multi-attribute clinical symptoms to accurately classify potential conditions with confidence scores.',
    keyFeatures: [
      'Trained Random Forest classifier on multidimensional symptom-disease matrices',
      'Handled sparse categorical clinical vectors with optimized hyperparameter tuning',
      'Built a reactive diagnostic web interface in Streamlit enabling instantaneous patient symptom triage',
      'Provided ranked differential diagnosis probabilities alongside preventative clinical guidance'
    ],
    techStack: ['Python', 'Scikit-Learn', 'Random Forest', 'Pandas', 'Streamlit', 'NumPy'],
    githubUrl: 'https://github.com/anthonysumana/disease-prediction-ml',
    demoType: 'disease-ml',
    metrics: [
      { label: 'Classifier Type', value: 'Random Forest (100 Trees)' },
      { label: 'Cross-Validation', value: '96.4% F1-Score' },
      { label: 'Supported Symptoms', value: '40+ Indicators' }
    ]
  },
  {
    id: 'movie-recommendation',
    title: 'Collaborative Movie Recommender System',
    subtitle: 'Vector Cosine Similarity & Latent Factor Engine',
    category: 'ai-ml',
    categoryLabel: 'Machine Learning & Information Retrieval',
    period: '2024',
    description: 'Engineered a personalized recommendation engine on the real-world MovieLens dataset utilizing collaborative filtering and high-dimensional cosine similarity over user-item rating matrices.',
    keyFeatures: [
      'Constructed sparse user-item interaction matrices with normalization for rating biases',
      'Implemented cosine similarity algorithms to discover nearest-neighbor taste clusters',
      'Designed interactive Streamlit application with instant title search, poster metadata, and score breakdown',
      'Integrated hybrid fallback logic for cold-start items and genre-affinity boosting'
    ],
    techStack: ['Python', 'Scikit-learn', 'Cosine Similarity', 'Pandas', 'Streamlit', 'MovieLens Dataset'],
    githubUrl: 'https://github.com/anthonysumana/movie-recommendation-system',
    demoType: 'movie-recs',
    metrics: [
      { label: 'Algorithm', value: 'Item-Based Collaborative' },
      { label: 'Similarity Metric', value: 'Cosine Distance' },
      { label: 'Dataset', value: 'MovieLens 100k' }
    ]
  },
  {
    id: 'task-manager-react',
    title: 'Task Manager Web App (Vite & React)',
    subtitle: 'High-Performance State Management & Productivity Dashboard',
    category: 'web-fullstack',
    categoryLabel: 'Web Development & Frontend',
    period: '2025',
    description: 'A responsive task management application built with React and Vite featuring full CRUD functionality, multi-state status transitions (Pending, In Progress, Completed), localStorage persistence, and zero state desynchronization.',
    keyFeatures: [
      'Engineered complete CRUD operations with robust optimistic state updates and React hooks',
      'Implemented multi-column lifecycle management with dynamic priority indicators',
      'Resolved asynchronous state update race conditions using functional state updaters',
      'Persisted local database state in browser localStorage with JSON schema validation'
    ],
    techStack: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'LocalStorage API', 'Lucide Icons'],
    githubUrl: 'https://github.com/anthonysumana/task-manager-react',
    demoType: 'task-manager',
    metrics: [
      { label: 'State Model', value: 'Functional React Hooks' },
      { label: 'Storage', value: 'Browser LocalStorage' },
      { label: 'Lighthouse Score', value: '99/100' }
    ]
  },
  {
    id: 'scroll-hero-gsap',
    title: 'Scroll-Driven Hero Animation Website',
    subtitle: 'Fluid Motion & Parallax Web Experience',
    category: 'web-fullstack',
    categoryLabel: 'Creative Web & Motion',
    period: '2025',
    description: 'Developed an interactive, high-retention scroll-driven hero section utilizing GSAP ScrollTrigger, parallax layering, and GPU-composited motion physics with production deployment on Vercel.',
    keyFeatures: [
      'Crafted multi-plane parallax depth with GSAP ScrollTrigger timeline interpolation',
      'Optimized 60fps rendering using CSS transforms and hardware-accelerated layers',
      'Designed responsive editorial visual composition scaling seamlessly from mobile to 4K displays',
      'Deployed live on Vercel with zero cumulative layout shift (CLS)'
    ],
    techStack: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'ScrollTrigger', 'Vercel'],
    liveUrl: 'https://itzfizz-assignment-omega.vercel.app/',
    githubUrl: 'https://github.com/anthonysumana/itzfizz-assignment',
    demoType: 'scroll-hero',
    metrics: [
      { label: 'Frame Rate', value: '60 FPS Smooth' },
      { label: 'Animation Engine', value: 'GSAP ScrollTrigger' },
      { label: 'Deployment', value: 'Vercel Edge' }
    ]
  },
  {
    id: 'hospital-management-django',
    title: 'Hospital Management System (Django & PostgreSQL)',
    subtitle: 'Role-Based Clinical Healthcare Architecture',
    category: 'web-fullstack',
    categoryLabel: 'Full-Stack & Backend Systems',
    period: '2024 – 2025',
    description: 'Developed a robust full-stack clinical administration and appointment booking portal with role-based access control (Doctor / Patient), appointment scheduling, medical profile records, and production PostgreSQL architecture.',
    keyFeatures: [
      'Architected modular Django applications separating auth, doctor profiles, and appointments',
      'Implemented role-based permissions preventing unauthorized patient or medical record access',
      'Engineered appointment conflict resolution logic ensuring doctor slot availability',
      'Configured SQLite for fast local development and PostgreSQL-ready schema migrations for production'
    ],
    techStack: ['Python', 'Django', 'PostgreSQL', 'SQLite', 'HTML5/CSS3', 'Bootstrap/Tailwind'],
    githubUrl: 'https://github.com/anthonysumana/hospital-management-django',
    demoType: 'hospital-system',
    metrics: [
      { label: 'Architecture', value: 'Django MVT + PostgreSQL' },
      { label: 'Access Control', value: 'Role-Based (Doctor/Patient)' },
      { label: 'Database', value: 'PostgreSQL-ready' }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'coe-emobility',
    role: 'Project Intern',
    company: 'Centre of Excellence in e-Mobility',
    department: 'CHRIST (Deemed to be University)',
    period: 'May 2025 – June 2025',
    location: 'Bengaluru, India',
    projectTitle: 'AutoCAN: CAN Sniffing and Mobile App-based Control of Vehicle Subsystems',
    highlights: [
      'Sniffed and decoded automotive CAN data frames to analyze subsystem communications over high-speed vehicle networks.',
      'Developed a responsive Android application to remotely control and monitor vehicle lighting, horn pulses, and indicator lights.',
      'Gained deep practical expertise in CAN protocol frame decoding, arbitration IDs, bit stuffing, and error detection mechanisms.',
      'Conducted hardware-in-the-loop testing on real electronic control units (ECUs) and diagnostic ports.'
    ],
    technologies: ['CAN Bus (ISO 11898)', 'Android SDK', 'Java/Kotlin', 'OBD-II Sniffing', 'Embedded Systems', 'Automotive Telematics']
  }
];

export const EDUCATION: EducationItem[] = [
  {
    id: 'christ-btech',
    degree: 'Bachelor of Technology (B.Tech) in Artificial Intelligence & Machine Learning',
    institution: 'CHRIST (Deemed to be University), Bengaluru',
    period: '2023 – 2027',
    focus: 'Neural Networks, Deep Learning, Mathematical Optimization, Distributed Systems, e-Mobility',
    details: 'Focusing on artificial intelligence, algorithmic design, machine learning systems, statistical modeling, and hands-on software development.'
  },
  {
    id: 'st-josephs-puc',
    degree: 'Pre-University Certificate (Science – PCMC)',
    institution: "St. Joseph's Pre University College",
    period: '2021 – 2023',
    focus: 'Physics, Chemistry, Mathematics, and Computer Science',
    details: 'Established core foundations in algorithmic problem solving, calculus, discrete mathematics, and computer fundamentals.'
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: 'Programming Languages',
    description: 'Foundational syntax and algorithmic languages used across production systems.',
    skills: [
      { name: 'Python', level: 92, tags: ['TensorFlow', 'PyTorch', 'Data Science', 'Django'] },
      { name: 'JavaScript & TypeScript', level: 88, tags: ['React', 'Node.js', 'Vite', 'ESNext'] },
      { name: 'SQL', level: 85, tags: ['PostgreSQL', 'MySQL', 'Relational Queries'] },
      { name: 'HTML5 & CSS3', level: 90, tags: ['Tailwind CSS', 'Responsive Layouts'] }
    ]
  },
  {
    category: 'Artificial Intelligence & Machine Learning',
    description: 'Supervised, unsupervised, deep neural networks, and evaluation metrics.',
    skills: [
      { name: 'Deep Learning & Neural Networks', level: 88, tags: ['LSTM', 'RNN', 'CNN', 'Backpropagation'] },
      { name: 'Supervised & Unsupervised Learning', level: 90, tags: ['Random Forest', 'Classification', 'Regression'] },
      { name: 'Natural Language Processing (NLP)', level: 84, tags: ['Tokenization', 'Vector Embeddings', 'NLTK'] },
      { name: 'Model Evaluation & Optimization', level: 86, tags: ['Cross-Validation', 'RMSE', 'F1-Score', 'ROC-AUC'] }
    ]
  },
  {
    category: 'Frameworks & Scientific Libraries',
    description: 'Core numerical computation, tensor modeling, and statistical libraries.',
    skills: [
      { name: 'TensorFlow & Keras', level: 87, tags: ['Time-Series', 'Deep Architectures'] },
      { name: 'PyTorch', level: 82, tags: ['Tensors', 'Autograd'] },
      { name: 'Scikit-learn', level: 90, tags: ['Model Pipelines', 'Feature Scaling'] },
      { name: 'Pandas & NumPy', level: 92, tags: ['Vectorized Transforms', 'Data Wrangling'] },
      { name: 'Matplotlib & Seaborn', level: 85, tags: ['Statistical Visuals', 'Distribution Plots'] }
    ]
  },
  {
    category: 'Generative AI & LLMs',
    description: 'Modern prompt engineering, model integration, and retrieval pipelines.',
    skills: [
      { name: 'Prompt Engineering & LLMOps', level: 86, tags: ['Context Management', 'Chain of Thought'] },
      { name: 'Retrieval-Augmented Generation (RAG)', level: 84, tags: ['Vector Search', 'Chunking'] },
      { name: 'APIs (OpenAI, Hugging Face)', level: 88, tags: ['Transformers', 'API Integration'] },
      { name: 'Model Fine-Tuning & Evaluation', level: 80, tags: ['Domain Adaptation'] }
    ]
  },
  {
    category: 'Web Development & Full-Stack',
    description: 'Modern reactive frontend interfaces and backend API architectures.',
    skills: [
      { name: 'React.js & Vite', level: 90, tags: ['Hooks', 'State Management', 'SPA'] },
      { name: 'Node.js & Express', level: 84, tags: ['REST APIs', 'Middleware'] },
      { name: 'Django Framework', level: 82, tags: ['MVT Architecture', 'ORM'] },
      { name: 'Tailwind CSS & Motion', level: 90, tags: ['Animations', 'Design Systems'] }
    ]
  },
  {
    category: 'Databases, Cloud & Systems',
    description: 'Data storage engines, cloud platforms, and automotive protocols.',
    skills: [
      { name: 'MySQL & PostgreSQL', level: 85, tags: ['ACID Transactions', 'Indexing'] },
      { name: 'MongoDB & Firebase', level: 80, tags: ['NoSQL', 'Document Stores'] },
      { name: 'Cloud Computing (AWS / GCP)', level: 78, tags: ['Cloud Deployments', 'Storage'] },
      { name: 'CAN Protocol & Telematics', level: 85, tags: ['Frame Sniffing', 'OBD-II', 'ISO 11898'] }
    ]
  },
  {
    category: 'Developer Tools & Platforms',
    description: 'Workstation utilities, version control, and containerization.',
    skills: [
      { name: 'VS Code & Jupyter Notebook', level: 92, tags: ['IDE', 'Interactive Notebooks'] },
      { name: 'Google Colab & GPU Training', level: 88, tags: ['Cloud Acceleration'] },
      { name: 'Git & GitHub', level: 90, tags: ['Branching', 'Version Control'] },
      { name: 'Docker (Basics)', level: 76, tags: ['Containerization'] }
    ]
  }
];

export const CERTIFICATIONS: CertificateItem[] = [
  {
    id: 'infosys-nlp',
    title: 'Introduction to Natural Language Processing',
    issuer: 'Infosys Springboard',
    year: '2026',
    topics: ['NLP Fundamentals', 'Text Preprocessing', 'Word Embeddings', 'Sentiment Analysis']
  },
  {
    id: 'infosys-ds',
    title: 'Introduction to Data Science',
    issuer: 'Infosys Springboard',
    year: '2026',
    topics: ['Exploratory Data Analysis', 'Statistical Inference', 'Predictive Modeling', 'Data Visualization']
  },
  {
    id: 'deloitte-cyber',
    title: 'Cyber Security Job Simulation',
    issuer: 'Deloitte (Forage)',
    year: '2026',
    topics: ['Threat Analysis', 'Security Architecture', 'Incident Response', 'Vulnerability Assessment']
  },
  {
    id: 'deloitte-analytics',
    title: 'Data Analytics Job Simulation',
    issuer: 'Deloitte (Forage)',
    year: '2026',
    topics: ['Business Intelligence', 'Data Synthesis', 'Executive Dashboarding', 'Strategic Recommendations']
  },
  {
    id: 'gfg-python',
    title: 'Python Programming Certification',
    issuer: 'GeeksforGeeks',
    year: '2025',
    topics: ['Data Structures & Algorithms', 'OOP Principles', 'Memory Management', 'Algorithmic Problem Solving']
  },
  {
    id: 'udemy-web',
    title: 'Web Development Certification',
    issuer: 'Udemy',
    year: '2024',
    topics: ['Full-Stack Development', 'Modern JavaScript', 'RESTful API Services', 'Responsive Web Systems']
  }
];
