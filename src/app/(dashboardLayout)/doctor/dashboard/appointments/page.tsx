import AddSchedulesFilters from "@/components/modules/Doctor/add-schedules/AddScheduleFilter";
import DoctorAppointmentsTable from "@/components/modules/Doctor/DoctorAppointments/DoctorAppointmentTable";
import TablePagination from "@/components/shared/TablePagination";
import { TableSkeleton } from "@/components/shared/TableSkeleton";
import { queryStringFormatter } from "@/lib/formatters";
import { getMyAppointments } from "@/services/patient/appointment.service";
import { IAppointment } from "@/types/appointments.interface";
import { Suspense } from "react";
interface DoctorAppointmentPageProps {
  searchParams: Promise<{
    page?: string;
    limit?: string;
    isBooked?: string;
  }>;
}

async function AppointmentsContent({ queryString }: { queryString?: string }) {
  const response = await getMyAppointments(queryString);
  const appointments: IAppointment[] = response?.data || [];
  console.log({ response });
  return (
    <div className="space-y-6">
      <DoctorAppointmentsTable appointments={appointments} />
      <TablePagination meta={response?.meta} />
    </div>
  );
}

const DoctorAppointmentsPage = async ({
  searchParams,
}: DoctorAppointmentPageProps) => {
  const params = await searchParams;
  const queryString = queryStringFormatter(params);
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground mt-2">
          Manage your patient appointments and prescriptions
        </p>
      </div>
      <AddSchedulesFilters />
      <Suspense fallback={<TableSkeleton columns={5} rows={10} />}>
        <AppointmentsContent queryString={queryString} />
      </Suspense>
    </div>
  );
};

export default DoctorAppointmentsPage;
