import { Drawer } from "expo-router/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SearchBox from "~/components/main/header/search-box";
import { View } from "react-native";

const MainLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "Home",
          headerTitleAlign: "center",
          headerTransparent: true,
          drawerIcon: () => <FontAwesome name="home" size={24} color="black" />,
          headerRight: () => <SearchBox />,
          headerBackground: () => (
            <View
              style={{
                height: 60,
                backgroundColor: "#fff",
                borderBottomEndRadius: 24,
                borderBottomStartRadius: 24,
              }}
            />
          ),
        }}
      />
    </Drawer>
  );
};

export default MainLayout;
