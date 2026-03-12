'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import PublicLayout from '@/components/PublicLayout';
import { listarGaleria } from '@/lib/api';
import { Imagem } from '@/types';
import { FaImages, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const paginas = [
  { value: '', label: 'Todas as Fotos' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'projetos', label: 'Projetos' },
  { value: 'reunioes', label: 'Reuniões' },
  { value: 'outros', label: 'Outros' },
];

export default function GaleriaPage() {
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [paginaFiltro, setPaginaFiltro] = useState('');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    listarGaleria(paginaFiltro || undefined)
      .then((res) => setImagens(res.data.imagens || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [paginaFiltro]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightbox === null) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((p) => (p! + 1) % imagens.length);
      if (e.key === 'ArrowLeft') setLightbox((p) => (p! - 1 + imagens.length) % imagens.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, imagens.length]);

  return (
    <PublicLayout>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #001e4d 0%, #002d61 50%, #003F87 100%)',
        padding: '72px 0 56px', color: 'white',
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: 'rgba(247,168,27,0.15)', border: '1px solid rgba(247,168,27,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <FaImages size={28} style={{ color: '#F7A81B' }} />
            </div>
            <div>
              <p style={{ color: '#F7A81B', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Registros Fotográficos
              </p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900 }}>
                Galeria de Fotos
              </h1>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', maxWidth: 600 }}>
            Momentos especiais do Rotary Club de Marabá — eventos, projetos e reuniões que fazem parte da nossa história.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section style={{ padding: '28px 0', background: '#F8F9FA', borderBottom: '1px solid #DEE2E6' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {paginas.map((p) => (
              <button key={p.value} onClick={() => setPaginaFiltro(p.value)} style={{
                padding: '8px 20px', borderRadius: 100, fontSize: '0.88rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Source Sans 3', sans-serif",
                background: paginaFiltro === p.value ? '#003F87' : 'white',
                color: paginaFiltro === p.value ? 'white' : '#495057',
                border: paginaFiltro === p.value ? '1.5px solid #003F87' : '1.5px solid #DEE2E6',
              }}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section style={{ padding: '48px 0 80px', background: 'white' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '4px solid #DEE2E6', borderTopColor: '#003F87',
                animation: 'spin 0.8s linear infinite', margin: '0 auto 20px',
              }} />
              <p style={{ color: '#6C757D' }}>Carregando imagens...</p>
            </div>
          ) : imagens.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <FaImages size={56} style={{ color: '#DEE2E6', marginBottom: 20 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#495057', marginBottom: 8 }}>
                Nenhuma imagem encontrada
              </h3>
              <p style={{ color: '#ADB5BD' }}>Ainda não há imagens nesta categoria.</p>
            </div>
          ) : (
            <>
              <p style={{ color: '#6C757D', marginBottom: 28, fontSize: '0.92rem' }}>
                {imagens.length} foto{imagens.length !== 1 ? 's' : ''}
              </p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                gap: '16px',
              }}>
                {imagens.map((img, i) => (
                  <div
                    key={img.id}
                    onClick={() => setLightbox(i)}
                    style={{
                      position: 'relative', aspectRatio: '4/3', borderRadius: 12,
                      overflow: 'hidden', cursor: 'pointer',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
                      transition: 'transform 0.3s, box-shadow 0.3s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1.02)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.2)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.transform = 'scale(1)';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)';
                    }}
                  >
                    <Image
                      src={img.urlPublica}
                      alt={img.titulo}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 50%)',
                      opacity: 0, transition: 'opacity 0.3s',
                    }}
                      className="overlay"
                    />
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      padding: '16px', opacity: 0, transition: 'opacity 0.3s',
                    }}
                      className="overlay-text"
                    >
                      <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem' }}>{img.titulo}</p>
                    </div>
                    <style>{`.overlay:hover, div:hover .overlay, div:hover .overlay-text { opacity: 1 !important; }`}</style>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox !== null && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 9999,
          background: 'rgba(0,0,0,0.95)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
          onClick={() => setLightbox(null)}
        >
          {/* Close */}
          <button style={{
            position: 'fixed', top: 20, right: 20,
            background: 'rgba(255,255,255,0.1)', border: 'none',
            color: 'white', width: 44, height: 44, borderRadius: '50%',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <FaTimes size={18} />
          </button>

          {/* Prev */}
          <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! - 1 + imagens.length) % imagens.length); }}
            style={{
              position: 'fixed', left: 20, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: 'white', width: 48, height: 48, borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <FaChevronLeft size={20} />
          </button>

          {/* Image */}
          <div style={{ maxWidth: '90vw', maxHeight: '88vh', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={imagens[lightbox].urlPublica}
              alt={imagens[lightbox].titulo}
              style={{
                maxWidth: '90vw', maxHeight: '88vh',
                objectFit: 'contain', borderRadius: 8,
              }}
            />
            <p style={{
              textAlign: 'center', color: 'rgba(255,255,255,0.8)',
              marginTop: 12, fontSize: '0.92rem',
            }}>
              {imagens[lightbox].titulo}
            </p>
          </div>

          {/* Next */}
          <button onClick={(e) => { e.stopPropagation(); setLightbox((p) => (p! + 1) % imagens.length); }}
            style={{
              position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)',
              background: 'rgba(255,255,255,0.1)', border: 'none',
              color: 'white', width: 48, height: 48, borderRadius: '50%',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
            <FaChevronRight size={20} />
          </button>

          {/* Counter */}
          <div style={{
            position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)',
            color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem',
          }}>
            {lightbox + 1} / {imagens.length}
          </div>
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </PublicLayout>
  );
}
