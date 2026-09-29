import type { Metadata } from 'next';
import Link from 'next/link';
import { pageMetadata } from '../metadata';
import { serviceDetails } from '../services';

export const metadata: Metadata = pageMetadata(
  'Services | KNORX Technologies',
  'Digital platforms, application engineering, enterprise systems, and technology consulting shaped around business needs.',
  '/services',
);

export default function ServicesPage() {
  return <main id="main-content">
    <header className="page-hero"><div className="container page-hero-grid"><div><p className="eyebrow eyebrow-light">Services / What we do</p><h1>Technology shaped by the work it needs to do.</h1></div><p>We combine strategic thinking with disciplined engineering to help organizations build, digitize, modernize, and scale.</p></div></header>
    <section className="section section-cream" aria-labelledby="services-list-title"><div className="container"><h2 id="services-list-title" className="visually-hidden">KNORX services</h2><div className="service-detail-list">{serviceDetails.map((service, index) => <article className="service-detail" key={service.title}><div className="service-detail-heading"><span className="eyebrow">0{index + 1} / 04</span><h3>{service.title}</h3><p>{service.description}</p></div><div className="service-detail-body"><div><h4>Problem</h4><p>{service.problem}</p></div><div><h4>What KNORX Does</h4><p>{service.work}</p></div><div><h4>Typical Solutions</h4><ul>{service.solutions.map((solution) => <li key={solution}>{solution}</li>)}</ul></div><div><h4>Business Outcome</h4><p>{service.outcome}</p></div></div></article>)}</div></div></section>
    <section className="contact-band"><div className="container contact-band-inner"><div><p className="eyebrow eyebrow-light">Talk through your challenge</p><h2>Start with the problem.</h2><p>We can help define the right technology response.</p></div><Link href="/contact" className="button button-white">Discuss a Project <span aria-hidden="true">↗</span></Link></div></section>
  </main>;
}
