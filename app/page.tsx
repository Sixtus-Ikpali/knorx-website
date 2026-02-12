

'use client';

import { useState, FormEvent, useEffect } from 'react';

export default function Home() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [year, setYear] = useState<number>(2026);
  
  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  // Lock body scroll when mobile menu is open
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
      {/* INTERNAL CSS FOR RESPONSIVENESS 
         This handles the logic to show/hide the hamburger button 
         based on screen width.
      */}
      <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
        @media (min-width: 769px) {
          .desktop-nav { display: flex !important; }
          .mobile-toggle { display: none !important; }
        }
      `}</style>

      <header style={styles.header}>
        <div style={styles.nav}>
          {/* LOGO */}
          <div style={styles.logoContainer}>
             {/* If you have the image, uncomment the img tag below. 
                 If not, the text fallback looks great too. */}
            {/* <img src="/logo.png" alt="KNORX Logo" style={styles.logoImage} /> */}
            <span style={styles.logoText}>KNORX</span>
          </div>
          
          {/* DESKTOP NAVIGATION */}
          <div className="desktop-nav" style={styles.navLinks}>
            <a href="#about" style={styles.link}>About</a>
            <a href="#services" style={styles.link}>Services</a>
            <a href="#contact" style={styles.navButton}>Get Started</a>
          </div>

          {/* MOBILE HAMBURGER BUTTON */}
          <button 
            className="mobile-toggle" 
            onClick={toggleMenu} 
            style={styles.hamburgerButton}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              // Close Icon (X)
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            ) : (
              // Hamburger Icon
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {isMobileMenuOpen && (
        <div style={styles.mobileMenu}>
          <div style={styles.mobileMenuLinks}>
            <a href="#about" onClick={closeMenu} style={styles.mobileLink}>About</a>
            <a href="#services" onClick={closeMenu} style={styles.mobileLink}>Services</a>
            <a href="#contact" onClick={closeMenu} style={styles.mobileButton}>Get Started</a>
          </div>
        </div>
      )}

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <h1 style={styles.heading}>
          Knowledge-Driven Execution for Modern Businesses
        </h1>
        <p style={styles.subtext}>
          We design and deliver knowledge-driven digital systems that power operational excellence.
        </p>
        <div style={{ marginTop: '40px', display: 'flex', flexWrap: 'wrap', gap: '15px', justifyContent: 'center' }}>
          <a href="#contact" style={styles.heroButton}>Work with Us</a>
          <a href="#services" style={styles.heroSecondaryButton}>View Services</a>
        </div>
      </section>

      {/* ABOUT US SECTION */}
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
              Our approach combines deep domain understanding with knowledge-driven execution, ensuring every solution is optimized for performance, reliability, and growth.
            </p>
            
            <p style={styles.aboutText}>
              From process automation and low-code platforms to data-driven decision systems, we work closely with our clients to deliver <strong>results—not just technology.</strong> 
              Whether you are a growing organization or an enterprise team, Knorx provides optimized, results-driven solutions that help you operate smarter, move faster, and scale with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
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

      {/* CONTACT SECTION */}
      <section id="contact" style={styles.section}>
        <div style={styles.container}>
          <div style={styles.contactContainer}>
            <h2 style={styles.sectionTitle}>Start a Conversation</h2>
            <p style={{ marginBottom: '24px', opacity: 0.7 }}>
              Ready to modernize your infrastructure? Let’s discuss your objectives.
            </p>
            <form onSubmit={handleSubmit} style={styles.form}>
              <input name="name" placeholder="Full Name" required style={styles.input} />
              <input name="email" type="email" placeholder="Email" required style={styles.input} />
              <textarea name="message" placeholder="How can we help?" required style={styles.textarea} />
              <button 
                type="submit" 
                disabled={loading} 
                style={{...styles.button, opacity: loading ? 0.7 : 1}}
              >
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
  {
    title: 'Digital Platforms & Web Development',
    items: ['Corporate websites', 'Enterprise web platforms', 'E-commerce systems', 'Secure client portals', 'API integrations']
  },
  {
    title: 'Application Engineering',
    items: ['Custom web & mobile apps (iOS & Android)', 'Business automation tools', 'Low-code platform solutions', 'SaaS system development']
  },
  {
    title: 'Enterprise Systems & Solutions',
    items: ['ERP implementation & customization', 'Workflow automation', 'Business process optimization', 'Intelligent operational platforms']
  },
  {
    title: 'Digital Transformation',
    items: ['Technology strategy & execution', 'Process reengineering', 'End-to-end automation of operations']
  },
  {
    title: 'Consulting & Knowledge Services',
    items: ['Strategic advisory for modernization', 'Execution frameworks', 'Optimization of enterprise resources']
  }
];

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    fontFamily: 'Inter, system-ui, sans-serif',
    backgroundColor: '#0b1c31', 
    color: '#f1f5f9',
    minHeight: '100vh',
    scrollBehavior: 'smooth'
  },
  header: {
    padding: '15px 20px', // Adjusted for mobile
    borderBottom: '1px solid rgba(255,255,255,0.05)',
    position: 'sticky',
    top: 0,
    backgroundColor: 'rgba(11, 28, 49, 0.95)',
    backdropFilter: 'blur(10px)',
    zIndex: 100
  },
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoImage: {
    height: '40px',
    width: 'auto',
    borderRadius: '4px'
  },
  logoText: {
    color: '#3a7ca5', 
    fontWeight: 800,
    fontSize: '20px',
    letterSpacing: '1.5px'
  },
  navLinks: {
    display: 'flex', // Default, hidden by CSS on mobile
    alignItems: 'center',
    gap: '30px'
  },
  hamburgerButton: {
    background: 'none',
    border: 'none',
    color: '#f1f5f9',
    cursor: 'pointer',
    padding: '5px',
    display: 'none' // Default, shown by CSS on mobile
  },
  mobileMenu: {
    position: 'fixed',
    top: '70px', // Below header
    left: 0,
    width: '100%',
    height: 'calc(100vh - 70px)',
    backgroundColor: '#0b1c31',
    zIndex: 99,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '60px'
  },
  mobileMenuLinks: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '30px',
    width: '100%'
  },
  mobileLink: {
    fontSize: '20px',
    color: '#f1f5f9',
    textDecoration: 'none',
    fontWeight: 500
  },
  mobileButton: {
    backgroundColor: '#3a7ca5',
    color: '#fff',
    padding: '16px 40px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 600
  },
  link: {
    color: '#f1f5f9',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 500
  },
  navButton: {
    backgroundColor: '#3a7ca5',
    color: '#fff',
    padding: '8px 18px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '14px',
    fontWeight: 600
  },
  hero: {
    padding: '140px 20px',
    textAlign: 'center',
    background: 'radial-gradient(circle at 50% 50%, #162c46 0%, #0b1c31 100%)'
  },
  heading: {
    fontSize: 'clamp(32px, 6vw, 56px)', // Clamp handles resizing
    fontWeight: 800,
    maxWidth: '900px',
    margin: '0 auto',
    lineHeight: 1.15
  },
  subtext: {
    marginTop: '24px',
    fontSize: 'clamp(16px, 4vw, 20px)',
    opacity: 0.8,
    maxWidth: '700px',
    margin: '24px auto 0',
    lineHeight: 1.6
  },
  heroButton: {
    display: 'inline-block',
    backgroundColor: '#3a7ca5',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '18px',
  },
  heroSecondaryButton: {
    display: 'inline-block',
    backgroundColor: 'transparent',
    color: '#fff',
    padding: '16px 32px',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: 600,
    fontSize: '18px',
    border: '1px solid rgba(255,255,255,0.2)'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto'
  },
  section: {
    padding: '80px 20px'
  },
  aboutSection: {
    padding: '80px 20px',
    backgroundColor: 'rgba(255,255,255,0.02)'
  },
  aboutContent: {
    maxWidth: '800px',
    lineHeight: '1.8',
    fontSize: 'clamp(16px, 2vw, 18px)'
  },
  aboutText: {
    marginBottom: '20px',
    opacity: 0.9
  },
  sectionTitle: {
    fontSize: 'clamp(28px, 4vw, 32px)',
    marginBottom: '40px',
    color: '#3a7ca5',
    fontWeight: 700
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '30px'
  },
  card: {
    padding: '24px',
    backgroundColor: 'rgba(255,255,255,0.03)',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)'
  },
  cardTitle: {
    color: '#f1f5f9',
    marginBottom: '20px',
    fontSize: '18px',
    fontWeight: 700
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    opacity: 0.8,
    fontSize: '14px',
    lineHeight: '1.8'
  },
  listItem: {
    marginBottom: '10px'
  },
  contactContainer: {
    maxWidth: '600px',
    width: '100%'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  input: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    outline: 'none',
    fontSize: '16px',
    width: '100%'
  },
  textarea: {
    padding: '14px',
    borderRadius: '8px',
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    minHeight: '150px',
    outline: 'none',
    fontFamily: 'inherit',
    fontSize: '16px',
    width: '100%'
  },
  button: {
    backgroundColor: '#3a7ca5',
    padding: '16px',
    borderRadius: '8px',
    border: 'none',
    color: '#ffffff',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '16px'
  },
  footer: {
    padding: '60px 20px',
    textAlign: 'center',
    opacity: 0.5,
    fontSize: '14px',
    borderTop: '1px solid rgba(255,255,255,0.05)'
  }
};
