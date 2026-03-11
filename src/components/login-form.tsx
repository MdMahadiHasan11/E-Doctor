"use client";

import { loginUser } from "@/services/auth/login-user";
import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import InputFieldError from "./shared/InputFieldError";
import { Button } from "./ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import Image from "next/image";

const LoginForm = ({ redirect }: { redirect?: string }) => {
  const [state, formAction, isPending] = useActionState(loginUser, null);

  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);

  // 🔴 Google Login Handler (OAuth Redirect)
  const handleGoogleLogin = () => {
    const backendURL = process.env.NEXT_PUBLIC_BASE_API_URL;
    const redirectTo = redirect || "dashboard";

    window.location.href = `${backendURL}/auth/google?redirect=${redirectTo}`;
  };

  return (
    <div className="space-y-4">
      {/* 🔵 Email Login Form */}
      <form action={formAction}>
        {redirect && <input type="hidden" name="redirect" value={redirect} />}

        <FieldGroup>
          <div className="grid grid-cols-1 gap-4">
            {/* Email */}
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
              />
              <InputFieldError field="email" state={state} />
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
              <InputFieldError field="password" state={state} />
            </Field>
          </div>

          <FieldGroup className="mt-4">
            <Field>
              <Button type="submit" disabled={isPending} className="w-full">
                {isPending ? "Logging in..." : "Login"}
              </Button>

              <FieldDescription className="px-6 text-center mt-3">
                Don&apos;t have an account?{" "}
                <a href="/register" className="text-blue-600 hover:underline">
                  Sign up
                </a>
              </FieldDescription>

              <FieldDescription className="px-6 text-center">
                <a
                  href="/forget-password"
                  className="text-blue-600 hover:underline"
                >
                  Forgot password?
                </a>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>

      {/* 🔹 Divider */}
      <div className="flex items-center gap-2">
        <hr className="flex-1" />
        <span className="text-sm text-gray-400">OR</span>
        <hr className="flex-1" />
      </div>

      {/* 🔴 Google Login Button */}
      <Button
        type="button"
        variant="outline"
        onClick={handleGoogleLogin}
        className="w-full flex items-center justify-center gap-2"
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          width={24}
          height={24}
          alt="Google"
          className="w-5 h-5"
        />
        Continue with Google
      </Button>
    </div>
  );
};

export default LoginForm;
