import { create } from "zustand";
import { Credential } from "~/types/credential";
import { useSecureStore } from "~/hooks/use-secure-store";

interface CredentialStore {
  credentials: Credential[];
  filteredCredentials: Credential[];
  starredCredentials: Credential[];
  searchQuery: string;
  isLoading: boolean;
  addCredential: (credential: Credential) => Promise<void>;
  removeCredential: (service: string) => Promise<void>;
  loadCredentials: () => Promise<void>;
  updateCredential: (
    oldService: string,
    updatedCredential: Credential,
  ) => Promise<void>;
  toggleStar: (service: string) => Promise<void>;
  setSearchQuery: (query: string) => void;
}

// An array storing the service names of the credentials
const credentialStore = useSecureStore("CREDENTIALS_INDEX");

const filterCredentials = (credentials: Credential[], query: string) => {
  const normalizedQuery = query.toLowerCase().trim();
  if (!normalizedQuery) return credentials;

  return credentials.filter((credential) =>
    credential.service.toLowerCase().includes(normalizedQuery),
  );
};

const useCredentialStore = create<CredentialStore>((set, get) => ({
  credentials: [],
  filteredCredentials: [],
  starredCredentials: [],
  searchQuery: "",
  isLoading: true,

  addCredential: async (newCredential) => {
    try {
      // Create new credential as a key-value pair
      // e.g. key: "Google", value: { service: "Google", login_id: "JohnCena", password: "youcantseeme" }
      const { setSecureValue } = useSecureStore(newCredential.service);
      await setSecureValue(newCredential);

      // First, check whether the CREDENTIAL_INDEX array already exists
      const existingIndex = (await credentialStore.getSecureValue()) || [];
      // If not, create a new one; otherwise, append the new service
      const newIndex = Array.isArray(existingIndex)
        ? [...new Set([...existingIndex, newCredential.service])]
        : [newCredential.service];
      // Store the updated CREDENTIAL_INDEX array
      await credentialStore.setSecureValue(newIndex);

      set((state) => {
        // Check if the new credential already exists in state
        const existingIndex = state.credentials.findIndex(
          (cred) => cred.service === newCredential.service,
        );

        // If it does, update it; otherwise, add it
        const updatedCredentials =
          existingIndex === -1
            ? [...state.credentials, newCredential]
            : state.credentials.map((cred) =>
                cred.service === newCredential.service ? newCredential : cred,
              );

        return {
          credentials: updatedCredentials,
          filteredCredentials: filterCredentials(
            updatedCredentials,
            state.searchQuery,
          ),
        };
      });
    } catch (error) {
      console.error("Failed to add credential:", error);
    }
  },
  loadCredentials: async () => {
    try {
      const index = (await credentialStore.getSecureValue()) || [];
      if (!Array.isArray(index)) {
        set({ isLoading: false });
        return;
      }

      const credentialPromises = index.map(async (service) => {
        const { getSecureValue } = useSecureStore(service);
        return await getSecureValue();
      });

      const fetchedCredentials = await Promise.all(credentialPromises);
      const validCredentials = fetchedCredentials.filter(Boolean);

      set({
        credentials: validCredentials,
        filteredCredentials: validCredentials,
        starredCredentials: validCredentials.filter((cred) => cred.isStarred),
      });
    } catch (error) {
      console.error("Failed to load credentials:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  removeCredential: async (service) => {
    try {
      const { removeSecureValue } = useSecureStore(service);
      // Remove the credential
      await removeSecureValue();

      // Update the index
      const index = (await credentialStore.getSecureValue()) || [];
      const newIndex = index.filter((name: string) => name !== service);
      await credentialStore.setSecureValue(newIndex);

      set((state) => ({
        credentials: state.credentials.filter(
          (cred) => cred.service !== service,
        ),
        filteredCredentials: filterCredentials(
          state.credentials.filter((cred) => cred.service !== service),
          state.searchQuery,
        ),
        starredCredentials: state.starredCredentials.filter(
          (cred) => cred.service !== service,
        ),
      }));
    } catch (error) {
      console.error("Failed to remove credential:", error);
    }
  },
  updateCredential: async (oldService, updatedCredential) => {
    try {
      const { service: newService } = updatedCredential;
      const { setSecureValue } = useSecureStore(newService);

      // Check for service name conflict (only if service name changes)
      if (oldService !== newService) {
        const index = (await credentialStore.getSecureValue()) || [];
        if (index.includes(newService)) {
          throw new Error("Service name already exists");
        }
      }

      // Preserve the isStarred property from the old credential
      const oldCredential = get().credentials.find(
        (cred) => cred.service === oldService,
      );
      const finalCredential = {
        ...updatedCredential,
        isStarred: oldCredential?.isStarred || false, // Preserve the starred state
      };

      // Overwrite the original credential in SecureStore
      await setSecureValue(finalCredential);

      // Update the CREDENTIAL_INDEX if the service name changed
      if (oldService !== newService) {
        const index = (await credentialStore.getSecureValue()) || [];
        const newIndex = index.map((name: string) =>
          name === oldService ? newService : name,
        );
        await credentialStore.setSecureValue(newIndex);
      }

      // Update Zustand state
      set((state) => {
        const updatedCredentials = state.credentials.map((cred) =>
          cred.service === oldService ? finalCredential : cred,
        );

        return {
          credentials: updatedCredentials,
          filteredCredentials: filterCredentials(
            updatedCredentials,
            state.searchQuery,
          ),
          starredCredentials: updatedCredentials.filter(
            (cred) => cred.isStarred,
          ),
        };
      });
    } catch (error) {
      throw error;
    }
  },
  toggleStar: async (service: string) => {
    try {
      const { getSecureValue, setSecureValue } = useSecureStore(service);
      const credential = await getSecureValue();
      if (!credential) return;

      const updatedCredential = {
        ...credential,
        isStarred: !credential.isStarred,
      };

      await setSecureValue(updatedCredential);

      set((state) => {
        const updatedCredentials = state.credentials.map((cred) =>
          cred.service === service ? updatedCredential : cred,
        );
        return {
          credentials: updatedCredentials,
          filteredCredentials: filterCredentials(
            updatedCredentials,
            state.searchQuery,
          ),
          starredCredentials: updatedCredentials.filter(
            (cred) => cred.isStarred,
          ),
        };
      });
    } catch (error) {
      console.error("Failed to toggle star:", error);
    }
  },
  setSearchQuery: (query: string) => {
    set((state) => ({
      searchQuery: query,
      filteredCredentials: filterCredentials(state.credentials, query),
    }));
  },
}));

export default useCredentialStore;
