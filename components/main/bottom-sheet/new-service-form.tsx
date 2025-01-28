import { StyleSheet, Text, View } from "react-native"
import { Label } from "../../ui/label"
import { Input } from "../../ui/input"
import { Button } from "../../ui/button"
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import useCredentialStore from "~/store/useCredentialStore";
import { CredentialSchema } from "~/schema/zod-schema";
import { z } from "zod";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState } from "react";
import { prohibitedServiceName } from "~/lib/prohibited-service-name";
import { ServiceInputCheckType } from "~/types/service-input";
import CheckButton from "./check-button";
import { LinearGradient } from 'expo-linear-gradient';

type FormFields = z.infer<typeof CredentialSchema>;
type NewServiceFormProps = {
    closeModal: () => void;
};

const NewServiceForm = ({ closeModal }: NewServiceFormProps) => {
    const [exists, setExists] = useState<ServiceInputCheckType | undefined>(undefined);

    const { addCredential } = useCredentialStore();
    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
        defaultValues: {
            serviceName: "",
            login_id: "",
            password: "",
        },
        resolver: zodResolver(CredentialSchema)
    });

    const onSubmit = async (data: FormFields) => {
        try {
            await addCredential({ service: data.serviceName, login_id: data.login_id, password: data.password });
            closeModal();
        } catch (error) {
            console.error("Error adding credential", error);
            setError("serviceName", { message: "Failed to add credential." });
        }
    }

    const checkExistingService = async (serviceName: string) => {
        if (prohibitedServiceName.includes(serviceName)) {
            setExists("NOT_ALLOWED");
            return;
        }

        try {
            const existing = await AsyncStorage.getItem(serviceName);
            setExists(existing !== null ? "EXISTS" : "OKAY");
        } catch (error) {
            console.error("Error checking existing service", error);
        }
    }

    return (
        <View className="flex justify-start items-center">
            <View className="w-full h-24">
                <Label className="text-white font-bold">Service name</Label>
                <View className="flex flex-row gap-2">
                    <Controller
                        control={control}
                        name="serviceName"
                        render={({ field: { onChange, value } }) => (
                            <>
                                <Input id="email" placeholder="e.g facebook, youtube..." className="flex-1" onChangeText={(e) => {
                                    onChange(e);
                                    setExists(undefined);
                                }} value={value} />
                                <CheckButton exists={exists} checkExistingService={checkExistingService} value={value} />
                            </>
                        )}
                    />
                </View>
                {errors.serviceName && <Text className="text-red-500">{errors.serviceName.message}</Text>}
            </View>

            <View className="w-full h-24">
                <Label className="text-white font-bold">Login ID</Label>
                <Controller
                    control={control}
                    name="login_id"
                    render={({ field: { onChange, value } }) => (
                        <Input id="email" className="w-full" onChangeText={onChange} value={value} />
                    )}
                />
                {errors.login_id && <Text className="text-red-500">{errors.login_id.message}</Text>}
            </View>

            <View className="w-full h-24">
                <Label className="text-white font-bold">Password</Label>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, value } }) => (
                        <Input id="password" className="w-full" onChangeText={onChange} value={value} />
                    )}
                />
                {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}
            </View>

            <View className="flex flex-row justify-between w-full">
                <Button className="w-2/7 flex-row gap-2 mt-2 bg-black">
                    <AntDesign name="pluscircleo" size={16} color="white" />
                    <Text className="text-white font-bold">Add more</Text>
                </Button>

                <Button className="w-16 h-16 rounded-full overflow-hidden"
                    onPress={handleSubmit(onSubmit)} size="icon" disabled={isSubmitting}>
                    <LinearGradient
                        colors={['#E8F5C8', '#9FA5D5']}
                        style={styles.background}
                    />
                    <Feather name="check" size={28} color="black" />
                </Button>
            </View>
        </View>
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

export default NewServiceForm