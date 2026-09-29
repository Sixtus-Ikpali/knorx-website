import type { projects } from '../content';

type Project = typeof projects[number];

export default function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'project-card-featured' : ''}`}>
      <div className={`project-visual project-visual-${project.slug}`} role="img" aria-label={`Illustrative system flow for ${project.name}; not a product screenshot`}>
        <div className="visual-topline"><span>KNORX / SYSTEM REPRESENTATION</span><span>0{project.flow.length}</span></div>
        <div className="visual-track" aria-hidden="true">
          {project.flow.map((step, index) => <div className="visual-node" key={step}><span>{String(index + 1).padStart(2, '0')}</span><strong>{step}</strong></div>)}
        </div>
        <p className="visual-disclaimer">Illustrative workflow · not a product screenshot</p>
      </div>
      <div className="project-copy">
        <div className="project-topline"><span className={`status ${project.status === 'In Development' ? 'status-development' : 'status-live'}`}>{project.status}</span><span>{project.industry}</span></div>
        <h3>{project.name}</h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.description}</p>
        <dl className="project-meta"><div><dt>Engagement</dt><dd>{project.engagement}</dd></div><div><dt>Services</dt><dd>{project.services.join(' · ')}</dd></div></dl>
      </div>
    </article>
  );
}
