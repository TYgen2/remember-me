import { useEffect, useState } from "react";
import { FlatList, View, ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import AddButton from "~/components/main/bottom-sheet/add-button";
import Empty from "~/components/main/empty";
import ServiceCard from "~/components/main/service-card";
import useCredentialStore from "~/store/useCredentialStore";

const MainScreen = () => {
  const { loadCredentials, filteredCredentials, removeCredential } = useCredentialStore();

  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const handleCardPress = (service: string) => {
    setExpandedCard((current) => (current === service ? null : service))
  }

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  const viewableItems = useSharedValue<ViewToken[]>([]);

  return (
    <View className="flex-1 bg-black" style={{ paddingTop: 60 }}>
      <AddButton />
      <FlatList
        renderItem={({ item }) => (
          <ServiceCard
            item={item}
            viewableItems={viewableItems}
            removeCredential={removeCredential}
            isExpanded={expandedCard === item.service}
            onPress={() => handleCardPress(item.service)}
          />
        )}
        data={filteredCredentials}
        ListEmptyComponent={<Empty />}
        keyExtractor={(item) => item.service}
        contentContainerStyle={{ padding: 20, flexGrow: 1 }}
        onViewableItemsChanged={({ viewableItems: vItems }) => {
          viewableItems.value = vItems;
        }}
      />
    </View>
  );
};

export default MainScreen;
