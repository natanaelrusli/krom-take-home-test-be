import { ResponseError } from "../errors/response-error";

export function validateString(value: any, fieldName: string): string {
  if (typeof value !== "string" || value.trim() === "") {
    throw new ResponseError(
      400,
      `${fieldName} is required and must be a non-empty string.`
    );
  }
  return value;
}

export function validateEmail(value: any): string {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (typeof value !== "string" || !emailRegex.test(value)) {
    throw new ResponseError(400, `Invalid email format.`);
  }
  return value;
}

export function validateNumber(value: any, fieldName: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value <= 0) {
    throw new ResponseError(400, `${fieldName} must be a positive integer.`);
  }
  return value;
}

export function validateUrl(value: any): string {
  try {
    new URL(value);
  } catch (_) {
    throw new ResponseError(400, `Invalid URL format.`);
  }
  return value;
}
