"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Label } from "@/components/ui/label";

import { createDoctorSchedule } from "@/services/doctor/doctorScedule.services";

import { ISchedule } from "@/types/schedule.interface";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TMeta } from "@/types/common.interface";

interface BookScheduleDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  availableSchedules: ISchedule[];
  meta: TMeta;
}

export default function BookScheduleDialog({
  meta,
  open,
  onClose,
  onSuccess,
  availableSchedules = [],
}: BookScheduleDialogProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const page = Number(searchParams.get("page") || 1);
  const totalPages = Math.ceil((meta?.total || 0) / (meta?.limit || 10));

  /* Clear selected schedules when dialog closes */
  useEffect(() => {
    if (!open) {
      setSelectedSchedules([]);
    }
  }, [open]);

  /* ---------------- Close Modal ---------------- */

  const handleCloseModal = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("page");

    router.replace(`?${params.toString()}`, { scroll: false });

    onClose();
  };

  /* ---------------- Pagination ---------------- */

  const handlePageChange = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", pageNumber.toString());

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  /* ---------------- Toggle Schedule ---------------- */

  const handleToggleSchedule = (scheduleId: string) => {
    setSelectedSchedules((prev) =>
      prev.includes(scheduleId)
        ? prev.filter((id) => id !== scheduleId)
        : [...prev, scheduleId]
    );
  };

  /* ---------------- Submit Booking ---------------- */

  const handleSubmit = async () => {
    if (selectedSchedules.length === 0) {
      toast.error("Please select at least one schedule");
      return;
    }

    try {
      setIsLoading(true);

      await createDoctorSchedule(selectedSchedules);

      toast.success(
        `Successfully booked ${selectedSchedules.length} schedule${
          selectedSchedules.length > 1 ? "s" : ""
        }`
      );

      if (onSuccess) {
        onSuccess();
      } else {
        router.refresh();
      }

      handleCloseModal();
    } catch (error) {
      console.error(error);
      toast.error("Failed to book schedules");
    } finally {
      setIsLoading(false);
    }
  };

  /* ---------------- Group Schedules By Date ---------------- */

  const groupedSchedules = availableSchedules.reduce<
    Record<string, ISchedule[]>
  >((acc, schedule) => {
    const date = format(new Date(schedule.startDateTime), "yyyy-MM-dd");

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(schedule);

    return acc;
  }, {});

  const groupedEntries = Object.entries(groupedSchedules).sort(
    ([a], [b]) => new Date(a).getTime() - new Date(b).getTime()
  );

  /* ---------------- UI ---------------- */

  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        if (!value) handleCloseModal();
      }}
    >
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Schedules</DialogTitle>
          <DialogDescription>
            Select time slots from available schedules
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 space-y-6">
          {availableSchedules.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                No available schedules found
              </p>
            </div>
          ) : (
            groupedEntries.map(([date, schedules]) => (
              <div key={date}>
                <h3 className="font-medium mb-3">
                  {format(new Date(date), "EEEE, MMMM d, yyyy")}
                </h3>

                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  {schedules.map((schedule) => (
                    <div
                      key={schedule.id}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer"
                      onClick={() => handleToggleSchedule(schedule.id)}
                    >
                      <Checkbox
                        id={schedule.id}
                        checked={selectedSchedules.includes(schedule.id)}
                      />

                      <Label
                        htmlFor={schedule.id}
                        className="flex-1 cursor-pointer"
                      >
                        {format(
                          new Date(schedule.startDateTime),
                          "h:mm a"
                        )}{" "}
                        -{" "}
                        {format(new Date(schedule.endDateTime), "h:mm a")}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}

          {/* Pagination */}

          {totalPages > 1 && (
            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && handlePageChange(page - 1)}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }).map((_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <PaginationItem key={pageNumber}>
                      <PaginationLink
                        isActive={page === pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                      >
                        {pageNumber}
                      </PaginationLink>
                    </PaginationItem>
                  );
                })}

                <PaginationItem>
                  <PaginationNext
                    onClick={() =>
                      page < totalPages && handlePageChange(page + 1)
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">
              {selectedSchedules.length} schedule
              {selectedSchedules.length !== 1 ? "s" : ""} selected
            </p>

            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={handleCloseModal}
                disabled={isLoading}
              >
                Cancel
              </Button>

              <Button
                onClick={handleSubmit}
                disabled={selectedSchedules.length === 0 || isLoading}
              >
                {isLoading ? "Booking..." : "Book Schedules"}
              </Button>
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}