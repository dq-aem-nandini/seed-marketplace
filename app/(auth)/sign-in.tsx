'use client';
import { Feather, FontAwesome } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuth } from '../context/AuthContext';


export default function SignIn() {
  const { login, loading } = useAuth();
  const router = useRouter();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleLogin = async () => {
    try {
      await login(userName, password);
      router.replace('/(root)/(tabs)/profile');
    } catch (error) {
      setLocalError('Invalid username or password');
      setTimeout(() => setLocalError(''), 3000);
    }
  };

  return (
    <View className="flex-1 bg-white justify-center px-6">
      {localError !== '' && (
        <Text className="text-red-500 text-center mb-2">{localError}</Text>
      )}

      <Text className="text-3xl font-bold mb-6 text-center">Welcome Back 👋</Text>

      {/* Username Input */}
      <View className="flex-row items-center border-b border-gray-300 mb-4">
        <FontAwesome name="user" size={20} color="gray" />
        <TextInput
          placeholder="Username"
          placeholderTextColor="#999"
          className="flex-1 ml-2 py-2"
          value={userName}
          onChangeText={setUserName}
          autoCapitalize="none"
        />
      </View>

      {/* Password Input */}
      <View className="flex-row items-center border-b border-gray-300 mb-1">
        <Feather name="lock" size={20} color="gray" />
        <TextInput
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
          className="flex-1 ml-2 py-2"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity>
          <Text className="text-purple-600 font-semibold text-xs">Forgot?</Text>
        </TouchableOpacity>
      </View>

      {/* Sign In Button */}
      <TouchableOpacity
        className="bg-purple-600 py-3 rounded-lg mt-6 flex-row justify-center items-center"
        onPress={handleLogin}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text className="text-center text-white font-semibold">Sign In</Text>
        )}
      </TouchableOpacity>

      <Text className="text-center text-gray-500 my-4 font-bold">
        Or, sign in with …
      </Text>

      {/* Social Logins */}
      <View className="flex-row justify-around space-x-4">
        {[
          {
            uri: 'https://img.icons8.com/color/48/000000/google-logo.png',
          },
          // {
          //   uri: 'https://img.icons8.com/color/48/000000/facebook-new.png',
          // },
          // {
          //   uri: 'https://img.icons8.com/color/48/000000/twitter.png',
          // },
        ].map((icon, index) => (
          <TouchableOpacity
            key={index}
            className="p-3 border border-gray-300 w-24 items-center justify-center rounded-md"
          >
            <Image source={{ uri: icon.uri }} className="h-6 w-6" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Sign Up Link */}
      <Text className="text-center mt-6 font-bold">
        Don’t have an account?{' '}
        <Link href="/(auth)/sign-up" className="text-purple-600 font-semibold">
          Sign Up
        </Link>
      </Text>
    </View>
  );
}
