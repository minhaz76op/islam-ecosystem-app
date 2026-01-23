import React, { useState, useEffect } from "react";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { LANGUAGES } from "@/lib/settings";
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
          style={[styles.rowTitle, danger ? { color: theme.error } : undefined]}
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
  const { theme, isDark, themePreference, setTheme } = useTheme();
  const { language, t } = useLanguage();

  const [user, setUser] = useState<AuthUser | null>(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const authUser = await getAuthUser();
    const loggedInStatus = await isLoggedIn();
    setUser(authUser);
    setLoggedIn(loggedInStatus);
  };

  const handleThemeChange = async (value: boolean) => {
    await Haptics.selectionAsync();
    const newTheme = value ? "dark" : "light";
    await setTheme(newTheme);
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

  const currentLanguage = LANGUAGES.find((l) => l.code === language);

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
            <ThemedText style={styles.profileName}>@{user.username || user.name.toLowerCase().replace(/\s/g, '')}</ThemedText>
            <ThemedText style={styles.profileEmail}>ID: {user.uniqueId || 'DWI' + user.createdAt.toString().slice(-8)}</ThemedText>
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
          <ThemedText style={styles.loginTitle}>{t("welcome")}</ThemedText>
          <ThemedText
            style={[styles.loginSubtitle, { color: theme.textSecondary }]}
          >
            Sign in to sync your data across devices
          </ThemedText>
          <Pressable
            onPress={handleLogin}
            style={[styles.loginButton, { backgroundColor: theme.primary }]}
          >
            <ThemedText style={styles.loginButtonText}>{t("signIn")}</ThemedText>
          </Pressable>
        </Animated.View>
      )}

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Account</ThemedText>
        <View style={styles.section}>
          <SettingsRow
            icon="user"
            title={t("editProfile")}
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
            title={t("darkMode")}
            subtitle={isDark ? t("enabled") : t("disabled")}
            rightElement={
              <Switch
                value={isDark}
                onValueChange={handleThemeChange}
                trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
                thumbColor={isDark ? theme.primary : theme.backgroundDefault}
              />
            }
            theme={theme}
          />
          <SettingsRow
            icon="globe"
            title={t("language")}
            subtitle={currentLanguage?.nativeName || "English"}
            onPress={handleLanguagePress}
            theme={theme}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Notifications & Alarms</ThemedText>
        <View style={styles.section}>
          <SettingsRow
            icon="bell"
            title="Notifications"
            subtitle="Manage prayer reminders and alerts"
            onPress={() => navigation.navigate("Notifications")}
            theme={theme}
          />
          <SettingsRow
            icon="clock"
            title="Prayer Alarms"
            subtitle="Set alarms for each prayer time"
            onPress={() => navigation.navigate("Alarm")}
            theme={theme}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(450).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Adhan</ThemedText>
        <View style={styles.section}>
          <SettingsRow
            icon="volume-2"
            title="Adhan Settings"
            subtitle="Muezzin voices & prayer notifications"
            onPress={() => navigation.navigate("AdhanSettings")}
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
            onPress={() => navigation.navigate("About")}
            theme={theme}
          />
          <SettingsRow
            icon="award"
            title="Credits"
            subtitle="Developer & acknowledgements"
            onPress={() => navigation.navigate("Credits")}
            theme={theme}
          />
          <SettingsRow
            icon="shield"
            title="Privacy Policy"
            onPress={() => navigation.navigate("PrivacyPolicy")}
            theme={theme}
          />
          <SettingsRow
            icon="file-text"
            title="Terms of Service"
            onPress={() => navigation.navigate("TermsOfService")}
            theme={theme}
          />
        </View>
      </Animated.View>

      {loggedIn ? (
        <Animated.View entering={FadeInDown.delay(600).duration(500)}>
          <View style={[styles.section, { marginTop: Spacing.xl }]}>
            <SettingsRow
              icon="log-out"
              title={t("signOut")}
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
