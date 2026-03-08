/**
 * Projects Service
 * Handles project CRUD operations
 */

import { apiClient } from './api';
import { API_ENDPOINTS } from './config';

// Types
export interface Project {
  id: number;
  name: string;
  description?: string;
  template_id?: number;
  status: 'draft' | 'published' | 'archived';
  files?: Record<string, string>;
  deployed_url?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateProjectRequest {
  name: string;
  description?: string;
  template_id?: number;
}

export interface UpdateProjectRequest {
  name?: string;
  description?: string;
  status?: string;
  files?: Record<string, string>;
}

export interface ProjectListResponse {
  projects: Project[];
  total: number;
}

/**
 * Get all projects for current user
 */
export async function getProjects() {
  return apiClient.get<ProjectListResponse>(API_ENDPOINTS.PROJECTS.LIST, true);
}

/**
 * Get a specific project
 */
export async function getProject(id: string) {
  return apiClient.get<{ project: Project }>(API_ENDPOINTS.PROJECTS.GET(id), true);
}

/**
 * Create a new project
 */
export async function createProject(data: CreateProjectRequest) {
  return apiClient.post<{ project: Project; message: string }>(
    API_ENDPOINTS.PROJECTS.CREATE,
    data,
    true
  );
}

/**
 * Update a project
 */
export async function updateProject(id: string, data: UpdateProjectRequest) {
  return apiClient.put<{ project: Project; message: string }>(
    API_ENDPOINTS.PROJECTS.UPDATE(id),
    data,
    true
  );
}

/**
 * Delete a project
 */
export async function deleteProject(id: string) {
  return apiClient.delete<{ message: string }>(API_ENDPOINTS.PROJECTS.DELETE(id), true);
}

/**
 * Deploy a project
 */
export async function deployProject(id: string) {
  return apiClient.post<{ message: string; deployed_url: string }>(
    API_ENDPOINTS.PROJECTS.DEPLOY(id),
    {},
    true
  );
}

export const projectsService = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  deployProject,
};

export default projectsService;
