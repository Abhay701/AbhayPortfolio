
import { 
  Code2, 
  Database, 
  Globe, 
  Layers, 
  Layout, 
  Smartphone, 
  Wrench 
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
  }
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
    title: "KB Print HUB",
    subtitle: "Enterprise ERP Management System",
    description: "A comprehensive ERP management platform developed for the printing and packaging industry. Features role-based dashboards for production, inventory, and business operations.",
    tech: ["Next.js 15", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Auth"],
    links: {
      live: true,
      other: true
    },
    featured: true,
    imageHint: "enterprise software dashboard"
  },
  {
    title: "SkyCast 2.0",
    subtitle: "Modern Weather Forecast App",
    description: "A sleek weather forecasting application featuring real-time data, city search, and location-based updates with a clean, responsive interface.",
    tech: ["React Native", "Expo", "Weather API", "TypeScript"],
    featured: false,
    imageHint: "weather application mobile"
  },
  {
    title: "Aura Messenger",
    subtitle: "Real-Time Chat Application",
    description: "A modern messaging application focused on real-time communication with a clean user interface and secure messaging capabilities.",
    tech: ["React", "Firebase", "WebSockets", "Tailwind CSS"],
    featured: false,
    imageHint: "chat application interface"
  },
  {
    title: "Daily To-Do List",
    subtitle: "Productivity Management Tool",
    description: "A feature-rich task management application designed to help users organize their daily work and increase productivity.",
    tech: ["Next.js", "React", "Firebase", "Cloud Firestore"],
    featured: false,
    imageHint: "productivity app tasks"
  }
];
