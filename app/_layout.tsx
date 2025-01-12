import "../global.css";
import { AuthContextProvider } from "~/context/auth-context";
import { Slot } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Slot />
      <PortalHost />
    </AuthContextProvider>
  );
};

export default RootLayout;
