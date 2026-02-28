import { getVideoCall } from "@/services/video-call/video-call.service";
import VideoCallWrapper from "./VideoCallWrapper";

export default async function VideoCall({
  appointmentId,
}: {
  appointmentId: string;
}) {
  const result = await getVideoCall(appointmentId);

  const toekn = result?.data?.data?.userName;
  console.log(
    { toekn },
    "lklklklklklklklklklklklklklklklklklklklklklklklklklklklklklklklklk",
  );
  return (
    <div>
      {/* <VideoCallClient
        token={result.token}
        channelName={result.channelName}
        uid={result.uid}
        appId={"465e9790be814e88ab6cc03fbfcd4557"}
      /> */}

      <VideoCallWrapper
        token={result?.data?.data?.token}
        roomID={result?.data?.data?.roomID}
        userID={result?.data?.data?.userID}
        userName={result?.data?.data?.userName}
        appID={481621082}
      />
    </div>
  );
}
