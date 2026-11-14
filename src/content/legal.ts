/**
 * Rechtliche Angaben der Betreiberin.
 *
 * Die Werte wurden von der Betreiberin bereitgestellt und dürfen nicht durch
 * Dritte verändert oder ergänzt werden. Die Anschrift wurde am 14.11.2026 in
 * der Schreibweise "Pestalozzistraße" bestätigt. Keine Handelsregister-,
 * Umsatzsteuer- oder Aufsichtsbehördenangaben erfinden.
 */
export const legalInfo = {
  updated: '14. November 2026',
  operatorName: 'Maymilly Nowak',
  operatorAddress: 'Pestalozzistraße 16b, 64720 Michelstadt',
  contactEmail: 'may-nowak@web.de',
  responsiblePerson: 'Maymilly Nowak',
  responsibleAddress: 'Pestalozzistraße 16b, 64720 Michelstadt',
  hostingProvider: 'Vercel',
};

export const REQUIRED_LEGAL_FIELDS = [
  'operatorName',
  'operatorAddress',
  'contactEmail',
  'responsiblePerson',
  'responsibleAddress',
  'hostingProvider',
] as const;

export const isLegalComplete = REQUIRED_LEGAL_FIELDS.every(
  (field) => legalInfo[field] !== null && legalInfo[field] !== '',
);

export const LEGAL_PLACEHOLDER = 'Wird vor Veröffentlichung ergänzt.';
