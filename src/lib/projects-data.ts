import { LucideIcon, Layout, ClipboardList, Users, Clock, Truck, ShieldCheck, Database, PenTool, Box, ScrollText, Layers } from 'lucide-react';

export interface Screenshot {
  id: string;
  title: string;
  description?: string;
  category: string;
  path: string;
}

export interface ProjectModule {
  title: string;
  icon: LucideIcon;
  description: string;
}

export interface CaseStudyData {
  slug: string;
  title: string;
  category: string;
  status: string;
  period: string;
  description: string;
  overview: string;
  businessProblem: string;
  businessSolution: string;
  verifiedTech: string[];
  modules: ProjectModule[];
  screenshotCategories: string[];
  screenshots: Screenshot[];
}

export const developmentSteps = [
  { id: "01", title: "Client Requirement Gathering" },
  { id: "02", title: "Business Workflow Analysis" },
  { id: "03", title: "Application Architecture & Planning" },
  { id: "04", title: "UI/UX Design & Frontend Development" },
  { id: "05", title: "Backend & Database Development" },
  { id: "06", title: "Authentication & Role-Based Access Control" },
  { id: "07", title: "Testing & Debugging" },
  { id: "08", title: "Production Deployment" },
  { id: "09", title: "Ongoing Maintenance & Enhancements" }
];

export const projectsData: Record<string, CaseStudyData> = {
  "macro-print-pack": {
    slug: "macro-print-pack",
    title: "MACRO PRINT PACK",
    category: "Printing & Packaging ERP",
    status: "Live Business Application",
    period: "July 2025 – Present",
    description: "An end-to-end printing and packaging business management application independently developed to streamline order-to-dispatch operations.",
    overview: "This ERP was built from the ground up to solve the complexities of the printing and packaging industry. It manages everything from initial order entry to production tracking and final dispatch.",
    businessProblem: "The client relied on manual paper-based tracking, leading to production delays, lost order information, and difficulty in managing a large workforce across different departments.",
    businessSolution: "A centralized ERP featuring 7-8 role-based dashboards, QR-code employee IDs, and real-time production tracking. It currently handles over 1,000 orders with high performance and reliability.",
    verifiedTech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Auth"],
    modules: [
      { title: "Role-Based Dashboards", icon: Layout, description: "Dedicated views for Admin, Designer, Accountant, and operational teams." },
      { title: "Order Management", icon: ClipboardList, description: "Complete lifecycle tracking from order creation to dispatch." },
      { title: "Employee & Attendance", icon: Users, description: "QR-code ID cards and punch-in/out system for workforce management." },
      { title: "Leave Management", icon: Clock, description: "Paid/unpaid leave applications and approval workflows." },
      { title: "Production Workflow", icon: Layers, description: "Department-wise tracking of manufacturing progress." },
      { title: "Dispatch Tracking", icon: Truck, description: "Final delivery management and logistics logging." }
    ],
    screenshotCategories: ["Dashboards", "Orders", "Production", "Employee Management", "Attendance", "Leave Management", "Dispatch"],
    screenshots: [] // To be populated by user
  },
  "kb-print-hub": {
    slug: "kb-print-hub",
    title: "KB PRINT HUB",
    category: "ERP & Business Management",
    status: "Live Business Application",
    period: "July 2025 – Present",
    description: "A production-grade printing management platform independently developed to manage complete business workflows.",
    overview: "KB Print Hub is a sophisticated multi-departmental application designed to coordinate production across specialized units like Kappa, Screen, and Paper processing.",
    businessProblem: "Coordination between 9 different departments was highly fragmented. Tracking stock levels and production stage progress was impossible in real-time.",
    businessSolution: "Implemented 9 role-based dashboards with strict approval-based access control. Real-time Firestore synchronization allows departments to see exactly which jobs are pending for them.",
    verifiedTech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Firebase", "Firestore", "Cloud Storage"],
    modules: [
      { title: "9 Role-Based Dashboards", icon: Layout, description: "Admin, Order Builder, Designer, Kappa, Paper, Screen, Jar, Dispatch, and Stock." },
      { title: "Real-Time Tracking", icon: Clock, description: "Department-wise progress monitoring using Firestore live updates." },
      { title: "Inventory Management", icon: Box, description: "Stock lifecycle tracking for raw materials and finished goods." },
      { title: "Job Card Generation", icon: ScrollText, description: "Automatic generation of production documents and instructions." },
      { title: "Approval Workflows", icon: ShieldCheck, description: "Admin-controlled user verification and operation approvals." }
    ],
    screenshotCategories: ["Admin", "Order Builder", "Designer", "Kappa/Paper/Screen", "Inventory", "Production Tracking", "Dispatch"],
    screenshots: [] // To be populated by user
  },
  "anand-fabrics": {
    slug: "anand-fabrics",
    title: "ANAND FABRICS",
    category: "Textile Industry Application",
    status: "Live Business Application",
    period: "Verified Implementation",
    description: "A business application developed from client requirements to address operational needs within the textile industry.",
    overview: "This application was tailored to the specific operational requirements of the textile industry, focusing on translating complex physical workflows into a streamlined digital experience.",
    businessProblem: "Inefficiencies in traditional textile production monitoring and the need for a reliable system to manage client requirements and testing phases.",
    businessSolution: "A custom-built application handling the end-to-end development lifecycle, from requirement analysis to deployment and maintenance.",
    verifiedTech: ["React", "TypeScript", "Tailwind CSS"],
    modules: [
      { title: "Operational Management", icon: ClipboardList, description: "Digitization of core textile business processes." },
      { title: "Requirement Analysis", icon: PenTool, description: "Direct mapping of client business needs to software features." },
      { title: "Production Monitoring", icon: Layers, description: "Visibility into textile manufacturing stages." }
    ],
    screenshotCategories: ["General", "Operations", "Dashboards"],
    screenshots: [] // To be populated by user
  }
};