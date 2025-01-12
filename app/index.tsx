import { Redirect } from "expo-router";
import { useAuthContext } from "~/context/auth-context";
import { Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Index = () => {
  // For testing first time user
  AsyncStorage.clear();

  // Get auth status
  const { authed, loading } = useAuthContext();

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  // First time user
  if (authed === undefined) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // Authed
  return <Redirect href="/(main)" />;
};

export default Index;
