
import { PasswordStrength } from "@/utils/password-strength";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

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
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-secondary relative">
        <motion.div
          className={cn(
            "password-strength-bar h-full rounded-full relative",
            strength === "weak" && score > 0 && "bg-strength-weak",
            strength === "medium" && "bg-strength-medium",
            strength === "strong" && "bg-strength-strong"
          )}
          style={{ width: `${score}%` }}
          initial={{ width: "0%" }}
          animate={{ width: `${score}%` }}
          transition={{ 
            duration: 0.8, 
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
        >
          {score > 10 && (
            <motion.div
              className="absolute top-0 right-0 h-full w-3 bg-white/30"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.5, 0],
                x: ['-100%', '200%']
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                repeatDelay: 1,
              }}
            />
          )}
        </motion.div>
      </div>
      
      <div className="flex justify-between text-xs">
        <motion.span 
          className={cn(
            "font-medium transition-colors",
            strength === "weak" && score > 0 ? "text-strength-weak" : "text-muted-foreground"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Weak
        </motion.span>
        <motion.span 
          className={cn(
            "font-medium transition-colors",
            strength === "medium" ? "text-strength-medium" : "text-muted-foreground"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Medium
        </motion.span>
        <motion.span 
          className={cn(
            "font-medium transition-colors",
            strength === "strong" ? "text-strength-strong" : "text-muted-foreground"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Strong
        </motion.span>
      </div>
    </div>
  );
}
