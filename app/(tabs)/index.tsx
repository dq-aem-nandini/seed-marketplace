import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedCard from '../../components/AnimatedCard';
import AnimatedButton from '../../components/AnimatedButton';

const mockProducts = [
  { id: 1, name: 'Premium Seeds', price: '$24.99', image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Organic Fertilizer', price: '$18.50', image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'Garden Tools', price: '$45.00', image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400' },
];

const stats = [
  { label: 'Total Sales', value: '$12,450', icon: 'trending-up', color: '#10B981' },
  { label: 'Products', value: '24', icon: 'cube', color: '#8B5CF6' },
  { label: 'Orders', value: '156', icon: 'receipt', color: '#F59E0B' },
];

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={['#1E1B4B', '#312E81', '#4C1D95']}
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <MotiView
          from={{ opacity: 0, translateY: -30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100 }}
          style={styles.header}
        >
          <View>
            <Text style={styles.greeting}>Good Morning!</Text>
            <Text style={styles.username}>John Doe</Text>
          </View>
          <MotiView
            from={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 200 }}
          >
            <View style={styles.avatar}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={styles.avatarImage}
              />
            </View>
          </MotiView>
        </MotiView>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <AnimatedCard
              key={stat.label}
              delay={index}
              style={styles.statCard}
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
            >
              <View style={styles.statContent}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}20` }]}>
                  <Ionicons name={stat.icon as any} size={24} color={stat.color} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            </AnimatedCard>
          ))}
        </View>

        {/* Quick Actions */}
        <AnimatedCard
          delay={3}
          style={styles.actionsCard}
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
        >
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.actionsGrid}>
            <AnimatedButton title="Add Product" colors={['#10B981', '#059669']} size="small" />
            <AnimatedButton title="View Orders" colors={['#F59E0B', '#D97706']} size="small" />
            <AnimatedButton title="Analytics" colors={['#8B5CF6', '#7C3AED']} size="small" />
            <AnimatedButton title="Settings" colors={['#6B7280', '#4B5563']} size="small" />
          </View>
        </AnimatedCard>

        {/* Featured Products */}
        <AnimatedCard
          delay={4}
          style={styles.productsCard}
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
        >
          <Text style={styles.sectionTitle}>Featured Products</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.productsScroll}>
            {mockProducts.map((product, index) => (
              <MotiView
                key={product.id}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: (index + 5) * 100,
                }}
                style={styles.productCard}
              >
                <Image source={{ uri: product.image }} style={styles.productImage} />
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productPrice}>{product.price}</Text>
              </MotiView>
            ))}
          </ScrollView>
        </AnimatedCard>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#A78BFA',
    fontFamily: 'Inter-Medium',
  },
  username: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
    marginTop: 4,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFFFFF',
    padding: 2,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 23,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
  },
  statContent: {
    alignItems: 'center',
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    textAlign: 'center',
  },
  actionsCard: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 12,
  },
  productsCard: {
    marginBottom: 30,
  },
  productsScroll: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  productCard: {
    width: 140,
    marginRight: 16,
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  productImage: {
    width: '100%',
    height: 80,
    borderRadius: 12,
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#8B5CF6',
  },
});