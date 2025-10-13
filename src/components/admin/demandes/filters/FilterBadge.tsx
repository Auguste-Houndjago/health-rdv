import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import React from "react";

interface FilterBadgeProps {
  label: string;
  count: number;
  isActive: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  variant?: "default" | "secondary" | "outline" | "destructive";
  className?: string;
}

export function FilterBadge({
  label,
  count,
  isActive,
  icon: Icon,
  onClick,
  variant = "outline",
  className
}: FilterBadgeProps) {
  return (
    <Badge
      variant={isActive ? "default" : variant}
      className={cn(
        "cursor-pointer transition-colors flex items-center gap-1",
        className
      )}
      onClick={onClick}
    >
      {Icon && <Icon className="w-3 h-3" />}
      {label}: {count}
    </Badge>
  );
}


