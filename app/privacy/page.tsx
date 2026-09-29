import type { Metadata } from 'next';
import { pageMetadata } from '../metadata';

export const metadata: Metadata = pageMetadata(
  'Contact Privacy | KNORX Technologies',
  'How KNORX Technologies handles information submitted through the website contact form.',
  '/privacy',
);

export default function PrivacyPage() {
  return <main id="main-content">
    <header className="page-hero"><div className="container"><p className="eyebrow eyebrow-light">Privacy / Contact details</p><h1>Contact privacy</h1></div></header>
    <section className="section section-cream"><div className="container privacy-content">
      <p>When you use the contact form, KNORX receives your name, email address and message. You may also provide your company and a service of interest.</p>
      <p>The form sends this information through our email provider, Resend, to the KNORX inbox configured for website inquiries so the team can review and respond to your message.</p>
      <p>Email and hosting providers may process the information needed to deliver and operate this service. For questions about your submitted information, contact <a href="mailto:helloknorx@gmail.com">helloknorx@gmail.com</a>.</p>
    </div></section>
  </main>;
}
