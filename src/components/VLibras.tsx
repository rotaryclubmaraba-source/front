'use client';

import { useEffect } from 'react';

export default function VLibras() {
  useEffect(() => {
    // Load VLibras script
    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.onload = () => {
      if ((window as any).VLibras) {
        new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
      }
    };
    document.body.appendChild(script);
  }, []);

  return (
    <div vw-access-button="true" className="enabled">
      <div vw-access-button="true" className="active"></div>
      <div vw-plugin-wrapper="true">
        <div className="vw-plugin-top-wrapper"></div>
      </div>
    </div>
  );
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
