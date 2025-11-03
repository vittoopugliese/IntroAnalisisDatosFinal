"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts"; import { BankResults } from "@/types/investment";
import { formatCurrency } from "@/lib/calculations";

interface BarComparisonChartProps {
  results: BankResults[];
}

export function BarComparisonChart({ results }: BarComparisonChartProps) {
  const data = results.map((result) => ({
    name: result.bank.shortName,
    Anual: result.annual.profit,
    Trimestral: result.quarterly.profit,
    Mensual: result.monthly.profit,
  }));

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Comparación de Ganancias</h3>
      <p className="mb-4 text-sm text-muted-foreground"> Ganancia neta por modalidad de inversión (en pesos) </p>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="name" className="text-xs" />
          <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", }} />
          <Legend />
          <Bar dataKey="Anual" fill="#8884d8" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Trimestral" fill="#82ca9d" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Mensual" fill="#ffc658" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}