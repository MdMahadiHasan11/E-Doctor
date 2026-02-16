import AIDoctorSuggestion from "@/components/modules/Consultation/AIDoctorSuggestion";
import DoctorGrid from "@/components/modules/Consultation/DoctorGrid";
import DoctorSearchFilters from "@/components/modules/Consultation/DoctorSearchFilter";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctors } from "@/services/admin/doctorManagement";
import { getSpecialities } from "@/services/admin/specialitiesManagement";
import { Suspense } from "react";

// ISR: Revalidate every 10 minutes for doctor listings
export const revalidate = 600;

const ConsultationPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const searchParamsObj = await searchParams;
  const queryString = queryStringFormatter(searchParamsObj);

  // Fetch doctors and specialties in parallel
  const [doctorsResponse, specialtiesResponse] = await Promise.all([
    getDoctors(queryString),
    getSpecialities(),
  ]);

  const doctors = doctorsResponse?.data || [];
  const specialties = specialtiesResponse?.data || [];

  return (
    <div className="relative">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="space-y-8">
          {/* Premium Header Section */}
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-black text-foreground">Find Your Perfect Doctor</h1>
            <p className="text-lg text-foreground/70 font-medium leading-relaxed">
              Search and book appointments with our qualified healthcare professionals tailored to your needs
            </p>
          </div>

          {/* AI Doctor Suggestion */}
          <div className="py-4">
            <AIDoctorSuggestion />
          </div>

          {/* Filters with enhanced styling */}
          <div className="rounded-2xl border border-border bg-white/80 backdrop-blur-sm p-8 shadow-lg">
            <DoctorSearchFilters specialties={specialties} />
          </div>

          {/* Doctor Grid */}
          <div>
            <Suspense fallback={<TableSkeleton columns={3} />}>
              <DoctorGrid doctors={doctors} />
            </Suspense>
          </div>

          {/* Pagination */}
          <div className="pt-4">
            <TablePagination
              currentPage={doctorsResponse?.meta?.page || 1}
              totalPages={doctorsResponse?.meta?.totalPage || 1}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationPage;
