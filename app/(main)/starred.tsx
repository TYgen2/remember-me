import { View } from "react-native"
import { FlatList } from "react-native-gesture-handler";
import Empty from "~/components/main/empty";
import ServiceCard from "~/components/main/service-card";
import { useThemeContext } from "~/context/theme-context";
import useCredentialList from "~/hooks/use-credential-list";
import { colors } from "~/lib/colors";

const StarredPage = () => {
    const {
        starredCredentials,
        handleToggleStar,
        removeCredential,
        expandedCard,
        handleCardPress,
        viewableItems
    } = useCredentialList();

    const { theme } = useThemeContext()
    const activeColor = colors[theme]

    return (
        <View className="flex-1" style={{ paddingTop: 60, backgroundColor: activeColor.primary }}>
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
                data={starredCredentials}
                ListEmptyComponent={<Empty />}
                keyExtractor={(item) => item.service}
                contentContainerStyle={{ padding: 20, flexGrow: 1 }}
                onViewableItemsChanged={({ viewableItems: vItems }) => {
                    viewableItems.value = vItems
                }}
            />
        </View>
    )
}

export default StarredPage