import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/lib/AuthContext';

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

        {/* VLibras - método oficial */}
        <div
          dangerouslySetInnerHTML={{
            __html: `
              <div vw="true" class="enabled">
                <div vw-access-button="true" class="active"></div>
                <div vw-plugin-wrapper="true">
                  <div class="vw-plugin-top-wrapper"></div>
                </div>
              </div>
              <script src="https://vlibras.gov.br/app/vlibras-plugin.js"></script>
              <script>new window.VLibras.Widget('https://vlibras.gov.br/app');</script>
            `
          }}
        />
      </body>
    </html>
  );
}