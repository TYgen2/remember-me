import { ViewToken } from "react-native";
import { useAnimatedStyle } from "react-native-reanimated";
import { SharedValue, withTiming } from "react-native-reanimated";
import { Credential } from "~/types/credential";

interface CardAnimationProps {
    item: Credential
    viewableItems: SharedValue<ViewToken[]>
    isExpanded: boolean
}

const useCardAnimation = ({ item, viewableItems, isExpanded }: CardAnimationProps) => {
    const rStyle = useAnimatedStyle(() => {
        const isVisible = Boolean(viewableItems.value.filter((item) => item.isViewable)
            .find((viewableItem) => viewableItem.item.service === item.service));

        return {
            opacity: withTiming(isVisible ? 1 : 0),
            transform: [
                {
                    scale: withTiming(isVisible ? 1 : 0.6)
                }
            ]
        }
    }, [])

    const rContentStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(isExpanded ? 120 : 70, { duration: 300 }),
            transform: [
                {
                    scale: withTiming(1, { duration: 300 }),
                },
            ],
        }
    }, [isExpanded])

    const rDetailsStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming(isExpanded ? 1 : 0, { duration: 200 }),
            transform: [
                {
                    translateY: withTiming(isExpanded ? 0 : 20, { duration: 300 }),
                },
            ],
        }
    }, [isExpanded])

    return {
        rStyle,
        rContentStyle,
        rDetailsStyle
    }
}

export default useCardAnimation;