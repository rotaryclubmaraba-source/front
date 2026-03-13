'use client';

import { useEffect } from 'react';

export default function VLibras() {
  useEffect(() => {
    // Remove instância anterior se existir
    const existing = document.querySelector('script[src*="vlibras"]');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;

    script.onload = () => {
      setTimeout(() => {
        if ((window as any).VLibras) {
          new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
        }
      }, 500);
    };

    document.head.appendChild(script);

    return () => {
      const s = document.querySelector('script[src*="vlibras"]');
      if (s) s.remove();
    };
  }, []);

  return (
    <div
      {...{ vw: 'true' }}
      style={{ display: 'block' }}
    >
      <div
        {...{ 'vw-access-button': 'true' }}
        className="active"
      />
      <div {...{ 'vw-plugin-wrapper': 'true' }}>
        <div className="vw-plugin-top-wrapper" />
      </div>
    </div>
  );
}