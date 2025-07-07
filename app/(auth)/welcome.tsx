import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function Welcome() {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text className="text-2xl font-bold mb-4">Welcome to the App</Text>
      <Link href="/(auth)/sign-in">
        <Button title="Get Started" />
      </Link>
    </View>
  );
}
