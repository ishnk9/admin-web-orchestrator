import apiClient from '../axiosConfig';
import { API_ENDPOINTS, User, ApiResponse, PaginatedResponse } from '../apiList';

export interface CreateUserRequest {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  name?: string;
  password?: string;
}

export class UserService {
  // Create a new user
  static async createUser(data: CreateUserRequest): Promise<ApiResponse<User>> {
    const response = await apiClient.post(API_ENDPOINTS.USERS.CREATE, data);
    return response.data;
  }

  // Get all users
  static async getAllUsers(page = 1, limit = 10): Promise<PaginatedResponse<User>> {
    const response = await apiClient.get(API_ENDPOINTS.USERS.GET_ALL, {
      params: { page, limit },
    });
    return response.data;
  }

  // Get user by ID
  static async getUserById(id: string): Promise<ApiResponse<User>> {
    const response = await apiClient.get(API_ENDPOINTS.USERS.GET_BY_ID(id));
    return response.data;
  }

  // Update user
  static async updateUser(id: string, data: UpdateUserRequest): Promise<ApiResponse<User>> {
    const response = await apiClient.put(API_ENDPOINTS.USERS.UPDATE(id), data);
    return response.data;
  }

  // Delete user
  static async deleteUser(id: string): Promise<ApiResponse<{ message: string }>> {
    const response = await apiClient.delete(API_ENDPOINTS.USERS.DELETE(id));
    return response.data;
  }
} 