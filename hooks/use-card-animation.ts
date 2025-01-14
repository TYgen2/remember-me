import { useRef, useState } from "react";
import { Animated } from "react-native";

const useCardAnimation = () => {
    const [isFlipped, setIsFlipped] = useState(false);
    const flipAnimation = useRef(new Animated.Value(0)).current;

    const frontInterpolate = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ["0deg", "180deg"],
    })

    const flipToFrontStyle = {
        transform: [
            { rotateY: frontInterpolate }
        ]
    }

    const backInterpolate = flipAnimation.interpolate({
        inputRange: [0, 180],
        outputRange: ["180deg", "360deg"],
    })

    const flipToBackStyle = {
        transform: [
            { rotateY: backInterpolate }
        ]
    }

    const flipCard = () => {
        if (isFlipped) {
            Animated.spring(flipAnimation, {
                toValue: 0,
                useNativeDriver: true,
                friction: 8,
                tension: 10,
            }).start();

        } else {
            Animated.spring(flipAnimation, {
                toValue: 180,
                useNativeDriver: true,
                friction: 8,
                tension: 10,
            }).start();

        }
        setIsFlipped(!isFlipped)
    }

    return {
        isFlipped,
        flipCard,
        flipAnimation,
        flipToFrontStyle,
        flipToBackStyle
    }
}

export default useCardAnimation