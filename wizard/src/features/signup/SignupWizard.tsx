import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSignupWizard from "../../hooks/useSignupWizard";
import { mockSubmitSignup } from "../../services/mockAuth";
import ProgressBar from "../../components/ui/ProgressBar";
import Toast from "../../components/ui/Toast";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import StepFour from "./StepFour";

export function SignupWizard() {
  const navigate = useNavigate();
  const {
    signupData,
    currentStep,
    status,
    toast,
    showToast,
    hideToast,
    updateField,
    nextStep,
    previousStep,
  } = useSignupWizard();

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleFinalSubmit = async () => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);
      await mockSubmitSignup(signupData);
      showToast("Registration completed successfully!", "success");
      // Navigate to success page after brief delay for smooth transition
      setTimeout(() => {
        navigate("/success");
      }, 500);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to submit profile. Please try again.";
      showToast(msg, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      {/* Toast Notification */}
      <Toast toast={toast} onClose={hideToast} />

      {/* Main Card Container */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/70 p-6 sm:p-8 md:p-10 transition-all duration-300">
        {/* Step Progress Bar */}
        <ProgressBar currentStep={currentStep} totalSteps={4} />

        <div className="mt-8">
          {currentStep === 1 && (
            <StepOne
              data={signupData}
              updateField={updateField}
              onNext={nextStep}
              status={status}
              showToast={showToast}
            />
          )}

          {currentStep === 2 && (
            <StepTwo
              data={signupData}
              updateField={updateField}
              onNext={nextStep}
              onBack={previousStep}
              showToast={showToast}
            />
          )}

          {currentStep === 3 && (
            <StepThree
              data={signupData}
              updateField={updateField}
              onNext={nextStep}
              onBack={previousStep}
              showToast={showToast}
            />
          )}

          {currentStep === 4 && (
            <StepFour
              data={signupData}
              updateField={updateField}
              onSubmit={handleFinalSubmit}
              onBack={previousStep}
              isSubmitting={isSubmitting}
              showToast={showToast}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default SignupWizard;
