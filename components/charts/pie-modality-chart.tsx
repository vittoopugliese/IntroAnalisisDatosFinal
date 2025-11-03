"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, } from "recharts";
import { BankResults } from "@/types/investment";
import { formatCurrency } from "@/lib/calculations";

interface PieModalityChartProps {
  bankResult: BankResults;
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export function PieModalityChart({ bankResult }: PieModalityChartProps) {
  const data = [
    { name: "Anual", value: bankResult.annual.profit },
    { name: "Trimestral", value: bankResult.quarterly.profit },
    { name: "Mensual", value: bankResult.monthly.profit },
  ];

  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="mb-4 text-lg font-semibold"> Distribución de Ganancias - {bankResult.bank.shortName} </h3>
      <p className="mb-4 text-sm text-muted-foreground"> Comparación de modalidades de inversión </p>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" labelLine={false} outerRadius={80} fill="#8884d8" dataKey="value" >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => formatCurrency(value)} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px", }} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}