import "~/global.css";
import { View } from "react-native";
import AuthOptions from "~/components/auth/welcome/auth-options";
import WelcomeHeader from "~/components/auth/welcome/welcome-header";

const WelcomeScreen = () => {
  return (
    <View className="flex flex-1 justify-center gap-12">
      <WelcomeHeader />

      <AuthOptions />
    </View>
  );
};

export default WelcomeScreen;
