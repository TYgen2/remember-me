import { Text } from "react-native"
import { Button } from "../ui/button"
import {
    BottomSheetModal,
    BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useCallback, useRef } from "react";
import NewServiceForm from "./new-service-form";

const AddButton = () => {
    // ref
    const bottomSheetModalRef = useRef<BottomSheetModal>(null);

    // callbacks
    const handlePresentModalPress = useCallback(() => {
        bottomSheetModalRef.current?.present();
    }, []);
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <>
            <Button className="h-20 w-20 rounded-full bg-primary absolute bottom-10 right-10 z-10" size="icon" onPress={handlePresentModalPress}>
                <Text className="text-3xl font-bold text-white">+</Text>
            </Button>

            <BottomSheetModal
                ref={bottomSheetModalRef}
                onChange={handleSheetChanges}
                snapPoints={['50%']}
                enableDynamicSizing={false}
                enableOverDrag={false}
                backgroundStyle={{ backgroundColor: 'black' }}
                handleIndicatorStyle={{ backgroundColor: 'white' }}
            >
                <BottomSheetView className="flex flex-1 bg-black px-8">
                    <Text className="text-3xl font-bold text-white text-center py-4">New credential 🔑</Text>
                    <NewServiceForm />
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}

export default AddButton