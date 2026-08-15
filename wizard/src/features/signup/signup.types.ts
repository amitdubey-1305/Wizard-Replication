export interface SignupData {
  email: string;
  otp: string;

  firstName: string;
  lastName: string;

  age: number | null;
  pronouns: string;

  state: string;
  city: string;

  college: string;
  course: string;

  graduationYear: string;
  phone: string;
}

export type SignupStatus =
  | "idle"
  | "sendingOtp"
  | "verifyingOtp"
  | "submitting"
  | "success"
  | "error";

export interface ToastNotification {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

export interface StepProps {
  data: SignupData;
  updateField: <K extends keyof SignupData>(field: K, value: SignupData[K]) => void;
  onNext?: () => void;
  onBack?: () => void;
  status?: SignupStatus;
  showToast?: (message: string, type?: "success" | "error" | "info") => void;
}