import { Platform } from "react-native";

export const AppColors = {
  primary: "#1E40AF",
  primaryLight: "#3B82F6",
  accent: "#0EA5E9",
  gold: "#F59E0B",
  background: "#F8FAFC",
  surface: "#FFFFFF",
  textPrimary: "#1E293B",
  textSecondary: "#64748B",
  success: "#10B981",
  error: "#EF4444",
  warning: "#F59E0B",
  islamic: "#1E3A5F",
};

const tintColorLight = AppColors.primary;
const tintColorDark = "#60A5FA";

export const Colors = {
  light: {
    text: AppColors.textPrimary,
    textSecondary: AppColors.textSecondary,
    buttonText: "#FFFFFF",
    tabIconDefault: AppColors.textSecondary,
    tabIconSelected: tintColorLight,
    link: AppColors.primary,
    primary: AppColors.primary,
    primaryLight: AppColors.primaryLight,
    accent: AppColors.accent,
    gold: AppColors.gold,
    islamic: AppColors.islamic,
    backgroundRoot: AppColors.background,
    backgroundDefault: AppColors.surface,
    backgroundSecondary: "#F1F5F9",
    backgroundTertiary: "#E2E8F0",
    success: AppColors.success,
    error: AppColors.error,
    warning: AppColors.warning,
    cardBorder: "rgba(30,64,175,0.1)",
  },
  dark: {
    text: "#F1F5F9",
    textSecondary: "#94A3B8",
    buttonText: "#FFFFFF",
    tabIconDefault: "#94A3B8",
    tabIconSelected: tintColorDark,
    link: "#60A5FA",
    primary: "#3B82F6",
    primaryLight: "#60A5FA",
    accent: "#38BDF8",
    gold: "#FBBF24",
    islamic: "#1E3A5F",
    backgroundRoot: "#0F172A",
    backgroundDefault: "#1E293B",
    backgroundSecondary: "#334155",
    backgroundTertiary: "#475569",
    success: "#10B981",
    error: "#F87171",
    warning: "#FBBF24",
    cardBorder: "rgba(59,130,246,0.2)",
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
  inputHeight: 48,
  buttonHeight: 52,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  "2xl": 32,
  "3xl": 40,
  full: 9999,
};

export const Typography = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700" as const,
    fontFamily: "Poppins_700Bold",
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
    fontWeight: "700" as const,
    fontFamily: "Poppins_700Bold",
  },
  h3: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: "600" as const,
    fontFamily: "Poppins_600SemiBold",
  },
  h4: {
    fontSize: 20,
    lineHeight: 28,
    fontWeight: "600" as const,
    fontFamily: "Poppins_600SemiBold",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400" as const,
    fontFamily: "Poppins_400Regular",
  },
  small: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: "400" as const,
    fontFamily: "Poppins_400Regular",
  },
  link: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "500" as const,
    fontFamily: "Poppins_500Medium",
  },
  arabic: {
    fontSize: 24,
    lineHeight: 40,
    fontWeight: "400" as const,
  },
  arabicLarge: {
    fontSize: 32,
    lineHeight: 48,
    fontWeight: "400" as const,
  },
};

export const Shadows = {
  sm: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  gold: {
    shadowColor: AppColors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: "Poppins_400Regular",
    serif: "ui-serif",
    rounded: "ui-rounded",
    mono: "ui-monospace",
  },
  default: {
    sans: "Poppins_400Regular",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "Poppins, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
