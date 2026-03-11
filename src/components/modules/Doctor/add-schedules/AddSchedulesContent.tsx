"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "sonner";

import { createDoctorSchedule } from "@/services/doctor/doctorScedule.services";
import { ISchedule } from "@/types/schedule.interface";

interface BookSchedulePageProps {
  availableSchedules: ISchedule[];
}

export default function BookSchedulePage({
  availableSchedules = [],
}: BookSchedulePageProps) {
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleSchedule = (scheduleId: string) => {
    setSelectedSchedules((prev) =>
      prev.includes(scheduleId)
        ? prev.filter((id) => id !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  const handleSubmit = async () => {
    if (selectedSchedules.length === 0) {
      toast.error("Please select at least one schedule");
      return;
    }

    try {
      setIsLoading(true);

      const result = await createDoctorSchedule(selectedSchedules);

      if (!result?.success) {
        toast.error(result?.message || "Failed to book schedules");
        return;
      }

      toast.success(
        `Successfully booked ${selectedSchedules.length} schedule${
          selectedSchedules.length > 1 ? "s" : ""
        }`
      );

      setSelectedSchedules([]);
      // Optional: router.refresh() if you want to refetch data
    } catch (error) {
      console.error(error);
      toast.error("Failed to book schedules");
    } finally {
      setIsLoading(false);
    }
  };

  // Group by date
  const groupedSchedules = availableSchedules.reduce<
    Record<string, ISchedule[]>
  >((acc, schedule) => {
    const date = format(new Date(schedule.startDateTime), "yyyy-MM-dd");
    if (!acc[date]) acc[date] = [];
    acc[date].push(schedule);
    return acc;
  }, {});

  const groupedEntries = Object.entries(groupedSchedules).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  );

  return (
    <div className="">
      

      {availableSchedules.length === 0 ? (
        <div className="text-center py-16 border rounded-lg bg-muted/40">
          <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No schedules found</h3>
          <p className="text-sm text-muted-foreground mt-2">
            There are no time slots available at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-10">
          {groupedEntries.map(([date, schedules]) => (
            <section key={date}>
              <h2 className="font-semibold text-lg mb-4">
                {format(new Date(date), "EEEE, MMMM d, yyyy")}
              </h2>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {schedules.map((schedule) => {
                  const isBooked = schedule.isBooked ?? false;
                  const isSelected = selectedSchedules.includes(schedule.id);
                  const isDisabled = isBooked;

                  return (
                    <div
                      key={schedule.id}
                      className={`flex items-center space-x-3 p-4 border rounded-lg transition-colors
                        ${
                          isBooked
                            ? "bg-muted/60 border-muted text-muted-foreground opacity-70 cursor-not-allowed"
                            : isSelected
                            ? "bg-accent border-primary/40"
                            : "hover:bg-accent cursor-pointer"
                        }`}
                      {...(!isDisabled && {
                        onClick: () => handleToggleSchedule(schedule.id),
                      })}
                    >
                      <Checkbox
                        id={schedule.id}
                        checked={isSelected}
                        onCheckedChange={
                          isDisabled ? undefined : () => handleToggleSchedule(schedule.id)
                        }
                        disabled={isDisabled}
                        className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
                      />

                      <Label
                        htmlFor={schedule.id}
                        className={`flex-1 font-medium ${
                          isDisabled ? "cursor-not-allowed" : "cursor-pointer"
                        }`}
                      >
                        {format(new Date(schedule.startDateTime), "h:mm a")} –{" "}
                        {format(new Date(schedule.endDateTime), "h:mm a")}
                        {isBooked && (
                          <span className="ml-2 text-xs text-destructive font-normal">
                            (Booked)
                          </span>
                        )}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      )}

      {selectedSchedules.length > 0 && (
        <div className=" flex items-center justify-between gap-4 bg-background/90 backdrop-blur-sm border rounded-lg mt-4 p-4  mx-auto">
          <p className="text-sm font-medium">
            {selectedSchedules.length} schedule
            {selectedSchedules.length !== 1 ? "s" : ""} selected
          </p>

          <Button
            onClick={handleSubmit}
            disabled={isLoading || selectedSchedules.length === 0}
            size="lg"
          >
            {isLoading ? "Booking..." : "Book Selected Schedules"}
          </Button>
        </div>
      )}
    </div>
  );
}