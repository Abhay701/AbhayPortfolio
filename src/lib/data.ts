import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Layout, 
  Smartphone, 
  Wrench,
  CheckCircle2
} from 'lucide-react';

export const profile = {
  name: "Abhay Kumar",
  title: "Full Stack Developer | React.js Developer | Next.js Developer",
  location: "Ludhiana, Punjab, India",
  email: "kumarabhay46790@gmail.com",
  secondaryEmail: "thakurabhay36790@gmail.com",
  intro: "I build modern, responsive and scalable web applications, transforming ideas into practical digital solutions through clean code and thoughtful design.",
  about: "I'm a Computer Science Engineering graduate and Full Stack Developer passionate about building modern web applications and solving real-world business problems. I have hands-on experience developing and maintaining business management applications, including ERP systems for the printing and packaging industry. My work involves frontend development, database integration, authentication, role-based access control, application optimization and building responsive user experiences.",
  education: {
    degree: "B.Tech in Computer Science Engineering",
    school: "CGC Landran, Punjab"
  },
  contributions: [
    "Client requirement gathering and analysis",
    "Business workflow analysis",
    "Application architecture & planning",
    "UI/UX design and frontend development",
    "Backend and database implementation",
    "Authentication and role-based access control",
    "Application testing and debugging",
    "Production deployment"
  ]
};

export const skills = [
  {
    category: "Frontend",
    icon: Layout,
    items: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React.js", "Next.js", "Tailwind CSS", "Shadcn UI", "Framer Motion"]
  },
  {
    category: "Backend & Database",
    icon: Database,
    items: ["Firebase", "Firestore", "Firebase Authentication", "Firebase Cloud Storage", "Node.js", "REST APIs", "SQL"]
  },
  {
    category: "State Management",
    icon: Layers,
    items: ["Redux Toolkit", "Zustand", "TanStack Query"]
  },
  {
    category: "Tools",
    icon: Wrench,
    items: ["Git", "GitHub", "VS Code", "Firebase Studio", "Expo", "AI-assisted development tools"]
  }
];

export const experience = [
  {
    company: "Macro Print Pack",
    role: "Full Stack Developer",
    period: "July 2025 – Present",
    type: "Freelance / Contract",
    location: "Ludhiana, Punjab",
    responsibilities: [
      "Developing and maintaining a production-oriented ERP management application.",
      "Building responsive user interfaces using Next.js, React and TypeScript.",
      "Implementing role-based authentication and access control.",
      "Developing modules for order management, manufacturing tracking, inventory and dispatch.",
      "Integrating Firebase Authentication, Firestore and Cloud Storage.",
      "Optimizing application performance and resolving real-world issues."
    ]
  },
  {
    company: "KB Print HUB",
    role: "Full Stack Developer",
    period: "July 2025 – Present",
    type: "Freelance / Contract",
    location: "Ludhiana, Punjab",
    responsibilities: [
      "Developing and maintaining a comprehensive printing and packaging ERP management platform.",
      "Successfully processed over 1,600+ real-world business orders.",
      "Engineered 9 dedicated role-based dashboards with strict access control.",
      "Implemented complete business modules: Order Management, Job Card Generation, Manufacturing Tracking, Inventory Management, and Dispatch.",
      "Integrated real-time database synchronization and cloud storage for production artwork."
    ]
  },
  {
    company: "Anand Fabrics",
    role: "Professional Experience",
    period: "July 2025 – Present",
    type: "Professional Experience",
    location: "Ludhiana, Punjab",
    responsibilities: [
      "Contributed to business operations and technical process improvements during the tenure."
    ]
  }
];
