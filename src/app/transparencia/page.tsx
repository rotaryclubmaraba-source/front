'use client';

import { useState, useEffect } from 'react';
import PublicLayout from '@/components/PublicLayout';
import { listarDocumentosPublicos, downloadDocumento } from '@/lib/api';
import { Documento } from '@/types';
import { FaFilePdf, FaFileWord, FaFileAlt, FaDownload, FaSearch, FaFilter, FaShieldAlt } from 'react-icons/fa';

const categorias = ['Todos', 'ata', 'balancete', 'relatorio', 'estatuto', 'outros'];

function getFileIcon(tipo: string) {
  if (tipo?.includes('pdf')) return <FaFilePdf size={22} style={{ color: '#dc3545' }} />;
  if (tipo?.includes('word') || tipo?.includes('docx')) return <FaFileWord size={22} style={{ color: '#2b579a' }} />;
  return <FaFileAlt size={22} style={{ color: '#6c757d' }} />;
}

function formatBytes(bytes: number) {
  if (!bytes) return '–';
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function formatDate(dateStr?: string) {
  if (!dateStr) return '–';
  return new Date(dateStr).toLocaleDateString('pt-BR');
}

function catLabel(cat: string) {
  const map: Record<string, string> = {
    ata: 'Ata', balancete: 'Balancete', relatorio: 'Relatório',
    estatuto: 'Estatuto', outros: 'Outros',
  };
  return map[cat] || cat;
}

export default function TransparenciaPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [categoria, setCategoria] = useState('Todos');

  useEffect(() => {
    listarDocumentosPublicos()
      .then((res) => setDocumentos(res.data.documentos || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtrados = documentos.filter((d) => {
    const matchBusca = d.titulo.toLowerCase().includes(busca.toLowerCase());
    const matchCat = categoria === 'Todos' || d.categoria === categoria;
    return matchBusca && matchCat;
  });

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
              <FaShieldAlt size={28} style={{ color: '#F7A81B' }} />
            </div>
            <div>
              <p style={{ color: '#F7A81B', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '2px' }}>
                Transparência Institucional
              </p>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900 }}>
                Portal de Transparência
              </h1>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '1rem', maxWidth: 600 }}>
            Acesse os documentos institucionais do Rotary Club de Marabá: atas, balancetes, relatórios e estatuto social.
          </p>
        </div>
      </section>

      {/* Filtros */}
      <section style={{ padding: '32px 0', background: '#F8F9FA', borderBottom: '1px solid #DEE2E6' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            {/* Busca */}
            <div style={{ position: 'relative', flex: '1 1 280px', minWidth: 200 }}>
              <FaSearch style={{
                position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)',
                color: '#ADB5BD', pointerEvents: 'none',
              }} />
              <input
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                placeholder="Buscar documento..."
                style={{
                  width: '100%', padding: '11px 16px 11px 42px',
                  border: '1.5px solid #DEE2E6', borderRadius: 8,
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem',
                  outline: 'none', background: 'white',
                  transition: 'border 0.2s',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#003F87')}
                onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')}
              />
            </div>

            {/* Categorias */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              <FaFilter style={{ color: '#6C757D', fontSize: 14 }} />
              {categorias.map((c) => (
                <button key={c} onClick={() => setCategoria(c)} style={{
                  padding: '8px 16px', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600,
                  cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'Source Sans 3', sans-serif",
                  background: categoria === c ? '#003F87' : 'white',
                  color: categoria === c ? 'white' : '#495057',
                  border: categoria === c ? '1.5px solid #003F87' : '1.5px solid #DEE2E6',
                }}>
                  {c === 'Todos' ? 'Todos' : catLabel(c)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Documentos */}
      <section style={{ padding: '48px 0 80px', background: 'white' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0' }}>
              <div style={{
                width: 48, height: 48, borderRadius: '50%',
                border: '4px solid #DEE2E6', borderTopColor: '#003F87',
                animation: 'spin 0.8s linear infinite', margin: '0 auto 20px',
              }} />
              <p style={{ color: '#6C757D' }}>Carregando documentos...</p>
            </div>
          ) : filtrados.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <FaFileAlt size={56} style={{ color: '#DEE2E6', marginBottom: 20 }} />
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#495057', marginBottom: 8 }}>
                Nenhum documento encontrado
              </h3>
              <p style={{ color: '#ADB5BD' }}>Tente ajustar os filtros ou a busca.</p>
            </div>
          ) : (
            <>
              <p style={{ color: '#6C757D', marginBottom: 28, fontSize: '0.92rem' }}>
                {filtrados.length} documento{filtrados.length !== 1 ? 's' : ''} encontrado{filtrados.length !== 1 ? 's' : ''}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                {filtrados.map((doc) => (
                  <div key={doc.id} style={{
                    background: 'white', borderRadius: 12,
                    border: '1.5px solid #E9ECEF',
                    padding: '24px', transition: 'all 0.25s',
                    display: 'flex', flexDirection: 'column',
                  }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#003F87';
                      (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,63,135,0.1)';
                      (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLElement).style.borderColor = '#E9ECEF';
                      (e.currentTarget as HTMLElement).style.boxShadow = 'none';
                      (e.currentTarget as HTMLElement).style.transform = 'none';
                    }}
                  >
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', flex: 1 }}>
                      <div style={{
                        width: 48, height: 48, borderRadius: 10,
                        background: '#F8F9FA', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, border: '1px solid #E9ECEF',
                      }}>
                        {getFileIcon(doc.tipoArquivo)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{
                          fontFamily: "'Playfair Display', serif", fontSize: '1rem',
                          color: '#002d61', marginBottom: 6, lineHeight: 1.3,
                        }}>
                          {doc.titulo}
                        </h3>
                        {doc.nota && (
                          <p style={{ fontSize: '0.84rem', color: '#6C757D', marginBottom: 8 }}>{doc.nota}</p>
                        )}
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                          <span style={{
                            background: '#F0F4FF', color: '#003F87',
                            fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                          }}>
                            {catLabel(doc.categoria)}
                          </span>
                          <span style={{ color: '#ADB5BD', fontSize: '0.78rem' }}>
                            {formatDate(doc.data || doc.criadoEm)}
                          </span>
                          <span style={{ color: '#ADB5BD', fontSize: '0.78rem' }}>
                            {formatBytes(doc.tamanhoArquivo)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {doc.urlPublica && (
                      <div style={{ marginTop: 18, paddingTop: 16, borderTop: '1px solid #F1F3F5' }}>
                        <a
                          href={doc.urlPublica}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            color: '#003F87', fontWeight: 700, fontSize: '0.88rem',
                            transition: 'color 0.2s',
                          }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#F7A81B')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#003F87')}
                        >
                          <FaDownload size={14} /> Baixar Documento
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </PublicLayout>
  );
}
