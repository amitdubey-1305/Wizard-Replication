import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle } from "lucide-react";
import Button from "../components/ui/Button";

export function TermsPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-indigo-600 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold text-sm">
              W
            </div>
            <span className="font-bold text-gray-900 text-sm">WizardApp</span>
          </div>
        </div>
      </header>

      {/* Terms Body */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10 flex-1">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-10 space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              Legal & Privacy
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">
              Terms & Conditions
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Last updated: August 2026. Please read these terms carefully before proceeding with registration.
            </p>
          </div>

          <div className="space-y-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-6">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
                1. Acceptance of Terms
              </h2>
              <p>
                By creating an account and completing the onboarding wizard, you agree to abide by all platform guidelines, policies, and applicable regional laws.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
                2. Age Requirement & Eligibility
              </h2>
              <p>
                You must be at least 18 years of age to register and use our platform. Submissions with age below 18 will be restricted during registration.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
                3. Verification & Security
              </h2>
              <p>
                You are responsible for verifying your email address using the one-time code (OTP) and ensuring that all academic and contact information submitted is accurate and up to date.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-indigo-600" />
                4. Data Protection & Privacy
              </h2>
              <p>
                We do not sell your personal information. Your profile details (including state, city, and college) are stored securely and used solely for platform services.
              </p>
            </section>
          </div>

          {/* Action Buttons */}
          <div className="border-t border-gray-100 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              leftIcon={<ArrowLeft className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              Decline & Exit
            </Button>

            <Button
              onClick={() => navigate("/signup")}
              rightIcon={<ArrowRight className="w-4 h-4" />}
              className="w-full sm:w-auto"
            >
              I Agree & Continue to Signup
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} WizardApp. All terms apply.
      </footer>
    </div>
  );
}

export default TermsPage;