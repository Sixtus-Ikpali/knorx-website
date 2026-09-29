import type { Metadata } from 'next';
import Link from 'next/link';
import { deliveryStages } from '../content';
import { pageMetadata } from '../metadata';

export const metadata: Metadata = pageMetadata(
  'Our Approach | KNORX Technologies',
  'Discover, define, design, build, deploy, and evolve: the KNORX delivery model for practical technology systems.',
  '/approach',
);

export default function ApproachPage() {
  return <main id="main-content">
    <header className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow eyebrow-light">Approach / How we work</p><h1>Clarity before code. Discipline through delivery.</h1></div><p>We begin by understanding the business problem, users, workflows, constraints, and expected outcome. That understanding guides architecture, engineering, deployment, and iteration.</p></div></header>
    <section className="section section-cream" aria-labelledby="process-title"><div className="container"><div className="section-head"><div><p className="eyebrow">Delivery model</p><h2 id="process-title">Discover → Define → Design → Build → Deploy → Evolve</h2></div><p>Each stage gives the work a clear purpose and keeps decisions connected to the outcome.</p></div><ol className="stage-list">{deliveryStages.map((stage, index) => <li key={stage.title}><span className="stage-number">0{index + 1}</span><h3>{stage.title}</h3><p>{stage.description}</p></li>)}</ol></div></section>
    <section className="section section-white" aria-labelledby="remote-title"><div className="container remote-grid"><div><p className="eyebrow">How we operate</p><h2 id="remote-title">Remote by Design</h2></div><div><p className="lead-copy">KNORX is remote-first by design.</p><p>Our operating model is built around clear ownership, documented decisions, structured collaboration, and transparent delivery—allowing us to work effectively with organizations regardless of geography.</p><Link href="/contact" className="text-link">Discuss a Project <span aria-hidden="true">↗</span></Link></div></div></section>
  </main>;
}
