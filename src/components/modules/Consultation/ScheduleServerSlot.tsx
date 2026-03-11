// import { getDoctorSchedules, ScheduleResponse } from "@/services/doctor/scheduleService";
import { getDoctorSchedules, ScheduleResponse } from "@/services/schedule/ScheduleServices";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import ScheduleSlotsList from "./ScheduleSlotList";

interface ScheduleSlotsServerProps {
  doctorId: string;
  startDate: string;
  endDate: string;
  page?: number;
  onPageChange?: (page: number) => void;
}

export default async function ScheduleSlotsServer({
  doctorId,
  startDate,
  endDate,
  page = 1,
}: ScheduleSlotsServerProps) {

  const scheduleData = await getDoctorSchedules({
    id: doctorId,
    startDate,
    endDate,
    page,
    isBooked: false,
  });

  const slots = scheduleData?.data?.data ?? [];
  const meta = scheduleData?.data?.meta ?? {
    total: 0,
    page: 1,
    limit: 10,
  };

  if (!slots.length) {
    return (
      <div className="text-center py-10">
        <Calendar className="mx-auto h-10 w-10 text-muted-foreground" />
        <p className="text-sm mt-2 text-muted-foreground">
          No available slots
        </p>
      </div>
    );
  }

  return (
    <div>
      <p>Hello</p>
      {/* <ScheduleSlotsList
      slots={slots}
      meta={meta}
      doctorId={doctorId}
      page={page}
    /> */}
    </div>
  );
}
