import apiClient from '../axiosConfig';
import { API_ENDPOINTS, AuthResponse, ApiResponse, Admin, SuperAdmin, User } from '../apiList';
import { setCookie } from '../../lib/helpers';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface ProfileResponse {
  user: Admin | SuperAdmin | User;
}

export class AuthService {
  // Login as superadmin
  static async superadminLogin(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SUPERADMIN_LOGIN, data);
    // Store token in localStorage
    if (response && response.data && response.data.data.token) {
      setCookie('authToken', response.data.data.token);
      window.location.href = '/';
    }
    
    return response.data;
  }

  // Login as admin
  static async adminLogin(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.ADMIN_LOGIN, data);
    
    if (response && response.data && response.data.data.token) {
      setCookie('authToken', response.data.data.token);
      window.location.href = '/';
    }
    
    return response.data;
  }

  // Get current user profile
  static async getProfile(): Promise<ApiResponse<ProfileResponse>> {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.GET_PROFILE);
    return response.data;
  }

  // Logout user
  static logout(): void {
    localStorage.removeItem('authToken');
    // Redirect to login page
    window.location.href = '/signin';
  }

  // Check if user is authenticated
  static isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Get stored token
  static getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Verify token
  static async verifyToken(): Promise<ApiResponse<{ valid: boolean }>> {
    const response = await apiClient.get(API_ENDPOINTS.AUTH.VERIFY_TOKEN);
    return response.data;
  }
} 