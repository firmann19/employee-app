import type { ValidationResult } from "./Validation.types";

export const validateRequiredString = (
  value: string,
  fieldName: string
): ValidationResult => {
  const isEmpty = !value || value.trim() === "";
  return isEmpty
    ? { isValid: false, message: `${fieldName} is required.` }
    : { isValid: true };
};

export const validateAge = (value: number): ValidationResult => {
  if (value === null || value === undefined)
    return { isValid: false, message: "Age is required." };

  if (!Number.isInteger(value))
    return { isValid: false, message: "Age must be an integer." };

  if (value < 20 || value > 40)
    return { isValid: false, message: "Age must be between 20 and 40." };

  return { isValid: true };
};

export const validateHobby = (value: string): ValidationResult => {
  if (!value || value.trim() === "")
    return { isValid: false, message: "Hobby is required." };

  const hobbies = value
    .split(",")
    .map((h) => h.trim())
    .filter(Boolean);

  if (hobbies.length < 1 || hobbies.length > 5)
    return { isValid: false, message: "Hobby must contain 1 to 5 items." };

  return { isValid: true };
};
