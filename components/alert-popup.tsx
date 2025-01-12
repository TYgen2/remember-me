import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "~/components/ui/alert-dialog";
import { Text } from "react-native";

interface AlertPopupProps {
    alertOpen: boolean;
    setAlertOpen: (alertOpen: boolean) => void;
    message: { title: string, content: string };
    action?: () => void;
    actionText?: string;
    hasCancelAction?: boolean;
}

const AlertPopup = ({ alertOpen, setAlertOpen, message, action, actionText, hasCancelAction }: AlertPopupProps) => {
    return (
        <AlertDialog open={alertOpen} onOpenChange={() => setAlertOpen(false)}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{message.title}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {message.content}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter>
                    {hasCancelAction && <AlertDialogCancel>
                        <Text>Cancel</Text>
                    </AlertDialogCancel>}

                    {action ? <AlertDialogAction onPress={action}>
                        <Text className="text-white font-bold">{actionText}</Text>
                    </AlertDialogAction> : <AlertDialogAction>
                        <Text className="text-white font-bold">Got it</Text>
                    </AlertDialogAction>}

                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertPopup