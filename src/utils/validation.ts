import { RuleType } from "rc-field-form/lib/interface";

export const validateRequired = (message: string = "This field is required") => {
  return {
    required: true,
    message,
  };
};

export const validateEmail = (
  message: string = "Invalid email address"
): { type: RuleType; message: string } => {
  return {
    type: "email",
    message,
  };
};

export const validatePhone = (message: string = "Invalid phone number") => {
  return {
    pattern: /^(\+\d{1,3}|)\d{10}$/,
    message,
  };
};

export const validatePassword = (message: string = "Invalid password") => {
  return {
    pattern:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/,
    message,
  };
};

export const validateText = (message: string = "Invalid text input") => {
  return {
    pattern: /^[A-Za-z\s]+$/,
    message,
  };
};

export const validateNumber = (message: string = "Invalid number") => {
  return {
    pattern: /^\d+$/,
    message,
  };
};

export const validateMaxLength = (max: number = 90, message?: string) => {
  return {
    max,
    message: message || `Maximum length allowed is ${max} characters`,
  };
};
