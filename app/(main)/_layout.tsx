import { Drawer } from "expo-router/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const MainLayout = () => {
  return (
    <Drawer>
      <Drawer.Screen
        name="index"
        options={{
          headerShown: true,
          headerTitleAlign: "center",
          drawerIcon: () => <FontAwesome name="home" size={24} color="black" />,
        }}
      />
    </Drawer>
  );
};

export default MainLayout;
