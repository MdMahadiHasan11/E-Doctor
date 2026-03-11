"use client";

import { useState } from "react";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import SetPasswordForm from "@/components/SetPasswordForm";

const ChangePasswordPage = () => {
  const [activeForm, setActiveForm] = useState<"change" | "set">("change");

  return (
    <div className=" flex items-center justify-center bg-muted/40">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">
            {activeForm === "change" ? "Change Password" : "Set Password"}
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            {activeForm === "change"
              ? "Update your account password securely"
              : "Set a new password for your account"}
          </p>
        </div>

        {/* Forms */}
        {activeForm === "change" ? (
          <ChangePasswordForm />
        ) : (
          <SetPasswordForm />
        )}

        {/* Toggle Buttons */}
        <div className="mt-3 text-center">
          <p className="text-sm text-gray-500">Or</p>
          {activeForm === "change" ? (
            <button
              onClick={() => setActiveForm("set")}
              className="text-primary text-sm hover:underline cursor-pointer"
            >
               Set a New Password
            </button>
          ) : (
            <button
              onClick={() => setActiveForm("change")}
              className="text-primary text-sm hover:underline cursor-pointer"
            >
              Back to Change Password
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChangePasswordPage;