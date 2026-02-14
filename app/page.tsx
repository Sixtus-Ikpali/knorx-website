

'use client';

import { useState, FormEvent, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2026);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      if (!response.ok) throw new Error('Failed to send message.');

      setSuccess(true);
      form.reset();
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={styles.main}>
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }

        /* ORBIT ANIMATIONS */
        @keyframes orbit-inner {
          from { transform: rotate(0deg) translateX(75px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(75px) rotate(-360deg); }
        }
        @keyframes orbit-mid {
          from { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
          to   { transform: rotate(0deg) translateX(110px) rotate(0deg); }
        }
        @keyframes orbit-outer {
          from { transform: rotate(0deg) translateX(145px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(145px) rotate(-360deg); }
        }
        @keyframes pulse-glow {
          0% { transform: scale(0.9); opacity: 0.4; box-shadow: 0 0 20px #3a7ca5; }
          50% { transform: scale(1.1); opacity: 0.7; box-shadow: 0 0 50px #3a7ca5; }
          100% { transform: scale(0.9); opacity: 0.4; box-shadow: 0 0 20px #3a7ca5; }
        }

        /* SERVICE CARD HOVER EFFECTS */
        .service-card {
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) !important;
          cursor: pointer;
        }
        .service-card:hover {
          transform: translateY(-12px);
          background-color: rgba(255, 255, 255, 0.07) !important;
          border-color: #3a7ca5 !important;
          box-shadow: 0 15px 35px rgba(58, 124, 165, 0.25);
        }
        .service-card:hover img {
          transform: scale(1.08);
          transition: transform 0.4s ease;
        }
      `}</style>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.nav}>
          <div style={styles.logoContainer}>
            <span style={styles.logoText}>KNORX</span>
          </div>
          <div className="desktop-nav" style={styles.navLinks}>
            <a href="#about" style={styles.link}>About</a>
            <a href="#services" style={styles.link}>Services</a>
            <a href="#contact" style={styles.navButton}>Get Started</a>
          </div>
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} style={styles.hamburgerButton}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {isMobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M3 12h18M3 6h18M3 18h18"/>}
            </svg>
          </button>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileLink}>About</a>
          <a href="#services" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileLink}>Services</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} style={styles.mobileButton}>Get Started</a>
        </div>
      )}

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <h1 style={styles.heading}>Knowledge-Driven Execution for Modern Businesses</h1>
        <p style={styles.subtext}>We design and deliver knowledge-driven digital systems that power operational excellence.</p>
        
        <div style={styles.orbitContainer}>
          <div style={styles.centralNode}></div>
          <div style={{...styles.orbitNode, animation: 'orbit-inner 6s linear infinite'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/></svg></div>
          <div style={{...styles.orbitNode, animation: 'orbit-mid 10s linear infinite', backgroundColor: 'rgba(58, 124, 165, 0.4)'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"/></svg></div>
          <div style={{...styles.orbitNode, animation: 'orbit-mid 12s linear infinite', animationDelay: '-5s', backgroundColor: 'rgba(58, 124, 165, 0.2)'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg></div>
          <div style={{...styles.orbitNode, animation: 'orbit-outer 18s linear infinite'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg></div>
          <div style={{...styles.orbitNode, animation: 'orbit-outer 22s linear infinite', animationDelay: '-11s', backgroundColor: 'rgba(58, 124, 165, 0.5)'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z"/><circle cx="12" cy="12" r="3"/></svg></div>
          <div style={{...styles.orbitNode, animation: 'orbit-inner 8s linear infinite', animationDelay: '-3s'}}><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1V11a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg></div>
        </div>

        <div style={{ marginTop: '50px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          <a href="#contact" style={styles.heroButton}>Work with Us</a>
          <a href="#services" style={styles.heroSecondaryButton}>View Services</a>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <div style={styles.grid}>
            {services.map((s, i) => (
              <div key={i} className="service-card" style={styles.card}>
                <div style={styles.cardImageContainer}>
                  <img src={s.image} alt={s.title} style={styles.cardImage} />
                </div>
                <h3 style={styles.cardTitle}>{s.title}</h3>
                <ul style={styles.list}>
                  {s.items.map((item, idx) => <li key={idx} style={styles.listItem}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT & CONTACT RENDERED AS BEFORE */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <div style={styles.aboutContent}>
            <p style={styles.aboutText}><strong>Knorx Technologies</strong> is a remote-first technology solutions provider helping organizations design, automate, and optimize business operations.</p>
          </div>
        </div>
      </section>

      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.contactContainer}>
            <h2 style={styles.sectionTitle}>Start a Conversation</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input name="name" placeholder="Full Name" required style={styles.input} />
              <input name="email" type="email" placeholder="Email" required style={styles.input} />
              <textarea name="message" placeholder="How can we help?" required style={styles.textarea} />
              <button type="submit" disabled={loading} style={styles.button}>{loading ? 'Sending...' : 'Send Message'}</button>
              {success && <p style={{ color: '#4ade80', marginTop: '10px' }}>✓ Message sent.</p>}
            </form>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>© {year} KNORX Technologies. All rights reserved.</footer>
    </main>
  );
}

const services = [
  { title: 'Digital Platforms', image: '/digital-platforms.jpg', items: ['Corporate websites', 'Enterprise platforms', 'E-commerce systems'] },
  { title: 'Application Engineering', image: '/application-engineering.jpg', items: ['Custom web & mobile apps', 'Automation tools', 'SaaS development'] },
  { title: 'Enterprise Systems', image: '/enterprise-systems.jpg', items: ['ERP implementation', 'Workflow automation', 'Intelligent platforms'] },
  { title: 'Digital Transformation', image: '/digital-transformation.jpg', items: ['Strategy & execution', 'Process reengineering', 'End-to-end automation'] },
  { title: 'Consulting', image: '/consulting.jpg', items: ['Strategic advisory', 'Execution frameworks', 'Resource optimization'] }
];

const styles: { [key: string]: React.CSSProperties } = {
  main: { fontFamily: 'Inter, sans-serif', backgroundColor: '#0b1c31', color: '#f1f5f9', minHeight: '100vh', overflowX: 'hidden' },
  header: { padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, backgroundColor: 'rgba(11, 28, 49, 0.95)', zIndex: 100 },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  logoText: { color: '#3a7ca5', fontWeight: 800, fontSize: '22px', letterSpacing: '1.5px' },
  navLinks: { gap: '30px', alignItems: 'center' },
  navButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '8px 18px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 },
  link: { color: '#f1f5f9', textDecoration: 'none', fontSize: '14px' },
  hero: { padding: '100px 20px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #162c46 0%, #0b1c31 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  heading: { fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, maxWidth: '900px', lineHeight: 1.1 },
  subtext: { marginTop: '24px', fontSize: '18px', opacity: 0.8, maxWidth: '700px' },
  orbitContainer: { position: 'relative', width: '320px', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' },
  centralNode: { width: '50px', height: '50px', backgroundColor: '#3a7ca5', borderRadius: '50%', zIndex: 10, animation: 'pulse-glow 3s infinite ease-in-out' },
  orbitNode: { position: 'absolute', width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)' },
  heroButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 },
  heroSecondaryButton: { border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none' },
  section: { padding: '80px 20px' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { fontSize: '32px', marginBottom: '40px', color: '#3a7ca5', fontWeight: 700 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
  card: { padding: '30px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' },
  cardImageContainer: { marginBottom: '20px', height: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '10px', overflow: 'hidden' },
  cardImage: { maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', borderRadius: '8px' },
  cardTitle: { color: '#f1f5f9', marginBottom: '15px', fontSize: '20px', fontWeight: 700 },
  list: { listStyle: 'none', padding: 0, opacity: 0.8 },
  listItem: { marginBottom: '8px', fontSize: '14px' },
  input: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', marginBottom: '15px' },
  textarea: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', minHeight: '120px' },
  button: { backgroundColor: '#3a7ca5', padding: '16px', borderRadius: '8px', color: '#fff', fontWeight: 600, border: 'none', cursor: 'pointer' },
  footer: { padding: '40px', textAlign: 'center', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.05)' }
};

