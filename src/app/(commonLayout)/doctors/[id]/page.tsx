'use client';

import { Button } from '@/components/ui/button';
import { Star, MapPin, Phone, Mail, Award, Clock, Users } from 'lucide-react';
import Image from 'next/image';

export default function DoctorDetailPage({ params }: { params: { id: string } }) {
  // Sample doctor data - replace with actual API call
  const doctor = {
    id: params.id,
    name: 'Dr. Sarah Johnson',
    specialty: 'Cardiology',
    experience: '12+ years',
    rating: 4.8,
    reviews: 256,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    bio: 'Highly experienced cardiologist dedicated to providing comprehensive heart care. Specializing in prevention, diagnosis, and treatment of cardiovascular diseases.',
    location: 'Medical Center, 123 Health Lane, Health City',
    phone: '+1 (234) 567-890',
    email: 'dr.sarah@edoctor.com',
    qualification: 'MD, Board Certified in Cardiology',
    languages: ['English', 'Spanish'],
    availableSlots: ['10:00 AM', '11:30 AM', '2:00 PM', '3:30 PM', '4:45 PM'],
  };

  return (
    <div className="relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-background to-background" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-foreground/60 mb-8">
          <a href="/consultation" className="hover:text-primary">Doctors</a>
          <span>/</span>
          <span className="text-foreground">{doctor.name}</span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Doctor Info */}
          <div className="lg:col-span-2 space-y-8">
            {/* Doctor Profile Card */}
            <div className="rounded-3xl border border-border bg-white/90 backdrop-blur-sm p-8 shadow-lg overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-primary/10 rounded-full -mr-20 -mt-20 blur-2xl" />
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10">
                {/* Image */}
                <div className="md:col-span-1">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden ring-4 ring-primary/20">
                    <Image
                      src={doctor.image}
                      alt={doctor.name}
                      width={250}
                      height={250}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="md:col-span-3 space-y-6">
                  <div>
                    <h1 className="text-4xl font-black text-foreground">{doctor.name}</h1>
                    <p className="text-xl text-primary font-bold mt-1">{doctor.specialty}</p>
                  </div>

                  {/* Rating and Stats */}
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-accent/10 px-4 py-3 rounded-xl">
                      <Star className="text-accent fill-current" size={20} />
                      <div>
                        <p className="font-bold text-foreground">{doctor.rating}</p>
                        <p className="text-xs text-foreground/60">({doctor.reviews} reviews)</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-primary/10 px-4 py-3 rounded-xl">
                      <Award className="text-primary" size={20} />
                      <div>
                        <p className="font-bold text-foreground">{doctor.experience}</p>
                        <p className="text-xs text-foreground/60">Experience</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-accent/10 px-4 py-3 rounded-xl">
                      <Users className="text-accent" size={20} />
                      <div>
                        <p className="font-bold text-foreground">95%</p>
                        <p className="text-xs text-foreground/60">Satisfaction</p>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-foreground/70 leading-relaxed font-medium">
                    {doctor.bio}
                  </p>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="rounded-2xl border border-border bg-white/90 backdrop-blur-sm p-8 shadow-lg space-y-6">
              <h2 className="text-2xl font-black text-foreground">About & Qualifications</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Qualification</h3>
                    <p className="text-foreground/70 font-medium">{doctor.qualification}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Languages</h3>
                    <div className="flex gap-2 flex-wrap">
                      {doctor.languages.map((lang) => (
                        <span key={lang} className="px-3 py-1 bg-primary/10 text-primary rounded-full font-semibold text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Contact Information</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Phone className="text-primary" size={18} />
                        <a href={`tel:${doctor.phone}`} className="text-foreground/70 hover:text-primary font-medium">
                          {doctor.phone}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="text-primary" size={18} />
                        <a href={`mailto:${doctor.email}`} className="text-foreground/70 hover:text-primary font-medium">
                          {doctor.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-3">
                        <MapPin className="text-primary" size={18} />
                        <p className="text-foreground/70 font-medium">{doctor.location}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="rounded-2xl border border-border bg-white/90 backdrop-blur-sm p-8 shadow-lg space-y-6">
              <h2 className="text-2xl font-black text-foreground">Patient Reviews</h2>
              
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="p-6 border border-border rounded-xl">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-bold text-foreground">John Doe</h4>
                        <div className="flex gap-1 mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="text-accent fill-current" size={16} />
                          ))}
                        </div>
                      </div>
                      <span className="text-sm text-foreground/60">2 weeks ago</span>
                    </div>
                    <p className="text-foreground/70 font-medium">
                      Excellent doctor! Very professional and thorough. Highly recommend for anyone seeking quality cardiac care.
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-3xl border border-border bg-gradient-to-b from-white/95 to-white/90 backdrop-blur-xl p-8 shadow-xl space-y-6">
              <div className="space-y-2 text-center">
                <h3 className="text-2xl font-black text-foreground">Available Slots</h3>
                <p className="text-sm text-foreground/60 font-medium">Select a time slot</p>
              </div>

              <div>
                <label className="text-sm font-bold text-foreground mb-3 block">
                  <Clock className="inline mr-2" size={16} />
                  Choose Date
                </label>
                <input 
                  type="date" 
                  className="w-full px-4 py-3 rounded-lg border-2 border-primary/20 focus:border-primary focus:outline-none bg-background font-medium"
                />
              </div>

              <div className="space-y-3">
                <p className="text-sm font-bold text-foreground">Time Slots</p>
                <div className="grid grid-cols-2 gap-3">
                  {doctor.availableSlots.map((slot) => (
                    <button
                      key={slot}
                      className="py-3 px-3 rounded-lg border-2 border-primary/20 hover:border-primary hover:bg-primary/5 font-semibold text-sm transition-all duration-300"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <Button size="lg" className="w-full rounded-xl py-6 text-lg font-bold shadow-lg hover:shadow-xl bg-gradient-to-r from-primary to-accent">
                Book Appointment
              </Button>

              <p className="text-xs text-center text-foreground/60 font-medium">
                Consultation fee: <span className="font-bold text-foreground">$50</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
