import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AnimatedCard from '../../components/AnimatedCard';
import AnimatedButton from '../../components/AnimatedButton';

const orderStatuses = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered'];

const mockOrders = [
  {
    id: '#ORD-001',
    customer: 'Alice Johnson',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
    products: ['Premium Tomato Seeds', 'Organic Fertilizer'],
    total: '$43.49',
    status: 'Delivered',
    date: '2024-01-15',
    items: 2,
  },
  {
    id: '#ORD-002',
    customer: 'Bob Smith',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
    products: ['Garden Tools Set'],
    total: '$89.99',
    status: 'Shipped',
    date: '2024-01-14',
    items: 1,
  },
  {
    id: '#ORD-003',
    customer: 'Carol Davis',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
    products: ['Plant Growth Light', 'Watering Can'],
    total: '$118.74',
    status: 'Processing',
    date: '2024-01-13',
    items: 2,
  },
  {
    id: '#ORD-004',
    customer: 'David Wilson',
    avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
    products: ['Cucumber Seeds'],
    total: '$12.99',
    status: 'Pending',
    date: '2024-01-12',
    items: 1,
  },
  {
    id: '#ORD-005',
    customer: 'Emma Brown',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=100',
    products: ['Premium Seeds Pack', 'Garden Gloves'],
    total: '$67.50',
    status: 'Delivered',
    date: '2024-01-11',
    items: 2,
  },
];

const statusColors = {
  Pending: { bg: '#FEF3C7', text: '#D97706', icon: 'time' },
  Processing: { bg: '#DBEAFE', text: '#2563EB', icon: 'refresh' },
  Shipped: { bg: '#E0E7FF', text: '#7C3AED', icon: 'airplane' },
  Delivered: { bg: '#D1FAE5', text: '#059669', icon: 'checkmark-circle' },
};

export default function OrdersScreen() {
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredOrders = selectedStatus === 'All' 
    ? mockOrders 
    : mockOrders.filter(order => order.status === selectedStatus);

  const orderStats = {
    total: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'Pending').length,
    processing: mockOrders.filter(o => o.status === 'Processing').length,
    shipped: mockOrders.filter(o => o.status === 'Shipped').length,
    delivered: mockOrders.filter(o => o.status === 'Delivered').length,
  };

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
          <Text style={styles.title}>Orders</Text>
          <View style={styles.headerStats}>
            <Text style={styles.totalOrders}>{orderStats.total}</Text>
            <Text style={styles.totalLabel}>Total Orders</Text>
          </View>
        </MotiView>

        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          <AnimatedCard
            delay={1}
            style={styles.statCard}
            colors={['#F59E0B', '#D97706']}
          >
            <View style={styles.statContent}>
              <Ionicons name="time" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{orderStats.pending}</Text>
              <Text style={styles.statLabel}>Pending</Text>
            </View>
          </AnimatedCard>

          <AnimatedCard
            delay={2}
            style={styles.statCard}
            colors={['#2563EB', '#1D4ED8']}
          >
            <View style={styles.statContent}>
              <Ionicons name="refresh" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{orderStats.processing}</Text>
              <Text style={styles.statLabel}>Processing</Text>
            </View>
          </AnimatedCard>

          <AnimatedCard
            delay={3}
            style={styles.statCard}
            colors={['#7C3AED', '#6D28D9']}
          >
            <View style={styles.statContent}>
              <Ionicons name="airplane" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{orderStats.shipped}</Text>
              <Text style={styles.statLabel}>Shipped</Text>
            </View>
          </AnimatedCard>

          <AnimatedCard
            delay={4}
            style={styles.statCard}
            colors={['#059669', '#047857']}
          >
            <View style={styles.statContent}>
              <Ionicons name="checkmark-circle" size={24} color="#FFFFFF" />
              <Text style={styles.statValue}>{orderStats.delivered}</Text>
              <Text style={styles.statLabel}>Delivered</Text>
            </View>
          </AnimatedCard>
        </View>

        {/* Status Filter */}
        <MotiView
          from={{ opacity: 0, translateX: -50 }}
          animate={{ opacity: 1, translateX: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 100, delay: 500 }}
          style={styles.filterContainer}
        >
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {orderStatuses.map((status, index) => (
              <MotiView
                key={status}
                from={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  type: 'spring',
                  damping: 15,
                  stiffness: 100,
                  delay: (index + 5) * 50,
                }}
              >
                <AnimatedButton
                  title={status}
                  onPress={() => setSelectedStatus(status)}
                  colors={selectedStatus === status ? ['#8B5CF6', '#7C3AED'] : ['rgba(255, 255, 255, 0.2)', 'rgba(255, 255, 255, 0.1)']}
                  textColor={selectedStatus === status ? '#FFFFFF' : '#A78BFA'}
                  size="small"
                />
              </MotiView>
            ))}
          </ScrollView>
        </MotiView>

        {/* Orders List */}
        <View style={styles.ordersList}>
          {filteredOrders.map((order, index) => (
            <AnimatedCard
              key={order.id}
              delay={index + 6}
              style={styles.orderCard}
              colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)']}
              onPress={() => {}}
            >
              <View style={styles.orderHeader}>
                <View style={styles.orderInfo}>
                  <Text style={styles.orderId}>{order.id}</Text>
                  <Text style={styles.orderDate}>{order.date}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[order.status as keyof typeof statusColors].bg }]}>
                  <Ionicons 
                    name={statusColors[order.status as keyof typeof statusColors].icon as any} 
                    size={12} 
                    color={statusColors[order.status as keyof typeof statusColors].text} 
                  />
                  <Text style={[styles.statusText, { color: statusColors[order.status as keyof typeof statusColors].text }]}>
                    {order.status}
                  </Text>
                </View>
              </View>

              <View style={styles.orderBody}>
                <Image source={{ uri: order.avatar }} style={styles.customerAvatar} />
                <View style={styles.orderDetails}>
                  <Text style={styles.customerName}>{order.customer}</Text>
                  <Text style={styles.orderProducts}>
                    {order.products.join(', ')}
                  </Text>
                  <View style={styles.orderFooter}>
                    <Text style={styles.orderItems}>{order.items} item{order.items > 1 ? 's' : ''}</Text>
                    <Text style={styles.orderTotal}>{order.total}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.orderActions}>
                <AnimatedButton title="View Details" colors={['#8B5CF6', '#7C3AED']} size="small" />
                {order.status === 'Pending' && (
                  <AnimatedButton title="Process" colors={['#10B981', '#059669']} size="small" />
                )}
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
  headerStats: {
    alignItems: 'flex-end',
  },
  totalOrders: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter-Bold',
  },
  totalLabel: {
    fontSize: 12,
    color: '#A78BFA',
    fontFamily: 'Inter-Medium',
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
  statValue: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Medium',
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  filterContainer: {
    marginBottom: 30,
  },
  ordersList: {
    gap: 16,
  },
  orderCard: {
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 16,
    fontFamily: 'Inter-Bold',
    color: '#1F2937',
    marginBottom: 2,
  },
  orderDate: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontFamily: 'Inter-SemiBold',
  },
  orderBody: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  customerAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  orderDetails: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1F2937',
    marginBottom: 4,
  },
  orderProducts: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
    marginBottom: 8,
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderItems: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8B5CF6',
  },
  orderTotal: {
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    color: '#10B981',
  },
  orderActions: {
    flexDirection: 'row',
    gap: 8,
  },
});