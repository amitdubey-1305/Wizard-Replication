import { useState, useEffect } from "react";
import { Mail, ArrowRight, RotateCw, Edit3 } from "lucide-react";
import type { StepProps } from "./signup.types";
import { emailSchema, otpSchema } from "./signup.schema";
import { mockSendOtp, mockVerifyOtp } from "../../services/mockAuth";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";
import OTPInput from "../../components/ui/OTPInput";

export function StepOne({
  data,
  updateField,
  onNext,
  status,
  showToast,
}: StepProps) {
  const [isOtpSent, setIsOtpSent] = useState<boolean>(() => !!data.email && data.otp.length === 6);
  const [emailError, setEmailError] = useState<string>("");
  const [otpError, setOtpError] = useState<string>("");
  const [isSendingOtp, setIsSendingOtp] = useState<boolean>(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(30);
  const [canResend, setCanResend] = useState<boolean>(false);

  // Countdown timer for OTP resend
  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isOtpSent && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [isOtpSent, countdown]);

  const handleSendOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setEmailError("");

    // Validate email
    const result = emailSchema.safeParse({ email: data.email });
    if (!result.success) {
      const firstIssue = result.error.issues?.[0]?.message;
      setEmailError(firstIssue || "Enter a valid email address");
      return;
    }

    if (isSendingOtp) return; // Prevent duplicate clicks

    try {
      setIsSendingOtp(true);
      const res = await mockSendOtp(data.email);
      setIsOtpSent(true);
      setCountdown(30);
      setCanResend(false);
      showToast?.(res.message, "success");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to send verification code";
      showToast?.(errorMsg, "error");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleResendOtp = async () => {
    if (!canResend || isSendingOtp) return;
    try {
      setIsSendingOtp(true);
      await mockSendOtp(data.email);
      setCountdown(30);
      setCanResend(false);
      updateField("otp", "");
      setOtpError("");
      showToast?.(`New code sent to ${data.email}`, "success");
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Failed to resend code";
      showToast?.(errorMsg, "error");
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtp = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setOtpError("");

    // Validate OTP format
    const result = otpSchema.safeParse({ otp: data.otp });
    if (!result.success) {
      const firstIssue = result.error.issues?.[0]?.message;
      setOtpError(firstIssue || "Please enter the 6-digit code");
      return;
    }

    if (isVerifyingOtp || status === "verifyingOtp") return; // Prevent duplicate clicks

    try {
      setIsVerifyingOtp(true);
      const res = await mockVerifyOtp(data.email, data.otp);
      showToast?.(res.message, "success");
      if (onNext) {
        onNext();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Invalid OTP entered";
      setOtpError(msg);
      showToast?.(msg, "error");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          {!isOtpSent ? "Welcome! Let's get started" : "Verify your email"}
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {!isOtpSent
            ? "Enter your email address to receive a secure one-time verification code."
            : `We sent a 6-digit verification code to `}
          {isOtpSent && <span className="font-semibold text-gray-800">{data.email}</span>}
        </p>
      </div>

      {!isOtpSent ? (
        /* Email Input Stage */
        <form onSubmit={handleSendOtp} className="space-y-5" noValidate>
          <Input
            id="email-input"
            label="Email Address"
            type="email"
            placeholder="e.g. alex@example.com"
            value={data.email}
            onChange={(e) => {
              updateField("email", e.target.value);
              if (emailError) setEmailError("");
            }}
            error={emailError}
            leftIcon={<Mail className="w-5 h-5" />}
            required
            autoFocus
          />

          <Button
            type="submit"
            size="lg"
            loading={isSendingOtp}
            loadingText="Sending Code..."
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full"
          >
            Continue with Email
          </Button>
        </form>
      ) : (
        /* OTP Verification Stage */
        <form onSubmit={handleVerifyOtp} className="space-y-6" noValidate>
          {/* Email Change Chip */}
          <div className="flex items-center justify-between rounded-xl bg-gray-50 p-3 border border-gray-200 text-xs">
            <div className="flex items-center gap-2 text-gray-600 truncate">
              <Mail className="w-4 h-4 text-gray-400 shrink-0" />
              <span className="truncate font-medium">{data.email}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsOtpSent(false);
                updateField("otp", "");
                setOtpError("");
              }}
              className="flex items-center gap-1 font-semibold text-indigo-600 hover:text-indigo-700 ml-2 shrink-0"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Change
            </button>
          </div>

          {/* OTP Code Box */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-700">
              6-Digit Verification Code <span className="text-red-500">*</span>
            </label>

            <OTPInput
              value={data.otp}
              onChange={(otp) => {
                updateField("otp", otp);
                if (otpError) setOtpError("");
              }}
              error={!!otpError}
              disabled={isVerifyingOtp}
            />

            {otpError && <p className="text-xs text-red-600 mt-1">{otpError}</p>}
          </div>

          {/* Terminal hint */}
          <div className="rounded-xl bg-amber-50 border border-amber-200 p-3 flex items-start gap-2.5 text-xs text-amber-800">
            <span className="text-base shrink-0">💻</span>
            <span>
              The OTP was printed in your terminal running <strong>npm run dev</strong>. Check the console and enter it above.
            </span>
          </div>

          {/* Resend Timer */}
          <div className="text-center text-xs text-gray-500">
            {!canResend ? (
              <p>
                Didn't receive code? Resend in{" "}
                <span className="font-semibold text-gray-700">{countdown}s</span>
              </p>
            ) : (
              <button
                type="button"
                onClick={handleResendOtp}
                disabled={isSendingOtp}
                className="inline-flex items-center gap-1.5 font-semibold text-indigo-600 hover:text-indigo-700 transition"
              >
                <RotateCw className={`w-3.5 h-3.5 ${isSendingOtp ? "animate-spin" : ""}`} />
                Resend Code
              </button>
            )}
          </div>

          {/* Verify Button */}
          <Button
            type="submit"
            size="lg"
            loading={isVerifyingOtp}
            loadingText="Verifying Code..."
            rightIcon={<ArrowRight className="w-4 h-4" />}
            className="w-full"
          >
            Verify & Proceed
          </Button>
        </form>
      )}
    </div>
  );
}

export default StepOne;
