type PasswordValidationResult = {
  isValid: boolean;
  rules: {
    minLength: boolean;
    uppercase: boolean;
    lowercase: boolean;
    number: boolean;
    specialChar: boolean;
  };
};

export function validatePassword(password: string): PasswordValidationResult {
  const rules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    specialChar: /[^A-Za-z0-9]/.test(password),
  };

  return {
    isValid: Object.values(rules).every(Boolean),
    rules,
  };
}
