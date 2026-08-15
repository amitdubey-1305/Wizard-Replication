import type { SignupData } from "../features/signup/signup.types";
import { initialSignupData } from "../features/signup/signup.constants";

const SIGNUP_DATA_KEY = "signup_wizard_data";
const SIGNUP_STEP_KEY = "signup_wizard_step";

export function getSavedSignupData(): SignupData {
  if (typeof window === "undefined") return initialSignupData;
  try {
    const raw = sessionStorage.getItem(SIGNUP_DATA_KEY);
    if (!raw) return initialSignupData;
    const parsed = JSON.parse(raw);
    return { ...initialSignupData, ...parsed };
  } catch {
    return initialSignupData;
  }
}

export function saveSignupData(data: SignupData): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SIGNUP_DATA_KEY, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to save signup data to sessionStorage", err);
  }
}

export function getSavedStep(): number {
  if (typeof window === "undefined") return 1;
  try {
    const raw = sessionStorage.getItem(SIGNUP_STEP_KEY);
    if (!raw) return 1;
    const step = parseInt(raw, 10);
    return isNaN(step) || step < 1 || step > 4 ? 1 : step;
  } catch {
    return 1;
  }
}

export function saveStep(step: number): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(SIGNUP_STEP_KEY, step.toString());
  } catch (err) {
    console.error("Failed to save step to sessionStorage", err);
  }
}

export function clearSignupStorage(): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.removeItem(SIGNUP_DATA_KEY);
    sessionStorage.removeItem(SIGNUP_STEP_KEY);
  } catch (err) {
    console.error("Failed to clear sessionStorage", err);
  }
}
