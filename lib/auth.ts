import * as LocalAuthentication from 'expo-local-authentication';
import { Linking, Alert } from 'react-native';
import { useLocalStorage } from '../hooks/use-local-storage';
import { router } from 'expo-router';

interface useAuthProps {
    setAlertOpen: (alertOpen: boolean) => void;
    setAlertMessage: (alertMessage: { title: string, content: string }) => void;
}

export const authenticateForFirstTime = async ({ setAlertOpen, setAlertMessage }: useAuthProps) => {
    const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
    if (enrolledLevel === 0) {
        setAlertOpen(true);
        setAlertMessage({
            title: "Authentication not set up",
            content: "We couldn't find any authentication method set up on your device. Please set up a method and try again."
        });
        return;
    }

    // Biometric as first priority, then password (PIN, pattern, etc)
    const authResult = await LocalAuthentication.authenticateAsync();
    if (authResult.success) {
        const { setItem } = useLocalStorage("authConfirmed");
        await setItem(true);

        router.replace('/(main)');
    }
}

export const authenticateUser = async () => {
    const authResult = await LocalAuthentication.authenticateAsync();
    if (authResult.success) {
        router.replace('/(main)');
    }
}

export const openPasswordSettings = () => {
    Linking.sendIntent('android.settings.SECURITY_SETTINGS')
        .catch(err => {
            Alert.alert("Error", "Unable to open settings: " + err.message);
        });
};