'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import AdminLayout from '@/components/AdminLayout';
import { listarGaleriaAdmin, uploadImagem, deletarImagem } from '@/lib/api';
import { Imagem } from '@/types';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { FaPlus, FaTrash, FaImages, FaUpload, FaTimes } from 'react-icons/fa';

const paginas = [
  { value: 'galeria', label: 'Galeria Geral' },
  { value: 'eventos', label: 'Eventos' },
  { value: 'projetos', label: 'Projetos' },
  { value: 'reunioes', label: 'Reuniões' },
  { value: 'outros', label: 'Outros' },
];

export default function AdminGaleriaPage() {
  const [imagens, setImagens] = useState<Imagem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [titulo, setTitulo] = useState('');
  const [paginaSel, setPaginaSel] = useState('galeria');
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [filtro, setFiltro] = useState('');

  const fetchImgs = () => {
    setLoading(true);
    listarGaleriaAdmin()
      .then(r => setImagens(r.data.imagens || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(fetchImgs, []);

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) {
      setArquivo(files[0]);
      setPreview(URL.createObjectURL(files[0]));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop, multiple: false,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.gif'] },
  });

  const handleUpload = async () => {
    if (!arquivo) { toast.error('Selecione uma imagem'); return; }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('arquivo', arquivo);
      fd.append('titulo', titulo || arquivo.name);
      fd.append('pagina', paginaSel);
      await uploadImagem(fd);
      toast.success('Imagem publicada!');
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
    if (!confirm('Remover esta imagem?')) return;
    try {
      await deletarImagem(id);
      toast.success('Imagem removida');
      fetchImgs();
    } catch {
      toast.error('Erro ao remover');
    }
  };

  const filtradas = imagens.filter(img => filtro ? img.pagina === filtro : true);

  return (
    <AdminLayout>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#002d61', marginBottom: 6 }}>Galeria</h1>
          <p style={{ color: '#6C757D', fontSize: '0.92rem' }}>Gerencie as imagens da galeria pública</p>
        </div>
        <button onClick={() => setShowModal(true)} style={{
          background: '#003F87', color: 'white', border: 'none', borderRadius: 10,
          padding: '12px 24px', fontFamily: "'Source Sans 3', sans-serif",
          fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8, boxShadow: '0 4px 16px rgba(0,63,135,0.25)',
        }}>
          <FaPlus /> Adicionar Foto
        </button>
      </div>

      {/* Filtro */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 28 }}>
        <button onClick={() => setFiltro('')} style={{
          padding: '7px 16px', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
          background: !filtro ? '#003F87' : 'white', color: !filtro ? 'white' : '#495057',
          border: !filtro ? '1.5px solid #003F87' : '1.5px solid #DEE2E6', fontFamily: "'Source Sans 3', sans-serif",
        }}>Todas</button>
        {paginas.map(p => (
          <button key={p.value} onClick={() => setFiltro(p.value)} style={{
            padding: '7px 16px', borderRadius: 100, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
            background: filtro === p.value ? '#003F87' : 'white',
            color: filtro === p.value ? 'white' : '#495057',
            border: filtro === p.value ? '1.5px solid #003F87' : '1.5px solid #DEE2E6', fontFamily: "'Source Sans 3', sans-serif",
          }}>{p.label}</button>
        ))}
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#ADB5BD' }}>Carregando...</div>
      ) : filtradas.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px', color: '#ADB5BD' }}>
          <FaImages size={48} style={{ marginBottom: 16, opacity: 0.3 }} />
          <p>Nenhuma imagem encontrada</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16 }}>
          {filtradas.map(img => (
            <div key={img.id} style={{
              background: 'white', borderRadius: 14, overflow: 'hidden',
              boxShadow: '0 4px 16px rgba(0,63,135,0.07)',
              border: '1px solid rgba(0,63,135,0.06)', position: 'relative',
            }}>
              <div style={{ position: 'relative', aspectRatio: '4/3' }}>
                <Image src={img.urlPublica} alt={img.titulo} fill style={{ objectFit: 'cover' }} sizes="200px" />
              </div>
              <div style={{ padding: '12px 14px' }}>
                <p style={{ fontWeight: 600, color: '#002d61', fontSize: '0.88rem', marginBottom: 4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {img.titulo}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ background: '#F0F4FF', color: '#003F87', fontSize: '0.7rem', fontWeight: 700, padding: '2px 8px', borderRadius: 100 }}>
                    {paginas.find(p => p.value === img.pagina)?.label || img.pagina}
                  </span>
                  <button onClick={() => handleDelete(img.id)}
                    style={{ background: '#FFF0F0', border: 'none', cursor: 'pointer', width: 28, height: 28, borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc3545' }}>
                    <FaTrash size={11} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Upload */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '36px', width: '100%', maxWidth: 480, boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#002d61' }}>Adicionar Foto</h2>
              <button onClick={() => { setShowModal(false); setArquivo(null); setPreview(null); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6C757D', fontSize: 20 }}>
                <FaTimes />
              </button>
            </div>

            {/* Drop zone */}
            <div {...getRootProps()} style={{
              border: `2px dashed ${isDragActive ? '#003F87' : '#DEE2E6'}`,
              borderRadius: 12, overflow: 'hidden',
              background: isDragActive ? '#F0F4FF' : '#FAFAFA',
              cursor: 'pointer', marginBottom: 20, transition: 'all 0.2s',
              minHeight: 180, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <input {...getInputProps()} />
              {preview ? (
                <img src={preview} alt="preview" style={{ width: '100%', maxHeight: 220, objectFit: 'cover', display: 'block' }} />
              ) : (
                <div style={{ textAlign: 'center', padding: 32, color: '#ADB5BD' }}>
                  <FaUpload size={32} style={{ marginBottom: 12 }} />
                  <p style={{ fontSize: '0.9rem' }}>Arraste a imagem ou clique aqui</p>
                  <p style={{ fontSize: '0.78rem', marginTop: 6 }}>JPG, PNG, WEBP, GIF</p>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Título</label>
                <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Título da foto"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #DEE2E6', borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#003F87')} onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')} />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Seção *</label>
                <select value={paginaSel} onChange={e => setPaginaSel(e.target.value)}
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #DEE2E6', borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                  {paginas.map(p => <option key={p.value} value={p.value}>{p.label}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'flex-end' }}>
              <button onClick={() => { setShowModal(false); setArquivo(null); setPreview(null); }}
                style={{ padding: '11px 24px', border: '1.5px solid #DEE2E6', borderRadius: 8, background: 'white', cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600 }}>
                Cancelar
              </button>
              <button onClick={handleUpload} disabled={uploading || !arquivo} style={{
                padding: '11px 28px', background: uploading || !arquivo ? '#ADB5BD' : '#003F87',
                color: 'white', border: 'none', borderRadius: 8,
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
