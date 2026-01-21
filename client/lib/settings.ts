import AsyncStorage from "@react-native-async-storage/async-storage";

const KEYS = {
  THEME: "@day_with_islam:theme",
  LANGUAGE: "@day_with_islam:language",
};

export type ThemePreference = "system" | "light" | "dark";
export type LanguagePreference = "en" | "ar" | "bn";

export const LANGUAGES = [
  { code: "en", name: "English", nativeName: "English" },
  { code: "ar", name: "Arabic", nativeName: "العربية" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা" },
];

export async function getThemePreference(): Promise<ThemePreference> {
  try {
    const data = await AsyncStorage.getItem(KEYS.THEME);
    return (data as ThemePreference) || "system";
  } catch {
    return "system";
  }
}

export async function setThemePreference(theme: ThemePreference): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.THEME, theme);
  } catch (error) {
    console.error("Failed to save theme preference:", error);
  }
}

export async function getLanguagePreference(): Promise<LanguagePreference> {
  try {
    const data = await AsyncStorage.getItem(KEYS.LANGUAGE);
    return (data as LanguagePreference) || "en";
  } catch {
    return "en";
  }
}

export async function setLanguagePreference(language: LanguagePreference): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.LANGUAGE, language);
  } catch (error) {
    console.error("Failed to save language preference:", error);
  }
}
