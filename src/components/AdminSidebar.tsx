'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import toast from 'react-hot-toast';
import {
  FaTachometerAlt, FaFileAlt, FaImages, FaCalendarAlt,
  FaSignOutAlt, FaExternalLinkAlt, FaBars, FaTimes,
} from 'react-icons/fa';
import { useState } from 'react';

const menuItems = [
  { href: '/admin/dashboard', icon: <FaTachometerAlt />, label: 'Dashboard' },
  { href: '/admin/documentos', icon: <FaFileAlt />, label: 'Documentos' },
  { href: '/admin/galeria', icon: <FaImages />, label: 'Galeria' },
  { href: '/admin/eventos', icon: <FaCalendarAlt />, label: 'Eventos' },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success('Logout realizado');
    router.push('/admin/login');
  };

  const SidebarContent = () => (
    <div style={{
      width: 240, minHeight: '100vh', background: 'linear-gradient(180deg, #001e4d 0%, #002d61 100%)',
      display: 'flex', flexDirection: 'column', position: 'fixed', top: 0, left: 0, bottom: 0,
      zIndex: 100, boxShadow: '4px 0 20px rgba(0,0,0,0.15)',
    }}>
      {/* Logo */}
      <div style={{
        padding: '24px 20px 20px',
        borderBottom: '1px solid rgba(247,168,27,0.2)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 4, flexShrink: 0,
          }}>
            <Image src="/rotary-logo.png" alt="Rotary" width={36} height={36} style={{ objectFit: 'contain' }} />
          </div>
          <div>
            <div style={{ color: '#F7A81B', fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '0.9rem' }}>
              Rotary Club
            </div>
            <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.7rem', letterSpacing: '1px', textTransform: 'uppercase' }}>
              Admin Panel
            </div>
          </div>
        </div>
      </div>

      {/* Menu */}
      <nav style={{ flex: 1, padding: '16px 12px' }}>
        {menuItems.map((item) => {
          const active = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '11px 14px', borderRadius: 10, marginBottom: 4,
                color: active ? '#F7A81B' : 'rgba(255,255,255,0.7)',
                background: active ? 'rgba(247,168,27,0.12)' : 'transparent',
                fontWeight: active ? 700 : 500, fontSize: '0.92rem',
                transition: 'all 0.2s',
                borderLeft: active ? '3px solid #F7A81B' : '3px solid transparent',
              }}
              onMouseEnter={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { if (!active) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{ fontSize: 16 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div style={{ padding: '16px 12px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <a href="/" target="_blank" style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
          color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', borderRadius: 8, marginBottom: 4,
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
        >
          <FaExternalLinkAlt size={13} /> Ver Site
        </a>
        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '10px 14px',
          color: 'rgba(255,100,100,0.8)', fontSize: '0.85rem', borderRadius: 8,
          background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => (e.currentTarget.style.color = '#ff6b6b')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,100,100,0.8)')}
        >
          <FaSignOutAlt size={14} /> Sair
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <div className="admin-sidebar-desktop"><SidebarContent /></div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="admin-mobile-toggle"
        style={{
          position: 'fixed', top: 16, left: 16, zIndex: 200,
          background: '#002d61', border: 'none', color: 'white',
          width: 44, height: 44, borderRadius: 10, cursor: 'pointer',
          display: 'none', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        }}
      >
        {mobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 150, background: 'rgba(0,0,0,0.5)' }}
          onClick={() => setMobileOpen(false)} className="admin-mobile-overlay">
          <div onClick={(e) => e.stopPropagation()}>
            <SidebarContent />
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .admin-sidebar-desktop { display: none !important; }
          .admin-mobile-toggle { display: flex !important; }
        }
      `}</style>
    </>
  );
}
