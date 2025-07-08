import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedCard from '../../components/AnimatedCard';
import AnimatedButton from '../../components/AnimatedButton';

const profileStats = [
  { label: 'Products', value: '24', icon: 'cube', color: '#8B5CF6' },
  { label: 'Sales', value: '$12.4K', icon: 'trending-up', color: '#10B981' },
  { label: 'Orders', value: '156', icon: 'receipt', color: '#F59E0B' },
  { label: 'Rating', value: '4.8', icon: 'star', color: '#EF4444' },
];

const menuItems = [
  { title: 'Edit Profile', icon: 'person-outline', color: '#8B5CF6' },
  { title: 'My Products', icon: 'cube-outline', color: '#10B981' },
  { title: 'Order History', icon: 'receipt-outline', color: '#F59E0B' },
  { title: 'Analytics', icon: 'bar-chart-outline', color: '#2563EB' },
  { title: 'Settings', icon: 'settings-outline', color: '#6B7280' },
  { title: 'Help & Support', icon: 'help-circle-outline', color: '#7C3AED' },
  { title: 'Privacy Policy', icon: 'shield-outline', color: '#059669' },
  { title: 'Logout', icon: 'log-out-outline', color: '#EF4444' },
];

const achievements = [
  { title: 'Top Seller', description: 'Achieved highest sales this month', icon: 'trophy', color: '#F59E0B' },
  { title: 'Quality Products', description: '5-star rating on all products', icon: 'star', color: '#EF4444' },
  { title: 'Fast Shipping', description: 'Quick delivery champion', icon: 'flash', color: '#8B5CF6' },
];

export default function ProfileScreen() {
  return (
    <LinearGradient
      colors={['#1E1B4B', '#312E81', '#4C1D95']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Profile Header */}
        <MotiView
          from={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          style={styles.profileHeader}
        >
          <LinearGradient
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0.05)']}
            style={styles.profileCard}
          >
            <View style={styles.avatarContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200' }}
                style={styles.avatar}
              />
              <View style={styles.onlineIndicator} />
            </View>
            <Text style={styles.userName}>John Doe</Text>
            <Text style={styles.userTitle}>Premium Seller</Text>
            <View style={styles.ratingContainer}>
              {[1, 2, 3, 4, 5].map((star) => (
                <Ionicons key={star} name="star" size={16} color="#F59E0B" />
              ))}
              <Text style={styles.ratingText}>4.8 (124 reviews)</Text>
            </View>
          </LinearGradient>
        </MotiView>

        {/* Stats */}
        <View style={styles.statsContainer}>
          {profileStats.map((stat, index) => (
            <AnimatedCard
              key={stat.label}
              delay={index + 1}
              style={styles.statCard}
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
            >
              <View style={styles.statContent}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Ionicons name={stat.icon as any} size={20} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </AnimatedCard>
          ))}
        </View>

        {/* Achievements */}
        <AnimatedCard
          delay={5}
          style={styles.achievementsCard}
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
        >
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement, index) => (
              <MotiView
                key={achievement.title}
                from={{ opacity: 0, translateX: -30 }}
                animate={{ opacity: 1, translateX: 0 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: (index + 6) * 100,
                }}
                style={styles.achievementItem}
              >
                <View style={[styles.achievementIcon, { backgroundColor: `${achievement.color}20` }]}>
                  <Ionicons name={achievement.icon as any} size={24} color={achievement.color} />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementTitle}>{achievement.title}</Text>
                  <Text style={styles.achievementDescription}>{achievement.description}</Text>
                </View>
              </MotiView>
            ))}
          </View>
        </AnimatedCard>

        {/* Menu Items */}
        <View style={styles.menuContainer}>
          {menuItems.map((item, index) => (
            <AnimatedCard
              key={item.title}
              delay={index + 9}
              style={styles.menuItem}
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
              onPress={() => {}}
            >
              <View style={styles.menuContent}>
                <View style={styles.menuLeft}>
                  <View style={[styles.menuIcon, { backgroundColor: `${item.color}20` }]}>
                    <Ionicons name={item.icon as any} size={20} color={item.color} />
                  </View>
                  <Text style={styles.menuTitle}>{item.title}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#6B7280" />
              </View>
            </AnimatedCard>
          ))}
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <AnimatedButton 
            title="Edit Profile" 
            colors={['#8B5CF6', '#7C3AED']} 
            size="large" 
          />
          <AnimatedButton 
            title="Share Profile" 
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']} 
            textColor="#A78BFA"
            size="large" 
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  profileHeader: {
    marginBottom: 30,
  },
  profileCard: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 5,
    right: 5,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#A78BFA',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    marginLeft: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  achievementsCard: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  achievementsList: {
    gap: 16,
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  menuContainer: {
    gap: 8,
    marginBottom: 30,
  },
  menuItem: {
    marginBottom: 8,
  },
  menuContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  actionButtons: {
    gap: 12,
    marginBottom: 30,
  },
});