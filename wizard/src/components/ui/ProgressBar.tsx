import { Check } from "lucide-react";
import { WIZARD_STEPS } from "../../features/signup/signup.constants";

interface ProgressBarProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
  const progressPercent = Math.min(100, Math.max(0, ((currentStep - 1) / (totalSteps - 1)) * 100));

  return (
    <div className="w-full">
      {/* Step Numbers and Line */}
      <div className="relative mb-6">
        {/* Background Track Line */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 h-1 bg-gray-100 rounded-full z-0" />
        
        {/* Active Progress Fill Line */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 h-1 bg-indigo-600 rounded-full transition-all duration-300 ease-out z-0"
          style={{ width: `${progressPercent}%` }}
        />

        {/* Step Nodes */}
        <div className="relative flex justify-between z-10">
          {WIZARD_STEPS.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;

            return (
              <div key={s.step} className="flex flex-col items-center">
                <div
                  className={`
                    w-9 h-9 sm:w-10 sm:h-10
                    rounded-full
                    flex items-center justify-center
                    text-xs sm:text-sm font-semibold
                    transition-all duration-200
                    ${
                      isCompleted
                        ? "bg-indigo-600 text-white shadow-sm ring-4 ring-indigo-50"
                        : isCurrent
                        ? "bg-white border-2 border-indigo-600 text-indigo-600 shadow ring-4 ring-indigo-50"
                        : "bg-white border-2 border-gray-200 text-gray-400"
                    }
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-4 h-4 stroke-[3]" />
                  ) : (
                    <span>{s.step}</span>
                  )}
                </div>

                {/* Step Title on larger screens */}
                <div className="hidden sm:block text-center mt-2">
                  <p
                    className={`text-xs font-medium ${
                      isCurrent
                        ? "text-indigo-600 font-semibold"
                        : isCompleted
                        ? "text-gray-900"
                        : "text-gray-400"
                    }`}
                  >
                    {s.title}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile Current Step Subtitle */}
      <div className="sm:hidden flex items-center justify-between text-xs text-gray-500 font-medium px-1">
        <span>Step {currentStep} of {totalSteps}</span>
        <span className="text-indigo-600 font-semibold">{WIZARD_STEPS[currentStep - 1]?.title}</span>
      </div>
    </div>
  );
}

export default ProgressBar;
