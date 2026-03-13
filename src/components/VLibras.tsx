'use client';

import { useEffect } from 'react';

export default function VLibras() {
  useEffect(() => {
    // Se o widget já foi inicializado, não faz nada
    if ((window as any).__vlibrasLoaded) return;
    (window as any).__vlibrasLoaded = true;

    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => {
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.head.appendChild(script);
  }, []);

  return (
    <div
      {...{ vw: 'true' }}
      style={{ display: 'block', position: 'fixed', bottom: 0, right: 0, zIndex: 9999 }}
    >
      <div {...{ 'vw-access-button': 'true' }} className="active" />
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}