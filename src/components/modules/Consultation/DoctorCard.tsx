"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getInitials } from "@/lib/formatters";
import { IDoctor } from "@/types/doctor.interface";
import { Clock, DollarSign, Eye, MapPin, Star } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import BookAppointmentDialogNew from "./BookAppointmentDialog";
// import BookAppointmentDialogNew from "./BookAppointmentDialogNew";

interface DoctorCardNewProps {
  doctor: IDoctor;
}

export default function DoctorCardNew({ doctor }: DoctorCardNewProps) {
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  return (
    <>
      <Card className="overflow-hidden border-border hover:shadow-lg hover:border-primary/40 transition-all duration-300 group h-full flex flex-col">
        {/* Header with Avatar */}
        <CardHeader className="pb-4 pt-6 px-6 bg-linear-to-br from-primary/10 via-primary/5 to-transparent">
          <div className="flex items-start gap-4">
            <Avatar className="h-20 w-20 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all shrink-0">
              <AvatarImage src={doctor.profilePhoto || ""} alt={doctor.name} />
              <AvatarFallback className="text-lg font-semibold bg-primary text-primary-foreground">
                {getInitials(doctor.name)}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 min-w-0 pt-1">
              <CardTitle className="text-lg font-bold text-foreground">
                Dr. {doctor.name}
              </CardTitle>
              <CardDescription className="text-sm mt-1 font-medium">
                {doctor.designation}
              </CardDescription>

              <div className="flex items-center gap-2 mt-3 flex-wrap">
                <div className="flex items-center gap-1.5 bg-primary/15 rounded-full px-2.5 py-1 border border-primary/20">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="text-xs font-bold text-foreground">
                    {doctor.averageRating?.toFixed(1) || "N/A"}
                  </span>
                </div>
                {doctor.doctorSpecialties &&
                  doctor.doctorSpecialties.length > 0 && (
                    <Badge variant="outline" className="text-xs font-medium">
                      {doctor.doctorSpecialties[0].specialities?.title}
                    </Badge>
                  )}
              </div>
            </div>
          </div>
        </CardHeader>

        {/* Content */}
        <CardContent className="space-y-4 px-6 pb-4 flex-1">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-linear-to-br from-blue-50 to-blue-50/50 dark:from-blue-950/30 dark:to-blue-950/10 p-3 border border-blue-100 dark:border-blue-900/20">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <p className="text-xs text-muted-foreground font-medium">
                  Experience
                </p>
              </div>
              <p className="text-sm font-bold text-foreground">
                {doctor.experience}{" "}
                <span className="font-normal text-muted-foreground">yrs</span>
              </p>
            </div>
            <div className="rounded-lg bg-linear-to-br from-primary/10 to-primary/5 p-3 border border-primary/20">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-primary shrink-0" />
                <p className="text-xs text-muted-foreground font-medium">Fee</p>
              </div>
              <p className="text-sm font-bold text-foreground">
                ${doctor.appointmentFee}
              </p>
            </div>
          </div>

          {doctor.currentWorkingPlace && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border/50">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5 text-muted-foreground" />
              <span className="text-xs text-muted-foreground line-clamp-2 leading-snug">
                {doctor.currentWorkingPlace}
              </span>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">
              Qualification
            </p>
            <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
              {doctor.qualification}
            </p>
          </div>

          {doctor.doctorSpecialties && doctor.doctorSpecialties.length > 1 && (
            <div className="space-y-2">
              <p className="text-xs font-bold text-foreground uppercase tracking-wide">
                Specialties
              </p>
              <div className="flex flex-wrap gap-1.5">
                {doctor.doctorSpecialties.slice(1, 3).map((specialty) => (
                  <Badge
                    key={specialty.specialitiesId}
                    variant="secondary"
                    className="text-xs font-medium"
                  >
                    {specialty.specialities?.title}
                  </Badge>
                ))}
                {doctor.doctorSpecialties.length > 3 && (
                  <Badge variant="outline" className="text-xs font-medium">
                    +{doctor.doctorSpecialties.length - 3}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardContent>

        {/* Footer Actions */}
        <CardFooter className="gap-2.5 border-t border-border px-6 py-4 bg-muted/30">
          <Link className="flex-1" href={`/consultation/doctor/${doctor.id}`}>
            <Button variant="outline" className="w-full h-9" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Profile
            </Button>
          </Link>
          <Button
            onClick={() => setShowScheduleModal(true)}
            className="flex-1 h-9 font-semibold"
            size="sm"
          >
            Book Now
          </Button>
        </CardFooter>
      </Card>

      {showScheduleModal && (
        <BookAppointmentDialogNew
          doctor={doctor}
          isOpen={showScheduleModal}
          onClose={() => setShowScheduleModal(false)}
        />
      )}
    </>
  );
}
