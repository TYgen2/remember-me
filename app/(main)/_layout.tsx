import { Drawer } from "expo-router/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SearchBox from "~/components/main/header/search-box";

const MainLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitle: "My keys✨",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: "white"
          },
          headerTintColor: "white",
          drawerIcon: () => <FontAwesome name="home" size={24} color="black" />,
          headerRight: () => <SearchBox />,
        }}
      />
    </Drawer>
  );
};

export default MainLayout;
