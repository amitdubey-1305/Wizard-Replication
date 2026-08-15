# Signup Wizard Project

A 4-step user signup and onboarding flow built with React, TypeScript, Vite, Tailwind CSS, and React Hook Form.

## Project Structure

- **`src/pages/`**: Application routes (`/signup`, `/terms`, `/success`, and landing page).
- **`src/features/signup/`**: Core multi-step wizard logic, schemas, types, and step components.
  - **Step 1**: Email & OTP verification
  - **Step 2**: Personal details (name, age, pronouns)
  - **Step 3**: Location details (state, city)
  - **Step 4**: Education and phone number (college, course, graduation year, phone)
- **`src/components/`**: Reusable UI components (buttons, input fields, progress bar).
- **`src/services/`**: API and OTP mock/network services.

## Tech Stack

- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4
- **Form Management**: React Hook Form + Zod
- **Routing**: React Router DOM v7
- **Icons**: Lucide React

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Build for production:
   ```bash
   npm run build
   ```
