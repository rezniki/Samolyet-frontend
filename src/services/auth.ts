const USERS_KEY = 'samolyet_users';
const MOCK_DELAY_MS = 1000;

export interface AuthUser {
  id: string;
  username: string;
  displayName: string;
}

export interface AuthResponse {
  token: string;
  user: AuthUser;
}

interface StoredUser extends AuthUser {
  password: string;
}

interface RegisterPayload {
  username: string;
  displayName: string;
  password: string;
}

interface LoginPayload {
  username: string;
  password: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getUsers(): StoredUser[] {
  const raw = localStorage.getItem(USERS_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as StoredUser[];
  } catch {
    return [];
  }
}

function saveUsers(users: StoredUser[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function generateToken(username: string): string {
  return `mock-jwt-${username}-${Date.now()}`;
}

export async function register(payload: RegisterPayload): Promise<AuthResponse> {
  await delay(MOCK_DELAY_MS);

  const { username, displayName, password } = payload;

  if (!/^[a-zA-Z0-9_]{3,20}$/.test(username)) {
    throw new Error('Username должен содержать 3–20 символов: латиница, цифры, _');
  }

  if (displayName.length < 2 || displayName.length > 30) {
    throw new Error('Display Name должен быть от 2 до 30 символов');
  }

  if (password.length < 8) {
    throw new Error('Пароль должен содержать минимум 8 символов');
  }

  const users = getUsers();

  if (users.some((user) => user.username === username)) {
    throw new Error('Пользователь с таким username уже существует');
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    username,
    displayName,
    password,
  };

  saveUsers([...users, newUser]);

  return {
    token: generateToken(username),
    user: {
      id: newUser.id,
      username: newUser.username,
      displayName: newUser.displayName,
    },
  };
}

export async function login(payload: LoginPayload): Promise<AuthResponse> {
  await delay(MOCK_DELAY_MS);

  const { username, password } = payload;
  const users = getUsers();
  const user = users.find((item) => item.username === username);

  if (!user) {
    throw new Error('Пользователь не найден');
  }

  if (user.password !== password) {
    throw new Error('Неверный пароль');
  }

  return {
    token: generateToken(user.username),
    user: {
      id: user.id,
      username: user.username,
      displayName: user.displayName,
    },
  };
}

export async function logout(): Promise<void> {
  await delay(300);
}
