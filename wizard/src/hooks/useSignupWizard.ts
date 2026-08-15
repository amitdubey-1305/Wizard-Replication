import { useState, useEffect, useCallback } from "react";
import type { SignupData, SignupStatus, ToastNotification } from "../features/signup/signup.types";
import { initialSignupData } from "../features/signup/signup.constants";
import {
  getSavedSignupData,
  saveSignupData,
  getSavedStep,
  saveStep,
  clearSignupStorage,
} from "../utils/storage";

export function useSignupWizard() {
  const [signupData, setSignupData] = useState<SignupData>(() => getSavedSignupData());
  const [currentStep, setCurrentStep] = useState<number>(() => getSavedStep());
  const [status, setStatus] = useState<SignupStatus>("idle");
  const [toast, setToast] = useState<ToastNotification | null>(null);

  // Sync signup data changes to sessionStorage
  useEffect(() => {
    saveSignupData(signupData);
  }, [signupData]);

  // Sync current step changes to sessionStorage
  useEffect(() => {
    saveStep(currentStep);
  }, [currentStep]);

  const showToast = useCallback(
    (message: string, type: "success" | "error" | "info" = "info") => {
      setToast({
        id: Math.random().toString(36).substring(2, 9),
        type,
        message,
      });
    },
    []
  );

  const hideToast = useCallback(() => {
    setToast(null);
  }, []);

  const updateField = useCallback(
    <K extends keyof SignupData>(field: K, value: SignupData[K]) => {
      setSignupData((prev) => {
        // If state is updated, reset city to avoid invalid combinations
        if (field === "state" && prev.state !== value) {
          return {
            ...prev,
            state: value as string,
            city: "",
          };
        }
        return {
          ...prev,
          [field]: value,
        };
      });
    },
    []
  );

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  }, []);

  const previousStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const resetForm = useCallback(() => {
    clearSignupStorage();
    setSignupData(initialSignupData);
    setCurrentStep(1);
    setStatus("idle");
    setToast(null);
  }, []);

  return {
    signupData,
    currentStep,
    status,
    toast,
    setStatus,
    showToast,
    hideToast,
    updateField,
    nextStep,
    previousStep,
    resetForm,
    setCurrentStep,
  };
}

export default useSignupWizard;
