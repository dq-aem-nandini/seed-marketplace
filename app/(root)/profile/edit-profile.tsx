import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function EditProfile() {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    // load profile from AsyncStorage if available
    const loadProfile = async () => {
      const savedName = await AsyncStorage.getItem("profileName");
      const savedBio = await AsyncStorage.getItem("profileBio");
      if (savedName) setName(savedName);
      if (savedBio) setBio(savedBio);
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    await AsyncStorage.setItem("profileName", name);
    await AsyncStorage.setItem("profileBio", bio);
    alert("Profile updated!");
    router.back();
  };

  return (
    <View className="flex-1 bg-white p-4">
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/profile")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 12 }}>
          Edit Profile
        </Text>
      </View>

      <Text className="font-semibold mb-1">Name</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-4"
        value={name}
        onChangeText={setName}
      />

      <Text className="font-semibold mb-1">Bio</Text>
      <TextInput
        className="border border-gray-300 rounded-lg p-2 mb-4"
        value={bio}
        onChangeText={setBio}
      />

      <TouchableOpacity
        onPress={handleSave}
        className="bg-purple-600 p-3 rounded-lg"
      >
        <Text className="text-center text-white font-semibold">Save</Text>
      </TouchableOpacity>
    </View>
  );
}
