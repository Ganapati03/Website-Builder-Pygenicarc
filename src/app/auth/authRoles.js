/**
 * Role definitions for the Website Builder Portal.
 * Each key maps to an array of roles that are allowed access.
 * Roles: SA (Super Admin), Admin, Creator
 */
export const authRoles = {
  sa: ["SA"],
  admin: ["SA", "Admin"],
  creator: ["SA", "Admin", "Creator"],
  all: ["SA", "Admin", "Creator"]
};
