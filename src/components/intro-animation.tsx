
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock } from "lucide-react";

interface IntroAnimationProps {
  onComplete: () => void;
}

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (stage < 2) {
        setStage((prev) => prev + 1);
      }
    }, 1400);

    return () => clearTimeout(timer);
  }, [stage]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      <motion.div
        className="relative mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      >
        <motion.div 
          className="relative z-10 text-primary"
          animate={{ 
            rotate: [0, 10, 0, -10, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <ShieldCheck size={120} strokeWidth={1.5} />
        </motion.div>
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary opacity-20"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity 
          }}
        >
          <ShieldCheck size={180} strokeWidth={1} />
        </motion.div>
      </motion.div>

      <motion.div
        className="text-center space-y-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.h1 
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: stage >= 0 ? 1 : 0, 
            y: stage >= 0 ? 0 : 20 
          }}
          transition={{ duration: 0.8 }}
        >
          SecurePass AI
        </motion.h1>
        
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: stage >= 1 ? 1 : 0, 
            y: stage >= 1 ? 0 : 20 
          }}
          transition={{ duration: 0.8 }}
        >
          Your Smart Password Companion
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: stage >= 2 ? 1 : 0, 
            y: stage >= 2 ? 0 : 20 
          }}
          transition={{ duration: 0.8 }}
        >
          <Button
            onClick={onComplete}
            size="lg"
            className="mt-6 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
          >
            <Lock className="mr-2 h-4 w-4" />
            Get Started
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
