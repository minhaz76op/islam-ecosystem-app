import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  AUTH_USER: "@day_with_islam:auth_user",
  IS_LOGGED_IN: "@day_with_islam:is_logged_in",
};

export interface AuthUser {
  email: string;
  name: string;
  username?: string;
  uniqueId?: string;
  createdAt: number;
}

export async function getAuthUser(): Promise<AuthUser | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.AUTH_USER);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function isLoggedIn(): Promise<boolean> {
  try {
    const data = await AsyncStorage.getItem(KEYS.IS_LOGGED_IN);
    return data === "true";
  } catch {
    return false;
  }
}

function generateUniqueId(): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "DWI";
  for (let i = 0; i < 8; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

function generateUsername(name: string): string {
  const base = name.toLowerCase().replace(/[^a-z0-9]/g, "");
  const suffix = Math.floor(Math.random() * 1000);
  return `${base}${suffix}`;
}

export async function login(email: string, name: string): Promise<AuthUser> {
  const user: AuthUser = {
    email,
    name,
    username: generateUsername(name),
    uniqueId: generateUniqueId(),
    createdAt: Date.now(),
  };

  await AsyncStorage.setItem(KEYS.AUTH_USER, JSON.stringify(user));
  await AsyncStorage.setItem(KEYS.IS_LOGGED_IN, "true");

  return user;
}

export async function logout(): Promise<void> {
  await AsyncStorage.removeItem(KEYS.AUTH_USER);
  await AsyncStorage.setItem(KEYS.IS_LOGGED_IN, "false");
}

export async function updateAuthUser(updates: Partial<AuthUser>): Promise<AuthUser | null> {
  try {
    const current = await getAuthUser();
    if (!current) return null;

    const updated = { ...current, ...updates };
    await AsyncStorage.setItem(KEYS.AUTH_USER, JSON.stringify(updated));
    return updated;
  } catch {
    return null;
  }
}
