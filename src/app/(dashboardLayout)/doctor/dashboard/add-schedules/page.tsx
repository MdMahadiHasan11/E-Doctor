import AddSchedulesFilters from "@/components/modules/Doctor/add-schedules/AddScheduleFilter";
import AddScheduleHeader from "@/components/modules/Doctor/add-schedules/AddScheduleHeader";
import BookSchedulePage from "@/components/modules/Doctor/add-schedules/AddSchedulesContent";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getDoctorSchedules } from "@/services/schedule/ScheduleServices";
// import { getDoctorSchedules } from "@/services/admin/schedulesManagement";
import { Suspense } from "react";

interface DoctorMySchedulesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}

const DoctorAddSchedulesPage = async ({
  searchParams,
}: DoctorMySchedulesPageProps) => {
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  const availableSchedulesResponse = await getDoctorSchedules(queryString);
  return (
    <div className="space-y-6">
      <AddScheduleHeader />

      <AddSchedulesFilters />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
      <BookSchedulePage availableSchedules={availableSchedulesResponse?.data} />;
        <TablePagination meta={availableSchedulesResponse?.meta} />
      </Suspense>
    </div>
  );
};

export default DoctorAddSchedulesPage;
