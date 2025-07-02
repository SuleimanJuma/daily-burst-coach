import React from "react";
import { cn } from "@/lib/utils";
import { Card } from "./card";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  variant?: "default" | "whatsapp" | "learning" | "success" | "streak";
}

const variantStyles = {
  default: "border-border bg-gradient-card",
  whatsapp: "border-whatsapp/20 bg-gradient-to-br from-whatsapp-light to-whatsapp-light/50",
  learning: "border-learning/20 bg-gradient-to-br from-learning-light to-learning-light/50",
  success: "border-success/20 bg-gradient-to-br from-success-light to-success-light/50",
  streak: "border-streak/20 bg-gradient-to-br from-streak-light to-streak-light/50",
};

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  variant = "default",
}) => {
  return (
    <Card className={cn(
      "p-6 shadow-card hover:shadow-hover transition-all duration-300 hover:scale-105",
      variantStyles[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {trend && (
              <span className={cn(
                "text-sm font-medium flex items-center",
                trend.isPositive ? "text-success" : "text-destructive"
              )}>
                {trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className="p-3 rounded-xl bg-white/50 backdrop-blur-sm">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
};