import { describe, expect, it } from 'vitest';
import { isLegalComplete, legalInfo, REQUIRED_LEGAL_FIELDS } from './legal';

describe('legal configuration', () => {
  it('is complete without exposing the values in test output', () => {
    expect(isLegalComplete).toBe(true);
    for (const field of REQUIRED_LEGAL_FIELDS) {
      expect(legalInfo[field]?.length ?? 0).toBeGreaterThan(3);
    }
  });

  it('does not invent optional register, tax or authority data', () => {
    expect('vatId' in legalInfo).toBe(false);
    expect('supervisoryAuthority' in legalInfo).toBe(false);
  });
});
