import { getVideoCall } from "@/services/video-call/video-call.service";
// import VideoCallWrapper from "./VideoCallWrapper";
import VideoCallClient from "./VideoCallClient";

export default async function VideoCall({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const result = await getVideoCall(appointmentId);

  const token = result?.data?.token;
  const channelName = result?.data?.channelName;
  const uid = result?.data?.uid;

  return (
    <div>
      <VideoCallClient
      token={token}
      channelName={channelName}
      uid={uid}
    />

      {/* <VideoCallWrapper
        token={result?.data?.data?.token}
        roomID={result?.data?.data?.roomID}
        userID={result?.data?.data?.userID}
        userName={result?.data?.data?.userName}
        appID={481621082}
      /> */}
    </div>
  );
}
