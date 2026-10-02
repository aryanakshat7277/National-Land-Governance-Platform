import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import { Repository } from '@/pages/Repository/Repository';
import GISViewer from '@/pages/GIS/GISViewer';
import Analytics from '@/pages/Analytics/Analytics';
import Collaboration from '@/pages/Collaboration/Collaboration';
import PolicySim from '@/pages/PolicySim/PolicySim';
import Innovation from '@/pages/Innovation/Innovation';
import Login from '@/pages/Auth/Login';
import { AIChat } from '@/components/AIChat/AIChat';
import { Toaster } from 'react-hot-toast';

function AppRoutes() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/login" element={<Login />} />
          {/* Layout as outlet parent */}
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/repository" element={<Repository />} />
            <Route path="/gis" element={<GISViewer />} />
            <Route path="/spatial" element={<Navigate to="/gis" replace />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/analysis" element={<Navigate to="/analytics" replace />} />
            <Route path="/collaboration" element={<Collaboration />} />
            <Route path="/forums" element={<Navigate to="/collaboration" replace />} />
            <Route path="/experts" element={<Navigate to="/collaboration" replace />} />
            <Route path="/policy-sim" element={<PolicySim />} />
            <Route path="/innovation" element={<Innovation />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>

      {/* Global floating AI assistant — hidden on login */}
      {!isLogin && <AIChat />}
    </>
  );
}

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#fff',
            color: '#212529',
            border: '1px solid #DEE2E6',
            borderRadius: '12px',
            fontSize: '14px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          },
          success: { iconTheme: { primary: '#1E8449', secondary: '#fff' } },
          error: { iconTheme: { primary: '#C0392B', secondary: '#fff' } },
        }}
      />
      <AppRoutes />
    </>
  );
}
