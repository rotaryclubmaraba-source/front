'use client';

import { useState, useEffect, useCallback } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { listarDocumentosAdmin, criarDocumento, deletarDocumento, atualizarDocumento } from '@/lib/api';
import { Documento } from '@/types';
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import {
  FaPlus, FaTrash, FaEdit, FaFilePdf, FaFileWord, FaFileAlt,
  FaUpload, FaTimes, FaSearch, FaDownload,
} from 'react-icons/fa';

const categorias = ['ata', 'balancete', 'relatorio', 'estatuto', 'outros'];
const catLabels: Record<string, string> = {
  ata: 'Ata', balancete: 'Balancete', relatorio: 'Relatório', estatuto: 'Estatuto', outros: 'Outros',
};

function getIcon(tipo: string) {
  if (tipo?.includes('pdf')) return <FaFilePdf style={{ color: '#dc3545' }} />;
  if (tipo?.includes('word')) return <FaFileWord style={{ color: '#2b579a' }} />;
  return <FaFileAlt style={{ color: '#6c757d' }} />;
}

function formatBytes(b: number) {
  if (!b) return '–';
  if (b < 1048576) return `${(b / 1024).toFixed(0)} KB`;
  return `${(b / 1048576).toFixed(1)} MB`;
}

export default function AdminDocumentosPage() {
  const [documentos, setDocumentos] = useState<Documento[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editDoc, setEditDoc] = useState<Documento | null>(null);
  const [saving, setSaving] = useState(false);

  // Form state
  const [titulo, setTitulo] = useState('');
  const [categoria, setCategoria] = useState('ata');
  const [nota, setNota] = useState('');
  const [data, setData] = useState('');
  const [arquivo, setArquivo] = useState<File | null>(null);

  const fetchDocs = () => {
    setLoading(true);
    listarDocumentosAdmin()
      .then((r) => setDocumentos(r.data.documentos || []))
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(fetchDocs, []);

  const onDrop = useCallback((files: File[]) => {
    if (files[0]) setArquivo(files[0]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
    },
  });

  const openCreate = () => {
    setEditDoc(null);
    setTitulo(''); setCategoria('ata'); setNota(''); setData(''); setArquivo(null);
    setShowModal(true);
  };

  const openEdit = (doc: Documento) => {
    setEditDoc(doc);
    setTitulo(doc.titulo);
    setCategoria(doc.categoria);
    setNota(doc.nota || '');
    setData(doc.data ? doc.data.slice(0, 10) : '');
    setArquivo(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    if (!titulo || !categoria || !data) { toast.error('Preencha todos os campos obrigatórios'); return; }
    if (!editDoc && !arquivo) { toast.error('Selecione um arquivo'); return; }
    setSaving(true);
    try {
      if (editDoc) {
        await atualizarDocumento(editDoc.id, { titulo, categoria, nota, data });
        toast.success('Documento atualizado!');
      } else {
        const fd = new FormData();
        fd.append('titulo', titulo);
        fd.append('categoria', categoria);
        fd.append('nota', nota);
        fd.append('data', data);
        fd.append('arquivo', arquivo!);
        await criarDocumento(fd);
        toast.success('Documento publicado!');
      }
      setShowModal(false);
      fetchDocs();
    } catch (err: any) {
      toast.error(err.response?.data?.erro || 'Erro ao salvar');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, titulo: string) => {
    if (!confirm(`Excluir "${titulo}"?`)) return;
    try {
      await deletarDocumento(id);
      toast.success('Documento excluído');
      fetchDocs();
    } catch {
      toast.error('Erro ao excluir');
    }
  };

  const filtrados = documentos.filter(d => d.titulo.toLowerCase().includes(busca.toLowerCase()));

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#002d61', marginBottom: 6 }}>
            Documentos
          </h1>
          <p style={{ color: '#6C757D', fontSize: '0.92rem' }}>
            Gerencie documentos do Portal de Transparência
          </p>
        </div>
        <button onClick={openCreate} style={{
          background: '#003F87', color: 'white', border: 'none', borderRadius: 10,
          padding: '12px 24px', fontFamily: "'Source Sans 3', sans-serif",
          fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
          display: 'flex', alignItems: 'center', gap: 8,
          boxShadow: '0 4px 16px rgba(0,63,135,0.25)',
        }}>
          <FaPlus /> Novo Documento
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 24, maxWidth: 360 }}>
        <FaSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#ADB5BD' }} />
        <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Buscar..."
          style={{
            width: '100%', padding: '11px 16px 11px 42px',
            border: '1.5px solid #DEE2E6', borderRadius: 8,
            fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none',
            boxSizing: 'border-box',
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#003F87')}
          onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: 16, overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,63,135,0.07)', border: '1px solid rgba(0,63,135,0.06)' }}>
        {loading ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#ADB5BD' }}>Carregando...</div>
        ) : filtrados.length === 0 ? (
          <div style={{ padding: '60px', textAlign: 'center', color: '#ADB5BD' }}>
            <FaFileAlt size={40} style={{ marginBottom: 16, opacity: 0.3 }} />
            <p>Nenhum documento encontrado</p>
          </div>
        ) : (
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#F8F9FA', borderBottom: '1px solid #E9ECEF' }}>
                {['Documento', 'Categoria', 'Data', 'Tamanho', 'Status', 'Ações'].map(h => (
                  <th key={h} style={{ padding: '14px 16px', textAlign: 'left', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', color: '#6C757D' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtrados.map((doc, i) => (
                <tr key={doc.id} style={{ borderBottom: i < filtrados.length - 1 ? '1px solid #F1F3F5' : 'none', transition: 'background 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#FAFBFF')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'white')}
                >
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{getIcon(doc.tipoArquivo)}</span>
                      <div>
                        <p style={{ fontWeight: 600, color: '#002d61', fontSize: '0.92rem', marginBottom: 2 }}>{doc.titulo}</p>
                        {doc.nota && <p style={{ color: '#ADB5BD', fontSize: '0.78rem' }}>{doc.nota}</p>}
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{ background: '#F0F4FF', color: '#003F87', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100 }}>
                      {catLabels[doc.categoria] || doc.categoria}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px', color: '#6C757D', fontSize: '0.88rem' }}>
                    {doc.data ? new Date(doc.data).toLocaleDateString('pt-BR') : '–'}
                  </td>
                  <td style={{ padding: '14px 16px', color: '#6C757D', fontSize: '0.88rem' }}>
                    {formatBytes(doc.tamanhoArquivo)}
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <span style={{
                      fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: 100,
                      background: doc.status === 'ativo' ? '#d4edda' : '#f8d7da',
                      color: doc.status === 'ativo' ? '#155724' : '#721c24',
                    }}>
                      {doc.status === 'ativo' ? 'Ativo' : 'Inativo'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {doc.urlPublica && (
                        <a href={doc.urlPublica} target="_blank" rel="noopener noreferrer"
                          style={{ width: 32, height: 32, borderRadius: 8, background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003F87', transition: 'all 0.2s' }}
                          title="Download">
                          <FaDownload size={13} />
                        </a>
                      )}
                      <button onClick={() => openEdit(doc)} title="Editar"
                        style={{ width: 32, height: 32, borderRadius: 8, background: '#FFF8E1', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F7A81B', transition: 'all 0.2s' }}>
                        <FaEdit size={13} />
                      </button>
                      <button onClick={() => handleDelete(doc.id, doc.titulo)} title="Excluir"
                        style={{ width: 32, height: 32, borderRadius: 8, background: '#FFF0F0', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#dc3545', transition: 'all 0.2s' }}>
                        <FaTrash size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <div style={{ background: 'white', borderRadius: 20, padding: '36px', width: '100%', maxWidth: 540, maxHeight: '90vh', overflow: 'auto', boxShadow: '0 24px 60px rgba(0,0,0,0.25)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', color: '#002d61' }}>
                {editDoc ? 'Editar Documento' : 'Novo Documento'}
              </h2>
              <button onClick={() => setShowModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6C757D', fontSize: 20 }}><FaTimes /></button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Título *</label>
                <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Ex: Ata de Reunião - Março 2025"
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #DEE2E6', borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#003F87')} onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Categoria *</label>
                  <select value={categoria} onChange={e => setCategoria(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #DEE2E6', borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', background: 'white', boxSizing: 'border-box' }}>
                    {categorias.map(c => <option key={c} value={c}>{catLabels[c]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Data *</label>
                  <input type="date" value={data} onChange={e => setData(e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #DEE2E6', borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', boxSizing: 'border-box' }}
                    onFocus={e => (e.currentTarget.style.borderColor = '#003F87')} onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Descrição (opcional)</label>
                <textarea value={nota} onChange={e => setNota(e.target.value)} rows={2}
                  placeholder="Breve descrição do documento..."
                  style={{ width: '100%', padding: '11px 14px', border: '1.5px solid #DEE2E6', borderRadius: 8, fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.92rem', outline: 'none', resize: 'vertical', boxSizing: 'border-box' }}
                  onFocus={e => (e.currentTarget.style.borderColor = '#003F87')} onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')} />
              </div>

              {!editDoc && (
                <div>
                  <label style={{ display: 'block', fontWeight: 600, fontSize: '0.88rem', color: '#495057', marginBottom: 6 }}>Arquivo * (PDF, DOC, DOCX)</label>
                  <div {...getRootProps()} style={{
                    border: `2px dashed ${isDragActive ? '#003F87' : '#DEE2E6'}`,
                    borderRadius: 10, padding: '24px', textAlign: 'center', cursor: 'pointer',
                    background: isDragActive ? '#F0F4FF' : '#FAFAFA', transition: 'all 0.2s',
                  }}>
                    <input {...getInputProps()} />
                    {arquivo ? (
                      <div style={{ color: '#003F87' }}>
                        <FaFileAlt size={24} style={{ marginBottom: 8 }} />
                        <p style={{ fontWeight: 600, fontSize: '0.92rem' }}>{arquivo.name}</p>
                        <p style={{ color: '#ADB5BD', fontSize: '0.8rem' }}>{formatBytes(arquivo.size)}</p>
                      </div>
                    ) : (
                      <div style={{ color: '#ADB5BD' }}>
                        <FaUpload size={24} style={{ marginBottom: 8 }} />
                        <p style={{ fontSize: '0.9rem' }}>Arraste o arquivo ou clique para selecionar</p>
                        <p style={{ fontSize: '0.8rem', marginTop: 4 }}>PDF, DOC, DOCX (máx. 10MB)</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12, marginTop: 28, justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{
                padding: '11px 24px', border: '1.5px solid #DEE2E6', borderRadius: 8,
                background: 'white', cursor: 'pointer', fontFamily: "'Source Sans 3', sans-serif", fontWeight: 600,
              }}>
                Cancelar
              </button>
              <button onClick={handleSave} disabled={saving} style={{
                padding: '11px 28px', background: saving ? '#ADB5BD' : '#003F87',
                color: 'white', border: 'none', borderRadius: 8,
                fontFamily: "'Source Sans 3', sans-serif", fontWeight: 700, cursor: saving ? 'not-allowed' : 'pointer',
              }}>
                {saving ? 'Salvando...' : editDoc ? 'Salvar Alterações' : 'Publicar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
