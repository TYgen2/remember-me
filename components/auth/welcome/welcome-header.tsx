import { Image, Text, View } from 'react-native'

const WelcomeHeader = () => {
  return (
    <View className="justify-center items-center">
      <Image
        source={require("~/assets/icon/acheron.png")}
        className="mb-4 h-40 w-40 self-center"
      />

      <Text className="text-2xl font-bold">Welcome to Remember-me!!</Text>
      <Text>Please select your preferred authentication method</Text>
    </View>
  )
}

export default WelcomeHeader