import type { Metadata } from 'next';
import ContactForm from '../ContactForm';
import { pageMetadata } from '../metadata';

export const metadata: Metadata = pageMetadata(
  'Contact KNORX Technologies',
  'Discuss a digital platform, application, enterprise system, or technology challenge with KNORX Technologies.',
  '/contact',
);

export default function ContactPage() {
  return <main id="main-content">
    <header className="page-hero page-hero-contact"><div className="container"><p className="eyebrow eyebrow-light">Contact / Start a conversation</p><h1>Let&apos;s build what comes next.</h1><p>Tell us what you&apos;re building or where you&apos;re stuck. We&apos;ll review your message and follow up by email.</p></div></header>
    <section className="section section-cream" aria-label="Contact KNORX"><div className="container contact-page-grid"><div className="contact-aside"><p className="eyebrow">Discuss a Project</p><h2>Start with your challenge.</h2><p>Share the problem, your goals, and any context that helps us understand the work.</p><div className="contact-email-block"><span>Email us directly</span><a href="mailto:helloknorx@gmail.com">helloknorx@gmail.com</a></div></div><div className="contact-form-panel"><ContactForm /></div></div></section>
  </main>;
}
