# 🏦 Sistema de Análisis de Inversiones Bancarias

> Herramienta profesional para analizar y comparar inversiones en plazos fijos de bancos argentinos

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)

## 📋 Descripción del Proyecto

Sistema completo de análisis de inversiones desarrollado con **Next.js 16**, **React 19**, **TypeScript** y **Tailwind CSS 4**. Permite analizar y comparar inversiones en plazos fijos de tres bancos argentinos principales:

- 🏦 **Banco Provincia**
- 🏦 **Banco Nación**  
- 🏦 **Banco Hipotecario**

El sistema calcula automáticamente los rendimientos en tres modalidades diferentes (anual, trimestral y mensual) y recomienda la mejor opción de inversión basándose en tasas históricas.

---

## ✨ Características Principales

### 📊 Análisis Completo
- ✅ Cálculo de rendimientos en 3 modalidades (anual, trimestral, mensual)
- ✅ Comparación de 3 bancos simultáneamente
- ✅ Cálculo de Tasa Efectiva Anual (TEA) con reinversión
- ✅ Recomendación automática de la mejor opción

### 📈 Visualización Profesional
- ✅ Dashboard ejecutivo con KPIs
- ✅ Gráficos interactivos (barras, líneas, radar, pie)
- ✅ Tablas comparativas detalladas
- ✅ Cards informativas con estadísticas

### 🎯 Funcionalidades Avanzadas
- ✅ Simulador interactivo con sliders en tiempo real
- ✅ Escenarios económicos (optimista, realista, pesimista)
- ✅ Historial de cálculos guardados localmente
- ✅ Modo claro/oscuro (tema)
- ✅ Diseño responsive (mobile-first)

---

## 🛠️ Stack Tecnológico

### Core Framework
```json
{
  "next": "16.0.1",
  "react": "19.2.0",
  "react-dom": "19.2.0",
  "typescript": "^5"
}
```

### UI & Styling
- **Tailwind CSS 4** - Framework CSS utility-first
- **shadcn/ui** - Componentes UI basados en Radix UI
- **Lucide React** - Iconos modernos
- **next-themes** - Soporte para modo claro/oscuro

### Visualización de Datos
- **Recharts 3.3** - Librería de gráficos para React

### Fuente
- **Josefin Sans** de Google Fonts (weights: 100-700)

---

## 📁 Estructura del Proyecto

```
investment-analyzer/
├── app/                          # App Router de Next.js
│   ├── page.tsx                  # Landing Page
│   ├── dashboard/page.tsx        # Dashboard ejecutivo
│   ├── calculator/page.tsx       # Calculadora principal
│   ├── comparison/page.tsx       # Comparación detallada
│   ├── simulation/page.tsx       # Simulación interactiva
│   ├── history/page.tsx          # Historial de cálculos
│   ├── about/page.tsx            # Información del proyecto
│   ├── layout.tsx                # Root layout
│   └── globals.css               # Estilos globales
├── components/                   # Componentes React
│   ├── app-sidebar.tsx           # Sidebar de navegación
│   ├── bank-card.tsx             # Card de banco
│   ├── investment-form.tsx       # Formulario de tasas
│   ├── investment-table.tsx      # Tabla comparativa
│   ├── stat-card.tsx             # Card de estadística
│   ├── winner-badge.tsx          # Badge de ganador
│   ├── empty-state.tsx           # Estado vacío
│   ├── result-card.tsx           # Card de resultado
│   ├── charts/                   # Componentes de gráficos
│   │   ├── bar-comparison-chart.tsx
│   │   ├── line-evolution-chart.tsx
│   │   ├── radar-comparison-chart.tsx
│   │   └── pie-modality-chart.tsx
│   └── ui/                       # Componentes UI (shadcn)
├── contexts/                     # React Contexts
│   ├── investment-context.tsx    # Context de inversiones
│   └── global-context.tsx        # Context global
├── hooks/                        # Custom Hooks
│   ├── use-investment-calculator.ts
│   ├── use-local-storage.ts
│   └── use-mobile.ts
├── lib/                          # Utilidades y lógica
│   ├── calculations.ts           # Funciones de cálculo
│   ├── constants.ts              # Constantes del sistema
│   └── utils.ts                  # Utilidades generales
├── types/                        # Tipos TypeScript
│   └── investment.ts             # Tipos de inversiones
├── public/                       # Assets estáticos
│   ├── banco-provincia.svg
│   ├── banco-nacion.svg
│   └── banco-hipotecario.svg
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── README.md
```

---

## 🚀 Instalación y Configuración

### Requisitos Previos
- Node.js 18+ 
- npm, yarn, pnpm o bun

### 1. Clonar el Repositorio
```bash
git clone <repository-url>
cd investment-analyzer
```

### 2. Instalar Dependencias
```bash
npm install
# o
yarn install
# o
pnpm install
```

### 3. Ejecutar en Desarrollo
```bash
npm run dev
# o
yarn dev
# o
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### 4. Build para Producción
```bash
npm run build
npm start
```

---

## 📚 Guía de Uso

### 1️⃣ Ingresar Datos
1. Ve a la página **Calculadora** (`/calculator`)
2. Ingresa las **tasas anuales** de los últimos 3 años para cada banco
3. El sistema calculará automáticamente el promedio

### 2️⃣ Calcular Rendimientos
1. Haz clic en **"Calcular Rendimientos"**
2. El sistema procesará los datos y calculará:
   - Inversión anual (1 año completo)
   - Inversión trimestral (4 trimestres con reinversión)
   - Inversión mensual (12 meses con reinversión)

### 3️⃣ Ver Resultados
- **Tabla Comparativa**: Muestra todos los rendimientos lado a lado
- **Gráficos**: Visualiza la evolución y comparación
- **Mejor Opción**: El sistema resalta automáticamente la opción más rentable

### 4️⃣ Explorar el Dashboard
1. Ve a **Dashboard** (`/dashboard`)
2. Visualiza KPIs, gráficos avanzados y análisis detallado
3. Guarda el cálculo en el historial

### 5️⃣ Simular Escenarios
1. Ve a **Simulación** (`/simulation`)
2. Ajusta las tasas con sliders en tiempo real
3. Prueba escenarios optimistas, realistas o pesimistas

---

## 🧮 Metodología de Cálculo

### Capital Inicial Fijo
```typescript
const CAPITAL_INICIAL = 850000; // $850,000 ARS
```

### 1. Inversión Anual
Inversión por 1 año completo sin reinversión intermedia:

```typescript
Capital_Final = Capital_Inicial × (1 + Tasa_Promedio/100)
```

**Ejemplo:**  
Capital: $850,000 | Tasa: 52%  
→ Capital Final: $1,292,000 | Ganancia: $442,000

---

### 2. Inversión Trimestral
Inversión con reinversión cada 3 meses (4 trimestres):

```typescript
Tasa_Trimestral = Tasa_Anual / 4
Capital_Final = Capital_Inicial × (1 + Tasa_Trimestral/100)^4
```

**Ejemplo:**  
Capital: $850,000 | Tasa Anual: 52% | Tasa Trimestral: 13%  
→ Capital Final: $1,300,450 | Ganancia: $450,450

---

### 3. Inversión Mensual
Inversión con reinversión mensual (12 meses):

```typescript
Tasa_Mensual = Tasa_Anual / 12
Capital_Final = Capital_Inicial × (1 + Tasa_Mensual/100)^12
```

**Ejemplo:**  
Capital: $850,000 | Tasa Anual: 52% | Tasa Mensual: 4.33%  
→ Capital Final: $1,304,680 | Ganancia: $454,680

---

### Tasa Efectiva Anual (TEA)
La TEA representa el rendimiento real considerando la reinversión:

```typescript
TEA = ((Capital_Final / Capital_Inicial) - 1) × 100
```

---

## 🎨 Características de Diseño

### Tema Personalizable
- 🌞 **Modo Claro**: Diseño limpio y profesional
- 🌙 **Modo Oscuro**: Reduce fatiga visual
- 🎨 **Paleta de Colores**: Verde para finanzas y confianza

### Responsive Design
- 📱 **Mobile First**: Optimizado para dispositivos móviles
- 💻 **Desktop**: Aprovecha pantallas grandes
- 📐 **Adaptativo**: Se ajusta a cualquier tamaño de pantalla

### Componentes UI
- ✨ Cards con hover effects
- 📊 Gráficos interactivos
- 🎯 Badges y tooltips informativos
- ⚡ Animaciones suaves

---

## 🔒 Privacidad y Seguridad

- ✅ **Sin servidor backend**: Todo se ejecuta en el navegador
- ✅ **Datos locales**: Se guardan en `localStorage`
- ✅ **Sin cookies de terceros**: Privacidad garantizada
- ✅ **Sin recopilación de datos**: Tus cálculos son privados

---

## 📊 Ejemplos de Uso

### Caso de Uso 1: Comparación Básica
```
Banco Provincia: Tasas [45%, 52%, 58%] → Promedio: 51.67%
Banco Nación:    Tasas [48%, 55%, 62%] → Promedio: 55%
Banco Hipotecario: Tasas [44%, 51%, 57%] → Promedio: 50.67%

Resultado: Banco Nación con inversión mensual es la mejor opción
Ganancia: $473,250 (55.68% TEA)
```

### Caso de Uso 2: Simulación de Escenarios
```
Escenario Optimista (+20%): Tasas suben a 60%+
→ Ganancia proyectada: $550,000+

Escenario Pesimista (-20%): Tasas bajan a 40%
→ Ganancia proyectada: $350,000
```

---

## 🎓 Contexto Académico

Este proyecto fue desarrollado como **Trabajo Final** para la materia:

- **Materia**: Introducción al Análisis de Datos
- **Año**: 2025
- **Objetivo**: Crear una herramienta práctica de análisis de inversiones
- **Tecnologías**: Next.js 16, React 19, TypeScript, Tailwind CSS 4

---

## 📝 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo

# Producción
npm run build        # Compila para producción
npm start            # Inicia servidor de producción

# Linting
npm run lint         # Ejecuta ESLint

# Formateo
npm run format       # Formatea código con Prettier (si está configurado)
```

---

## 🤝 Contribuciones

Este es un proyecto académico, pero las sugerencias son bienvenidas:

1. Fork el repositorio
2. Crea una rama (`git checkout -b feature/mejora`)
3. Commit tus cambios (`git commit -m 'Agregar nueva feature'`)
4. Push a la rama (`git push origin feature/mejora`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto es de código abierto para fines educativos.

---

## 🙏 Agradecimientos

- **Next.js Team** - Por el increíble framework
- **Vercel** - Por el hosting y deployment
- **shadcn** - Por los componentes UI
- **Recharts** - Por la librería de gráficos

---

## 📞 Contacto

Para consultas sobre el proyecto:

- 📧 Email: [tu-email@ejemplo.com]
- 🌐 Website: [tu-website.com]

---

## 🚀 Roadmap Futuro

- [ ] Exportar resultados a PDF
- [ ] Importar datos desde CSV
- [ ] Comparación con inflación (rendimiento real)
- [ ] Proyección a 5 años
- [ ] Modo presentación fullscreen
- [ ] Compartir resultados con URL
- [ ] PWA (Progressive Web App)
- [ ] Más bancos argentinos

---

**Hecho con ❤️ para el análisis financiero inteligente**
