import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import SignupWizard from "../features/signup/SignupWizard";

export function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/30 via-gray-50 to-white flex flex-col justify-between">
      {/* Top Bar */}
      <header className="border-b border-gray-200/70 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-600 hover:text-indigo-600 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Home</span>
          </Link>

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm shadow-indigo-200">
              W
            </div>
            <span className="font-bold text-gray-900 text-sm tracking-tight">WizardApp</span>
          </div>

          <Link
            to="/terms"
            className="text-xs font-semibold text-gray-500 hover:text-gray-900 transition"
          >
            Terms
          </Link>
        </div>
      </header>

      {/* Main Wizard Area */}
      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 flex-1 flex flex-col items-center justify-center">
        <SignupWizard />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-6 text-center text-xs text-gray-400">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Secure 256-bit encrypted onboarding session</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-indigo-600 transition">Terms & Conditions</Link>
            <Link to="/" className="hover:text-indigo-600 transition">Landing Page</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SignupPage;