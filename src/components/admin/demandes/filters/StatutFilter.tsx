import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterOption } from "./types";

interface StatutFilterProps {
  value: string;
  onValueChange: (value: string) => void;
  options: readonly FilterOption[];
  placeholder?: string;
  className?: string;
}

export function StatutFilter({
  value,
  onValueChange,
  options,
  placeholder = "Statut",
  className
}: StatutFilterProps) {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            <div className="flex items-center gap-2">
              {option.icon && <option.icon className="w-3 h-3" />}
              {option.label}
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

