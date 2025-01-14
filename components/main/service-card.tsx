import { Animated, Pressable, StyleSheet, Text } from "react-native";
import { Credential } from "~/types/credential";
import { LinearGradient } from 'expo-linear-gradient';
import useCardAnimation from "~/hooks/use-card-animation";

interface ServiceCardProps {
    item: Credential;
    removeCredential: (serviceName: string) => void;
}

const ServiceCard = ({
    item,
    removeCredential
}: ServiceCardProps) => {
    const { flipCard, flipToFrontStyle, flipToBackStyle } = useCardAnimation();

    return (
        <Pressable className="w-[48%] mb-28" onPress={flipCard} onLongPress={() => removeCredential(item.service)}>
            <Animated.View className="h-24 w-full items-center justify-center" style={[flipToFrontStyle, styles.card]}>
                <LinearGradient
                    colors={['#CFFFFF', '#CCCCFF']}
                    style={styles.background}
                />
                <Text className="font-bold text-2xl">{item.service}</Text>
            </Animated.View>
            <Animated.View className="h-24 w-full items-center justify-center" style={[flipToBackStyle, styles.card]}>
                <LinearGradient
                    colors={['#CFFFFF', '#CCCCFF']}
                    style={styles.background}
                />
                <Text>{item.email}</Text>
                <Text>{item.password}</Text>
            </Animated.View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    card: {
        position: 'absolute',
        backfaceVisibility: 'hidden',
        overflow: 'hidden',
        borderRadius: 20
    },
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
})

export default ServiceCard