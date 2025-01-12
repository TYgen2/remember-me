import { Text, View } from "react-native"
import { Button } from "~/components/ui/button";
import AlertPopup from "~/components/alert-popup";
import useAlert from "~/hooks/use-alert";
import { authenticateForFirstTime, openPasswordSettings } from "~/lib/auth";

const GetStarted = () => {
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage } = useAlert();

    return (
        <View className="justify-center items-center">
            <AlertPopup alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={alertMessage}
                action={openPasswordSettings} actionText="Open settings" hasCancelAction={true} />
            <Button className="w-3/4" size="lg" onPress={() => authenticateForFirstTime({ setAlertOpen, setAlertMessage })}>
                <Text className="text-white font-bold">Get started</Text>
            </Button>
        </View>
    )
}

export default GetStarted;