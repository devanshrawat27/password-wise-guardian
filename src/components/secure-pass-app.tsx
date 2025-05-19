
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { PasswordInput } from "@/components/password-input";
import { PasswordStrengthBar } from "@/components/password-strength-bar";
import { FeedbackList } from "@/components/feedback-list";
import { ThemeToggle } from "@/components/theme-toggle";
import { calculatePasswordStrength, generateStrongPassword, PasswordFeedback } from "@/utils/password-strength";
import { useToast } from "@/hooks/use-toast";

export function SecurePassApp() {
  const [password, setPassword] = useState("");
  const [strength, setStrength] = useState("weak");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<PasswordFeedback[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const result = calculatePasswordStrength(password);
    setStrength(result.strength);
    setScore(result.score);
    setFeedback(result.feedback);
  }, [password]);

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setPassword(newPassword);
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
    <div className="container flex flex-col items-center justify-center min-h-screen py-6">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      
      <Card className="w-full max-w-md border-2 border-primary/10 card-shadow">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">SecurePass</CardTitle>
          <CardDescription>
            AI Password Strength Checker
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
            <Button 
              onClick={handleGeneratePassword}
              className="flex-1"
              variant="outline"
            >
              Generate Strong Password
            </Button>
            <Button 
              onClick={copyToClipboard}
              className="flex-1"
              disabled={!password}
            >
              Copy to Clipboard
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      <p className="mt-6 text-center text-xs text-muted-foreground">
        Your passwords are never stored or transmitted.
      </p>
    </div>
  );
}
