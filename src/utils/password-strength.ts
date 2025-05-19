
export type PasswordStrength = "weak" | "medium" | "strong";
export type PasswordFeedback = {
  message: string;
  type: "error" | "warning" | "success";
};

export function calculatePasswordStrength(password: string): {
  strength: PasswordStrength;
  score: number;
  feedback: PasswordFeedback[];
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
    };
  }

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

  // Check for uppercase letters
  if (!/[A-Z]/.test(password)) {
    feedback.push({
      message: "Add uppercase letter",
      type: "warning",
    });
  } else {
    score += 10;
  }

  // Check for lowercase letters
  if (!/[a-z]/.test(password)) {
    feedback.push({
      message: "Add lowercase letter",
      type: "warning",
    });
  } else {
    score += 10;
  }

  // Check for numbers
  if (!/\d/.test(password)) {
    feedback.push({
      message: "Include a number",
      type: "warning",
    });
  } else {
    score += 10;
  }

  // Check for special characters
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
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

  return { strength, score, feedback };
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
