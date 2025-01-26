import { useCallback } from "react";
import { useSharedValue, withSpring, withTiming } from "react-native-reanimated"
import { getScreenWidth } from "~/lib/utils";

const useSearchAnimation = () => {
  const width = useSharedValue(40)
  const colorProgress = useSharedValue(0)

  const screenWidth = getScreenWidth();

  const expandSearchBar = useCallback(() => {
    width.value = withSpring(screenWidth - 56, {
      damping: 15,
      stiffness: 100,
    });
    colorProgress.value = withTiming(1, { duration: 200 });
  }, [screenWidth, width, colorProgress]);

  const collapseSearchBar = useCallback(() => {
    width.value = withTiming(40, {
      duration: 300,
    });
    colorProgress.value = withTiming(0, { duration: 200 });
  }, [width, colorProgress]);

  return {
    width,
    colorProgress,
    expandSearchBar,
    collapseSearchBar,
  };
}

export default useSearchAnimation