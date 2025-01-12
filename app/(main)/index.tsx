import { FlatList, Text, View } from "react-native";
import AddButton from "~/components/main/add-button";
import { Card } from "~/components/ui/card";

const DATA = [1, 2, 3, 4, 5];

const MainScreen = () => {
  return (
    <View className="flex-1 bg-green-100">
      <AddButton />
      <FlatList
        data={DATA}
        numColumns={2}
        contentContainerStyle={{ padding: 20 }}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View className="w-[48%] mb-4">
            <Card className="h-40 bg-orange-200 rounded-2xl items-center justify-center">
              <Text>{item}</Text>
            </Card>
          </View>
        )}
      />
    </View>
  );
};
export default MainScreen;
