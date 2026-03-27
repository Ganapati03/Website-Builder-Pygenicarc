/**
 * Role-based navigation sections for the Website Builder Portal.
 *
 * Roles: SA (Super Admin), Admin, Creator
 *
 * Structure per section:
 *   { heading, auth?, items: [{ name, path, icon, auth? }] }
 *
 * `auth` arrays list which roles can see that section / item.
 * Omitting `auth` means ALL authenticated users can see it.
 */
export const NAV_SECTIONS = [



  // ─── Creator Hub ─────────────────────────────────────────────────────────
  {
    heading: "Creator Hub",
    auth: ["Creator"],
    items: [
      { name: "Site Builder", path: "/builder", icon: "Wand2", auth: ["Creator"] },
      { name: "Project Hub", path: "/projects", icon: "Folder", auth: ["Creator"] },
      // { name: "Asset Library", path: "/assets", icon: "Image", auth: ["Creator"] },
      //  { name: "Messages", path: "/chat", icon: "MessageSquare", auth: ["Creator"] }
    ]
  },

  // ─── My Account (all roles) ───────────────────────────────────────────────
  {
    heading: "My Account",
    items: [
      { name: "Settings", path: "/settings", icon: "Settings" }
    ]
  }
];

// Flat list kept for backward-compat (TopBar route name lookup etc.)
const navigations = NAV_SECTIONS.flatMap(s => s.items);
export default navigations;
