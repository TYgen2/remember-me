import { Text, View } from "react-native"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import AntDesign from '@expo/vector-icons/AntDesign';
import { useForm, Controller } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"

const schema = z.object({
    serviceName: z.string(),
    email: z.string().email(),
    password: z.string(),
});

type FormFields = z.infer<typeof schema>;

const NewServiceForm = () => {
    const { control, handleSubmit, setError, formState: { errors, isSubmitting } } = useForm<FormFields>({
        defaultValues: {
            serviceName: "",
            email: "",
            password: "",
        },
        resolver: zodResolver(schema)
    });
    const onSubmit = (data: FormFields) => console.log(data);

    return (
        <View className="flex flex-1 justify-start items-center">
            <View className="w-full h-24">
                <Label className="text-white font-bold">Service name</Label>
                <View className="flex flex-row gap-2">
                    <Controller
                        control={control}
                        name="serviceName"
                        render={({ field: { onChange, value } }) => (
                            <Input id="email" placeholder="e.g Facebook, Youtube..." className="flex-1" onChangeText={onChange} value={value} />
                        )}
                    />
                    <Button className="bg-slate-700">
                        <Text className="text-white font-bold">Check</Text>
                    </Button>
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

            <Button className="w-2/7 flex-row gap-2 mr-auto mt-2" onPress={handleSubmit(onSubmit)}>
                <AntDesign name="pluscircleo" size={16} color="white" />
                <Text className="text-white font-bold">Add more</Text>
            </Button>
        </View>
    )
}

export default NewServiceForm