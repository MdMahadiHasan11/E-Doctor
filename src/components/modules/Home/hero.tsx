import { Search, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HeroProps } from "@/types/heroProps";
import { LargeSparkleIcon, SparkleIcon } from "@/assets/icons/SparkleIcon";



export function Hero({
  badge = {
    text: "AI-Powered Healthcare",
  },
  heading = {
    line1: "Find Your Perfect",
    line2: "Doctor with AI",
  },
  description = [
    "Our advanced AI technology analyzes your symptoms, medical",
    "history, and preferences to match you with the best-fit doctors",
    "in seconds.",
  ],
  buttons = {
    primary: {
      text: "Find Your Doctor",
    },
    secondary: {
      text: "Book Appointment",
    },
  },
  stats = [
    { value: "50K+", label: "Patients Served" },
    { value: "1000+", label: "Expert Doctors" },
    {
      value: "4.9",
      label: "Patient Rating",
      icon: <Star className="size-6 fill-yellow-400 stroke-yellow-400" />,
    },
  ],
  formCard = {
    title: "AI Doctor Finder",
    symptomLabel: "What are your symptoms?",
    symptomPlaceholder: "e.g., headache, fever, cough",
    specialtyLabel: "Preferred specialty",
    specialtyOptions: [
      "General Physician",
      "Cardiologist",
      "Dermatologist",
      "Pediatrician",
      "Orthopedic",
    ],
    defaultSpecialty: "General Physician",
    submitText: "Get AI Recommendations",
    footerText:
      "✨ Powered by advanced AI algorithms for accurate doctor matching",
  },
}: HeroProps) {
  //   const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //     e.preventDefault();
  //     const formData = new FormData(e.currentTarget);
  //     const data = {
  //       symptoms: formData.get('symptoms') as string,
  //       specialty: formData.get('specialty') as string,
  //     };
  //     formCard.onSubmit?.(data);
  //   };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Video/Image Background with Overlays */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpg"
          alt="Medical background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/85 to-background/60" />
        {/* Secondary overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-transparent to-background/50" />
        {/* Animated gradient accent */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            background: "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
          }}
        />
      </div>
      {/* Content Container */}
      <div className="w-full px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Badge with enhanced styling */}
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 w-fit border border-primary/30 backdrop-blur-sm">
                <SparkleIcon />
                <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {badge.text}
                </span>
              </div>

              {/* Heading with premium styling */}
              <div className="space-y-4">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-balance text-foreground drop-shadow-lg">
                  {heading.line1}
                </h1>
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-black leading-tight text-balance bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent drop-shadow-lg">
                  {heading.line2}
                </h1>
              </div>

              {/* Description with better contrast */}
              <div className="space-y-2 max-w-lg">
                {description.map((line, index) => (
                  <p key={index} className="text-lg leading-relaxed text-foreground font-medium">
                    {line}
                  </p>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row pt-2">
                {buttons.primary && (
                  <Button
                    onClick={buttons.primary.onClick}
                    className="h-14 gap-2 rounded-lg px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all"
                  >
                    <Search className="size-5" />
                    {buttons.primary.text}
                  </Button>
                )}
                {buttons.secondary && (
                  <Button
                    onClick={buttons.secondary.onClick}
                    variant="outline"
                    className="h-14 gap-2 rounded-lg px-8 text-base font-semibold"
                  >
                    <Calendar className="size-5" />
                    {buttons.secondary.text}
                  </Button>
                )}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {stats.map((stat, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                      {stat.icon}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Form Card */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-3xl bg-white/95 backdrop-blur-xl p-10 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300 overflow-hidden relative">
                {/* Decorative gradient background */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full -mr-20 -mt-20 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-primary/10 to-transparent rounded-full -ml-16 -mb-16 blur-3xl" />
                
                <div className="relative z-10">
                  {/* Card Header */}
                  <div className="mb-8 flex items-center justify-between">
                    <h2 className="text-3xl font-black text-foreground">{formCard.title}</h2>
                    <LargeSparkleIcon />
                  </div>

                  {/* Form */}
                  <form className="space-y-6">
                    {/* Symptoms Input */}
                    <div className="space-y-3">
                      <Label
                        htmlFor="symptoms"
                        className="text-sm font-bold text-foreground block"
                      >
                        {formCard.symptomLabel}
                      </Label>
                      <Input
                        id="symptoms"
                        name="symptoms"
                        placeholder={formCard.symptomPlaceholder}
                        className="h-14 rounded-xl text-base bg-white/80 border-2 border-primary/20 focus:border-primary focus:bg-white shadow-sm hover:shadow-md transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <Button
                      type="submit"
                      className="h-14 w-full rounded-xl text-base font-bold shadow-lg hover:shadow-xl transition-all bg-gradient-to-r from-primary to-accent hover:opacity-90"
                    >
                      {formCard.submitText}
                    </Button>
                  </form>

                  {/* Footer */}
                  <div className="mt-8 border-t border-primary/10 pt-6">
                    <p className="text-center text-sm leading-relaxed text-foreground/70 font-medium">
                      {formCard.footerText}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
