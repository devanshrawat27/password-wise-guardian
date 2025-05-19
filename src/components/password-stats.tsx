
import { PasswordStats } from "@/utils/password-strength";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface PasswordStatsProps {
  stats: PasswordStats;
  className?: string;
}

export function PasswordStatistics({ stats, className }: PasswordStatsProps) {
  const MotionCard = motion(Card);

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <MotionCard 
        className={`w-full overflow-hidden neo-blur ${className}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <CardContent className="p-4 space-y-3">
          <motion.h3 
            className="text-lg font-medium text-gradient"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Password Analysis
          </motion.h3>
          
          <div className="space-y-4">
            <motion.div 
              className="space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex justify-between text-sm">
                <span>Entropy Score</span>
                <span className="font-medium">{stats.entropy}</span>
              </div>
              <div className="relative">
                <Progress value={Math.min(stats.entropy, 100)} />
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
              className="grid grid-cols-2 gap-2 text-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="flex justify-between">
                <span>Length</span>
                <span className="font-medium">{stats.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Crack time</span>
                <span className="font-medium">{stats.estimatedCrackTime}</span>
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
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasUppercase ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasUppercase ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasUppercase ? { duration: 0.3 } : {}}
                >
                  {stats.hasUppercase && '✓'}
                </motion.div>
                <span>Uppercase</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasLowercase ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasLowercase ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasLowercase ? { duration: 0.3 } : {}}
                >
                  {stats.hasLowercase && '✓'}
                </motion.div>
                <span>Lowercase</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasNumbers ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasNumbers ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasNumbers ? { duration: 0.3 } : {}}
                >
                  {stats.hasNumbers && '✓'}
                </motion.div>
                <span>Numbers</span>
              </div>
              <div className="flex items-center gap-2">
                <motion.div 
                  className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasSpecialChars ? 'bg-strength-strong text-white' : 'bg-muted'}`}
                  animate={stats.hasSpecialChars ? { scale: [1, 1.2, 1] } : {}}
                  transition={stats.hasSpecialChars ? { duration: 0.3 } : {}}
                >
                  {stats.hasSpecialChars && '✓'}
                </motion.div>
                <span>Special</span>
              </div>
            </motion.div>
            
            <motion.div 
              className="space-y-1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex justify-between text-sm">
                <span>Password Uniqueness</span>
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
              <motion.p 
                className="text-xs text-muted-foreground mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                {stats.similarityScore > 70 
                  ? "Many users have similar passwords" 
                  : stats.similarityScore > 40 
                    ? "Some users have similar passwords" 
                    : "Very few users have similar passwords"
                }
              </motion.p>
            </motion.div>
          </div>
        </CardContent>
      </MotionCard>
    </motion.div>
  );
}
