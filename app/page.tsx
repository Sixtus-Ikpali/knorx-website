import Link from 'next/link';
import ProjectCard from './components/ProjectCard';
import WorkflowVisualization from './components/WorkflowVisualization';
import { audiences, deliveryStages, principles, projects } from './content';
import { serviceCatalog } from './services';

export default function HomePage() {
  return (
    <main id="main-content">
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow eyebrow-light">Technology consultancy & engineering</p>
            <h1>From Complexity to <span>Working Systems.</span></h1>
            <p className="hero-lead">KNORX Technologies helps startups, businesses, and institutions turn ambitious ideas and operational challenges into scalable technology systems.</p>
            <div className="action-row"><Link href="/contact" className="button button-primary">Discuss a Project <span aria-hidden="true">↗</span></Link><Link href="/work" className="button button-outline-light">Explore Our Work <span aria-hidden="true">↗</span></Link></div>
          </div>
          <WorkflowVisualization />
        </div>
        <div className="container hero-bottom"><span>Knowledge-driven execution</span><span>Remote-first by design</span></div>
      </section>

      <section id="who-we-help" className="section section-cream" aria-labelledby="audience-title">
        <div className="container split-intro">
          <div className="section-intro"><p className="eyebrow">01 / Who we help</p><h2 id="audience-title">Technology built around the problem.</h2><p>Whether you&apos;re bringing a new product to market, replacing manual processes, or modernizing critical operations, we start by understanding what the business needs to achieve.</p></div>
          <div className="audience-list">{audiences.map((audience, index) => <div className="audience-row" key={audience.title}><span className="row-index">0{index + 1}</span><div><h3>{audience.title}</h3><p>{audience.description}</p></div></div>)}</div>
        </div>
      </section>

      <section id="services" className="section section-white" aria-labelledby="services-title">
        <div className="container">
          <div className="section-head"><div><p className="eyebrow">02 / Services</p><h2 id="services-title">What We Do</h2></div><p>We combine strategic thinking with disciplined engineering to help organizations build, digitize, modernize, and scale.</p></div>
          <div className="service-grid">{serviceCatalog.map((service, index) => <article className="service-item" key={service.title}><span className="row-index">0{index + 1} / 04</span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
          <Link href="/services" className="text-link">Explore Our Services <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section id="work" className="section section-work" aria-labelledby="work-title">
        <div className="container">
          <div className="section-head"><div><p className="eyebrow">03 / Selected work</p><h2 id="work-title">Systems built for real problems.</h2></div><p>From operational systems already running in production to new digital products being engineered from the ground up, our work starts with the problem and ends with purposeful technology.</p></div>
          <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.slug} project={project} featured={index === 0} />)}</div>
          <Link href="/work" className="text-link">Explore Our Work <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <section id="about" className="section section-dark" aria-labelledby="why-title">
        <div className="container">
          <div className="section-head"><div><p className="eyebrow eyebrow-light">04 / Why KNORX</p><h2 id="why-title">Built around your business. <em>Engineered for what comes next.</em></h2></div><p>Business context shapes the work. Engineering discipline carries it into a system people can use and extend.</p></div>
          <div className="principle-grid">{principles.map((principle, index) => <article key={principle.title} className="principle"><span>0{index + 1}</span><h3>{principle.title}</h3><p>{principle.description}</p></article>)}</div>
        </div>
      </section>

      <section id="approach" className="section section-cream" aria-labelledby="approach-title">
        <div className="container approach-preview">
          <div className="section-intro"><p className="eyebrow">05 / Approach</p><h2 id="approach-title">Clarity before code. Progress through delivery.</h2><p>We start with the business problem, users, workflows, constraints, and expected outcome. Then we turn that understanding into architecture, engineering, deployment, and iteration.</p><Link href="/approach" className="text-link">Explore Our Approach <span aria-hidden="true">↗</span></Link></div>
          <ol className="stage-preview">{deliveryStages.map((stage, index) => <li key={stage.title}><span>0{index + 1}</span><strong>{stage.title}</strong></li>)}</ol>
        </div>
      </section>

      <section id="contact" className="contact-band" aria-labelledby="contact-title"><div className="container contact-band-inner"><div><p className="eyebrow eyebrow-light">Start the conversation</p><h2 id="contact-title">Let&apos;s build what comes next.</h2><p>Tell us about the challenge, the idea, or the system you need to move forward.</p></div><Link href="/contact" className="button button-white">Discuss a Project <span aria-hidden="true">↗</span></Link></div></section>
    </main>
  );
}
