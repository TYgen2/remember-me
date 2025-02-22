import { Redirect } from "expo-router";
import { useAuthContext } from "~/context/auth-context";
import { authenticateUser, openPasswordSettings } from "~/lib/auth";
import { LoadingSpinner } from "~/components/loading-spinner";
import { Image, RefreshControl, ScrollView, } from "react-native";
import { Text } from "react-native";
import { Button } from "~/components/ui/button";
import { useCallback, useEffect, useState } from "react";

const Index = () => {
  // Get auth status
  const { hasAuthSetup, authConfirmed, loading, refreshAuthStatus } = useAuthContext();

  const [isRefreshing, setIsRefreshing] = useState(false);
  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await refreshAuthStatus();
    setIsRefreshing(false);
  }, [refreshAuthStatus]);

  useEffect(() => {
    // Not first time user, but not authenticated. Authenticate now
    if (authConfirmed && hasAuthSetup) {
      authenticateUser();
    }
  }, [authConfirmed, hasAuthSetup]);

  if (loading) {
    return <LoadingSpinner />;
  }

  // First time user
  if (authConfirmed === undefined) {
    return <Redirect href="/(auth)/welcome" />;
  }

  // User has registered their local auth before, but they turned off the local auth
  if (authConfirmed && !hasAuthSetup) {
    return (
      <ScrollView contentContainerClassName="justify-center items-center px-8 flex-1" refreshControl={
        <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
      }>
        <Image
          source={require("~/assets/icon/sparkle.png")}
          className="mb-4 h-40 w-40 self-center"
        />
        <Text className="text-2xl font-bold pb-4">Hey you!</Text>
        <Text className="text-center">We noticed that you have turned off local authentication. 
          Please set up an authentication method and try again.</Text>

        <Button className="w-3/4 bg-black my-4" size="lg" onPress={openPasswordSettings}>
          <Text className="text-white font-bold">Go to settings</Text>
        </Button>

        <Text className="text-center text-blue-500 font-bold">After you have set up the local authentication, 
          you can pull up to refresh this page to authenticate again.</Text>
      </ScrollView>
    );
  }
};

export default Index;