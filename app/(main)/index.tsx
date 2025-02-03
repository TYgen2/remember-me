import { useCallback, useEffect, useState } from "react";
import { FlatList, View, ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import AddButton from "~/components/main/bottom-sheet/add-button";
import Empty from "~/components/main/empty";
import ServiceCard from "~/components/main/service-card";
import { useThemeContext } from "~/context/theme-context";
import { colors } from "~/lib/colors";
import useCredentialStore from "~/store/useCredentialStore";

const MainScreen = () => {
  const { loadCredentials, filteredCredentials, removeCredential, toggleStar } = useCredentialStore();

  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [, setForceUpdate] = useState({})

  const handleCardPress = useCallback((service: string) => {
    setExpandedCard((current) => (current === service ? null : service))
  }, []);

  const handleToggleStar = useCallback(
    async (service: string) => {
      await toggleStar(service)
      setForceUpdate({}) // Force a re-render
    },
    [toggleStar],
  )

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  const viewableItems = useSharedValue<ViewToken[]>([]);

  const { theme } = useThemeContext();
  const activeColor = colors[theme];

  return (
    <View className="flex-1" style={{ paddingTop: 60, backgroundColor: activeColor.primary }}>
      <AddButton />
      <FlatList
        renderItem={({ item }) => (
          <ServiceCard
            key={`${item.service}-${item.isStarred}`}
            item={item}
            viewableItems={viewableItems}
            removeCredential={removeCredential}
            toggleStar={handleToggleStar}
            isExpanded={expandedCard === item.service}
            onPress={() => handleCardPress(item.service)}
            cardGradient={activeColor.cardGradient}
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
