import { Text, View } from "react-native"
import { Button } from "~/components/ui/button";
import AlertPopup from "~/components/alert-popup";
import useAlert from "~/hooks/use-alert";
import useAuth from "~/hooks/use-auth";

const GetStarted = () => {
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage } = useAlert();
    const { authenticateForFirstTime, openPasswordSettings } = useAuth({ setAlertOpen, setAlertMessage });

    return (
        <View className="justify-center items-center">
            <AlertPopup alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={alertMessage}
                action={openPasswordSettings} actionText="Open settings" hasCancelAction={true} />
            <Button className="w-3/4" size="lg" onPress={authenticateForFirstTime}>
                <Text className="text-white font-bold">Get started</Text>
            </Button>
        </View>
    )
}

export default GetStarted;