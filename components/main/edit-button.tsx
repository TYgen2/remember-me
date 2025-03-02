import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Button } from "../ui/button";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CredentialSchema } from "~/schema/zod-schema";
import { z } from "zod";
import useCredentialStore from "~/store/useCredentialStore";
import { showToastWithGravity } from "~/lib/utils";

interface EditCredentialDialogProps {
  currentService: string;
  currentLoginId: string;
  currentPassword: string;
}

type FormFields = z.infer<typeof CredentialSchema>;

const EditButton = ({
  currentService,
  currentLoginId,
  currentPassword,
}: EditCredentialDialogProps) => {
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      serviceName: currentService,
      login_id: currentLoginId,
      password: currentPassword,
    },
    resolver: zodResolver(CredentialSchema),
  });

  const { updateCredential } = useCredentialStore();

  const onSubmit = async (data: FormFields) => {
    try {
      await updateCredential(currentService, {
        service: data.serviceName,
        login_id: data.login_id,
        password: data.password,
      });
      showToastWithGravity("Credential updated!");
    } catch (error: any) {
      setError("serviceName", { message: error.message });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <TouchableOpacity
          className="rounded-md bg-amber-200 p-1"
          activeOpacity={0.8}
          onPress={() => console.log("gg")}
        >
          <MaterialIcons name="edit" size={24} color="black" />
        </TouchableOpacity>
      </DialogTrigger>

      <DialogContent className="min-w-[380px] border-gray-700 bg-[#100c0c]">
        <DialogHeader className="mb-8">
          <DialogTitle className="text-center !text-2xl font-bold text-white">
            Edit credential
          </DialogTitle>
        </DialogHeader>

        <View className="w-full gap-2">
          {/* Service name field */}
          <View className="w-full gap-1">
            <Label className="font-bold text-white">Service name</Label>
            <Controller
              control={control}
              name="serviceName"
              render={({ field: { onChange, value } }) => (
                <Input
                  className="border-gray-700 bg-[#100c0c] text-white"
                  onChangeText={(e) => {
                    onChange(e);
                  }}
                  value={value}
                />
              )}
            />
            {errors.serviceName && (
              <Text className="text-red-500">{errors.serviceName.message}</Text>
            )}
          </View>

          {/* Login ID field */}
          <View className="w-full gap-1">
            <Label className="font-bold text-white">Login ID</Label>
            <Controller
              control={control}
              name="login_id"
              render={({ field: { onChange, value } }) => (
                <Input
                  className="border-gray-700 bg-[#100c0c] text-white"
                  onChangeText={(e) => {
                    onChange(e);
                  }}
                  value={value}
                />
              )}
            />
            {errors.login_id && (
              <Text className="text-red-500">{errors.login_id.message}</Text>
            )}
          </View>

          {/* Password field */}
          <View className="w-full gap-1">
            <Label className="font-bold text-white">Password</Label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  className="border-gray-700 bg-[#100c0c] text-white"
                  onChangeText={(e) => {
                    onChange(e);
                  }}
                  value={value}
                />
              )}
            />
            {errors.password && (
              <Text className="text-red-500">{errors.password.message}</Text>
            )}
          </View>
        </View>

        <DialogFooter className="mt-8">
          <Button
            className="w-full bg-amber-200"
            onPress={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <Text className="font-bold">Save</Text>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditButton;
