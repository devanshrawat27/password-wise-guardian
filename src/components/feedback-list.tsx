
import { PasswordFeedback } from "@/utils/password-strength";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { CheckIcon, XIcon, AlertTriangle } from "lucide-react";

interface FeedbackListProps {
  feedback: PasswordFeedback[];
  className?: string;
}

export function FeedbackList({ feedback, className }: FeedbackListProps) {
  if (feedback.length === 0) return null;
  
  return (
    <ul className={cn("space-y-2.5 text-sm", className)}>
      <AnimatePresence>
        {feedback.map((item, index) => (
          <motion.li
            key={`${index}-${item.message}`}
            className={cn(
              "flex items-center backdrop-blur-sm rounded-md p-2 border",
              item.type === "error" && "text-strength-weak border-strength-weak/20 bg-strength-weak/5",
              item.type === "warning" && "text-strength-medium border-strength-medium/20 bg-strength-medium/5",
              item.type === "success" && "text-strength-strong border-strength-strong/20 bg-strength-strong/5"
            )}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.9 }}
            transition={{ 
              delay: index * 0.1, 
              duration: 0.3,
              type: "spring",
              stiffness: 400,
              damping: 25
            }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: item.type === "error" 
                ? "0 0 10px rgba(234, 56, 76, 0.3)" 
                : item.type === "warning" 
                  ? "0 0 10px rgba(249, 115, 22, 0.3)" 
                  : "0 0 10px rgba(16, 185, 129, 0.3)" 
            }}
          >
            <motion.div
              className={cn(
                "mr-2 flex h-6 w-6 items-center justify-center rounded-full text-white text-xs",
                item.type === "error" && "bg-strength-weak",
                item.type === "warning" && "bg-strength-medium",
                item.type === "success" && "bg-strength-strong"
              )}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                delay: index * 0.1 + 0.1,
                type: "spring",
                stiffness: 400,
                damping: 20
              }}
            >
              {item.type === "error" ? (
                <XIcon className="h-3 w-3" />
              ) : item.type === "warning" ? (
                <AlertTriangle className="h-3 w-3" />
              ) : (
                <CheckIcon className="h-3 w-3" />
              )}
            </motion.div>
            <motion.span
              initial={{ opacity: 0.5, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                delay: index * 0.1 + 0.2,
                type: "spring"
              }}
              className="font-medium"
            >
              {item.message}
            </motion.span>
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}
