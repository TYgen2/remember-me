import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLocalStorage = (key: string) => {
  const setItem = async (value: unknown) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      throw new Error("Failed to set item from local storage");
    }
  };

  const getItem = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch {
      throw new Error("Failed to get item from local storage");
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      throw new Error("Failed to remove item from local storage");
    }
  };

  return { setItem, getItem, removeItem };
};
