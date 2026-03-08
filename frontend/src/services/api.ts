/**
 * API Client
 * Handles all HTTP requests to the backend
 */

import { API_BASE_URL, getAuthHeaders } from './config';

interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

interface RequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: unknown;
  headers?: Record<string, string>;
  requireAuth?: boolean;
}

/**
 * Make an API request
 */
async function request<T>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const {
    method = 'GET',
    body,
    headers = {},
    requireAuth = false,
  } = options;

  const url = `${API_BASE_URL}${endpoint}`;

  const requestHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headers,
  };

  if (requireAuth) {
    Object.assign(requestHeaders, getAuthHeaders());
  }

  try {
    const response = await fetch(url, {
      method,
      headers: requestHeaders,
      body: body ? JSON.stringify(body) : undefined,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || `HTTP error ${response.status}`,
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Network error',
    };
  }
}

/**
 * GET request
 */
export async function get<T>(endpoint: string, requireAuth = false): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: 'GET', requireAuth });
}

/**
 * POST request
 */
export async function post<T>(
  endpoint: string,
  body: unknown,
  requireAuth = false
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: 'POST', body, requireAuth });
}

/**
 * PUT request
 */
export async function put<T>(
  endpoint: string,
  body: unknown,
  requireAuth = false
): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: 'PUT', body, requireAuth });
}

/**
 * DELETE request
 */
export async function del<T>(endpoint: string, requireAuth = false): Promise<ApiResponse<T>> {
  return request<T>(endpoint, { method: 'DELETE', requireAuth });
}

export const apiClient = {
  get,
  post,
  put,
  delete: del,
};

export default apiClient;
