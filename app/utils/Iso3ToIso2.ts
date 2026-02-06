// Covers all F1 host countries (current & recent seasons)
export const ISO3_TO_ISO2: Record<string, string> = {
  // Middle East
  BRN: "BH", // Bahrain
  KSA: "SA", // Saudi Arabia
  ARE: "AE", // Abu Dhabi (UAE)
  QAT: "QA", // Qatar
  UAE: "AE",

  // Asia
  CHN: "CN", // China
  JPN: "JP", // Japan
  SGP: "SG", // Singapore
  AZE: "AZ", // Azerbaijan

  // Europe
  GBR: "GB", // United Kingdom
  ESP: "ES", // Spain
  FRA: "FR", // France
  MON: "MC", // Monaco
  ITA: "IT", // Italy
  BEL: "BE", // Belgium
  AUT: "AT", // Austria
  HUN: "HU", // Hungary
  NED: "NL", // Netherlands
  DEU: "DE", // Germany (legacy / possible return)
  CHE: "CH", // Switzerland (legacy)
  RUS: "RU", // Russia (legacy)
  TUR: "TR", // Turkey (legacy / possible return)

  // Americas
  USA: "US", // United States
  CAN: "CA", // Canada
  MEX: "MX", // Mexico
  BRA: "BR", // Brazil

  // Oceania
  AUS: "AU", // Australia
};

export function iso3ToIso2(code: string): string {
  return ISO3_TO_ISO2[code.toUpperCase()];
}
