"use client";

import { useInvestment } from "@/contexts/investment-context";
import { EmptyState } from "@/components/empty-state";
import { BankCard } from "@/components/bank-card";
import { InvestmentTable } from "@/components/investment-table";
import { RadarComparisonChart } from "@/components/charts/radar-comparison-chart";
import { PieModalityChart } from "@/components/charts/pie-modality-chart";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Calculator, Scale } from "lucide-react";
import { formatCurrency, formatPercentage, getRankingOfAllOptions } from "@/lib/calculations";

export default function ComparisonPage() {
  const { results, hasResults, bestInvestment } = useInvestment();

  if (!hasResults || !results) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6">
        <EmptyState
          icon={Scale}
          title="No hay datos para comparar"
          description="Primero debes calcular las inversiones en la calculadora."
          action={
            <Button asChild size="lg">
              <Link href="/calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Ir a Calculadora
              </Link>
            </Button>
          }
        />
      </div>
    );
  }

  const ranking = getRankingOfAllOptions(results);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Comparación Detallada</h1>
        <p className="mt-1 text-muted-foreground">
          Análisis exhaustivo de todas las opciones de inversión
        </p>
      </div>

      {/* Bank Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {results.map((result) => (
          <BankCard
            key={result.bank.id}
            name={result.bank.name}
            logo={result.bank.logo}
            averageRate={result.averageRate}
            bestModality={result.bestModality.name}
            totalReturn={result.bestModality.finalAmount}
            profit={result.bestModality.profit}
            isWinner={result.bank.id === bestInvestment?.bank.id}
            color={result.bank.color}
          />
        ))}
      </div>

      {/* Tabs for Different Views */}
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="table">Tabla Comparativa</TabsTrigger>
          <TabsTrigger value="ranking">Ranking Completo</TabsTrigger>
          <TabsTrigger value="charts">Gráficos</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="space-y-6">
          <InvestmentTable results={results} />
        </TabsContent>

        <TabsContent value="ranking" className="space-y-6">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">
              Ranking de Todas las Opciones
            </h3>
            <p className="mb-6 text-sm text-muted-foreground">
              Ordenado por monto final de mayor a menor
            </p>
            <div className="space-y-3">
              {ranking.map((option) => (
                <div
                  key={`${option.bank}-${option.modality}`}
                  className={`flex items-center justify-between rounded-lg border p-4 transition-all hover:shadow-md ${
                    option.rank === 1
                      ? "border-primary/50 bg-primary/5"
                      : "bg-card"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold ${
                        option.rank === 1
                          ? "bg-primary text-primary-foreground"
                          : option.rank === 2
                          ? "bg-muted text-foreground"
                          : option.rank === 3
                          ? "bg-muted/70 text-foreground"
                          : "bg-muted/50 text-muted-foreground"
                      }`}
                    >
                      {option.rank}
                    </div>
                    <div>
                      <p className="font-semibold">{option.bank}</p>
                      <p className="text-sm text-muted-foreground">
                        {option.modality}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold">
                      {formatCurrency(option.amount)}
                    </p>
                    {option.rank === 1 && (
                      <p className="text-xs font-medium text-primary">
                        🏆 Mejor Opción
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="charts" className="space-y-6">
          <RadarComparisonChart results={results} />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {results.map((result) => (
              <PieModalityChart key={result.bank.id} bankResult={result} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Detailed Comparison */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-6 text-lg font-semibold">
          Comparación de Tasas Efectivas
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 text-left">Banco</th>
                <th className="p-3 text-center">TEA Anual</th>
                <th className="p-3 text-center">TEA Trimestral</th>
                <th className="p-3 text-center">TEA Mensual</th>
                <th className="p-3 text-center">Mejor TEA</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result) => (
                <tr
                  key={result.bank.id}
                  className="border-b hover:bg-muted/30"
                >
                  <td className="p-3 font-medium">{result.bank.name}</td>
                  <td className="p-3 text-center">
                    {formatPercentage(result.annual.effectiveRate)}
                  </td>
                  <td className="p-3 text-center">
                    {formatPercentage(result.quarterly.effectiveRate)}
                  </td>
                  <td className="p-3 text-center">
                    {formatPercentage(result.monthly.effectiveRate)}
                  </td>
                  <td className="p-3 text-center font-bold text-primary">
                    {formatPercentage(result.bestModality.effectiveRate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

