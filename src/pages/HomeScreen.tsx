import { useAuthStore } from '../store/authStore';

export function HomeScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  return (
    <main className="flex min-h-[100dvh] w-full flex-1 flex-col items-center justify-center bg-[#F8FAFC] p-6">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h1 className="text-2xl font-bold text-[#1E293B]">
          Привет, {user?.displayName ?? 'пользователь'}!
        </h1>
        <p className="mt-2 text-sm text-[#64748B]">
          Главный экран будет реализован на следующем этапе
        </p>
        <button
          type="button"
          onClick={logout}
          className="mt-6 text-sm font-medium text-[#EF4444] hover:underline"
        >
          Выйти
        </button>
      </div>
    </main>
  );
}
