import { Link } from 'react-router-dom';
import {
  LEGAL_PLACEHOLDER,
  isLegalComplete,
  legalInfo,
  REQUIRED_LEGAL_FIELDS,
} from '../content/legal';
import { useSeo } from '../lib/seo';

function DraftNotice() {
  if (isLegalComplete) return null;
  return (
    <div className="draft-notice" role="status">
      <strong>Entwurf – nicht veröffentlichungsfähig.</strong> Es fehlen noch{' '}
      {REQUIRED_LEGAL_FIELDS.length} Pflichtangaben. Die Seite ist bis zur Vervollständigung
      auf <code>noindex</code> gesetzt.
    </div>
  );
}

function Field({ label, value }: { label: string; value: string | null }) {
  return (
    <p className="legal-field">
      <span>{label}</span>
      <strong className={value ? undefined : 'legal-field__missing'}>{value ?? LEGAL_PLACEHOLDER}</strong>
    </p>
  );
}

export function ImpressumPage() {
  useSeo({
    title: 'Impressum — Mays-Reportagen',
    description:
      'Impressumsentwurf von Mays-Reportagen. Die Betreiberangaben werden vor der Veröffentlichung ergänzt.',
    canonicalPath: '/impressum',
    image: '/media/phagen/og-phagen.jpg',
    imageAlt: 'Mays-Reportagen',
    noIndex: !isLegalComplete,
  });

  return (
    <div className="page legal-page">
      <div className="container legal-page__inner">
        <p className="section-kicker">Rechtliches</p>
        <h1>Impressum</h1>
        <p className="legal-page__intro">
          Mays-Reportagen ist ein redaktionelles Online-Magazin. Die nachfolgenden Angaben
          werden vor einer Veröffentlichung von der verantwortlichen Person ergänzt.
          Persönliche Daten werden an dieser Stelle nicht erfunden.
        </p>

        <DraftNotice />

        <section className="legal-section" aria-labelledby="impressum-anbieter">
          <h2 id="impressum-anbieter">Angaben gemäß § 5 DDG</h2>
          <Field label="Betreiberin / Betreiber" value={legalInfo.operatorName} />
          <Field label="Anschrift" value={legalInfo.operatorAddress} />
          <Field label="E-Mail" value={legalInfo.contactEmail} />
          <Field label="Umsatzsteuer-ID (falls vorhanden)" value={legalInfo.vatId} />
        </section>

        <section className="legal-section" aria-labelledby="impressum-verantwortlich">
          <h2 id="impressum-verantwortlich">Redaktionell verantwortlich</h2>
          <p>
            Verantwortlich für journalistisch-redaktionelle Inhalte nach § 18 Abs. 2 MStV:
          </p>
          <Field label="Name" value={legalInfo.responsiblePerson} />
          <Field label="Anschrift" value={legalInfo.responsibleAddress} />
        </section>

        <section className="legal-section" aria-labelledby="impressum-bilder">
          <h2 id="impressum-bilder">Bildherkunft und KI-Kennzeichnung</h2>
          <p>
            Die Titelmotive sind <strong>KI-generierte Illustrationen</strong>, keine
            Mikroskopaufnahmen. Herkunft, Bearbeitung und offene Rechtefragen sind im{' '}
            <Link className="inline-link" to="/bildnachweis">
              Bildnachweis
            </Link>{' '}
            dokumentiert.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="impressum-streit">
          <h2 id="impressum-streit">Streitbeilegung</h2>
          <p>
            Angaben zur Teilnahme an Streitbeilegungsverfahren werden vor der
            Veröffentlichung ergänzt. Es wird keine Zugehörigkeit zu einer
            Verbraucherschlichtungsstelle behauptet, solange sie nicht belegt ist.
          </p>
        </section>

        <p className="legal-page__stand">Stand: {legalInfo.updated}</p>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  useSeo({
    title: 'Datenschutz — Mays-Reportagen',
    description:
      'Datenschutzhinweise von Mays-Reportagen: keine Cookies, kein Tracking, lokal gespeicherte Schriftarten.',
    canonicalPath: '/datenschutz',
    image: '/media/phagen/og-phagen.jpg',
    imageAlt: 'Mays-Reportagen',
    noIndex: !isLegalComplete,
  });

  return (
    <div className="page legal-page">
      <div className="container legal-page__inner">
        <p className="section-kicker">Rechtliches</p>
        <h1>Datenschutz</h1>
        <p className="legal-page__intro">
          Diese Hinweise beschreiben den aktuellen technischen Stand des Magazins. Sie sind
          ein Entwurf und müssen vor der Veröffentlichung an den tatsächlichen Hoster
          angepasst und rechtlich geprüft werden.
        </p>

        <DraftNotice />

        <section className="legal-section" aria-labelledby="ds-verantwortlich">
          <h2 id="ds-verantwortlich">Verantwortlicher</h2>
          <Field label="Name" value={legalInfo.operatorName} />
          <Field label="Anschrift" value={legalInfo.operatorAddress} />
          <Field label="E-Mail" value={legalInfo.contactEmail} />
        </section>

        <section className="legal-section" aria-labelledby="ds-hosting">
          <h2 id="ds-hosting">Hosting und Server-Logs</h2>
          <p>
            Beim Aufruf der Seite verarbeitet der Hosting-Anbieter technisch notwendige
            Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt, User-Agent, angeforderte Datei),
            um die Seite auszuliefern und Angriffe abzuwehren.
          </p>
          <Field label="Hosting-Anbieter" value={legalInfo.hostingProvider} />
          <p className="legal-page__note">
            Vertrag zur Auftragsverarbeitung, Speicherdauer der Logs und Serverstandort sind
            nach Auswahl des Hosters zu ergänzen.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="ds-keine-cookies">
          <h2 id="ds-keine-cookies">Keine Cookies, kein Tracking</h2>
          <p>
            Die Anwendung setzt keine Cookies, verwendet keine Analyse- oder
            Werbe-Trackingdienste und speichert keine Nutzungsprofile im Browser. Es gibt
            keine Kontaktformulare und keinen Newsletter.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="ds-schriften">
          <h2 id="ds-schriften">Schriftarten und externe Inhalte</h2>
          <p>
            Die verwendeten Schriftarten werden mit der Anwendung ausgeliefert und nicht von
            externen Font-CDNs geladen. Es werden keine eingebetteten Videos, Karten oder
            Social-Media-Widgets geladen. Externe Quellenlinks führen erst nach einem
            Klick auf die Websites Dritter.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="ds-rechte">
          <h2 id="ds-rechte">Ihre Rechte</h2>
          <p>
            Sie haben im Rahmen der DSGVO das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit und Widerspruch. Zudem
            besteht ein Beschwerderecht bei einer Datenschutzaufsichtsbehörde.
          </p>
          <Field label="Zuständige Aufsichtsbehörde" value={legalInfo.supervisoryAuthority} />
        </section>

        <p className="legal-page__stand">Stand: {legalInfo.updated}</p>
      </div>
    </div>
  );
}

export function ImageCreditsPage() {
  useSeo({
    title: 'Bildnachweis — Mays-Reportagen',
    description:
      'Herkunft und Kennzeichnung der KI-generierten Illustrationen von Mays-Reportagen.',
    canonicalPath: '/bildnachweis',
    image: '/media/phagen/og-phagen.jpg',
    imageAlt: 'Mays-Reportagen',
  });

  return (
    <div className="page legal-page">
      <div className="container legal-page__inner">
        <p className="section-kicker">Transparenz</p>
        <h1>Bildnachweis</h1>
        <p className="legal-page__intro">
          Alle großformatigen Motive dieses Magazins sind Illustrationen. Sie zeigen keine
          mikroskopischen Aufnahmen und sind nicht als wissenschaftliche Dokumentation
          verwendbar.
        </p>

        <section className="legal-section">
          <h2>Titelgeschichte: Bakteriophagen</h2>
          <p>
            <strong>KI-generierte Illustration.</strong> Datei:{' '}
            <code>phagen-hero.png</code> (1672 × 941 px), geliefert vom Auftraggeber als
            Designreferenz. Das Erzeugungswerkzeug und die Urheberschaft sind im Repository
            nicht dokumentiert. Die Rechte für eine öffentliche Veröffentlichung sind vor
            dem Release zu klären.
          </p>
          <p>
            Ausgeliefert werden ausschließlich optimierte WebP-Derivate (640/960/1280/1672
            px) und ein OG-Ausschnitt (1200 × 630 px). Das Original bleibt unverändert unter{' '}
            <code>assets/source/phagen-hero.png</code> gesichert.
          </p>
        </section>

        <section className="legal-section">
          <h2>Designreferenzen</h2>
          <p>
            <code>phagen-design-reference.png</code> und{' '}
            <code>phagen-mobile-reference.png</code> dienten ausschließlich als visuelle
            Referenz für Farben, Typografie und mobile Anordnung. Sie werden nicht
            ausgeliefert und nicht als Inhalt verwendet.
          </p>
        </section>

        <section className="legal-section">
          <h2>Grundsatz</h2>
          <p>
            Illustrationen werden im Bildunterschriftstext und im Alternativtext als
            KI-generiert gekennzeichnet. Es werden keine Mikroskopaufnahmen, Patientenfotos
            oder fremden Pressebilder verwendet.
          </p>
        </section>

        <p className="legal-page__stand">Stand: {legalInfo.updated}</p>
      </div>
    </div>
  );
}
