import { Switch, View } from "react-native"
import { useThemeContext } from "~/context/theme-context";

const ThemeToggle = () => {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <View className="ml-auto mr-2">
            <Switch value={theme === 'dark'} onValueChange={toggleTheme} trackColor={{ true: "gray" }} thumbColor={theme === 'dark' ? "white" : "black"} />
        </View>
    )
}

export default ThemeToggle;