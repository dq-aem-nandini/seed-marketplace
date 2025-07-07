import api from './axios';
import {
  ProductDTO,
  WebResponseDTO,
  ProductModel,
  OrderModel,
  UserModel,
  // LoginResponseDTO,
} from './types';

// ========== PRODUCTS ==========

export const getProducts = async (
  query?: Record<string, any>
): Promise<WebResponseDTO<ProductDTO[]>> => {
  const res = await api.get<WebResponseDTO<ProductDTO[]>>('/web/api/v1/product', {
    params: query,
  });
  return res.data;
};

export const getMyProducts = async (
  query?: Record<string, any>
): Promise<WebResponseDTO<ProductDTO[]>> => {
  const res = await api.get<WebResponseDTO<ProductDTO[]>>('/web/api/v1/product', {
    params: {
      page: 0,
      size: 10,
      isForUserSpecific: true,
      ...query,
    },
  });
  return res.data;
};

export const createProduct = async (
  productForm: FormData
): Promise<WebResponseDTO<string>> => {
  const res = await api.post<WebResponseDTO<string>>('/web/api/v1/product', productForm, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const updateProduct = async (
  productForm: FormData
): Promise<WebResponseDTO<string>> => {
  const res = await api.put<WebResponseDTO<string>>('/web/api/v1/product/update', productForm, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return res.data;
};

export const viewProduct = async (
  productId: number
): Promise<WebResponseDTO<ProductDTO>> => {
  const res = await api.get<WebResponseDTO<ProductDTO>>(
    `/web/api/v1/product/view`,
    {
      params: { productId },
    }
  );
  return res.data;
};

export const deleteProduct = async (
  id: number
): Promise<WebResponseDTO<string>> => {
  const res = await api.delete<WebResponseDTO<string>>(`/web/api/v1/product/${id}`);
  return res.data;
};

// ========== ORDERS ==========

export const getOrders = async (
  buyerId: string
): Promise<WebResponseDTO<any[]>> => {
  const res = await api.get<WebResponseDTO<any[]>>('/web/api/v1/order', {
    params: { buyerId },
  });
  return res.data;
};

export const placeOrder = async (
  order: OrderModel,
  buyerId: string
): Promise<WebResponseDTO<string>> => {
  const res = await api.post<WebResponseDTO<string>>('/web/api/v1/order', order, {
    headers: { buyerId },
  });
  return res.data;
};

export const viewOrder = async (
  orderId: number
): Promise<WebResponseDTO<any>> => {
  const res = await api.get<WebResponseDTO<any>>('/web/api/v1/order/view', {
    params: { orderId },
  });
  return res.data;
};

export const cancelOrder = async (
  id: number
): Promise<WebResponseDTO<string>> => {
  const res = await api.delete<WebResponseDTO<string>>(`/web/api/v1/order/${id}`);
  return res.data;
};

// ========== USERS ==========

export const getUser = async (
  userId: string
): Promise<WebResponseDTO<UserModel>> => {
  const res = await api.get<WebResponseDTO<UserModel>>('/web/api/v1/user/view', {
    params: { userId },
  });
  return res.data;
};

export const getAllUsers = async (
  query?: Record<string, any>
): Promise<WebResponseDTO<UserModel[]>> => {
  const res = await api.get<WebResponseDTO<UserModel[]>>('/web/api/v1/user', {
    params: query,
  });
  return res.data;
};

export const updateUser = async (
  user: Partial<UserModel>
): Promise<WebResponseDTO<string>> => {
  const res = await api.put<WebResponseDTO<string>>('/web/api/v1/user/update', null, {
    params: user,
  });
  return res.data;
};

export const deleteUser = async (
  id: string
): Promise<WebResponseDTO<string>> => {
  const res = await api.delete<WebResponseDTO<string>>(`/web/api/v1/user/${id}`);
  return res.data;
};

// ========== USER PROFILE HELPERS ==========

export const getUserById = async (
  userId: string
): Promise<WebResponseDTO<UserModel>> => {
  const res = await api.get<WebResponseDTO<UserModel>>('/web/api/v1/user/view', {
    params: { userId },
  });
  return res.data;
};

export const updateUserProfile = async (
  user: Partial<UserModel>
): Promise<WebResponseDTO<string>> => {
  const res = await api.put<WebResponseDTO<string>>('/web/api/v1/user/update', null, {
    params: user,
  });
  return res.data;
};
