
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "@/components/password-input";
import { PasswordStrengthBar } from "@/components/password-strength-bar";
import { FeedbackList } from "@/components/feedback-list";
import { PasswordStatistics } from "@/components/password-stats";
import { MemorableSuggestion } from "@/components/memorable-suggestion";
import { ThemeToggle } from "@/components/theme-toggle";
import { IntroAnimation } from "@/components/intro-animation";
import { calculatePasswordStrength, generateStrongPassword, PasswordFeedback, PasswordStats } from "@/utils/password-strength";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, ShieldCheck, KeySquare, Lock, Copy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SecurePassApp() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("weak");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<PasswordFeedback[]>([]);
  const [stats, setStats] = useState<PasswordStats>({
    length: 0,
    hasUppercase: false,
    hasLowercase: false,
    hasNumbers: false,
    hasSpecialChars: false,
    entropy: 0,
    estimatedCrackTime: "Instantly",
    similarityScore: 0
  });
  const [showIntro, setShowIntro] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("securepass-seen-intro");
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  const completeIntro = () => {
    localStorage.setItem("securepass-seen-intro", "true");
    setShowIntro(false);
  };

  useEffect(() => {
    const result = calculatePasswordStrength(password);
    setStrength(result.strength);
    setScore(result.score);
    setFeedback(result.feedback);
    setStats(result.stats);
  }, [password]);

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setPassword(newPassword);
    
    toast({
      title: "Password Generated!",
      description: "A strong password has been created for you.",
      duration: 3000,
    });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Password copied!",
      description: "Password has been copied to clipboard.",
      duration: 3000,
    });
  };

  return (
    <>
      <AnimatePresence>
        {showIntro && <IntroAnimation onComplete={completeIntro} />}
      </AnimatePresence>
      
      <motion.div 
        className="container flex flex-col items-center justify-center min-h-screen py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: showIntro ? 0.5 : 0 }}
      >
        <div className="absolute right-4 top-4">
          <ThemeToggle />
        </div>
        
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl font-bold tracking-tight flex items-center justify-center gap-2 mb-2">
            <ShieldCheck className="h-8 w-8 text-primary" />
            <span>SecurePass AI</span>
          </h1>
          <p className="text-muted-foreground">Your Smart Password Companion</p>
        </motion.div>
        
        <div className="w-full max-w-5xl flex flex-col lg:flex-row gap-6">
          <motion.div 
            className="flex-1"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="border-2 border-primary/10 neo-blur h-full">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Password Analyzer
                </CardTitle>
                <CardDescription>
                  Enter a password to check its strength
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <PasswordInput
                    value={password}
                    onChange={setPassword}
                    placeholder="Enter your password"
                    className="text-lg"
                  />
                  <PasswordStrengthBar strength={strength as any} score={score} />
                </div>
                
                <div className="min-h-[120px]">
                  <FeedbackList feedback={feedback} />
                </div>
              </CardContent>
              
              <CardFooter className="flex flex-col space-y-2">
                <div className="flex w-full space-x-2">
                  <motion.div className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={handleGeneratePassword}
                      className="w-full"
                      variant="outline"
                    >
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Strong Password
                    </Button>
                  </motion.div>
                  
                  <motion.div className="flex-1"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button 
                      onClick={copyToClipboard}
                      className="w-full"
                      disabled={!password}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Copy to Clipboard
                    </Button>
                  </motion.div>
                </div>
              </CardFooter>
            </Card>
          </motion.div>
          
          <motion.div 
            className="lg:w-96"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="space-y-6">
              <PasswordStatistics stats={stats} />
              <MemorableSuggestion basePassword={password} />
            </div>
          </motion.div>
        </div>
        
        <motion.p 
          className="mt-6 text-center text-xs text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Your passwords are never stored or transmitted.
        </motion.p>
      </motion.div>
    </>
  );
}
