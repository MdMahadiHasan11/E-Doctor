'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';


interface ScheduleCalendarProps {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
  scheduleDate:string[]
}

export default function ScheduleCalendar({
  scheduleDate,
  selectedDate,
  onDateSelect,
}: ScheduleCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Helper function to get local date string (YYYY-MM-DD) without timezone conversion
  const getLocalDateString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Get dates with available appointments
  const datesWithSlots = useMemo(() => {
    const dates = new Set<string>();
    scheduleDate.forEach((schedule) => {
      const date = new Date(schedule);
      const dateStr = getLocalDateString(date);
      dates.add(dateStr);
    });
    return dates;
  }, [scheduleDate]);

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const monthDays = Array.from({ length: getDaysInMonth(currentDate) }, (_, i) => i + 1);
  const firstDay = getFirstDayOfMonth(currentDate);
  const emptyDays = Array.from({ length: firstDay }, (_, i) => i);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const isDateSelectable = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (date < today) return false;

    const dateStr = getLocalDateString(date);
    return datesWithSlots.has(dateStr);
  };

  const isDateSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      selectedDate.getDate() === day &&
      selectedDate.getMonth() === currentDate.getMonth() &&
      selectedDate.getFullYear() === currentDate.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    if (isDateSelectable(day)) {
      const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      onDateSelect(newDate);
    }
  };

  return (
    <div className="space-y-6">
      {/* Month/Year Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-foreground">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={handlePrevMonth}
            className="rounded-lg border border-border p-2 hover:bg-secondary transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNextMonth}
            className="rounded-lg border border-border p-2 hover:bg-secondary transition-colors"
            aria-label="Next month"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="space-y-4">
        {/* Day names */}
        <div className="grid grid-cols-7 gap-2">
          {dayNames.map((day) => (
            <div key={day} className="text-center font-semibold text-muted-foreground text-sm">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-2">
          {/* Empty days */}
          {emptyDays.map((i) => (
            <div key={`empty-${i}`} />
          ))}

          {/* Month days */}
          {monthDays.map((day) => {
            const selectable = isDateSelectable(day);
            const selected = isDateSelected(day);

            return (
              <button
                key={day}
                onClick={() => handleDateClick(day)}
                disabled={!selectable}
                className={`
                  aspect-square rounded-lg font-semibold transition-all
                  ${
                    selected
                      ? 'bg-primary text-primary-foreground shadow-md'
                      : selectable
                        ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-md cursor-pointer'
                        : 'text-muted-foreground cursor-not-allowed bg-muted/30'
                  }
                `}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-col gap-3 border-t border-border pt-4 text-sm">
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded bg-primary" />
          <span className="text-foreground">Selected Date</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded bg-secondary" />
          <span className="text-foreground">Available Appointments</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-4 w-4 rounded bg-muted/30" />
          <span className="text-muted-foreground">No Appointments</span>
        </div>
      </div>
    </div>
  );
}
