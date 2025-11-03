import React from "react";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Award } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatCurrency, formatPercentage } from "@/lib/calculations";

interface BankCardProps {
  name: string;
  logo: string;
  averageRate: number;
  bestModality: string;
  totalReturn: number;
  profit: number;
  isWinner?: boolean;
  color?: string;
  onClick?: () => void;
}

export function BankCard({ name, logo, averageRate, bestModality, totalReturn, profit, isWinner = false, color = "hsl(var(--primary))", onClick, }: BankCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-lg",
        isWinner && "border-primary/50 ring-2 ring-primary/20",
        onClick && "cursor-pointer hover:scale-[1.02]"
      )}
      style={
        isWinner
          ? {
              background: `linear-gradient(135deg, ${color}15 0%, transparent 100%)`,
            }
          : undefined
      }
    >
      {isWinner && (
        <div className="absolute right-4 top-4">
          <Badge className="bg-primary text-primary-foreground">
            <Award className="mr-1 h-3 w-3" />
            Recomendado
          </Badge>
        </div>
      )}

      <div className="mb-4 flex items-center gap-4">
        <div
          className="flex h-16 w-16 items-center justify-center rounded-full"
          style={{ backgroundColor: `${color}20` }}
        >
          <div
            className="flex h-12 w-12 items-center justify-center rounded-full font-bold text-white"
            style={{ backgroundColor: color }}
          >
            {name.charAt(0)}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm text-muted-foreground">
            Tasa Promedio: {formatPercentage(averageRate)}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="rounded-lg bg-muted/50 p-3">
          <p className="text-xs text-muted-foreground">Mejor Modalidad</p>
          <p className="text-lg font-semibold">{bestModality}</p>
        </div>

        <div className="flex items-center justify-between rounded-lg bg-muted/50 p-3">
          <div>
            <p className="text-xs text-muted-foreground">Capital Final</p>
            <p className="text-lg font-bold">{formatCurrency(totalReturn)}</p>
          </div>
          <TrendingUp className="h-5 w-5 text-green-600" />
        </div>

        <div className="rounded-lg bg-primary/10 p-3">
          <p className="text-xs text-muted-foreground">Ganancia Total</p>
          <p className="text-xl font-bold text-primary">
            +{formatCurrency(profit)}
          </p>
        </div>
      </div>
    </div>
  );
}

