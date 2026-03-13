'use client';

import { useEffect } from 'react';

export default function VLibras() {
  useEffect(() => {
    if ((window as any).__vlibrasLoaded) return;
    (window as any).__vlibrasLoaded = true;

    const init = () => {
      try {
        if ((window as any).VLibras) {
          const widget = new (window as any).VLibras.Widget('https://vlibras.gov.br/app');
          // Suprime o erro onError do Unity
          if (widget && !widget.onError) {
            widget.onError = () => {};
          }
        }
      } catch (e) {
        // silencioso
      }
    };

    // Suprime erros do Unity globalmente para não mostrar o popup
    const originalOnError = window.onerror;
    window.onerror = (msg, src, line, col, err) => {
      if (src && src.includes('vlibras')) return true; // suprime
      if (originalOnError) return originalOnError(msg, src, line, col, err);
      return false;
    };

    const script = document.createElement('script');
    script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
    script.async = true;
    script.onload = () => setTimeout(init, 800);
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