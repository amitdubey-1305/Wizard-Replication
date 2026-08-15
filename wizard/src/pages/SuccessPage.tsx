import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, User, Mail, MapPin, GraduationCap, Phone, RotateCcw, Home, LogOut } from "lucide-react";
import type { SignupData } from "../features/signup/signup.types";
import { clearSignupStorage } from "../utils/storage";
import { mockLogout } from "../services/mockAuth";
import Button from "../components/ui/Button";

export function SuccessPage() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<SignupData | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const raw = sessionStorage.getItem("signup_completed_user");
      if (raw) {
        try {
          setUserData(JSON.parse(raw));
        } catch (e) {
          console.error("Failed to parse saved user", e);
        }
      }
    }
  }, []);

  const handleStartNew = () => {
    clearSignupStorage();
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("signup_completed_user");
    }
    navigate("/signup");
  };

  const handleLogout = async () => {
    if (isLoggingOut) return;
    try {
      setIsLoggingOut(true);
      await mockLogout(userData?.email);
      navigate("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/50 via-white to-gray-50 flex flex-col justify-between py-8 px-4 sm:px-6">

      {/* Top Bar with Logout */}
      <header className="max-w-xl mx-auto w-full flex items-center justify-between mb-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
            W
          </div>
          <span className="font-bold text-gray-900 text-sm tracking-tight">WizardApp</span>
        </Link>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          loading={isLoggingOut}
          loadingText="Logging out..."
          leftIcon={<LogOut className="w-4 h-4" />}
          className="text-red-600 hover:bg-red-50 hover:text-red-700"
        >
          Logout
        </Button>
      </header>

      <div className="max-w-xl mx-auto w-full my-auto space-y-6">
        {/* Success Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-100/80 p-6 sm:p-10 text-center space-y-5">
          {/* Animated Green Badge */}
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-100 ring-8 ring-emerald-50 animate-in zoom-in-50 duration-300">
            <Check className="w-8 h-8 sm:w-10 sm:h-10 stroke-[3]" />
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
              Profile Completed!
            </h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Your registration has been successfully created and your email has been verified.
            </p>
          </div>

          {/* Profile Overview Card */}
          {userData && (
            <div className="text-left bg-gray-50/80 rounded-2xl border border-gray-200/80 p-5 space-y-3.5 text-xs sm:text-sm">
              <h2 className="font-bold text-gray-900 text-xs uppercase tracking-wider text-gray-500 border-b border-gray-200 pb-2">
                Registration Summary
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="flex items-center gap-2 text-gray-700">
                  <User className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="font-semibold text-gray-900">
                    {userData.firstName} {userData.lastName}
                  </span>
                  {userData.age && <span className="text-gray-500">({userData.age} yrs)</span>}
                </div>

                <div className="flex items-center gap-2 text-gray-700 truncate">
                  <Mail className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span className="truncate">{userData.email}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <MapPin className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>
                    {userData.city ? `${userData.city}, ` : ""}
                    {userData.state}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-gray-700">
                  <Phone className="w-4 h-4 text-indigo-600 shrink-0" />
                  <span>+91 {userData.phone}</span>
                </div>
              </div>

              {userData.college && (
                <div className="flex items-start gap-2 text-gray-700 pt-1 border-t border-gray-200/60">
                  <GraduationCap className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-900">{userData.college}</p>
                    <p className="text-xs text-gray-500">
                      {userData.course ? `${userData.course}` : ""}
                      {userData.graduationYear ? ` • Class of ${userData.graduationYear}` : ""}
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={handleStartNew}
              leftIcon={<RotateCcw className="w-4 h-4" />}
              className="w-full sm:w-1/2"
            >
              Register Again
            </Button>

            <Link to="/" className="w-full sm:w-1/2">
              <Button
                size="lg"
                leftIcon={<Home className="w-4 h-4" />}
                className="w-full"
              >
                Go to Home
              </Button>
            </Link>
          </div>

          {/* Divider and Danger Logout */}
          <div className="border-t border-gray-100 pt-4">
            <button
              type="button"
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="w-full flex items-center justify-center gap-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl px-4 py-2.5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? "Logging out..." : "Logout & Clear Session"}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              This will clear all your session data and return you to the home page.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center text-xs text-gray-400 py-2">
        &copy; {new Date().getFullYear()} WizardApp. Thank you for registering.
      </footer>
    </div>
  );
}

export default SuccessPage;