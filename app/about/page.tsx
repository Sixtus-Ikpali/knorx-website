import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '../metadata';
import { principles } from '../content';

export const metadata: Metadata = pageMetadata(
  'About KNORX Technologies',
  'KNORX Technologies combines strategic thinking and disciplined engineering to turn ideas and operational challenges into working systems.',
  '/about',
);

export default function AboutPage() {
  return <main id="main-content">
    <header className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow eyebrow-light">About / KNORX Technologies</p><h1>Technology should move businesses forward—not add more complexity.</h1></div><p>Understand the problem deeply. Then execute.</p></div></header>
    <section className="section section-cream" aria-labelledby="story-title"><div className="container story-grid"><div><p className="eyebrow">Our point of view</p><h2 id="story-title">From complexity to working systems.</h2></div><div className="story-copy"><p>KNORX Technologies was built around a simple idea: understand the problem deeply, then execute.</p><p>We work with startups, businesses, and institutions to turn product ideas, manual processes, and operational challenges into technology systems that work in the real world.</p><p>Our approach combines strategic thinking with disciplined engineering. We put the client and the business problem first, move quickly from definition to execution, and build with the future in mind.</p><p>As a remote-first technology company, we operate through clear ownership, structured collaboration, and transparent delivery—allowing us to work effectively with organizations wherever they operate.</p><p>From digital platforms and applications to enterprise systems and technology consulting, our objective remains the same: <strong>turn complexity into working systems.</strong></p></div></div></section>
    <section className="section section-dark" aria-labelledby="principles-title"><div className="container"><div className="section-head"><div><p className="eyebrow eyebrow-light">What guides us</p><h2 id="principles-title">How we think about the work.</h2></div></div><div className="principle-grid">{principles.map((principle, index) => <article key={principle.title} className="principle"><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}</div></div></section>
    <section className="contact-band"><div className="container contact-band-inner"><div><p className="eyebrow eyebrow-light">Start a conversation</p><h2>Let&apos;s build what comes next.</h2></div><Link href="/contact" className="button button-white">Discuss a Project <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
