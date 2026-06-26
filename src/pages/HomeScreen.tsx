import { useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { mockProfiles } from '../data/mockProfiles';
import { Button } from '../components/ui/Button';
import { useChatStore } from '../store/chatStore';

export function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  const createChat = useChatStore((state) => state.createChat);

  const profile = mockProfiles[currentIndex];
  const totalProfiles = mockProfiles.length;

  const goToPrevious = () => {
    setCurrentIndex((index) => Math.max(0, index - 1));
  };

  const goToNext = () => {
    setCurrentIndex((index) => Math.min(totalProfiles - 1, index + 1));
  };

  const handleWrite = () => {
    createChat(profile.id, profile.name, profile.photo);
    navigate('/chats');
  };

  return (
    <div className="space-y-4 pb-24">
      <header>
        <h1 className="text-3xl font-bold text-[#1E293B]">Рекомендации</h1>
        <p className="text-sm text-[#64748B]">Специально подобранные профили для тебя</p>
      </header>

      <div className="text-center">
        <p className="text-sm text-[#64748B]">
          Профиль {currentIndex + 1} из {totalProfiles}
        </p>
        <div className="mt-2 flex justify-center gap-2">
          {mockProfiles.map((item, index) => (
            <span
              key={item.id}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-[#2563EB]' : 'bg-[#CBD5E1]'
              }`}
            />
          ))}
        </div>
      </div>

      <article className="overflow-hidden rounded-2xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
        <img
          src={profile.photo}
          alt={`${profile.name}, ${profile.age}`}
          className="h-64 w-full object-cover"
        />

        <div className="p-6">
          <h2 className="mb-1 text-2xl font-semibold text-[#1E293B]">
            {profile.name}, {profile.age}
          </h2>

          <div className="mb-4 flex items-center gap-1.5">
            <MapPin className="h-4 w-4 text-[#64748B]" />
            <span className="text-sm text-[#64748B]">{profile.location}</span>
          </div>

          <p className="mb-4 text-base text-[#1E293B]">{profile.bio}</p>

          <div className="mb-4 flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="rounded-full border border-[#E2E8F0] bg-[#F8FAFC] px-3 py-1.5 text-sm text-[#1E293B]"
              >
                {interest}
              </span>
            ))}
          </div>

          <div className="mb-6 flex items-center gap-2 rounded-xl bg-[#FBCFE8] p-3">
            <Sparkles className="h-4 w-4 shrink-0 text-[#EC4899]" />
            <span className="text-sm text-[#EC4899]">{profile.matchReason}</span>
          </div>

          <Button onClick={handleWrite}>
            <MessageCircle className="h-5 w-5" />
            Написать
          </Button>
        </div>
      </article>

      <div className="flex gap-3">
        <Button
          variant="secondary"
          onClick={goToPrevious}
          disabled={currentIndex === 0}
          className="flex-1"
        >
          <ChevronLeft className="h-5 w-5" />
          Предыдущий
        </Button>
        <Button
          onClick={goToNext}
          disabled={currentIndex === totalProfiles - 1}
          className="flex-1"
        >
          Следующий
          <ChevronRight className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
