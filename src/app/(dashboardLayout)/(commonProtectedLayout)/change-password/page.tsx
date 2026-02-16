import ChangePasswordForm from "@/components/ChangePasswordForm";

const ChangePasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Change Password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update your account password securely
          </p>
        </div>

        <ChangePasswordForm />
      </div>
    </div>
  );
};

export default ChangePasswordPage;
