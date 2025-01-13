import { useEffect } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import AddButton from "~/components/main/add-button";
import { Card } from "~/components/ui/card";
import useCredentialStore from "~/store/useCredentialStore";

const MainScreen = () => {
  const { loadCredentials, credentials, removeCredential } = useCredentialStore();

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  return (
    <View className="flex-1 bg-green-100">
      <AddButton />
      <FlatList
        data={credentials}
        numColumns={2}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <Pressable className="w-[48%] mb-4" onPress={() => removeCredential(item.service)}>
            <Card className="h-40 bg-orange-200 rounded-2xl items-center justify-center">
              <Text>{item.service}</Text>
            </Card>
          </Pressable>
        )}
      />
    </View>
  );
};
export default MainScreen;
