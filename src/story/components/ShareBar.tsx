import { useState } from 'react';

export function ShareBar({ title }: { title: string }) {
  const [status, setStatus] = useState('');

  const copyLink = async () => {
    const url = window.location.href;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('clipboard unavailable');
      await navigator.clipboard.writeText(url);
      setStatus('Link kopiert.');
    } catch {
      setStatus('Kopieren nicht möglich. Bitte die Adresse aus der Adresszeile kopieren.');
    }
  };

  const share = async () => {
    if (!navigator.share) return;
    try {
      await navigator.share({ title, url: window.location.href });
      setStatus('Teilen-Dialog geöffnet.');
    } catch {
      setStatus('');
    }
  };

  const mailto = `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(
    typeof window === 'undefined' ? '' : window.location.href,
  )}`;

  return (
    <section className="share-bar" aria-labelledby="share-title">
      <div>
        <p className="section-kicker">Teilen</p>
        <h2 id="share-title">Diese Reportage weitergeben</h2>
      </div>
      <div className="share-bar__actions">
        {typeof navigator !== 'undefined' && 'share' in navigator && (
          <button type="button" className="btn btn--ghost btn--small" onClick={share}>
            Teilen
          </button>
        )}
        <button type="button" className="btn btn--ghost btn--small" onClick={copyLink}>
          Link kopieren
        </button>
        <a className="btn btn--ghost btn--small" href={mailto}>
          Per E-Mail
        </a>
      </div>
      <p className="share-bar__status" role="status" aria-live="polite">
        {status}
      </p>
      <p className="share-bar__note">
        Kein Tracking, keine Social-Media-Skripte. Es wird nur der aktuelle Link
        weitergegeben.
      </p>
    </section>
  );
}
