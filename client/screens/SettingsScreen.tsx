import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import {
  getThemePreference,
  setThemePreference,
  getLanguagePreference,
  setLanguagePreference,
  ThemePreference,
  LanguagePreference,
  LANGUAGES,
} from "@/lib/settings";
import { getAuthUser, isLoggedIn, logout, AuthUser } from "@/lib/auth";

interface SettingsRowProps {
  icon: string;
  title: string;
  subtitle?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
  danger?: boolean;
  theme: any;
}

function SettingsRow({
  icon,
  title,
  subtitle,
  onPress,
  rightElement,
  danger,
  theme,
}: SettingsRowProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.settingsRow,
        { backgroundColor: theme.backgroundDefault },
      ]}
    >
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor: danger
              ? theme.error + "15"
              : theme.primary + "15",
          },
        ]}
      >
        <Feather
          name={icon as any}
          size={20}
          color={danger ? theme.error : theme.primary}
        />
      </View>
      <View style={styles.rowContent}>
        <ThemedText
          style={[styles.rowTitle, danger && { color: theme.error }]}
        >
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText
            style={[styles.rowSubtitle, { color: theme.textSecondary }]}
          >
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {rightElement || (
        <Feather name="chevron-right" size={20} color={theme.textSecondary} />
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [themePreference, setThemePref] = useState<ThemePreference>("system");
  const [languagePreference, setLanguagePref] = useState<LanguagePreference>("en");

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const authUser = await getAuthUser();
    const loggedInStatus = await isLoggedIn();
    const themePref = await getThemePreference();
    const langPref = await getLanguagePreference();

    setUser(authUser);
    setLoggedIn(loggedInStatus);
    setThemePref(themePref);
    setLanguagePref(langPref);
  };

  const handleThemeChange = async (value: boolean) => {
    await Haptics.selectionAsync();
    const newTheme: ThemePreference = value ? "dark" : "light";
    setThemePref(newTheme);
    await setThemePreference(newTheme);
  };

  const handleLanguagePress = async () => {
    await Haptics.selectionAsync();
    navigation.navigate("LanguageSelect");
  };

  const handleEditProfile = async () => {
    await Haptics.selectionAsync();
    navigation.navigate("EditProfile");
  };

  const handleLogin = async () => {
    await Haptics.selectionAsync();
    navigation.navigate("Login");
  };

  const handleLogout = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    await logout();
    setUser(null);
    setLoggedIn(false);
  };

  const currentLanguage = LANGUAGES.find((l) => l.code === languagePreference);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      {loggedIn && user ? (
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={[
            styles.profileCard,
            { backgroundColor: theme.primary },
          ]}
        >
          <View style={styles.profileAvatar}>
            <Feather name="user" size={32} color={theme.primary} />
          </View>
          <View style={styles.profileInfo}>
            <ThemedText style={styles.profileName}>{user.name}</ThemedText>
            <ThemedText style={styles.profileEmail}>{user.email}</ThemedText>
          </View>
          <Pressable onPress={handleEditProfile} style={styles.editProfileBtn}>
            <Feather name="edit-2" size={18} color="#FFFFFF" />
          </Pressable>
        </Animated.View>
      ) : (
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={[
            styles.loginCard,
            { backgroundColor: theme.backgroundDefault, borderColor: theme.cardBorder },
          ]}
        >
          <View
            style={[styles.loginIconBg, { backgroundColor: theme.primary + "15" }]}
          >
            <Feather name="log-in" size={28} color={theme.primary} />
          </View>
          <ThemedText style={styles.loginTitle}>Welcome</ThemedText>
          <ThemedText
            style={[styles.loginSubtitle, { color: theme.textSecondary }]}
          >
            Sign in to sync your data across devices
          </ThemedText>
          <Pressable
            onPress={handleLogin}
            style={[styles.loginButton, { backgroundColor: theme.primary }]}
          >
            <ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
          </Pressable>
        </Animated.View>
      )}

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>
        <View style={styles.section}>
          <SettingsRow
            icon="user"
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={handleEditProfile}
            theme={theme}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Preferences</ThemedText>
        <View style={styles.section}>
          <SettingsRow
            icon="moon"
            title="Dark Mode"
            subtitle={isDark ? "Enabled" : "Disabled"}
            rightElement={
              <Switch
                value={themePreference === "dark" || (themePreference === "system" && isDark)}
                onValueChange={handleThemeChange}
                trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
                thumbColor={isDark ? theme.primary : theme.backgroundDefault}
              />
            }
            theme={theme}
          />
          <SettingsRow
            icon="globe"
            title="Language"
            subtitle={currentLanguage?.nativeName || "English"}
            onPress={handleLanguagePress}
            theme={theme}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Notifications</ThemedText>
        <View style={styles.section}>
          <SettingsRow
            icon="bell"
            title="Prayer Reminders"
            subtitle="Get notified before prayer times"
            rightElement={
              <Switch
                value={true}
                trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
                thumbColor={theme.primary}
              />
            }
            theme={theme}
          />
          <SettingsRow
            icon="sunrise"
            title="Fajr Alarm"
            subtitle="Special alarm for Fajr prayer"
            rightElement={
              <Switch
                value={false}
                trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
                thumbColor={theme.backgroundDefault}
              />
            }
            theme={theme}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(500)}>
        <ThemedText style={styles.sectionTitle}>About</ThemedText>
        <View style={styles.section}>
          <SettingsRow
            icon="info"
            title="About Day with Islam"
            subtitle="Version 1.0.0"
            theme={theme}
          />
          <SettingsRow
            icon="shield"
            title="Privacy Policy"
            theme={theme}
          />
          <SettingsRow
            icon="file-text"
            title="Terms of Service"
            theme={theme}
          />
        </View>
      </Animated.View>

      {loggedIn ? (
        <Animated.View entering={FadeInDown.delay(600).duration(500)}>
          <View style={[styles.section, { marginTop: Spacing.xl }]}>
            <SettingsRow
              icon="log-out"
              title="Sign Out"
              onPress={handleLogout}
              danger
              theme={theme}
            />
          </View>
        </Animated.View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    ...Shadows.lg,
  },
  profileAvatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  profileInfo: {
    flex: 1,
    marginLeft: Spacing.lg,
  },
  profileName: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  profileEmail: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  editProfileBtn: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  loginCard: {
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    padding: Spacing["2xl"],
    marginBottom: Spacing["2xl"],
    borderWidth: 1,
    ...Shadows.sm,
  },
  loginIconBg: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  loginTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  loginSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  loginButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing["3xl"],
    borderRadius: BorderRadius.full,
  },
  loginButtonText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  section: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing["2xl"],
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  rowContent: {
    flex: 1,
  },
  rowTitle: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  rowSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },
});
