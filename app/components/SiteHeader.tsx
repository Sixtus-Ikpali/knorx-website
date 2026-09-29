'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navigation = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'Approach', href: '/approach' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    menuRef.current?.querySelector('a')?.focus();
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      } else if (event.key === 'Tab') {
        const links = Array.from(menuRef.current?.querySelectorAll('a') || []);
        const first = links[0];
        const last = links.at(-1);
        if (event.shiftKey && (document.activeElement === first || document.activeElement === toggleRef.current)) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          toggleRef.current?.focus();
        }
      }
    }
    function onDesktop() {
      if (window.matchMedia('(min-width: 981px)').matches) setOpen(false);
    }
    document.addEventListener('keydown', onKeyDown);
    window.addEventListener('resize', onDesktop);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('resize', onDesktop);
    };
  }, [open]);

  return (
    <header className="site-header">
      <div className="site-header-inner container">
        <Link href="/" className="brand" aria-label="KNORX Technologies home" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={54} height={44} priority />
          <span className="brand-type"><strong>KNORX</strong><span>TECHNOLOGIES</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
        </nav>
        <Link className="header-cta button button-primary" href="/contact">Discuss a Project</Link>
        <button
          ref={toggleRef}
          type="button"
          className="menu-toggle"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={23} aria-hidden="true" /> : <Menu size={23} aria-hidden="true" />}
        </button>
      </div>
      <nav id="mobile-navigation" ref={menuRef} className="mobile-nav" aria-label="Mobile navigation" hidden={!open}>
        {navigation.map((item) => <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</Link>)}
        <Link href="/contact" className="button button-primary" onClick={() => setOpen(false)}>Discuss a Project</Link>
      </nav>
    </header>
  );
}
