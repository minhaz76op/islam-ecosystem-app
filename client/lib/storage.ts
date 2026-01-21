import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  USER_PROFILE: "@day_with_islam:user_profile",
  COMPLETED_PRAYERS: "@day_with_islam:completed_prayers",
  SUNNAH_HABITS: "@day_with_islam:sunnah_habits",
  TASBIH_COUNT: "@day_with_islam:tasbih_count",
  TASBIH_HISTORY: "@day_with_islam:tasbih_history",
  CHAT_MESSAGES: "@day_with_islam:chat_messages",
};

export interface UserProfile {
  name: string;
  age?: number;
  nationality?: string;
  gender?: string;
}

export interface CompletedPrayer {
  date: string;
  fajr: boolean;
  dhuhr: boolean;
  asr: boolean;
  maghrib: boolean;
  isha: boolean;
}

export interface SunnahHabit {
  id: string;
  name: string;
  completed: boolean;
  date: string;
}

export interface TasbihSession {
  date: string;
  preset: string;
  count: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

export async function getUserProfile(): Promise<UserProfile | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export async function saveUserProfile(profile: UserProfile): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.USER_PROFILE, JSON.stringify(profile));
  } catch (error) {
    console.error("Failed to save user profile:", error);
  }
}

export async function getCompletedPrayers(
  date: string
): Promise<CompletedPrayer | null> {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPLETED_PRAYERS);
    const prayers: CompletedPrayer[] = data ? JSON.parse(data) : [];
    return prayers.find((p) => p.date === date) || null;
  } catch {
    return null;
  }
}

export async function saveCompletedPrayer(
  date: string,
  prayer: keyof Omit<CompletedPrayer, "date">,
  completed: boolean
): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(KEYS.COMPLETED_PRAYERS);
    let prayers: CompletedPrayer[] = data ? JSON.parse(data) : [];

    const existingIndex = prayers.findIndex((p) => p.date === date);
    if (existingIndex >= 0) {
      prayers[existingIndex][prayer] = completed;
    } else {
      prayers.push({
        date,
        fajr: false,
        dhuhr: false,
        asr: false,
        maghrib: false,
        isha: false,
        [prayer]: completed,
      });
    }

    await AsyncStorage.setItem(KEYS.COMPLETED_PRAYERS, JSON.stringify(prayers));
  } catch (error) {
    console.error("Failed to save completed prayer:", error);
  }
}

export async function getSunnahHabits(date: string): Promise<SunnahHabit[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.SUNNAH_HABITS);
    const habits: SunnahHabit[] = data ? JSON.parse(data) : [];
    return habits.filter((h) => h.date === date);
  } catch {
    return [];
  }
}

export async function saveSunnahHabit(
  habit: SunnahHabit
): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(KEYS.SUNNAH_HABITS);
    let habits: SunnahHabit[] = data ? JSON.parse(data) : [];

    const existingIndex = habits.findIndex(
      (h) => h.id === habit.id && h.date === habit.date
    );
    if (existingIndex >= 0) {
      habits[existingIndex] = habit;
    } else {
      habits.push(habit);
    }

    await AsyncStorage.setItem(KEYS.SUNNAH_HABITS, JSON.stringify(habits));
  } catch (error) {
    console.error("Failed to save sunnah habit:", error);
  }
}

export async function getTasbihCount(): Promise<number> {
  try {
    const data = await AsyncStorage.getItem(KEYS.TASBIH_COUNT);
    return data ? parseInt(data, 10) : 0;
  } catch {
    return 0;
  }
}

export async function saveTasbihCount(count: number): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.TASBIH_COUNT, count.toString());
  } catch (error) {
    console.error("Failed to save tasbih count:", error);
  }
}

export async function getTasbihHistory(): Promise<TasbihSession[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.TASBIH_HISTORY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function saveTasbihSession(session: TasbihSession): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(KEYS.TASBIH_HISTORY);
    let sessions: TasbihSession[] = data ? JSON.parse(data) : [];
    sessions.push(session);
    if (sessions.length > 30) {
      sessions = sessions.slice(-30);
    }
    await AsyncStorage.setItem(KEYS.TASBIH_HISTORY, JSON.stringify(sessions));
  } catch (error) {
    console.error("Failed to save tasbih session:", error);
  }
}

export async function getChatMessages(): Promise<ChatMessage[]> {
  try {
    const data = await AsyncStorage.getItem(KEYS.CHAT_MESSAGES);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function saveChatMessage(message: ChatMessage): Promise<void> {
  try {
    const data = await AsyncStorage.getItem(KEYS.CHAT_MESSAGES);
    let messages: ChatMessage[] = data ? JSON.parse(data) : [];
    messages.push(message);
    if (messages.length > 100) {
      messages = messages.slice(-100);
    }
    await AsyncStorage.setItem(KEYS.CHAT_MESSAGES, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save chat message:", error);
  }
}

export async function clearChatMessages(): Promise<void> {
  try {
    await AsyncStorage.removeItem(KEYS.CHAT_MESSAGES);
  } catch (error) {
    console.error("Failed to clear chat messages:", error);
  }
}
