import { LucideIcon, Layout, ClipboardList, Users, Clock, Truck, ShieldCheck, Database, PenTool, Box, ScrollText, Layers } from 'lucide-react';

export interface Screenshot {
  id: string;
  title: string;
  description?: string;
  chapter: string;
  path: string;
  category: string;
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
    screenshotCategories: ["ERP Overview", "Employee Management", "QR Attendance", "Orders & Jobs", "Approvals", "Manufacturing", "Accounts & Payroll", "Inventory", "Tracking"],
    screenshots: [
      { id: "mpp-1", title: "Main ERP Dashboard", category: "ERP Overview", description: "Centralized overview of all business metrics and module access.", chapter: "ERP Overview", path: "/projects/Dashboard_1.png" },
      { id: "mpp-2", title: "Order Entry Interface", category: "Orders & Jobs", description: "Initial stage of capturing order details for production.", chapter: "Customer Orders & Job Creation", path: "/projects/Punch%20Order_2.png" },
      { id: "mpp-3", title: "Orders Overview", category: "Orders & Jobs", description: "Comprehensive list of all active and historical orders.", chapter: "Customer Orders & Job Creation", path: "/projects/Punch%20order%20-%20All%20Orders_3.png" },
      { id: "mpp-4", title: "Designers Portal", category: "Approvals", description: "Dedicated workspace for design teams and artwork management.", chapter: "Job Approval & Design Workflow", path: "/projects/Designers%20Portal_4.png" },
      { id: "mpp-5", title: "Job Approval Stage", category: "Approvals", description: "Formalized check-points for design and production readiness.", chapter: "Job Approval & Design Workflow", path: "/projects/Job%20Approval_5.png" },
      { id: "mpp-6", title: "Job Card Queue", category: "Orders & Jobs", description: "Real-time queue of jobs awaiting technical instruction generation.", chapter: "Customer Orders & Job Creation", path: "/projects/Job%20Card%20Queue_6.png" },
      { id: "mpp-7", title: "Detailed Job List", category: "Orders & Jobs", description: "Full tracking of all production jobs within the system.", chapter: "Customer Orders & Job Creation", path: "/projects/Job%20List_7.png" },
      { id: "mpp-8", title: "Create New Job Card", category: "Orders & Jobs", description: "Converting customer requirements into production floor instructions.", chapter: "Customer Orders & Job Creation", path: "/projects/Create%20Job%20Card_8.png" },
      { id: "mpp-9", title: "Purchase Queue", category: "Manufacturing", description: "Managing raw material procurement for active production jobs.", chapter: "Manufacturing & Production Pipeline", path: "/projects/Purchase%20Queue_9.png" },
      { id: "mpp-10", title: "Job Analytics Dashboard", category: "ERP Overview", description: "Visual collage representing diverse job statuses and analytics.", chapter: "ERP Overview", path: "/projects/Job%20Dashboard%20Collage_10.png" },
      { id: "mpp-11", title: "Production Pipeline", category: "Manufacturing", description: "Tracking manufacturing progress across specialized units.", chapter: "Manufacturing & Production Pipeline", path: "/projects/Production%20Pipeline_11.png" },
      { id: "mpp-12", title: "Payroll Configuration", category: "Accounts & Payroll", description: "Administrative settings for salary, bonus, and deductions.", chapter: "Accounts, Payroll & Administration", path: "/projects/Payroll%20-%20Settings_12.png" },
      { id: "mpp-13", title: "Employee Directory", category: "Employee Management", description: "Centralized record of all personnel within the organization.", chapter: "Employee Management & Access Control", path: "/projects/Payroll%20-%20Employees_13.png" },
      { id: "mpp-14", title: "Add New Employee", category: "Employee Management", description: "Onboarding interface for new staff and worker accounts.", chapter: "Employee Management & Access Control", path: "/projects/Payroll%20-%20Add%20Employees_14.png" },
      { id: "mpp-15", title: "QR Employee ID Generation", category: "QR Attendance", description: "Automated generation of secure QR codes for attendance tracking.", chapter: "QR-Based Employee Attendance System", path: "/projects/Payroll%20-%20Employees%20ID%20Card_15.png" },
      { id: "mpp-16", title: "Advance History Tracking", category: "Accounts & Payroll", description: "Managing employee salary advances and repayment records.", chapter: "Accounts, Payroll & Administration", path: "/projects/Payroll%20-%20Employees%20-%20Advance%20History_16.png" },
      { id: "mpp-17", title: "Employee Leave Requests", category: "Employee Management", description: "Workflow for managing leave applications and approvals.", chapter: "Employee Management & Access Control", path: "/projects/Employee%20Requests%20Collage_17.png" },
      { id: "mpp-18", title: "Payroll Summary", category: "Accounts & Payroll", description: "Overview of monthly payroll cycles and payouts.", chapter: "Accounts, Payroll & Administration", path: "/projects/Payrolls%20-%20Collage_18.png" },
      { id: "mpp-19", title: "Employee Personal Payroll", category: "Accounts & Payroll", description: "Individual salary slip and history view for employees.", chapter: "Accounts, Payroll & Administration", path: "/projects/Payroll%20-%20My%20Payroll_19.png" },
      { id: "mpp-20", title: "Inventory Management", category: "Inventory", description: "Real-time tracking of stock levels and material movement.", chapter: "Manufacturing & Production Pipeline", path: "/projects/Inventory_20.png" },
      { id: "mpp-21", title: "Financial Accounts Overview", category: "Accounts & Payroll", description: "Consolidated view of business accounts and transactions.", chapter: "Accounts, Payroll & Administration", path: "/projects/Accounts_21.png" },
      { id: "mpp-22", title: "System User Management", category: "Employee Management", description: "Controlling system access and role assignment for users.", chapter: "Employee Management & Access Control", path: "/projects/Admin%20-%20User%20Management_22.png" }
    ]
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
    screenshots: [
      { id: "kb-1", title: "Admin Overview Dashboard", category: "Admin", chapter: "ERP Overview", path: "/projects/kb-print-hub/KBPH_1.png", description: "Central administrative dashboard for business-wide metrics." },
      { id: "kb-2", title: "Order Builder Interface", category: "Order Builder", chapter: "Orders & Jobs", path: "/projects/kb-print-hub/KBPH_2.png", description: "Technical specification and order building module." },
      { id: "kb-3", title: "Design Management Portal", category: "Designer", chapter: "Job Approval & Design Workflow", path: "/projects/kb-print-hub/KBPH_3.png", description: "Coordination hub for designers and artwork approvals." },
      { id: "kb-4", title: "Kappa Production Unit", category: "Kappa/Paper/Screen", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_4.png", description: "Specialized dashboard for the Kappa processing department." },
      { id: "kb-5", title: "Paper Processing Dashboard", category: "Kappa/Paper/Screen", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_5.png", description: "Workflow management for the paper processing unit." },
      { id: "kb-6", title: "Screen Printing Dashboard", category: "Kappa/Paper/Screen", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_6.png", description: "Real-time tracking for the screen printing department." },
      { id: "kb-7", title: "Jar Management Dashboard", category: "Production Tracking", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_7.png", description: "Inventory and production tracking for jar components." },
      { id: "kb-8", title: "Dispatch Control Center", category: "Dispatch", chapter: "Final Order Tracking", path: "/projects/kb-print-hub/KBPH_8.png", description: "Logistics and shipping management dashboard." },
      { id: "kb-9", title: "Stock & Inventory Control", category: "Inventory", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_9.png", description: "Real-time stock level monitoring and raw material tracking." },
      { id: "kb-10", title: "Production Pipeline Overview", category: "Production Tracking", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_10.png", description: "High-level overview of the entire manufacturing pipeline." },
      { id: "kb-11", title: "Automated Job Card Generation", category: "Admin", chapter: "Orders & Jobs", path: "/projects/kb-print-hub/KBPH_11.png", description: "System-generated job cards for production floor instructions." },
      { id: "kb-12", title: "User Role Management", category: "Admin", chapter: "Employee Management & Access Control", path: "/projects/kb-print-hub/KBPH_12.png", description: "Configuring role-based access for system users." },
      { id: "kb-13", title: "Inventory Audit Trail", category: "Inventory", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_13.png", description: "Detailed logs of inventory movement and adjustments." },
      { id: "kb-14", title: "Cross-Departmental Sync", category: "Production Tracking", chapter: "Manufacturing & Production Pipeline", path: "/projects/kb-print-hub/KBPH_14.png", description: "Visualizing communication between production units." },
      { id: "kb-15", title: "Order Lifecycle Tracking", category: "Order Builder", chapter: "Orders & Jobs", path: "/projects/kb-print-hub/KBPH_15.png", description: "Monitoring an order's progress through all business stages." },
      { id: "kb-16", title: "Business Intelligence Analytics", category: "Admin", chapter: "ERP Overview", path: "/projects/kb-print-hub/KBPH_16.png", description: "Analytical views of business performance and production efficiency." }
    ]
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
    screenshots: [] 
  }
};
