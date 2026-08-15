import type { SignupData } from "../features/signup/signup.types";

/**
 * Sends an OTP to the given email by calling the Vite dev-server endpoint.
 * The OTP is printed in the terminal running `npm run dev`.
 */
export async function mockSendOtp(
  email: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch("/api/send-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Failed to send OTP. Please try again.");
  }

  return { success: true, message: data.message };
}

/**
 * Verifies the OTP the user entered against the one the server generated.
 */
export async function mockVerifyOtp(
  email: string,
  otp: string
): Promise<{ success: boolean; message: string }> {
  const res = await fetch("/api/verify-otp", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, otp }),
  });

  const data = await res.json();

  if (!res.ok || !data.success) {
    throw new Error(data.message || "Invalid OTP. Please try again.");
  }

  return { success: true, message: data.message };
}

/**
 * Simulates final signup form submission.
 */
export async function mockSubmitSignup(
  data: SignupData
): Promise<{ success: boolean; data: SignupData }> {
  // Simulate a network delay for the submission
  await new Promise((resolve) => setTimeout(resolve, 1200));

  // Save the completed profile so the success page can display a summary
  if (typeof window !== "undefined") {
    sessionStorage.setItem("signup_completed_user", JSON.stringify(data));
  }

  return { success: true, data };
}

/**
 * Clears the user session on the server and in sessionStorage.
 * Used by the Logout button.
 */
export async function mockLogout(email?: string): Promise<void> {
  try {
    await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email || "" }),
    });
  } catch {
    // Fire-and-forget; ignore network errors on logout
  }

  if (typeof window !== "undefined") {
    sessionStorage.removeItem("signup_wizard_data");
    sessionStorage.removeItem("signup_wizard_step");
    sessionStorage.removeItem("signup_completed_user");
  }
}
