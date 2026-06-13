import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Coffee, Heart, Users, type LucideIcon } from 'lucide-react';
import { useAuthStore, type UserGoal } from '../store/authStore';

interface GoalOption {
  id: UserGoal;
  title: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  selectedBorder: string;
  selectedBg: string;
  checkColor: string;
}

const GOAL_OPTIONS: GoalOption[] = [
  {
    id: 'serious',
    title: 'Серьёзные отношения',
    description: 'В поисках долгосрочных и здоровых отношений',
    icon: Heart,
    iconBg: '#2563EB',
    selectedBorder: '#2563EB',
    selectedBg: '#EFF6FF',
    checkColor: '#2563EB',
  },
  {
    id: 'friendship',
    title: 'Дружба',
    description: 'Поиск значимых дружб и приключений',
    icon: Users,
    iconBg: '#3B82F6',
    selectedBorder: '#3B82F6',
    selectedBg: '#EFF6FF',
    checkColor: '#3B82F6',
  },
  {
    id: 'casual',
    title: 'Случайные знакомства',
    description: 'В поисках знакомств с новыми людьми на неформальной основе',
    icon: Coffee,
    iconBg: '#EC4899',
    selectedBorder: '#EC4899',
    selectedBg: '#FDF2F8',
    checkColor: '#EC4899',
  },
];

export function GoalSelectionScreen() {
  const navigate = useNavigate();
  const updateGoal = useAuthStore((state) => state.updateGoal);
  const savedGoal = useAuthStore((state) => state.user?.goal);

  const [selectedGoal, setSelectedGoal] = useState<UserGoal | null>(savedGoal ?? null);
  const [isNavigating, setIsNavigating] = useState(false);

  const handleSelectGoal = (goal: UserGoal) => {
    setSelectedGoal(goal);
    updateGoal(goal);
  };

  const handleContinue = () => {
    if (!selectedGoal || isNavigating) return;

    setIsNavigating(true);
    updateGoal(selectedGoal);
    navigate('/home');
  };

  return (
    <main className="flex min-h-[100dvh] w-full flex-1 flex-col bg-[#F8FAFC] p-6">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
        <header className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-[#1E293B]">Зачем ты здесь?</h1>
          <p className="text-[#64748B]">
            Выбери свою цель, чтобы мы могли подобрать подходящих людей
          </p>
        </header>

        <div className="space-y-3">
          {GOAL_OPTIONS.map((option) => {
            const isSelected = selectedGoal === option.id;
            const Icon = option.icon;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleSelectGoal(option.id)}
                className={[
                  'flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all duration-200 hover:shadow-md',
                  isSelected
                    ? 'shadow-[0_4px_12px_rgba(0,0,0,0.1)]'
                    : 'border border-[#E2E8F0] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]',
                ].join(' ')}
                style={
                  isSelected
                    ? {
                        borderWidth: '2px',
                        borderColor: option.selectedBorder,
                        backgroundColor: option.selectedBg,
                      }
                    : undefined
                }
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg p-2.5 text-white"
                  style={{ backgroundColor: option.iconBg }}
                >
                  <Icon className="h-full w-full" />
                </div>

                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-[#1E293B]">{option.title}</h2>
                  <p className="text-sm text-[#64748B]">{option.description}</p>
                </div>

                {isSelected && (
                  <CheckCircle
                    className="h-6 w-6 shrink-0"
                    style={{ color: option.checkColor }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={handleContinue}
          disabled={selectedGoal === null || isNavigating}
          className={[
            'mt-8 flex h-[52px] w-full items-center justify-center rounded-3xl text-base font-semibold text-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-200',
            selectedGoal === null
              ? 'cursor-not-allowed bg-[#CBD5E1] opacity-50'
              : 'bg-[#2563EB] hover:bg-[#1D4ED8]',
          ].join(' ')}
        >
          Продолжить
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>

        <p className="mt-6 text-center text-xs text-[#94A3B8]">
          Вы можете изменить цель раз в две недели в настройках
        </p>
      </div>
    </main>
  );
}
