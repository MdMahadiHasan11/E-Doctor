"use client";

import { useState } from "react";
import DoctorCard from "./doctor-card";
import ScheduleCalendar from "./schedule-calendar";
import AvailableSlots from "./available-slots";
import PaymentSelection, { PaymentData } from "./payment-selection";
import { Slot } from "@/app/(commonLayout)/consultation/doctor/[id]/page";

// Mock data
const doctorData = {
  id: "2155384a-2709-49ca-87bc-79de3d676578",
  name: "Doctor-1",
  email: "doctor1@gmail.com",
  profilePhoto:
    "https://res.cloudinary.com/dpyy9zqdm/image/upload/v1772994997/483753549_1178222120684759_7989683189131333243_n.jpg-1772994994504.jpg",
  contactNumber: "01774938275",
  address: "Dhaka",
  registrationNumber: "REG1",
  experience: 2,
  gender: "MALE",
  appointmentFee: 550,
  qualification: "MBBS",
  currentWorkingPlace: "Dhaka Medical Collage",
  designation: "Senior Consultant",
  averageRating: 0,
  doctorSpecialties: [
    {
      specialities: {
        id: "ce056e80-0f65-4a21-8ef8-74417c24588d",
        title: "Neurology",
        icon: "https://res.cloudinary.com/dpyy9zqdm/image/upload/v1772992682/fetchpik.com-iconscout-UP0pC8GoW4.png-1772992677539.gif",
      },
    },
  ],
  doctorSchedules: [
    {
      doctorId: "2155384a-2709-49ca-87bc-79de3d676578",
      scheduleId: "0c2007c9-c0f9-42fe-97ac-1094f09e0738",
      isBooked: false,
      appointmentId: null,
      schedule: {
        id: "0c2007c9-c0f9-42fe-97ac-1094f09e0738",
        startDateTime: "2026-03-19T04:00:00.000Z",
        endDateTime: "2026-03-19T04:30:00.000Z",
      },
    },
    {
      doctorId: "2155384a-2709-49ca-87bc-79de3d676578",
      scheduleId: "1c2007c9-c0f9-42fe-97ac-1094f09e0739",
      isBooked: true,
      appointmentId: "apt-001",
      schedule: {
        id: "1c2007c9-c0f9-42fe-97ac-1094f09e0739",
        startDateTime: "2026-03-10T05:00:00.000Z",
        endDateTime: "2026-03-10T05:30:00.000Z",
      },
    },
    {
      doctorId: "2155384a-2709-49ca-87bc-79de3d676578",
      scheduleId: "2c2007c9-c0f9-42fe-97ac-1094f09e073a",
      isBooked: false,
      appointmentId: null,
      schedule: {
        id: "2c2007c9-c0f9-42fe-97ac-1094f09e073a",
        startDateTime: "2026-03-11T09:00:00.000Z",
        endDateTime: "2026-03-11T09:30:00.000Z",
      },
    },
    {
      doctorId: "2155384a-2709-49ca-87bc-79de3d676578",
      scheduleId: "3c2007c9-c0f9-42fe-97ac-1094f09e073b",
      isBooked: false,
      appointmentId: null,
      schedule: {
        id: "3c2007c9-c0f9-42fe-97ac-1094f09e073b",
        startDateTime: "2026-03-11T10:00:00.000Z",
        endDateTime: "2026-03-11T10:30:00.000Z",
      },
    },
    {
      doctorId: "2155384a-2709-49ca-87bc-79de3d676578",
      scheduleId: "4c2007c9-c0f9-42fe-97ac-1094f09e073c",
      isBooked: false,
      appointmentId: null,
      schedule: {
        id: "4c2007c9-c0f9-42fe-97ac-1094f09e073c",
        startDateTime: "2026-03-12T14:00:00.000Z",
        endDateTime: "2026-03-12T14:30:00.000Z",
      },
    },
  ],
};

export default function DoctorDetailsPage({
  scheduleDate,
  allSlotData,
}: {
  scheduleDate: string[];
  allSlotData: Slot[];
}) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [selectedScheduleId, setSelectedScheduleId] = useState<string | null>(
    null,
  );
  const [showPayment, setShowPayment] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSlotSelect = (slotTime: string, scheduleId: string) => {
    console.log({ slotTime, scheduleId });

    setSelectedSlot(slotTime);
    setSelectedScheduleId(scheduleId);
    setShowPayment(false);
  };

  const handlePaymentSubmit = async (paymentData: PaymentData) => {
    setIsProcessing(true);
    console.log(" Payment submitted:", paymentData);

    try {
      // Simulate API call for payment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      if (paymentData.paymentType === "now") {
        console.log(" Processing payment with", paymentData.paymentMethod);
        alert(
          `Payment of ৳${paymentData.amount} initiated via ${paymentData.paymentMethod}. Doctor ID: ${paymentData.doctorId}, Slot ID: ${paymentData.slotId}`,
        );
      } else {
        console.log(" Appointment booked with pay-later option");
        alert(
          `Appointment booked! Please pay within 5 minutes. Doctor ID: ${paymentData.doctorId}, Slot ID: ${paymentData.slotId}`,
        );
      }

      // Reset state
      setSelectedSlot(null);
      setSelectedScheduleId(null);
      setShowPayment(false);
      setSelectedDate(undefined);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-background via-secondary to-background py-8 px-4">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Left Side - Doctor Details */}
          <div className="lg:col-span-1">
            <DoctorCard doctor={doctorData} />
          </div>

          {/* Right Side - Calendar and Slots */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {/* Calendar */}
              <div className="rounded-xl bg-card p-6 shadow-lg">
                <h2 className="mb-6 text-2xl font-bold text-foreground">
                  Select Appointment Date
                </h2>
                <ScheduleCalendar
                  scheduleDate={scheduleDate}
                  selectedDate={selectedDate}
                  onDateSelect={(date) => {
                    setSelectedDate(date);

                    const isoDate = new Date(
                      Date.UTC(
                        date.getFullYear(),
                        date.getMonth(),
                        date.getDate(),
                        0,
                        0,
                        0,
                        0,
                      ),
                    ).toISOString();

                    const params = new URLSearchParams();
                    params.set("date", isoDate);

                    window.history.replaceState(
                      {},
                      "",
                      `?${params.toString()}`,
                    );
                  }}
                />
              </div>

              {/* Available Slots */}
              {selectedDate && (
                <div className="rounded-xl bg-card p-6 shadow-lg">
                  <h3 className="mb-6 text-xl font-bold text-foreground">
                    Available Time Slots
                  </h3>
                  <AvailableSlots
                    allSlotData={allSlotData}
                    selectedSlot={selectedSlot}
                    onSlotSelect={(slotTime: string, scheduleId: string) =>
                      handleSlotSelect(slotTime, scheduleId)
                    }
                  />
                </div>
              )}

              {/* Appointment Summary and Payment */}
              {selectedSlot && !showPayment && (
                <div className="rounded-xl bg-linear-to-br from-primary to-primary/80 p-6 text-primary-foreground shadow-lg">
                  <h3 className="mb-4 text-xl font-bold">
                    Appointment Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="font-semibold">Doctor:</span>{" "}
                      {doctorData.name}
                    </p>
                    <p>
                      <span className="font-semibold">Specialty:</span>{" "}
                      {doctorData.doctorSpecialties[0]?.specialities.title}
                    </p>
                    <p>
                      <span className="font-semibold">Date:</span>{" "}
                      {selectedDate?.toLocaleDateString("en-US", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                    <p>
                      <span className="font-semibold">Time:</span>{" "}
                      {selectedSlot}
                    </p>
                    <p>
                      <span className="font-semibold">Fee:</span> ৳
                      {doctorData.appointmentFee}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowPayment(true)}
                    className="mt-6 w-full rounded-lg bg-white px-4 py-3 font-semibold text-primary transition-all hover:shadow-md"
                  >
                    Continue to Payment
                  </button>
                </div>
              )}

              {/* Payment Selection */}
              {selectedSlot && showPayment && (
                <div className="rounded-xl bg-card p-6 shadow-lg">
                  <PaymentSelection
                    appointmentFee={doctorData.appointmentFee}
                    doctorId={doctorData.id}
                    slotId={selectedScheduleId || ""}
                    onPaymentSubmit={handlePaymentSubmit}
                    isLoading={isProcessing}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
