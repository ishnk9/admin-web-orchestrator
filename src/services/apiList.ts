// API Endpoints Configuration
export const API_ENDPOINTS = {
  // Admin endpoints
  ADMINS: {
    CREATE: '/api/admins',
    GET_ALL: '/api/admins',
    VERIFY_EMAIL: (token: string) => `/api/admins/verify-email/${token}`,
    RESEND_VERIFICATION: (adminId: string) => `/api/admins/${adminId}/resend-verification`,
    GET_BY_ID: (id: string) => `/api/admins/${id}`,
    UPDATE: (id: string) => `/api/admins/${id}`,
    DELETE: (id: string) => `/api/admins/${id}`,
  },

  // Authentication endpoints
  AUTH: {
    SUPERADMIN_LOGIN: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/superadmin/login`,
    ADMIN_LOGIN: '/api/auth/admin/login',
    GET_PROFILE: '/api/auth/profile',
  },

  // SuperAdmin endpoints
  SUPERADMINS: {
    CREATE: '/api/superadmins',
    GET_ALL: '/api/superadmins',
    LOGIN: `/api/superadmins/login`,
    GET_BY_ID: (id: string) => `/api/superadmins/${id}`,
    UPDATE: (id: string) => `/api/superadmins/${id}`,
    DELETE: (id: string) => `/api/superadmins/${id}`,
  },

  // User endpoints
  USERS: {
    CREATE: '/api/users',
    GET_ALL: '/api/users',
    GET_BY_ID: (id: string) => `/api/users/${id}`,
    UPDATE: (id: string) => `/api/users/${id}`,
    DELETE: (id: string) => `/api/users/${id}`,
  },
} as const;

// Type definitions for API responses
export interface Admin {
  id: string;
  email: string;
  name: string;
  role: string;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SuperAdmin {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  token: string;
  user: Admin | SuperAdmin | User;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
} 