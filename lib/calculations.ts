// Investment Calculation Functions

import { BankData, BankResults, ModalityResult, BestInvestment, } from "@/types/investment";

/**
 * Calculate average rate from historical data
 */
export function calculateAverageRate(rates: number[]): number {
  if (rates.length === 0) return 0;
  const sum = rates.reduce((acc, rate) => acc + rate, 0);
  return sum / rates.length;
}

/**
 * Calculate annual return (1 year, no compounding)
 */
export function calculateAnnualReturn( capital: number, averageRate: number ): ModalityResult {
  const finalAmount = capital * (1 + averageRate / 100);
  const profit = finalAmount - capital;
  return { name: "Anual", type: "annual", finalAmount, profit, effectiveRate: averageRate, periods: 1, periodRate: averageRate, };
}

/**
 * Calculate quarterly return (4 quarters with compound interest)
 */
export function calculateQuarterlyReturn( capital: number, averageRate: number ): ModalityResult {
  const quarterlyRate = averageRate / 4;
  const finalAmount = capital * Math.pow(1 + quarterlyRate / 100, 4);
  const effectiveRate = ((finalAmount / capital - 1) * 100);
  const profit = finalAmount - capital;
  
  return { name: "Trimestral", type: "quarterly", finalAmount, profit, effectiveRate, periods: 4, periodRate: quarterlyRate, };
}

/**
 * Calculate monthly return (12 months with compound interest)
 */
export function calculateMonthlyReturn( capital: number, averageRate: number ): ModalityResult {
  const monthlyRate = averageRate / 12;
  const finalAmount = capital * Math.pow(1 + monthlyRate / 100, 12);
  const effectiveRate = ((finalAmount / capital - 1) * 100);
  const profit = finalAmount - capital;
  
  return { name: "Mensual", type: "monthly", finalAmount, profit, effectiveRate, periods: 12, periodRate: monthlyRate, };
}

/**
 * Calculate all results for a single bank
 */
export function calculateBankResults( bank: BankData, capital: number ): BankResults {
  const averageRate = calculateAverageRate(bank.rates);
  const annual = calculateAnnualReturn(capital, averageRate);
  const quarterly = calculateQuarterlyReturn(capital, averageRate);
  const monthly = calculateMonthlyReturn(capital, averageRate);
  // Find best modality for this bank
  const bestModality = [annual, quarterly, monthly].reduce((best, current) => current.finalAmount > best.finalAmount ? current : best );
  return { bank, averageRate, annual, quarterly, monthly, bestModality, };
}

/**
 * Find the best overall investment option
 */
export function findBestInvestment(results: BankResults[]): BestInvestment {
  let bestBankResults = results[0];
  let bestModality = results[0].bestModality;

  for (const result of results) {
    if (result.bestModality.finalAmount > bestModality.finalAmount) {
      bestBankResults = result;
      bestModality = result.bestModality;
    }
  }

  return { bank: bestBankResults.bank, modality: bestModality, bankResults: bestBankResults, };
}

/**
 * Calculate evolution of capital over time (month by month)
 */
export function calculateEvolution( capital: number, monthlyRate: number, months: number = 12 ): number[] {
  const evolution: number[] = [capital];
  
  for (let i = 1; i <= months; i++) {
    const previousAmount = evolution[i - 1];
    const newAmount = previousAmount * (1 + monthlyRate / 100);
    evolution.push(newAmount);
  }
  
  return evolution;
}

/**
 * Calculate real return considering inflation
 */
export function calculateRealReturn( nominalRate: number, inflationRate: number ): number {
  // Fisher equation: (1 + nominal) / (1 + inflation) - 1
  return ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100;
}

/**
 * Validate rate input
 */
export function validateRate(rate: number): boolean {
  return !isNaN(rate) && rate >= 0 && rate <= 200;
}

/**
 * Check if bank data is complete
 */
export function isBankDataComplete(bank: BankData): boolean {
  return bank.rates.every((rate) => rate > 0 && validateRate(rate));
}

/**
 * Check if all banks have complete data
 */
export function areAllBanksComplete(banks: BankData[]): boolean {
  return banks.every(isBankDataComplete);
}

/**
 * Format currency (ARS)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(amount);
}

/**
 * Format percentage
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format number with thousands separator
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("es-AR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, }).format(value);
}

/**
 * Calculate difference percentage between two values
 */
export function calculateDifferencePercentage( value1: number, value2: number ): number {
  if (value2 === 0) return 0;
  return ((value1 - value2) / value2) * 100;
}

/**
 * Get ranking of all modality-bank combinations
 */
export function getRankingOfAllOptions( results: BankResults[] ): Array<{ bank: string; modality: string; amount: number; rank: number }> {
  const allOptions: Array<{ bank: string; modality: string; amount: number; rank: number; }> = [];

  results.forEach((result) => {
    allOptions.push({ bank: result.bank.name, modality: "Anual", amount: result.annual.finalAmount, rank: 0, });
    allOptions.push({ bank: result.bank.name, modality: "Trimestral", amount: result.quarterly.finalAmount, rank: 0, });
    allOptions.push({ bank: result.bank.name, modality: "Mensual", amount: result.monthly.finalAmount, rank: 0, });
  });

  // Sort by amount descending
  allOptions.sort((a, b) => b.amount - a.amount);

  // Assign ranks
  allOptions.forEach((option, index) => {
    option.rank = index + 1;
  });

  return allOptions;
}