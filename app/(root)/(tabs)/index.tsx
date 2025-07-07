// Home.tsx
import { getProducts } from "@/api/services";
import useFetch from "@/hooks/useFetch";
import {
  ActivityIndicator,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { useState, useCallback } from "react";
import { router, useFocusEffect } from "expo-router";
import { useCart as useCartContext } from "@/app/context/CartContext";
import { Ionicons } from "@expo/vector-icons";

export default function Home() {
  const { data: response, loading, error, refetch } = useFetch(getProducts);

  const products = (response?.response || []).filter(
    (product) => product.remainingQuantityKg > 0
  );

  const { cartItems, addToCart } = useCartContext();

  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [inputQty, setInputQty] = useState("");
  const [unit, setUnit] = useState<"kg" | "g">("kg");

  // Refetch on focus
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [])
  );

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setInputQty("");
    setUnit("kg");
    setModalVisible(true);
  };

  const confirmAdd = () => {
    if (!inputQty) return;

    let qtyGrams = parseFloat(inputQty);
    if (unit === "kg") qtyGrams *= 1000;

    const currentAdded = getAddedQtyNumber(selectedProduct.id) * 1000;
    const availableGrams =
      selectedProduct.remainingQuantityKg * 1000 - currentAdded;

    if (qtyGrams > availableGrams) {
      alert("Not enough stock available");
      return;
    }

    addToCart(selectedProduct, qtyGrams);
    setModalVisible(false);
  };

  const getAddedQtyNumber = (id: number) => {
    const found = cartItems.find((c) => c.product.id === id);
    return found ? found.quantityGrams / 1000 : 0;
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="purple" />
      </View>
    );

  if (error)
    return (
      <View style={styles.center}>
        <Text style={{ color: "red" }}>Error loading products</Text>
        <TouchableOpacity onPress={refetch}>
          <Text style={{ color: "purple", marginTop: 8 }}>Retry</Text>
        </TouchableOpacity>
      </View>
    );

  if (products.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "gray" }}>All items are out of stock.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "white", padding: 12 }}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 100 }}
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const addedQty = getAddedQtyNumber(item.id);
          const remainingStock = item.remainingQuantityKg - addedQty;

          return (
            <View style={styles.card}>
              <TouchableOpacity
                style={{ flexDirection: "row", flex: 1 }}
                onPress={() => router.push(`/product/${item.id}`)}
              >
                <Image
                  source={{
                    uri: item.image
                      ? `https://seed-market-place-dev.up.railway.app/${item.image}`
                      : "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
                  }}
                  style={styles.leftImage}
                />
                <View style={styles.middleInfo}>
                  <Text style={styles.title}>{item.name}</Text>
                  <Text style={styles.description}>{item.description}</Text>
                  <Text style={styles.price}>₹ {item.pricePerKg} /kg</Text>
                  <Text style={{ fontSize: 16, color: "red" }}>
                    Stock left: {remainingStock.toFixed(2)} kg
                  </Text>
                  {addedQty > 0 && (
                    <Text style={styles.addedQty}>
                      Added to cart: {addedQty} kg
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => openModal(item)}
              >
                <Text style={{ color: "white" }}>ADD</Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />

      {cartItems.length > 0 && (
        <TouchableOpacity
          style={styles.viewCart}
          onPress={() => router.push("/(root)/(tabs)/cart")}
        >
          <Text style={{ color: "white" }}>
            View Cart ({cartItems.length} item{cartItems.length > 1 ? "s" : ""})
          </Text>
        </TouchableOpacity>
      )}

      {/* MODAL */}
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

            <View style={styles.modalRow}>
              <Image
                source={{
                  uri: selectedProduct?.image
                    ? `https://seed-market-place-dev.up.railway.app/${selectedProduct?.image}`
                    : "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
                }}
                style={styles.modalImage}
              />
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.modalTitle}>{selectedProduct?.name}</Text>
                <Text style={styles.price}>₹ {selectedProduct?.pricePerKg} /kg</Text>
              </View>
            </View>

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
                <Text
                  style={
                    unit === "kg"
                      ? styles.unitButtonActiveText
                      : styles.unitButtonText
                  }
                >
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
                <Text
                  style={
                    unit === "g"
                      ? styles.unitButtonActiveText
                      : styles.unitButtonText
                  }
                >
                  Grams
                </Text>
              </TouchableOpacity>
            </View>

            <Text style={{ marginVertical: 8 }}>
              Total: ₹
              {selectedProduct &&
                inputQty &&
                (
                  (unit === "kg"
                    ? parseFloat(inputQty)
                    : parseFloat(inputQty) / 1000) * selectedProduct.pricePerKg
                ).toFixed(2)}
            </Text>
            <TouchableOpacity style={styles.modalAdd} onPress={confirmAdd}>
              <Text style={{ color: "white" }}>Add to Cart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    flexDirection: "row",
    backgroundColor: "#eee",
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  leftImage: { width: 110, height: 120, borderRadius: 8 },
  middleInfo: { flex: 1, marginLeft: 15 },
  title: { fontWeight: "bold", fontSize: 20 },
  description: { color: "#666", fontSize: 16, paddingRight: 3 },
  price: { color: "purple", fontSize: 16 },
  addedQty: { color: "green", fontSize: 16 },
  addButton: {
    backgroundColor: "purple",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    marginLeft: 8,
    fontWeight: "bold",
  },
  viewCart: {
    position: "absolute",
    bottom: 10,
    alignSelf: "center",
    backgroundColor: "purple",
    padding: 12,
    borderRadius: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 8,
    padding: 16,
    maxHeight: 390,
  },
  modalClose: { position: "absolute", right: 8, top: 8, zIndex: 10 },
  modalRow: { flexDirection: "row", alignItems: "center", marginVertical: 12 },
  modalImage: { width: 120, height: 120, borderRadius: 4 },
  modalTitle: { fontSize: 20, fontWeight: "700" },
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
