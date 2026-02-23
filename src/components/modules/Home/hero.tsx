"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAIDoctorSuggestion } from "@/services/ai/ai.service";
import { AISuggestedDoctor } from "@/types/ai.interface";
import { HeroProps } from "@/types/heroProps";
import {
  Award,
  Briefcase,
  DollarSign,
  Loader2,
  Search,
  Sparkles,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

export function Hero({
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
      href: "/consultation",
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
  const [symptoms, setSymptoms] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestedDoctors, setSuggestedDoctors] = useState<AISuggestedDoctor[]>(
    [],
  );
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!symptoms.trim() || symptoms.trim().length < 5) {
      toast.error("Please describe your symptoms (min 5 characters)");
      return;
    }

    setIsLoading(true);
    setSuggestedDoctors([]);
    setShowResults(false);

    try {
      const response = await getAIDoctorSuggestion(symptoms);
      if (response.success && response.data) {
        const doctors = Array.isArray(response.data)
          ? response.data
          : [response.data];
        setSuggestedDoctors(doctors);
        setShowResults(true);
        toast.success("Found AI recommendations!");
      } else {
        toast.error(response.message || "Failed to get suggestions");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full relative overflow-hidden">
      {/* Background – unchanged */}
      <div className="absolute inset-0 z-0">
        <Image
          fill
          src="/hero.avif"
          alt="Medical background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/85 to-background/60" />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-transparent to-background/50" />
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              "radial-gradient(circle at 20% 50%, rgba(147, 51, 234, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="w-full px-4 py-12 relative">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left side – unchanged */}
            <div className="flex flex-col justify-center space-y-8">
              <div className="space-y-4">
                <h1 className="md:text-5xl font-black leading-tight text-balance text-foreground">
                  {heading.line1}
                </h1>
                <h1 className="md:text-6xl font-black leading-tight text-balance bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  {heading.line2}
                </h1>
              </div>

              <div className="space-y-2 max-w-lg">
                {description.map((line, i) => (
                  <p
                    key={i}
                    className="text-lg leading-relaxed text-foreground/90 font-medium"
                  >
                    {line}
                  </p>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-max">
                {buttons.primary && (
                  <Link href={buttons.primary.href ?? "/consultation"}>
                    <Button className="h-14 gap-2 rounded-sm px-8 text-base font-semibold hover:shadow-xl transition-all">
                      <Search className="size-5" />
                      {buttons.primary.text}
                    </Button>
                  </Link>
                )}
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                {stats.map((stat, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <p className="text-3xl font-bold text-foreground">
                        {stat.value}
                      </p>
                      {stat.icon}
                    </div>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right side – Form + Results (compact + max 2 visible) */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="w-full max-w-md rounded-sm bg-white/95 backdrop-blur-xl p-4 shadow-2xl border border-white/50 hover:shadow-3xl transition-all duration-300 relative overflow-hidden">
                {/* Decorative blobs – smaller */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-primary/20 to-accent/20 rounded-full -mr-16 -mt-16 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-28 h-28 bg-linear-to-tr from-primary/10 to-transparent rounded-full -ml-14 -mb-14 blur-3xl" />

                <div className="relative z-10 space-y-2">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-black text-foreground">
                      {formCard.title}
                    </h2>
                    {/* <LargeSparkleIcon className="h-7 w-7" /> */}
                  </div>

                  <div className="space-y-3">
                    {/* Symptoms input – slightly smaller */}
                    <div className="space-y-2.5">
                      <Label
                        htmlFor="symptoms"
                        className="text-base font-bold text-foreground"
                      >
                        {formCard.symptomLabel}
                      </Label>
                      <Input
                        id="symptoms"
                        value={symptoms}
                        onChange={(e) => setSymptoms(e.target.value)}
                        placeholder={formCard.symptomPlaceholder}
                        className="h-12 text-base bg-white/80 border-2 border-primary/30 focus:border-primary   shadow-sm"
                        disabled={isLoading}
                      />
                    </div>

                    {/* Submit button – slightly smaller */}
                    <Button
                      onClick={handleSearch}
                      disabled={isLoading || symptoms.trim().length < 5}
                      className="h-12 w-full text-base font-bold bg-linear-to-r from-primary to-accent hover:opacity-90 transition-all shadow-md hover:shadow-xl"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Analyzing...
                        </>
                      ) : (
                        formCard.submitText
                      )}
                    </Button>

                    {/* Results – compact + max 2 visible + scroll */}
                    {showResults && (
                      <div className="space-y-2 pt-3">
                        {suggestedDoctors.length > 0 ? (
                          <>
                            {/* Header stays visible */}
                            <div className="flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-sm py-2 z-10 -mx-1 px-1">
                              <Badge className="bg-primary/10 text-primary border-primary/30 text-xs">
                                <Sparkles className="h-3 w-3 mr-1.5" />
                                AI Recommendations ({suggestedDoctors.length})
                              </Badge>
                              <p className="text-xs text-muted-foreground">
                                Based on symptoms
                              </p>
                            </div>

                            {/* Scrollable container – only ~2 cards visible at once */}
                            <div className="max-h-65 overflow-y-auto pr-1 -mr-1 scroll-smooth">
                              <div className="space-y-2">
                                {suggestedDoctors.map((doc, idx) => (
                                  <div
                                    key={doc.id || idx}
                                    className="p-3 bg-white/75 rounded-sm border border-primary/20 hover:border-primary/40 hover:shadow transition-all duration-150 text-sm"
                                  >
                                    <div className="flex gap-3">
                                      {/* Smaller avatar */}
                                      <div className="shrink-0">
                                        {doc.profilePhoto ? (
                                          <Image
                                            src={doc.profilePhoto}
                                            alt={doc.name}
                                            width={48}
                                            height={48}
                                            className="w-12 h-12 rounded-full object-cover border-2 border-primary/30"
                                          />
                                        ) : (
                                          <div className="w-12 h-12 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center text-primary font-semibold text-lg">
                                            {doc.name
                                              ?.slice(0, 2)
                                              .toUpperCase() || "DR"}
                                          </div>
                                        )}
                                      </div>

                                      <div className="flex-1 space-y-2">
                                        <div className="flex items-center gap-1.5 flex-wrap">
                                          <h4 className="font-semibold leading-tight">
                                            {doc.name || "—"}
                                          </h4>
                                          {doc.averageRating > 0 && (
                                            <div className="flex items-center gap-1 text-amber-600 text-xs">
                                              <Star className="h-3.5 w-3.5 fill-amber-500" />
                                              {doc.averageRating.toFixed(1)}
                                            </div>
                                          )}
                                        </div>

                                        {doc.designation && (
                                          <p className="text-xs text-muted-foreground leading-tight">
                                            {doc.designation}
                                          </p>
                                        )}

                                        {doc.specialties?.length > 0 && (
                                          <div className="flex flex-wrap gap-1 mt-1">
                                            {doc.specialties.slice(0, 3).map(
                                              (
                                                s,
                                                i, // limit shown specialties
                                              ) => (
                                                <Badge
                                                  key={i}
                                                  variant="outline"
                                                  className="text-[10px] px-1.5 py-0 bg-primary/5 border-primary/30"
                                                >
                                                  {s}
                                                </Badge>
                                              ),
                                            )}
                                            {doc.specialties.length > 3 && (
                                              <Badge
                                                variant="outline"
                                                className="text-[10px] px-1.5 py-0"
                                              >
                                                +{doc.specialties.length - 3}
                                              </Badge>
                                            )}
                                          </div>
                                        )}

                                        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mt-1.5">
                                          {doc.experience > 0 && (
                                            <div className="flex items-center gap-1">
                                              <Briefcase className="h-3 w-3" />
                                              {doc.experience} yrs
                                            </div>
                                          )}
                                          {doc.qualification && (
                                            <div className="flex items-center gap-1">
                                              <Award className="h-3 w-3" />
                                              {doc.qualification
                                                .split(" ")
                                                .slice(-2)
                                                .join(" ")}
                                            </div>
                                          )}
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-primary/10 mt-2">
                                          <div className="flex items-center gap-1.5 text-green-700 font-medium text-sm">
                                            <DollarSign className="h-3.5 w-3.5" />
                                            ৳{doc.appointmentFee}
                                          </div>
                                          <Link
                                            href={`/consultation/doctor/${doc.id}`}
                                          >
                                            <Button
                                              size="sm"
                                              variant="outline"
                                              className="h-8 text-xs px-3"
                                            >
                                              View
                                            </Button>
                                          </Link>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </>
                        ) : (
                          <div className="p-5 bg-amber-50/60 rounded-lg text-center border border-amber-200/50 text-sm">
                            <p className="text-amber-800 font-medium">
                              No matching doctors found
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Try describing symptoms differently
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Footer – smaller text */}
                  <div className="pt-1 border-t border-primary/10">
                    <p className="text-center text-xs text-foreground/70 font-medium">
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
