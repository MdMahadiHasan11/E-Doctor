"use client";

import { Column } from "@/components/shared/ManagementTable";
import { Badge } from "@/components/ui/badge";
import { IDoctorSchedule } from "@/types/schedule.interface";
import { format, isBefore } from "date-fns";

const isPastSchedule = (schedule: IDoctorSchedule) => {
  const startTime = schedule?.schedule?.startDateTime;

  if (!startTime) return false;

  return isBefore(new Date(startTime), new Date());
};

export const myScheduleColumns: Column<IDoctorSchedule>[] = [
  {
    header: "Date",
    accessor: (schedule) => {
      const startTime = schedule?.schedule?.startDateTime;

      return (
        <span className="font-medium">
          {startTime && format(new Date(startTime), "MMM d, yyyy")}
        </span>
      );
    },
    sortKey: "startDateTime",
  },

  {
    header: "Time Slot",
    accessor: (schedule) => {
      const start = schedule?.schedule?.startDateTime;
      const end = schedule?.schedule?.endDateTime;

      return (
        <span className="text-sm">
          {start && format(new Date(start), "h:mm a")} -{" "}
          {end && format(new Date(end), "h:mm a")}
        </span>
      );
    },
  },

  {
    header: "Status",
    accessor: (schedule) => {
      const isPast = isPastSchedule(schedule);

      return isPast ? (
        <Badge variant="destructive">Past</Badge>
      ) : (
        <Badge variant="outline" className="bg-green-50 text-green-700">
          Upcoming
        </Badge>
      );
    },
  },

  {
    header: "Booking Status",
    accessor: (schedule) =>
      schedule.isBooked ? (
        <Badge className="bg-blue-600">Booked</Badge>
      ) : (
        <Badge variant="outline">Available</Badge>
      ),
  },
];