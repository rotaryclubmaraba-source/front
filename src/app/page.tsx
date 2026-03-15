'use client';

import PublicLayout from '@/components/PublicLayout';
import Link from 'next/link';
import Image from 'next/image';
import { FaHandshake, FaGlobe, FaUsers, FaHeart, FaArrowRight, FaQuoteLeft } from 'react-icons/fa';
import { useEffect, useState } from 'react';

const valores = [
  {
    icon: <FaHandshake size={32} />,
    titulo: 'Serviço',
    desc: 'Trabalhamos em conjunto para criar impacto positivo em Marabá e no mundo.',
  },
  {
    icon: <FaUsers size={32} />,
    titulo: 'Companheirismo',
    desc: 'Construímos amizades duradouras baseadas em valores compartilhados.',
  },
  {
    icon: <FaGlobe size={32} />,
    titulo: 'Integridade',
    desc: 'Agimos com ética e transparência em todas as nossas ações.',
  },
  {
    icon: <FaHeart size={32} />,
    titulo: 'Liderança',
    desc: 'Desenvolvemos líderes comprometidos com o bem coletivo.',
  },
];

const diretoria = [
  { cargo: 'Presidente', nome: 'Marcus Vinícius Abreu de Sousa', mandato: '2025/2026' },
  { cargo: '1ª Vice-Presidente', nome: 'Maria Roseli de Oliveira Oliveira', mandato: '2025/2026' },
  { cargo: '1ª Secretária', nome: 'Mara Silvia Ponchio Gomes', mandato: '2025/2026' },
  { cargo: '1ª Tesoureira', nome: 'Isabela Mendes Lobato Reis', mandato: '2025/2026' },
];

export default function HomePage() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <PublicLayout>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '92vh', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #001e4d 0%, #002d61 40%, #003F87 70%, #1A5CA8 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorations */}
        <div style={{
          position: 'absolute', right: '-120px', top: '50%', transform: 'translateY(-50%)',
          opacity: 0.04, animation: 'spin 60s linear infinite',
        }}>
          <div style={{ width: 500, height: 500, borderRadius: '50%', border: '40px solid #F7A81B' }} />
        </div>
        <div style={{
          position: 'absolute', left: '-80px', bottom: '-80px', opacity: 0.05,
        }}>
          <div style={{ width: 300, height: 300, borderRadius: '50%', border: '30px solid #F7A81B' }} />
        </div>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'radial-gradient(rgba(247,168,27,0.08) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2, padding: '80px 24px 140px' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr auto',
            gap: '64px', alignItems: 'center',
          }}>
            <div style={{
              opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s ease',
            }}>
              {/* Badge */}
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(247,168,27,0.15)', border: '1px solid rgba(247,168,27,0.4)',
                borderRadius: 100, padding: '6px 18px', marginBottom: 28,
              }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#F7A81B', display: 'block' }} />
                <span style={{ color: '#FAC253', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.5px' }}>
                  Membro do Rotary International desde 2005
                </span>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
                color: 'white', fontWeight: 900, lineHeight: 1.05,
                marginBottom: 20,
              }}>
                Unidos Para<br />
                <span style={{ color: '#F7A81B' }}>Fazer o Bem</span>
              </h1>

              <p style={{
                color: 'rgba(255,255,255,0.75)', fontSize: '1.15rem',
                maxWidth: 500, lineHeight: 1.8, marginBottom: 40,
              }}>
                O Rotary Club de Marabá é uma associação de líderes comprometidos com o serviço comunitário, o companheirismo e a promoção da paz em Marabá, Pará.
              </p>

              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                <Link href="/transparencia" style={{
                  background: '#F7A81B', color: '#002d61',
                  fontWeight: 700, padding: '14px 32px', borderRadius: 8, fontSize: '1rem',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', boxShadow: '0 8px 24px rgba(247,168,27,0.3)',
                }}>
                  Portal de Transparência <FaArrowRight />
                </Link>
                <Link href="/galeria" style={{
                  border: '2px solid rgba(255,255,255,0.4)', color: 'white',
                  fontWeight: 600, padding: '13px 28px', borderRadius: 8, fontSize: '0.95rem',
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none', transition: 'all 0.2s',
                }}>
                  Ver Galeria
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 40, marginTop: 56, flexWrap: 'wrap' }}>
                {[
                  { n: '20+', label: 'Anos de História' },
                  { n: '2005', label: 'Fundação' },
                  { n: '∞', label: 'Serviço' },
                ].map((s) => (
                  <div key={s.label}>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 900, color: '#F7A81B' }}>{s.n}</div>
                    <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logo */}
            <div style={{
              opacity: visible ? 1 : 0, transform: visible ? 'scale(1)' : 'scale(0.8)',
              transition: 'all 1s ease 0.3s',
            }} className="hero-logo">
              <div style={{
                width: 320, height: 320, borderRadius: '50%',
                background: 'rgba(255,255,255,0.06)',
                border: '2px solid rgba(247,168,27,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: 260, height: 260, borderRadius: '50%',
                  background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  padding: 20, boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}>
                  <Image src="/rotary-logo.png" alt="Rotary Club de Marabá" width={220} height={220} style={{ objectFit: 'contain' }} priority />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave — agora com altura maior para não cobrir os stats */}
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, lineHeight: 0 }}>
          <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'block' }}>
            <path d="M0 100L1440 100L1440 60C1440 60 1200 10 720 10C240 10 0 60 0 60L0 100Z" fill="white" />
          </svg>
        </div>

        <style>{`
          @keyframes spin { from { transform: translateY(-50%) rotate(0deg); } to { transform: translateY(-50%) rotate(360deg); } }
          @media (max-width: 768px) { .hero-logo { display: none !important; } }
        `}</style>
      </section>

      {/* ── LEMA ── */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: 800 }}>
          <FaQuoteLeft size={40} style={{ color: '#F7A81B', marginBottom: 24 }} />
          <blockquote style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            color: '#002d61', fontWeight: 700, lineHeight: 1.4,
            fontStyle: 'italic', marginBottom: 20,
          }}>
            "O objetivo do Rotary é estimular e fomentar o ideal de servir, como base de todo empreendimento digno"
          </blockquote>
          <p style={{ color: '#6C757D', fontWeight: 600 }}>— Estatuto do Rotary International</p>
        </div>
      </section>

      {/* ── VALORES ── */}
      <section style={{ padding: '80px 0', background: '#F8F9FA' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: '#F7A81B', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>
              Nossos Pilares
            </p>
            <h2 className="section-title">Valores que nos Guiam</h2>
            <div className="divider" style={{ margin: '16px auto 0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '28px' }}>
            {valores.map((v, i) => (
              <div key={i} style={{
                background: 'white', borderRadius: 16, padding: '36px 28px',
                boxShadow: '0 4px 20px rgba(0,63,135,0.07)',
                border: '1px solid rgba(0,63,135,0.06)',
                transition: 'all 0.3s', cursor: 'default',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,63,135,0.14)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'none';
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 20px rgba(0,63,135,0.07)';
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: 16,
                  background: 'linear-gradient(135deg, #003F87, #1A5CA8)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#F7A81B', marginBottom: 20,
                }}>
                  {v.icon}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', color: '#002d61', marginBottom: 10 }}>{v.titulo}</h3>
                <p style={{ color: '#6C757D', fontSize: '0.92rem', lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIRETORIA ── */}
      <section style={{ padding: '80px 0', background: 'white' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <p style={{ color: '#F7A81B', fontWeight: 700, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>
              Gestão 2025/2026
            </p>
            <h2 className="section-title">Diretoria Atual</h2>
            <p style={{ color: '#6C757D', marginTop: 8 }}>Lema: "Unidos para Fazer o Bem"</p>
            <div className="divider" style={{ margin: '16px auto 0' }} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', maxWidth: 900, margin: '0 auto' }}>
            {diretoria.map((d, i) => (
              <div key={i} style={{
                background: i === 0 ? 'linear-gradient(135deg, #002d61, #003F87)' : 'white',
                border: '1px solid rgba(0,63,135,0.1)',
                borderRadius: 16, padding: '28px 24px', textAlign: 'center',
                boxShadow: i === 0 ? '0 8px 32px rgba(0,63,135,0.25)' : '0 4px 16px rgba(0,63,135,0.06)',
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: i === 0 ? 'rgba(247,168,27,0.2)' : '#F0F4FF',
                  margin: '0 auto 16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem', color: '#F7A81B', fontFamily: "'Playfair Display', serif", fontWeight: 700,
                }}>
                  {d.nome.charAt(0)}
                </div>
                <p style={{
                  fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '1px', color: '#F7A81B', marginBottom: 8,
                }}>
                  {d.cargo}
                </p>
                <p style={{
                  fontFamily: "'Playfair Display', serif", fontWeight: 600,
                  fontSize: '0.95rem', color: i === 0 ? 'white' : '#002d61',
                }}>
                  {d.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: '80px 0',
        background: 'linear-gradient(135deg, #F7A81B 0%, #FAC253 100%)',
      }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: '#002d61', marginBottom: 16 }}>
            Faça Parte do Rotary
          </h2>
          <p style={{ color: 'rgba(0,45,97,0.75)', fontSize: '1.05rem', maxWidth: 520, margin: '0 auto 36px' }}>
            Junte-se a nós e contribua para um mundo melhor através do serviço voluntário e da liderança ética.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contato" style={{
              background: '#002d61', color: 'white',
              fontWeight: 700, padding: '14px 36px', borderRadius: 8, fontSize: '1rem',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 10,
              boxShadow: '0 8px 24px rgba(0,45,97,0.25)', transition: 'all 0.2s',
            }}>
              Entre em Contato <FaArrowRight />
            </Link>
            <Link href="/transparencia" style={{
              background: 'transparent', color: '#002d61',
              fontWeight: 700, padding: '13px 32px', borderRadius: 8, fontSize: '1rem',
              border: '2px solid #002d61', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}>
              Ver Documentos
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}