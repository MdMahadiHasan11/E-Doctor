import MyProfile from "@/components/modules/MyProfile/MyProfile";
import { getUserInfo } from "@/services/auth/get-user-info";

const MyProfilePage = async () => {
  const userInfo = await getUserInfo();
  // console.log({userInfo});
  return <MyProfile userInfo={userInfo} />;
};

export default MyProfilePage;
