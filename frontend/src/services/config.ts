/**
 * API Configuration
 */

// Base URL for the backend API
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/api/auth/login',
    REGISTER: '/api/auth/register',
    ME: '/api/auth/me',
    CHANGE_PASSWORD: '/api/auth/change-password',
  },
  // Projects
  PROJECTS: {
    LIST: '/api/projects',
    CREATE: '/api/projects',
    GET: (id: string) => `/api/projects/${id}`,
    UPDATE: (id: string) => `/api/projects/${id}`,
    DELETE: (id: string) => `/api/projects/${id}`,
    DEPLOY: (id: string) => `/api/projects/${id}/deploy`,
  },
  // Templates
  TEMPLATES: {
    LIST: '/api/templates',
    GET: (id: string) => `/api/templates/${id}`,
    CATEGORIES: '/api/templates/categories',
  },
  // AI
  AI: {
    GENERATE: '/api/ai/generate',
    MODIFY: '/api/ai/modify',
    CHAT: '/api/ai/chat',
    SUGGEST: '/api/ai/suggest',
    HEALTH: '/api/ai/health',
  },
};

/**
 * Get stored auth token
 */
export function getAuthToken(): string | null {
  return localStorage.getItem('auth_token');
}

/**
 * Set auth token
 */
export function setAuthToken(token: string): void {
  localStorage.setItem('auth_token', token);
}

/**
 * Remove auth token
 */
export function removeAuthToken(): void {
  localStorage.removeItem('auth_token');
}

/**
 * Get authorization headers
 */
export function getAuthHeaders(): Record<string, string> {
  const token = getAuthToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
