import { LogOut, MapPin, Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, type UserGoal } from '../store/authStore';

const AVATAR_URL =
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face';

const GOAL_LABELS: Record<UserGoal, string> = {
  serious: 'Серьезные отношения',
  friendship: 'Дружба',
  casual: 'Случайные знакомства',
};

const INTERESTS = ['Фотография', 'Путешествия', 'Спорт', 'Музыка'];

const ABOUT_TEXT =
  'Люблю путешествия, активный отдых и хорошую компанию. В свободное время занимаюсь фотографией и изучаю новые языки.';

export function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const displayName = user?.displayName ?? 'Ваше Имя';
  const goalLabel = user?.goal ? GOAL_LABELS[user.goal] : 'Серьезные отношения';

  const handleLogout = () => {
    logout();
    localStorage.clear();
    navigate('/');
  };

  return (
    <div className="space-y-4">
      <header>
        <h1 className="mb-1 text-2xl font-bold text-[#1E293B]">Профиль</h1>
        <p className="mb-6 text-sm text-[#64748B]">Настройки учётной записи</p>
      </header>

      <div className="flex flex-col items-center rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <div className="relative mb-4">
          <img
            src={AVATAR_URL}
            alt={displayName}
            className="h-28 w-28 rounded-full object-cover"
          />
          <button
            type="button"
            aria-label="Редактировать фото"
            className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#2563EB]"
          >
            <Pencil className="h-4 w-4 text-white" />
          </button>
        </div>

        <h2 className="mb-2 text-xl font-semibold text-[#1E293B]">
          {displayName}, 27
        </h2>

        <div className="mb-3 flex items-center gap-1">
          <MapPin className="h-4 w-4 text-[#64748B]" />
          <span className="text-sm text-[#64748B]">Гродно, Беларусь</span>
        </div>

        <span className="rounded-full bg-[#2563EB] px-4 py-2 text-sm font-medium text-white">
          {goalLabel}
        </span>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h3 className="mb-3 text-xs font-semibold uppercase text-[#64748B]">Обо мне</h3>
        <p className="text-base leading-relaxed text-[#1E293B]">{ABOUT_TEXT}</p>
      </div>

      <div className="rounded-2xl bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <h3 className="mb-3 text-xs font-semibold uppercase text-[#64748B]">Интересы</h3>
        <div className="flex flex-wrap gap-2">
          {INTERESTS.map((interest) => (
            <span
              key={interest}
              className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-2 text-sm text-[#1E293B]"
            >
              {interest}
            </span>
          ))}
        </div>
      </div>

      <button
        type="button"
        className="mt-4 h-[52px] w-full rounded-xl bg-[#2563EB] font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#1E40AF]"
      >
        Редактировать профиль
      </button>

      <div className="mt-1 space-y-2">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl border border-[#E2E8F0] bg-white p-4 transition-colors hover:bg-[#FEF2F2]"
        >
          <LogOut className="h-5 w-5 text-[#EF4444]" />
          <span className="flex-1 text-left font-medium text-[#EF4444]">
            Выйти из аккаунта
          </span>
        </button>
      </div>
    </div>
  );
}
