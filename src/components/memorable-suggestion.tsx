
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sparkles, RefreshCw, Copy } from "lucide-react";
import { generateMemorablePassword } from "@/utils/password-strength";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface MemorableSuggestionProps {
  basePassword: string;
  className?: string;
}

export function MemorableSuggestion({ basePassword, className }: MemorableSuggestionProps) {
  const [suggestion, setSuggestion] = useState("");
  const { toast } = useToast();

  const generateNewSuggestion = () => {
    const newSuggestion = generateMemorablePassword(basePassword);
    setSuggestion(newSuggestion);
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
    <Card className={`w-full overflow-hidden ${className}`}>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-1">
            <Sparkles className="h-4 w-4 text-primary" />
            Memorable Alternative
          </h3>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={generateNewSuggestion}
            className="h-8 px-2"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        
        {suggestion ? (
          <motion.div 
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="p-3 bg-muted rounded-md font-mono text-center break-all">
              {suggestion}
            </div>
            <div className="flex">
              <Button 
                onClick={copyToClipboard} 
                className="w-full"
                size="sm"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy to Clipboard
              </Button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center p-4 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Generate a memorable alternative that's still secure
            </p>
            <Button 
              onClick={generateNewSuggestion}
              variant="outline"
              className="w-full"
              size="sm"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Generate Memorable Password
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
