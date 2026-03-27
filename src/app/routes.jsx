import { lazy } from "react";
import { Navigate } from "react-router-dom";

import Loadable from "./components/Loadable";
import AuthGuard from "./auth/AuthGuard";
import { ShellLayout } from "./layouts/ShellLayout";

// ─── Auth pages (public) ──────────────────────────────────────────────────────
const Login = Loadable(lazy(() => import("./pages/Auth/Auth").then(m => ({ default: m.Login }))));
const Register = Loadable(lazy(() => import("./pages/Auth/Auth").then(m => ({ default: m.Register }))));

// ─── Shared pages ─────────────────────────────────────────────────────────────
const Chat = Loadable(lazy(() => import("./pages/Chat/Chat")));
const Settings = Loadable(lazy(() => import("./pages/Settings/Settings")));
const BuilderPage = Loadable(lazy(() => import("./pages/Builder/BuilderPage")));
const Projects = Loadable(lazy(() => import("./pages/Builder/Projects")));
const AssetLibrary = Loadable(lazy(() => import("./pages/Builder/AssetLibrary")));
const Onboarding = Loadable(lazy(() => import("./pages/Onboarding/Onboarding")));

// ─── Smart Dashboard Router ───────────────────────────────────────────────────
// Redirects to Projects as the default dashboard for all users.
const DashboardRouter = () => {
  return <Navigate to="/projects" replace />;
};

// ─── Not Found page ───────────────────────────────────────────────────────────
const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="text-center">
      <h1 className="text-6xl font-bold text-slate-300 mb-4">404</h1>
      <p className="text-lg text-slate-600 mb-6">Page not found</p>
      <a href="/projects" className="text-sky-600 font-semibold hover:text-sky-500">
        Go to Projects
      </a>
    </div>
  </div>
);

const routes = [
  // Public auth routes
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  { path: "/session/signin", element: <Navigate to="/login" replace /> },
  { path: "/session/signup", element: <Navigate to="/register" replace /> },

  // Protected app routes (inside ShellLayout with AuthGuard)
  {
    element: (
      <AuthGuard>
        <ShellLayout />
      </AuthGuard>
    ),
    children: [
      { path: "/", element: <Navigate to="/projects" replace /> },

      // ── Dashboard / Projects ──
      { path: "/dashboard", element: <DashboardRouter /> },
      { path: "/projects", element: <Projects /> },

      // ── Chat ──
      // { path: "/chat", element: <Chat /> },

      // ── Settings ──
      { path: "/settings", element: <Settings /> },

      // ── Website Builder ──
      { path: "/builder", element: <BuilderPage /> },
      { path: "/assets", element: <AssetLibrary /> },
      
      // ── Onboarding ──
      { path: "/onboarding", element: <Onboarding /> }
    ]
  },

  // ── Standalone Live View (No Sidebar/Header) ──
  {
    path: "/view/:id",
    element: (
      <AuthGuard>
        <BuilderPage isLiveView={true} />
      </AuthGuard>
    )
  },

  // 404 fallback
  { path: "/404", element: <NotFound /> },
  { path: "*", element: <NotFound /> }
];

export default routes;
