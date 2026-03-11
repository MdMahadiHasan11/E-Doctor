
import MySchedulesFilters from "@/components/modules/Doctor/MySchedules/MyScheduleFilters";
import MySchedulesHeader from "@/components/modules/Doctor/MySchedules/MyScheduleHeader";
import MySchedulesTable from "@/components/modules/Doctor/MySchedules/MyScheduleTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import {
  getAvailableSchedules,
  getDoctorOwnSchedules,
} from "@/services/doctor/doctorScedule.services";
import { Suspense } from "react";

interface DoctorMySchedulesPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}

const DoctorMySchedulesPage = async ({
  searchParams,
}: DoctorMySchedulesPageProps) => {
  const params = await searchParams;

  const queryString = queryStringFormatter(params);
  const myDoctorsScheduleResponse = await getDoctorOwnSchedules(queryString);
  const availableSchedulesResponse = await getAvailableSchedules();

  console.log({
    myDoctorsScheduleResponse,
    availableSchedulesResponse,
  });

  const schedules = myDoctorsScheduleResponse?.data || [];
  return (
    <div className="space-y-6">
      <MySchedulesHeader
        availableSchedules={availableSchedulesResponse?.data || []}
      />

      <MySchedulesFilters />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <MySchedulesTable schedules={schedules} />
        <TablePagination
          meta={myDoctorsScheduleResponse?.meta}
        />
      </Suspense>
    </div>
  );
};

export default DoctorMySchedulesPage;
