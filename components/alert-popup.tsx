import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Text } from "react-native";

interface AlertPopupProps {
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;
  message: { title: string; content: string };
  action?: () => void;
  actionText?: string;
  actionBgColor?: string;
  hasCancelAction?: boolean;
}

const AlertPopup = ({
  alertOpen,
  setAlertOpen,
  message,
  action,
  actionText,
  actionBgColor,
  hasCancelAction,
}: AlertPopupProps) => {
  return (
    <AlertDialog open={alertOpen} onOpenChange={() => setAlertOpen(false)}>
      <AlertDialogContent className="border-black bg-black">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            {message.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-white">
            {message.content}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {hasCancelAction && (
            <AlertDialogCancel>
              <Text>Cancel</Text>
            </AlertDialogCancel>
          )}

          {action ? (
            <AlertDialogAction onPress={action} className={actionBgColor}>
              <Text className="font-bold text-white">{actionText}</Text>
            </AlertDialogAction>
          ) : (
            <AlertDialogAction className="bg-white">
              <Text className="font-bold text-black">Got it</Text>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPopup;
