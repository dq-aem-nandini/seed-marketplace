import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import AnimatedButton from '../../components/AnimatedButton';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  return (
    <LinearGradient
      colors={['#1E1B4B', '#312E81', '#4C1D95', '#7C3AED']}
      style={styles.container}
    >
      {/* Background Pattern */}
      <MotiView
        from={{ opacity: 0, rotate: '0deg' }}
        animate={{ opacity: 0.1, rotate: '360deg' }}
        transition={{
          type: 'timing',
          duration: 20000,
          loop: true,
        }}
        style={styles.backgroundPattern}
      />

      {/* Hero Image */}
      <MotiView
        from={{ opacity: 0, scale: 0.8, translateY: 50 }}
        animate={{ opacity: 1, scale: 1, translateY: 0 }}
        transition={{
          type: 'spring',
          damping: 15,
          stiffness: 100,
          delay: 300,
        }}
        style={styles.heroContainer}
      >
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=600' }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay} />
      </MotiView>

      {/* Content */}
      <View style={styles.content}>
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 600,
          }}
        >
          <Text style={styles.title}>Welcome to{'\n'}SeedMarket</Text>
          <Text style={styles.subtitle}>
            Your premium destination for quality seeds, tools, and garden supplies. 
            Start growing your dreams today.
          </Text>
        </MotiView>

        {/* Features */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 900,
          }}
          style={styles.features}
        >
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🌱</Text>
            </View>
            <Text style={styles.featureText}>Premium Quality Seeds</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>🚚</Text>
            </View>
            <Text style={styles.featureText}>Fast Delivery</Text>
          </View>
          <View style={styles.feature}>
            <View style={styles.featureIcon}>
              <Text style={styles.featureEmoji}>💰</Text>
            </View>
            <Text style={styles.featureText}>Best Prices</Text>
          </View>
        </MotiView>

        {/* Action Buttons */}
        <MotiView
          from={{ opacity: 0, translateY: 30 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{
            type: 'spring',
            damping: 15,
            stiffness: 100,
            delay: 1200,
          }}
          style={styles.actions}
        >
          <AnimatedButton
            title="Get Started"
            onPress={() => router.push('/(auth)/sign-up')}
            colors={['#10B981', '#059669']}
            size="large"
          />
          <AnimatedButton
            title="I have an account"
            onPress={() => router.push('/(auth)/sign-in')}
            colors={['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
            textColor="#FFFFFF"
            size="large"
          />
        </MotiView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundPattern: {
    position: 'absolute',
    top: -100,
    right: -100,
    width: 300,
    height: 300,
    borderRadius: 150,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 80,
  },
  heroImage: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: (width * 0.7) / 2,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(139, 92, 246, 0.3)',
    borderRadius: (width * 0.7) / 2,
  },
  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 50,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 36,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 42,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#A78BFA',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  actions: {
    gap: 16,
  },
});