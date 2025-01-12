import { Redirect } from "expo-router";
import { useAuthContext } from "~/context/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { authenticateUser } from "~/lib/auth";
import { LoadingSpinner } from "~/components/loading-spinner";

const Index = () => {
  // For testing first time user
  // AsyncStorage.clear();

  // Get auth status
  const { authConfirmed, loading } = useAuthContext();

  if (loading) {
    return <LoadingSpinner />
  }

  // First time user
  if (authConfirmed === undefined) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // Not first time user, but not authenticated. Authenticate now
  if (authConfirmed) {
    authenticateUser();
  }

};

export default Index;
