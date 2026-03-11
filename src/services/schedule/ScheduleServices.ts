/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { serverFetch } from "@/lib/server-fetch";

export interface DoctorScheduleParams {
  id: string;
  startDate: string;
  endDate: string;
  page?: number;
  isBooked?: boolean;
}

export interface ScheduleSlot {
  doctorId: string;
  scheduleId: string;
  isBooked: boolean;
  appointmentId: string | null;
  createdAt: string;
  updatedAt: string;
  schedule: {
    id: string;
    startDateTime: string;
    endDateTime: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ScheduleResponse {
  success: boolean;
  message: string;
  data: {
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPage?: number;
    };
    data: ScheduleSlot[];
  };
}

export async function getDoctorSchedules(
  params: DoctorScheduleParams
): Promise<ScheduleResponse> {
  try {
    const { id, startDate, endDate, page = 1, isBooked = true } = params;

    // Build query string
    const queryParams = new URLSearchParams({
      startDate,
      endDate,
      page: String(page),
      isBooked: String(isBooked),
    });

    const response = await serverFetch.get(
      `/doctor/schedule/${id}?${queryParams.toString()}`,
      {
    cache: "no-store"
  }
    );

    const result = await response.json();
    return result;
  } catch (error: any) {
    console.error("[getDoctorSchedules] Error:", error);
    return {
      success: false,
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch schedules",
      data: {
        meta: {
          total: 0,
          page: 1,
          limit: 10,
          totalPage: 0,
        },
        data: [],
      },
    };
  }
}
