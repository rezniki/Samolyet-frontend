import { MessageCircle } from 'lucide-react';
import { useMemo } from 'react';
import { ChatListItem } from '../components/chat/ChatListItem';
import { useChatStore } from '../store/chatStore';

export function ChatsScreen() {
  const chats = useChatStore((state) => state.chats);

  const sortedChats = useMemo(
    () =>
      [...chats].sort((a, b) => {
        const timeA = a.lastMessageTime?.getTime() ?? 0;
        const timeB = b.lastMessageTime?.getTime() ?? 0;
        return timeB - timeA;
      }),
    [chats],
  );

  if (sortedChats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <MessageCircle className="mb-4 h-12 w-12 text-[#60A5FA]" />
        <h1 className="text-2xl font-bold text-[#1E293B]">Чаты</h1>
        <p className="mt-2 text-sm text-[#64748B]">Здесь появятся ваши диалоги</p>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <h1 className="mb-6 text-2xl font-bold text-[#1E293B]">Чаты</h1>
      <div>
        {sortedChats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
