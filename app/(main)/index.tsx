import { useCallback, useEffect } from "react";
import { FlatList, View } from "react-native";
import AddButton from "~/components/main/bottom-sheet/add-button";
import ServiceCard from "~/components/main/service-card";
import useCredentialStore from "~/store/useCredentialStore";
import { Credential } from "~/types/credential";

const MainScreen = () => {
  const { loadCredentials, filteredCredentials, removeCredential } = useCredentialStore();

  const renderItem = useCallback(({ item }: { item: Credential }) => {
    return <ServiceCard item={item} removeCredential={removeCredential} />
  }, []);

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: 60 }}>
      <AddButton />
      <FlatList
        data={filteredCredentials}
        numColumns={2}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={renderItem}
      />
    </View>
  );
};
export default MainScreen;
