'use client';
import { useAuth } from '../context/AuthContext';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { FontAwesome, Feather } from '@expo/vector-icons';

export default function SignUp() {
  const { register, loading } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    userName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    adhaarNumber: '',
  });

  const handleChange = (key: keyof typeof form, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleRegister = async () => {
    if (form.password !== form.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const { confirmPassword, ...registerForm } = form;

    try {
      await register(registerForm);
      router.replace('/(auth)/sign-in');
    } catch (error) {
      // Already handled in context
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="bg-white">
      <View className="flex-1 justify-center items-center px-6 py-8">
        <View className="w-full max-w-md">
          <Text className="text-2xl font-bold mb-6 text-center">Create Account</Text>

          {/* Name */}
          <View className="flex-row items-center border-b border-gray-300 mb-4">
            <FontAwesome name="user-o" size={20} color="gray" />
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="#999"
              className="flex-1 ml-2 py-2"
              value={form.name}
              onChangeText={(val) => handleChange('name', val)}
            />
          </View>

          {/* Username */}
          <View className="flex-row items-center border-b border-gray-300 mb-4">
            <FontAwesome name="user" size={20} color="gray" />
            <TextInput
              placeholder="Username"
              placeholderTextColor="#999"
              className="flex-1 ml-2 py-2"
              value={form.userName}
              onChangeText={(val) => handleChange('userName', val)}
            />
          </View>

          {/* Mobile Number */}
          <View className="flex-row items-center border-b border-gray-300 mb-4">
            <Feather name="phone" size={20} color="gray" />
            <TextInput
              placeholder="Mobile Number"
              placeholderTextColor="#999"
              className="flex-1 ml-2 py-2"
              keyboardType="phone-pad"
              maxLength={10}
              value={form.mobileNumber}
              onChangeText={(val) => handleChange('mobileNumber', val)}
            />
          </View>

          {/* Aadhaar Number */}
          {/* <View className="flex-row items-center border-b border-gray-300 mb-4">
            <Feather name="credit-card" size={20} color="gray" />
            <TextInput
              placeholder="Aadhaar Number"
              placeholderTextColor="#999"
              className="flex-1 ml-2 py-2"
              keyboardType="numeric"
              maxLength={12}
              value={form.adhaarNumber}
              onChangeText={(val) => handleChange('adhaarNumber', val)}
            />
          </View> */}

          {/* Email */}
          <View className="flex-row items-center border-b border-gray-300 mb-4">
            <FontAwesome name="envelope-o" size={20} color="gray" />
            <TextInput
              placeholder="Email"
              placeholderTextColor="#999"
              className="flex-1 ml-2 py-2"
              autoCapitalize="none"
              value={form.email}
              onChangeText={(val) => handleChange('email', val)}
            />
          </View>

          {/* Password */}
          <View className="flex-row items-center border-b border-gray-300 mb-4">
            <Feather name="lock" size={20} color="gray" />
            <TextInput
              placeholder="Password"
              placeholderTextColor="#999"
              secureTextEntry
              className="flex-1 ml-2 py-2"
              value={form.password}
              onChangeText={(val) => handleChange('password', val)}
            />
          </View>

          {/* Confirm Password */}
          <View className="flex-row items-center border-b border-gray-300 mb-6">
            <Feather name="lock" size={20} color="gray" />
            <TextInput
              placeholder="Confirm Password"
              placeholderTextColor="#999"
              secureTextEntry
              className="flex-1 ml-2 py-2"
              value={form.confirmPassword}
              onChangeText={(val) => handleChange('confirmPassword', val)}
            />
          </View>

          {/* Submit */}
          <TouchableOpacity
            className="bg-purple-600 py-3 rounded-lg flex-row justify-center items-center"
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-center text-white font-semibold">Register</Text>
            )}
          </TouchableOpacity>

          {/* Link to login */}
          <Text className="text-center mt-6 text-gray-500">
            Already have an account?{' '}
            <Link href="/(auth)/sign-in" className="text-purple-600 font-semibold">
              Login
            </Link>
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}
