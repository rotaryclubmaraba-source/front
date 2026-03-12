'use client';

import PublicLayout from '@/components/PublicLayout';
import { FaMapMarkerAlt, FaPhone, FaFacebook, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

export default function ContatoPage() {
  return (
    <PublicLayout>
      <section style={{
        background: 'linear-gradient(135deg, #001e4d 0%, #002d61 50%, #003F87 100%)',
        padding: '72px 0 56px', color: 'white',
      }}>
        <div className="container">
          <p style={{ color: '#F7A81B', fontWeight: 700, fontSize: '0.82rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: 12 }}>
            Fale Conosco
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 900 }}>
            Contato
          </h1>
        </div>
      </section>

      <section style={{ padding: '72px 0', background: 'white' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#002d61', marginBottom: 24 }}>
                Entre em Contato
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaMapMarkerAlt style={{ color: '#003F87', fontSize: 18 }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#002d61', marginBottom: 4 }}>Endereço</strong>
                    <p style={{ color: '#6C757D', lineHeight: 1.7 }}>Folha 29, Quadra Especial, Nova Marabá<br />Marabá – PA, CEP: 68.514-500</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaPhone style={{ color: '#003F87', fontSize: 18 }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#002d61', marginBottom: 4 }}>Telefone / WhatsApp</strong>
                    <a href="tel:+5594981125200" style={{ color: '#003F87', fontWeight: 600 }}>+55 (94) 98112-5200</a>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                  <div style={{ width: 48, height: 48, borderRadius: 12, background: '#F0F4FF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FaEnvelope style={{ color: '#003F87', fontSize: 18 }} />
                  </div>
                  <div>
                    <strong style={{ display: 'block', color: '#002d61', marginBottom: 4 }}>Presidente 2025/2026</strong>
                    <p style={{ color: '#6C757D' }}>Marcus Vinícius Abreu de Sousa</p>
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 40 }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#002d61', marginBottom: 16 }}>Redes Sociais</h3>
                <div style={{ display: 'flex', gap: 12 }}>
                  {[
                    { icon: <FaFacebook size={20} />, href: 'https://www.facebook.com/share/1C4EPmNkbd/', label: 'Facebook' },
                    { icon: <FaInstagram size={20} />, href: 'https://www.instagram.com/rotaryclubmaraba', label: 'Instagram' },
                    { icon: <FaWhatsapp size={20} />, href: 'https://wa.me/5594981125200', label: 'WhatsApp' },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      style={{
                        width: 48, height: 48, borderRadius: 12,
                        background: '#003F87', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', transition: 'all 0.2s',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.background = '#F7A81B')}
                      onMouseLeave={e => (e.currentTarget.style.background = '#003F87')}
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div style={{
              background: '#F8F9FA', borderRadius: 20, padding: '40px',
              border: '1px solid #E9ECEF',
            }}>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: '#002d61', marginBottom: 24 }}>
                Informações Legais
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { label: 'Nome Empresarial', value: 'Rotary Club de Marabá' },
                  { label: 'CNPJ', value: '07.506.591/0001-12' },
                  { label: 'Natureza Jurídica', value: '399-9 – Associação Privada' },
                  { label: 'Atividade Principal', value: '94.30-8-00 – Atividades de associações de defesa de direitos sociais' },
                  { label: 'Data de Abertura', value: '26 de abril de 2005' },
                  { label: 'Situação Cadastral', value: 'ATIVA', color: '#4ade80' },
                ].map((item) => (
                  <div key={item.label} style={{
                    paddingBottom: 16, borderBottom: '1px solid #E9ECEF',
                  }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: '#F7A81B', marginBottom: 4 }}>
                      {item.label}
                    </span>
                    <span style={{ color: (item as any).color || '#002d61', fontWeight: 600, fontSize: '0.95rem' }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`@media (max-width: 768px) { .grid-2 { grid-template-columns: 1fr !important; } }`}</style>
    </PublicLayout>
  );
}
