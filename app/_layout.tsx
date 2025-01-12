import "../global.css";
import { AuthContextProvider } from "~/context/auth-context";
import { Slot } from "expo-router";
import { PortalHost } from "@rn-primitives/portal";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <AuthContextProvider>
          <Slot />
          <PortalHost />
        </AuthContextProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
