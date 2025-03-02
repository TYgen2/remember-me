import { useEffect } from "react";
import { FlatList, Image, View } from "react-native";
import AddButton from "~/components/main/bottom-sheet/add-button";
import Empty from "~/components/main/empty";
import ServiceCard from "~/components/main/service-card";
import { useThemeContext } from "~/context/theme-context";
import useCredentialList from "~/hooks/use-credential-list";
import { colors } from "~/lib/colors";

const MainScreen = () => {
  const {
    filteredCredentials,
    viewableItems,
    expandedCard,
    isLoading,
    loadCredentials,
    handleToggleStar,
    handleCardPress,
    handleRemove,
  } = useCredentialList();

  useEffect(() => {
    loadCredentials();
  }, [loadCredentials]);

  const { theme } = useThemeContext();
  const activeColor = colors[theme];

  if (isLoading) {
    return (
      <View
        className="flex-1 items-center justify-center"
        style={{ backgroundColor: activeColor.primary }}
      >
        <Image
          source={require("~/assets/icon/kurukuru.gif")}
          className="h-24 w-24"
        />
      </View>
    );
  }

  return (
    <View
      className="flex-1"
      style={{ paddingTop: 60, backgroundColor: activeColor.primary }}
    >
      <AddButton />
      <FlatList
        renderItem={({ item }) => (
          <ServiceCard
            key={`${item.service}-${item.isStarred}`}
            item={item}
            viewableItems={viewableItems}
            removeCredential={handleRemove}
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
