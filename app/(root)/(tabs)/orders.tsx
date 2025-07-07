import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import { useEffect, useState } from "react";
import { getOrders } from "@/api/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      const buyerId = await AsyncStorage.getItem("userId");
      if (!buyerId) {
        setError("No buyer id found, please login again.");
        return;
      }
      const res = await getOrders(buyerId);
      setOrders(res.response || []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch orders.");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/profile")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 22, fontWeight: "bold", marginLeft: 12 }}>
        Your Orders
        </Text>

      </View>
      

      {error && (
        <TouchableOpacity onPress={fetchOrders}>
          <Text style={styles.errorText}>{error}. Tap to retry.</Text>
        </TouchableOpacity>
      )}

      <FlatList
        data={orders}
        keyExtractor={(item, index) => `order-${index}`}
        renderItem={({ item }) => {
          const orderedDate = new Date(item.orderedAt);
          const formattedDate = orderedDate.toLocaleDateString(undefined, {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
          const formattedTime = orderedDate.toLocaleTimeString(undefined, {
            hour: "2-digit",
            minute: "2-digit",
          });

          // status color
          const statusColor =
            item.status === "ORDERED"
              ? "#16a34a" // green
              : item.status === "CANCELLED"
              ? "#dc2626" // red
              : "#2563eb"; // fallback blue

          return (
            <View style={styles.orderCard}>
              <Text style={styles.orderDate}>
                Ordered on {formattedDate} at {formattedTime}
              </Text>

              {item.orderItems?.map((orderItem: any, idx: number) => (
                <View
                  key={`order-${idx}-${orderItem.productId}`}
                  style={styles.productRow}
                >
                  <Image
                    source={{
                      uri: orderItem.sampleImage
                        ? `http://192.168.1.26:8081/${orderItem.sampleImage}`
                        : "https://cdn.pixabay.com/photo/2017/08/30/07/52/bird-2690483_1280.jpg",
                    }}
                    style={styles.productImage}
                  />
                  <View style={styles.productInfo}>
                    <Text style={styles.productName}>
                      {orderItem.productName}
                    </Text>
                    <Text style={styles.productPrice}>
                      ₹ {orderItem.pricePerKg} / kg
                    </Text>
                    <Text style={styles.productQty}>
                      Quantity: {orderItem.quantityInKg} kg
                    </Text>
                    <Text style={styles.productTotal}>
                      Total: ₹ {orderItem.totalPrice}
                    </Text>
                  </View>
                </View>
              ))}

              <View style={styles.footerRow}>
                <Text style={[styles.orderStatus, { color: statusColor }]}>
                  {item.status === "ORDERED"
                    ? "Order Delivered"
                    : item.status === "CANCELLED"
                    ? "Order Cancelled"
                    : item.status}
                </Text>
                <Text style={styles.totalPrice}>
                  Total Paid: ₹{" "}
                  {item.orderItems.reduce(
                    (acc: number, curr: any) => acc + curr.totalPrice,
                    0
                  )}
                </Text>
              </View>

              {/* If you want a cancel button later:
              {item.status === 'ORDERED' && (
                <TouchableOpacity style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel Order</Text>
                </TouchableOpacity>
              )}
              */}
            </View>
          );
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No orders found.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb", padding: 16 },
  
  errorText: { color: "red", textAlign: "center", marginBottom: 8 },
  orderCard: {
    backgroundColor: "white",
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  orderDate: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 12,
  },
  productRow: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
  },
  productImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#e5e7eb",
  },
  productInfo: {
    marginLeft: 12,
    flex: 1,
  },
  productName: { fontSize: 16, fontWeight: "bold", color: "#111827" },
  productPrice: { color: "#10b981", marginTop: 4 },
  productQty: { color: "#6b7280", marginTop: 2 },
  productTotal: { color: "#f97316", marginTop: 2 },
  footerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
    alignItems: "center",
  },
  orderStatus: {
    fontWeight: "bold",
    fontSize: 14,
  },
  totalPrice: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#111827",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 40,
    color: "#6b7280",
  },
  cancelButton: {
    marginTop: 8,
    backgroundColor: "#dc2626",
    padding: 8,
    borderRadius: 4,
    alignItems: "center",
  },
  cancelButtonText: { color: "white", fontWeight: "bold" },
});
