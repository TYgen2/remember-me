import { create } from "zustand";
import { Credential } from "~/types/credential";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface CredentialStore {
    credentials: Credential[];
    addCredential: (credential: Credential) => Promise<void>;
    removeCredential: (service: string) => Promise<void>;
    loadCredentials: () => Promise<void>;
}

const useCredentialStore = create<CredentialStore>((set) => ({
    credentials: [],
    addCredential: async (newCredential) => {
        await SecureStore.setItemAsync(newCredential.service, JSON.stringify(newCredential));
        await AsyncStorage.setItem(newCredential.service, "EXISTS");
        set((state) => ({
            credentials: [...state.credentials, newCredential]
        }))
    },
    loadCredentials: async () => {
        const keys = await AsyncStorage.getAllKeys();
        const fetchedCredentials = await Promise.all(
            keys.map(async (service) => {
                const credential = await SecureStore.getItemAsync(service);
                return credential ? { service, ...JSON.parse(credential) } : null;
            })
        );
        set({
            credentials: fetchedCredentials.filter((cred): cred is Credential => cred !== null)
        })
    },
    removeCredential: async (service) => {
        await SecureStore.deleteItemAsync(service);
        await AsyncStorage.removeItem(service);
        set((state) => ({
            credentials: state.credentials.filter((cred) => cred.service !== service)
        }))
    }
}))

export default useCredentialStore