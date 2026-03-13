'use client';
import { Clock, Lock } from 'lucide-react';
import { Slot } from '@/app/(commonLayout)/consultation/doctor/[id]/page';

interface DoctorSchedule {
  scheduleId: string;
  isBooked: boolean;
  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
  };
}

interface AvailableSlotsProps {
  selectedSlot: string | null;
  onSlotSelect: (slot: string, scheduleId: string) => void;
  allSlotData: Slot[]
}

export default function AvailableSlots({
  allSlotData,
  selectedSlot,
  onSlotSelect,
}: AvailableSlotsProps) {


  const formatTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const getSlotLabel = (schedule: DoctorSchedule) => {
    return `${formatTime(schedule.schedule.startDateTime)} - ${formatTime(schedule.schedule.endDateTime)}`;
  };

  if (allSlotData.length === 0) {
    return (
      <div className="rounded-lg border-2 border-dashed border-border bg-secondary/30 px-6 py-12 text-center">
        <Clock size={40} className="mx-auto mb-4 text-muted-foreground" />
        <p className="text-lg font-semibold text-foreground">No slots available</p>
        <p className="text-sm text-muted-foreground">
          Please select another date to view available appointment slots
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Slots Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {allSlotData.map((schedule) => {
          const slotLabel = getSlotLabel(schedule);
          const isSelected = selectedSlot === slotLabel;
          const isBooked = schedule.isBooked;

          return (
            <button
              key={schedule.scheduleId}
              onClick={() => !isBooked && onSlotSelect(slotLabel, schedule.scheduleId)}
              disabled={isBooked}
              className={`
                group relative px-4 py-4 rounded-lg font-semibold transition-all
                ${
                  isBooked
                    ? 'cursor-not-allowed border-2 border-destructive/30 bg-destructive/10'
                    : isSelected
                      ? 'border-2 cursor-pointer border-primary bg-primary text-primary-foreground shadow-lg scale-105'
                      : 'border-2 cursor-pointer border-secondary bg-secondary text-secondary-foreground hover:border-primary hover:shadow-md hover:scale-105'
                }
              `}
            >
              {/* Slot Time */}
              <div className="flex items-center justify-center gap-2">
                {isBooked && <Lock size={16} />}
                <span className="text-sm">{slotLabel}</span>
              </div>

              {/* Status Badge */}
              {isBooked && (
                <div className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                  ✕
                </div>
              )}

              {/* Hover Tooltip */}
              {isBooked && (
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-destructive px-2 py-1 text-xs text-destructive-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  Already Booked
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Information Box */}
      <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
        <h4 className="mb-2 font-semibold text-foreground">
          💡 Booking Information
        </h4>
        <ul className="space-y-1 text-sm text-foreground">
          <li>
            ✓ <span className="font-medium">Green slots</span> - Available for booking
          </li>
          <li>
            ✗ <span className="font-medium">Red slots</span> - Already booked by another
            patient (disabled)
          </li>
          <li>
            • Click any available slot to select your preferred appointment time
          </li>
        </ul>
      </div>

      {/* Summary */}
      <div className="flex flex-wrap gap-4 border-t border-border pt-4 text-sm">
        <div>
          <span className="text-muted-foreground">Total Slots:</span>
          <span className="ml-2 font-bold text-foreground">{allSlotData.length}</span>
        </div>
        <div>
          <span className="text-muted-foreground">Available:</span>
          <span className="ml-2 font-bold text-primary">
            {allSlotData.filter((s) => !s.isBooked).length}
          </span>
        </div>
        <div>
          <span className="text-muted-foreground">Booked:</span>
          <span className="ml-2 font-bold text-destructive">
            {allSlotData.filter((s) => s.isBooked).length}
          </span>
        </div>
      </div>
    </div>
  );
}
