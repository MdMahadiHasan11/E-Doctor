'use client';

import { Button } from '@/components/ui/button';
import { Check, Clock, Award, Zap } from 'lucide-react';

const CTASection = () => {
  const benefits = [
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Connect with doctors anytime, anywhere for your medical needs'
    },
    {
      icon: Award,
      title: 'Verified Experts',
      description: 'All doctors are certified and verified healthcare professionals'
    },
    {
      icon: Zap,
      title: 'Quick Booking',
      description: 'Schedule appointments in minutes with instant confirmation'
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-40 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl opacity-40 animate-pulse" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full bg-primary/20 text-primary font-bold text-sm">
                Your Health Matters
              </span>
              <h2 className="text-5xl lg:text-6xl font-black text-foreground leading-tight">
                Start Your Health Journey Today
              </h2>
              <p className="text-xl text-foreground/70 font-medium leading-relaxed">
                Get access to top medical experts, schedule appointments instantly, and take control of your health with our comprehensive healthcare platform.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="rounded-xl px-8 py-6 text-lg font-bold shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-accent">
                Book an Appointment
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl px-8 py-6 text-lg font-bold border-2 hover:bg-primary/10">
                Explore Doctors
              </Button>
            </div>
          </div>

          {/* Right - Benefits Grid */}
          <div className="grid grid-cols-1 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group p-6 rounded-2xl bg-white/80 backdrop-blur-sm hover:bg-white shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-white/50"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="text-primary" size={28} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                        {benefit.title}
                      </h3>
                      <p className="text-foreground/60 text-sm leading-relaxed mt-1 font-medium">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-12 border-t border-border">
          <div className="text-center group">
            <div className="text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
              10K+
            </div>
            <p className="text-foreground/70 font-semibold">Happy Patients</p>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-black text-accent mb-2 group-hover:scale-110 transition-transform">
              500+
            </div>
            <p className="text-foreground/70 font-semibold">Expert Doctors</p>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-black text-primary mb-2 group-hover:scale-110 transition-transform">
              95%
            </div>
            <p className="text-foreground/70 font-semibold">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
