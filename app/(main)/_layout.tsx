import { Drawer } from "expo-router/drawer";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import SearchBox from "~/components/main/header/search-box";
import CustomDrawer from "~/components/drawer/custom-drawer";
import { useThemeContext } from "~/context/theme-context";
import { colors } from "~/lib/colors";
import { usePathname } from "expo-router";

const MainLayout = () => {
  const { theme } = useThemeContext();
  const activeColor = colors[theme];

  const currentRoute = usePathname();

  return (
    <Drawer drawerContent={CustomDrawer}
      screenOptions={{
        drawerStyle: { backgroundColor: activeColor.drawerBg, width: 250 },
        drawerActiveBackgroundColor: activeColor.drawerActiveBg,
        drawerActiveTintColor: activeColor.drawerActiveTint,
        drawerInactiveTintColor: activeColor.drawerInactiveTint,
      }} >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          headerShown: true,
          headerTitle: "My keys✨",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: activeColor.text
          },
          headerTintColor: activeColor.icon,
          drawerIcon: () => <FontAwesome name="home" size={24} color={currentRoute === "/" ? activeColor.drawerActiveTint : activeColor.drawerInactiveTint} />,
          headerRight: () => <SearchBox />,
        }}
      />
      <Drawer.Screen
        name="starred"
        options={{
          drawerLabel: "Starred",
          headerShown: true,
          headerTitle: "Starred",
          headerTitleAlign: "center",
          headerTransparent: true,
          headerTitleStyle: {
            fontWeight: "bold",
            color: activeColor.text
          },
          headerTintColor: "white",
          drawerIcon: () => <FontAwesome name="star" size={24} color={currentRoute === "/starred" ? activeColor.drawerActiveTint : activeColor.drawerInactiveTint} />,
        }}
      />
    </Drawer>
  );
};

export default MainLayout;
