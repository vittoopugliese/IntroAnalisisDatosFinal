import { Calculator, TrendingUp, BarChart3, Award, Code, Shield, } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="space-y-8 p-6">
      <div className="text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-primary/10 p-4">
          <TrendingUp className="h-12 w-12 text-primary" />
        </div>
        <h1 className="mb-2 text-4xl font-bold">
          Sistema de Análisis de Inversiones
        </h1>
        <p className="text-lg text-muted-foreground">
          Herramienta profesional para optimizar inversiones bancarias
        </p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold">Sobre el Proyecto</h2>
          <div className="space-y-4 text-muted-foreground">
            <p>
              Este sistema fue desarrollado como parte del trabajo final de
              <strong> Introducción al Análisis de Datos</strong> por <strong>Vitorio Pugliese</strong>, con el
              objetivo de crear una herramienta práctica para analizar y comparar
              inversiones en plazos fijos de tres bancos argentinos principales.
            </p>
            <p>
              La aplicación permite ingresar tasas históricas, calcular
              rendimientos en diferentes modalidades (anual, trimestral y
              mensual), y visualizar los resultados a través de gráficos
              interactivos y tablas comparativas.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Calculator className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Cálculos Precisos</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Fórmulas financieras validadas para calcular rendimientos con
              reinversión automática en cada período.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Visualización Clara</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Gráficos interactivos con Recharts para entender fácilmente las
              diferencias entre opciones.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Award className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Recomendaciones</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Sistema inteligente que identifica automáticamente la mejor opción
              de inversión.
            </p>
          </div>

          <div className="rounded-lg border bg-card p-4">
            <div className="mb-3 flex items-center gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold">Privacidad</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Todos los datos se almacenan localmente en tu navegador. Sin
              servidores externos.
            </p>
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border bg-card p-6">
          <div className="mb-4 flex items-center gap-2">
            <Code className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Stack Tecnológico</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="mb-3 font-semibold">Frontend</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>Next.js 16</Badge>
                <Badge>React 19</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Tailwind CSS 4</Badge>
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-semibold">UI & Visualización</h3>
              <div className="flex flex-wrap gap-2">
                <Badge>shadcn/ui</Badge>
                <Badge>Radix UI</Badge>
                <Badge>Recharts</Badge>
                <Badge>Lucide Icons</Badge>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold">Metodología de Cálculo</h2>
          <div className="space-y-4">
            <div>
              <h3 className="mb-2 font-semibold">1. Inversión Anual</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Cálculo simple sin reinversión durante el año:
              </p>
              <code className="rounded bg-muted px-3 py-1 text-sm">
                Capital Final = Capital × (1 + Tasa/100)
              </code>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">2. Inversión Trimestral</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Reinversión cada 3 meses (4 trimestres):
              </p>
              <code className="rounded bg-muted px-3 py-1 text-sm">
                Capital Final = Capital × (1 + Tasa/4/100)^4
              </code>
            </div>

            <div>
              <h3 className="mb-2 font-semibold">3. Inversión Mensual</h3>
              <p className="mb-2 text-sm text-muted-foreground">
                Reinversión mensual (12 meses):
              </p>
              <code className="rounded bg-muted px-3 py-1 text-sm">
                Capital Final = Capital × (1 + Tasa/12/100)^12
              </code>
            </div>

            <div className="rounded-lg bg-muted/50 p-4">
              <p className="text-sm font-medium">📊 Tasa Efectiva Anual (TEA)</p>
              <p className="mt-1 text-sm text-muted-foreground">
                La TEA se calcula como: ((Capital Final / Capital Inicial) - 1) ×
                100
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold">Bancos Analizados</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-[#0066CC] font-bold text-white text-2xl">
                B
              </div>
              <h3 className="font-semibold">Banco Provincia</h3>
              <p className="text-xs text-muted-foreground">
                Banco de la Provincia de Buenos Aires
              </p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-[#00A859] font-bold text-white text-2xl">
                B
              </div>
              <h3 className="font-semibold">Banco Nación</h3>
              <p className="text-xs text-muted-foreground">Banco de la Nación Argentina</p>
            </div>
            <div className="rounded-lg border p-4 text-center">
              <div className="mb-2 flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-[#FF6B35] font-bold text-white text-2xl">
                B
              </div>
              <h3 className="font-semibold">Banco Hipotecario</h3>
              <p className="text-xs text-muted-foreground">Banco Hipotecario S.A.</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="rounded-lg border bg-card p-6">
          <h2 className="mb-4 text-2xl font-bold">Créditos</h2>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>Materia:</strong> Introducción al Análisis de Datos
            </p>
            <p>
              <strong>Año:</strong> 2025
            </p>
            <p>
              Trabajo Final - Introducción al Análisis de Datos por Vitorio Pugliese
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border p-8 text-center">
          <h3 className="mb-2 text-2xl font-bold">¿Listo para comenzar?</h3>
          <p className="mb-6 text-muted-foreground">
            Vaya a la calculadora para analizar sus inversiones ahora mismo
          </p>
          <Button asChild size="lg">
            <Link href="/calculator">
              <Calculator className="mr-2 h-5 w-5" />
              Ir a la Calculadora
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

