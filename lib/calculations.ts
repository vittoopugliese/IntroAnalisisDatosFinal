// Investment Calculation Functions

import { BankData, BankResults, ModalityResult, BestInvestment, } from "@/types/investment";

// Calcula la tasa promedio de las tasas históricas
export function calculateAverageRate(rates: number[]): number {
  if (rates.length === 0) return 0;
  const sum = rates.reduce((acc, rate) => acc + rate, 0);
  return sum / rates.length;
}

// Calcula el rendimiento anual (1 año, sin compounding)
export function calculateAnnualReturn( capital: number, averageRate: number ): ModalityResult {
  const finalAmount = capital * (1 + averageRate / 100);
  const profit = finalAmount - capital;
  return { name: "Anual", type: "annual", finalAmount, profit, effectiveRate: averageRate, periods: 1, periodRate: averageRate, };
}

// Calcula el rendimiento trimestral (4 trimestres con interés compuesto)
export function calculateQuarterlyReturn( capital: number, averageRate: number ): ModalityResult {
  const quarterlyRate = averageRate / 4;
  const finalAmount = capital * Math.pow(1 + quarterlyRate / 100, 4);
  const effectiveRate = ((finalAmount / capital - 1) * 100);
  const profit = finalAmount - capital;
  
  return { name: "Trimestral", type: "quarterly", finalAmount, profit, effectiveRate, periods: 4, periodRate: quarterlyRate, };
}

// Calcula el rendimiento mensual (12 meses con interés compuesto)
export function calculateMonthlyReturn( capital: number, averageRate: number ): ModalityResult {
  const monthlyRate = averageRate / 12;
  const finalAmount = capital * Math.pow(1 + monthlyRate / 100, 12);
  const effectiveRate = ((finalAmount / capital - 1) * 100);
  const profit = finalAmount - capital;
  
  return { name: "Mensual", type: "monthly", finalAmount, profit, effectiveRate, periods: 12, periodRate: monthlyRate, };
}

// Calcula todos los resultados para un solo banco
export function calculateBankResults( bank: BankData, capital: number ): BankResults {
  const averageRate = calculateAverageRate(bank.rates);
  const annual = calculateAnnualReturn(capital, averageRate);
  const quarterly = calculateQuarterlyReturn(capital, averageRate);
  const monthly = calculateMonthlyReturn(capital, averageRate);
  // Encuentra la mejor modalidad para este banco
  const bestModality = [annual, quarterly, monthly].reduce((best, current) => current.finalAmount > best.finalAmount ? current : best );
  return { bank, averageRate, annual, quarterly, monthly, bestModality, };
}

// Encuentra la mejor opción de inversión en general
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

// Calcula la evolución del capital a lo largo del tiempo (mes a mes)
export function calculateEvolution( capital: number, monthlyRate: number, months: number = 12 ): number[] {
  const evolution: number[] = [capital];
  
  for (let i = 1; i <= months; i++) {
    const previousAmount = evolution[i - 1];
    const newAmount = previousAmount * (1 + monthlyRate / 100);
    evolution.push(newAmount);
  }
  
  return evolution;
}

// Calcula el rendimiento real considerando la inflación
export function calculateRealReturn( nominalRate: number, inflationRate: number ): number {
  // Fisher equation: (1 + nominal) / (1 + inflation) - 1
  return ((1 + nominalRate / 100) / (1 + inflationRate / 100) - 1) * 100;
}

// Valida la entrada de la tasa
export function validateRate(rate: number): boolean {
  return !isNaN(rate) && rate >= 0 && rate <= 200;
}

// Verifica si los datos del banco están completos
export function isBankDataComplete(bank: BankData): boolean {
  return bank.rates.every((rate) => rate > 0 && validateRate(rate));
}

// Verifica si todos los bancos tienen datos completos
export function areAllBanksComplete(banks: BankData[]): boolean {
  return banks.every(isBankDataComplete);
}

// Formatea el monto en pesos argentinos
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", minimumFractionDigits: 2, maximumFractionDigits: 2, }).format(amount);
}

// Formatea el porcentaje
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals)}%`;
}

// Formatea el número con separador de miles
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat("es-AR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals, }).format(value);
}

// Calcula la diferencia porcentual entre dos valores
export function calculateDifferencePercentage( value1: number, value2: number ): number {
  if (value2 === 0) return 0;
  return ((value1 - value2) / value2) * 100;
}

// Obtiene el ranking de todas las combinaciones de modalidad y banco
export function getRankingOfAllOptions( results: BankResults[] ): Array<{ bank: string; modality: string; amount: number; rank: number }> {
  const allOptions: Array<{ bank: string; modality: string; amount: number; rank: number; }> = [];

  results.forEach((result) => {
    allOptions.push({ bank: result.bank.name, modality: "Anual", amount: result.annual.finalAmount, rank: 0, });
    allOptions.push({ bank: result.bank.name, modality: "Trimestral", amount: result.quarterly.finalAmount, rank: 0, });
    allOptions.push({ bank: result.bank.name, modality: "Mensual", amount: result.monthly.finalAmount, rank: 0, });
  });

  // Ordena por monto en orden descendente
  allOptions.sort((a, b) => b.amount - a.amount);

  // Asigna los rangos
  allOptions.forEach((option, index) => {
    option.rank = index + 1;
  });

  return allOptions;
}