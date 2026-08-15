import { useState } from "react";
import { User, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import type { StepProps } from "./signup.types";
import { stepTwoSchema } from "./signup.schema";
import { sanitizeLettersOnly, sanitizeDigits } from "../../utils/validation";
import { PRONOUN_OPTIONS } from "../../data/options";
import Input from "../../components/ui/Input";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

export function StepTwo({ data, updateField, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = stepTwoSchema.safeParse({
      firstName: data.firstName,
      lastName: data.lastName,
      age: data.age,
      pronouns: data.pronouns,
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

    if (onNext) {
      onNext();
    }
  };

  return (
    <form onSubmit={handleNext} className="space-y-6" noValidate>
      <div>
        <h2 className="text-xl font-bold text-gray-900">Personal Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Please provide your legal name and basic personal details.
        </p>
      </div>

      <div className="space-y-4">
        {/* Name Fields Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="first-name"
            label="First Name"
            placeholder="e.g. Rahul"
            value={data.firstName}
            onChange={(e) => {
              const val = sanitizeLettersOnly(e.target.value);
              updateField("firstName", val);
              if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
            }}
            error={errors.firstName}
            leftIcon={<User className="w-5 h-5" />}
            required
            autoFocus
          />

          <Input
            id="last-name"
            label="Last Name"
            placeholder="e.g. Sharma"
            value={data.lastName}
            onChange={(e) => {
              const val = sanitizeLettersOnly(e.target.value);
              updateField("lastName", val);
              if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
            }}
            error={errors.lastName}
            leftIcon={<User className="w-5 h-5" />}
            required
          />
        </div>

        {/* Age and Pronouns Grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Input
            id="age"
            label="Age (Years)"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="e.g. 21"
            value={data.age !== null ? String(data.age) : ""}
            onChange={(e) => {
              const raw = sanitizeDigits(e.target.value, 3);
              const numVal = raw ? parseInt(raw, 10) : null;
              updateField("age", numVal);
              if (errors.age) setErrors((prev) => ({ ...prev, age: "" }));
            }}
            error={errors.age}
            helperText="You must be at least 18 years old to register."
            leftIcon={<Calendar className="w-5 h-5" />}
            required
          />

          <Select
            id="pronouns"
            label="Pronouns"
            placeholder="Select your pronouns"
            options={PRONOUN_OPTIONS}
            value={data.pronouns}
            onChange={(e) => {
              updateField("pronouns", e.target.value);
              if (errors.pronouns) setErrors((prev) => ({ ...prev, pronouns: "" }));
            }}
            error={errors.pronouns}
            required
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          leftIcon={<ArrowLeft className="w-4 h-4" />}
          className="w-1/3"
        >
          Back
        </Button>

        <Button
          type="submit"
          rightIcon={<ArrowRight className="w-4 h-4" />}
          className="flex-1"
        >
          Continue to Location
        </Button>
      </div>
    </form>
  );
}

export default StepTwo;
