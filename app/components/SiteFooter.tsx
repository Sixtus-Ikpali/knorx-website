import Image from 'next/image';
import Link from 'next/link';
import { serviceCatalog } from '../services';

export default function SiteFooter({ year }: { year: number }) {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <Link href="/" className="brand" aria-label="KNORX Technologies home">
            <Image src="/logo.png" alt="" width={54} height={44} />
            <span className="brand-type"><strong>KNORX</strong><span>TECHNOLOGIES</span></span>
          </Link>
          <p>Strategic thinking. Disciplined engineering. Technology that works in the real world.</p>
        </div>
        <div className="footer-column">
          <h2>Services</h2>
          {serviceCatalog.map((service) => <Link key={service.title} href="/services">{service.title}</Link>)}
        </div>
        <div className="footer-column">
          <h2>Company</h2>
          <Link href="/work">Work</Link>
          <Link href="/approach">Approach</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
        </div>
        <div className="footer-column">
          <h2>Start a conversation</h2>
          <a href="mailto:helloknorx@gmail.com">helloknorx@gmail.com</a>
          <Link href="/contact" className="footer-project-link">Discuss a Project <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <div className="container footer-bottom"><span>© {year} KNORX Technologies. All rights reserved.</span><span>Remote-first by design.</span></div>
    </footer>
  );
}
