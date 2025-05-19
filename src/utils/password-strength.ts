export type PasswordStrength = "weak" | "medium" | "strong";
export type PasswordFeedback = {
  message: string;
  type: "error" | "warning" | "success";
};

export interface PasswordStats {
  length: number;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumbers: boolean;
  hasSpecialChars: boolean;
  entropy: number;
  estimatedCrackTime: string;
  similarityScore: number;
}

export function calculatePasswordStrength(password: string): {
  strength: PasswordStrength;
  score: number;
  feedback: PasswordFeedback[];
  stats: PasswordStats;
} {
  // Default values
  let score = 0;
  let feedback: PasswordFeedback[] = [];
  
  // Return early if password is empty
  if (!password) {
    return {
      strength: "weak",
      score: 0,
      feedback: [{ message: "Please enter a password", type: "error" }],
      stats: {
        length: 0,
        hasUppercase: false,
        hasLowercase: false,
        hasNumbers: false,
        hasSpecialChars: false,
        entropy: 0,
        estimatedCrackTime: "Instantly",
        similarityScore: 0
      }
    };
  }

  // Calculate stats
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  // Check password length
  if (password.length < 8) {
    feedback.push({
      message: "Password should be at least 8 characters long",
      type: "error",
    });
  } else if (password.length >= 12) {
    score += 25;
  } else {
    score += 10;
  }

  // Check for character types
  if (!hasUppercase) {
    feedback.push({
      message: "Add uppercase letter",
      type: "warning",
    });
  } else {
    score += 10;
  }

  if (!hasLowercase) {
    feedback.push({
      message: "Add lowercase letter",
      type: "warning",
    });
  } else {
    score += 10;
  }

  if (!hasNumbers) {
    feedback.push({
      message: "Include a number",
      type: "warning",
    });
  } else {
    score += 10;
  }

  if (!hasSpecialChars) {
    feedback.push({
      message: "Add a special character (!@#$%^&*)",
      type: "warning",
    });
  } else {
    score += 15;
  }
  
  // Check for common words or patterns
  const commonPatterns = [
    "password", "12345", "qwerty", "admin", "welcome", "letmein"
  ];
  
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    feedback.push({
      message: "Avoid common words or patterns",
      type: "error",
    });
    score -= 25;
  }
  
  // Check for repeating characters
  if (/(.)\1{2,}/.test(password)) {
    feedback.push({
      message: "Avoid repeating characters",
      type: "warning",
    });
    score -= 10;
  }

  // Check for keyboard patterns
  const keyboardPatterns = ["qwerty", "asdfgh", "zxcvbn", "1234", "12345"];
  if (keyboardPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    feedback.push({
      message: "Avoid keyboard patterns",
      type: "warning",
    });
    score -= 15;
  }

  // Calculate entropy (simplified)
  // Shannon entropy calculation
  let charPool = 0;
  if (hasLowercase) charPool += 26;
  if (hasUppercase) charPool += 26;
  if (hasNumbers) charPool += 10;
  if (hasSpecialChars) charPool += 33;
  
  const entropy = password.length * Math.log2(Math.max(charPool, 1));
  
  // Estimate crack time based on entropy
  let estimatedCrackTime = "Instantly";
  if (entropy > 80) {
    estimatedCrackTime = "Centuries";
  } else if (entropy > 60) {
    estimatedCrackTime = "Several years";
  } else if (entropy > 44) {
    estimatedCrackTime = "Months";
  } else if (entropy > 36) {
    estimatedCrackTime = "Weeks";
  } else if (entropy > 28) {
    estimatedCrackTime = "Days";
  } else if (entropy > 20) {
    estimatedCrackTime = "Hours";
  } else if (entropy > 10) {
    estimatedCrackTime = "Minutes";
  }
  
  // Calculate similarity score (0-100)
  // Higher score means more people might use similar passwords
  let similarityScore = 0;
  if (commonPatterns.some(pattern => password.toLowerCase().includes(pattern))) {
    similarityScore += 50;
  }
  if (/^[a-zA-Z]+$/.test(password)) {  // Only letters
    similarityScore += 30;
  }
  if (/^\d+$/.test(password)) {  // Only numbers
    similarityScore += 40;
  }
  if (password.length < 10) {
    similarityScore += Math.max(0, (10 - password.length) * 5);
  }
  
  // Cap similarity score
  similarityScore = Math.min(100, Math.max(0, similarityScore));

  // Determine strength based on score
  let strength: PasswordStrength = "weak";
  if (score >= 70) {
    strength = "strong";
    if (feedback.length === 0) {
      feedback.push({
        message: "Strong password!",
        type: "success",
      });
    }
  } else if (score >= 40) {
    strength = "medium";
    if (feedback.length === 0) {
      feedback.push({
        message: "Good password, but could be stronger",
        type: "warning",
      });
    }
  } else {
    if (feedback.length === 0) {
      feedback.push({
        message: "Weak password, please improve",
        type: "error",
      });
    }
  }

  // Cap score between 0 and 100
  score = Math.max(0, Math.min(100, score));

  return { 
    strength, 
    score, 
    feedback,
    stats: {
      length: password.length,
      hasUppercase,
      hasLowercase,
      hasNumbers,
      hasSpecialChars,
      entropy: Math.round(entropy * 10) / 10, // Round to one decimal
      estimatedCrackTime,
      similarityScore
    }
  };
}

export function generateStrongPassword(length: number = 16): string {
  const uppercase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercase = "abcdefghijklmnopqrstuvwxyz";
  const numbers = "0123456789";
  const special = "!@#$%^&*()_+=-[]{}|:;,.<>?";
  
  const allChars = uppercase + lowercase + numbers + special;
  
  // Ensure at least one of each character type
  let password = 
    uppercase[Math.floor(Math.random() * uppercase.length)] +
    lowercase[Math.floor(Math.random() * lowercase.length)] +
    numbers[Math.floor(Math.random() * numbers.length)] +
    special[Math.floor(Math.random() * special.length)];
  
  // Fill the rest randomly
  for (let i = 4; i < length; i++) {
    password += allChars[Math.floor(Math.random() * allChars.length)];
  }
  
  // Shuffle the password characters
  return password.split('').sort(() => 0.5 - Math.random()).join('');
}

export function generateMemorablePassword(basePassword: string = ""): string {
  // Start with common words that are easy to remember
  const easyWords = [
    "mountain", "sunshine", "rainbow", "diamond", "garden",
    "forest", "ocean", "planet", "wizard", "dragon",
    "champion", "victory", "morning", "castle", "thunder"
  ];
  
  // Add special character and number combinations that are easy to remember
  const specialCombos = ["#1", "!2", "@3", "$4", "%5", "&7", "*9"];
  
  // Create a memorable base if no password provided
  let password = "";
  
  if (!basePassword || basePassword.length < 3) {
    // Generate a new memorable password
    const word1 = easyWords[Math.floor(Math.random() * easyWords.length)];
    const word2 = easyWords[Math.floor(Math.random() * easyWords.length)];
    const combo = specialCombos[Math.floor(Math.random() * specialCombos.length)];
    
    // Capitalize the first letter of one word
    const capitalizedWord = word1.charAt(0).toUpperCase() + word1.slice(1);
    
    password = capitalizedWord + word2 + combo;
  } else {
    // Base the memorable password on the provided one
    let usedUppercase = false;
    let usedSpecial = false;
    let usedNumber = false;
    
    // Check what's already in the password
    for (const char of basePassword) {
      if (/[A-Z]/.test(char)) usedUppercase = true;
      if (/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(char)) usedSpecial = true;
      if (/\d/.test(char)) usedNumber = true;
    }
    
    // Start with a word that might be in the base password or use a random one
    let baseWord = "";
    for (const word of easyWords) {
      if (basePassword.toLowerCase().includes(word.substring(0, 3))) {
        baseWord = word;
        break;
      }
    }
    
    if (!baseWord) {
      baseWord = easyWords[Math.floor(Math.random() * easyWords.length)];
    }
    
    // Add second word
    let secondWord = easyWords[Math.floor(Math.random() * easyWords.length)];
    while (secondWord === baseWord) {
      secondWord = easyWords[Math.floor(Math.random() * easyWords.length)];
    }
    
    // Make sure we have uppercase
    if (!usedUppercase) {
      baseWord = baseWord.charAt(0).toUpperCase() + baseWord.slice(1);
    } else {
      secondWord = secondWord.charAt(0).toUpperCase() + secondWord.slice(1);
    }
    
    // Add special combo if needed
    let suffix = "";
    if (!usedSpecial || !usedNumber) {
      suffix = specialCombos[Math.floor(Math.random() * specialCombos.length)];
    }
    
    password = baseWord + secondWord + suffix;
  }
  
  return password;
}
