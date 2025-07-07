
// user
export interface UserModel {
  id?: string;
  name: string;
  userName: string;
  username?: string; // legacy fallback
  email: string;
  mobileNumber: string;
  adhaarNumber?: string;
  password?: string;
  isVerified?: boolean;
  emailVerified?: boolean;
  phoneVerified?: boolean;
  kycStatus?: boolean;
  approvalStatus?: boolean;
  isActive?: boolean;
  isDeleted?: boolean;
  isLoggedIn?: boolean;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  userRole?: {
    id: number;
    name: string;
  };
}



// login
// export interface UserPrinciple {
//   userName: string;
//   password: string;
// }

// export interface LoginResponseDTO {
//   accessToken: string;
//   headerUserId: string;
//   name: string;
//   email: string;
//   responseMessage: string;
//   profilePhoto: string;
// }

// product
export interface ProductModel {
  id?: number;
  name: string;
  description: string;
  quantityKg: number;
  pricePerKg: number;
  image?: string;
  sampleImage?: string;
}

export interface ProductDTO {
  id: number;
  name: string;
  description: string;
  quantityKg: number;
  pricePerKg: number;
  remainingQuantityKg: number;
  image?: string;
}

// order
export interface OrderItemModel {
  productId: number;
  quantityInKg: number;
}

export interface OrderModel {
  deliveryAddressId: number;
  orderItems: OrderItemModel[];
}

// wrapper
export interface WebResponseDTO<T> {
  totalRecords: number;
  status: number;
  flag: boolean;
  message: string;
  response: T;
  otherInfo?: Record<string, unknown>;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  userName: string;
  name: string;
  email: string;
  password: string;
  mobileNumber: string;
  adhaarNumber: string;
}

export interface LoginResponse {
  accessToken: string;
  headerUserId: string;
  name: string;
  email: string;
}
