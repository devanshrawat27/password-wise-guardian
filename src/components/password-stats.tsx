
import { PasswordStats } from "@/utils/password-strength";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Clock, Fingerprint, Check, AlertTriangle } from "lucide-react";

interface PasswordStatsProps {
  stats: PasswordStats;
  className?: string;
}

export function PasswordStatistics({ stats, className }: PasswordStatsProps) {
  const MotionCard = motion(Card);
  
  const getEntropyColor = (entropy: number) => {
    if (entropy > 80) return "bg-strength-strong";
    if (entropy > 40) return "bg-strength-medium";
    return "bg-strength-weak";
  };

  return (
    <motion.div
      whileHover={{ y: -3, transition: { type: "spring", stiffness: 500 } }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <MotionCard 
        className={`w-full overflow-hidden cyberpunk-card ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent className="p-5 space-y-4">
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ 
                scale: [1, 1.05, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <Fingerprint className="h-5 w-5 text-primary cyber-glow" />
            </motion.div>
            <h3 className="text-xl font-medium text-gradient">Password Analysis</h3>
          </motion.div>
          
          <div className="space-y-4 mt-2">
            <motion.div 
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center gap-1">
                  <span>Entropy Score</span>
                  <motion.div 
                    className="w-4 h-4 rounded-full flex items-center justify-center bg-primary/10 text-primary"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    title="Higher entropy means more randomness and security"
                  >
                    ?
                  </motion.div>
                </div>
                <motion.span 
                  className="font-medium"
                  animate={stats.entropy > 70 ? { 
                    textShadow: [
                      "0 0 3px rgba(16, 185, 129, 0)",
                      "0 0 6px rgba(16, 185, 129, 0.5)",
                      "0 0 3px rgba(16, 185, 129, 0)"
                    ] 
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  {stats.entropy}
                </motion.span>
              </div>
              <div className="relative">
                <Progress 
                  value={Math.min(stats.entropy, 100)} 
                  className={getEntropyColor(stats.entropy)}
                />
                {stats.entropy > 40 && (
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
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-3 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between items-center p-2 rounded-md bg-secondary/30 neon-border">
                <span>Length</span>
                <motion.span 
                  className={`font-medium ${stats.length > 12 ? "text-strength-strong" : stats.length > 8 ? "text-strength-medium" : "text-strength-weak"}`}
                  animate={stats.length > 12 ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 1, repeat: 1 }}
                >
                  {stats.length}
                </motion.span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-md bg-secondary/30 neon-border">
                <Clock className="h-4 w-4 text-primary" />
                <motion.span 
                  className="text-xs font-medium line-clamp-1"
                  animate={stats.estimatedCrackTime === "Centuries" ? { 
                    textShadow: [
                      "0 0 3px rgba(16, 185, 129, 0)",
                      "0 0 6px rgba(16, 185, 129, 0.5)",
                      "0 0 3px rgba(16, 185, 129, 0)"
                    ] 
                  } : {}}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse" 
                  }}
                >
                  {stats.estimatedCrackTime}
                </motion.span>
              </div>
            </motion.div>
            
            <motion.div 
              className="grid grid-cols-2 gap-3 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2">
                <motion.div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${stats.hasUppercase ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasUppercase ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasUppercase ? { duration: 0.3 } : {}}
                >
                  {stats.hasUppercase ? <Check className="h-3 w-3" /> : ""}
                </motion.div>
                <span>Uppercase</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${stats.hasLowercase ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasLowercase ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasLowercase ? { duration: 0.3 } : {}}
                >
                  {stats.hasLowercase ? <Check className="h-3 w-3" /> : ""}
                </motion.div>
                <span>Lowercase</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${stats.hasNumbers ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasNumbers ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasNumbers ? { duration: 0.3 } : {}}
                >
                  {stats.hasNumbers ? <Check className="h-3 w-3" /> : ""}
                </motion.div>
                <span>Numbers</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${stats.hasSpecialChars ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasSpecialChars ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasSpecialChars ? { duration: 0.3 } : {}}
                >
                  {stats.hasSpecialChars ? <Check className="h-3 w-3" /> : ""}
                </motion.div>
                <span>Special</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-2 mt-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between text-sm items-center">
                <div className="flex items-center gap-1">
                  <span>Password Uniqueness</span>
                  <motion.div 
                    className="w-4 h-4 rounded-full flex items-center justify-center bg-primary/10 text-primary"
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    title="How rare this password pattern is compared to what others use"
                  >
                    ?
                  </motion.div>
                </div>
                <span className="font-medium">{100 - stats.similarityScore}%</span>
              </div>
              <div className="relative">
                <Progress 
                  value={100 - stats.similarityScore} 
                  className={`${stats.similarityScore > 70 ? 'bg-strength-weak' : stats.similarityScore > 40 ? 'bg-strength-medium' : 'bg-strength-strong'}`}
                />
                {stats.similarityScore < 30 && (
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
              </div>
              <motion.div 
                className="flex items-center gap-2 text-xs mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {stats.similarityScore > 70 ? (
                  <>
                    <AlertTriangle className="h-3 w-3 text-strength-weak" />
                    <span className="text-strength-weak">Many users have similar passwords</span>
                  </>
                ) : stats.similarityScore > 40 ? (
                  <>
                    <AlertTriangle className="h-3 w-3 text-strength-medium" />
                    <span className="text-strength-medium">Some users have similar passwords</span>
                  </>
                ) : (
                  <>
                    <Check className="h-3 w-3 text-strength-strong" />
                    <span className="text-strength-strong">Very unique password pattern</span>
                  </>
                )}
              </motion.div>
            </motion.div>
          </div>
        </CardContent>
      </MotionCard>
    </motion.div>
  );
}
