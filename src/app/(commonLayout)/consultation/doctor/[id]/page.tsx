/* eslint-disable @typescript-eslint/no-explicit-any */
// import DoctorDetailPage from "./page-old";

import DoctorDetailsPage from "@/components/modules/DoctorAppointment/DoctorAppointmentDetails";
import { queryStringFormatter } from "@/lib/formatters";
// import DoctorDetailPage from "./page-old";
import {
  getAllSchedulesDate,
  getAllSlotByDate,
} from "@/services/schedule/ScheduleServices";
import { notFound } from "next/navigation";
export interface Slot {
  doctorId: string
  scheduleId: string
  isBooked: boolean
  appointmentId: any
  createdAt: string
  updatedAt: string
  schedule: Schedule
}

export interface Schedule {
  id: string
  startDateTime: string
  endDateTime: string
}
const DoctorAppointmentPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{
    date?: string;
  }>;
}) => {
  const { id } = await params;
  const dateParams = await searchParams;
  const queryString = queryStringFormatter(dateParams);

  const allSlots = await getAllSlotByDate(id, queryString);
if (!allSlots?.success || !allSlots?.data) {
    notFound();
  }
  const response = await getAllSchedulesDate(id);
  if (!response?.success || !response?.data) {
    notFound();
  }
  const scheduleDate: string[] = response.data;
  const allSlotData :Slot[]  = allSlots.data;

  return (
    <div>
      {/* <DoctorDetailPage params={params} />
      <p>consultation page</p> */}
      <DoctorDetailsPage scheduleDate={scheduleDate} allSlotData={allSlotData || []} />
    </div>
  ); 
};

export default DoctorAppointmentPage;
