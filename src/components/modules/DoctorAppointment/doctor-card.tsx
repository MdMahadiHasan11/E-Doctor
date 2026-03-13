import Image from 'next/image';
import { Star, MapPin, Phone, Mail, Award, Briefcase, Calendar } from 'lucide-react';

interface DoctorCardProps {
  doctor: {
    name: string;
    profilePhoto: string;
    designation: string;
    currentWorkingPlace: string;
    qualification: string;
    experience: number;
    specialties?: Array<{ title: string; icon?: string }>;
    doctorSpecialties: Array<{
      specialities: {
        title: string;
        icon: string;
      };
    }>;
    appointmentFee: number;
    contactNumber: string;
    email: string;
    address: string;
    registrationNumber: string;
    averageRating: number;
  };
}

export default function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <div className="sticky top-8 space-y-6">
      {/* Main Card */}
      <div className="overflow-hidden rounded-2xl bg-card shadow-2xl">
        {/* Header Background */}
        <div className="h-32 bg-linear-to-r from-primary/20 to-accent/20" />

        {/* Content */}
        <div className="px-6 pb-8">
          {/* Profile Photo */}
          <div className="-mt-16 mb-6 flex justify-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-full border-4 border-card bg-primary/10 shadow-lg">
              <Image
                src={doctor.profilePhoto}
                alt={doctor.name}
                fill
                className="object-cover"
                loading="eager"
                priority
              />
            </div>
          </div>

          {/* Name and Designation */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-foreground">{doctor.name}</h1>
            <p className="mt-2 text-lg font-semibold text-primary">
              {doctor.designation}
            </p>
            <p className="text-sm text-muted-foreground">{doctor.currentWorkingPlace}</p>
          </div>

          {/* Rating */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i === 0 ? 'fill-muted text-muted' : 'text-muted'}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(No ratings yet)</span>
          </div>

          {/* Specialties */}
          {doctor.doctorSpecialties.length > 0 && (
            <div className="mt-6 border-t border-border pt-6">
              <h3 className="mb-3 font-semibold text-foreground">Specialties</h3>
              <div className="flex flex-wrap gap-2">
                {doctor.doctorSpecialties.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 rounded-full bg-secondary px-4 py-2"
                  >
                    {spec.specialities.icon && (
                      <div className="relative h-5 w-5">
                        <Image
                          src={spec.specialities.icon}
                          alt={spec.specialities.title}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                    <span className="text-sm font-medium text-secondary-foreground">
                      {spec.specialities.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Qualifications */}
          <div className="mt-6 border-t border-border pt-6 space-y-3">
            <div className="flex items-start gap-3">
              <Award size={20} className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Qualification</p>
                <p className="font-semibold text-foreground">{doctor.qualification}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Briefcase size={20} className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">Experience</p>
                <p className="font-semibold text-foreground">{doctor.experience} Years</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar size={20} className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Appointment Fee
                </p>
                <p className="text-2xl font-bold text-accent">৳{doctor.appointmentFee}</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-6 border-t border-border pt-6 space-y-2">
            <h3 className="font-semibold text-foreground">Contact Information</h3>

            <div className="flex items-center gap-3">
              <Phone size={18} className="text-primary" />
              <a href={`tel:${doctor.contactNumber}`} className="text-sm hover:text-primary">
                {doctor.contactNumber}
              </a>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-primary" />
              <a href={`mailto:${doctor.email}`} className="truncate text-sm hover:text-primary">
                {doctor.email}
              </a>
            </div>

            <div className="flex items-start gap-3">
              <MapPin size={18} className="mt-0.5 shrink-0 text-primary" />
              <p className="text-sm">{doctor.address}</p>
            </div>

            <div className="flex items-center gap-3">
              <Award size={18} className="text-primary" />
              <p className="text-sm">Reg: {doctor.registrationNumber}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
