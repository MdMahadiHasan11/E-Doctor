/* eslint-disable @typescript-eslint/no-explicit-any */
"use server"
import { serverFetch } from "@/lib/server-fetch";

export async function getVideoCall(appointmentId: string) {
  try {
    const response = await serverFetch.get(
      `/video-call/token/zego/${appointmentId}`,
    );
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error: any) {
    console.error("Error fetching appointments:", error);
    return {
      success: false,
      data: [],
      message:
        process.env.NODE_ENV === "development"
          ? error.message
          : "Failed to fetch appointments",
    };
  }
}
