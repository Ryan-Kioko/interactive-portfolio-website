export const profile = {
  name: 'Ryan Kioko',
  role: 'Applied AI Student · Aspiring AI Engineer',
  summary:
    'Applied AI student at the University of Bradford (graduating 2027) with hands-on experience building NLP sentiment pipelines, CNN emotion classifiers, and clinical AI tools. Experienced Scrum Master on four team projects, seeking an AI engineering internship to apply ML to real-world problems in the Nairobi tech ecosystem.',
  email: 'ryanwendo@gmail.com',
  phoneUK: '+44 7493 204057',
  phoneKE: '+254 780 200622',
  github: 'https://github.com/Ryan-Kioko',
  linkedin: 'https://www.linkedin.com/',
}

export type MilestoneKind = 'education' | 'work' | 'project' | 'leadership' | 'goal'

export type Milestone = {
  id: string
  year: string
  period: string
  title: string
  org: string
  kind: MilestoneKind
  description: string
  skills: string[]
}

export const milestones: Milestone[] = [
  {
    id: 'naisula',
    year: '2022',
    period: '2022 – 2024',
    title: 'International Baccalaureate — 35 points',
    org: 'Naisula School',
    kind: 'education',
    description:
      'Built the foundations in Computer Science, Physics and Mathematics — the analytical toolkit behind everything that followed.',
    skills: ['Mathematics', 'Physics', 'Computer Science'],
  },
  {
    id: 'airtel',
    year: '2023',
    period: 'Jul – Aug 2023',
    title: 'Data Science Intern',
    org: 'Airtel Networks Kenya Ltd',
    kind: 'work',
    description:
      'First taste of industry: IT hardware & software support, network security, billing systems, and core radio & transmission operations in a fast-paced telco.',
    skills: ['Networking', 'IT Support', 'Communication'],
  },
  {
    id: 'bradford',
    year: '2024',
    period: '2024 – May 2027',
    title: 'BSc Applied Artificial Intelligence',
    org: 'University of Bradford, UK',
    kind: 'education',
    description:
      'Moved to the UK to specialise in AI — machine learning, deep learning, NLP and computer vision, with team projects run as Agile sprints.',
    skills: ['Python', 'Machine Learning', 'Agile/Scrum'],
  },
  {
    id: 'ambassador',
    year: '2024',
    period: 'Sep 2024 – Present',
    title: 'Student Ambassador & Cohort Representative',
    org: 'University of Bradford',
    kind: 'leadership',
    description:
      'Represent the university at open days and outreach, and was elected class rep — the liaison between the Applied AI cohort and academic staff on staff–student committees.',
    skills: ['Public Speaking', 'Leadership', 'Stakeholder Liaison'],
  },
  {
    id: 'chatbot',
    year: '2024',
    period: 'Dec 2024',
    title: 'Movie Recommendation Chatbot',
    org: 'Group Project',
    kind: 'project',
    description:
      'First NLP system: a Rasa conversational agent detecting intents and extracting entities to serve personalised, genre-based movie suggestions.',
    skills: ['Rasa', 'NLP', 'Python'],
  },
  {
    id: 'var',
    year: '2025',
    period: 'Mar 2025',
    title: 'VAR Sentiment Analysis',
    org: 'NLP Project',
    kind: 'project',
    description:
      'Scraped football tweets on VAR with BeautifulSoup, classified fan sentiment with Transformers, and shipped interactive Streamlit dashboards.',
    skills: ['Transformers', 'Web Scraping', 'Streamlit'],
  },
  {
    id: 'pal',
    year: '2025',
    period: 'Sep 2025 – Present',
    title: 'Peer Assisted Learning Leader',
    org: 'University of Bradford',
    kind: 'leadership',
    description:
      'Teach Year 1 students programming, algorithms and problem-solving — reinforcing my own fundamentals by explaining them to others.',
    skills: ['Teaching', 'Algorithms', 'Mentoring'],
  },
  {
    id: 'fer',
    year: '2026',
    period: '2026',
    title: 'FER Emotion Classification',
    org: 'Deep Learning Project',
    kind: 'project',
    description:
      'PyTorch CNN trained on fer2013 to recognise 7 facial emotions, using dropout, batch norm and augmentation, evaluated with confusion matrices.',
    skills: ['PyTorch', 'CNNs', 'Computer Vision'],
  },
  {
    id: 'parkinsons',
    year: '2026',
    period: '2026',
    title: "Parkinson's Finger-Tapping & UPDRS Predictor",
    org: 'Clinical AI Project',
    kind: 'project',
    description:
      'Signal-processing + ML pipeline turning raw finger-tapping amplitude/time signals into features to detect PD and grade UPDRS severity.',
    skills: ['Feature Engineering', 'Scikit-learn', 'Healthcare AI'],
  },
  {
    id: 'clendan',
    year: '2026',
    period: 'Aug 2026',
    title: 'Clendan — AI Financial Agent OS',
    org: 'Co-Developer',
    kind: 'project',
    description:
      'Full-stack agent platform automating invoices and reconciliation under policy enforcement with audit trails. FastAPI, Prisma, Postgres RLS, Claude, Next.js, Docker.',
    skills: ['FastAPI', 'Next.js', 'LLM Agents', 'Docker'],
  },
  {
    id: 'next',
    year: '2027',
    period: 'May 2027 →',
    title: 'Graduation → AI Engineering',
    org: 'Next Chapter · Nairobi',
    kind: 'goal',
    description:
      'Seeking an AI engineering internship to apply ML models to real-world problems in the Nairobi tech ecosystem.',
    skills: ['AI Engineering', 'Impact'],
  },
]

export type Project = {
  id: string
  title: string
  tagline: string
  domain: 'NLP' | 'Computer Vision' | 'Clinical AI' | 'Full-Stack AI'
  year: string
  points: string[]
  stack: string[]
  repo: string
  visual: 'agent' | 'signal' | 'sentiment' | 'confusion' | 'chat' | 'severity'
}

export const projects: Project[] = [
  {
    id: 'clendan',
    title: 'Clendan',
    tagline: 'AI Financial Agent OS',
    domain: 'Full-Stack AI',
    year: '2026',
    points: [
      'Autonomous agents process invoices, reconcile accounts and execute financial tasks under strict policy checks.',
      'FastAPI + Prisma backend on PostgreSQL with Row-Level Security and full audit trails.',
      'Next.js/TypeScript frontend; Dockerised and deployed via Railway and Vercel.',
    ],
    stack: ['FastAPI', 'Prisma', 'PostgreSQL', 'Claude API', 'Next.js', 'Docker'],
    repo: 'https://github.com/Ryan-Kioko/clendan',
    visual: 'agent',
  },
  {
    id: 'parkinsons',
    title: "Parkinson's Finger-Tapping",
    tagline: 'PD detection from motor signals',
    domain: 'Clinical AI',
    year: '2026',
    points: [
      'Processes raw amplitude & time signals from finger-tapping tests per hand.',
      'Extracts statistical and signal-based features for binary PD vs healthy classification.',
      'Robust cross-validation and exported models for a Streamlit app.',
    ],
    stack: ['Python', 'Scikit-learn', 'Pandas', 'Streamlit'],
    repo: 'https://github.com/Ryan-Kioko/parkinsonspredictor',
    visual: 'signal',
  },
  {
    id: 'updrs',
    title: 'UPDRS Predictor',
    tagline: 'Multiclass severity assessment',
    domain: 'Clinical AI',
    year: '2026',
    points: [
      'Extends the PD tool to grade disease severity on the UPDRS scale.',
      'Converts tapping signals into clinically meaningful features for multiclass models.',
      'An objective, data-driven complement to subjective clinician scoring.',
    ],
    stack: ['Python', 'Feature Engineering', 'Model Evaluation'],
    repo: 'https://github.com/Ryan-Kioko/updrs-predictor',
    visual: 'severity',
  },
  {
    id: 'fer',
    title: 'FER Emotion Classification',
    tagline: '7-class facial emotion CNN',
    domain: 'Computer Vision',
    year: '2026',
    points: [
      'PyTorch CNN trained on the fer2013 dataset.',
      'Dropout, batch normalisation and data augmentation for generalisation.',
      'Evaluated per-class performance with confusion matrices.',
    ],
    stack: ['PyTorch', 'CNNs', 'OpenCV', 'NumPy'],
    repo: 'https://github.com/Ryan-Kioko/EmotionClassification',
    visual: 'confusion',
  },
  {
    id: 'var',
    title: 'VAR Sentiment Analysis',
    tagline: 'What football fans really think',
    domain: 'NLP',
    year: '2025',
    points: [
      'Scraped VAR-related football tweets with BeautifulSoup.',
      'Classified sentiment with Hugging Face Transformers.',
      'Visualised findings in Seaborn, Matplotlib and Streamlit dashboards.',
    ],
    stack: ['Transformers', 'BeautifulSoup', 'Seaborn', 'Streamlit'],
    repo: 'https://github.com/Ryan-Kioko/VAR-Sentiment-Analysis',
    visual: 'sentiment',
  },
  {
    id: 'chatbot',
    title: 'Movie Recommendation Chatbot',
    tagline: 'Conversational recommender',
    domain: 'NLP',
    year: '2024',
    points: [
      'Rasa-powered chatbot for personalised movie suggestions.',
      'NLP pipeline for intent detection and entity extraction.',
      'Queries a genre-based movie list to recommend titles.',
    ],
    stack: ['Rasa', 'Python', 'NLU'],
    repo: 'https://github.com/Ryan-Kioko/Rasa-Movie-Recommendation-Chatbot',
    visual: 'chat',
  },
]

/** Skill proficiency by domain as it grew each year (self-assessed, 0–100). */
export const skillGrowth = [
  { year: '2022', ML: 5, NLP: 0, Vision: 0, Data: 15, Web: 5, Leadership: 10 },
  { year: '2023', ML: 10, NLP: 0, Vision: 0, Data: 30, Web: 10, Leadership: 25 },
  { year: '2024', ML: 35, NLP: 30, Vision: 10, Data: 45, Web: 20, Leadership: 55 },
  { year: '2025', ML: 55, NLP: 60, Vision: 25, Data: 65, Web: 30, Leadership: 75 },
  { year: '2026', ML: 75, NLP: 70, Vision: 65, Data: 75, Web: 70, Leadership: 85 },
]

export const skillRadar = [
  { domain: 'Machine Learning', value: 80 },
  { domain: 'NLP', value: 75 },
  { domain: 'Computer Vision', value: 65 },
  { domain: 'Data Analysis', value: 80 },
  { domain: 'Web & APIs', value: 70 },
  { domain: 'Cloud & DevOps', value: 55 },
]

export const techStack: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'JavaScript', 'TypeScript', 'SQL'] },
  {
    group: 'ML & AI',
    items: ['PyTorch', 'Scikit-learn', 'Hugging Face', 'OpenCV', 'Rasa', 'Claude API'],
  },
  {
    group: 'Data',
    items: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Power BI', 'Tableau'],
  },
  {
    group: 'Web',
    items: ['FastAPI', 'Flask', 'Django', 'Next.js', 'Tailwind', 'Prisma', 'Streamlit'],
  },
  {
    group: 'Cloud & Tools',
    items: ['Azure', 'Docker', 'Railway', 'Vercel', 'Git', 'Jira', 'PostgreSQL'],
  },
]

export const certifications = [
  { name: 'Microsoft Azure AI Fundamentals', code: 'AI-900', issuer: 'Microsoft' },
  { name: 'Neo4j & Generative AI Fundamentals', code: 'GenAI', issuer: 'Neo4j' },
  { name: 'Machine Learning with Python', code: 'Professional Cert.', issuer: 'Anaconda' },
  { name: 'AI Ethics by Design', code: 'Ethics', issuer: 'Udemy' },
]

/** Nodes and links for the 3D career constellation. */
export type GraphNode = {
  id: string
  label: string
  type: 'experience' | 'skill'
  group: MilestoneKind | 'skill'
}

export const graphSkills = [
  'Python',
  'PyTorch',
  'Transformers',
  'Scikit-learn',
  'NLP',
  'Computer Vision',
  'Feature Eng.',
  'FastAPI',
  'Next.js',
  'Docker',
  'Leadership',
  'Communication',
  'Agile/Scrum',
  'Mathematics',
]

export const graphLinks: [string, string][] = [
  ['naisula', 'Mathematics'],
  ['naisula', 'Python'],
  ['airtel', 'Communication'],
  ['bradford', 'Python'],
  ['bradford', 'Mathematics'],
  ['bradford', 'Agile/Scrum'],
  ['bradford', 'Scikit-learn'],
  ['ambassador', 'Communication'],
  ['ambassador', 'Leadership'],
  ['pal', 'Leadership'],
  ['pal', 'Communication'],
  ['pal', 'Python'],
  ['chatbot', 'NLP'],
  ['chatbot', 'Python'],
  ['chatbot', 'Agile/Scrum'],
  ['var', 'NLP'],
  ['var', 'Transformers'],
  ['var', 'Python'],
  ['fer', 'PyTorch'],
  ['fer', 'Computer Vision'],
  ['parkinsons', 'Scikit-learn'],
  ['parkinsons', 'Feature Eng.'],
  ['clendan', 'FastAPI'],
  ['clendan', 'Next.js'],
  ['clendan', 'Docker'],
  ['clendan', 'Agile/Scrum'],
]
