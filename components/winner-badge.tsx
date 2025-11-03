import { Award, Trophy, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface WinnerBadgeProps {
  rank?: 1 | 2 | 3;
  label?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

export function WinnerBadge({ rank = 1, label, className, variant = "default", }: WinnerBadgeProps) {
  const icons = {
    1: Trophy,
    2: Award,
    3: Star,
  };

  const colors = {
    1: "bg-yellow-500 text-white",
    2: "bg-gray-400 text-white",
    3: "bg-orange-600 text-white",
  };

  const labels = {
    1: label || "1° Mejor Opción",
    2: label || "2° Mejor Opción",
    3: label || "3° Mejor Opción",
  };

  const Icon = icons[rank];

  if (variant === "outline") {
    return (
      <div className={cn( "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold", rank === 1 && "border-yellow-500 text-yellow-700", rank === 2 && "border-gray-400 text-gray-700", rank === 3 && "border-orange-600 text-orange-700", className )} >
        <Icon className="h-3.5 w-3.5" />
        <span>{labels[rank]}</span>
      </div>
    );
  }

  return (
    <div className={cn( "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold", colors[rank], className )} >
      <Icon className="h-3.5 w-3.5" />
      <span>{labels[rank]}</span>
    </div>
  );
}

