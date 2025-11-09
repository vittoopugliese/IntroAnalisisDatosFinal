"use client";

import { useInvestment } from "@/contexts/investment-context";
import { InvestmentForm } from "@/components/investment-form";
import { InvestmentTable } from "@/components/investment-table";
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart";
import { LineEvolutionChart } from "@/components/charts/line-evolution-chart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Calculator, Trash2, AlertCircle, TrendingUp, Award, Sparkles } from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/calculations";
import { EXAMPLE_DATA } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function CalculatorPage() {
  const { capital, setCapital, banks, updateBankRate, results, calculate, reset, isDataComplete, hasResults, loadExampleData, bestInvestment, } = useInvestment();

  const router = useRouter();

  const handleCalculate = () => {
    calculate();
    document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleLoadExample = () => {
    loadExampleData(EXAMPLE_DATA);
  };

  const handleViewDashboard = () => {
    router.push("/dashboard");
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Calculadora de Inversiones</h1>
        <p className="mt-1 text-muted-foreground">
          Ingresa el capital y las tasas históricas para calcular rendimientos
        </p>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Ingresa el <strong>monto a invertir</strong> y las <strong>tasas anuales históricas</strong> de los últimos 3
          años (2022, 2023, 2024) para cada banco. El sistema calculará el
          promedio y proyectará los rendimientos en tres modalidades: anual,
          trimestral y mensual.
        </AlertDescription>
      </Alert>

      <InvestmentForm banks={banks} onUpdateRate={updateBankRate} capital={capital} onCapitalChange={setCapital} />

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button onClick={handleCalculate} disabled={!isDataComplete || capital <= 0} size="lg" className="flex-1" >
          <Calculator className="mr-2 h-5 w-5" />
          Calcular Rendimientos
        </Button>
        <Button onClick={handleLoadExample} variant="outline" size="lg">
          <Sparkles className="mr-2 h-5 w-5" />
          Cargar Ejemplo
        </Button>
        <Button onClick={reset} variant="outline" size="lg">
          <Trash2 className="mr-2 h-5 w-5" />
          Limpiar
        </Button>
      </div>

      {(!isDataComplete || capital <= 0) && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            {capital <= 0 && "Ingresa un monto válido para invertir. "}
            {!isDataComplete && "Completa todas las tasas para poder calcular los rendimientos. Cada banco requiere 3 tasas anuales mayores a 0%."}
          </AlertDescription>
        </Alert>
      )}

      {hasResults && results && bestInvestment && (
        <>
          <Separator className="my-8" id="results" />

          <div className="relative overflow-hidden rounded-xl border-2 border-primary/50 bg-gradient-to-br from-primary/30 via-primary/15 to-background p-6 shadow-lg">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="flex items-start gap-4">
                <div className="rounded-full bg-primary p-3">
                  <Award className="h-6 w-6 text-primary-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Mejor Opción de Inversión
                  </p>
                  <h3 className="mt-1 text-2xl font-bold">
                    {bestInvestment.bank.name}
                  </h3>
                  <p className="mt-1 text-lg text-muted-foreground">
                    Modalidad: {bestInvestment.modality.name}
                  </p>
                </div>
              </div>
              <div className="w-full text-left md:w-auto md:text-right">
                <p className="text-sm font-medium text-muted-foreground">
                  Ganancia Total
                </p>
                <p className="mt-1 text-3xl font-bold text-primary">
                  {formatCurrency(bestInvestment.modality.profit)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Capital Final:{" "}
                  {formatCurrency(bestInvestment.modality.finalAmount)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  TEA: {formatPercentage(bestInvestment.modality.effectiveRate)}
                </p>
              </div>
            </div>
            <div className="mt-6 flex gap-2">
              <Button onClick={handleViewDashboard}>
                <TrendingUp className="mr-2 h-4 w-4" />
                Ver Dashboard Completo
              </Button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">
              Tabla Comparativa de Rendimientos
            </h3>
            <InvestmentTable results={results} />
          </div>

          <div>
            <h3 className="mb-4 text-xl font-semibold">Visualización Gráfica</h3>
            <div className="grid gap-6 lg:grid-cols-2">
              <BarComparisonChart results={results} />
              <LineEvolutionChart results={results} capital={capital} />
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-4 text-lg font-semibold">Análisis Detallado</h3>
            <div className="grid gap-6 md:grid-cols-3">
              {results.map((result) => (
                <div key={result.bank.id} className="space-y-4 rounded-lg border bg-muted/30 p-4" >
                  <div className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-full" style={{ backgroundColor: result.bank.color }} />
                    <h4 className="font-semibold">{result.bank.name}</h4>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tasa Promedio:</span>
                      <span className="font-semibold"> {formatPercentage(result.averageRate)} </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Anual:</span>
                      <span className="font-semibold"> {formatCurrency(result.annual.profit)} </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trimestral:</span>
                      <span className="font-semibold"> {formatCurrency(result.quarterly.profit)} </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Mensual:</span>
                      <span className="font-semibold"> {formatCurrency(result.monthly.profit)} </span>
                    </div>
                    <Separator />
                    <div className="rounded bg-primary/10 p-2 text-center">
                      <p className="text-xs text-muted-foreground"> Mejor Modalidad </p>
                      <p className="font-bold text-primary"> {result.bestModality.name} </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Alert>
            <TrendingUp className="h-4 w-4" />
            <AlertDescription>
              <strong>Nota:</strong> Las modalidades trimestral y mensual incluyen
              reinversión automática del capital más intereses en cada período.
              Por eso generan mayores rendimientos que la modalidad anual.
            </AlertDescription>
          </Alert>
        </>
      )}
    </div>
  );
}