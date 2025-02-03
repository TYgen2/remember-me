import { useCallback, useEffect, useState } from "react";
import { View, ViewToken } from "react-native"
import { FlatList } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import Empty from "~/components/main/empty";
import ServiceCard from "~/components/main/service-card";
import { useThemeContext } from "~/context/theme-context";
import { colors } from "~/lib/colors";
import useCredentialStore from "~/store/useCredentialStore";

const StarredPage = () => {
    const { getStarredCredentials, removeCredential, toggleStar } = useCredentialStore()

    const [starredCredentials, setStarredCredentials] = useState(getStarredCredentials())
    const [expandedCard, setExpandedCard] = useState<string | null>(null)
    const [, setForceUpdate] = useState({})

    const handleCardPress = useCallback((service: string) => {
        setExpandedCard((current) => (current === service ? null : service))
    }, [])

    const handleToggleStar = useCallback(
        async (service: string) => {
            await toggleStar(service)
            setStarredCredentials(getStarredCredentials())
            setForceUpdate({}) // Force a re-render
        },
        [toggleStar, getStarredCredentials],
    )

    const handleRemoveCredential = useCallback(
        (service: string) => {
            removeCredential(service)
            setStarredCredentials(getStarredCredentials())
        },
        [removeCredential, getStarredCredentials],
    )

    useEffect(() => {
        const unsubscribe = useCredentialStore.subscribe(() => {
            setStarredCredentials(getStarredCredentials())
        })
        return unsubscribe
    }, [getStarredCredentials])

    const viewableItems = useSharedValue<ViewToken[]>([])

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
                        removeCredential={handleRemoveCredential}
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