'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import Link from 'next/link';
import { listarDocumentosAdmin, listarGaleriaAdmin } from '@/lib/api';
import { FaFileAlt, FaImages, FaCalendarAlt, FaPlus, FaArrowRight } from 'react-icons/fa';

export default function DashboardPage() {
  const [totalDocs, setTotalDocs] = useState<number | null>(null);
  const [totalImgs, setTotalImgs] = useState<number | null>(null);

  useEffect(() => {
    listarDocumentosAdmin().then(r => setTotalDocs(r.data.total)).catch(() => setTotalDocs(0));
    listarGaleriaAdmin().then(r => setTotalImgs(r.data.total)).catch(() => setTotalImgs(0));
  }, []);

  const stats = [
    { icon: <FaFileAlt size={24} />, label: 'Documentos', value: totalDocs, href: '/admin/documentos', color: '#003F87' },
    { icon: <FaImages size={24} />, label: 'Fotos na Galeria', value: totalImgs, href: '/admin/galeria', color: '#1A5CA8' },
    { icon: <FaCalendarAlt size={24} />, label: 'Eventos', value: '–', href: '/admin/eventos', color: '#F7A81B' },
  ];

  const atalhos = [
    { href: '/admin/documentos', icon: <FaFileAlt />, label: 'Publicar Documento', desc: 'Adicione atas, balancetes e relatórios', color: '#003F87' },
    { href: '/admin/galeria', icon: <FaImages />, label: 'Adicionar Foto', desc: 'Publique imagens na galeria', color: '#1A5CA8' },
    { href: '/admin/eventos', icon: <FaCalendarAlt />, label: 'Galeria de Eventos', desc: 'Gerencie fotos de eventos', color: '#F7A81B' },
  ];

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{ marginBottom: 36 }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', color: '#002d61', marginBottom: 6 }}>
          Dashboard
        </h1>
        <p style={{ color: '#6C757D', fontSize: '0.95rem' }}>
          Bem-vindo ao painel administrativo do Rotary Club de Marabá.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
        {stats.map((s, i) => (
          <Link key={i} href={s.href} style={{
            background: 'white', borderRadius: 16, padding: '24px',
            display: 'flex', alignItems: 'center', gap: 18,
            boxShadow: '0 4px 20px rgba(0,63,135,0.07)',
            border: '1px solid rgba(0,63,135,0.06)',
            transition: 'all 0.2s', textDecoration: 'none',
          }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,63,135,0.12)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.transform = 'none';
              (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,63,135,0.07)';
            }}
          >
            <div style={{
              width: 56, height: 56, borderRadius: 14,
              background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: s.color === '#F7A81B' ? '#002d61' : 'white', flexShrink: 0,
            }}>
              {s.icon}
            </div>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: '#002d61', lineHeight: 1 }}>
                {s.value ?? '...'}
              </div>
              <div style={{ color: '#6C757D', fontSize: '0.85rem', marginTop: 4 }}>{s.label}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Atalhos */}
      <div style={{ marginBottom: 12 }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.3rem', color: '#002d61', marginBottom: 20 }}>
          Ações Rápidas
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
          {atalhos.map((a, i) => (
            <Link key={i} href={a.href} style={{
              background: 'white', borderRadius: 14, padding: '24px',
              border: '1.5px solid #E9ECEF',
              display: 'flex', alignItems: 'center', gap: 16,
              textDecoration: 'none', transition: 'all 0.2s',
            }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = a.color;
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,63,135,0.1)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = '#E9ECEF';
                (e.currentTarget as HTMLElement).style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: a.color, fontSize: 18, flexShrink: 0,
              }}>
                {a.icon}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, color: '#002d61', fontSize: '0.95rem', marginBottom: 2 }}>{a.label}</div>
                <div style={{ color: '#ADB5BD', fontSize: '0.8rem' }}>{a.desc}</div>
              </div>
              <FaArrowRight style={{ color: '#DEE2E6', flexShrink: 0 }} />
            </Link>
          ))}
        </div>
      </div>

      {/* Info box */}
      <div style={{
        marginTop: 32, background: 'linear-gradient(135deg, #003F87, #1A5CA8)',
        borderRadius: 16, padding: '28px 32px', color: 'white',
        display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap',
      }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.2rem', marginBottom: 8 }}>
            Rotary Club de Marabá — Gestão 2025/2026
          </h3>
          <p style={{ opacity: 0.8, fontSize: '0.9rem' }}>
            Presidente: Marcus Vinícius Abreu de Sousa · Lema: "Unidos para Fazer o Bem"
          </p>
        </div>
        <a href="/" target="_blank" style={{
          background: '#F7A81B', color: '#002d61', fontWeight: 700,
          padding: '10px 24px', borderRadius: 8, textDecoration: 'none', fontSize: '0.9rem',
          flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: 8,
        }}>
          Ver Site <FaArrowRight size={12} />
        </a>
      </div>
    </AdminLayout>
  );
}
