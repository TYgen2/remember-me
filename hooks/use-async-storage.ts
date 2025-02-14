import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAsyncStorage = (key: string) => {
  const setAsyncValue = async (value: unknown) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch {
      throw new Error("Failed to set item from local storage");
    }
  };

  const getAsyncValue = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch {
      throw new Error("Failed to get item from local storage");
    }
  };

  const removeAsyncValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
    } catch {
      throw new Error("Failed to remove item from local storage");
    }
  };

  return { setAsyncValue, getAsyncValue, removeAsyncValue };
};
