'use client';

import { useEffect } from 'react';

export default function VLibras() {
  useEffect(() => {
    // Evita carregar duas vezes
    if (document.querySelector('script[src*="vlibras"]')) return;

    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.defer = true;
    script.onload = () => {
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div {...{ vw: 'true' }}>
      <div {...{ 'vw-access-button': 'true' }} className="active"></div>
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}