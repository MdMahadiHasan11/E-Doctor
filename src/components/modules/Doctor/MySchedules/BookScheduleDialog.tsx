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
import { Label } from "@/components/ui/label";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  createDoctorSchedule,
  getAvailableSchedules,
} from "@/services/doctor/doctorScedule.services";
import { ISchedule } from "@/types/schedule.interface";
import { format } from "date-fns";
import { Calendar, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface BookScheduleDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  // We now expect initial data + meta from parent
  initialSchedules: ISchedule[];
  initialMeta?: { total: number; page: number; limit: number };
}

export default function BookScheduleDialog({
  open,
  onClose,
  onSuccess,
  initialSchedules = [],
  initialMeta,
}: BookScheduleDialogProps) {
  const [schedules, setSchedules] = useState<ISchedule[]>(initialSchedules);
  const [meta, setMeta] = useState(
    initialMeta || { total: 0, page: 1, limit: 10 },
  );
  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingPage, setIsFetchingPage] = useState(false);

  const currentPage = meta.page;
  const totalPages = Math.ceil(meta.total / meta.limit);

  const loadPage = async (page: number) => {
    if (page === currentPage) return;
    setIsFetchingPage(true);

    try {
      const query = `page=${page}&limit=${meta.limit}`;
      const response = await getAvailableSchedules(query);

      setSchedules(response?.data || []);
      setMeta(response?.meta || { total: 0, page, limit: meta.limit });
      // setSelectedSchedules([]); // optional: clear selection when changing page
    } catch (err) {
      console.error(err);
      toast.error("Failed to load schedules");
    } finally {
      setIsFetchingPage(false);
    }
  };

  useEffect(() => {
    if (open) {
      // Reset to first page when dialog opens (or keep last page — your choice)
      setSchedules(initialSchedules);
      setMeta(initialMeta || { total: 0, page: 1, limit: 10 });
      setSelectedSchedules([]);
    }
  }, [open, initialSchedules, initialMeta]);

  const handleToggleSchedule = (scheduleId: string) => {
    setSelectedSchedules((prev) =>
      prev.includes(scheduleId)
        ? prev.filter((id) => id !== scheduleId)
        : [...prev, scheduleId],
    );
  };

  const handleSubmit = async () => {
    if (selectedSchedules.length === 0) {
      toast.error("Please select at least one schedule");
      return;
    }

    setIsLoading(true);
    try {
      await createDoctorSchedule(selectedSchedules);
      toast.success(
        `Successfully booked ${selectedSchedules.length} schedule${
          selectedSchedules.length > 1 ? "s" : ""
        }`,
      );
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Error booking schedules:", error);
      toast.error("Failed to book schedules");
    } finally {
      setIsLoading(false);
    }
  };

  const groupSchedulesByDate = () => {
    const grouped: Record<string, ISchedule[]> = {};

    schedules.forEach((schedule) => {
      const date = format(new Date(schedule.startDateTime), "yyyy-MM-dd");
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(schedule);
    });

    return Object.entries(grouped).sort(
      ([a], [b]) => new Date(a).getTime() - new Date(b).getTime(),
    );
  };

  const grouped = groupSchedulesByDate();

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Book Schedules</DialogTitle>
          <DialogDescription>
            Select time slots from available schedules to add to your calendar
          </DialogDescription>
        </DialogHeader>

        <div className="py-4 relative">
          {isFetchingPage && (
            <div className="absolute inset-0 bg-background/60 flex items-center justify-center z-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {schedules.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
              <p className="text-muted-foreground">
                No available schedules found
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {grouped.map(([date, daySchedules]) => (
                <div key={date}>
                  <h3 className="font-medium mb-3">
                    {format(new Date(date), "EEEE, MMMM d, yyyy")}
                  </h3>
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {daySchedules.map((schedule) => (
                      <div
                        key={schedule.id}
                        className={`flex items-center space-x-2 p-3 border rounded-lg hover:bg-accent cursor-pointer ${
                          schedule?.isBooked
                            ? "opacity-50 pointer-events-none"
                            : ""
                        }`}
                        onClick={() =>
                          !schedule?.isBooked &&
                          handleToggleSchedule(schedule.id)
                        }
                      >
                        <Checkbox
                          disabled={isLoading || schedule?.isBooked}
                          id={schedule.id}
                          checked={selectedSchedules.includes(schedule.id)}
                          onCheckedChange={() =>
                            handleToggleSchedule(schedule.id)
                          }
                        />
                        <Label
                          htmlFor={schedule.id}
                          className="flex-1 cursor-pointer"
                        >
                          {format(new Date(schedule.startDateTime), "h:mm a")} –{" "}
                          {format(new Date(schedule.endDateTime), "h:mm a")}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ─── Pagination ─── */}
        {totalPages > 1 && (
          <div className="pt-4 border-t">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) loadPage(currentPage - 1);
                    }}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        isActive={page === currentPage}
                        onClick={(e) => {
                          e.preventDefault();
                          loadPage(page);
                        }}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) loadPage(currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}

        <DialogFooter>
          <div className="flex items-center justify-between w-full">
            <p className="text-sm text-muted-foreground">
              {selectedSchedules.length} schedule
              {selectedSchedules.length !== 1 ? "s" : ""} selected
            </p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={onClose} disabled={isLoading}>
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
