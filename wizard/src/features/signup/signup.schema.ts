import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
});

export const otpSchema = z.object({
  otp: z
    .string()
    .trim()
    .min(1, "Verification code is required")
    .regex(/^\d{6}$/, "Verification code must be exactly 6 digits"),
});

export const stepTwoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, "First name is required")
    .max(50, "First name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "First name should only contain letters"),
  lastName: z
    .string()
    .trim()
    .min(1, "Last name is required")
    .max(50, "Last name cannot exceed 50 characters")
    .regex(/^[a-zA-Z\s]+$/, "Last name should only contain letters"),
  age: z
    .number()
    .nullable()
    .refine((val): val is number => val !== null, {
      message: "Age is required",
    })
    .refine((val) => val === null || val >= 18, {
      message: "You must be at least 18 years old",
    })
    .refine((val) => val === null || val <= 100, {
      message: "Please enter a valid age (up to 100)",
    }),
  pronouns: z.string().trim().min(1, "Please select your pronouns"),
});

export const stepThreeSchema = z.object({
  state: z.string().trim().min(1, "Please select your state"),
  city: z.string().trim().min(1, "Please select your city"),
});

export const stepFourSchema = z.object({
  college: z
    .string()
    .trim()
    .min(1, "College name is required")
    .max(100, "College name cannot exceed 100 characters"),
  course: z.string().trim().min(1, "Please select your course"),
  graduationYear: z.string().trim().min(1, "Please select graduation year"),
  phone: z
    .string()
    .trim()
    .min(1, "Phone number is required")
    .regex(
      /^[6-9]\d{9}$/,
      "Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9"
    ),
});

export type StepTwoFormValues = z.infer<typeof stepTwoSchema>;
export type StepThreeFormValues = z.infer<typeof stepThreeSchema>;
export type StepFourFormValues = z.infer<typeof stepFourSchema>;
