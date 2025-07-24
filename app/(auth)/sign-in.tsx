import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "../context/AuthContext";

import { useDarkMode } from "../context/DarkModeContext";
import { LinearGradient } from "expo-linear-gradient";

export default function SignInScreen() {
  const { colors } = useDarkMode();
  const { login, loading } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");
  const STATUS_BAR_HEIGHT =
    Platform.OS === "android" ? StatusBar.currentHeight || 24 : 0;
  const handleSignIn = async () => {
    if (!userName || !password) {
      Alert.alert("Validation", "Please enter both username and password.");
      return;
    }

    try {
      await login(userName, password);
      router.replace("/(root)/(tabs)");
    } catch (error) {
      setLocalError("Invalid username or password");
      setTimeout(() => setLocalError(""), 3000);
    }
  };
  const dynamicStyles = StyleSheet.create({
    formCard: {
      marginBottom: 30,
      borderRadius: 8,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
    },
  });
  return (
    <LinearGradient
      colors={colors.loginBackground}
      style={[styles.container, { paddingTop: STATUS_BAR_HEIGHT }]}
    >
      <StatusBar translucent barStyle="light-content" />

      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardView}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.title}>Welcome Back 👋</Text>
              <Text style={styles.subtitle}>
                Sign in to continue your journey
              </Text>
            </View>

            {/* Error message */}
            {localError !== "" && (
              <Text style={styles.errorMessage}>{localError}</Text>
            )}

            {/* Form */}
            <View style={dynamicStyles.formCard}>
              <View style={styles.form}>
                {/* Username Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Username</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="person-outline"
                      size={20}
                      color={colors.textSecondary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Enter your username"
                      placeholderTextColor={colors.textSecondary}
                      value={userName}
                      keyboardType="default"
                      onChangeText={setUserName}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                {/* Password Input */}
                <View style={styles.inputContainer}>
                  <Text style={styles.inputLabel}>Password</Text>
                  <View
                    style={[
                      styles.inputWrapper,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                      },
                    ]}
                  >
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color={colors.textSecondary}
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={[styles.input, { color: colors.text }]}
                      placeholder="Enter your password"
                      placeholderTextColor={colors.textSecondary}
                      value={password}
                      onChangeText={setPassword}
                      autoCapitalize="none"
                      secureTextEntry={!showPassword}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Ionicons
                        name={showPassword ? "eye-outline" : "eye-off-outline"}
                        size={20}
                        color={colors.textSecondary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Forgot Password */}
                <View style={styles.forgotContainer}>
                  <TouchableOpacity>
                    <Text
                      style={[styles.forgotText, { color: colors.primary }]}
                    >
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Sign In Button */}
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[
                      styles.signInButton,
                      { backgroundColor: colors.primary },
                      loading && styles.disabledButton,
                    ]}
                    onPress={handleSignIn}
                    disabled={loading}
                  >
                    <Text
                      style={[styles.buttonText, { color: colors.surface }]}
                    >
                      {loading ? "Signing In..." : "Sign In"}
                    </Text>
                  </TouchableOpacity>
                </View>

                {/* Sign Up Link */}
                <View style={styles.signUpContainer}>
                  <Text style={styles.signUpText}>Don't have an account? </Text>
                  <TouchableOpacity
                    onPress={() => router.push("/(auth)/sign-up")}
                  >
                    <Text
                      style={[styles.signUpLink, { color: colors.primary }]}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  keyboardView: { flex: 1 },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: "40%",
    // paddingBottom: 40,
  },
  header: { marginBottom: 40 },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
    textAlign: "center",
    color: "#FFFFFF",
  },
  subtitle: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
    color: "#FFFFFF",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },

  form: { gap: 20 },
  inputContainer: { gap: 8 },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    paddingHorizontal: 16,
    height: 56,
  },
  inputIcon: { marginRight: 12 },
  input: {
    flex: 1,
    fontSize: 16,
    fontWeight: "500",
  },
  eyeIcon: { padding: 4 },
  forgotContainer: { alignItems: "flex-end" },
  forgotText: {
    fontSize: 14,
    fontWeight: "600",
  },
  buttonContainer: { marginTop: 10 },
  signInButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "600",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signUpText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
  },
  signUpLink: {
    fontSize: 16,
    fontWeight: "700",
  },
});
