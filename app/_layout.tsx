import "../global.css";
import { AuthContextProvider } from "~/context/auth-context";
import { Slot } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { ThemeContextProvider } from "~/context/theme-context";

const RootLayout = () => {

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <ThemeContextProvider>
          <AuthContextProvider>
            <Slot />
            <PortalHost />
          </AuthContextProvider>
        </ThemeContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
