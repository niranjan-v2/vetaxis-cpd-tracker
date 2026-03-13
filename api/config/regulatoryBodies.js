// Source: Australian state veterinary regulatory bodies
// CPD requirements as of 2025 — verify periodically as requirements may change

export const REGULATORY_BODIES = {
  WA: {
    name:           "Veterinary Practice Board of Western Australia",
    requiredPoints: 40,
    periodMonths:   36, // 3 years
    website:        "https://www.vpb.wa.gov.au",
  },
  NSW: {
    name:           "Veterinary Practitioners Board of New South Wales",
    requiredPoints: 60,
    periodMonths:   36,
    website:        "https://www.vpb.nsw.gov.au",
  },
  VIC: {
    name:           "Veterinary Practitioners Registration Board of Victoria",
    requiredPoints: 40,
    periodMonths:   36,
    website:        "https://www.vprb.vic.gov.au",
  },
  QLD: {
    name:           "Veterinary Surgeons Board of Queensland",
    requiredPoints: 40,
    periodMonths:   36,
    website:        "https://www.vsb.qld.gov.au",
  },
  SA: {
    name:           "Veterinary Surgeons Board of South Australia",
    requiredPoints: 40,
    periodMonths:   36,
    website:        "https://www.vsb.sa.gov.au",
  },
  TAS: {
    name:           "Veterinary Board of Tasmania",
    requiredPoints: 40,
    periodMonths:   36,
    website:        "https://www.veterinaryboard.tas.gov.au",
  },
  NT: {
    name:           "Veterinary Board of the Northern Territory",
    requiredPoints: 40,
    periodMonths:   36,
    website:        "https://www.health.nt.gov.au",
  },
  ACT: {
    name:           "ACT Veterinary Surgeons Board",
    requiredPoints: 40,
    periodMonths:   36,
    website:        "https://www.accesscanberra.act.gov.au",
  },
};

/**
 * Get regulatory body config for a given state code.
 * @param {string} stateCode - e.g. "WA", "NSW"
 * @returns {object|null}
 */
export const getRegulatoryBody = (stateCode) => {
  return REGULATORY_BODIES[stateCode?.toUpperCase()] ?? null;
};

/**
 * Calculate CPD period start and end dates from a registration start date.
 * @param {Date} registrationStart
 * @param {string} stateCode
 * @returns {{ periodStart: Date, periodEnd: Date, requiredPoints: number } | null}
 */
export const getCpdPeriod = (registrationStart, stateCode) => {
  const body = getRegulatoryBody(stateCode);
  if (!body) return null;

  const periodStart = new Date(registrationStart);
  const periodEnd   = new Date(registrationStart);
  periodEnd.setMonth(periodEnd.getMonth() + body.periodMonths);

  return {
    periodStart,
    periodEnd,
    requiredPoints: body.requiredPoints,
  };
};