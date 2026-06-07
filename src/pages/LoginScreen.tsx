import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

export function LoginScreen() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  const login = useAuthStore((state) => state.login);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const isFormValid = username.trim().length > 0 && password.length > 0;

  useEffect(() => {
    usernameRef.current?.focus();
    clearError();
  }, [clearError]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isFormValid || isLoading) return;

    try {
      await login(username.trim(), password);
      navigate('/');
    } catch {
      // error handled in store
    }
  };

  return (
    <main className="flex min-h-[100dvh] w-full flex-1 flex-col items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E293B]">Войти</h1>
          <p className="mt-2 text-sm text-[#64748B]">С возвращением в Samolyet</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          <Input
            ref={usernameRef}
            label="Username"
            placeholder="Ваш username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            showPasswordToggle
            autoComplete="current-password"
          />

          {error && <p className="text-center text-sm text-[#EF4444]">{error}</p>}

          <Button type="submit" variant="primary" disabled={!isFormValid} loading={isLoading}>
            Войти
          </Button>
        </form>

        <p className="text-center text-sm text-[#64748B]">
          Нет аккаунта?{' '}
          <Link to="/register" className="font-semibold text-[#2563EB] hover:text-[#1E40AF]">
            Создать
          </Link>
        </p>
      </div>
    </main>
  );
}
