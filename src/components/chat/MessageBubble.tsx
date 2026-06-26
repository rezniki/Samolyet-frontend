import type { Message } from '../../store/chatStore';
import { formatMessageTime } from '../../utils/formatTime';

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[75%] p-3 ${
          isOwn
            ? 'rounded-2xl rounded-br-sm bg-[#2563EB] text-white'
            : 'rounded-2xl rounded-bl-sm bg-[#F1F5F9] text-[#1E293B]'
        }`}
      >
        <p className="text-sm">{message.text}</p>
        <p
          className={`mt-1 text-xs ${
            isOwn ? 'text-blue-100' : 'text-[#64748B]'
          }`}
        >
          {formatMessageTime(message.timestamp)}
        </p>
      </div>
    </div>
  );
}
