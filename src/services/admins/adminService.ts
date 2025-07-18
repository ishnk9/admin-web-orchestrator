import apiClient from '../axiosConfig';
import { API_ENDPOINTS, Admin, ApiResponse, PaginatedResponse } from '../apiList';

export interface CreateAdminRequest {
  email: string;
  name: string;
  password: string;
}

export interface UpdateAdminRequest {
  email?: string;
  name?: string;
  password?: string;
}

export class AdminService {
  // Create a new admin
  static async createAdmin(data: CreateAdminRequest): Promise<ApiResponse<Admin>> {
    const response = await apiClient.post(API_ENDPOINTS.ADMINS.CREATE, data);
    return response.data;
  }

  // Get all admins
  static async getAllAdmins(page = 1, limit = 10): Promise<PaginatedResponse<Admin>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMINS.GET_ALL, {
      params: { page, limit },
    });
    return response.data;
  }

  // Get admin by ID
  static async getAdminById(id: string): Promise<ApiResponse<Admin>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMINS.GET_BY_ID(id));
    return response.data;
  }

  // Update admin
  static async updateAdmin(id: string, data: UpdateAdminRequest): Promise<ApiResponse<Admin>> {
    const response = await apiClient.put(API_ENDPOINTS.ADMINS.UPDATE(id), data);
    return response.data;
  }

  // Delete admin
  static async deleteAdmin(id: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.delete(API_ENDPOINTS.ADMINS.DELETE(id));
    return response.data;
  }

  // Verify admin email with token
  static async verifyEmail(token: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.get(API_ENDPOINTS.ADMINS.VERIFY_EMAIL(token));
    return response.data;
  }

  // Resend verification email to admin
  static async resendVerification(adminId: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.post(API_ENDPOINTS.ADMINS.RESEND_VERIFICATION(adminId));
    return response.data;
  }
} 