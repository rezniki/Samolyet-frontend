function getDayWord(days: number): string {
  const lastTwo = days % 100;
  const lastDigit = days % 10;

  if (lastTwo >= 11 && lastTwo <= 14) return 'дней';
  if (lastDigit === 1) return 'день';
  if (lastDigit >= 2 && lastDigit <= 4) return 'дня';
  return 'дней';
}

function startOfDay(date: Date): Date {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function formatMessageTime(date: Date): string {
  const now = new Date();
  const today = startOfDay(now);
  const messageDay = startOfDay(date);
  const diffMs = today.getTime() - messageDay.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return date.toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  if (diffDays === 1) {
    return 'Вчера';
  }

  return `${diffDays} ${getDayWord(diffDays)} назад`;
}
