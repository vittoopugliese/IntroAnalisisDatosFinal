// Custom hook for investment calculations

import { useState, useCallback, useMemo } from "react";
import { BankData, BankResults, BestInvestment } from "@/types/investment";
import { calculateBankResults, findBestInvestment, areAllBanksComplete, } from "@/lib/calculations";
import { INITIAL_CAPITAL, INITIAL_BANKS } from "@/lib/constants";

export function useInvestmentCalculator(initialCapital: number = INITIAL_CAPITAL) {
  const [capital, setCapital] = useState(initialCapital);
  const [banks, setBanks] = useState<BankData[]>(INITIAL_BANKS);
  const [results, setResults] = useState<BankResults[] | null>(null);

  const calculate = useCallback(() => {
    const calculatedResults = banks.map((bank) =>calculateBankResults(bank, capital));
    setResults(calculatedResults);
  }, [banks, capital]);

  const reset = useCallback(() => {
    setBanks(INITIAL_BANKS);
    setCapital(INITIAL_CAPITAL);
    setResults(null);
  }, []);

  const updateBankRate = useCallback(
    (bankIndex: number, yearIndex: number, rate: number) => {
      setBanks((prevBanks) => {
        const newBanks = [...prevBanks];
        newBanks[bankIndex] = {
          ...newBanks[bankIndex],
          rates: [...newBanks[bankIndex].rates] as [number, number, number],
        };
        newBanks[bankIndex].rates[yearIndex] = rate;
        return newBanks;
      });
    },
    []
  );

  const loadExampleData = useCallback((exampleBanks: BankData[]) => {
    setBanks(exampleBanks);
  }, []);

  const bestInvestment = useMemo<BestInvestment | null>(() => {
    if (!results || results.length === 0) return null;
    return findBestInvestment(results);
  }, [results]);

  const isDataComplete = useMemo(() => {
    return areAllBanksComplete(banks);
  }, [banks]);

  const hasResults = useMemo(() => {
    return results !== null && results.length > 0;
  }, [results]);

  return { capital, setCapital, banks, setBanks, updateBankRate, results, calculate, reset, loadExampleData, bestInvestment, isDataComplete, hasResults, };
}

