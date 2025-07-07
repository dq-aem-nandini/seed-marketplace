import { useLocalSearchParams, useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { viewProduct } from "@/api/services";
import { Ionicons } from "@expo/vector-icons";

export default function ProductupdatedDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<any>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await viewProduct(Number(id));
        setProduct(res.response);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Product not found.</Text>
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)/myproducts")}>
          <Text style={{ marginTop: 10, color: "blue" }}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.backBtn}
        onPress={() => router.push("/(root)/(tabs)/myproducts")}
      >
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <Image
        source={{
          uri: product.image
            ? `http://192.168.1.26:8081/${product.image}`
            : "https://cdn.pixabay.com/photo/2017/08/30/07/52/bird-2690483_1280.jpg",
        }}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹ {product.pricePerKg} /kg</Text>
        <Text style={styles.stock}>
          Quantity Available: {product.quantityKg} kg
        </Text>
        <Text style={styles.description}>{product.description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  backBtn: {
    padding: 12,
    position: "absolute",
    top: 40,
    left: 10,
    zIndex: 1,
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  image: { width: "100%", height: 300 },
  content: { padding: 16 },
  name: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  price: { fontSize: 18, color: "#10b981", marginBottom: 4 },
  stock: { fontSize: 16, color: "#f59e0b", marginBottom: 12 },
  description: { fontSize: 16, color: "#4B5563" },
});
