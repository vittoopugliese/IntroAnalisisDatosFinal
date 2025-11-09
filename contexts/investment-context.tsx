"use client";

import { createContext, useContext, useCallback, ReactNode } from "react";
import { BankData, BankResults, BestInvestment, InvestmentCalculation } from "@/types/investment";
import { useInvestmentCalculator } from "@/hooks/use-investment-calculator";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { INITIAL_CAPITAL } from "@/lib/constants";

interface InvestmentContextType {
  capital: number;
  setCapital: (capital: number) => void;
  banks: BankData[];
  setBanks: (banks: BankData[]) => void;
  updateBankRate: (bankIndex: number, yearIndex: number, rate: number) => void;
  results: BankResults[] | null;
  calculate: () => void;
  reset: () => void;
  loadExampleData: (exampleBanks: BankData[]) => void;
  bestInvestment: BestInvestment | null;
  isDataComplete: boolean;
  hasResults: boolean;
  saveToHistory: () => void;
  history: InvestmentCalculation[];
  deleteHistoryItem: (id: string) => void;
  loadFromHistory: (id: string) => void;
  clearHistory: () => void;
}

const InvestmentContext = createContext<InvestmentContextType | undefined>(undefined);

export function InvestmentProvider({ children }: { children: ReactNode }) {
  const calculator = useInvestmentCalculator(INITIAL_CAPITAL);
  const [history, setHistory] = useLocalStorage<InvestmentCalculation[]>("investment-history", []);

  const saveToHistory = useCallback(() => {
    if (!calculator.results) return;

    const calculation: InvestmentCalculation = {
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
      capital: calculator.capital,
      banks: calculator.banks,
      results: calculator.results,
    };

    setHistory((prev) => [calculation, ...prev].slice(0, 20)); // Keep last 20
  }, [calculator.results, calculator.capital, calculator.banks, setHistory]);

  const deleteHistoryItem = useCallback((id: string) => setHistory((prev) => prev.filter((item) => item.id !== id)), [setHistory]);

  const loadFromHistory = useCallback(
    (id: string) => {
      const item = history.find((h) => h.id === id);
      if (item) {
        calculator.setBanks(item.banks);
        calculator.setCapital(item.capital);
        // Automatically recalculate
        setTimeout(() => calculator.calculate(), 100);
      }
    },
    [history, calculator]
  );

  const clearHistory = useCallback(() => setHistory([]), [setHistory]);

  return <InvestmentContext.Provider value={{ ...calculator, saveToHistory, history, deleteHistoryItem, loadFromHistory, clearHistory}}>{children}</InvestmentContext.Provider>
}

export function useInvestment() {
  const context = useContext(InvestmentContext);
  if (context === undefined) throw new Error("useInvestment must be used within an InvestmentProvider");
  return context;
}