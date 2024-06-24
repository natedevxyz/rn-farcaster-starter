import { View } from "react-native";
import { NeynarSigninButton } from "@neynar/react-native-signin";
import { fetchAuthorizationUrl } from "@/api/fetch-auth";
import { useApp } from "@/context/AppContext";

export default function Index() {
  const { handleSignin } = useApp();
  return (
    <View className="flex-1 justify-center items-center">
      <NeynarSigninButton
        fetchAuthorizationUrl={fetchAuthorizationUrl}
        successCallback={handleSignin}
        errorCallback={(error) => console.error(error)}
      />
    </View>
  );
}
