/**
 * Rechtliche Angaben des Betreibers.
 *
 * Diese Werte werden bewusst NICHT erfunden. Sie müssen vor einer
 * Veröffentlichung durch die verantwortliche Person ergänzt und rechtlich
 * geprüft werden. `null` bedeutet: Angabe fehlt.
 */
export const legalInfo = {
  updated: '14. November 2026',
  operatorName: null as string | null,
  operatorAddress: null as string | null,
  contactEmail: null as string | null,
  responsiblePerson: null as string | null,
  responsibleAddress: null as string | null,
  hostingProvider: null as string | null,
  vatId: null as string | null,
  supervisoryAuthority: null as string | null,
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
