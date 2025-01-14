import React, { useState, useRef, useCallback, useEffect } from 'react'
import { View, Pressable, StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import Animated, {
    useAnimatedStyle,
    interpolateColor
} from 'react-native-reanimated'
import { TextInput } from 'react-native-gesture-handler'
import useSearch from '~/hooks/use-search'
import useSearchAnimation from '~/hooks/use-search-animation'

const SearchBox = () => {
    const inputRef = useRef<TextInput>(null)
    const { searchText, handleSearchInput } = useSearch();
    const { width, colorProgress, expandSearchBar, collapseSearchBar } = useSearchAnimation();

    const [isExpanded, setIsExpanded] = useState(false)

    const animatedStyles = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            colorProgress.value,
            [0, 1],
            ['rgba(0, 0, 0, 0)', 'rgb(255, 255, 255)']
        )
        const borderColor = interpolateColor(
            colorProgress.value,
            [0, 1],
            ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)']
        )

        return {
            width: width.value,
            backgroundColor,
            borderColor,
            borderWidth: colorProgress.value,
        }
    })

    const handlePress = useCallback(() => {
        if (!isExpanded) {
            setIsExpanded(true)
            expandSearchBar(() => inputRef.current?.focus())
        }
    }, [isExpanded, expandSearchBar])

    const closeSearchBar = useCallback(() => {
        Keyboard.dismiss()
        setIsExpanded(false)
        collapseSearchBar()
    }, [collapseSearchBar])

    useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            closeSearchBar
        )

        return () => {
            keyboardDidHideListener.remove()
        }
    }, [closeSearchBar])

    return (
        <TouchableWithoutFeedback onPress={closeSearchBar}>
            <View style={styles.wrapper}>
                <Animated.View style={[styles.container, animatedStyles]}>
                    <Pressable
                        onPress={handlePress}
                        style={styles.searchContainer}
                        android_ripple={null}
                        android_disableSound={true}
                    >
                        <AntDesign
                            name={isExpanded ? "close" : "search1"}
                            size={24}
                            color={isExpanded ? 'black' : 'white'}
                            onPress={isExpanded ? closeSearchBar : handlePress}
                        />
                        {isExpanded && (
                            <TextInput
                                ref={inputRef}
                                placeholder="Search services..."
                                style={styles.input}
                                value={searchText}
                                onChangeText={handleSearchInput}
                                onSubmitEditing={closeSearchBar}
                            />
                        )}
                    </Pressable>
                </Animated.View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    wrapper: {
        position: 'relative',
        zIndex: 1,
    },
    container: {
        borderRadius: 9999, // rounded-full
        padding: 8,
        marginRight: 8,
        overflow: 'hidden',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    input: {
        flex: 1,
        fontSize: 16,
        padding: 0,
    },
})

export default SearchBox

