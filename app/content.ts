import { serviceCatalog } from './services';

export const audiences = [
  { title: 'Product Builders', description: 'Turn ideas and requirements into thoughtfully engineered digital products.' },
  { title: 'Growing Businesses', description: 'Digitize processes and build systems that can support the next stage of growth.' },
  { title: 'Established Organizations', description: 'Modernize workflows, replace fragmented tools, and improve operational visibility.' },
  { title: 'Institutions & NGOs', description: 'Build practical digital systems for programs, people, reporting, and operations.' },
  { title: 'Enterprises', description: 'Design and engineer dependable systems around complex operational requirements.' },
] as const;

export const principles = [
  { title: 'Client First', description: 'We start with your problem, users, constraints, and desired outcome before deciding what technology should be built.' },
  { title: 'Speed With Discipline', description: 'We use modern engineering practices and intelligent tooling to move quickly without treating speed as a substitute for quality.' },
  { title: 'Business-Led Engineering', description: 'Technology decisions are shaped by the outcome the organization needs—not by trends or unnecessary features.' },
  { title: 'Built to Evolve', description: 'We engineer with change in mind, creating systems that can adapt as requirements, operations, and organizations grow.' },
] as const;

export const deliveryStages = [
  { title: 'Discover', description: 'Understand the business problem, people, workflows, constraints, and expected outcome.' },
  { title: 'Define', description: 'Agree on priorities, scope, and the measures that will guide the work.' },
  { title: 'Design', description: 'Shape the experience, system structure, and delivery plan around those priorities.' },
  { title: 'Build', description: 'Engineer and review the system in usable increments with clear ownership.' },
  { title: 'Deploy', description: 'Prepare the system for real use, verify critical paths, and support release.' },
  { title: 'Evolve', description: 'Learn from use and refine the system as needs and operations change.' },
] as const;

export const projects = [
  {
    slug: 'dredgops',
    name: 'DredgOps',
    subtitle: 'Dredging Operations & Revenue Assurance Platform',
    description: 'A digital operations platform built to transform fragmented truck movement processes into a controlled workflow spanning loading, offloading, waybill generation, payment tracking, exceptions, and operational reporting.',
    industry: 'Dredging & Haulage',
    engagement: 'Operations Digitalization',
    status: 'Live in Production',
    services: [serviceCatalog[1].title, serviceCatalog[2].title, serviceCatalog[3].title],
    flow: ['Loading', 'Offloading', 'Waybills', 'Payment tracking', 'Reporting'],
  },
  {
    slug: 'geoattend',
    name: 'GeoAttend',
    subtitle: 'Geofenced Staff Attendance & Workforce Tracking System',
    description: 'A location-aware attendance system designed to replace manual staff attendance processes and give school administrators better visibility into workforce attendance and movement.',
    industry: 'Education',
    engagement: 'Process Digitalization',
    status: 'Live in Production',
    services: [serviceCatalog[1].title, serviceCatalog[2].title, serviceCatalog[3].title],
    flow: ['Location-aware check', 'Attendance record', 'Administrator visibility'],
  },
  {
    slug: 'axiora-health',
    name: 'Axiora Health',
    subtitle: 'Digital Healthcare & Telemedicine Platform',
    description: 'A digital healthcare platform being engineered around remote healthcare delivery, connecting patient and practitioner workflows through a structured digital experience.',
    industry: 'HealthTech',
    engagement: 'Product Engineering',
    status: 'In Development',
    services: [serviceCatalog[1].title, serviceCatalog[0].title, serviceCatalog[3].title],
    flow: ['Patient workflow', 'Structured experience', 'Practitioner workflow'],
  },
] as const;
