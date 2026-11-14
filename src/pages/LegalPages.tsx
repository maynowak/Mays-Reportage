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
      <strong className={value ? undefined : 'legal-field__missing'}>
        {value ?? LEGAL_PLACEHOLDER}
      </strong>
    </p>
  );
}

function EmailField() {
  if (!legalInfo.contactEmail) {
    return <Field label="E-Mail" value={null} />;
  }
  return (
    <p className="legal-field">
      <span>E-Mail</span>
      <strong>
        <a className="inline-link" href={`mailto:${legalInfo.contactEmail}`}>
          {legalInfo.contactEmail}
        </a>
      </strong>
    </p>
  );
}

function ResponsibleAddressField() {
  const value =
    legalInfo.responsibleAddress && legalInfo.responsibleAddress === legalInfo.operatorAddress
      ? 'Anschrift wie oben'
      : legalInfo.responsibleAddress;
  return <Field label="Anschrift" value={value} />;
}

export function ImpressumPage() {
  useSeo({
    title: 'Impressum — Mays-Reportagen',
    description:
      'Impressum und Anbieterkennzeichnung von Mays-Reportagen, einem redaktionellen Wissenschaftsmagazin.',
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
          Mays-Reportagen ist ein redaktionelles Online-Magazin für Wissenschaft und
          Recherche. Die nachfolgenden Angaben kennzeichnen die Betreiberin und die für
          journalistisch-redaktionelle Inhalte verantwortliche Person.
        </p>

        <DraftNotice />

        <section className="legal-section" aria-labelledby="impressum-anbieter">
          <h2 id="impressum-anbieter">
            Anbieterkennzeichnung nach § 5 DDG und § 18 Abs. 1 MStV
          </h2>
          <Field label="Betreiberin / Betreiber" value={legalInfo.operatorName} />
          <Field label="Anschrift" value={legalInfo.operatorAddress} />
          <EmailField />
        </section>

        <section className="legal-section" aria-labelledby="impressum-verantwortlich">
          <h2 id="impressum-verantwortlich">
            Verantwortlich im Sinne des § 18 Abs. 2 MStV
          </h2>
          <p>Für die journalistisch-redaktionellen Inhalte dieser Website:</p>
          <Field label="Name" value={legalInfo.responsiblePerson} />
          <ResponsibleAddressField />
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

        <p className="legal-page__stand">Stand: {legalInfo.updated}</p>
      </div>
    </div>
  );
}

export function PrivacyPage() {
  useSeo({
    title: 'Datenschutz — Mays-Reportagen',
    description:
      'Datenschutzhinweise von Mays-Reportagen: statisches Hosting bei Vercel, keine Cookies, kein Tracking, lokal gespeicherte Schriftarten.',
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
          Diese Hinweise beschreiben die tatsächliche technische Konfiguration der
          statischen Website. Es werden keine Analyse-, Werbe- oder Trackingdienste
          eingesetzt.
        </p>

        <DraftNotice />

        <section className="legal-section" aria-labelledby="ds-verantwortlich">
          <h2 id="ds-verantwortlich">Verantwortliche Person</h2>
          <Field label="Name" value={legalInfo.operatorName} />
          <EmailField />
          <p className="legal-page__note">
            Postanschrift: siehe{' '}
            <Link className="inline-link" to="/impressum">
              Impressum
            </Link>
            .
          </p>
        </section>

        <section className="legal-section" aria-labelledby="ds-hosting">
          <h2 id="ds-hosting">Hosting und Auslieferung</h2>
          <p>
            Die Website wird bei <strong>{legalInfo.hostingProvider}</strong> gehostet und
            als statische Anwendung ausgeliefert. Beim Abruf verarbeitet Vercel nach
            eigenen Angaben technisch erforderliche Verbindungsdaten wie IP-Adresse,
            Zeitpunkt, angeforderte Ressource, User-Agent und Statuscode, um die Website
            auszuliefern und Angriffe abzuwehren.
          </p>
          <Field label="Hosting-Anbieter" value={legalInfo.hostingProvider} />
          <p className="legal-page__note">
            Die konkrete Log-Art, Aufbewahrung und Verarbeitungsregion hängen vom
            Vercel-Tarif und den Kontoeinstellungen ab. Vercel dokumentiert
            tarifabhängige Aufbewahrungsfristen (u. a. Hobby 1 Stunde, Pro 1 Tag;
            statische Anfragen gegebenenfalls nur über Log Drains). Maßgeblich sind der
            tatsächlich genutzte Tarif und das Vercel-Dashboard.{' '}
            <a
              className="inline-link"
              href="https://vercel.com/docs/logs/runtime"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vercel-Logdokumentation
            </a>
          </p>
          <p className="legal-page__note">
            Vercel stellt nach eigenen Angaben eine Datenverarbeitungsvereinbarung (DPA)
            für Enterprise- und Pro-Tarife bereit. Ob der genutzte Tarif davon erfasst ist
            und eine Vereinbarung abgeschlossen wurde, ist im Vercel-Konto zu prüfen.{' '}
            <a
              className="inline-link"
              href="https://vercel.com/legal/dpa"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vercel-DPA
            </a>
          </p>
          <p className="legal-page__note">
            Vercel Inc. ist ein US-amerikanisches Unternehmen; eine Verarbeitung in den
            USA und weiteren Standorten ist möglich. Vercel verweist auf das EU-U.S. Data
            Privacy Framework und Standardvertragsklauseln. Die konkrete Übermittlungs-
            grundlage ist tarif- und vertragsabhängig vor der Freigabe zu prüfen.{' '}
            <a
              className="inline-link"
              href="https://vercel.com/legal/privacy-policy"
              target="_blank"
              rel="noreferrer noopener"
            >
              Vercel-Privacy-Notice
            </a>
          </p>
        </section>

        <section className="legal-section" aria-labelledby="ds-keine-cookies">
          <h2 id="ds-keine-cookies">Keine Cookies, kein Tracking</h2>
          <p>
            Die Anwendung setzt keine Cookies, verwendet keine Analyse- oder
            Werbe-Trackingdienste und speichert keine Nutzungsprofile im Browser. Es gibt
            keine Kontaktformulare und keinen Newsletter. Es werden keine
            einwilligungspflichtigen Cookies oder vergleichbaren Technologien eingesetzt;
            ein Consent-Banner ist daher nicht erforderlich.
          </p>
        </section>

        <section className="legal-section" aria-labelledby="ds-schriften">
          <h2 id="ds-schriften">Schriftarten und externe Inhalte</h2>
          <p>
            Die verwendeten Schriftarten werden mit der Anwendung ausgeliefert und nicht
            von externen Font-CDNs geladen. Es werden keine eingebetteten Videos, Karten
            oder Social-Media-Widgets geladen. Externe Quellenlinks führen erst nach einem
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
          <p>
            Für Anfragen zum Datenschutz nutzen Sie bitte die im Impressum genannte
            E-Mail-Adresse.
          </p>
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
            Designreferenz. Das Titelmotiv und die Desktop-Designreferenz wurden nach
            Angaben der Betreiberin mit OpenAI-Bildgenerierung erstellt. Modell, Prompt,
            Urheberschaft und Lizenz sind nicht dokumentiert. Eine Lizenzgarantie wird
            nicht behauptet; die Nutzungsrechte für eine öffentliche Veröffentlichung sind
            vor dem Release zu klären.
          </p>
          <p>
            Ausgeliefert werden ausschließlich optimierte WebP-Derivate (640/960/1280/1672
            px) und ein OG-Ausschnitt (1200 × 630 px). Das Original bleibt unverändert
            unter <code>assets/source/phagen-hero.png</code> gesichert.
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
            KI-generiert gekennzeichnet. Es werden keine Mikroskopaufnahmen,
            Patientenfotos oder fremden Pressebilder verwendet.
          </p>
        </section>

        <p className="legal-page__stand">Stand: {legalInfo.updated}</p>
      </div>
    </div>
  );
}
