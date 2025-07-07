import { View, Text, ActivityIndicator, Image, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser } from "@/api/services";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ViewProfileScreen() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const userId = await AsyncStorage.getItem("userId");
      const res = await getUser(userId!);
      setUser(res.response);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#22c55e" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white p-5">
       <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/profile")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 12 }}>
        My Profile
        </Text>
      </View>
      {/* <Text className="text-xl font-bold mb-6 text-center">My Profile</Text> */}

      <View className="items-center mb-6">
        <Image
          source={{
            uri:
              user.profileImageUrl ||
              "https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg",
          }}
          className="w-28 h-28 rounded-full"
        />
        <Text className="text-lg font-semibold mt-3">{user.name}</Text>
        <Text className="text-gray-500">@{user.userName}</Text>
      </View>

      <View className="bg-gray-100 p-4 rounded-xl space-y-3">
        <ProfileItem label="📱 Mobile" value={user.mobileNumber} />
        <ProfileItem label="✉️ Email" value={user.email} />
        <ProfileItem label="🆔 Aadhaar" value={user.adhaarNumber || "Not Provided"} />
        <ProfileItem label="📅 Created" value={new Date(user.createdAt).toLocaleDateString()} />
        <ProfileItem label="✅ KYC" value={user.kycStatus ? "Completed" : "Pending"} />
        <ProfileItem label="🛡️ Status" value={user.approvalStatus ? "Approved" : "Pending"} />
      </View>
    </View>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between">
      <Text className="text-gray-700 font-medium">{label}</Text>
      <Text className="text-gray-900 font-semibold">{value}</Text>
    </View>
  );
}
