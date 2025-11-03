"use client";

import { useInvestment } from "@/contexts/investment-context";
import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  History,
  Trash2,
  Eye,
  Calendar,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { formatCurrency, formatPercentage } from "@/lib/calculations";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function HistoryPage() {
  const { history, deleteHistoryItem, loadFromHistory, clearHistory } =
    useInvestment();

  if (history.length === 0) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center p-6">
        <EmptyState
          icon={History}
          title="No hay historial de cálculos"
          description="Los cálculos que guardes aparecerán aquí. Puedes guardarlos desde el Dashboard."
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Historial de Cálculos</h1>
          <p className="mt-1 text-muted-foreground">
            {history.length} cálculo{history.length !== 1 && "s"} guardado
            {history.length !== 1 && "s"}
          </p>
        </div>
        <Button variant="destructive" onClick={clearHistory}>
          <Trash2 className="mr-2 h-4 w-4" />
          Limpiar Todo
        </Button>
      </div>

      <Alert>
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Haz clic en "Cargar" para restaurar un cálculo anterior. El historial
          se guarda localmente en tu navegador.
        </AlertDescription>
      </Alert>

      {/* History Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {history.map((item, index) => {
          const date = new Date(item.timestamp);
          const bestResult = item.results.reduce((best, current) =>
            current.bestModality.finalAmount > best.bestModality.finalAmount
              ? current
              : best
          );

          return (
            <div
              key={item.id}
              className="group relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md"
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    {date.toLocaleDateString("es-AR", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Badge variant="secondary">#{history.length - index}</Badge>
              </div>

              {/* Time */}
              <p className="mb-4 text-xs text-muted-foreground">
                {date.toLocaleTimeString("es-AR", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>

              {/* Best Result */}
              <div className="mb-4 space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  Mejor Opción
                </p>
                <p className="font-semibold">{bestResult.bank.name}</p>
                <p className="text-sm text-muted-foreground">
                  {bestResult.bestModality.name}
                </p>
              </div>

              {/* Stats */}
              <div className="mb-4 space-y-2 rounded-lg bg-muted/50 p-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Capital:</span>
                  <span className="font-semibold">
                    {formatCurrency(item.capital)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Ganancia:</span>
                  <span className="font-semibold text-green-600">
                    +{formatCurrency(bestResult.bestModality.profit)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">TEA:</span>
                  <span className="font-semibold">
                    {formatPercentage(bestResult.bestModality.effectiveRate)}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="flex-1"
                  onClick={() => loadFromHistory(item.id)}
                >
                  <Eye className="mr-2 h-3 w-3" />
                  Cargar
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => deleteHistoryItem(item.id)}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stats Summary */}
      <div className="rounded-lg border bg-card p-6">
        <h3 className="mb-4 text-lg font-semibold">Estadísticas del Historial</h3>
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Total de Cálculos</p>
            <p className="mt-1 text-2xl font-bold">{history.length}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Primer Cálculo</p>
            <p className="mt-1 text-lg font-semibold">
              {new Date(
                history[history.length - 1]?.timestamp
              ).toLocaleDateString("es-AR")}
            </p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Último Cálculo</p>
            <p className="mt-1 text-lg font-semibold">
              {new Date(history[0]?.timestamp).toLocaleDateString("es-AR")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

