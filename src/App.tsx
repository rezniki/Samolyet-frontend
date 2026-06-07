import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { GoalSelectionScreen } from './pages/GoalSelectionScreen';
import { HomeScreen } from './pages/HomeScreen';
import { LoginScreen } from './pages/LoginScreen';
import { RegisterScreen } from './pages/RegisterScreen';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { useAuthStore } from './store/authStore';

function RootRoute() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <HomeScreen />;
  }

  return <WelcomeScreen />;
}

function App() {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootRoute />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route
          path="/goal-selection"
          element={
            <ProtectedRoute>
              <GoalSelectionScreen />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
