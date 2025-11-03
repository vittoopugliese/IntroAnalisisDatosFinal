import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger, } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string | number;
  description?: string;
  tooltipDescription?: string;
  trend?: { value: number; isPositive: boolean; };
  className?: string;
  iconClassName?: string;
}

export function StatCard({ icon: Icon, title, value, description, tooltipDescription, trend, className, iconClassName, }: StatCardProps) {
  const card = (
    <div className={cn( "relative overflow-hidden rounded-lg border bg-card p-6 shadow-sm transition-all hover:shadow-md", className )} >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            {trend && (
              <span className={cn( "text-xs font-medium", trend.isPositive ? "text-green-600" : "text-red-600" )} >
                {trend.isPositive ? "+" : ""}
                {trend.value.toFixed(1)}%
              </span>
            )}
          </div>
          {description && <p className="mt-1 text-xs text-muted-foreground">{description}</p>}
        </div>
        <div className={cn( "rounded-full bg-primary/10 p-3", iconClassName )} >
          <Icon className="h-5 w-5 text-primary" />
        </div>
      </div>
    </div>
  );

  if (tooltipDescription) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>{card}</TooltipTrigger>
          <TooltipContent>
            <p className="max-w-xs">{tooltipDescription}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return card;
}