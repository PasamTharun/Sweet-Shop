import { Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { useAuth } from './hooks/useAuth';
import Dashboard  from './pages/Dashboard';
import { Login } from './pages/Login';
import { Register } from './pages/Register';

const queryClient = new QueryClient();

export default function App() {
  const { user, loading } = useAuth();
  
  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-6xl animate-spin">🌌</div></div>;

  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={user ? <Dashboard /> : <Navigate to="/login" />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
        <Route path="*" element={<Navigate to={user ? "/" : "/login"} />} />
      </Routes>
      <Toaster position="top-right" />
    </QueryClientProvider>
  );
}
