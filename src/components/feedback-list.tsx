
import { PasswordFeedback } from "@/utils/password-strength";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface FeedbackListProps {
  feedback: PasswordFeedback[];
  className?: string;
}

export function FeedbackList({ feedback, className }: FeedbackListProps) {
  if (feedback.length === 0) return null;
  
  return (
    <ul className={cn("space-y-2 text-sm", className)}>
      <AnimatePresence>
        {feedback.map((item, index) => (
          <motion.li
            key={`${index}-${item.message}`}
            className={cn(
              "flex items-center",
              item.type === "error" && "text-strength-weak",
              item.type === "warning" && "text-strength-medium",
              item.type === "success" && "text-strength-strong"
            )}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ delay: index * 0.1, duration: 0.2 }}
          >
            <motion.span
              className={cn(
                "mr-2 flex h-5 w-5 items-center justify-center rounded-full text-white text-xs",
                item.type === "error" && "bg-strength-weak",
                item.type === "warning" && "bg-strength-medium",
                item.type === "success" && "bg-strength-strong"
              )}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: index * 0.1 + 0.1 }}
            >
              {item.type === "error" ? "✕" : item.type === "warning" ? "!" : "✓"}
            </motion.span>
            <motion.span
              initial={{ opacity: 0.5, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.2 }}
            >
              {item.message}
            </motion.span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
