import apiClient from '../axiosConfig';
import { API_ENDPOINTS, AuthResponse, ApiResponse, Admin, SuperAdmin, User } from '../apiList';

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
    console.log("data", data);
    console.log("API_ENDPOINTS.AUTH.SUPERADMIN_LOGIN", API_ENDPOINTS.AUTH.SUPERADMIN_LOGIN);
    const response = await apiClient.post(API_ENDPOINTS.AUTH.SUPERADMIN_LOGIN, data);
    console.log("response", response);
    // Store token in localStorage
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('authToken', response.data.data.token);
    }
    
    return response.data;
  }

  // Login as admin
  static async adminLogin(data: LoginRequest): Promise<ApiResponse<AuthResponse>> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.ADMIN_LOGIN, data);
    
    // Store token in localStorage
    if (response.data.success && response.data.data.token) {
      localStorage.setItem('authToken', response.data.data.token);
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
} 