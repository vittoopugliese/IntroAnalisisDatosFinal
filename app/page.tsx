import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  LayoutDashboard,
  TrendingUp,
  BarChart3,
  Award,
  Zap,
  Shield,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="flex min-h-[80vh] flex-col items-center justify-center px-6 py-12 text-center">
        <div className="max-w-4xl space-y-8">
          <div className="inline-block rounded-full bg-primary/10 px-4 py-2">
            <p className="text-sm font-medium text-primary">
              Sistema de Análisis de Inversiones
            </p>
          </div>

          <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
            Optimiza tus{" "}
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              Inversiones Bancarias
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Compara plazos fijos de Banco Provincia, Banco Nación y Banco
            Hipotecario. Analiza rendimientos, visualiza proyecciones y toma
            mejores decisiones financieras.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/calculator">
                <Calculator className="mr-2 h-5 w-5" />
                Comenzar Análisis
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="w-full sm:w-auto"
            >
              <Link href="/dashboard">
                <LayoutDashboard className="mr-2 h-5 w-5" />
                Ver Dashboard
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8">
            <div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Bancos</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground">Modalidades</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground">Gratis</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Todo lo que necesitas para analizar inversiones
            </h2>
            <p className="text-lg text-muted-foreground">
              Herramientas profesionales para maximizar tus rendimientos
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Análisis Completo</h3>
              <p className="text-muted-foreground">
                Compara 3 modalidades de inversión (anual, trimestral y mensual)
                para cada banco con cálculos precisos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Visualización Clara
              </h3>
              <p className="text-muted-foreground">
                Gráficos interactivos, tablas comparativas y dashboards
                ejecutivos para entender tus opciones.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Recomendación Inteligente
              </h3>
              <p className="text-muted-foreground">
                El sistema identifica automáticamente la mejor opción de
                inversión según tus datos.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Cálculos Instantáneos
              </h3>
              <p className="text-muted-foreground">
                Resultados en tiempo real con fórmulas financieras validadas y
                tasas efectivas anuales.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Datos Seguros
              </h3>
              <p className="text-muted-foreground">
                Tus cálculos se guardan localmente. Sin servidores externos, sin
                riesgos de seguridad.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="group relative overflow-hidden rounded-xl border bg-card p-6 shadow-sm transition-all hover:shadow-md">
              <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3">
                <Calculator className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                Historial Completo
              </h3>
              <p className="text-muted-foreground">
                Guarda y compara tus cálculos anteriores para hacer seguimiento
                de tendencias.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">¿Cómo funciona?</h2>
            <p className="text-lg text-muted-foreground">
              Tres pasos simples para optimizar tus inversiones
            </p>
          </div>

          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                1
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Ingresa las tasas históricas
                </h3>
                <p className="text-muted-foreground">
                  Completa las tasas anuales de los últimos 3 años para cada
                  banco (Provincia, Nación e Hipotecario).
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                2
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Calcula rendimientos
                </h3>
                <p className="text-muted-foreground">
                  El sistema calcula automáticamente los rendimientos para las 3
                  modalidades (anual, trimestral y mensual) con reinversión.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
                3
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold">
                  Visualiza y decide
                </h3>
                <p className="text-muted-foreground">
                  Explora dashboards, gráficos y tablas comparativas. El sistema
                  te recomienda la mejor opción automáticamente.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/calculator">
                Comenzar Ahora
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-background border p-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Listo para optimizar tus inversiones
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Comienza a comparar bancos y modalidades en menos de 2 minutos
          </p>
          <Button asChild size="lg">
            <Link href="/calculator">
              <Calculator className="mr-2 h-5 w-5" />
              Ir a la Calculadora
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
