export interface Profile {
  id: string;
  name: string;
  age: number;
  location: string;
  bio: string;
  interests: string[];
  photo: string;
  matchReason: string;
}

export const mockProfiles: Profile[] = [
  {
    id: '1',
    name: 'Александра',
    age: 26,
    location: 'Минск, Беларусь',
    bio: 'Люблю путешествия, фотографию и вечера с хорошей книгой',
    interests: ['Фотография', 'Путешествия', 'Книги'],
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop',
    matchReason: 'Интересы и цели совпадают',
  },
  {
    id: '2',
    name: 'Мария',
    age: 24,
    location: 'Витебск, Беларусь',
    bio: 'Творческая личность, увлекаюсь искусством и кофе',
    interests: ['Искусство', 'Кофе', 'Музыка'],
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop',
    matchReason: 'Общие интересы в творчестве',
  },
  {
    id: '3',
    name: 'Екатерина',
    age: 28,
    location: 'Гродно, Беларусь',
    bio: 'Активный образ жизни, спорт и здоровое питание',
    interests: ['Спорт', 'Здоровье', 'Путешествия'],
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop',
    matchReason: 'Совпадение целей',
  },
];
