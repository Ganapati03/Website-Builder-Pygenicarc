/**
 * Services Index
 * Export all services for easy imports
 */

export * from './config';
export * from './api';
export * from './auth';
export * from './ai';
export * from './projects';
export * from './templates';

// Default exports
export { default as apiClient } from './api';
export { default as authService } from './auth';
export { default as aiService } from './ai';
export { default as projectsService } from './projects';
export { default as templatesService } from './templates';
