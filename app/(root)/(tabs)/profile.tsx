'use client';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Switch,
  ActivityIndicator,
} from 'react-native';
import {
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useEffect, useState, JSX } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@/app/context/AuthContext';
import { authService } from '@/api/authService';
import { UserModel } from '@/api/types';

export default function ProfileScreen() {
  const router = useRouter();
  const { logout } = useAuth();
  const [user, setUser] = useState<UserModel | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userId = await AsyncStorage.getItem('userId');
        if (!token || !userId) return router.replace('/(auth)/sign-in');

        const res = await authService.getProfile(userId, token);
        setUser(res);
      } catch (error) {
        console.error('Error loading user profile:', error);
      }
    };

    const getDarkMode = async () => {
      const val = await AsyncStorage.getItem('darkMode');
      if (val) setDarkMode(JSON.parse(val));
    };

    fetchUserProfile();
    getDarkMode();
  }, []);

  const handleToggleDarkMode = async (value: boolean) => {
    setDarkMode(value);
    await AsyncStorage.setItem('darkMode', JSON.stringify(value));
  };

  if (!user) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="green" />
      </View>
    );
  }

  return (
    <>
      <ScrollView className="flex-1 bg-gray-50 px-4 py-6">
        <View className="flex-row justify-between items-center">
          <Text className="text-xl font-bold">My Profile</Text>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <MaterialIcons name="logout" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View className="items-center mt-6">
          <Image
            source={{
              uri:
                user.profileImageUrl ||
                'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg',
            }}
            className="w-28 h-28 rounded-full border border-gray-300"
          />
          <Text className="text-xl font-semibold mt-3">{user.name || '-'}</Text>
          <Text className="text-gray-600">@{user.userName || '-'}</Text>

          <TouchableOpacity
            className="bg-green-600 px-5 py-2 rounded-full mt-4"
            onPress={() => router.push('/profile/edit-profile')}
          >
            <Text className="text-white font-medium">Edit Profile</Text>
          </TouchableOpacity>
        </View>

        <Section header="My Account">
          <Item
            icon={<Ionicons name="document-text-outline" size={20} />}
            label="Your Orders"
            onPress={() => router.push('/(root)/(tabs)/orders')}
          />
          <Item
            icon={<Ionicons name="location-outline" size={20} />}
            label="Saved Addresses"
            onPress={() => router.push('/profile/addresses')}
          />
          <Item
            icon={<Ionicons name="person-outline" size={20} />}
            label="View Profile"
            onPress={() => router.push('/profile/view-profile')}
          />
          <Item
            icon={<Ionicons name="card-outline" size={20} />}
            label="Payment Methods"
            onPress={() => router.push('/profile/payment')}
          />
        </Section>

        <Section header="Preferences">
          <Item
            icon={<FontAwesome name="bell-o" size={20} />}
            label="Notifications"
            onPress={() => router.push('/profile/notifications')}
          />

          <View className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-2 border border-gray-200">
            <View className="flex-row items-center">
              <Ionicons name="moon-outline" size={20} />
              <Text className="ml-4 font-medium">Dark Mode</Text>
            </View>
            <Switch value={darkMode} onValueChange={handleToggleDarkMode} />
          </View>

          <Item
            icon={<Ionicons name="lock-closed-outline" size={20} />}
            label="Privacy Policy"
            onPress={() => router.push('/profile/privacy-policy')}
          />
        </Section>

        <Section header="Account Status">
          <Status label="Email Verified" value={user.emailVerified} />
          <Status label="Phone Verified" value={user.phoneVerified} />
          <Status label="KYC Completed" value={user.kycStatus} />
          <Status label="Approved" value={user.approvalStatus} />
          <Status label="Active" value={user.isActive} />
        </Section>
      </ScrollView>

      <SignOutModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSignOut={logout}
      />
    </>
  );
}

function Section({
  header,
  children,
}: {
  header: string;
  children: React.ReactNode;
}) {
  return (
    <View className="mt-6">
      <Text className="text-lg font-semibold mb-2">{header}</Text>
      {children}
    </View>
  );
}

function Item({
  icon,
  label,
  onPress,
}: {
  icon: JSX.Element;
  label: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center justify-between bg-white p-4 rounded-xl mb-2 border border-gray-200"
    >
      <View className="flex-row items-center">
        {icon}
        <Text className="ml-4 font-medium text-base">{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={18} color="gray" />
    </TouchableOpacity>
  );
}

function Status({
  label,
  value,
}: {
  label: string;
  value: boolean | undefined;
}) {
  return (
    <View className="flex-row justify-between bg-white p-4 rounded-xl mb-2 border border-gray-200">
      <Text className="font-medium">{label}</Text>
      <Text className={value ? 'text-green-600' : 'text-red-600'}>
        {value ? '✔ Verified' : '❌ Not Verified'}
      </Text>
    </View>
  );
}

function SignOutModal({
  visible,
  onClose,
  onSignOut,
}: {
  visible: boolean;
  onClose: () => void;
  onSignOut: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-center items-center bg-black/40 px-4">
        <View className="bg-white rounded-xl p-6 w-full max-w-sm">
          <Text className="text-lg font-bold mb-6 text-center">
            Are you sure you want to sign out?
          </Text>
          <View className="flex-row justify-between">
            <TouchableOpacity
              onPress={onClose}
              className="flex-1 py-3 border border-gray-300 rounded-lg mr-2 items-center"
            >
              <Text className="text-gray-700 font-medium">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                onClose();
                onSignOut();
              }}
              className="flex-1 py-3 bg-red-600 rounded-lg ml-2 items-center"
            >
              <Text className="text-white font-medium">Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
