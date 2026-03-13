import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaWhatsapp, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer style={{
      background: 'linear-gradient(135deg, #001e4d 0%, #002d61 50%, #003F87 100%)',
      color: 'white',
      padding: '64px 0 0',
    }}>
      {/* Gold line */}
      <div style={{ height: 4, background: 'linear-gradient(90deg, #F7A81B, #FAC253, #F7A81B)', marginBottom: 0 }} />

      <div className="container" style={{ paddingTop: 48 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%',
                background: 'white', display: 'flex', alignItems: 'center',
                justifyContent: 'center', padding: 5, flexShrink: 0,
              }}>
                <Image src="/rotary-logo.png" alt="Rotary" width={46} height={46} style={{ objectFit: 'contain' }} />
              </div>
              <div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.2rem', color: '#F7A81B' }}>
                  Rotary Club
                </div>
                <div style={{ fontSize: '0.78rem', opacity: 0.75, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  de Marabá
                </div>
              </div>
            </div>
            <p style={{ fontSize: '0.92rem', opacity: 0.75, lineHeight: 1.7, marginBottom: 20 }}>
              Membro do Rotary International desde 26/04/2005. Comprometidos com o serviço à humanidade e o bem-estar da comunidade de Marabá.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { icon: <FaFacebook />, href: 'https://www.facebook.com/share/1C4EPmNkbd/', label: 'Facebook' },
                { icon: <FaInstagram />, href: 'https://www.instagram.com/rotaryclubmaraba', label: 'Instagram' },
                { icon: <FaWhatsapp />, href: 'https://wa.me/5594981125200', label: 'WhatsApp' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: 8,
                    background: 'rgba(247, 168, 27, 0.15)',
                    border: '1px solid rgba(247, 168, 27, 0.3)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#F7A81B', fontSize: 18, transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = '#F7A81B';
                    (e.currentTarget as HTMLElement).style.color = '#002d61';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = 'rgba(247, 168, 27, 0.15)';
                    (e.currentTarget as HTMLElement).style.color = '#F7A81B';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links rápidos */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: 20, color: '#F7A81B' }}>
              Links Rápidos
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { href: '/', label: 'Página Inicial' },
                { href: '/transparencia', label: 'Portal de Transparência' },
                { href: '/galeria', label: 'Galeria de Fotos' },
                { href: '/eventos', label: 'Eventos' },
                { href: '/contato', label: 'Fale Conosco' },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} style={{
                    color: 'rgba(255,255,255,0.72)', fontSize: '0.92rem',
                    transition: 'color 0.2s', display: 'flex', alignItems: 'center', gap: 8,
                  }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F7A81B')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.72)')}
                  >
                    <span style={{ color: '#F7A81B', fontSize: 10 }}>▶</span>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informações legais */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: 20, color: '#F7A81B' }}>
              Informações
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: '0.88rem', opacity: 0.8 }}>
                <strong style={{ display: 'block', color: '#F7A81B', marginBottom: 2, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}>CNPJ</strong>
                07.506.591/0001-12
              </div>
              <div style={{ fontSize: '0.88rem', opacity: 0.8 }}>
                <strong style={{ display: 'block', color: '#F7A81B', marginBottom: 2, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}>Natureza Jurídica</strong>
                399-9 – Associação Privada
              </div>
              <div style={{ fontSize: '0.88rem', opacity: 0.8 }}>
                <strong style={{ display: 'block', color: '#F7A81B', marginBottom: 2, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}>Fundação</strong>
                26 de abril de 2005
              </div>
              <div style={{ fontSize: '0.88rem', opacity: 0.8 }}>
                <strong style={{ display: 'block', color: '#F7A81B', marginBottom: 2, fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: 1 }}>Situação Cadastral</strong>
                <span style={{ color: '#4ade80' }}>● Ativa</span>
              </div>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.1rem', marginBottom: 20, color: '#F7A81B' }}>
              Contato
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <FaMapMarkerAlt style={{ color: '#F7A81B', marginTop: 3, flexShrink: 0 }} />
                <span style={{ fontSize: '0.88rem', opacity: 0.8, lineHeight: 1.6 }}>
                  Av. Minas Gerais S/N - Belo Horizonte<br />
                  Marabá – PA, CEP: 68.514-500
                </span>
              </div>
              <a href="tel:+5594981125200" style={{ display: 'flex', gap: 12, alignItems: 'center', color: 'rgba(255,255,255,0.8)', fontSize: '0.88rem' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F7A81B')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.8)')}
              >
                <FaPhone style={{ color: '#F7A81B', flexShrink: 0 }} />
                +55 (94) 98112-5200
              </a>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                <FaEnvelope style={{ color: '#F7A81B', marginTop: 3, flexShrink: 0 }} />
                <div>
                  <div style={{ fontSize: '0.82rem', opacity: 0.65, marginBottom: 2 }}>Presidente 2025/2026</div>
                  <div style={{ fontSize: '0.88rem', opacity: 0.85 }}>Marcus Vinícius Abreu de Sousa</div>
                </div>
              </div>
              <div style={{ fontSize: '0.82rem', opacity: 0.65, lineHeight: 1.6 }}>
                Reuniões semanais aos <strong style={{ color: '#F7A81B' }}>terças-feiras</strong>, conforme regimento interno.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          padding: '20px 0',
          display: 'flex', flexWrap: 'wrap', gap: 12,
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <p style={{ fontSize: '0.82rem', opacity: 0.55 }}>
            © {new Date().getFullYear()} Rotary Club de Marabá. Todos os direitos reservados.
          </p>
          <p style={{ fontSize: '0.82rem', opacity: 0.55 }}>
            Membro do Rotary International | Distrito 4560
          </p>
        </div>
      </div>
    </footer>
  );
}
