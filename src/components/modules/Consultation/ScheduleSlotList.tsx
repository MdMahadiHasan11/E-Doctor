"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { ScheduleSlot } from "@/services/schedule/ScheduleServices";
// import { ScheduleSlot } from "@/services/doctor/scheduleService";
import { format } from "date-fns";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { useState } from "react";

interface ScheduleSlotsListProps {
  slots: ScheduleSlot[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPage?: number;
  };
  doctorId: string;
  page: number;
}

interface GroupedSlots {
  [date: string]: ScheduleSlot[];
}

export default function ScheduleSlotsList({
  slots,
  meta
}: ScheduleSlotsListProps) {
  const [selectedSchedule, setSelectedSchedule] = useState<ScheduleSlot | null>(
    null
  );

  // Group slots by date
  const groupSchedulesByDate = (): Array<[string, ScheduleSlot[]]> => {
    const grouped: GroupedSlots = {};

    slots.forEach((slot) => {
      if (!slot.schedule?.startDateTime) return;

      const startDate = new Date(slot.schedule.startDateTime)
        .toISOString()
        .split("T")[0];

      if (startDate) {
        if (!grouped[startDate]) {
          grouped[startDate] = [];
        }
        grouped[startDate].push(slot);
      }
    });

    return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
  };

  const groupedSchedules = groupSchedulesByDate();

  const handleSelectSlot = (slot: ScheduleSlot) => {
    setSelectedSchedule(slot);
  };

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="flex items-center justify-between p-3 rounded-lg bg-primary/5 border border-primary/20">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">
            Total Slots Available: <span className="font-semibold text-primary">{meta.total}</span>
          </span>
        </div>
        {meta.totalPage && meta.totalPage > 1 && (
          <span className="text-xs text-muted-foreground">
            Page {meta.page} of {meta.totalPage}
          </span>
        )}
      </div>

      {/* Slots by Date */}
      <ScrollArea className="h-100 pr-4">
        <div className="space-y-6">
          {groupedSchedules.map(([date, dateSlots]) => {
            const dateObj = new Date(date);
            const dateLabel = format(dateObj, "EEEE, MMMM d, yyyy");

            return (
              <div key={date} className="space-y-3">
                {/* Date Header */}
                <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-muted/50">
                  <Calendar className="h-4 w-4 text-primary" />
                  <h4 className="font-semibold text-sm text-foreground">
                    {dateLabel}
                  </h4>
                  <span className="ml-auto text-xs text-muted-foreground font-medium">
                    {dateSlots.length} {dateSlots.length === 1 ? "slot" : "slots"}
                  </span>
                </div>

                {/* Time Slots Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {dateSlots.map((slot) => {
                    const startTime = slot.schedule?.startDateTime
                      ? new Date(slot.schedule.startDateTime)
                      : null;
                    const endTime = slot.schedule?.endDateTime
                      ? new Date(slot.schedule.endDateTime)
                      : null;

                    const isSelected =
                      selectedSchedule?.scheduleId === slot.scheduleId;

                    return (
                      <button
                        key={slot.scheduleId}
                        onClick={() => handleSelectSlot(slot)}
                        className={`relative group flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg transition-all border text-xs font-medium ${
                          isSelected
                            ? "bg-primary text-primary-foreground border-primary shadow-md"
                            : "border-border bg-card hover:border-primary/50 hover:bg-primary/5 text-foreground"
                        }`}
                        title={`${startTime ? format(startTime, "h:mm a") : ""} - ${endTime ? format(endTime, "h:mm a") : ""}`}
                      >
                        <Clock className="h-3.5 w-3.5" />
                        <span className="font-semibold">
                          {startTime ? format(startTime, "h:mm a") : "N/A"}
                        </span>
                        {isSelected && (
                          <CheckCircle2 className="absolute top-1 right-1 h-3 w-3" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Selected Slot Summary */}
      {selectedSchedule && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 dark:bg-green-950/20 dark:border-green-900">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400 mt-0.5 shrink-0" />
            <div className="text-sm">
              <p className="font-semibold text-foreground">Slot Selected</p>
              <p className="text-xs text-muted-foreground mt-1">
                {selectedSchedule.schedule?.startDateTime
                  ? format(
                      new Date(selectedSchedule.schedule.startDateTime),
                      "EEEE, MMMM d, yyyy - h:mm a"
                    )
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
