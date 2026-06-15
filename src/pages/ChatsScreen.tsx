import { MessageCircle } from 'lucide-react';

export function ChatsScreen() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <MessageCircle className="mb-4 h-12 w-12 text-[#CBD5E1]" />
      <h1 className="text-2xl font-semibold text-[#1E293B]">Чаты</h1>
      <p className="mt-2 text-sm text-[#64748B]">Здесь появятся ваши диалоги</p>
    </div>
  );
}
