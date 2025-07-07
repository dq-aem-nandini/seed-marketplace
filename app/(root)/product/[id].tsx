import { useLocalSearchParams, router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Alert, TextInput, Modal } from "react-native";
import { viewProduct } from "@/api/services";
import { ProductDTO } from "@/api/types";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "@/app/context/CartContext";

export default function ProductDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDTO | null>(null);
  const [loading, setLoading] = useState(true);

  // cart
  const { cartItems, addToCart, removeFromCart } = useCart();

  // modal controls
  const [modalVisible, setModalVisible] = useState(false);
  const [inputQty, setInputQty] = useState("");
  const [unit, setUnit] = useState<"kg" | "g">("kg");

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const res = await viewProduct(Number(id));
      if (res.flag) {
        setProduct(res.response);
      } else {
        Alert.alert("Error", res.message);
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const getAddedQtyNumber = () => {
    const found = cartItems.find((c) => c.product.id === product?.id);
    return found ? found.quantityGrams / 1000 : 0;
  };

  const confirmAdd = () => {
    if (!inputQty || !product) return;
    let qtyGrams = parseFloat(inputQty);
    if (unit === "kg") qtyGrams *= 1000;

    const currentAdded = getAddedQtyNumber() * 1000;
    const availableGrams = product.remainingQuantityKg * 1000 - currentAdded;

    if (qtyGrams > availableGrams) {
      alert("Not enough stock available");
      return;
    }

    addToCart(product, qtyGrams);
    setModalVisible(false);
  };

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
      </View>
    );
  }

  const addedQty = getAddedQtyNumber();
  const remainingStock = product.remainingQuantityKg - addedQty;

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "white", padding: 16 }}>
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 12 }}>
        <Ionicons name="arrow-back" size={24} />
      </TouchableOpacity>

      <Image
        source={{
          uri: product.image
            ? `https://seed-market-place-dev.up.railway.app/${product.image}`
            : "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
        }}
        style={styles.image}
      />

      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.desc}>{product.description}</Text>
      <Text style={styles.price}>₹ {product.pricePerKg} / kg</Text>
      <Text style={styles.stock}>
        Available: {remainingStock > 0 ? `${remainingStock} kg` : "No stock available"}
      </Text>
      {addedQty > 0 && (
        <Text style={styles.addedQty}>
          Added to cart: {addedQty} kg
        </Text>
      )}

      {remainingStock > 0 && (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            setInputQty("");
            setUnit("kg");
            setModalVisible(true);
          }}
        >
          <Text style={{ color: "white" }}>Add to Cart</Text>
        </TouchableOpacity>
      )}

      {addedQty > 0 && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: "red", marginTop: 8 }]}
          onPress={() => removeFromCart(product.id)}
        >
          <Text style={{ color: "white" }}>Remove from Cart</Text>
        </TouchableOpacity>
      )}

      {/* MODAL for quantity selection */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.modalClose}
              onPress={() => setModalVisible(false)}
            >
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>

            <Text style={styles.modalTitle}>{product.name}</Text>
            <Text style={styles.price}>₹ {product.pricePerKg} /kg</Text>

            <View style={styles.modalRow}>
              <TextInput
                placeholder={`Qty in ${unit}`}
                keyboardType="numeric"
                value={inputQty}
                onChangeText={setInputQty}
                style={[styles.input, { flex: 1, marginRight: 8 }]}
              />
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "kg" && styles.unitButtonActive,
                ]}
                onPress={() => setUnit("kg")}
              >
                <Text style={unit === "kg" ? styles.unitButtonActiveText : styles.unitButtonText}>
                  Kg
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.unitButton,
                  unit === "g" && styles.unitButtonActive,
                ]}
                onPress={() => setUnit("g")}
              >
                <Text style={unit === "g" ? styles.unitButtonActiveText : styles.unitButtonText}>
                  Grams
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ marginVertical: 8 }}>
              Total: ₹
              {inputQty
                ? (
                    (unit === "kg"
                      ? parseFloat(inputQty)
                      : parseFloat(inputQty) / 1000) * product.pricePerKg
                  ).toFixed(2)
                : "0"}
            </Text>
            <TouchableOpacity style={styles.modalAdd} onPress={confirmAdd}>
              <Text style={{ color: "white" }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 250, borderRadius: 8, marginBottom: 16 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 8 },
  desc: { fontSize: 16, color: "#555", marginBottom: 8 },
  price: { fontSize: 18, color: "purple", marginBottom: 4 },
  stock: { fontSize: 16, color: "orange", marginBottom: 4 },
  addedQty: { fontSize: 16, color: "green", marginBottom: 12 },
  button: { backgroundColor: "purple", padding: 12, borderRadius: 8, alignItems: "center", marginTop: 8 },
  modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)", justifyContent: "center", alignItems: "center" },
  modalContent: { backgroundColor: "#fff", width: "90%", borderRadius: 8, padding: 16, maxHeight: 400 },
  modalClose: { position: "absolute", right: 8, top: 8, zIndex: 10 },
  modalTitle: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  modalRow: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  unitButton: {
    borderWidth: 1,
    borderColor: "#888",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 4,
    borderRadius: 4,
    backgroundColor: "#f5f5f5",
  },
  unitButtonActive: { backgroundColor: "purple" },
  unitButtonText: { color: "black" },
  unitButtonActiveText: { color: "white" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 8, borderRadius: 4 },
  modalAdd: {
    backgroundColor: "purple",
    padding: 12,
    borderRadius: 4,
    marginTop: 8,
    alignItems: "center",
  },
});
