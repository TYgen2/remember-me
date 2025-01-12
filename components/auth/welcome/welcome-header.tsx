import { Image, Text, View } from 'react-native'
import AlertPopup from '~/components/alert-popup'
import useAlert from '~/hooks/use-alert';
import { authExplainText } from '~/lib/alert-content-text';

const WelcomeHeader = () => {
  const { alertOpen, setAlertOpen, alertMessage, setAlertMessage } = useAlert();

  const authExplain = () => {
    setAlertOpen(true);
    setAlertMessage({
      title: "🤔Authentication default priority",
      content: authExplainText()
    });
  }

  return (
    <View className="justify-center items-center">
      <AlertPopup alertOpen={alertOpen} setAlertOpen={setAlertOpen} message={alertMessage} />
      <Image
        source={require("~/assets/icon/acheron.png")}
        className="mb-4 h-40 w-40 self-center"
      />

      <Text className="text-2xl font-bold pb-4">🔐Welcome to Remember-me!!</Text>
      <Text className="text-center">
        This app will use your device's{" "}
        <Text className="font-bold text-blue-600 underline" onPress={authExplain}>authentication method</Text>
        {"\n"}
        to protect your data. You will be asked to authenticate{"\n"}every time you open the app
      </Text>
    </View>
  )
}

export default WelcomeHeader