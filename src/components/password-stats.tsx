
import { PasswordStats } from "@/utils/password-strength";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

interface PasswordStatsProps {
  stats: PasswordStats;
  className?: string;
}

export function PasswordStatistics({ stats, className }: PasswordStatsProps) {
  return (
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardContent className="p-4 space-y-3">
        <h3 className="text-lg font-medium">Password Analysis</h3>
        
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
            <Progress value={Math.min(stats.entropy, 100)} />
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
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasUppercase ? 'bg-strength-strong text-white' : 'bg-muted'}`}>
                {stats.hasUppercase && '✓'}
              </div>
              <span>Uppercase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasLowercase ? 'bg-strength-strong text-white' : 'bg-muted'}`}>
                {stats.hasLowercase && '✓'}
              </div>
              <span>Lowercase</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasNumbers ? 'bg-strength-strong text-white' : 'bg-muted'}`}>
                {stats.hasNumbers && '✓'}
              </div>
              <span>Numbers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full flex items-center justify-center ${stats.hasSpecialChars ? 'bg-strength-strong text-white' : 'bg-muted'}`}>
                {stats.hasSpecialChars && '✓'}
              </div>
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
            <Progress 
              value={100 - stats.similarityScore} 
              className={`${stats.similarityScore > 70 ? 'bg-strength-weak' : stats.similarityScore > 40 ? 'bg-strength-medium' : 'bg-strength-strong'}`}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {stats.similarityScore > 70 
                ? "Many users have similar passwords" 
                : stats.similarityScore > 40 
                  ? "Some users have similar passwords" 
                  : "Very few users have similar passwords"
              }
            </p>
          </motion.div>
        </div>
      </CardContent>
    </Card>
  );
}
