
import { PasswordStrength } from "@/utils/password-strength";
import { cn } from "@/lib/utils";

interface PasswordStrengthBarProps {
  strength: PasswordStrength;
  score: number;
  className?: string;
}

export function PasswordStrengthBar({
  strength,
  score,
  className,
}: PasswordStrengthBarProps) {
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className={cn(
            "password-strength-bar",
            strength === "weak" && score > 0 && "bg-strength-weak",
            strength === "medium" && "bg-strength-medium",
            strength === "strong" && "bg-strength-strong"
          )}
          style={{ width: `${score}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-xs">
        <span 
          className={cn(
            "font-medium transition-colors",
            strength === "weak" && score > 0 ? "text-strength-weak" : "text-muted-foreground"
          )}
        >
          Weak
        </span>
        <span 
          className={cn(
            "font-medium transition-colors",
            strength === "medium" ? "text-strength-medium" : "text-muted-foreground"
          )}
        >
          Medium
        </span>
        <span 
          className={cn(
            "font-medium transition-colors",
            strength === "strong" ? "text-strength-strong" : "text-muted-foreground"
          )}
        >
          Strong
        </span>
      </div>
    </div>
  );
}
