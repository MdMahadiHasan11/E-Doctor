"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { loginUser } from "@/services/auth/loginUser";
import { useActionState } from "react";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";

const LoginForm = () => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  // Safe error handler
  const getFieldError = (fieldName: string) => {
    if (state?.errors && Array.isArray(state.errors)) {
      const error = state.errors.find((err: any) => err.field === fieldName);
      return error?.message ?? null;
    }
    return null;
  };

  return (
    <form action={formAction}>
      <FieldGroup className="grid grid-cols-1 gap-4">
        {/* Email */}
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="m@example.com"
          />
          {getFieldError("email") && (
            <FieldDescription className="text-red-600">
              {getFieldError("email")}
            </FieldDescription>
          )}
        </Field>

        {/* Password */}
        <Field>
          <FieldLabel htmlFor="password">Password</FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="Enter your password"
          />
          {getFieldError("password") && (
            <FieldDescription className="text-red-600">
              {getFieldError("password")}
            </FieldDescription>
          )}
        </Field>

        {/* Submit */}
        <FieldGroup className="mt-4">
          <Button type="submit" disabled={isPending}>
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </FieldGroup>

        {/* Additional Links */}
        <FieldDescription className="px-6 text-center">
          Don&apos;t have an account?{" "}
          <a href="/register" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </FieldDescription>
        <FieldDescription className="px-6 text-center">
          <a href="/forget-password" className="text-blue-600 hover:underline">
            Forgot password?
          </a>
        </FieldDescription>

        {/* General error */}
        {getFieldError("general") && (
          <FieldDescription className="text-red-600 text-center">
            {getFieldError("general")}
          </FieldDescription>
        )}
      </FieldGroup>
    </form>
  );
};

export default LoginForm;
