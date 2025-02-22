import * as LocalAuthentication from 'expo-local-authentication';
import { Linking, Alert } from 'react-native';
import { router } from 'expo-router';
import { useSecureStore } from '~/hooks/use-secure-store';

interface useAuthProps {
    setAlertOpen: (alertOpen: boolean) => void;
    setAlertMessage: (alertMessage: { title: string, content: string }) => void;
}

export const hasSetLocalAuth = async () => {
    const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();
    return enrolledLevel;
}

export const authenticateForFirstTime = async ({ setAlertOpen, setAlertMessage }: useAuthProps) => {
    const enrolledLevel = await hasSetLocalAuth();

    // enrolledLevel === 0 means no authentication method is set up on the device
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
        const { setSecureValue } = useSecureStore("authConfirmed");
        await setSecureValue(true);

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