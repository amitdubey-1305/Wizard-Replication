import { useState } from "react";
import { GraduationCap, Phone, CheckCircle2, ArrowLeft } from "lucide-react";
import type { StepProps } from "./signup.types";
import { stepFourSchema } from "./signup.schema";
import { COURSE_OPTIONS, GRADUATION_YEARS } from "../../data/options";
import { sanitizeDigits } from "../../utils/validation";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

interface StepFourProps extends StepProps {
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function StepFour({
  data,
  updateField,
  onSubmit,
  onBack,
  isSubmitting = false,
}: StepFourProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = stepFourSchema.safeParse({
      college: data.college,
      course: data.course,
      graduationYear: data.graduationYear,
      phone: data.phone,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const path = String(err.path?.[0] ?? "");
        if (path && !fieldErrors[path]) {
          fieldErrors[path] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    onSubmit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Education & Contact</h2>
        <p className="mt-1 text-sm text-gray-500">
          Almost done! Provide your academic background and mobile contact.
        </p>
      </div>

      <div className="space-y-4">
        {/* College Name */}
        <Input
          id="college"
          label="College / University Name"
          placeholder="e.g. Indian Institute of Technology, Delhi"
          value={data.college}
          onChange={(e) => {
            updateField("college", e.target.value);
            if (errors.college) setErrors((prev) => ({ ...prev, college: "" }));
          }}
          error={errors.college}
          leftIcon={<GraduationCap className="w-5 h-5" />}
          required
          autoFocus
        />

        {/* Course and Graduation Year Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Select
            id="course"
            label="Course / Degree"
            placeholder="Select course"
            options={COURSE_OPTIONS}
            value={data.course}
            onChange={(e) => {
              updateField("course", e.target.value);
              if (errors.course) setErrors((prev) => ({ ...prev, course: "" }));
            }}
            error={errors.course}
            required
          />

          <Select
            id="graduation-year"
            label="Graduation Year"
            placeholder="Select year"
            options={GRADUATION_YEARS}
            value={data.graduationYear}
            onChange={(e) => {
              updateField("graduationYear", e.target.value);
              if (errors.graduationYear)
                setErrors((prev) => ({ ...prev, graduationYear: "" }));
            }}
            error={errors.graduationYear}
            required
          />
        </div>

        {/* Phone Number with +91 Prefix */}
        <Input
          id="phone"
          label="Mobile Phone Number"
          type="tel"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="9876543210"
          value={data.phone}
          onChange={(e) => {
            const digits = sanitizeDigits(e.target.value, 10);
            updateField("phone", digits);
            if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
          }}
          error={errors.phone}
          helperText="10-digit mobile number for SMS notifications and updates."
          leftIcon={<Phone className="w-5 h-5" />}
          required
        />
      </div>

      {/* Navigation and Submit Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="w-1/3"
        >
          Back
        </Button>

        <Button
          type="submit"
          loading={isSubmitting}
          loadingText="Submitting..."
          rightIcon={<CheckCircle2 className="w-4 h-4" />}
          className="flex-1"
        >
          Complete Registration
        </Button>
      </div>
    </form>
  );
}

export default StepFour;
