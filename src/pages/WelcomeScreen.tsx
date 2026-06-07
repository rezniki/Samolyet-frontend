import { Heart, Plane, Sparkles, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';

export function WelcomeScreen() {
  const navigate = useNavigate();
  return (
    <main className="flex min-h-[100dvh] w-full flex-1 flex-col items-center justify-center bg-[#F8FAFC] p-6">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <div className="relative mb-8 flex h-23 w-23 items-center justify-center rounded-2xl bg-[#2563EB] shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
          <Plane className="h-10 w-10 -translate-x-0.5 -translate-y-0.5 text-white" strokeWidth={2} />
          <Heart className="absolute bottom-5.5 right-5.5 h-5 w-5 fill-white text-white" strokeWidth={2} />
        </div>

        <h1 className="m-0 mb-2 text-4xl font-bold text-[#1E293B]">Samolyet</h1>

        <p className="mb-10 text-base text-[#64748B]">
          Найди тех людей, которые хотят того же, что и ты
        </p>

        <div className="mb-10 flex flex-col justify-center gap-4">
          <div className="flex flex-row gap-3 text-left">
            <Heart className="h-6 w-6 text-[#2563EB] flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[#64748B]">
              Аутентичные связи, основанные на общих намерениях
            </p>
          </div>

          <div className="flex flex-row gap-3 text-left">
            <Sparkles className="h-6 w-6 text-[#2563EB] flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[#64748B]">
              Никаких бесконечных свайпов, только значимые совпадения
            </p>
          </div>

          <div className="flex flex-row gap-3 text-left">
            <Users className="h-6 w-6 text-[#2563EB] flex-shrink-0 mt-0.5" strokeWidth={2} />
            <p className="text-[#64748B]">Будьте прозрачны в том, что вы ищете</p>
          </div>
        </div>

        <div className="mt-8 w-full space-y-3">
          <Button className="cursor-pointer" variant="primary" onClick={() => navigate('/register')}>
            Начать
          </Button>
          <Button
            className="cursor-pointer"
            variant="secondary"
            onClick={() => navigate('/login')}
          >
            Я уже имею аккаунт
          </Button>
        </div>

        <p className="text-sm text-[#64748B] pt-8">
          Продолжая, вы соглашаетесь с условиями и конфиденциальностью
        </p>
      </div>
    </main>
  );
}
