import { create } from 'zustand';
import { useAuthStore } from './authStore';

export interface Message {
  id: string;
  chatId: string;
  senderId: string;
  text: string;
  timestamp: Date;
  isRead: boolean;
}

export interface Chat {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  lastMessage?: string;
  lastMessageTime?: Date;
  unreadCount: number;
  messages: Message[];
}

interface ChatState {
  chats: Chat[];
  activeChatId: string | null;

  createChat: (
    participantId: string,
    participantName: string,
    participantAvatar: string,
  ) => string;
  getChat: (chatId: string) => Chat | undefined;
  sendMessage: (chatId: string, text: string) => void;
  getMessages: (chatId: string) => Message[];
  setActiveChat: (chatId: string | null) => void;
  markAsRead: (chatId: string) => void;
}

const mockChats: Chat[] = [
  {
    id: 'chat-1',
    participantId: '1',
    participantName: 'Александра',
    participantAvatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    lastMessage: 'Привет! Как дела?',
    lastMessageTime: new Date(Date.now() - 3600000),
    unreadCount: 1,
    messages: [
      {
        id: 'msg-1',
        chatId: 'chat-1',
        senderId: '1',
        text: 'Привет! Как дела?',
        timestamp: new Date(Date.now() - 3600000),
        isRead: false,
      },
    ],
  },
];

export const useChatStore = create<ChatState>((set, get) => ({
  chats: mockChats,
  activeChatId: null,

  createChat: (participantId, participantName, participantAvatar) => {
    const existing = get().chats.find((chat) => chat.participantId === participantId);
    if (existing) {
      return existing.id;
    }

    const chatId = `chat-${participantId}`;
    const newChat: Chat = {
      id: chatId,
      participantId,
      participantName,
      participantAvatar,
      unreadCount: 0,
      messages: [],
    };

    set((state) => ({
      chats: [newChat, ...state.chats],
    }));

    return chatId;
  },

  getChat: (chatId) => get().chats.find((chat) => chat.id === chatId),

  sendMessage: (chatId, text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const senderId = useAuthStore.getState().user?.id ?? 'current-user';
    const message: Message = {
      id: `msg-${Date.now()}`,
      chatId,
      senderId,
      text: trimmed,
      timestamp: new Date(),
      isRead: true,
    };

    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id !== chatId) return chat;

        return {
          ...chat,
          messages: [...chat.messages, message],
          lastMessage: trimmed,
          lastMessageTime: message.timestamp,
        };
      }),
    }));
  },

  getMessages: (chatId) => {
    const chat = get().getChat(chatId);
    return chat?.messages ?? [];
  },

  setActiveChat: (chatId) => set({ activeChatId: chatId }),

  markAsRead: (chatId) => {
    set((state) => ({
      chats: state.chats.map((chat) => {
        if (chat.id !== chatId) return chat;

        return {
          ...chat,
          unreadCount: 0,
          messages: chat.messages.map((msg) => ({ ...msg, isRead: true })),
        };
      }),
    }));
  },
}));
