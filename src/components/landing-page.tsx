
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Shield, Lock, ArrowRight } from "lucide-react";

export function LandingPage({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <motion.div
      className="min-h-screen bg-background flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-primary/30 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <motion.div 
        className="relative z-10 text-center space-y-8 max-w-3xl px-6"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Logo and Shield animation */}
        <motion.div 
          className="mx-auto mb-8 relative"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.2
          }}
        >
          <motion.div
            className="relative z-10 text-primary cyber-glow"
            animate={{ 
              rotate: [0, 5, 0, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 6, 
              repeat: Infinity,
              repeatType: "reverse" 
            }}
          >
            <Shield size={120} strokeWidth={1.5} />
          </motion.div>
          
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/90"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 0.5, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Lock size={100} strokeWidth={2} />
          </motion.div>
          
          {/* Ring animations */}
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              boxShadow: [
                "0 0 0 0px rgba(59, 130, 246, 0)",
                "0 0 0 20px rgba(59, 130, 246, 0.1)",
                "0 0 0 40px rgba(59, 130, 246, 0)",
              ],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
          />
        </motion.div>
        
        {/* Text elements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-bold tracking-tighter text-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            SecurePass AI
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Your Smart Password Companion
          </motion.p>
          
          <motion.div 
            className="max-w-lg mx-auto text-muted-foreground/80 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <p>Elevate your online security with advanced password analysis, smart recommendations, and real-time protection insights.</p>
          </motion.div>
        </motion.div>
        
        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              onClick={onGetStarted}
              size="lg" 
              className="relative overflow-hidden bg-gradient-to-r from-primary to-primary/80 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 btn-shimmer glow"
            >
              <span>Get Started</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        </motion.div>
        
        {/* Features list */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Smart Analysis</h3>
            <p className="text-sm text-muted-foreground">AI-powered password strength assessment</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Intelligent Suggestions</h3>
            <p className="text-sm text-muted-foreground">Get smart, memorable alternatives</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-4">
            <div className="bg-primary/10 p-3 rounded-full mb-4">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="font-medium mb-2">Real-time Feedback</h3>
            <p className="text-sm text-muted-foreground">Interactive security insights</p>
          </div>
        </motion.div>
      </motion.div>
      
      {/* Footer note */}
      <motion.p 
        className="absolute bottom-6 text-xs text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
      >
        Your passwords never leave your device. Complete security, zero storage.
      </motion.p>
    </motion.div>
  );
}
