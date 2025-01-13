import { Text, View } from "react-native"
import { Button } from "../ui/button"
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from "react";
import NewServiceForm from "./new-service-form";
import AntDesign from '@expo/vector-icons/AntDesign';
import useAlert from "~/hooks/use-alert";
import AlertPopup from "../alert-popup";
import { credentialExplainText } from "~/lib/alert-content-text";

const AddButton = () => {
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage } = useAlert();
    const credentialExplain = () => {
        setAlertOpen(true);
        setAlertMessage({
            title: "🤔 Credentials",
            content: credentialExplainText()
        });
    }

    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleCloseModalPress = useCallback(() => {
        bottomSheetModalRef.current?.close();
    }, []);

    return (
        <>
            <AlertPopup alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={alertMessage} />

            <Button className="h-20 w-20 rounded-full bg-primary absolute bottom-10 right-10 z-10"
                size="icon" onPress={handlePresentModalPress}>
                <Text className="text-3xl font-bold text-white">+</Text>
            </Button>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                enableOverDrag={false}
                backgroundStyle={{ backgroundColor: 'black' }}
                handleIndicatorStyle={{ backgroundColor: 'white' }}
            >
                <BottomSheetView className="bg-black px-8 pb-8">
                    <View className="flex flex-row items-center">
                        <Text className="text-2xl font-bold text-white py-4">New credential 🔑</Text>
                        <AntDesign name="questioncircleo" size={24} color="white" className="ml-auto"
                            onPress={credentialExplain} />
                    </View>
                    <NewServiceForm closeModal={handleCloseModalPress} />
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}

export default AddButton