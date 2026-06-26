import { ArrowLeft, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { MessageBubble } from '../components/chat/MessageBubble';
import { useAuthStore } from '../store/authStore';
import { useChatStore } from '../store/chatStore';

export function ChatDetailScreen() {
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [text, setText] = useState('');

  const currentUserId = useAuthStore((state) => state.user?.id);
  const chat = useChatStore((state) => state.getChat(chatId ?? ''));
  const sendMessage = useChatStore((state) => state.sendMessage);
  const markAsRead = useChatStore((state) => state.markAsRead);
  const setActiveChat = useChatStore((state) => state.setActiveChat);

  useEffect(() => {
    if (!chatId) return;

    markAsRead(chatId);
    setActiveChat(chatId);

    return () => setActiveChat(null);
  }, [chatId, markAsRead, setActiveChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat?.messages.length]);

  if (!chat) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <p className="text-[#64748B]">Чат не найден</p>
        <button
          type="button"
          onClick={() => navigate('/chats')}
          className="mt-4 text-[#2563EB]"
        >
          Вернуться к чатам
        </button>
      </div>
    );
  }

  const handleSend = () => {
    if (!chatId || !text.trim()) return;

    sendMessage(chatId, text);
    setText('');
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100dvh-4rem)] min-h-0 flex-col">
      <header className="flex shrink-0 items-center gap-3 border-b border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
        <button
          type="button"
          onClick={() => navigate('/chats')}
          aria-label="Назад"
          className="shrink-0"
        >
          <ArrowLeft className="h-6 w-6 text-[#2563EB]" />
        </button>
        <img
          src={chat.participantAvatar}
          alt={chat.participantName}
          className="h-10 w-10 rounded-full object-cover"
        />
        <h1 className="truncate font-semibold text-[#1E293B]">{chat.participantName}</h1>
      </header>

      <div className="flex-1 space-y-2 overflow-y-auto p-4 pb-4">
        {chat.messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
            isOwn={message.senderId === currentUserId}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="sticky bottom-0 shrink-0 flex items-center gap-2 border-t border-[#E2E8F0] bg-white p-4">
        <input
          type="text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Написать сообщение..."
          className="flex-1 rounded-xl border-0 bg-[#F8FAFC] px-4 py-3 text-[#1E293B] placeholder:text-[#64748B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
        />
        <button
          type="button"
          onClick={handleSend}
          disabled={!text.trim()}
          aria-label="Отправить"
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#2563EB] text-white transition-colors hover:bg-[#1D4ED8] disabled:opacity-50"
        >
          <Send className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
