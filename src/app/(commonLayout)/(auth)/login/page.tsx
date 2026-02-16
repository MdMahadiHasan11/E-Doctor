import LoginForm from "@/components/login-form";
import Link from "next/link";

const LoginPage = async ({
  searchParams,
}: {
  searchParams?: Promise<{ redirect?: string }>;
}) => {
  const params = (await searchParams) || {};
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-secondary/20 to-background p-4">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full -ml-48 -mt-48 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full -mr-48 -mb-48 blur-3xl" />
      
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/50 bg-white/95 backdrop-blur-xl p-10 shadow-2xl relative z-10">
        {/* Decorative top accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 blur-2xl" />
        
        <div className="space-y-2 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-black text-xl">E</span>
            </div>
          </div>
          <h1 className="text-4xl font-black text-foreground">Welcome Back</h1>
          <p className="text-foreground/60 font-medium leading-relaxed">
            Sign in to your account to continue your health journey
          </p>
        </div>
        
        <LoginForm redirect={params.redirect} />
        
        <div className="space-y-3 border-t border-border pt-6">
          <p className="text-center text-sm text-foreground/60">
            Don't have an account?{' '}
            <Link href="/register" className="font-bold text-primary hover:text-accent transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
