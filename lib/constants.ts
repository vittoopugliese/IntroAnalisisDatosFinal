// Constants for Investment Analysis System

import { BankData, ScenarioData } from "@/types/investment";

export const INITIAL_CAPITAL = 850000;

export const INITIAL_BANKS: BankData[] = [
  {
    id: "provincia",
    name: "Banco Provincia",
    shortName: "Provincia",
    logo: "/banco-provincia.svg",
    rates: [0, 0, 0],
    color: "#0066CC",
  },
  {
    id: "nacion",
    name: "Banco Nación",
    shortName: "Nación",
    logo: "/banco-nacion.svg",
    rates: [0, 0, 0],
    color: "#00A859",
  },
  {
    id: "hipotecario",
    name: "Banco Hipotecario",
    shortName: "Hipotecario",
    logo: "/banco-hipotecario.svg",
    rates: [0, 0, 0],
    color: "#FF6B35",
  },
];

export const EXAMPLE_DATA: BankData[] = [
  {
    id: "provincia",
    name: "Banco Provincia",
    shortName: "Provincia",
    logo: "/banco-provincia.svg",
    rates: [45.5, 52.3, 58.7],
    color: "#0066CC",
  },
  {
    id: "nacion",
    name: "Banco Nación",
    shortName: "Nación",
    logo: "/banco-nacion.svg",
    rates: [48.2, 55.6, 62.1],
    color: "#00A859",
  },
  {
    id: "hipotecario",
    name: "Banco Hipotecario",
    shortName: "Hipotecario",
    logo: "/banco-hipotecario.svg",
    rates: [44.8, 51.2, 57.4],
    color: "#FF6B35",
  },
];

export const SCENARIOS: ScenarioData[] = [
  {
    name: "Optimista",
    type: "optimistic",
    multiplier: 1.2,
    description: "Tasas aumentan 20%",
  },
  {
    name: "Realista",
    type: "realistic",
    multiplier: 1.0,
    description: "Tasas actuales",
  },
  {
    name: "Pesimista",
    type: "pessimistic",
    multiplier: 0.8,
    description: "Tasas disminuyen 20%",
  },
];

export const YEARS = [2022, 2023, 2024];

export const MODALITY_COLORS = {
  annual: "#8884d8",
  quarterly: "#82ca9d",
  monthly: "#ffc658",
};

export const MODALITY_NAMES = {
  annual: "Inversión Anual",
  quarterly: "Inversión Trimestral",
  monthly: "Inversión Mensual",
};