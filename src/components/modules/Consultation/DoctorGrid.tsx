import { IDoctor } from "@/types/doctor.interface";
import DoctorCard from "./DoctorCard";

interface DoctorGridProps {
  doctors: IDoctor[];
}

export default function DoctorGrid({ doctors }: DoctorGridProps) {
  if (doctors.length === 0) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/40 p-12 text-center">
        <h3 className="text-lg font-medium text-muted-foreground">
          No doctors found matching your criteria
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Try adjusting your search term, specialty, or gender filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} />
      ))}
    </div>
  );
}