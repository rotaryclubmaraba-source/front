'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Início' },
  { href: '/transparencia', label: 'Transparência' },
  { href: '/galeria', label: 'Galeria' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/contato', label: 'Contato' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(0, 45, 97, 0.97)' : 'rgba(0, 45, 97, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: scrolled ? '1px solid rgba(247, 168, 27, 0.3)' : '1px solid transparent',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 20px rgba(0,0,0,0.2)' : 'none',
    }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '72px' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: 46, height: 46, borderRadius: '50%',
            background: 'white', display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: 4, flexShrink: 0,
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
          }}>
            <Image src="/rotary-logo.png" alt="Rotary" width={38} height={38} style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ color: '#F7A81B', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1rem', lineHeight: 1.1 }}>
              Rotary Club
            </div>
            <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
              de Marabá
            </div>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul style={{ display: 'flex', gap: '4px', listStyle: 'none', alignItems: 'center' }} className="desktop-nav">
          {links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} style={{
                color: pathname === l.href ? '#F7A81B' : 'rgba(255,255,255,0.85)',
                fontWeight: 600, fontSize: '0.92rem', padding: '8px 14px',
                borderRadius: 6, transition: 'all 0.2s',
                borderBottom: pathname === l.href ? '2px solid #F7A81B' : '2px solid transparent',
                display: 'block',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F7A81B')}
                onMouseLeave={e => (e.currentTarget.style.color = pathname === l.href ? '#F7A81B' : 'rgba(255,255,255,0.85)')}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Admin link */}
        <Link href="/admin" style={{
          background: '#F7A81B', color: '#002d61',
          fontWeight: 700, fontSize: '0.88rem', padding: '9px 20px',
          borderRadius: 6, transition: 'all 0.2s', display: 'inline-block',
        }}
          className="admin-btn"
          onMouseEnter={e => (e.currentTarget.style.background = '#d4890e')}
          onMouseLeave={e => (e.currentTarget.style.background = '#F7A81B')}
        >
          Admin
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none', background: 'none', border: 'none',
            color: 'white', cursor: 'pointer', padding: 8,
          }}
          className="hamburger"
        >
          <div style={{ width: 24, height: 2, background: 'white', marginBottom: 5, transition: 'all 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
          <div style={{ width: 24, height: 2, background: 'white', marginBottom: 5, opacity: menuOpen ? 0 : 1, transition: 'all 0.3s' }} />
          <div style={{ width: 24, height: 2, background: 'white', transition: 'all 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div style={{
        overflow: 'hidden', maxHeight: menuOpen ? '400px' : 0,
        transition: 'max-height 0.4s ease',
        background: 'rgba(0, 35, 75, 0.98)',
      }} className="mobile-menu">
        <div className="container" style={{ padding: '16px 24px 24px' }}>
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: 'block', color: pathname === l.href ? '#F7A81B' : 'rgba(255,255,255,0.85)',
              fontWeight: 600, fontSize: '1rem', padding: '12px 0',
              borderBottom: '1px solid rgba(255,255,255,0.08)',
            }}>
              {l.label}
            </Link>
          ))}
          <Link href="/admin" onClick={() => setMenuOpen(false)} style={{
            display: 'inline-block', marginTop: 16,
            background: '#F7A81B', color: '#002d61',
            fontWeight: 700, padding: '10px 24px', borderRadius: 6,
          }}>
            Admin
          </Link>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .admin-btn { display: none !important; }
          .hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
