import { getVideoCall } from "@/services/video-call/video-call.service";
// import VideoCall from "./video-call";
import VideoCallHome from "./video-call";
import VideoCall from "@/components/modules/videoCall/VideoCall";

export default async function Page () {

    const appointmentId = "1b5587a7-3b96-49c8-9a30-09d2d7b5162a";
    const result = await getVideoCall(appointmentId);

    console.log({result});
  return (
    <div>
      {/* <VideoCallHome mockZegoData={result?.data}/> */}
      <VideoCall appointmentId={appointmentId} />
    </div>
  );
};
