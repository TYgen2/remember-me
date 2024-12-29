import { Redirect } from "expo-router";
import { useAuthContext } from "../context/auth-context";

const Index = () => {
  const { authMethod } = useAuthContext();
  console.log("Main screen here!! Checking for auth method...", authMethod);

  // First time user
  if (authMethod === undefined) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return <Redirect href="/(main)" />;
};

export default Index;
