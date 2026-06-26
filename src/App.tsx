import { useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ChatDetailScreen } from './pages/ChatDetailScreen';
import { ChatsScreen } from './pages/ChatsScreen';
import { GoalSelectionScreen } from './pages/GoalSelectionScreen';
import { HomeScreen } from './pages/HomeScreen';
import { MainScreen } from './pages/MainScreen';
import { LoginScreen } from './pages/LoginScreen';
import { ProfileScreen } from './pages/ProfileScreen';
import { RegisterScreen } from './pages/RegisterScreen';
import { WelcomeScreen } from './pages/WelcomeScreen';
import { useAuthStore } from './store/authStore';

function RootRoute() {
  const token = useAuthStore((state) => state.token);
  const goal = useAuthStore((state) => state.user?.goal);

  if (token) {
    if (!goal) {
      return <Navigate to="/goal-selection" replace />;
    }
    return <Navigate to="/home" replace />;
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
        <Route
          element={
            <ProtectedRoute>
              <MainScreen />
            </ProtectedRoute>
          }
        >
          <Route path="/home" element={<HomeScreen />} />
          <Route path="/chats" element={<ChatsScreen />} />
          <Route path="/chats/:chatId" element={<ChatDetailScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
