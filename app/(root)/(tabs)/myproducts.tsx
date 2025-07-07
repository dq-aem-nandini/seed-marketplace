import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { getMyProducts, deleteProduct } from "@/api/services";
import useFetch from "@/hooks/useFetch";
import CreateProduct from "@/app/components/CreateProduct";
import { useRouter } from "expo-router"; // ✅ Import router

export default function Products() {
  const { data: response, loading, error, refetch } = useFetch(getMyProducts);
  const products = response?.response || [];

  const [showModal, setShowModal] = useState(false);
  const [editProduct, setEditProduct] = useState<any>(null);
  const router = useRouter(); // ✅ Initialize router

  const handleDelete = async (id: number) => {
    Alert.alert("Confirm", "Are you sure you want to delete this product?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: async () => {
          try {
            await deleteProduct(id);
            Alert.alert("Deleted", "Product removed");
            refetch();
          } catch (e) {
            Alert.alert("Error", "Failed to delete product");
          }
        },
        style: "destructive",
      },
    ]);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditProduct(null);
    refetch();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>My Products</Text>
          <Text style={styles.subtitle}>Manage your product listings</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            setEditProduct(null);
            setShowModal(true);
          }}
        >
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#2563eb" />
        </View>
      ) : products.length === 0 ? (
        <View style={styles.empty}>
          <Ionicons name="cube-outline" size={48} color="#9ca3af" />
          <Text style={styles.emptyText}>No products yet</Text>
          <Text style={styles.emptySub}>Add your first product to get started</Text>
        </View>
      ) : (
        <FlatList
          data={products}
          contentContainerStyle={{ paddingBottom: 100 }}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.card}
              activeOpacity={0.9}
              onPress={() => router.push(`/product/${item.id}`)} // ✅ Navigate to detail
            >
              <Image
                source={{
                  uri: item.image
                    ? `http://192.168.1.26:8081/${item.image}`
                    : "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
                }}
                style={styles.image}
              />
              <View style={styles.cardContent}>
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDesc}>{item.description}</Text>
                <Text style={styles.cardPrice}>₹ {item.pricePerKg} /kg</Text>
                <Text style={styles.cardStock}>{item.quantityKg} kg available</Text>
              </View>

              <View style={{ justifyContent: "space-between", alignItems: "center" ,}}>
                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation(); // ✅ Prevents click propagation to detail nav
                    setEditProduct(item);
                    setShowModal(true);
                  }}
                >
                  <Ionicons name="create-outline" size={24} color="#2563eb" />
                  <Text style={{paddingBottom:25}}>Edit</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={(e) => {
                    e.stopPropagation(); // ✅ Prevents click propagation to detail nav
                    handleDelete(item.id);
                  }}
                >
                  <Ionicons name="trash-outline" size={24} color="red" />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}

      <Modal visible={showModal} animationType="slide">
        <CreateProduct onClose={closeModal} editData={editProduct} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9fafb" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  title: { fontSize: 22, fontWeight: "bold", color: "#111827" },
  subtitle: { color: "#6b7280", fontSize: 14 },
  addButton: {
    backgroundColor: "#2563eb",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  addButtonText: { color: "white", fontWeight: "600" },
  empty: { flex: 1, justifyContent: "center", alignItems: "center" },
  emptyText: { marginTop: 10, fontSize: 16, fontWeight: "600", color: "#111827" },
  emptySub: { color: "#6b7280", marginTop: 4 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 4,
    alignItems: "center",
  },
  image: { width: 80, height: 80, borderRadius: 8 },
  cardContent: { marginLeft: 12, flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: "bold", color: "#111827" },
  cardDesc: { color: "#6b7280", marginVertical: 4 },
  cardPrice: { color: "#10b981", fontWeight: "bold" },
  cardStock: { color: "#6B21A8" },
});
