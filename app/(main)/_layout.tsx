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
  const getDrawerIconColor = (route: string) => {
    return currentRoute === route ? activeColor.drawerActiveTint : activeColor.drawerInactiveTint;
  }

  return (
    <Drawer drawerContent={CustomDrawer}
      screenOptions={{
        drawerStyle: { backgroundColor: activeColor.drawerBg, width: "60%" },
        drawerActiveBackgroundColor: activeColor.drawerActiveBg,
        drawerActiveTintColor: activeColor.drawerActiveTint,
        drawerInactiveTintColor: activeColor.drawerInactiveTint,
        headerTitleStyle: { fontWeight: "bold", color: activeColor.text },
        headerTintColor: activeColor.icon,
        headerTitleAlign: "center",
        headerTransparent: true,
        headerShown: true,
      }} >
      <Drawer.Screen
        name="index"
        options={{
          drawerLabel: "Home",
          headerTitle: "My keys✨",
          drawerIcon: () => <FontAwesome name="home" size={24} color={getDrawerIconColor("/")} />,
          headerRight: () => <SearchBox />,
        }}
      />
      <Drawer.Screen
        name="starred"
        options={{
          drawerLabel: "Favorite keys",
          headerTitle: "Favorite keys🌟",
          drawerIcon: () => <FontAwesome name="star" size={24} color={getDrawerIconColor("/starred")} />,
        }}
      />
    </Drawer>
  );
};

export default MainLayout;
