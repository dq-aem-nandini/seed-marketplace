import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedCard from '../../components/AnimatedCard';

const { width } = Dimensions.get('window');

const salesData = [
  { month: 'Jan', sales: 4500, orders: 45 },
  { month: 'Feb', sales: 5200, orders: 52 },
  { month: 'Mar', sales: 4800, orders: 48 },
  { month: 'Apr', sales: 6100, orders: 61 },
  { month: 'May', sales: 7300, orders: 73 },
  { month: 'Jun', sales: 8900, orders: 89 },
];

const topProducts = [
  { name: 'Premium Tomato Seeds', sales: '$2,450', percentage: 85 },
  { name: 'Organic Fertilizer', sales: '$1,890', percentage: 65 },
  { name: 'Garden Tools Set', sales: '$1,230', percentage: 45 },
  { name: 'Plant Growth Light', sales: '$980', percentage: 35 },
];

const recentTransactions = [
  { id: 1, customer: 'Alice Johnson', amount: '$45.99', product: 'Tomato Seeds', time: '2 hours ago' },
  { id: 2, customer: 'Bob Smith', amount: '$28.50', product: 'Fertilizer', time: '4 hours ago' },
  { id: 3, customer: 'Carol Davis', amount: '$89.99', product: 'Growth Light', time: '6 hours ago' },
  { id: 4, customer: 'David Wilson', amount: '$15.75', product: 'Watering Can', time: '8 hours ago' },
];

export default function SalesScreen() {
  const maxSales = Math.max(...salesData.map(item => item.sales));

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
          <Text style={styles.title}>Sales Analytics</Text>
          <View style={styles.periodSelector}>
            <Text style={styles.periodText}>This Month</Text>
            <Ionicons name="chevron-down" size={16} color="#A78BFA" />
          </View>
        </MotiView>

        {/* Summary Cards */}
        <View style={styles.summaryContainer}>
          <AnimatedCard
            delay={1}
            style={styles.summaryCard}
            colors={['#10B981', '#059669']}
          >
            <View style={styles.summaryContent}>
              <Ionicons name="trending-up" size={32} color="#FFFFFF" />
              <Text style={styles.summaryValue}>$8,900</Text>
              <Text style={styles.summaryLabel}>Total Revenue</Text>
              <Text style={styles.summaryChange}>+12.5%</Text>
            </View>
          </AnimatedCard>

          <AnimatedCard
            delay={2}
            style={styles.summaryCard}
            colors={['#F59E0B', '#D97706']}
          >
            <View style={styles.summaryContent}>
              <Ionicons name="receipt" size={32} color="#FFFFFF" />
              <Text style={styles.summaryValue}>89</Text>
              <Text style={styles.summaryLabel}>Orders</Text>
              <Text style={styles.summaryChange}>+8.2%</Text>
            </View>
          </AnimatedCard>
        </View>

        {/* Sales Chart */}
        <AnimatedCard
          delay={3}
          style={styles.chartCard}
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
        >
          <Text style={styles.sectionTitle}>Sales Trend</Text>
          <View style={styles.chart}>
            {salesData.map((item, index) => (
              <View key={item.month} style={styles.chartColumn}>
                <MotiView
                  from={{ height: 0 }}
                  animate={{ height: (item.sales / maxSales) * 120 }}
                  transition={{
                    type: 'spring',
                    damping: 15,
                    stiffness: 100,
                    delay: (index + 4) * 100,
                  }}
                  style={[styles.chartBar, { backgroundColor: '#8B5CF6' }]}
                />
                <Text style={styles.chartLabel}>{item.month}</Text>
                <Text style={styles.chartValue}>${(item.sales / 1000).toFixed(1)}k</Text>
              </View>
            ))}
          </View>
        </AnimatedCard>

        {/* Top Products */}
        <AnimatedCard
          delay={4}
          style={styles.topProductsCard}
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
        >
          <Text style={styles.sectionTitle}>Top Selling Products</Text>
          {topProducts.map((product, index) => (
            <MotiView
              key={product.name}
              from={{ opacity: 0, translateX: -50 }}
              animate={{ opacity: 1, translateX: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: (index + 5) * 100,
              }}
              style={styles.productRow}
            >
              <View style={styles.productInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productSales}>{product.sales}</Text>
              </View>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <MotiView
                    from={{ width: 0 }}
                    animate={{ width: `${product.percentage}%` }}
                    transition={{
                      type: 'spring',
                      damping: 15,
                      stiffness: 100,
                      delay: (index + 6) * 100,
                    }}
                    style={styles.progressFill}
                  />
                </View>
                <Text style={styles.progressText}>{product.percentage}%</Text>
              </View>
            </MotiView>
          ))}
        </AnimatedCard>

        {/* Recent Transactions */}
        <AnimatedCard
          delay={5}
          style={styles.transactionsCard}
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
        >
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {recentTransactions.map((transaction, index) => (
            <MotiView
              key={transaction.id}
              from={{ opacity: 0, translateY: 20 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{
                type: 'spring',
                damping: 15,
                stiffness: 100,
                delay: (index + 6) * 100,
              }}
              style={styles.transactionRow}
            >
              <View style={styles.transactionIcon}>
                <Ionicons name="person-circle" size={40} color="#8B5CF6" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.customerName}>{transaction.customer}</Text>
                <Text style={styles.productName}>{transaction.product}</Text>
                <Text style={styles.transactionTime}>{transaction.time}</Text>
              </View>
              <Text style={styles.transactionAmount}>{transaction.amount}</Text>
            </MotiView>
          ))}
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
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  periodSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 4,
  },
  periodText: {
    color: '#A78BFA',
    fontFamily: 'Inter-Medium',
    fontSize: 14,
  },
  summaryContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 30,
  },
  summaryCard: {
    flex: 1,
  },
  summaryContent: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  summaryChange: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  chartCard: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 20,
  },
  chart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    height: 160,
  },
  chartColumn: {
    alignItems: 'center',
    flex: 1,
  },
  chartBar: {
    width: 24,
    borderRadius: 12,
    marginBottom: 8,
  },
  chartLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 2,
  },
  chartValue: {
    fontSize: 10,
    fontFamily: 'Inter-SemiBold',
    color: '#8B5CF6',
  },
  topProductsCard: {
    marginBottom: 30,
  },
  productRow: {
    marginBottom: 16,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  productName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
  },
  productSales: {
    fontSize: 14,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#8B5CF6',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
    color: '#6B7280',
    width: 35,
    textAlign: 'right',
  },
  transactionsCard: {
    marginBottom: 30,
  },
  transactionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  transactionIcon: {
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
});