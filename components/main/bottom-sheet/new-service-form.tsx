import { Text, View } from "react-native"
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
            email: "",
            password: "",
        },
        resolver: zodResolver(CredentialSchema)
    });

    const onSubmit = async (data: FormFields) => {
        try {
            await addCredential({ service: data.serviceName, email: data.email, password: data.password });
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
                <Label className="text-white font-bold">Email</Label>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, value } }) => (
                        <Input id="email" className="w-full" onChangeText={onChange} value={value} />
                    )}
                />
                {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}
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
                <Button className="w-2/7 flex-row gap-2 mt-2">
                    <AntDesign name="pluscircleo" size={16} color="white" />
                    <Text className="text-white font-bold">Add more</Text>
                </Button>

                <Button className="w-16 h-16 rounded-full bg-green-300"
                    onPress={handleSubmit(onSubmit)} size="icon" disabled={isSubmitting}>
                    <Feather name="check" size={28} color="black" />
                </Button>
            </View>
        </View>
    )
}

export default NewServiceForm