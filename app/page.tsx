'use client';

import { useState, FormEvent, useEffect } from 'react';
import {
  Globe, Cpu, Layers, Zap, MessageSquare,
  Code2, Cloud, Menu, X, Database, Lock,
  Settings, ShieldCheck, Loader2, ArrowRight,
  CheckCircle2, Users, Target, TrendingUp,
  MapPin, Mail, Linkedin, Twitter
} from 'lucide-react';
import './knorx.css';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError]   = useState<string>('');
  const [year, setYear]     = useState<number>(2026);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  function handleMobileNav(href: string) {
    setIsMobileMenuOpen(false);
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed');
      setSuccess(true);
      form.reset();
    } catch (err: unknown) {
      setError('Something went wrong. Please try again or email us directly.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>

      {/* ─── HEADER ─── */}
      <header style={styles.header}>
        <div style={styles.nav}>
          <div style={styles.logoContainer}>
            <span style={styles.logoMark}>KNORX</span>
            <span style={styles.logoSub}>TECHNOLOGIES</span>
          </div>

          <div className="desktop-nav" style={styles.navLinks}>
            <a href="#about"    className="nav-link" style={styles.link}>About</a>
            <a href="#services" className="nav-link" style={styles.link}>Services</a>
            <a href="#why-us"   className="nav-link" style={styles.link}>Why Us</a>
            <a href="#contact"  className="btn-primary" style={styles.navButton}>Get Started</a>
          </div>

          <button
            className="mobile-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={styles.hamburgerButton}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* ─── MOBILE MENU ─── */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <a href="#about"    onClick={(e) => { e.preventDefault(); handleMobileNav('#about');    }} style={styles.mobileLink}>About</a>
          <a href="#services" onClick={(e) => { e.preventDefault(); handleMobileNav('#services'); }} style={styles.mobileLink}>Services</a>
          <a href="#why-us"   onClick={(e) => { e.preventDefault(); handleMobileNav('#why-us');   }} style={styles.mobileLink}>Why Us</a>
          <a href="#contact"  onClick={(e) => { e.preventDefault(); handleMobileNav('#contact');  }} style={styles.mobileButton}>Get Started</a>
        </div>
      )}

      {/* ─── HERO ─── */}
      <section style={styles.hero}>
        <div style={styles.heroBadge} className="fade-up fade-up-1">
          Remote-First · Global Delivery
        </div>

        <h1 style={styles.heading} className="fade-up fade-up-1">
          We Build the Digital Systems<br />
          <span style={styles.headingAccent}>Businesses Scale With.</span>
        </h1>

        <p style={styles.subtext} className="fade-up fade-up-2">
          From enterprise platforms to intelligent automation - KNORX designs, engineers,
          and delivers technology that makes operations faster, smarter, and built to last.
        </p>

        <div style={styles.orbitContainer}>
          <div style={styles.centralNode}></div>
          <div style={{ ...styles.orbitNode, animation: 'orbit-inner 5s linear infinite' }}><Code2 size={14} color="#fff" /></div>
          <div style={{ ...styles.orbitNode, animation: 'orbit-inner 5s linear infinite', animationDelay: '-2.5s' }}><Lock size={14} color="#fff" /></div>
          <div style={{ ...styles.orbitNode, animation: 'orbit-mid 9s linear infinite', backgroundColor: 'rgba(58,124,165,0.6)' }}><Globe size={16} color="#fff" /></div>
          <div style={{ ...styles.orbitNode, animation: 'orbit-mid 9s linear infinite', animationDelay: '-4.5s', backgroundColor: 'rgba(58,124,165,0.4)' }}><Database size={16} color="#fff" /></div>
          <div style={{ ...styles.orbitNode, animation: 'orbit-outer 15s linear infinite' }}><Cloud size={18} color="#fff" /></div>
          <div style={{ ...styles.orbitNode, animation: 'orbit-outer 15s linear infinite', animationDelay: '-5s', backgroundColor: 'rgba(58,124,165,0.3)' }}><ShieldCheck size={18} color="#fff" /></div>
          <div style={{ ...styles.orbitNode, animation: 'orbit-outer 15s linear infinite', animationDelay: '-10s', backgroundColor: 'rgba(58,124,165,0.5)' }}><Settings size={18} color="#fff" /></div>
        </div>

        <div style={styles.heroActions} className="fade-up fade-up-3">
          <a href="#contact"  className="btn-primary"   style={styles.heroButton}>Work with Us</a>
          <a href="#services" className="btn-secondary" style={styles.heroSecondaryButton}>View Services</a>
        </div>

        {/* STATS BAR */}
        <div className="stat-grid" style={styles.statsBar}>
          {stats.map((s, i) => (
            <div key={i} style={styles.statItem}>
              <div className="stat-number">{s.value}</div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── ABOUT ─── */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container}>
          <div style={styles.sectionLabel}>Who We Are</div>
          <h2 style={styles.sectionTitle}>Built for the way modern businesses operate</h2>
          <div className="about-grid" style={styles.aboutGrid}>
            <div style={styles.aboutText}>
              <p style={styles.aboutPara}>
                <strong style={{ color: '#f1f5f9' }}>Knorx Technologies</strong> is a remote-first technology solutions provider
                working with growth-stage and mid-size businesses across Africa, Europe, and North America.
                We help organizations design, automate, and optimize their operations using modern, scalable digital systems.
              </p>
              <p style={styles.aboutPara}>
                Our work spans enterprise platforms, intelligent automation, and full-cycle application engineering.
                Every engagement starts with a deep understanding of your operations - and ends with a system
                your team can own, trust, and grow with.
              </p>
              <p style={{ ...styles.aboutPara, marginBottom: 0 }}>
                We specialize in mid-size organizations that need enterprise-grade results without enterprise-grade complexity.
              </p>
            </div>

            <div className="diff-grid" style={styles.diffGrid}>
              {differentiators.map((d, i) => (
                <div key={i} className="diff-card" style={styles.diffCard}>
                  <div style={styles.diffIcon}>{d.icon}</div>
                  <div>
                    <div style={styles.diffTitle}>{d.title}</div>
                    <div style={styles.diffText}>{d.text}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.sectionLabel}>What We Do</div>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <div style={styles.grid}>
            {services.map((s, i) => (
              <div key={i} className="service-card" style={styles.card}>
                <div className="service-icon" style={styles.cardIcon}>{s.icon}</div>
                <h3 style={styles.cardTitle}>{s.title}</h3>
                <ul style={styles.list}>
                  {s.items.map((item, idx) => (
                    <li key={idx} style={styles.listItem}>
                      <CheckCircle2 size={13} style={{ marginRight: '8px', color: '#3a7ca5', flexShrink: 0, marginTop: '2px' }} />
                      {item}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="card-link" style={styles.cardLink}>
                  Talk to us <ArrowRight size={14} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section id="why-us" style={styles.proofSection}>
        <div style={styles.container}>
          <div style={styles.sectionLabel}>Why KNORX</div>
          <h2 style={styles.sectionTitle}>What our clients say</h2>

          <div className="proof-grid" style={styles.proofGrid}>
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card" style={styles.testimonialCard}>
                <span style={styles.quoteIcon}>&ldquo;</span>
                <p style={styles.quoteText}>{t.quote}</p>
                <div style={styles.quoteAuthor}>
                  <div style={styles.authorAvatar}>{t.initials}</div>
                  <div>
                    <div style={styles.authorName}>{t.name}</div>
                    <div style={styles.authorRole}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.trustRow}>
            {trustPoints.map((t, i) => (
              <div key={i} style={styles.trustBadge}>
                <span style={styles.trustIcon}>{t.icon}</span>
                <span>{t.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CONTACT ─── */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <div className="contact-wrapper" style={styles.contactWrapper}>
            <div>
              <div style={styles.sectionLabel}>Get in Touch</div>
              <h2 style={{ ...styles.sectionTitle, marginBottom: '16px' }}>Start a Conversation</h2>
              <p style={styles.contactIntro}>
                Tell us what you&apos;re building or where you&apos;re stuck. We&apos;ll come back to you
                within one business day with a clear path forward.
              </p>
              <div style={styles.contactMeta}>
                <div style={styles.contactMetaItem}>
                  <Mail size={16} style={{ color: '#4a9cc8' }} />
                  <span>hello@knorx.tech</span>
                </div>
                <div style={styles.contactMetaItem}>
                  <MapPin size={16} style={{ color: '#4a9cc8' }} />
                  <span>Remote-first · Nigeria · Global</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} style={styles.form}>
              <div className="form-row" style={styles.formRow}>
                <input name="name"    placeholder="Full Name"    required style={styles.input} />
                <input name="company" placeholder="Company"               style={styles.input} />
              </div>
              <input name="email" type="email" placeholder="Work Email" required style={styles.input} />
              <select name="service" style={{ ...styles.input, color: 'rgba(255,255,255,0.6)' }}>
                <option value="" style={{ background: '#0b1c31' }}>Service of Interest (optional)</option>
                {services.map((s, i) => (
                  <option key={i} value={s.title} style={{ background: '#0b1c31' }}>{s.title}</option>
                ))}
              </select>
              <textarea name="message" placeholder="What are you working on?" required style={styles.textarea} />

              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
                style={{ ...styles.button, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}
              >
                {loading
                  ? <><Loader2 size={18} style={{ animation: 'spin-slow 1s linear infinite' }} /> Sending&hellip;</>
                  : 'Send Message'}
              </button>

              {success && (
                <div style={styles.successMsg}>
                  <CheckCircle2 size={16} /> Message sent - we&apos;ll be in touch shortly.
                </div>
              )}
              {error && (
                <div style={styles.errorMsg}>&#9888; {error}</div>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={styles.footer}>
        <div style={styles.container}>
          <div className="footer-grid" style={styles.footerGrid}>
            <div>
              <div style={styles.footerLogo}>
                <span style={styles.logoMark}>KNORX</span>
                <span style={{ ...styles.logoSub, fontSize: '10px' }}>TECHNOLOGIES</span>
              </div>
              <p style={styles.footerTagline}>
                Knowledge-driven execution for modern businesses.
                Remote-first. Built to scale.
              </p>
              <div style={styles.socialRow}>
                <a
                  href="https://www.linkedin.com/company/knorx/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  style={styles.socialIcon}
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
                <a href="#" className="social-icon" style={styles.socialIcon} aria-label="Twitter">
                  <Twitter size={18} />
                </a>
              </div>
            </div>

            <div>
              <div style={styles.footerHeading}>Navigation</div>
              <div style={styles.footerLinks}>
                <a href="#about"    className="footer-link" style={styles.footerLink}>About</a>
                <a href="#services" className="footer-link" style={styles.footerLink}>Services</a>
                <a href="#why-us"   className="footer-link" style={styles.footerLink}>Why Us</a>
                <a href="#contact"  className="footer-link" style={styles.footerLink}>Contact</a>
              </div>
            </div>

            <div>
              <div style={styles.footerHeading}>Services</div>
              <div style={styles.footerLinks}>
                {services.map((s, i) => (
                  <a key={i} href="#services" className="footer-link" style={styles.footerLink}>{s.title}</a>
                ))}
              </div>
            </div>

            <div>
              <div style={styles.footerHeading}>Contact</div>
              <div style={styles.footerLinks}>
                <span style={styles.footerLink}>hello@knorx.tech</span>
                <span style={styles.footerLink}>Remote-first · Nigeria</span>
                <span style={styles.footerLink}>Global Delivery</span>
              </div>
            </div>
          </div>

          <div style={styles.footerBottom}>
            <span>&copy; {year} KNORX Technologies. All rights reserved.</span>
            <div style={styles.footerBottomLinks}>
              <a href="#" className="footer-link" style={{ ...styles.footerLink, fontSize: '12px' }}>Privacy Policy</a>
              <a href="#" className="footer-link" style={{ ...styles.footerLink, fontSize: '12px' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ─── DATA ─── */

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '3',   label: 'Continents Served' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '7+',  label: 'Years of Expertise' },
];

const differentiators = [
  {
    icon: <Target size={22} color="#4a9cc8" />,
    title: 'Outcome-Focused',
    text: 'We measure success by the results you see, not the deliverables we ship.',
  },
  {
    icon: <Users size={22} color="#4a9cc8" />,
    title: 'Embedded Partnership',
    text: "We work as an extension of your team - not a vendor at arm's length.",
  },
  {
    icon: <ShieldCheck size={22} color="#4a9cc8" />,
    title: 'Security-First',
    text: 'Every system is architected with compliance and data security built in from day one.',
  },
  {
    icon: <TrendingUp size={22} color="#4a9cc8" />,
    title: 'Built to Scale',
    text: 'We design for where your business is going - not just where it is today.',
  },
];

const services = [
  {
    title: 'Digital Platforms',
    icon: <Globe size={36} />,
    items: ['Corporate websites & portals', 'Enterprise web platforms', 'E-commerce systems'],
  },
  {
    title: 'Application Engineering',
    icon: <Cpu size={36} />,
    items: ['Custom web & mobile apps', 'Automation tools', 'SaaS product development'],
  },
  {
    title: 'Enterprise Systems',
    icon: <Layers size={36} />,
    items: ['ERP implementation', 'Workflow automation', 'Intelligent process platforms'],
  },
  {
    title: 'Digital Transformation',
    icon: <Zap size={36} />,
    items: ['Strategy & execution', 'Process reengineering', 'End-to-end automation'],
  },
  {
    title: 'Consulting',
    icon: <MessageSquare size={36} />,
    items: ['Strategic technology advisory', 'Execution frameworks', 'Resource optimization'],
  },
];

const testimonials = [
  {
    quote: 'KNORX delivered a platform that actually matched how our team works. The process was smooth, transparent, and the system has scaled well beyond what we initially planned for.',
    name: 'Amara O.',
    role: 'Head of Operations, FinServ firm · Lagos',
    initials: 'AO',
  },
  {
    quote: "What stood out was how quickly they understood our domain. Within two weeks of kickoff they were already building the right thing. We've continued to expand the engagement.",
    name: 'David M.',
    role: 'CTO, Healthcare startup · London',
    initials: 'DM',
  },
  {
    quote: 'We had a messy legacy system and a tight deadline. KNORX mapped it out, built a clean replacement, and trained our team. Solid execution from start to finish.',
    name: 'Chisom E.',
    role: 'Director of Technology · Abuja',
    initials: 'CE',
  },
];

const trustPoints = [
  { icon: <ShieldCheck size={16} />, text: 'GDPR-aware delivery' },
  { icon: <Globe size={16} />,       text: 'Multi-timezone support' },
  { icon: <Code2 size={16} />,       text: 'Clean, documented code' },
  { icon: <CheckCircle2 size={16}/>, text: 'On-time, on-scope' },
];

/* ─── STYLES ─── */

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    fontFamily: "'DM Sans', system-ui, sans-serif",
    backgroundColor: '#0b1c31',
    color: '#f1f5f9',
    minHeight: '100vh',
  },
  header: {
    padding: '14px 24px',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(11,28,49,0.96)',
    backdropFilter: 'blur(12px)',
    zIndex: 100,
  },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  logoContainer: { display: 'flex', flexDirection: 'column', lineHeight: 1 },
  logoMark: { fontFamily: "'Syne', sans-serif", color: '#4a9cc8', fontWeight: 800, fontSize: '20px', letterSpacing: '2px' },
  logoSub: { color: 'rgba(255,255,255,0.35)', fontSize: '9px', letterSpacing: '3px', fontWeight: 600, marginTop: '2px' },
  navLinks: { display: 'flex', alignItems: 'center' },
  hamburgerButton: { background: 'none', border: 'none', color: '#f1f5f9', cursor: 'pointer', padding: '4px' },
  mobileMenu: {
    position: 'fixed', inset: '68px 0 0 0',
    backgroundColor: '#0b1c31', zIndex: 99,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '28px', paddingTop: '60px',
  },
  mobileLink: { fontSize: '20px', color: '#f1f5f9', textDecoration: 'none', cursor: 'pointer' },
  mobileButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '14px 40px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' },
  link: { color: 'rgba(255,255,255,0.75)', textDecoration: 'none', fontSize: '14px', fontWeight: 500 },
  navButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '8px 18px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600, marginLeft: '8px' },

  hero: {
    padding: '100px 24px 0',
    textAlign: 'center',
    background: 'radial-gradient(ellipse at 50% 30%, #162c46 0%, #0b1c31 70%)',
    display: 'flex', flexDirection: 'column', alignItems: 'center',
  },
  heroBadge: {
    fontSize: '12px', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase',
    color: '#4a9cc8', backgroundColor: 'rgba(58,124,165,0.12)',
    border: '1px solid rgba(58,124,165,0.3)',
    padding: '6px 16px', borderRadius: '100px', marginBottom: '32px',
  },
  heading: {
    fontFamily: "'Syne', sans-serif",
    fontSize: 'clamp(32px, 5.5vw, 58px)',
    fontWeight: 800, maxWidth: '860px', lineHeight: 1.1, margin: '0 0 20px',
  },
  headingAccent: { color: '#4a9cc8' },
  subtext: { fontSize: 'clamp(16px, 2.5vw, 19px)', opacity: 0.7, maxWidth: '640px', lineHeight: 1.7 },
  orbitContainer: {
    position: 'relative', width: '320px', height: '320px',
    display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '40px auto 0',
  },
  centralNode: {
    width: '56px', height: '56px', backgroundColor: '#3a7ca5',
    borderRadius: '50%', zIndex: 10, animation: 'pulse-glow 3s infinite ease-in-out',
  },
  orbitNode: {
    position: 'absolute', width: '34px', height: '34px',
    backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    border: '1px solid rgba(255,255,255,0.2)', zIndex: 5,
  },
  heroActions: { display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center', marginTop: '36px' },
  heroButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '15px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '16px' },
  heroSecondaryButton: { border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '15px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '16px', background: 'transparent' },
  statsBar: {
    display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
    marginTop: '80px', width: '100%', maxWidth: '1200px',
    borderTop: '1px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.06)',
  },
  statItem: { padding: '32px 20px', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.06)' },

  aboutSection: { padding: '100px 24px', backgroundColor: 'rgba(255,255,255,0.02)' },
  aboutGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'start' },
  aboutText: { lineHeight: 1.8 },
  aboutPara: { fontSize: '17px', opacity: 0.8, marginBottom: '20px' },
  diffGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' },
  diffCard: {
    padding: '20px', borderRadius: '10px',
    border: '1px solid rgba(255,255,255,0.07)', backgroundColor: 'rgba(255,255,255,0.03)',
    display: 'flex', gap: '14px', alignItems: 'flex-start',
  },
  diffIcon: { flexShrink: 0, marginTop: '2px' },
  diffTitle: { fontWeight: 700, fontSize: '14px', marginBottom: '6px', color: '#f1f5f9' },
  diffText: { fontSize: '13px', opacity: 0.6, lineHeight: 1.6 },

  section: { padding: '100px 24px' },
  sectionLabel: { fontSize: '12px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#4a9cc8', marginBottom: '12px' },
  sectionTitle: { fontFamily: "'Syne', sans-serif", fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 800, marginBottom: '48px', color: '#f1f5f9' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' },
  card: { padding: '28px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.07)', display: 'flex', flexDirection: 'column' },
  cardIcon: { color: '#3a7ca5', marginBottom: '20px' },
  cardTitle: { color: '#f1f5f9', marginBottom: '16px', fontWeight: 700, fontSize: '17px' },
  list: { listStyleType: 'none', padding: 0, flex: 1, marginBottom: '20px' },
  listItem: { display: 'flex', alignItems: 'flex-start', marginBottom: '10px', fontSize: '14px', opacity: 0.75, lineHeight: 1.5 },
  cardLink: { color: '#4a9cc8', textDecoration: 'none', fontSize: '13px', fontWeight: 600 },

  proofSection: { padding: '100px 24px', backgroundColor: 'rgba(255,255,255,0.02)' },
  proofGrid: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '60px' },
  testimonialCard: { padding: '28px', borderRadius: '14px', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' },
  quoteIcon: { fontSize: '48px', lineHeight: 1, color: '#3a7ca5', fontFamily: 'Georgia, serif', marginBottom: '12px', display: 'block' },
  quoteText: { fontSize: '15px', lineHeight: 1.75, opacity: 0.8, marginBottom: '24px' },
  quoteAuthor: { display: 'flex', alignItems: 'center', gap: '12px' },
  authorAvatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#3a7ca5', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', fontWeight: 700, flexShrink: 0 },
  authorName: { fontWeight: 700, fontSize: '14px' },
  authorRole: { fontSize: '12px', opacity: 0.5, marginTop: '2px' },
  trustRow: { display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' },
  trustBadge: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.03)', fontSize: '13px', color: 'rgba(255,255,255,0.7)' },
  trustIcon: { color: '#4a9cc8', display: 'flex', alignItems: 'center' },

  contactWrapper: { display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '80px', alignItems: 'start', maxWidth: '1000px' },
  contactIntro: { fontSize: '16px', opacity: 0.7, lineHeight: 1.75, marginBottom: '32px' },
  contactMeta: { display: 'flex', flexDirection: 'column', gap: '14px' },
  contactMetaItem: { display: 'flex', alignItems: 'center', gap: '10px', fontSize: '14px', opacity: 0.8 },
  form: { display: 'flex', flexDirection: 'column', gap: '14px' },
  formRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' },
  input: { padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', fontSize: '14px', fontFamily: 'inherit' },
  textarea: { padding: '14px 16px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', minHeight: '140px', fontSize: '14px', fontFamily: 'inherit', resize: 'vertical' },
  button: { backgroundColor: '#3a7ca5', padding: '15px', borderRadius: '8px', border: 'none', color: '#fff', fontWeight: 700, cursor: 'pointer', fontSize: '15px', fontFamily: 'inherit' },
  successMsg: { display: 'flex', alignItems: 'center', gap: '8px', color: '#4ade80', fontSize: '14px', marginTop: '4px' },
  errorMsg: { color: '#f87171', fontSize: '14px', marginTop: '4px' },

  footer: { borderTop: '1px solid rgba(255,255,255,0.07)', padding: '80px 24px 40px' },
  footerGrid: { display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '60px', marginBottom: '60px' },
  footerLogo: { display: 'flex', flexDirection: 'column', lineHeight: 1, marginBottom: '16px' },
  footerTagline: { fontSize: '14px', opacity: 0.5, lineHeight: 1.7, maxWidth: '240px', marginBottom: '20px' },
  socialRow: { display: 'flex', gap: '12px' },
  socialIcon: { color: 'rgba(255,255,255,0.4)', display: 'flex' },
  footerHeading: { fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: '16px' },
  footerLinks: { display: 'flex', flexDirection: 'column', gap: '10px' },
  footerLink: { fontSize: '14px', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' },
  footerBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px', fontSize: '13px', opacity: 0.4 },
  footerBottomLinks: { display: 'flex', gap: '24px' },

  container: { maxWidth: '1200px', margin: '0 auto' },
};
