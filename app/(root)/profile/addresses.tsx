// app/profile/addresses.tsx
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const mockAddresses = [
  {
    id: "home",
    label: "Home",
    address: "123 Main St, Hyderabad, Telangana 500001",
  },
  {
    id: "work",
    label: "Work",
    address: "456 Tech Park, Bangalore, Karnataka 560001",
  },
];

export default function AddressesScreen() {
  return (
    <View className="flex-1 bg-white p-4">
      <View
              style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
            >
              <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/profile")}>
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>
              <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 12 }}>
              Saved Addresses
              </Text>
            </View>

      <FlatList
        data={mockAddresses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-gray-100 p-4 rounded-xl mb-3">
            <Text className="font-semibold">{item.label}</Text>
            <Text className="text-gray-600">{item.address}</Text>
          </View>
        )}
      />
      <TouchableOpacity className="mt-4 bg-green-600 py-3 rounded-xl items-center">
        <Text className="text-white font-semibold">+ Add New Address</Text>
      </TouchableOpacity>
    </View>
  );
}
