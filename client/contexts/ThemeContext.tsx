import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";
import { Colors } from "@/constants/theme";
import { getThemePreference, setThemePreference, ThemePreference } from "@/lib/settings";

interface ThemeContextType {
  theme: typeof Colors.light;
  isDark: boolean;
  themePreference: ThemePreference;
  setTheme: (preference: ThemePreference) => Promise<void>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [themePreference, setThemePref] = useState<ThemePreference>("system");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const saved = await getThemePreference();
    setThemePref(saved);
    setIsLoaded(true);
  };

  const setTheme = async (preference: ThemePreference) => {
    setThemePref(preference);
    await setThemePreference(preference);
  };

  const isDark =
    themePreference === "dark" ||
    (themePreference === "system" && systemColorScheme === "dark");

  const theme = Colors[isDark ? "dark" : "light"];

  return (
    <ThemeContext.Provider value={{ theme, isDark, themePreference, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within ThemeProvider");
  }
  return context;
}
