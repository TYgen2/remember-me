import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewToken,
} from "react-native";
import { Credential } from "~/types/credential";
import { LinearGradient } from "expo-linear-gradient";
import Animated, { SharedValue } from "react-native-reanimated";
import useCardAnimation from "~/hooks/use-card-animation";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import useAlert from "~/hooks/use-alert";
import AlertPopup from "../alert-popup";
import { memo, useCallback } from "react";
import StarButton from "./star-button";
import { showToastWithGravity } from "~/lib/utils";
import EditButton from "./edit-button";

interface ServiceCardProps {
  item: Credential;
  viewableItems: SharedValue<ViewToken[]>;
  removeCredential: (serviceName: string) => void;
  toggleStar: (serviceName: string) => void;
  isExpanded: boolean;
  onPress: () => void;
  cardGradient: readonly [string, string, ...string[]];
}

const areEqual = (prevProps: ServiceCardProps, nextProps: ServiceCardProps) => {
  // Only re-render if the `isExpanded` prop changes for this specific card
  return (
    prevProps.isExpanded === nextProps.isExpanded &&
    prevProps.item.service === nextProps.item.service &&
    prevProps.cardGradient === nextProps.cardGradient &&
    prevProps.item.isStarred === nextProps.item.isStarred
  );
};

const ServiceCard = memo(
  ({
    item,
    viewableItems,
    removeCredential,
    toggleStar,
    isExpanded,
    onPress,
    cardGradient,
  }: ServiceCardProps) => {
    const { rStyle, rContentStyle, rDetailsStyle } = useCardAnimation({
      item,
      viewableItems,
      isExpanded,
    });
    const { alertOpen, setAlertOpen, alertMessage, setAlertMessage } =
      useAlert();

    // Pop up alert when delete is pressed
    const onPressDelete = useCallback(() => {
      setAlertOpen(true);
      setAlertMessage({
        title: "🗑️ Delete credential",
        content: `Are you sure you want to delete the credential for ${item.service}?`,
      });
    }, [item.service, setAlertOpen, setAlertMessage]);

    // If alert confirmed, delete the credential
    const handleDelete = useCallback(() => {
      removeCredential(item.service);
      setAlertOpen(false);
    }, [item.service, removeCredential, setAlertOpen]);

    const handleToggleStar = useCallback(() => {
      toggleStar(item.service);
      if (item.isStarred) {
        showToastWithGravity(`${item.service} is removed from favorites`);
      } else {
        showToastWithGravity(`${item.service} is added to favorites!`);
      }
    }, [item.service, toggleStar]);

    return (
      <Pressable onPress={onPress}>
        <AlertPopup
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          message={alertMessage}
          hasCancelAction={true}
          action={handleDelete}
          actionText="Delete"
          actionBgColor="bg-red-500"
        />

        <Animated.View
          className="mb-4 w-full overflow-hidden px-4"
          style={[rStyle, rContentStyle]}
        >
          <LinearGradient colors={cardGradient} style={styles.background} />
          <View className="flex-row items-end">
            <Text className="mt-6 text-2xl font-bold">{item.service}</Text>
            <StarButton
              isStarred={item.isStarred || false}
              onPress={handleToggleStar}
            />
          </View>

          <Animated.View
            className="mt-4 flex-row items-center"
            style={rDetailsStyle}
          >
            <View>
              <Text className="mb-2 text-gray-700">
                <Text className="font-semibold">Login ID: </Text>
                {item.login_id}
              </Text>
              <Text className="text-gray-700">
                <Text className="font-semibold">Password: </Text>
                {item.password}
              </Text>
            </View>

            <View className="ml-auto flex-row items-center gap-2">
              <EditButton
                currentService={item.service}
                currentLoginId={item.login_id}
                currentPassword={item.password}
              />

              <TouchableOpacity
                className="rounded-md bg-red-500 p-1"
                activeOpacity={0.8}
                onPress={onPressDelete}
              >
                <MaterialIcons name="delete-forever" size={24} color="black" />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
      </Pressable>
    );
  },
  areEqual,
);

const styles = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
    borderRadius: 12,
  },
});

export default ServiceCard;
