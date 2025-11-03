"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarComparisonChart } from "@/components/charts/bar-comparison-chart";
import { LineEvolutionChart } from "@/components/charts/line-evolution-chart";
import { INITIAL_CAPITAL, SCENARIOS } from "@/lib/constants";
import { BankData } from "@/types/investment";
import { calculateBankResults } from "@/lib/calculations";
import { Info } from "lucide-react";

export default function SimulationPage() {
  const [provinciaRate, setProvinciaRate] = useState(50);
  const [nacionRate, setNacionRate] = useState(55);
  const [hipotecarioRate, setHipotecarioRate] = useState(48);
  const [scenario, setScenario] = useState<
    "optimistic" | "realistic" | "pessimistic"
  >("realistic");

  const scenarioMultiplier =
    SCENARIOS.find((s) => s.type === scenario)?.multiplier || 1;

  const banks: BankData[] = [
    {
      id: "provincia",
      name: "Banco Provincia",
      shortName: "Provincia",
      logo: "/banco-provincia.svg",
      rates: [
        provinciaRate * scenarioMultiplier,
        provinciaRate * scenarioMultiplier,
        provinciaRate * scenarioMultiplier,
      ] as [number, number, number],
      color: "#0066CC",
    },
    {
      id: "nacion",
      name: "Banco Nación",
      shortName: "Nación",
      logo: "/banco-nacion.svg",
      rates: [
        nacionRate * scenarioMultiplier,
        nacionRate * scenarioMultiplier,
        nacionRate * scenarioMultiplier,
      ] as [number, number, number],
      color: "#00A859",
    },
    {
      id: "hipotecario",
      name: "Banco Hipotecario",
      shortName: "Hipotecario",
      logo: "/banco-hipotecario.svg",
      rates: [
        hipotecarioRate * scenarioMultiplier,
        hipotecarioRate * scenarioMultiplier,
        hipotecarioRate * scenarioMultiplier,
      ] as [number, number, number],
      color: "#FF6B35",
    },
  ];

  const results = banks.map((bank) => calculateBankResults(bank, INITIAL_CAPITAL));

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Simulación Interactiva</h1>
        <p className="mt-1 text-muted-foreground">
          Ajusta las tasas en tiempo real y visualiza los cambios
        </p>
      </div>

      <Alert>
        <Info className="h-4 w-4" />
        <AlertDescription>
          Usa los sliders para ajustar las tasas anuales y selecciona un escenario
          para ver cómo cambian los rendimientos en tiempo real.
        </AlertDescription>
      </Alert>

      {/* Scenario Selector */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Escenario Económico</h3>
        <Tabs value={scenario} onValueChange={(v) => setScenario(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            {SCENARIOS.map((s) => (
              <TabsTrigger key={s.type} value={s.type}>
                {s.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {SCENARIOS.map((s) => (
            <TabsContent key={s.type} value={s.type} className="mt-4">
              <p className="text-sm text-muted-foreground">{s.description}</p>
              <p className="mt-2 text-xs text-muted-foreground">
                Multiplicador: {s.multiplier}x
              </p>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Sliders Grid */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Banco Provincia */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#0066CC]" />
              <h3 className="font-semibold">Banco Provincia</h3>
            </div>
            <span className="text-2xl font-bold text-primary">
              {(provinciaRate * scenarioMultiplier).toFixed(1)}%
            </span>
          </div>
          <div className="space-y-2">
            <Label>Tasa Base Anual (%)</Label>
            <Slider
              value={[provinciaRate]}
              onValueChange={([value]) => setProvinciaRate(value)}
              min={0}
              max={100}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>Tasa Real: {(provinciaRate * scenarioMultiplier).toFixed(1)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Banco Nación */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#00A859]" />
              <h3 className="font-semibold">Banco Nación</h3>
            </div>
            <span className="text-2xl font-bold text-primary">
              {(nacionRate * scenarioMultiplier).toFixed(1)}%
            </span>
          </div>
          <div className="space-y-2">
            <Label>Tasa Base Anual (%)</Label>
            <Slider
              value={[nacionRate]}
              onValueChange={([value]) => setNacionRate(value)}
              min={0}
              max={100}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>Tasa Real: {(nacionRate * scenarioMultiplier).toFixed(1)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>

        {/* Banco Hipotecario */}
        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#FF6B35]" />
              <h3 className="font-semibold">Banco Hipotecario</h3>
            </div>
            <span className="text-2xl font-bold text-primary">
              {(hipotecarioRate * scenarioMultiplier).toFixed(1)}%
            </span>
          </div>
          <div className="space-y-2">
            <Label>Tasa Base Anual (%)</Label>
            <Slider
              value={[hipotecarioRate]}
              onValueChange={([value]) => setHipotecarioRate(value)}
              min={0}
              max={100}
              step={0.5}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>0%</span>
              <span>Tasa Real: {(hipotecarioRate * scenarioMultiplier).toFixed(1)}%</span>
              <span>100%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <BarComparisonChart results={results} />
        <LineEvolutionChart results={results} capital={INITIAL_CAPITAL} />
      </div>

      {/* Quick Presets */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Configuraciones Rápidas</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setProvinciaRate(45);
              setNacionRate(48);
              setHipotecarioRate(44);
            }}
          >
            Tasas Bajas
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setProvinciaRate(55);
              setNacionRate(58);
              setHipotecarioRate(54);
            }}
          >
            Tasas Medias
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setProvinciaRate(70);
              setNacionRate(75);
              setHipotecarioRate(68);
            }}
          >
            Tasas Altas
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setProvinciaRate(50);
              setNacionRate(50);
              setHipotecarioRate(50);
            }}
          >
            Todas Iguales
          </Button>
        </div>
      </div>
    </div>
  );
}

