import { StyleSheet, Text, View } from "react-native"
import { Button } from "../../ui/button"
import {
    BottomSheetBackdrop,
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from "react";
import NewServiceForm from "./new-service-form";
import AntDesign from '@expo/vector-icons/AntDesign';
import useAlert from "~/hooks/use-alert";
import AlertPopup from "../../alert-popup";
import { credentialExplainText } from "~/lib/alert-content-text";
import Fontisto from '@expo/vector-icons/Fontisto';
import { LinearGradient } from 'expo-linear-gradient';

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

    const renderBackdrop = useCallback((props: any) =>
        <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props} />
        , []);

    return (
        <>
            <AlertPopup alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={alertMessage} />

            <Button className="h-20 w-20 rounded-full shadow-lg absolute bottom-10 right-10 z-10 overflow-hidden"
                size="icon" onPress={handlePresentModalPress}>
                <LinearGradient
                    colors={['#F2ECB6', '#A96F44']}
                    style={styles.background}
                />
                <Fontisto name="plus-a" size={24} color="black" />
            </Button>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                enableOverDrag={false}
                backgroundStyle={{ backgroundColor: '#28282B' }}
                handleIndicatorStyle={{ backgroundColor: 'white' }}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView className="px-8 pb-8">
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

const styles = StyleSheet.create({
    background: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        height: '100%'
    },
})

export default AddButton