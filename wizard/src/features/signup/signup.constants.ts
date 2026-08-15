import type { SignupData } from "./signup.types";

export const initialSignupData: SignupData = {
  email: "",
  otp: "",

  firstName: "",
  lastName: "",

  age: null,
  pronouns: "",

  state: "",
  city: "",

  college: "",
  course: "",

  graduationYear: "",
  phone: "",
};

export const WIZARD_STEPS = [
  { step: 1, title: "Email & OTP", description: "Verify your email address" },
  { step: 2, title: "Personal Details", description: "Tell us about yourself" },
  { step: 3, title: "Location", description: "Where are you located?" },
  { step: 4, title: "Education & Contact", description: "College and phone number" },
];