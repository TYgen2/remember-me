import { AuthContextProvider } from "../context/auth-context";
import { Slot } from "expo-router";

const RootLayout = () => {
  return (
    <AuthContextProvider>
      <Slot />
    </AuthContextProvider>
  );
};

export default RootLayout;
