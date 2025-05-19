
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, RefreshCw, Copy, Wand2 } from "lucide-react";
import { generateMemorablePassword } from "@/utils/password-strength";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface MemorableSuggestionProps {
  basePassword: string;
  className?: string;
}

export function MemorableSuggestion({ basePassword, className }: MemorableSuggestionProps) {
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();

  const generateNewSuggestion = () => {
    if (!basePassword) {
      toast({
        title: "No password entered",
        description: "Please enter a password first to get a memorable alternative.",
        duration: 3000,
      });
      return;
    }
    
    const newSuggestion = generateMemorablePassword(basePassword);
    setSuggestion(newSuggestion);
    
    toast({
      title: "Smart Alternative Generated",
      description: "We've created a secure but memorable alternative based on your password pattern.",
      duration: 3000,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(suggestion);
    toast({
      title: "Password copied!",
      description: "Memorable password has been copied to clipboard.",
      duration: 3000,
    });
  };

  return (
    <motion.div 
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 500 } }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <Card className={`w-full overflow-hidden cyberpunk-card ${className}`}>
        <CardContent className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <motion.h3 
              className="text-lg font-medium flex items-center gap-2"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="relative"
                animate={{ 
                  rotate: [0, 15, -15, 0],
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 5 
                }}
              >
                <Wand2 className="h-5 w-5 text-primary cyber-glow" />
                <motion.div
                  className="absolute -inset-1 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 0 0px rgba(59, 130, 246, 0)",
                      "0 0 0 3px rgba(59, 130, 246, 0.2)",
                      "0 0 0 6px rgba(59, 130, 246, 0)",
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "loop",
                  }}
                />
              </motion.div>
              <span className="text-gradient">Memorable Alternative</span>
            </motion.h3>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={generateNewSuggestion}
                className="h-8 px-2 rounded-full bg-primary/10 hover:bg-primary/20"
              >
                <RefreshCw className="h-4 w-4 text-primary" />
              </Button>
            </motion.div>
          </div>
          
          <AnimatePresence mode="wait">
            {suggestion ? (
              <motion.div 
                key="suggestion"
                className="space-y-3"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div 
                  className="p-3 neon-border rounded-md font-mono text-center break-all relative"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.span 
                    className="text-base"
                    animate={{ 
                      textShadow: [
                        "0 0 3px rgba(59, 130, 246, 0)",
                        "0 0 8px rgba(59, 130, 246, 0.5)",
                        "0 0 3px rgba(59, 130, 246, 0)",
                      ] 
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {suggestion}
                  </motion.span>
                </motion.div>
                
                <motion.p 
                  className="text-xs text-muted-foreground text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 0.3 }}
                >
                  AI-enhanced version of your password pattern
                </motion.p>
                
                <motion.div 
                  className="flex"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <motion.div 
                    className="w-full"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={copyToClipboard} 
                      className="w-full bg-gradient-to-r from-primary/90 to-primary/70 hover:shadow-md hover:shadow-primary/20"
                      size="sm"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                key="empty"
                className="flex flex-col items-center p-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <p className="text-sm text-muted-foreground mb-4">
                  Create a memorable, secure alternative based on your password pattern
                </p>
                <motion.div 
                  className="w-full"
                  whileHover={{ scale: 1.02, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    onClick={generateNewSuggestion}
                    variant="outline"
                    className="w-full border-primary/30 hover:border-primary/60 btn-shimmer"
                    size="sm"
                  >
                    <Sparkles className="h-4 w-4 mr-2 text-primary" />
                    Generate Smart Alternative
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>
    </motion.div>
  );
}
