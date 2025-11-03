import "./globals.css";
import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { InvestmentProvider } from "@/contexts/investment-context";
import { GlobalContextProvider } from "@/contexts/global-context";

const josefinSans = Josefin_Sans({ 
  variable: "--font-josefin-sans", 
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = { 
  title: "Análisis de Datos Final", 
  description: "Sistema completo de análisis de inversiones en plazos fijos de bancos argentinos. Compara rendimientos, visualiza proyecciones y toma mejores decisiones financieras." 
};

// Root layout with sidebar that renders the sidebar and the main content
export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${josefinSans.variable} font-josefin-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <GlobalContextProvider>
            <InvestmentProvider>
              <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                  <div className="flex min-h-screen flex-1 flex-col bg-muted/50 sm:ml-4 sm:rounded-t-2xl">
                    <main className="flex-1">{children}</main>
                  </div>
                </SidebarInset>
              </SidebarProvider>
            </InvestmentProvider>
          </GlobalContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
};