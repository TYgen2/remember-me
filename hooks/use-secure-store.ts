import * as SecureStore from 'expo-secure-store';

export const useSecureStore = (key: string) => {
    const setSecureValue = async (value: unknown) => {
      try {
        await SecureStore.setItemAsync(key, JSON.stringify(value));
      } catch {
        throw new Error("Failed to set item from Expo secure storage");
      }
    };
  
    const getSecureValue = async () => {
      try {
        const item = await SecureStore.getItemAsync(key);
        return item ? JSON.parse(item) : undefined;
      } catch {
        throw new Error("Failed to get item from Expo secure storage");
      }
    };
  
    const removeSecureValue = async () => {
      try {
        await SecureStore.deleteItemAsync(key);
      } catch {
        throw new Error("Failed to remove item from Expo secure storage");
      }
    };

    return { setSecureValue, getSecureValue, removeSecureValue };
  };

