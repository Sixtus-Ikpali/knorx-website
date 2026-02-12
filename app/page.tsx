

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
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMenu = () => setIsMobileMenuOpen(false);

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

        /* KEYFRAMES FOR ORBIT ANIMATION */
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(70px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(70px) rotate(-360deg); }
        }
        @keyframes orbit-reverse {
          from { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
          to   { transform: rotate(0deg) translateX(110px) rotate(0deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 0.2; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
      `}</style>

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

          <button className="mobile-toggle" onClick={toggleMenu} style={styles.hamburgerButton} aria-label="Toggle menu">
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileMenuLinks}>
            <a href="#about" onClick={closeMenu} style={styles.mobileLink}>About</a>
            <a href="#services" onClick={closeMenu} style={styles.mobileLink}>Services</a>
            <a href="#contact" onClick={closeMenu} style={styles.mobileButton}>Get Started</a>
          </div>
        </div>
      )}

      {/* HERO SECTION WITH ANIMATION */}
      <section style={styles.hero}>
        <h1 style={styles.heading}>Knowledge-Driven Execution for Modern Businesses</h1>
        <p style={styles.subtext}>We design and deliver knowledge-driven digital systems that power operational excellence.</p>
        
        {/* TECH ORBIT ANIMATION COMPONENT */}
        <div style={styles.orbitContainer}>
          <div style={styles.centralNode}>
             <div style={styles.pulseRing}></div>
          </div>
          {/* Orbiting Icons/Nodes */}
          <div style={{...styles.orbitNode, animation: 'orbit 8s linear infinite'}}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><path d="M12 2v4m0 12v4M4.93 4.93l2.83 2.83m8.48 8.48l2.83 2.83M2 12h4m12 0h4M4.93 19.07l2.83-2.83m8.48-8.48l2.83-2.83"/></svg>
          </div>
          <div style={{...styles.orbitNode, animation: 'orbit-reverse 12s linear infinite', backgroundColor: 'rgba(58, 124, 165, 0.4)'}}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <div style={{...styles.orbitNode, animation: 'orbit 15s linear infinite', animationDelay: '-2s'}}>
             <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1V11a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
          </div>
        </div>

        <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          <a href="#contact" style={styles.heroButton}>Work with Us</a>
          <a href="#services" style={styles.heroSecondaryButton}>View Services</a>
        </div>
      </section>

      {/* REST OF THE SECTIONS REMAIN THE SAME */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <div style={styles.aboutContent}>
            <p style={styles.aboutText}>
              <strong>Knorx Technologies</strong> is a remote-first technology solutions provider. 
              We help organizations design, automate, and optimize their business operations using modern, scalable technology.
            </p>
            <p style={styles.aboutText}>
              We specialize in building next-generation digital solutions that are practical, secure, and aligned with real business outcomes.
            </p>
          </div>
        </div>
      </section>

      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <div style={styles.grid}>
            {services.map((service, index) => (
              <div key={index} style={styles.card}>
                <h3 style={styles.cardTitle}>{service.title}</h3>
                <ul style={styles.list}>
                  {service.items.map((item, i) => (
                    <li key={i} style={styles.listItem}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
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
              <button type="submit" disabled={loading} style={{...styles.button, opacity: loading ? 0.7 : 1}}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
              {success && <p style={{ color: '#4ade80', marginTop: '10px' }}>✓ Message sent successfully.</p>}
              {error && <p style={{ color: '#f87171', marginTop: '10px' }}>{error}</p>}
            </form>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        © {year} KNORX Technologies. All rights reserved.
      </footer>
    </main>
  );
}

const services = [
  { title: 'Digital Platforms & Web Development', items: ['Corporate websites', 'Enterprise web platforms', 'E-commerce systems'] },
  { title: 'Application Engineering', items: ['Custom web & mobile apps', 'Business automation tools', 'SaaS system development'] },
  { title: 'Enterprise Systems & Solutions', items: ['ERP implementation', 'Workflow automation', 'Intelligent operational platforms'] },
  { title: 'Digital Transformation', items: ['Technology strategy', 'Process reengineering', 'End-to-end automation'] },
  { title: 'Consulting & Knowledge Services', items: ['Strategic advisory', 'Execution frameworks', 'Resource optimization'] }
];

const styles: { [key: string]: React.CSSProperties } = {
  main: { fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#0b1c31', color: '#f1f5f9', minHeight: '100vh', scrollBehavior: 'smooth' },
  header: { padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, backgroundColor: 'rgba(11, 28, 49, 0.95)', backdropFilter: 'blur(10px)', zIndex: 100 },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  logoContainer: { display: 'flex', alignItems: 'center', gap: '12px' },
  logoText: { color: '#3a7ca5', fontWeight: 800, fontSize: '20px', letterSpacing: '1.5px' },
  navLinks: { display: 'flex', alignItems: 'center', gap: '30px' },
  hamburgerButton: { background: 'none', border: 'none', color: '#f1f5f9', cursor: 'pointer', padding: '5px' },
  mobileMenu: { position: 'fixed', top: '70px', left: 0, width: '100%', height: 'calc(100vh - 70px)', backgroundColor: '#0b1c31', zIndex: 99, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', paddingTop: '60px' },
  mobileMenuLinks: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', width: '100%' },
  mobileLink: { fontSize: '20px', color: '#f1f5f9', textDecoration: 'none' },
  mobileButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '16px 40px', borderRadius: '8px', textDecoration: 'none' },
  link: { color: '#f1f5f9', textDecoration: 'none', fontSize: '14px' },
  navButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '8px 18px', borderRadius: '6px', textDecoration: 'none' },
  hero: { padding: '100px 20px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #162c46 0%, #0b1c31 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  heading: { fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, maxWidth: '900px', margin: '0 auto', lineHeight: 1.15 },
  subtext: { marginTop: '24px', fontSize: 'clamp(16px, 4vw, 20px)', opacity: 0.8, maxWidth: '700px', margin: '24px auto 0' },
  
  /* NEW ANIMATION STYLES */
  orbitContainer: { position: 'relative', width: '300px', height: '220px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px' },
  centralNode: { width: '40px', height: '40px', backgroundColor: '#3a7ca5', borderRadius: '50%', zIndex: 5, position: 'relative' },
  pulseRing: { position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', border: '2px solid #3a7ca5', animation: 'pulse-ring 3s ease-out infinite' },
  orbitNode: { position: 'absolute', width: '30px', height: '30px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)' },
  
  heroButton: { display: 'inline-block', backgroundColor: '#3a7ca5', color: '#fff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 },
  heroSecondaryButton: { display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  section: { padding: '80px 20px' },
  aboutSection: { padding: '80px 20px', backgroundColor: 'rgba(255,255,255,0.02)' },
  aboutContent: { maxWidth: '800px', lineHeight: '1.8' },
  aboutText: { marginBottom: '20px', opacity: 0.9 },
  sectionTitle: { fontSize: 'clamp(28px, 4vw, 32px)', marginBottom: '40px', color: '#3a7ca5' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: { padding: '24px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' },
  cardTitle: { color: '#f1f5f9', marginBottom: '20px', fontWeight: 700 },
  list: { listStyleType: 'none', padding: 0, opacity: 0.8, fontSize: '14px' },
  listItem: { marginBottom: '10px' },
  contactContainer: { maxWidth: '600px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  input: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' },
  textarea: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', minHeight: '150px' },
  button: { backgroundColor: '#3a7ca5', padding: '16px', borderRadius: '8px', border: 'none', color: '#ffffff', fontWeight: 600, cursor: 'pointer' },
  footer: { padding: '60px 20px', textAlign: 'center', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.05)' }
};
