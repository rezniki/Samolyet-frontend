import { useNavigate } from 'react-router-dom';
import type { Chat } from '../../store/chatStore';
import { formatMessageTime } from '../../utils/formatTime';

interface ChatListItemProps {
  chat: Chat;
}

export function ChatListItem({ chat }: ChatListItemProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/chats/${chat.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mb-3 flex w-full cursor-pointer items-center gap-3 rounded-xl bg-white p-4 text-left shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-colors hover:bg-[#F8FAFC]"
    >
      <img
        src={chat.participantAvatar}
        alt={chat.participantName}
        className="h-12 w-12 shrink-0 rounded-full object-cover"
      />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="truncate font-semibold text-[#1E293B]">{chat.participantName}</p>
          {chat.lastMessageTime && (
            <span className="shrink-0 text-xs text-[#94A3B8]">
              {formatMessageTime(chat.lastMessageTime)}
            </span>
          )}
        </div>
        {chat.lastMessage && (
          <p className="truncate text-sm text-[#64748B]">{chat.lastMessage}</p>
        )}
      </div>

      {chat.unreadCount > 0 && (
        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#2563EB] text-xs text-white">
          {chat.unreadCount}
        </span>
      )}
    </button>
  );
}
