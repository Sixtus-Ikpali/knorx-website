import type { Metadata } from 'next';
import Link from 'next/link';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../content';
import { pageMetadata } from '../metadata';

export const metadata: Metadata = pageMetadata(
  'Selected Work | KNORX Technologies',
  'Explore KNORX projects across operations, education, and digital healthcare, with production and development status clearly identified.',
  '/work',
);

export default function WorkPage() {
  return <main id="main-content">
    <header className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow eyebrow-light">Work / Selected projects</p><h1>Systems built for real problems.</h1></div><p>From operational systems already running in production to new digital products being engineered from the ground up, our work starts with the problem and ends with purposeful technology.</p></div></header>
    <section className="section section-work" aria-labelledby="projects-title"><div className="container"><div className="section-head"><div><p className="eyebrow">The work</p><h2 id="projects-title">Selected projects</h2></div><p>Status is shown for each project so work in development is clearly separate from live systems.</p></div><div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}</div></div></section>
    <section className="contact-band"><div className="container contact-band-inner"><div><p className="eyebrow eyebrow-light">Your next system</p><h2>Let&apos;s build what comes next.</h2><p>Tell us what your organization is trying to solve.</p></div><Link href="/contact" className="button button-white">Discuss a Project <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
