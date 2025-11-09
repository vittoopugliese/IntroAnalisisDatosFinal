"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { BankData } from "@/types/investment";
import { calculateAverageRate, formatPercentage, formatCurrency } from "@/lib/calculations";
import { YEARS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { DollarSign } from "lucide-react";

interface InvestmentFormProps {
  banks: BankData[];
  onUpdateRate: (bankIndex: number, yearIndex: number, rate: number) => void;
  capital: number;
  onCapitalChange: (capital: number) => void;
  className?: string;
}

export function InvestmentForm({ banks, onUpdateRate, capital, onCapitalChange, className, }: InvestmentFormProps) {
  
  const handleRateChange = ( bankIndex: number, yearIndex: number, value: string ) => {
    const rate = parseFloat(value);
    if (!isNaN(rate) || value === "") onUpdateRate(bankIndex, yearIndex, isNaN(rate) ? 0 : rate);
  };

  const handleCapitalChange = (value: string) => {
    const amount = parseFloat(value);
    if (!isNaN(amount) && amount >= 0) onCapitalChange(amount);
    else if (value === "") onCapitalChange(0);
  };

  return (
    <div className="space-y-6">
      {/* Capital Input Section */}
      <div className="rounded-lg border-2 border-primary/30 bg-gradient-to-br from-primary/10 to-background p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="rounded-full bg-primary p-3">
            <DollarSign className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1 space-y-3">
            <div>
              <h3 className="text-lg font-semibold">Capital a Invertir</h3>
              <p className="text-sm text-muted-foreground">
                Ingresa el monto que deseas invertir
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="capital-input" className="text-sm font-medium">
                Monto (ARS)
              </Label>
              <Input id="capital-input" type="number" min="0" step="1000" value={capital || ""} onChange={(e) => handleCapitalChange(e.target.value)} placeholder="Ej: 850000" className="text-lg font-semibold" />
              {capital > 0 && (
                <p className="text-sm text-muted-foreground">{formatCurrency(capital)}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Banks Section */}
      <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-3", className)}>
        {banks.map((bank, bankIdx) => (
        <div key={bank.id} className="space-y-4 rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md" >
          {/* Bank Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white" style={{ backgroundColor: bank.color }} >
              {bank.name.charAt(0)}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">{bank.name}</h3>
              <p className="text-xs text-muted-foreground"> {bank.shortName} </p>
            </div>
          </div>

          <Separator />

          {/* Rate Inputs */}
          <div className="space-y-4">
            {YEARS.map((year, yearIdx) => (
              <div key={year} className="space-y-2">
                <Label htmlFor={`${bank.id}-year-${yearIdx}`} className="text-sm font-medium" > Año {year} - Tasa Anual (%) </Label>
                <Input id={`${bank.id}-year-${yearIdx}`} type="number" min="0" max="200" step="0.01" value={bank.rates[yearIdx] || ""} onChange={(e) => handleRateChange(bankIdx, yearIdx, e.target.value) } placeholder="Ej: 45.5" className="font-mono" />
              </div>
            ))}
          </div>

          {/* Average Rate Display */}
          <div className="rounded-lg bg-primary/10 p-4">
            <p className="text-sm font-medium text-muted-foreground"> Tasa Promedio </p>
            <p className="mt-1 text-2xl font-bold text-primary"> {formatPercentage(calculateAverageRate(bank.rates))} </p>
            <p className="mt-1 text-xs text-muted-foreground"> Promedio de los {YEARS.length} años </p>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
}