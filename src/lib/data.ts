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
  intro: "I build modern, responsive and scalable web applications, transforming ideas into practical digital solutions through clean code and thoughtful design.",
  about: "I'm a Computer Science Engineering graduate and Full Stack Developer passionate about building modern web applications and solving real-world business problems. I have hands-on experience developing and maintaining business management applications, including ERP systems for the printing and packaging industry. My work involves frontend development, database integration, authentication, role-based access control, application optimization and building responsive user experiences.",
  education: {
    degree: "B.Tech in Computer Science Engineering",
    school: "CGC Landran, Punjab"
  },
  contributions: [
    "Client requirement gathering and analysis",
    "Application planning and architecture",
    "UI/UX design and frontend development",
    "Backend and database implementation",
    "Authentication and role-based access control",
    "Application testing and debugging",
    "Production deployment",
    "Ongoing maintenance and feature enhancements"
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
    period: "Nov 2025 – Present",
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
    company: "Anand Fabrics",
    role: "Professional Experience",
    period: "6 Months",
    type: "Full-time",
    location: "Ludhiana, Punjab",
    responsibilities: [
      "Contributed to business operations and technical process improvements during the tenure."
    ]
  }
];

export const projects = [
  {
    title: "MACRO PRINT PACK",
    subtitle: "Printing & Packaging ERP",
    status: "Live Business Application",
    description: "An end-to-end business management application developed to streamline printing and packaging operations. Built from scratch based on client requirements, covering business workflows and operational management.",
    tech: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Auth"],
    imageHint: "enterprise software dashboard",
    featured: true
  },
  {
    title: "KB PRINT HUB",
    subtitle: "ERP & Business Management",
    status: "Live Business Application",
    description: "A comprehensive ERP application designed and developed from scratch to manage business operations through structured workflows, role-based access and dedicated dashboards.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Cloud Storage"],
    imageHint: "business analytics dashboard",
    featured: false
  },
  {
    title: "ANAND FABRICS",
    subtitle: "Textile Industry Application",
    status: "Business Application",
    description: "A business-focused application developed around the operational requirements of the textile industry, translating client requirements into practical software solutions.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "SQL", "REST APIs"],
    imageHint: "industrial management software",
    featured: false
  }
];
