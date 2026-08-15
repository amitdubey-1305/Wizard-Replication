import { useState, useMemo } from "react";
import { MapPin, ArrowRight, ArrowLeft } from "lucide-react";
import type { StepProps } from "./signup.types";
import { stepThreeSchema } from "./signup.schema";
import { INDIAN_STATES } from "../../data/states";
import { CITIES_BY_STATE } from "../../data/cities";
import Select from "../../components/ui/Select";
import Button from "../../components/ui/Button";

export function StepThree({ data, updateField, onNext, onBack }: StepProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Compute available cities based on selected state
  const availableCities = useMemo(() => {
    if (!data.state) return [];
    return CITIES_BY_STATE[data.state] || [];
  }, [data.state]);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = stepThreeSchema.safeParse({
      state: data.state,
      city: data.city,
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
        <h2 className="text-xl font-bold text-gray-900">Location Information</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select your current residential state and city.
        </p>
      </div>

      <div className="space-y-4">
        {/* State Dropdown */}
        <Select
          id="state"
          label="State"
          placeholder="Select your state"
          options={INDIAN_STATES}
          value={data.state}
          onChange={(e) => {
            const newState = e.target.value;
            // Updating state will automatically reset city in our central hook
            updateField("state", newState);
            if (errors.state) setErrors((prev) => ({ ...prev, state: "" }));
          }}
          error={errors.state}
          required
          autoFocus
        />

        {/* City Dropdown - Dependent on State */}
        <Select
          id="city"
          label="City"
          placeholder={data.state ? "Select your city" : "Select a state first"}
          options={availableCities}
          value={data.city}
          disabled={!data.state}
          onChange={(e) => {
            updateField("city", e.target.value);
            if (errors.city) setErrors((prev) => ({ ...prev, city: "" }));
          }}
          error={errors.city}
          helperText={
            data.state
              ? `Showing cities in ${data.state}`
              : "Please pick your state above to view cities."
          }
          required
        />

        {/* Info callout */}
        <div className="rounded-xl bg-gray-50 border border-gray-200 p-3.5 flex items-start gap-2.5 text-xs text-gray-600">
          <MapPin className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
          <span>
            Selecting a different state will automatically reset and update the available cities list.
          </span>
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
          Continue to Education
        </Button>
      </div>
    </form>
  );
}

export default StepThree;
