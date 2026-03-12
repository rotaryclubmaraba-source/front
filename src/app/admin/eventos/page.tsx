'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import { listarGaleriaAdmin, uploadImagem, deletarImagem } from '@/lib/api';
import { Imagem } from '@/types';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { FaPlus, FaTrash, FaCalendarAlt, FaUpload, FaTimes } from 'react-icons/fa';

export default function AdminEventosPage() {
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const fetchImgs = () => {
    setLoading(true);
    listarGaleriaAdmin()
      .then(r => {
        const eventos = (r.data.imagens || []).filter((i: Imagem) => i.pagina === 'eventos');
        setImagens(eventos);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(fetchImgs, []);

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) { setArquivo(files[0]); setPreview(URL.createObjectURL(files[0])); }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
  });

  const handleUpload = async () => {
    if (!arquivo) { toast.error('Selecione uma imagem'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('arquivo', arquivo);
      fd.append('titulo', titulo || arquivo.name);
      fd.append('pagina', 'eventos');
      await uploadImagem(fd);
      toast.success('Evento publicado!');
      setShowModal(false);
      setArquivo(null); setPreview(null); setTitulo('');
      fetchImgs();
    } catch (err: any) {
      toast.error(err.response?.data?.erro || 'Erro ao fazer upload');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remover esta foto do evento?')) return;
    try { await deletarImagem(id); toast.success('Removida'); fetchImgs(); }
    catch { toast.error('Erro ao remover'); }
  };

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#002d61', marginBottom: 6 }}>Galeria de Eventos</h1>
          <p style={{ color: '#6C757D', fontSize: '0.92rem' }}>Fotos publicadas na página de Eventos</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          background: '#F7A81B', color: '#002d61', border: 'none', borderRadius: 10,
          padding: '12px 24px', fontFamily: "'Source Sans 3', sans-serif",
          fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <FaPlus /> Adicionar Evento
        </button>
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#ADB5BD' }}>Carregando...</div>
      ) : imagens.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#ADB5BD' }}>
          <FaCalendarAlt size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
          <p>Nenhum evento publicado ainda</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {imagens.map(img => (
            <div key={img.id} style={{
              background: 'white', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,63,135,0.07)', border: '1px solid rgba(0,63,135,0.06)',
            }}>
              <div style={{ position: 'relative', aspectRatio: '16/10' }}>
                <Image src={img.urlPublica} alt={img.titulo} fill style={{ objectFit: 'cover' }} sizes="240px" />
              </div>
              <div style={{ padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <p style={{ fontWeight: 600, color: '#002d61', fontSize: '0.88rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: 1, marginRight: 8 }}>
                  {img.titulo}
                </p>
                <button onClick={() => handleDelete(img.id)}
                  style={{ background: '#FFF0F0', border: 'none', cursor: 'pointer', width: 30, height: 30, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc3545', flexShrink: 0 }}>
                  <FaTrash size={12} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '36px', width: '100%', maxWidth: 460, boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#002d61' }}>Nova Foto de Evento</h2>
              <button onClick={() => { setShowModal(false); setArquivo(null); setPreview(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6C757D', fontSize: 20 }}>
                <FaTimes />
              </button>
            </div>

            <div {...getRootProps()} style={{
              border: `2px dashed ${isDragActive ? '#F7A81B' : '#DEE2E6'}`,
              borderRadius: 12, overflow: 'hidden',
              background: isDragActive ? '#FFF8E1' : '#FAFAFA',
              cursor: 'pointer', marginBottom: 20,
              minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <input {...getInputProps()} />
              {preview ? (
                <img src={preview} alt="preview" style={{ width: '100%', maxHeight: 200, objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ textAlign: 'center', padding: 32, color: '#ADB5BD' }}>
                  <FaUpload size={32} style={{ marginBottom: 12 }} />
                  <p style={{ fontSize: '0.9rem' }}>Arraste a imagem ou clique aqui</p>
                </div>
              )}
            </div>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Título do Evento</label>
              <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ex: Confraternização Rotary 2025"
                style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #DEE2E6', borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                onFocus={e => (e.currentTarget.style.borderColor = '#F7A81B')} onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')} />
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowModal(false); setArquivo(null); setPreview(null); }}
                style={{ padding: '11px 24px', border: '1.5px solid #DEE2E6', borderRadius: 8, background: 'white', cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                Cancelar
              </button>
              <button onClick={handleUpload} disabled={uploading || !arquivo} style={{
                padding: '11px 28px', background: uploading || !arquivo ? '#ADB5BD' : '#F7A81B',
                color: '#002d61', border: 'none', borderRadius: 8,
                fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, cursor: uploading || !arquivo ? 'not-allowed' : 'pointer',
              }}>
                {uploading ? 'Enviando...' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
