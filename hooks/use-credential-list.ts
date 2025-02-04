import { useCallback, useState } from "react";
import { ViewToken } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import { showToastWithGravity } from "~/lib/utils";
import useCredentialStore from "~/store/useCredentialStore";

const useCredentialList = () => {
    const { loadCredentials, filteredCredentials, starredCredentials, removeCredential, toggleStar } = useCredentialStore();
    const [expandedCard, setExpandedCard] = useState<string | null>(null)

    const handleCardPress = useCallback((service: string) => {
        setExpandedCard((current) => (current === service ? null : service))
    }, []);

    const handleToggleStar = useCallback(
        async (service: string) => await toggleStar(service),
        [toggleStar],
    )

    const handleRemove = useCallback(
        async (service: string) => {
            await removeCredential(service);
            showToastWithGravity(`${service} deleted successfully`)
        },
        [removeCredential],
    )

    const viewableItems = useSharedValue<ViewToken[]>([]);

    return {
        filteredCredentials,
        starredCredentials,
        viewableItems,
        expandedCard,
        loadCredentials,
        handleCardPress,
        handleToggleStar,
        handleRemove,
    }
}

export default useCredentialList;