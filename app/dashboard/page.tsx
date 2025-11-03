"use client";

import { useInvestment } from "@/contexts/investment-context";
import { EmptyState } from "@/components/empty-state";
import { StatCard } from "@/components/stat-card";
import { BankCard } from "@/components/bank-card";
import { InvestmentTable } from "@/components/investment-table";
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart";
import { LineEvolutionChart } from "@/components/charts/line-evolution-chart";
import { RadarComparisonChart } from "@/components/charts/radar-comparison-chart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  Award,
  DollarSign,
  Percent,
  Save,
} from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/calculations";

export default function DashboardPage() {
  const { results, isCalculating, hasResults, capital, bestInvestment, saveToHistory } =
    useInvestment();

  // Loading State
  if (isCalculating) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="mb-2 h-8 w-64" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-96" />
      </div>
    );
  }

  // Empty State - No calculations yet
  if (!hasResults || !results || !bestInvestment) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6">
        <EmptyState
          icon={Calculator}
          title="No hay datos calculados"
          description="Ve a la calculadora para ingresar las tasas históricas y comenzar el análisis de inversiones."
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

  const best = bestInvestment;
  const secondBest = results
    .flatMap((r) => [r.annual, r.quarterly, r.monthly])
    .sort((a, b) => b.finalAmount - a.finalAmount)[1];

  const differenceVsSecond =
    best.modality.finalAmount - (secondBest?.finalAmount || 0);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard Ejecutivo</h1>
          <p className="mt-1 text-muted-foreground">
            Análisis completo de inversiones bancarias
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={saveToHistory} variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Guardar Análisis
          </Button>
          <Button asChild>
            <Link href="/calculator">
              <Calculator className="mr-2 h-4 w-4" />
              Nueva Calculación
            </Link>
          </Button>
        </div>
      </div>

      {/* Hero Card - Best Investment */}
      <div className="relative overflow-hidden rounded-xl border border-primary/50 bg-gradient-to-br from-primary/20 via-primary/10 to-background p-8 shadow-lg">
        <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-primary/20 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-6 md:flex-row md:items-start">
          <div className="flex-1">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-primary/20 px-3 py-1 text-sm font-medium text-primary">
              <Award className="h-4 w-4" />
              Mejor Inversión
            </div>
            <h2 className="mb-2 text-4xl font-bold">{best.bank.name}</h2>
            <p className="mb-4 text-xl text-muted-foreground">
              Modalidad: {best.modality.name}
            </p>
            <p className="text-sm text-muted-foreground">
              Con esta opción obtienes {formatCurrency(differenceVsSecond)} más
              que la segunda mejor alternativa.
            </p>
          </div>
          <div className="text-left md:text-right">
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Ganancia Proyectada
            </p>
            <p className="mb-4 text-5xl font-bold text-primary">
              {formatCurrency(best.modality.profit)}
            </p>
            <p className="text-lg text-muted-foreground">
              Tasa Efectiva Anual:{" "}
              <span className="font-semibold text-foreground">
                {formatPercentage(best.modality.effectiveRate)}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={DollarSign}
          title="Capital Inicial"
          value={formatCurrency(capital)}
          description="Monto a invertir"
          tooltipDescription="Capital base para todas las inversiones"
        />
        <StatCard
          icon={TrendingUp}
          title="Capital Final"
          value={formatCurrency(best.modality.finalAmount)}
          description="Con mejor opción"
          tooltipDescription="Monto total al finalizar la inversión con reinversión"
        />
        <StatCard
          icon={Award}
          title="Ganancia Neta"
          value={formatCurrency(best.modality.profit)}
          description={`Inversión ${best.modality.name.toLowerCase()}`}
          tooltipDescription="Diferencia entre capital final e inicial"
        />
        <StatCard
          icon={Percent}
          title="Tasa Efectiva"
          value={formatPercentage(best.modality.effectiveRate)}
          description="TEA del mejor banco"
          tooltipDescription="Tasa Efectiva Anual considerando reinversión"
        />
      </div>

      <Separator />

      {/* Bank Cards */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">Resumen por Banco</h3>
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
              isWinner={result.bank.id === best.bank.id}
              color={result.bank.color}
            />
          ))}
        </div>
      </div>

      <Separator />

      {/* Charts Grid */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">Análisis Visual</h3>
        <div className="grid gap-6 lg:grid-cols-2">
          <BarComparisonChart results={results} />
          <LineEvolutionChart results={results} capital={capital} />
        </div>
        <div className="mt-6">
          <RadarComparisonChart results={results} />
        </div>
      </div>

      <Separator />

      {/* Detailed Table */}
      <div>
        <h3 className="mb-4 text-xl font-semibold">Tabla Comparativa Detallada</h3>
        <InvestmentTable results={results} />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3 rounded-lg border bg-muted/30 p-6 sm:flex-row">
        <div className="flex-1">
          <h4 className="font-semibold">¿Quieres ajustar los datos?</h4>
          <p className="text-sm text-muted-foreground">
            Modifica las tasas o prueba diferentes escenarios
          </p>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/simulation">Ver Simulación</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/comparison">Comparar Detalle</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

