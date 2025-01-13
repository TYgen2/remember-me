import { ServiceInputCheckType } from "~/types/service-input"
import { Button } from "../ui/button"
import { Text } from "react-native"
import { View } from "react-native"

interface CheckButtonProps {
    exists: ServiceInputCheckType | undefined
    checkExistingService: (serviceName: string) => Promise<void>
    value: string
}

const CheckButton = ({ exists, checkExistingService, value }: CheckButtonProps) => {
    if (exists === undefined) {
        return (
            <Button className="w-24 bg-slate-700"
                onPress={() => checkExistingService(value)}
                disabled={value === ""}>
                <Text className="text-white font-bold">
                    Check
                </Text>
            </Button>
        )
    } else {
        return (
            <View className="w-24 justify-center items-center">
                {exists === "EXISTS" ? (
                    <Text className="text-yellow-400 font-bold text-center text-sm">
                        ❗{"\n"}Already exists
                    </Text>
                ) : exists === "OKAY" ? (
                    <Text className="text-green-700 font-bold text-center text-sm" >
                        👌🏻{"\n"}No problem
                    </Text>
                ) : (
                    <Text className="text-red-700 font-bold text-center text-sm" >
                        ❌{"\n"}Not allowed
                    </Text>
                )}
            </View>
        )
    }
}

export default CheckButton;