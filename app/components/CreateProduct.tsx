import { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { createProduct, updateProduct } from "@/api/services";

export default function CreateProduct({
  onClose,
  editData,
}: {
  onClose: () => void;
  editData?: any;
}) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [image, setImage] = useState<string | null>(null);

  // Fill data if editing
  useEffect(() => {
    if (editData) {
      setName(editData.name || "");
      setDescription(editData.description || "");
      setQuantityKg(editData.quantityKg?.toString() || "");
      setPricePerKg(editData.pricePerKg?.toString() || "");
      setImage(editData.image ? `http://192.168.1.26:8081/${editData.image}` : null);
    }
  }, [editData]);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleSubmit = async () => {
    if (!name || !description || !quantityKg || !pricePerKg) {
      Alert.alert("Please fill all fields");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("quantityKg", quantityKg);
    formData.append("pricePerKg", pricePerKg);

    if (editData?.id) {
      formData.append("id", editData.id.toString());
    }

    if (image && !image.startsWith("http")) {
      const filename = image.split("/").pop() || "file.jpg";
      const match = /\.(\w+)$/.exec(filename);
      const ext = match ? match[1] : "jpg";
      formData.append("image", {
        uri: image,
        name: filename,
        type: `image/${ext}`,
      } as any);
    }

    try {
      if (editData) {
        const res = await updateProduct(formData);
        if (res.flag) {
          Alert.alert("Success", "Product updated successfully");
          onClose();
        } else {
          Alert.alert("Error", res.message);
        }
      } else {
        const res = await createProduct(formData);
        if (res.flag) {
          Alert.alert("Success", "Product created successfully");
          onClose();
        } else {
          Alert.alert("Error", res.message);
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={{ fontSize: 18 }}>✕</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>{editData ? "Edit" : "Create"} Product</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      <TextInput
        placeholder="Quantity (kg)"
        value={quantityKg}
        onChangeText={setQuantityKg}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Price per kg"
        value={pricePerKg}
        onChangeText={setPricePerKg}
        keyboardType="numeric"
        style={styles.input}
      />

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        <Text style={{ color: "white" }}>Pick Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: image }}
          style={{ width: 120, height: 120, marginVertical: 10 }}
        />
      )}

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={{ color: "white" }}>{editData ? "Update" : "Submit"}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "white" },
  heading: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    marginVertical: 8,
    padding: 12,
    borderRadius: 4,
  },
  imagePicker: {
    backgroundColor: "purple",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 8,
  },
  button: {
    backgroundColor: "green",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 16,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 8,
  },
});
