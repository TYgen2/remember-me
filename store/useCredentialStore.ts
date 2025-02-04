import { create } from "zustand";
import { Credential } from "~/types/credential";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

interface CredentialStore {
    credentials: Credential[];
    filteredCredentials: Credential[];
    starredCredentials: Credential[];
    searchQuery: string;
    isLoading: boolean;
    addCredential: (credential: Credential) => Promise<void>;
    removeCredential: (service: string) => Promise<void>;
    loadCredentials: () => Promise<void>;
    toggleStar: (service: string) => Promise<void>;
    setSearchQuery: (query: string) => void;
}

const filterCredentials = (credentials: Credential[], query: string) => {
    const normalizedQuery = query.toLowerCase().trim()
    if (!normalizedQuery) return credentials

    return credentials.filter((credential) => credential.service.toLowerCase().includes(normalizedQuery))
}

const useCredentialStore = create<CredentialStore>((set, get) => ({
    credentials: [],
    filteredCredentials: [],
    starredCredentials: [],
    searchQuery: '',
    isLoading: true,

    addCredential: async (newCredential) => {
        await SecureStore.setItemAsync(newCredential.service, JSON.stringify(newCredential));
        await AsyncStorage.setItem(newCredential.service, "EXISTS");

        set((state) => {
            const existingCredentialIndex = state.credentials.findIndex((cred) => cred.service === newCredential.service);

            if (existingCredentialIndex !== -1) {
                // Update existing credential
                const updatedCredentials = [...state.credentials];
                updatedCredentials[existingCredentialIndex] = newCredential;

                return {
                    credentials: updatedCredentials,
                    filteredCredentials: filterCredentials(updatedCredentials, state.searchQuery),
                };
            } else {
                // Add new credential
                const newCredentials = [...state.credentials, newCredential];

                return {
                    credentials: newCredentials,
                    filteredCredentials: filterCredentials(newCredentials, state.searchQuery),
                };
            }
        });
    },
    loadCredentials: async () => {
        try {
            const keys = await AsyncStorage.getAllKeys()
            const fetchedCredentials = await Promise.all(
                keys.map(async (service) => {
                    const credential = await SecureStore.getItemAsync(service)
                    return credential ? JSON.parse(credential) : null
                }),
            )
            const validCredentials = fetchedCredentials.filter((cred): cred is Credential => cred !== null)

            set({
                credentials: validCredentials,
                filteredCredentials: validCredentials,
                starredCredentials: validCredentials.filter((cred) => cred.isStarred),
            })
        } catch (error) {
            console.error("Failed to load credentials:", error)
        } finally {
            set({ isLoading: false })
        }
    },
    removeCredential: async (service) => {
        await SecureStore.deleteItemAsync(service);
        await AsyncStorage.removeItem(service);
        set((state) => {
            const newCredentials = state.credentials.filter((cred) => cred.service !== service);
            return {
                credentials: newCredentials,
                filteredCredentials: filterCredentials(newCredentials, state.searchQuery),
                starredCredentials: state.starredCredentials.filter((cred) => cred.service !== service),
            };
        });
    },
    toggleStar: async (service: string) => {
        try {
            const credential = get().credentials.find((cred) => cred.service === service)
            if (!credential) return

            const updatedCredential = {
                ...credential,
                isStarred: !credential.isStarred,
            }

            await SecureStore.setItemAsync(service, JSON.stringify(updatedCredential))

            set((state) => {
                const updatedCredentials = state.credentials.map((cred) =>
                    cred.service === service ? updatedCredential : cred,
                )
                return {
                    credentials: updatedCredentials,
                    filteredCredentials: filterCredentials(updatedCredentials, state.searchQuery),
                    starredCredentials: updatedCredentials.filter((cred) => cred.isStarred),
                }
            })
        } catch (error) {
            console.error("Failed to toggle star:", error)
        }
    },
    setSearchQuery: (query: string) => {
        set((state) => ({
            searchQuery: query,
            filteredCredentials: filterCredentials(state.credentials, query),
        }))
    },
}))

export default useCredentialStore;