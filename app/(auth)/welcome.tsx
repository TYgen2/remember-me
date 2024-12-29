import { View, Text, Image } from "react-native";
import "../../global.css";
import WelcomeHeader from "../../components/welcome-header";

const WelcomeScreen = () => {
  return (
    <View className="flex flex-1 bg-green-100">
      {/* Welcome title & App Icon */}
      <WelcomeHeader />

      {/* Authentication options */}
      <View></View>
    </View>
  );
};

export default WelcomeScreen;
