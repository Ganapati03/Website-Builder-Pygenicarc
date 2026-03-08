/**
 * Authentication Service
 * Handles user authentication, registration, and session management
 */

import { apiClient } from './api';
import { API_ENDPOINTS, setAuthToken, removeAuthToken, getAuthToken } from './config';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  created_at?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  user: User;
  access_token: string;
}

/**
 * Login user
 */
export async function login(credentials: LoginCredentials) {
  const response = await apiClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.LOGIN,
    credentials
  );

  if (response.success && response.data?.access_token) {
    setAuthToken(response.data.access_token);
  }

  return response;
}

/**
 * Register new user
 */
export async function register(data: RegisterData) {
  const response = await apiClient.post<AuthResponse>(
    API_ENDPOINTS.AUTH.REGISTER,
    data
  );

  if (response.success && response.data?.access_token) {
    setAuthToken(response.data.access_token);
  }

  return response;
}

/**
 * Get current user
 */
export async function getCurrentUser() {
  return apiClient.get<{ user: User }>(API_ENDPOINTS.AUTH.ME, true);
}

/**
 * Logout user
 */
export function logout() {
  removeAuthToken();
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): boolean {
  return !!getAuthToken();
}

/**
 * Change password
 */
export async function changePassword(currentPassword: string, newPassword: string) {
  return apiClient.put(
    API_ENDPOINTS.AUTH.CHANGE_PASSWORD,
    { current_password: currentPassword, new_password: newPassword },
    true
  );
}

export const authService = {
  login,
  register,
  getCurrentUser,
  logout,
  isAuthenticated,
  changePassword,
};

export default authService;
