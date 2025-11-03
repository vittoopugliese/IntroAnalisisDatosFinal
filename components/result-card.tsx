import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultCardProps {
  icon?: LucideIcon;
  label: string;
  value: string | number;
  description?: string;
  highlight?: boolean;
  className?: string;
}

export function ResultCard({ icon: Icon, label, value, description, highlight = false, className, }: ResultCardProps) {
  return (
    <div className={cn("rounded-lg border p-4 transition-all hover:shadow-md", highlight && "border-primary/50 bg-primary/5", className)}>
      { Icon && <div className="mb-2"><Icon className={cn("h-5 w-5", highlight ? "text-primary" : "text-muted-foreground")} /></div> }
      <p className={cn("text-sm font-medium", highlight ? "text-primary" : "text-muted-foreground")} > {label} </p>
      <p className={cn("mt-1 text-2xl font-bold", highlight && "text-primary")}> {value} </p>
      { description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>  }
    </div>
  );
}