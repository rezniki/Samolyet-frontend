import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { useAuthStore } from '../store/authStore';

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,20}$/;

export function RegisterScreen() {
  const navigate = useNavigate();
  const usernameRef = useRef<HTMLInputElement>(null);

  const register = useAuthStore((state) => state.register);
  const isLoading = useAuthStore((state) => state.isLoading);
  const error = useAuthStore((state) => state.error);
  const clearError = useAuthStore((state) => state.clearError);

  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [touched, setTouched] = useState({
    username: false,
    displayName: false,
    password: false,
    confirmPassword: false,
  });

  const usernameError =
    touched.username && !USERNAME_REGEX.test(username)
      ? 'Только латиница, цифры и _, от 3 до 20 символов'
      : undefined;

  const displayNameError =
    touched.displayName && (displayName.length < 2 || displayName.length > 30)
      ? 'Имя должно быть от 2 до 30 символов'
      : undefined;

  const passwordError =
    touched.password && password.length < 8 ? 'Минимум 8 символов' : undefined;

  const confirmPasswordError =
    touched.confirmPassword && confirmPassword !== password
      ? 'Пароли не совпадают'
      : undefined;

  const isFormValid =
    USERNAME_REGEX.test(username) &&
    displayName.length >= 2 &&
    displayName.length <= 30 &&
    password.length >= 8 &&
    confirmPassword === password;

  useEffect(() => {
    usernameRef.current?.focus();
    clearError();
  }, [clearError]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!isFormValid || isLoading) return;

    try {
      await register(username, displayName, password);
      navigate('/goal-selection');
    } catch {
      // error handled in store
    }
  };

  return (
    <main className="flex min-h-[100dvh] w-full flex-1 flex-col items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#1E293B]">Создать аккаунт</h1>
          <p className="mt-2 text-sm text-[#64748B]">Присоединяйтесь к Samolyet</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
        >
          <Input
            ref={usernameRef}
            label="Username"
            placeholder="Придумайте username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, username: true }))}
            error={usernameError}
            hint={!usernameError ? 'Это ваш уникальный идентификатор, например: anna_27' : undefined}
            autoComplete="username"
          />

          <Input
            label="Display Name"
            placeholder="Ваше имя"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, displayName: true }))}
            error={displayNameError}
            autoComplete="name"
          />

          <Input
            label="Пароль"
            type="password"
            placeholder="Придумайте пароль"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, password: true }))}
            error={passwordError}
            hint={!passwordError ? 'Минимум 8 символов' : undefined}
            showPasswordToggle
            autoComplete="new-password"
          />

          <Input
            label="Подтвердите пароль"
            type="password"
            placeholder="Повторите пароль"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            onBlur={() => setTouched((prev) => ({ ...prev, confirmPassword: true }))}
            error={confirmPasswordError}
            showPasswordToggle
            autoComplete="new-password"
          />

          {error && <p className="text-center text-sm text-[#EF4444]">{error}</p>}

          <Button type="submit" variant="primary" disabled={!isFormValid} loading={isLoading}>
            Создать аккаунт
          </Button>
        </form>

        <p className="text-center text-sm text-[#64748B]">
          Уже есть аккаунт?{' '}
          <Link to="/login" className="font-semibold text-[#2563EB] hover:text-[#1E40AF]">
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}
