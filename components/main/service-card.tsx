import { Pressable, StyleSheet, Text, TouchableOpacity, View, ViewToken } from "react-native";
import { Credential } from "~/types/credential";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SharedValue } from "react-native-reanimated";
import useCardAnimation from "~/hooks/use-card-animation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useAlert from "~/hooks/use-alert";
import AlertPopup from "../alert-popup";
import { memo, useCallback } from "react";
import StarButton from "./star-button";

interface ServiceCardProps {
    item: Credential
    viewableItems: SharedValue<ViewToken[]>
    removeCredential: (serviceName: string) => void
    toggleStar: (serviceName: string) => void
    isExpanded: boolean
    onPress: () => void
    cardGradient: readonly [string, string, ...string[]]
}

const areEqual = (prevProps: ServiceCardProps, nextProps: ServiceCardProps) => {
    // Only re-render if the `isExpanded` prop changes for this specific card
    return (
        prevProps.isExpanded === nextProps.isExpanded &&
        prevProps.item.service === nextProps.item.service &&
        prevProps.cardGradient === nextProps.cardGradient &&
        prevProps.item.isStarred === nextProps.item.isStarred
    );
};

const ServiceCard = memo(({
    item,
    viewableItems,
    removeCredential,
    toggleStar,
    isExpanded,
    onPress,
    cardGradient
}: ServiceCardProps) => {

    const { rStyle, rContentStyle, rDetailsStyle } = useCardAnimation({ item, viewableItems, isExpanded });
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage } = useAlert();

    const onPressDelete = useCallback(() => {
        setAlertOpen(true)
        setAlertMessage({
            title: "🗑️ Delete credential",
            content: `Are you sure you want to delete the credential for ${item.service}?`,
        })
    }, [item.service, setAlertOpen, setAlertMessage])

    const handleDelete = useCallback(() => {
        removeCredential(item.service)
        setAlertOpen(false)
    }, [item.service, removeCredential, setAlertOpen])

    const handleToggleStar = useCallback(() => {
        toggleStar(item.service)
    }, [item.service, toggleStar])

    return (
        <Pressable onPress={onPress}>
            <AlertPopup alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={alertMessage}
                hasCancelAction={true} action={handleDelete} actionText="Delete" actionBgColor="bg-red-500" />

            <Animated.View className="w-full mb-4 px-4 overflow-hidden" style={[rStyle, rContentStyle]}>
                <LinearGradient colors={cardGradient} style={styles.background} />
                <View className="flex-row items-end">
                    <Text className="font-bold text-2xl mt-6">{item.service}</Text>
                    <StarButton isStarred={item.isStarred || false} onPress={handleToggleStar} />
                </View>

                <Animated.View className="mt-4 flex-row justify-between items-center" style={rDetailsStyle}>
                    <View>
                        <Text className="text-gray-700 mb-2">
                            <Text className="font-semibold">Login ID: </Text>
                            {item.login_id}
                        </Text>
                        <Text className="text-gray-700">
                            <Text className="font-semibold">Password: </Text>
                            {item.password}
                        </Text>
                    </View>

                    <TouchableOpacity className="bg-red-500 p-1 rounded-md" activeOpacity={0.8} onPress={onPressDelete}>
                        <MaterialIcons name="delete-forever" size={24} color="black" />
                    </TouchableOpacity>
                </Animated.View>

            </Animated.View>
        </Pressable>
    )
}, areEqual);

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

export default ServiceCard;