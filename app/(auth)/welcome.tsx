import "~/global.css";
import { View } from "react-native";
import GetStarted from "~/components/auth/welcome/get-started";
import WelcomeHeader from "~/components/auth/welcome/welcome-header";

const WelcomeScreen = () => {
  return (
    <View className="flex flex-1 justify-center gap-12 bg-white">
      <WelcomeHeader />
      <GetStarted />
    </View>
  );
};

export default WelcomeScreen;
