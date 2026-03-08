/**
 * AI Service
 * Handles AI-powered code generation, modification, and chat
 */

import { apiClient } from './api';
import { API_ENDPOINTS } from './config';

// Types
export type FileType = 'html' | 'css' | 'js';

export interface GenerateCodeRequest {
  prompt: string;
  file_type?: FileType;
}

export interface GenerateCodeResponse {
  success: boolean;
  code: string;
  file_type: FileType;
  provider?: string;
}

export interface ModifyCodeRequest {
  code: string;
  modification: string;
  file_type?: FileType;
}

export interface ModifyCodeResponse {
  success: boolean;
  code: string;
  file_type: FileType;
  provider?: string;
}

export interface ChatMessage {
  role: 'user' | 'ai';
  content: string;
}

export interface ChatRequest {
  message: string;
  history?: ChatMessage[];
}

export interface ChatResponse {
  success: boolean;
  response: string;
  role: 'ai';
  provider?: string;
}

export interface SuggestRequest {
  context: string;
  suggestion_type?: 'design' | 'content' | 'feature' | 'seo';
}

export interface SuggestResponse {
  success: boolean;
  suggestions: string[];
  type: string;
  provider?: string;
}

export interface HealthResponse {
  healthy: boolean;
  ollama: {
    available: boolean;
    models: string[];
    configured_model?: string;
    model_available?: boolean;
  };
  gemini: {
    available: boolean;
    configured: boolean;
    model?: string;
  };
  active_provider: string | null;
}

/**
 * Generate code using AI
 */
export async function generateCode(request: GenerateCodeRequest) {
  return apiClient.post<GenerateCodeResponse>(
    API_ENDPOINTS.AI.GENERATE,
    request,
    true
  );
}

/**
 * Modify existing code using AI
 */
export async function modifyCode(request: ModifyCodeRequest) {
  return apiClient.post<ModifyCodeResponse>(
    API_ENDPOINTS.AI.MODIFY,
    request,
    true
  );
}

/**
 * Chat with AI assistant
 */
export async function chat(request: ChatRequest) {
  return apiClient.post<ChatResponse>(
    API_ENDPOINTS.AI.CHAT,
    request,
    true
  );
}

/**
 * Get AI suggestions for improvements
 */
export async function suggest(request: SuggestRequest) {
  return apiClient.post<SuggestResponse>(
    API_ENDPOINTS.AI.SUGGEST,
    request,
    true
  );
}

/**
 * Check AI service health
 */
export async function checkHealth() {
  return apiClient.get<HealthResponse>(API_ENDPOINTS.AI.HEALTH);
}

export const aiService = {
  generateCode,
  modifyCode,
  chat,
  suggest,
  checkHealth,
};

export default aiService;
