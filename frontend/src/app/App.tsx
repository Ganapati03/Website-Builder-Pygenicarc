import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { LoginPage } from './components/LoginPage';
import { DashboardPage } from './components/DashboardPage';
import { BuilderPage } from './components/BuilderPage';
import { TemplatesPage } from './components/TemplatesPage';
import { DeployPage } from './components/DeployPage';
import { CustomizerPage } from './components/CustomizerPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/builder" element={<BuilderPage />} />
        <Route path="/customizer" element={<CustomizerPage />} />
        <Route path="/templates" element={<TemplatesPage />} />
        <Route path="/deploy" element={<DeployPage />} />
        <Route path="/settings" element={<Navigate to="/dashboard" />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}