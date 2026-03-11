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


export async function getDoctorSchedules(queryString?: string) {
    try {
        const searchParams = new URLSearchParams(queryString);
        const page = searchParams.get("page") || "1";
        const searchTerm = searchParams.get("searchTerm") || "all";
        const response = await serverFetch.get(`/schedule/doctor${queryString ? `?${queryString}` : ""}`, {
            next: {
                tags: [
                    "schedules-list",
                    `schedules-page-${page}`,
                    `schedules-search-${searchTerm}`,
                ],
                // Reduced to 120s for more frequent updates on schedules
                revalidate: 120,
            },
        });
        const result = await response.json();
        return result;
    } catch (error: any) {
        console.log(error);
        return {
            success: false,
            message: `${process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'}`
        };
    }
}