import { Image, Text, View } from "react-native";

const Empty = () => {
    return (
        <View className="flex-1 justify-center items-center">
            <Image source={require("~/assets/icon/xueyi.png")} className="h-24 w-24 opacity-50" />
            <Text className="text-2xl font-bold text-gray-500">No credentials found</Text>
        </View>
    )
}

export default Empty;