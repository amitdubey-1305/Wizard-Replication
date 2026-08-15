export function sanitizeDigits(value: string, maxLength?: number): string {
  const digits = value.replace(/\D/g, "");
  if (maxLength && maxLength > 0) {
    return digits.slice(0, maxLength);
  }
  return digits;
}

export function sanitizeLettersOnly(value: string): string {
  return value.replace(/[^a-zA-Z\s]/g, "");
}

export function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email.trim());
}
