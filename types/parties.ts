export type PartyName =
  | "frente_amplio"
  | "nacional"
  | "constitucional_ambientalista"
  | "independiente"
  | "identidad_soberana"
  | "ecologista_radical_intransigente"
  | "avanzar_republicano"
  | "colorado"
  | "asamblea_popular"
  | "cabildo_abierto"
  | "por_los_cambios_necesarios";

export interface Party {
  name: PartyName;
  programRoute: string;
}

export const ALL_PARTIES: PartyName[] = [
  "frente_amplio",
  "nacional",
  "constitucional_ambientalista",
  "independiente",
  "identidad_soberana",
  "ecologista_radical_intransigente",
  "avanzar_republicano",
  "colorado",
  "asamblea_popular",
  "cabildo_abierto",
  "por_los_cambios_necesarios",
];

export const ALL_PARTIES_DATA: Party[] = ALL_PARTIES.map((partyName) => {
  return {
    name: partyName,
    programRoute: `programa_${partyName}_2025_2030.pdf`,
  };
});
