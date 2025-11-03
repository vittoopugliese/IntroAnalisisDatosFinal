"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, } from "recharts";
import { BankResults } from "@/types/investment";
import { formatCurrency } from "@/lib/calculations";

interface LineEvolutionChartProps {
  results: BankResults[];
  capital: number;
}

export function LineEvolutionChart({ results, capital, }: LineEvolutionChartProps) {
  // Generate month-by-month evolution data
  const data = Array.from({ length: 13 }, (_, month) => {
    const monthData: { month: string; [key: string]: number | string; } = { month: `Mes ${month}` };

    results.forEach((result) => {
      const monthlyRate = result.averageRate / 12 / 100;
      monthData[result.bank.shortName] =
        capital * Math.pow(1 + monthlyRate, month);
    });

    return monthData;
  });

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold">Evolución del Capital</h3>
      <p className="mb-4 text-sm text-muted-foreground">
        Proyección mensual del capital con reinversión
      </p>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="month" className="text-xs" />
          <YAxis className="text-xs" tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`} />
          <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", }} />
          <Legend />
          {results.map(result => <Line key={result.bank.id} type="monotone" dataKey={result.bank.shortName} stroke={result.bank.color} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />)}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

