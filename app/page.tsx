
'use client';

import { useState, FormEvent, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2026);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

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
        /* Original Orbit Animation */
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(100px) rotate(0deg); }
          to { transform: rotate(360deg) translateX(100px) rotate(-360deg); }
        }
        
        /* The ONLY 'new' addition: The hover lift for cards */
        .service-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease !important;
        }
        .service-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(58, 124, 165, 0.2);
          border-color: #3a7ca5 !important;
        }
      `}</style>

      {/* HEADER - RESTORED */}
      <header style={styles.header}>
        <div style={styles.nav}>
          <span style={styles.logoText}>KNORX</span>
          <div style={styles.navLinks}>
            <a href="#about" style={styles.link}>About</a>
            <a href="#services" style={styles.link}>Services</a>
            <a href="#contact" style={styles.navButton}>Get Started</a>
          </div>
        </div>
      </header>

      {/* HERO - RESTORED TO SINGLE ORBIT */}
      <section style={styles.hero}>
        <h1 style={styles.heading}>Knowledge-Driven Execution for Modern Businesses</h1>
        <p style={styles.subtext}>We design and deliver knowledge-driven digital systems.</p>
        <div style={styles.orbitContainer}>
          <div style={styles.centralNode}></div>
          <div style={{...styles.orbitNode, animation: 'orbit 8s linear infinite'}}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2">
              <path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION - RESTORED EXACT TEXT */}
      <section id="about" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>About Us</h2>
          <div style={styles.aboutContent}>
            <p style={styles.aboutText}>
              <strong>Knorx Technologies</strong> is a remote-first technology solutions provider. We help organizations design, automate, and optimize business operations using modern, scalable technology.
            </p>
            <p style={styles.aboutText}>
              Our approach combines deep domain understanding with knowledge-driven execution, ensuring every solution is optimized for performance, reliability, and growth.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - WITH RECENT ICON UPDATES */}
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

      {/* CONTACT - RESTORED */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Contact Us</h2>
          <form onSubmit={handleSubmit} style={styles.form}>
            <input name="name" placeholder="Name" required style={styles.input} />
            <input name="email" type="email" placeholder="Email" required style={styles.input} />
            <textarea name="message" placeholder="Message" required style={styles.textarea} />
            <button type="submit" disabled={loading} style={styles.button}>{loading ? 'Sending...' : 'Send'}</button>
            {success && <p style={{ color: '#4ade80', marginTop: '10px' }}>✓ Message sent.</p>}
          </form>
        </div>
      </section>

      <footer style={styles.footer}>© {year} KNORX Technologies.</footer>
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
  main: { fontFamily: 'Inter, sans-serif', backgroundColor: '#0b1c31', color: '#f1f5f9', minHeight: '100vh' },
  header: { padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', position: 'sticky', top: 0, backgroundColor: '#0b1c31', zIndex: 10 },
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1200px', margin: '0 auto' },
  logoText: { color: '#3a7ca5', fontWeight: 800, fontSize: '24px' },
  navLinks: { display: 'flex', gap: '25px', alignItems: 'center' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '14px' },
  navButton: { backgroundColor: '#3a7ca5', color: '#fff', padding: '8px 16px', borderRadius: '4px', textDecoration: 'none', fontSize: '14px' },
  hero: { padding: '100px 20px', textAlign: 'center' },
  heading: { fontSize: '48px', fontWeight: 800, marginBottom: '20px' },
  subtext: { fontSize: '20px', opacity: 0.8, maxWidth: '700px', margin: '0 auto' },
  orbitContainer: { position: 'relative', width: '300px', height: '300px', margin: '60px auto', display: 'flex', justifyContent: 'center', alignItems: 'center' },
  centralNode: { width: '40px', height: '40px', backgroundColor: '#3a7ca5', borderRadius: '50%' },
  orbitNode: { position: 'absolute', width: '35px', height: '35px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '1px solid rgba(255,255,255,0.2)' },
  section: { padding: '80px 20px' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  sectionTitle: { fontSize: '32px', color: '#3a7ca5', marginBottom: '40px', fontWeight: 700 },
  aboutContent: { maxWidth: '800px', lineHeight: '1.8' },
  aboutText: { marginBottom: '20px', fontSize: '18px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
  card: { padding: '30px', backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' },
  cardImageContainer: { marginBottom: '20px', textAlign: 'center' },
  cardImage: { maxWidth: '100%', height: '160px', objectFit: 'contain' },
  cardTitle: { marginBottom: '15px' },
  list: { listStyle: 'none', padding: 0, opacity: 0.7 },
  listItem: { marginBottom: '8px', fontSize: '14px' },
  form: { display: 'flex', flexDirection: 'column', gap: '15px', maxWidth: '500px' },
  input: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff' },
  textarea: { padding: '14px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', minHeight: '120px' },
  button: { backgroundColor: '#3a7ca5', color: '#fff', padding: '16px', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  footer: { padding: '60px 20px', textAlign: 'center', opacity: 0.5, borderTop: '1px solid rgba(255,255,255,0.05)' }
};

