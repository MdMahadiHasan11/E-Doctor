
import MySchedulesFilters from "@/components/modules/Doctor/MySchedules/MyScheduleFilters";
// import MySchedulesHeader from "@/components/modules/Doctor/MySchedules/MyScheduleHeader";
import MySchedulesTable from "@/components/modules/Doctor/MySchedules/MyScheduleTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
// import { queryStringFormatter } from "@/lib/formatters";
// import { getSchedules } from "@/services/admin/schedulesManagement";
import {
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


  return (
    <div className="space-y-6">
      {/* <MySchedulesHeader
        availableSchedules={availableSchedulesResponse}
      /> */}
       <div>
        <h1 className="text-3xl font-bold tracking-tight">My Schedules</h1>
        <p className="text-muted-foreground mt-2">
          Manage your patient schedule and prescriptions
        </p>
      </div>

      <MySchedulesFilters />

      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <MySchedulesTable schedules={myDoctorsScheduleResponse?.data} />
        <TablePagination
          meta={myDoctorsScheduleResponse?.meta}
        />
      </Suspense>
    </div>
  );
};

export default DoctorMySchedulesPage;
