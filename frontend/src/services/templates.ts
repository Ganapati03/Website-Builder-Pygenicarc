/**
 * Templates Service
 * Handles template operations
 */

import { apiClient } from './api';
import { API_ENDPOINTS } from './config';

// Types
export interface Template {
  id: number;
  name: string;
  description: string;
  category: string;
  thumbnail?: string;
  preview_image?: string;
  preview_url?: string;
  files?: Record<string, string>;
  default_files?: Record<string, string>;
  structure_json?: {
    components?: Array<{
      id: string;
      type: string;
      content: string;
      styles: Record<string, string>;
    }>;
  };
  tags?: string[];
  is_premium?: boolean;
  usage_count?: number;
  created_at: string;
}

export interface TemplateListResponse {
  templates: Template[];
  categories: string[];
  total: number;
}

export interface CategoriesResponse {
  categories: string[];
}

/**
 * Get all templates
 */
export async function getTemplates(category?: string) {
  const endpoint = category 
    ? `${API_ENDPOINTS.TEMPLATES.LIST}?category=${encodeURIComponent(category)}`
    : API_ENDPOINTS.TEMPLATES.LIST;
  return apiClient.get<TemplateListResponse>(endpoint);
}

/**
 * Get a specific template
 */
export async function getTemplate(id: string) {
  return apiClient.get<{ template: Template }>(API_ENDPOINTS.TEMPLATES.GET(id));
}

/**
 * Get template categories
 */
export async function getCategories() {
  return apiClient.get<CategoriesResponse>(API_ENDPOINTS.TEMPLATES.CATEGORIES);
}

export const templatesService = {
  getTemplates,
  getTemplate,
  getCategories,
};

export default templatesService;
