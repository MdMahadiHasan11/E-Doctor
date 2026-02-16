import RegisterForm from "@/components/register-form";
import Link from "next/link";

const RegisterPage = () => {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background p-4 md:p-6">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -mr-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full -ml-48 -mb-48 blur-3xl" />
      
      <div className="w-full max-w-2xl space-y-6 rounded-3xl border border-white/50 bg-white/95 backdrop-blur-xl p-10 md:p-12 shadow-2xl relative z-10">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl" />
        
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-black text-xl">E</span>
            </div>
          </div>
          <h1 className="text-4xl font-black text-foreground">Create Your Account</h1>
          <p className="text-foreground/60 font-medium leading-relaxed">
            Join thousands of patients managing their health with E-Doctor
          </p>
        </div>
        
        <RegisterForm />
        
        <div className="space-y-3 border-t border-border pt-6">
          <p className="text-center text-sm text-foreground/60">
            Already have an account?{' '}
            <Link href="/login" className="font-bold text-primary hover:text-accent transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
