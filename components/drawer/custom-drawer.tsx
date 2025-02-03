import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { View } from "react-native";
import Feather from '@expo/vector-icons/Feather';
import { Text } from "react-native";
import ThemeToggle from "./theme-toggle";
import { useThemeContext } from "~/context/theme-context";
import { colors } from "~/lib/colors";

const CustomDrawer = (props: any) => {
    const { theme } = useThemeContext();
    const activeColor = colors[theme];

    return (
        <View className="flex-1">
            <DrawerContentScrollView {...props} scrollEnabled={false}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>

            <View className="py-4 pl-8 flex-row items-center gap-4 flex">
                <Feather name="sun" size={24} color={activeColor.text} />
                <Text className="font-bold" style={{ color: activeColor.text }}>Theme</Text>

                <ThemeToggle />
            </View>
        </View>
    )
}

export default CustomDrawer;