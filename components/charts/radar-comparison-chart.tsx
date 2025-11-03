"use client";

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend, ResponsiveContainer, Tooltip, } from "recharts";
import { BankResults } from "@/types/investment";

interface RadarComparisonChartProps {
  results: BankResults[];
}

export function RadarComparisonChart({ results }: RadarComparisonChartProps) {
  // Normalize values to 0-100 scale for better visualization
  const maxAnnual = Math.max(...results.map((r) => r.annual.profit));
  const maxQuarterly = Math.max(...results.map((r) => r.quarterly.profit));
  const maxMonthly = Math.max(...results.map((r) => r.monthly.profit));
  const maxRate = Math.max(...results.map((r) => r.averageRate));

  const data = [
    {
      metric: "Tasa Promedio",
      ...results.reduce(
        (acc, r) => ({
          ...acc,
          [r.bank.shortName]: (r.averageRate / maxRate) * 100,
        }),
        {}
      ),
    },
    {
      metric: "Ganancia Anual",
      ...results.reduce(
        (acc, r) => ({
          ...acc,
          [r.bank.shortName]: (r.annual.profit / maxAnnual) * 100,
        }),
        {}
      ),
    },
    {
      metric: "Ganancia Trimestral",
      ...results.reduce(
        (acc, r) => ({
          ...acc,
          [r.bank.shortName]: (r.quarterly.profit / maxQuarterly) * 100,
        }),
        {}
      ),
    },
    {
      metric: "Ganancia Mensual",
      ...results.reduce(
        (acc, r) => ({
          ...acc,
          [r.bank.shortName]: (r.monthly.profit / maxMonthly) * 100,
        }),
        {}
      ),
    },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Análisis Multidimensional</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Comparación normalizada de métricas clave
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid className="stroke-muted" />
          <PolarAngleAxis dataKey="metric" className="text-xs" />
          <PolarRadiusAxis angle={90} domain={[0, 100]} className="text-xs" />
          <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", }} />
          <Legend />
          {results.map(result => <Radar key={result.bank.id} name={result.bank.shortName} dataKey={result.bank.shortName} stroke={result.bank.color} fill={result.bank.color} fillOpacity={0.6} />)}
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

