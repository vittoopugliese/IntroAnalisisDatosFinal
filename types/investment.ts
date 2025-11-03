// Types for Investment Analysis System

export interface BankData {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  rates: [number, number, number]; // 3 years of historical rates
  color: string; // For charts
}

export interface ModalityResult {
  name: string;
  type: "annual" | "quarterly" | "monthly";
  finalAmount: number;
  profit: number;
  effectiveRate: number;
  periods: number;
  periodRate: number;
}

export interface BankResults {
  bank: BankData;
  averageRate: number;
  annual: ModalityResult;
  quarterly: ModalityResult;
  monthly: ModalityResult;
  bestModality: ModalityResult;
}

export interface InvestmentCalculation {
  id: string;
  timestamp: string;
  capital: number;
  banks: BankData[];
  results: BankResults[];
}

export interface BestInvestment {
  bank: BankData;
  modality: ModalityResult;
  bankResults: BankResults;
}

export interface ScenarioData {
  name: string;
  type: "optimistic" | "realistic" | "pessimistic";
  multiplier: number;
  description: string;
}

export interface ComparisonMetric {
  label: string;
  key: keyof BankResults | string;
  format: "currency" | "percentage" | "number";
}

