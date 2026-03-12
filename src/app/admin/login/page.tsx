'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/lib/AuthContext';
import toast from 'react-hot-toast';
import { FaLock, FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, senha);
      toast.success('Login realizado com sucesso!');
      router.push('/admin/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.erro || 'Email ou senha incorretos');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #001e4d 0%, #002d61 50%, #003F87 100%)',
      padding: 24,
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(rgba(247,168,27,0.05) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{
        background: 'white', borderRadius: 24, padding: '48px 40px',
        width: '100%', maxWidth: 420,
        boxShadow: '0 32px 80px rgba(0,0,0,0.3)',
        position: 'relative', zIndex: 1,
      }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{
            width: 80, height: 80, borderRadius: '50%',
            background: 'linear-gradient(135deg, #003F87, #1A5CA8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', padding: 10,
            boxShadow: '0 8px 24px rgba(0,63,135,0.25)',
          }}>
            <Image src="/rotary-logo.png" alt="Rotary" width={60} height={60} style={{ objectFit: 'contain' }} />
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#002d61', marginBottom: 4 }}>
            Painel Administrativo
          </h1>
          <p style={{ color: '#6C757D', fontSize: '0.88rem' }}>Rotary Club de Marabá</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#495057', fontSize: '0.88rem', marginBottom: 8 }}>
              E-mail
            </label>
            <div style={{ position: 'relative' }}>
              <FaEnvelope style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#ADB5BD' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="seu@email.com"
                style={{
                  width: '100%', padding: '13px 16px 13px 42px',
                  border: '1.5px solid #DEE2E6', borderRadius: 10,
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.95rem',
                  outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#003F87')}
                onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')}
              />
            </div>
          </div>

          <div style={{ marginBottom: 28 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#495057', fontSize: '0.88rem', marginBottom: 8 }}>
              Senha
            </label>
            <div style={{ position: 'relative' }}>
              <FaLock style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#ADB5BD' }} />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '13px 44px 13px 42px',
                  border: '1.5px solid #DEE2E6', borderRadius: 10,
                  fontFamily: "'Source Sans 3', sans-serif", fontSize: '0.95rem',
                  outline: 'none', transition: 'border 0.2s', boxSizing: 'border-box',
                }}
                onFocus={e => (e.currentTarget.style.borderColor = '#003F87')}
                onBlur={e => (e.currentTarget.style.borderColor = '#DEE2E6')}
              />
              <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)} style={{
                position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', cursor: 'pointer', color: '#ADB5BD',
              }}>
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px',
            background: loading ? '#ADB5BD' : 'linear-gradient(135deg, #003F87, #1A5CA8)',
            color: 'white', fontFamily: "'Source Sans 3', sans-serif",
            fontWeight: 700, fontSize: '1rem', border: 'none', borderRadius: 10,
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'all 0.2s', boxShadow: loading ? 'none' : '0 4px 16px rgba(0,63,135,0.3)',
          }}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: 24 }}>
          <a href="/" style={{ color: '#6C757D', fontSize: '0.85rem', transition: 'color 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#003F87')}
            onMouseLeave={e => (e.currentTarget.style.color = '#6C757D')}
          >
            ← Voltar ao site
          </a>
        </div>
      </div>
    </div>
  );
}
