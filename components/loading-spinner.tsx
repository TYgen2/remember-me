import { ActivityIndicator, View } from "react-native"

export const LoadingSpinner = () => {
    return (
        <View className="flex flex-1 justify-center items-center bg-white">
            <ActivityIndicator size="large" className="text-gray-300" />
        </View>
    )
}