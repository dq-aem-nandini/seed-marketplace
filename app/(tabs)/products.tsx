import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedCard from '../../components/AnimatedCard';
import AnimatedButton from '../../components/AnimatedButton';

const mockProducts = [
  { id: 1, name: 'Premium Tomato Seeds', price: '$24.99', stock: 150, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Seeds' },
  { id: 2, name: 'Organic Fertilizer', price: '$18.50', stock: 89, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Fertilizer' },
  { id: 3, name: 'Garden Pruning Shears', price: '$45.00', stock: 23, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Tools' },
  { id: 4, name: 'Cucumber Seeds', price: '$12.99', stock: 200, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Seeds' },
  { id: 5, name: 'Plant Growth Light', price: '$89.99', stock: 15, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Equipment' },
  { id: 6, name: 'Watering Can', price: '$28.75', stock: 45, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400', category: 'Tools' },
];

const categories = ['All', 'Seeds', 'Tools', 'Fertilizer', 'Equipment'];

export default function ProductsScreen() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
          <Text style={styles.title}>My Products</Text>
          <AnimatedButton title="+ Add Product" colors={['#10B981', '#059669']} size="small" />
        </MotiView>

        {/* Search Bar */}
        <AnimatedCard
          delay={1}
          style={styles.searchCard}
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
        >
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </AnimatedCard>

        {/* Category Filter */}
        <MotiView
          from={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 200 }}
          style={styles.categoriesContainer}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category, index) => (
              <MotiView
                key={category}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: (index + 2) * 50,
                }}
              >
                <AnimatedButton
                  title={category}
                  onPress={() => setSelectedCategory(category)}
                  colors={selectedCategory === category ? ['#8B5CF6', '#7C3AED'] : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                  textColor={selectedCategory === category ? '#FFFFFF' : '#A78BFA'}
                  size="small"
                />
              </MotiView>
            ))}
          </ScrollView>
        </MotiView>

        {/* Products Grid */}
        <View style={styles.productsGrid}>
          {filteredProducts.map((product, index) => (
            <AnimatedCard
              key={product.id}
              delay={index + 3}
              style={styles.productCard}
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
              onPress={() => {}}
            >
              <Image source={{ uri: product.image }} style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.category}</Text>
                <View style={styles.productFooter}>
                  <Text style={styles.productPrice}>{product.price}</Text>
                  <View style={styles.stockContainer}>
                    <View style={[styles.stockDot, { backgroundColor: product.stock > 50 ? '#10B981' : product.stock > 20 ? '#F59E0B' : '#EF4444' }]} />
                    <Text style={styles.stockText}>{product.stock} in stock</Text>
                  </View>
                </View>
                <View style={styles.productActions}>
                  <AnimatedButton title="Edit" colors={['#8B5CF6', '#7C3AED']} size="small" />
                  <AnimatedButton title="Delete" colors={['#EF4444', '#DC2626']} size="small" />
                </View>
              </View>
            </AnimatedCard>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  searchCard: {
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1F2937',
  },
  categoriesContainer: {
    marginBottom: 30,
  },
  productsGrid: {
    gap: 16,
  },
  productCard: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  productImage: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 16,
  },
  productInfo: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productName: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  productCategory: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
    marginBottom: 8,
  },
  productFooter: {
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
    marginBottom: 4,
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stockText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  productActions: {
    flexDirection: 'row',
    gap: 8,
  },
});