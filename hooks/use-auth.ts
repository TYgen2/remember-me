import * as LocalAuthentication from 'expo-local-authentication';
import { Linking, Alert } from 'react-native';
import { useLocalStorage } from './use-local-storage';
import { router } from 'expo-router';

interface useAuthProps {
    setAlertOpen: (alertOpen: boolean) => void;
    setAlertMessage: (alertMessage: { title: string, content: string }) => void;
}

const useAuth = ({ setAlertOpen, setAlertMessage }: useAuthProps) => {
    const openPasswordSettings = () => {
        Linking.sendIntent('android.settings.SECURITY_SETTINGS')
            .catch(err => {
                Alert.alert("Error", "Unable to open settings: " + err.message);
            });
    };

    const checkEnrolled = async () => {
        const enrolledLevel = await LocalAuthentication.getEnrolledLevelAsync();

        // 0 = Not enrolled any auth method
        if (enrolledLevel === 0) {
            setAlertOpen(true);
            setAlertMessage({
                title: "Authentication not set up",
                content: "We couldn't find any authentication method set up on your device. Please set up a method and try again."
            });
        }
        return enrolledLevel;
    }

    const authenticateForFirstTime = async () => {
        const enrolledLevel = await checkEnrolled();
        if (enrolledLevel === 0) {
            return;
        }

        // Biometric as first priority, then password (PIN, pattern, etc)
        const authResult = await LocalAuthentication.authenticateAsync();
        if (authResult.success) {
            const { setItem } = useLocalStorage("authed");
            await setItem(true);

            router.replace('/(main)');
        }
    }

    return { authenticateForFirstTime, openPasswordSettings }
}

export default useAuth;