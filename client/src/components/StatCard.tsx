import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: number; // Percentage change
  description?: string;
  className?: string;
}

export function StatCard({ title, value, icon, trend, description, className }: StatCardProps) {
  const isPositive = trend && trend >= 0;

  return (
    <div className={cn(
      "glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors duration-300",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <h3 className="text-3xl font-display font-bold text-foreground tracking-tight font-mono">{value}</h3>
        </div>
        {icon && (
          <div className="p-2 bg-secondary rounded-lg text-primary opacity-80 group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
        )}
      </div>
      
      {(trend !== undefined || description) && (
        <div className="flex items-center gap-2 mt-2">
          {trend !== undefined && (
            <span className={cn(
              "flex items-center text-xs font-bold px-2 py-0.5 rounded-full font-mono",
              isPositive ? "bg-success-soft" : "bg-destructive-soft"
            )}>
              {isPositive ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
              {Math.abs(trend)}%
            </span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      )}
      
      {/* Background decoration */}
      <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-2xl group-hover:bg-primary/10 transition-colors" />
    </div>
  );
}
