import { Text, View } from "react-native"
import { Button } from "~/components/ui/button";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const AuthOptions = () => {
    return (
        <View className="justify-center items-center gap-4">
            <Button className="w-3/4 flex flex-row justify-between" size="lg">
                <MaterialIcons name="password" size={24} color="white" className="mr-2" />
                <Text className="text-white font-bold">Password / Pattern</Text>
                <MaterialIcons name="pattern" size={24} color="white" className="ml-2" />
            </Button>

            <Button className="w-3/4 flex flex-row justify-between" size="lg">
                <MaterialIcons name="fingerprint" size={24} color="white" className="mr-2" />
                <Text className="text-white font-bold">Fingerprint / FaceID</Text>
                <FontAwesome6 name="face-smile" size={24} color="white" />
            </Button>

            <Button className="w-3/4 bg-gray-500" size="lg">
                <Text className="text-white font-bold text-center">
                    Custom PIN Code{"\n"}(Not recommended)
                </Text>
            </Button>
        </View>
    )
}

export default AuthOptions