import { Link } from "react-router-dom";
import { ArrowRight, Shield, Sparkles, Zap, Lock, FileText } from "lucide-react";
import Button from "../components/ui/Button";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50/40 via-white to-gray-50 flex flex-col justify-between">
      {/* Navigation Header */}
      <header className="border-b border-gray-100 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200">
              W
            </div>
            <span className="font-bold text-lg text-gray-900 tracking-tight">WizardApp</span>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/terms"
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition px-3 py-1.5 rounded-lg hover:bg-gray-100"
            >
              Terms
            </Link>
            <Link to="/signup">
              <Button size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 text-center flex-1 flex flex-col items-center justify-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-xs font-semibold text-indigo-700 mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>4-Step Intelligent Onboarding Wizard</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight max-w-2xl">
          Streamlined user onboarding made simple and effortless.
        </h1>

        {/* Description */}
        <p className="mt-4 sm:mt-6 text-base sm:text-lg text-gray-600 max-w-xl leading-relaxed">
          Complete your registration in just a few quick steps with OTP verification, smart location detection, and real-time validation.
        </p>

        {/* CTA Actions */}
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full max-w-xs sm:max-w-none justify-center">
          <Link to="/signup" className="w-full sm:w-auto">
            <Button size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} className="w-full sm:w-auto px-8">
              Start Signup Process
            </Button>
          </Link>

          <Link to="/terms" className="w-full sm:w-auto">
            <Button variant="outline" size="lg" leftIcon={<FileText className="w-4 h-4" />} className="w-full sm:w-auto">
              View Terms & Conditions
            </Button>
          </Link>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left w-full">
          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Instant OTP Verification</h3>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Safe and seamless 6-digit email verification with auto-focus and countdown resend timer.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Smart Field Sync</h3>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Dynamic state-to-city cascading dropdowns and age restriction safeguards.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="font-semibold text-gray-900 text-sm">Data Persistence</h3>
            <p className="mt-1 text-xs text-gray-500 leading-relaxed">
              Navigate back and forth or refresh without losing any entered form information.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-6 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>&copy; {new Date().getFullYear()} WizardApp. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <Link to="/terms" className="hover:text-indigo-600 transition">Terms of Service</Link>
            <Link to="/signup" className="hover:text-indigo-600 transition">Register</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;