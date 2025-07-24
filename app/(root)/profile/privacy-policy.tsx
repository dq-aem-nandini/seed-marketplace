import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useDarkMode } from "@/app/context/DarkModeContext";


export default function PrivacyPolicyScreen() {
  const [policyText, setPolicyText] = useState<string>("");
 const {  colors } = useDarkMode();
  useEffect(() => {
    // In a real app, you could fetch this from the backend
    setPolicyText(`
      We value your privacy and are committed to protecting your personal information.
      
      1. Data Collection:
         We collect your name, email, phone number, address, and payment information to provide better services.

      2. Data Usage:
         Your data is used to personalize your experience, manage orders, and improve our platform.

      3. Data Sharing:
         We never sell your data. Information is only shared with service providers essential for app operations.

      4. Security:
         We use encryption and authentication to secure your data.

      5. Changes:
         This policy may be updated. Check back regularly for any changes.

      For any questions, contact support@example.com.
    `);
  }, []);
  const dynamicStyles = StyleSheet.create({  
    contentCard: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 16,
      shadowColor: "#000",
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 2 },
      shadowRadius: 6,
      elevation: 3,
      marginBottom: 20,
    },
    

})
  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/profile")}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
      </View>

      <View style={dynamicStyles.contentCard}>
        <Text style={[styles.content, { color: colors.text }]}>
          {policyText}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginLeft: 12,
  },
  contentCard: {
    marginHorizontal: 0,
  },

  content: {
    fontSize: 16,
    color: "#374151",
    lineHeight: 24,
  },
});
