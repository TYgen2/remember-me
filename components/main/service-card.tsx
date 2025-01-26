import { Pressable, StyleSheet, Text, ViewToken } from "react-native";
import { Credential } from "~/types/credential";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SharedValue } from "react-native-reanimated";
import useCardAnimation from "~/hooks/use-card-animation";

interface ServiceCardProps {
    item: Credential
    viewableItems: SharedValue<ViewToken[]>
    removeCredential: (serviceName: string) => void
    isExpanded: boolean
    onPress: () => void
}

const ServiceCard = ({
    item,
    viewableItems,
    removeCredential,
    isExpanded,
    onPress
}: ServiceCardProps) => {

    const { rStyle, rContentStyle, rDetailsStyle } = useCardAnimation({ item, viewableItems, isExpanded });

    return (
        <Pressable onPress={onPress} onLongPress={() => removeCredential(item.service)}>
            <Animated.View className="w-full mb-4 overflow-hidden" style={[rStyle, rContentStyle]}>
                <LinearGradient colors={["#CFFFFF", "#CCCCFF"]} style={styles.background} />
                <Text className="font-bold text-2xl text-center mt-6">{item.service}</Text>

                <Animated.View className="px-4 mt-4" style={rDetailsStyle}>
                    <Text className="text-gray-700 mb-2">
                        <Text className="font-semibold">Email: </Text>
                        {item.email}
                    </Text>
                    <Text className="text-gray-700">
                        <Text className="font-semibold">Password: </Text>
                        {item.password}
                    </Text>
                </Animated.View>

            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%',
        borderRadius: 12
    },
})

export default ServiceCard