import { Pressable, StyleSheet, Text, TouchableOpacity, View, ViewToken } from "react-native";
import { Credential } from "~/types/credential";
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { SharedValue } from "react-native-reanimated";
import useCardAnimation from "~/hooks/use-card-animation";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import useAlert from "~/hooks/use-alert";
import AlertPopup from "../alert-popup";

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
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage } = useAlert();

    const onPressDelete = () => {
        setAlertOpen(true);
        setAlertMessage({
            title: "🗑️ Delete credential",
            content: `Are you sure you want to delete the credential for ${item.service}?`
        })
    }

    const handleDelete = () => {
        removeCredential(item.service);
        setAlertOpen(false);
    }

    return (
        <Pressable onPress={onPress}>
            <AlertPopup alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={alertMessage} hasCancelAction={true} action={handleDelete} actionText="Delete" actionBgColor="bg-red-500" />
            <Animated.View className="w-full mb-4 overflow-hidden" style={[rStyle, rContentStyle]}>
                <LinearGradient colors={["#CFFFFF", "#CCCCFF"]} style={styles.background} />
                <Text className="font-bold text-2xl text-center mt-6">{item.service}</Text>

                <Animated.View className="px-4 mt-4 flex-row justify-between items-center" style={rDetailsStyle}>
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