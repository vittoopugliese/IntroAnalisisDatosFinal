"use client";

import { Award, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BankResults, BestInvestment } from "@/types/investment";
import { formatCurrency, formatPercentage, findBestInvestment, } from "@/lib/calculations";
import { cn } from "@/lib/utils";

interface InvestmentTableProps {
  results: BankResults[];
  className?: string;
}

export function InvestmentTable({ results, className }: InvestmentTableProps) {
  const best: BestInvestment = findBestInvestment(results);

  const isOverallBest = (result: BankResults, modalityType: string) => {
    return ( result.bank.id === best.bank.id && best.modality.type === modalityType );
  };

  const isBestForBank = (result: BankResults, modalityType: string) => {
    return result.bestModality.type === modalityType;
  };

  return (
    <div className={cn("rounded-lg border bg-card shadow-sm", className)}>
      <div className="p-6 pb-4">
        <h3 className="text-xl font-bold">Tabla Comparativa de Rendimientos</h3>
        <p className="mt-1 text-sm text-muted-foreground"> Comparación detallada por banco y modalidad de inversión </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="p-4 text-left font-semibold">Concepto</th>
              {results.map((result) => (
                <th key={result.bank.id} className="p-4 text-center font-semibold" >
                  <div className="flex items-center justify-center gap-2">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: result.bank.color }} />
                    {result.bank.shortName}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {/* Average Rate Row */}
            <tr className="border-b transition-colors hover:bg-muted/30">
              <td className="p-4 font-medium">Tasa Promedio</td>
              {results.map((result) => (
                <td key={result.bank.id} className="p-4 text-center">
                  <span className="font-semibold">
                    {formatPercentage(result.averageRate)}
                  </span>
                </td>
              ))}
            </tr>

            {/* Annual Investment Row */}
            <tr className="border-b transition-colors hover:bg-muted/30">
              <td className="p-4 font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#8884d8]" />
                  Inversión Anual
                </div>
              </td>
              {results.map((result) => {
                const isBest = isOverallBest(result, "annual");
                const isBestBank = isBestForBank(result, "annual");
                return (
                  <td key={result.bank.id} className={cn( "p-4 text-center", isBest && "bg-primary/5" )} >
                    <div className="space-y-1">
                      <p className="font-semibold"> {formatCurrency(result.annual.finalAmount)} </p>
                      <p className="text-sm text-green-600"> +{formatCurrency(result.annual.profit)} </p>
                      {isBestBank && !isBest && <Badge variant="secondary" className="text-xs"> Mejor aquí </Badge> }
                      { isBest && <Badge className="text-xs"> <Award className="mr-1 h-3 w-3" /> Ganador </Badge>}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Quarterly Investment Row */}
            <tr className="border-b transition-colors hover:bg-muted/30">
              <td className="p-4 font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#82ca9d]" />
                  Inversión Trimestral
                </div>
              </td>
              {results.map((result) => {
                const isBest = isOverallBest(result, "quarterly");
                const isBestBank = isBestForBank(result, "quarterly");
                return (
                  <td key={result.bank.id} className={cn( "p-4 text-center", isBest && "bg-primary/5" )} >
                    <div className="space-y-1">
                      <p className="font-semibold"> {formatCurrency(result.quarterly.finalAmount)} </p>
                      <p className="text-sm text-green-600"> +{formatCurrency(result.quarterly.profit)} </p>
                      {isBestBank && !isBest && <Badge variant="secondary" className="text-xs"> Mejor aquí </Badge>}
                      {isBest && <Badge className="text-xs"> <Award className="mr-1 h-3 w-3" /> Ganador </Badge>}
                    </div>
                  </td>
                );
              })}
            </tr>

            <tr className="border-b transition-colors hover:bg-muted/30">
              <td className="p-4 font-medium">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-[#ffc658]" />
                  Inversión Mensual
                </div>
              </td>
              {results.map((result) => {
                const isBest = isOverallBest(result, "monthly");
                const isBestBank = isBestForBank(result, "monthly");
                return (
                  <td key={result.bank.id} className={cn( "p-4 text-center", isBest && "bg-primary/5" )} >
                    <div className="space-y-1">
                      <p className="font-semibold"> {formatCurrency(result.monthly.finalAmount)} </p>
                      <p className="text-sm text-green-600"> +{formatCurrency(result.monthly.profit)} </p>
                      {isBestBank && !isBest && <Badge variant="secondary" className="text-xs">Mejor aquí</Badge>}
                      {isBest && <Badge className="text-xs"> <Award className="mr-1 h-3 w-3" /> Ganador </Badge>}
                    </div>
                  </td>
                );
              })}
            </tr>

            {/* Best Modality Summary Row */}
            <tr className="bg-muted/30">
              <td className="p-4 font-bold">Mejor Modalidad por Banco</td>
              {results.map((result) => {
                const isBest = result.bank.id === best.bank.id && result.bestModality.type === best.modality.type;
                return (
                  <td key={result.bank.id} className={cn( "p-4 text-center", isBest && "bg-primary/10" )} >
                    <div className="space-y-2">
                      <Badge variant={isBest ? "default" : "secondary"} className="mb-1" > {result.bestModality.name} </Badge>
                      <p className="text-lg font-bold"> {formatCurrency(result.bestModality.finalAmount)} </p>
                      <p className="text-sm text-muted-foreground"> TEA: {formatPercentage(result.bestModality.effectiveRate)} </p>
                      {isBest && (
                        <div className="flex items-center justify-center gap-1 text-primary">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-xs font-semibold">
                            MEJOR OPCIÓN GLOBAL
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}