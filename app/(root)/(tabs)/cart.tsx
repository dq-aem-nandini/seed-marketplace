import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  TextInput,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import { useCart } from "@/app/context/CartContext";
import { placeOrder } from "@/api/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type ProductType = {
  id: number;
  name: string;
  pricePerKg: number;
  remainingQuantityKg: number;
  image?: string;
  description: string;
};

export default function Cart() {
  const { cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart } =
    useCart();

  const [selectedProduct, setSelectedProduct] = useState<ProductType | null>(
    null
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [inputQty, setInputQty] = useState("");
  const [unit, setUnit] = useState<"kg" | "g">("kg");

  const openModal = (product: ProductType) => {
    setSelectedProduct(product);
    setInputQty("");
    setUnit("kg");
    setModalVisible(true);
  };

  const confirmAdd = () => {
    if (!inputQty || !selectedProduct || isNaN(Number(inputQty))) return;

    let qtyGrams = parseFloat(inputQty);
    if (unit === "kg") qtyGrams *= 1000;

    const addedQtyGrams =
      cartItems.find((c) => c.product.id === selectedProduct.id)
        ?.quantityGrams || 0;
    const availableGrams =
      selectedProduct.remainingQuantityKg * 1000 - addedQtyGrams;

    if (qtyGrams > availableGrams) {
      Alert.alert("Not enough stock available");
      return;
    }

    addToCart({ ...selectedProduct, quantityKg: qtyGrams / 1000 }, qtyGrams);
    setModalVisible(false);
  };

  const handlePlaceOrder = async () => {
    try {
      const buyerId = await AsyncStorage.getItem("userId");
      if (!buyerId) {
        Alert.alert("Error", "No buyer ID found. Please login again.");
        return;
      }

      const orderItems = cartItems.map((item) => ({
        productId: item.product.id,
        quantityInKg: item.quantityGrams / 1000,
      }));

      if (orderItems.length === 0) {
        Alert.alert("Empty cart", "Please add products to your cart first.");
        return;
      }

      const orderPayload = {
        deliveryAddressId: 1,
        orderItems,
      };

      const res = await placeOrder(orderPayload, buyerId);

      if (res.flag) {
        Alert.alert("Success", res.message || "Order placed successfully ✅");
        clearCart();
        router.push("/(root)/(tabs)/orders");
      } else {
        Alert.alert("Failed", res.message || "Order could not be placed");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", (error as any)?.message || "Something went wrong");
    }
  };

  const getTotalAmount = () => {
    return cartItems
      .reduce(
        (total, item) =>
          total + (item.product.pricePerKg * item.quantityGrams) / 1000,
        0
      )
      .toFixed(2);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Header */}
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <TouchableOpacity onPress={() => router.push("/(root)/(tabs)")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: "bold", marginLeft: 12 }}>
          Your Cart
        </Text>
      </View>

      {/* Empty */}
      {cartItems.length === 0 ? (
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Cart is empty
        </Text>
      ) : (
        <>
          {/* Cart List */}
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.product.id.toString()}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: "#f5f5f5",
                  marginBottom: 12,
                  padding: 12,
                  borderRadius: 6,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{
                      uri: item.product.image
                        ? `https://seed-market-place-dev.up.railway.app/${item.product.image}`
                        : "https://cdn.pixabay.com/photo/2024/05/26/10/15/bird-8788491_1280.jpg",
                    }}
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 6,
                      marginRight: 10,
                    }}
                  />
                  <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                      {item.product.name}
                    </Text>
                    <Text>
                      Quantity: {(item.quantityGrams / 1000).toFixed(2)} kg
                    </Text>
                    <Text>
                      Amount: ₹{" "}
                      {(item.product.pricePerKg * item.quantityGrams) / 1000}
                    </Text>
                  </View>

                  {/* +/- Buttons */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <TouchableOpacity
                      onPress={() => decreaseQuantity(item.product.id, 1000)}
                      style={{
                        backgroundColor: "lightgray",
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                        marginRight: 5,
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>−</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => openModal(item.product)}
                      style={{
                        backgroundColor: "lightgray",
                        borderRadius: 4,
                        paddingHorizontal: 10,
                        paddingVertical: 6,
                      }}
                    >
                      <Text style={{ fontSize: 18 }}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />

          <Text
            style={{ fontSize: 18, fontWeight: "bold", marginVertical: 12 }}
          >
            Total Amount: ₹ {getTotalAmount()}
          </Text>

          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={{
              backgroundColor: "purple",
              padding: 12,
              borderRadius: 6,
            }}
          >
            <Text style={{ color: "white", textAlign: "center" }}>
              Place Order
            </Text>
          </TouchableOpacity>
        </>
      )}

      {/* Add More Modal */}
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
                    <Text style={styles.price}>
                      ₹ {selectedProduct?.pricePerKg} /kg
                    </Text>
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
  price: { color: "purple", fontSize: 16 },
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
