import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen">
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
    </div>
  );
}
