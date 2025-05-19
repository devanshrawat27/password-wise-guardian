
import { PasswordFeedback } from "@/utils/password-strength";
import { cn } from "@/lib/utils";

interface FeedbackListProps {
  feedback: PasswordFeedback[];
  className?: string;
}

export function FeedbackList({ feedback, className }: FeedbackListProps) {
  if (feedback.length === 0) return null;
  
  return (
    <ul className={cn("space-y-1 text-sm", className)}>
      {feedback.map((item, index) => (
        <li
          key={index}
          className={cn(
            "flex items-center animate-in",
            item.type === "error" && "text-strength-weak",
            item.type === "warning" && "text-strength-medium",
            item.type === "success" && "text-strength-strong"
          )}
        >
          <span
            className={cn(
              "mr-2 flex h-5 w-5 items-center justify-center rounded-full text-white text-xs",
              item.type === "error" && "bg-strength-weak",
              item.type === "warning" && "bg-strength-medium",
              item.type === "success" && "bg-strength-strong"
            )}
          >
            {item.type === "error" ? "✕" : item.type === "warning" ? "!" : "✓"}
          </span>
          {item.message}
        </li>
      ))}
    </ul>
  );
}
