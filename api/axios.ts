import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Constants from "expo-constants";
import { logger } from "@/utils/logger";
import { router } from "expo-router";

const BASE_URL = Constants.expoConfig?.extra?.apiBaseUrl;

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    logger.apiRequest(
      config.method?.toUpperCase() || "GET",
      config.url || "",
      config.data
    );

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    logger.apiError("REQUEST Failded", error.config?.url || "", error);
    console.log("API Request Error:", error);

    return Promise.reject(error);
  }
);

// api.interceptors.response.use(
//   (response) => {
//     // logger.apiResponse(
//     //   response.config.method?.toUpperCase() || 'GET',
//     //   response.config.url || '',
//     //   response.status,
//     //   response.data
//     // );
//     return response;
//   },
//   (error) => {
//     // logger.apiError(
//     //   error.config?.method?.toUpperCase() || 'GET',
//     //   error.config?.url || '',
//     //   error
//     // );
//     console.log("API Response Error:", error.response);

//     return Promise.reject(error);
//   }
// );

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const status = error.response?.status;

    if (status === 401) {
      console.warn("Unauthorized: Removing token and redirecting to login");

      // 🧹 Clear token from AsyncStorage (or your token store)
      await AsyncStorage.removeItem("userToken");

      // ✅ Optional: redirect user to login
      // router.replace('/(auth)/sign-in'); // change route based on your app

      // Optionally: Show a toast or alert
      // Alert.alert("Session expired", "Please login again.");

      // Optionally: cancel the failed request here (don't retry)
    }

    // return Promise.reject(error);
  }
);

export default api;
