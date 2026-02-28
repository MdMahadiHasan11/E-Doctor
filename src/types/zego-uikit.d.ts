/* eslint-disable @typescript-eslint/no-explicit-any */
// src/types/zego-uikit-prebuilt.d.ts
declare module "@zegocloud/zego-uikit-prebuilt" {
  import { FC } from "react";

  export const ZegoUIKitPrebuilt: FC<{
    appID: number;
    kitToken: string;
    userID: string;
    userName: string;
    roomID: string;
    config?: {
      scenario?: {
        mode: number;
      };
      [key: string]: any;
    };
    [key: string]: any;
  }> & {
    OneONoneCall: number;
    // Add other modes if you use them later
    // GroupCall: number;
    // LiveStreaming: number;
  };
}
