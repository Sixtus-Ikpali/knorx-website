'use client';

import { useState, FormEvent, useEffect } from 'react';
// NEW: Import the professional icons
import { 
  Globe, 
  Cpu, 
  Layers, 
  Zap, 
  MessageSquare,
  Code2,
  Cloud,
  Menu,
  X
} from 'lucide-react';

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
          transition: all 0.3s ease-in-out !important;
          cursor: pointer;
        }
        .service-card:hover {
          transform: translateY(-10px);
          background-color: rgba(255, 255, 255, 0.08) !important;
          border-color: #3a7ca5 !important;
          box-shadow: 0 10px 30px rgba(58, 124, 165, 0.2);
        }
        /* Icon transition */
        .service-card:hover .icon-container {
            color: #fff !important;
            transform: scale(1.1);
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
             {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
          <div style={{...styles.orbitNode, animation: 'orbit-inner 6s linear infinite'}}><Code2 size={16} color="#fff"/></div>
          <div style={{...styles.orbitNode, animation: 'orbit-mid 10s linear infinite', backgroundColor: 'rgba(58, 124, 165, 0.4)'}}><Globe size={16} color="#fff"/></div>
          <div style={{...styles.orbitNode, animation: 'orbit-mid 12s linear infinite', animationDelay: '-5s', backgroundColor: 'rgba(58, 124, 165, 0.2)'}}><Cloud size={16} color="#fff"/></div>
          <div style={{...styles.orbitNode, animation: 'orbit-outer 18s linear infinite'}}><Zap size={16} color="#fff"/></div>
        </div>

        <div style={{ marginTop: '50px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          <a href="#contact" style={styles.heroButton}>Work with Us</a>
          <a href="#services" style={styles.heroSecondaryButton}>View Services</a>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" style={styles.aboutSection}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <div style={styles.aboutContent}>
            <p style={styles.aboutText}><strong>Knorx Technologies</strong> is a remote-first technology solutions provider. We help organizations design, automate, and optimize business operations using modern, scalable technology.</p>
            <p style={styles.aboutText}>Our approach combines deep domain understanding with knowledge-driven execution, ensuring every solution is optimized for performance, reliability, and growth.</p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - UPDATED WITH LIVE ICONS */}
      <section id="services" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Our Services</h2>
          <div style={styles.grid}>
            {services.map((s, i) => (
              <div key={i} className="service-card" style={styles.card}>
                <div className="icon-container" style={styles.cardImageContainer}>
                  {s.icon}
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

      {/* CONTACT SECTION */}
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

      <footer style={styles.footer}>© {year} KNORX Technologies. All rights reserved.</footer>
    </main>
  );
}

// UPDATED SERVICES WITH LIVE ICONS
const services = [
  { title: 'Digital Platforms', icon: <Globe size={40} />, items: ['Corporate websites', 'Enterprise platforms', 'E-commerce systems'] },
  { title: 'Application Engineering', icon: <Cpu size={40} />, items: ['Custom web & mobile apps', 'Automation tools', 'SaaS development'] },
  { title: 'Enterprise Systems', icon: <Layers size={40} />, items: ['ERP implementation', 'Workflow automation', 'Intelligent platforms'] },
  { title: 'Digital Transformation', icon: <Zap size={40} />, items: ['Strategy & execution', 'Process reengineering', 'End-to-end automation'] },
  { title: 'Consulting', icon: <MessageSquare size={40} />, items: ['Strategic advisory', 'Execution frameworks', 'Resource optimization'] }
];

const styles: { [key: string]: React.CSSProperties } = {
  main: { fontFamily: 'Inter, system-ui, sans-serif', backgroundColor: '#0b1c31', color: '#f1f5f9', minHeight: '100vh', scrollBehavior: 'smooth' },
  header: { padding: '15px 20px', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: 0, backgroundColor: 'rgba(11, 28, 49, 0.95)', backdropFilter: 'blur(10px)', zIndex: 100 },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  logoContainer: { display: 'flex', alignItems: 'center' },
  logoText: { color: '#3a7ca5', fontWeight: 800, fontSize: '22px', letterSpacing: '1.5px' },
  navLinks: { gap: '30px', alignItems: 'center' },
  hamburgerButton: { background: 'none', border: 'none', color: '#f1f5f9', cursor: 'pointer' },
  mobileMenu: { position: 'fixed', inset: '70px 0 0 0', backgroundColor: '#0b1c31', zIndex: 99, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', paddingTop: '60px' },
  mobileLink: { fontSize: '20px', color: '#f1f5f9', textDecoration: 'none' },
  mobileButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '16px 40px', borderRadius: '8px', textDecoration: 'none' },
  link: { color: '#f1f5f9', textDecoration: 'none', fontSize: '14px', fontWeight: 500 },
  navButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '8px 18px', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: 600 },
  hero: { padding: '120px 20px', textAlign: 'center', background: 'radial-gradient(circle at 50% 50%, #162c46 0%, #0b1c31 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center' },
  heading: { fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 800, maxWidth: '900px', lineHeight: 1.1 },
  subtext: { marginTop: '24px', fontSize: 'clamp(16px, 4vw, 20px)', opacity: 0.8, maxWidth: '700px' },
  orbitContainer: { position: 'relative', width: '320px', height: '320px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '40px' },
  centralNode: { width: '50px', height: '50px', backgroundColor: '#3a7ca5', borderRadius: '50%', zIndex: 10, animation: 'pulse-glow 3s infinite ease-in-out' },
  orbitNode: { position: 'absolute', width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)', zIndex: 5 },
  heroButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '18px' },
  heroSecondaryButton: { border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '16px 32px', borderRadius: '8px', textDecoration: 'none', fontSize: '18px' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  section: { padding: '100px 20px' },
  aboutSection: { padding: '100px 20px', backgroundColor: 'rgba(255,255,255,0.02)' },
  aboutContent: { maxWidth: '800px', lineHeight: '1.8', fontSize: '18px' },
  aboutText: { marginBottom: '20px' },
  sectionTitle: { fontSize: '32px', marginBottom: '40px', color: '#3a7ca5', fontWeight: 700 },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' },
  card: { padding: '24px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column' },
  
  // ICON STYLES
  cardImageContainer: { marginBottom: '20px', textAlign: 'left', color: '#3a7ca5', transition: 'all 0.3s ease' },
  
  cardTitle: { color: '#f1f5f9', marginBottom: '20px', fontWeight: 700 },
  list: { listStyleType: 'none', padding: 0, opacity: 0.8, fontSize: '14px' },
  listItem: { marginBottom: '10px' },
  contactContainer: { maxWidth: '600px' },
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  input: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', outline: 'none' },
  textarea: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', minHeight: '150px', outline: 'none', fontFamily: 'inherit' },
  button: { backgroundColor: '#3a7ca5', padding: '16px', borderRadius: '8px', border: 'none', color: '#ffffff', fontWeight: 600, cursor: 'pointer' },
  footer: { padding: '60px 20px', textAlign: 'center', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.05)', fontSize: '14px' }
};