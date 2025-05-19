
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ShieldCheck, Lock, Shield } from "lucide-react";

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
      {/* Background glow elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-primary/30 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ 
            duration: 4, 
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1 
          }}
        />
      </motion.div>
      
      {/* Main Shield Icon */}
      <motion.div
        className="relative mb-12"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
      >
        {/* Ring animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0 0px rgba(59, 130, 246, 0)",
              "0 0 0 15px rgba(59, 130, 246, 0.1)",
              "0 0 0 30px rgba(59, 130, 246, 0)",
            ],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        
        <motion.div 
          className="relative z-10 text-primary cyber-glow"
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
          
          {/* Inner lock */}
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.3, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Lock size={120} strokeWidth={2} />
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-primary/30 cyber-glow"
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.2, 0.4, 0.2],
            rotate: [0, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity 
          }}
        >
          <ShieldCheck size={180} strokeWidth={1} />
        </motion.div>
      </motion.div>

      {/* Text elements */}
      <motion.div
        className="text-center space-y-4 relative z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl font-bold tracking-tight text-gradient"
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
          className="text-lg text-muted-foreground"
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
          className="pt-4"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              onClick={onComplete}
              size="lg"
              className="mt-6 bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 btn-shimmer relative overflow-hidden glow"
            >
              <Lock className="mr-2 h-4 w-4" />
              <span>Get Started</span>
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Optional grid pattern overlay */}
      <div className="fixed inset-0 bg-grid-white/[0.03] pointer-events-none" style={{ 
        backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'100\' height=\'100\' viewBox=\'0 0 100 100\'%3E%3Cpath d=\'M96,95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-10,0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9zm10,0h9v-9h-9v9z\'/%3E%3C/svg%3E")',
        opacity: 0.2
      }}/>
    </motion.div>
  );
}
