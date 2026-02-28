import DoctorAppointmentsTable from "@/components/modules/Doctor/DoctorAppointments/DoctorAppointmentTable";
import VideoCall from "@/components/modules/videoCall/VideoCallClient";
import { getMyAppointments } from "@/services/patient/appointment.service";
import { IAppointment } from "@/types/appointments.interface";
import { Suspense } from "react";

async function AppointmentsContent() {
  const response = await getMyAppointments();
  const appointments: IAppointment[] = response?.data || [];
  

  return <DoctorAppointmentsTable appointments={appointments} />;
}

export default async function DoctorAppointmentsPage() {

  const appointId ="1b5587a7-3b96-49c8-9a30-09d2d7b5162a"
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
        <p className="text-muted-foreground mt-2">
          Manage your patient appointments and prescriptions
        </p>
        <VideoCall appointmentId={appointId} />
      </div>

      <Suspense fallback={<div>Loading appointments...</div>}>
        <AppointmentsContent />
      </Suspense>
    </div>
  );
}
