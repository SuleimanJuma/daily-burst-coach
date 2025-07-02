import React from "react";
import { cn } from "@/lib/utils";

interface ProgressRingProps {
  progress: number;
  size?: "sm" | "md" | "lg" | "xl";
  strokeWidth?: number;
  children?: React.ReactNode;
  className?: string;
  color?: "primary" | "whatsapp" | "learning" | "success" | "streak";
}

const sizeMap = {
  sm: { width: 60, height: 60, textSize: "text-xs" },
  md: { width: 80, height: 80, textSize: "text-sm" },
  lg: { width: 120, height: 120, textSize: "text-lg" },
  xl: { width: 160, height: 160, textSize: "text-xl" },
};

const colorMap = {
  primary: "stroke-primary",
  whatsapp: "stroke-whatsapp",
  learning: "stroke-learning",
  success: "stroke-success",
  streak: "stroke-streak",
};

export const ProgressRing: React.FC<ProgressRingProps> = ({
  progress,
  size = "md",
  strokeWidth = 8,
  children,
  className,
  color = "primary",
}) => {
  const { width, height, textSize } = sizeMap[size];
  const radius = (width - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        width={width}
        height={height}
        className="transform -rotate-90 drop-shadow-sm"
      >
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="hsl(var(--muted))"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={cn(
            "transition-all duration-1000 ease-out",
            colorMap[color]
          )}
        />
      </svg>
      {children && (
        <div className={cn(
          "absolute inset-0 flex items-center justify-center",
          textSize,
          "font-semibold text-foreground"
        )}>
          {children}
        </div>
      )}
    </div>
  );
};