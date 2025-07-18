import apiClient from '../axiosConfig';
import { API_ENDPOINTS, SuperAdmin, ApiResponse, PaginatedResponse, AuthResponse } from '../apiList';

export interface CreateSuperAdminRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateSuperAdminRequest {
  email?: string;
  name?: string;
  password?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export class SuperAdminService {
  // Create a new superadmin
  static async createSuperAdmin(data: CreateSuperAdminRequest): Promise<ApiResponse<SuperAdmin>> {
    const response = await apiClient.post(API_ENDPOINTS.SUPERADMINS.CREATE, data);
    return response.data;
  }

  // Get all superadmins
  static async getAllSuperAdmins(page = 1, limit = 10): Promise<PaginatedResponse<SuperAdmin>> {
    const response = await apiClient.get(API_ENDPOINTS.SUPERADMINS.GET_ALL, {
      params: { page, limit },
    });
    return response.data;
  }

  // Login as superadmin
  static async login(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post(API_ENDPOINTS.SUPERADMINS.LOGIN, data);
    
    // Store token in localStorage
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    
    return response.data;
  }

  // Get superadmin by ID
  static async getSuperAdminById(id: string): Promise<ApiResponse<SuperAdmin>> {
    const response = await apiClient.get(API_ENDPOINTS.SUPERADMINS.GET_BY_ID(id));
    return response.data;
  }

  // Update superadmin
  static async updateSuperAdmin(id: string, data: UpdateSuperAdminRequest): Promise<ApiResponse<SuperAdmin>> {
    const response = await apiClient.put(API_ENDPOINTS.SUPERADMINS.UPDATE(id), data);
    return response.data;
  }

  // Delete superadmin
  static async deleteSuperAdmin(id: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.delete(API_ENDPOINTS.SUPERADMINS.DELETE(id));
    return response.data;
  }
} 