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
    <div className="w-full relative">
      {/* Gradient Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #f8f9fa 0%, #eff0f5 50%, #e8eaf6 100%)",
        }}
      />
      {/* Content Container */}
      <div className="w-full px-4 py-16 md:py-24 lg:py-32 relative">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column - Hero Content */}
            <div className="flex flex-col justify-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 self-start rounded-full bg-primary/10 px-4 py-2 w-fit">
                <SparkleIcon />
                <span className="text-sm font-semibold text-primary">
                  {badge.text}
                </span>
              </div>

              {/* Heading */}
              <div className="space-y-3">
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance text-foreground">
                  {heading.line1}
                </h1>
                <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  {heading.line2}
                </h1>
              </div>

              {/* Description */}
              <div className="space-y-2 max-w-lg">
                {description.map((line, index) => (
                  <p key={index} className="text-lg leading-relaxed text-muted-foreground">
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
              <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl border border-border">
                {/* Card Header */}
                <div className="mb-8 flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-foreground">{formCard.title}</h2>
                  <LargeSparkleIcon />
                </div>

                {/* Form */}
                <form className="space-y-6">
                  {/* Symptoms Input */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="symptoms"
                      className="text-sm font-semibold text-foreground"
                    >
                      {formCard.symptomLabel}
                    </Label>
                    <Input
                      id="symptoms"
                      name="symptoms"
                      placeholder={formCard.symptomPlaceholder}
                      className="h-12 rounded-lg text-base"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="h-12 w-full rounded-lg text-base font-semibold shadow-md hover:shadow-lg transition-all"
                  >
                    {formCard.submitText}
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-8 border-t border-border pt-6">
                  <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    {formCard.footerText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
