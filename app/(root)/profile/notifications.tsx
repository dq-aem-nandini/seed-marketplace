// app/profile/notifications.tsx
import { View, Text, Switch, TouchableOpacity } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const mockNotifications = [
  { label: "Order Updates", enabled: true },
  { label: "Promotional Offers", enabled: false },
  { label: "Security Alerts", enabled: true },
];

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState(mockNotifications);

  const toggleSwitch = (index: number) => {
    const updated = [...notifications];
    updated[index].enabled = !updated[index].enabled;
    setNotifications(updated);
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
        Notifications
        </Text>
      </View>

      {notifications.map((item, idx) => (
        <View
          key={item.label}
          className="flex-row justify-between items-center bg-gray-100 p-4 rounded-xl mb-2"
        >
          <Text className="text-base font-medium">{item.label}</Text>
          <Switch value={item.enabled} onValueChange={() => toggleSwitch(idx)} />
        </View>
      ))}
    </View>
  );
}
