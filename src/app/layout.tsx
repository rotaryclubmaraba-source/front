import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/lib/AuthContext';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'Rotary Club de Marabá',
  description: 'Rotary Club de Marabá - Unidos para Fazer o Bem. Serviço à comunidade, companheirismo e liderança ética em Marabá, Pará.',
  keywords: 'Rotary, Marabá, Pará, serviço, comunidade, voluntariado',
  openGraph: {
    title: 'Rotary Club de Marabá',
    description: 'Unidos para Fazer o Bem. Serviço à comunidade em Marabá, Pará.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/rotary-logo.png" />
      </head>
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                fontFamily: "'Source Sans 3', sans-serif",
                fontSize: '15px',
              },
              success: {
                iconTheme: { primary: '#003F87', secondary: '#F7A81B' },
              },
            }}
          />
        </AuthProvider>

        {/* VLibras */}
        <div {...{ vw: 'true' }}>
          <div {...{ 'vw-access-button': 'true' }} className="active"></div>
          <div {...{ 'vw-plugin-wrapper': 'true' }}>
            <div className="vw-plugin-top-wrapper"></div>
          </div>
        </div>

        <Script
          id="vlibras"
          src="https://vlibras.gov.br/app/vlibras-plugin.js"
          strategy="afterInteractive"
          onLoad={() => {
            try {
              new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
            } catch(e) {}
          }}
        />
      </body>
    </html>
  );
}