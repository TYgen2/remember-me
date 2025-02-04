import { useCallback, useState } from "react";
import { ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import useCredentialStore from "~/store/useCredentialStore";

const useCredentialList = () => {
    const { loadCredentials, filteredCredentials, starredCredentials, removeCredential, toggleStar } = useCredentialStore();

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

    const viewableItems = useSharedValue<ViewToken[]>([]);

    return {
        loadCredentials,
        filteredCredentials,
        starredCredentials,
        expandedCard,
        handleCardPress,
        handleToggleStar,
        removeCredential,
        viewableItems
    }
}

export default useCredentialList;