import { Redirect } from "expo-router";
import { useAuthContext } from "~/context/auth-context";
import { authenticateUser } from "~/lib/auth";
import { LoadingSpinner } from "~/components/loading-spinner";

const Index = () => {
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
