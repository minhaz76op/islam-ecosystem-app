import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable, Switch, Platform, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import * as Notifications from "expo-notifications";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { getNotificationSettings, saveNotificationSettings, NotificationSettings } from "@/lib/storage";
import { requestNotificationPermissions } from "@/lib/notifications";

export default function NotificationsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [permissionGranted, setPermissionGranted] = useState<boolean | null>(null);
  const [settings, setSettings] = useState<NotificationSettings>({
    prayerReminders: true,
    fajrAlarm: false,
    dailyVerse: true,
    islamicEvents: true,
  });

  useEffect(() => {
    checkPermissions();
    loadSettings();
  }, []);

  const checkPermissions = async () => {
    const { status } = await Notifications.getPermissionsAsync();
    setPermissionGranted(status === "granted");
  };

  const loadSettings = async () => {
    const saved = await getNotificationSettings();
    setSettings(saved);
  };

  const handleRequestPermissions = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const granted = await requestNotificationPermissions();
    setPermissionGranted(granted);
  };

  const handleOpenSettings = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (Platform.OS !== "web") {
      try {
        await Linking.openSettings();
      } catch (error) {
        console.error("Could not open settings:", error);
      }
    }
  };

  const updateSettings = async (updates: Partial<NotificationSettings>) => {
    await Haptics.selectionAsync();
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    await saveNotificationSettings(newSettings);
  };

  const notificationTypes = [
    {
      key: "prayerReminders" as const,
      title: "Prayer Reminders",
      description: "Get notified before prayer times",
      icon: "bell",
      color: AppColors.primary,
    },
    {
      key: "fajrAlarm" as const,
      title: "Fajr Wake-up Alarm",
      description: "Special loud alarm for Fajr prayer",
      icon: "sunrise",
      color: AppColors.gold,
    },
    {
      key: "dailyVerse" as const,
      title: "Daily Quran Verse",
      description: "Receive a verse from the Quran each day",
      icon: "book",
      color: AppColors.accent,
    },
    {
      key: "islamicEvents" as const,
      title: "Islamic Events",
      description: "Reminders for Islamic holidays and events",
      icon: "calendar",
      color: "#8B5CF6",
    },
  ];

  if (permissionGranted === null) {
    return (
      <View style={[styles.container, styles.centered, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Loading...</ThemedText>
      </View>
    );
  }

  if (!permissionGranted) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      >
        <View style={[styles.permissionCard, { marginTop: headerHeight + Spacing["3xl"] }]}>
          <View style={[styles.permissionIcon, { backgroundColor: theme.primary + "15" }]}>
            <Feather name="bell-off" size={48} color={theme.primary} />
          </View>
          <ThemedText style={styles.permissionTitle}>
            Enable Notifications
          </ThemedText>
          <ThemedText style={[styles.permissionDesc, { color: theme.textSecondary }]}>
            Allow notifications to receive prayer reminders, Fajr alarms, daily verses, 
            and updates about Islamic events.
          </ThemedText>
          <Button onPress={handleRequestPermissions} style={styles.permissionButton}>
            Enable Notifications
          </Button>
          <Pressable onPress={handleOpenSettings} style={styles.settingsLink}>
            <ThemedText style={[styles.settingsLinkText, { color: theme.primary }]}>
              Open Settings
            </ThemedText>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={[styles.statusCard, { backgroundColor: theme.primary }]}
      >
        <View style={styles.statusIcon}>
          <Feather name="check-circle" size={28} color={theme.primary} />
        </View>
        <View style={styles.statusContent}>
          <ThemedText style={styles.statusTitle}>Notifications Enabled</ThemedText>
          <ThemedText style={styles.statusSubtitle}>
            You'll receive updates for your selected preferences
          </ThemedText>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Notification Types</ThemedText>
        <View style={[styles.notificationsList, { backgroundColor: theme.backgroundDefault }]}>
          {notificationTypes.map((item, index) => (
            <View
              key={item.key}
              style={[
                styles.notificationRow,
                index < notificationTypes.length - 1 && {
                  borderBottomWidth: 1,
                  borderBottomColor: theme.cardBorder,
                },
              ]}
            >
              <View style={[styles.notificationIcon, { backgroundColor: item.color + "15" }]}>
                <Feather name={item.icon as any} size={22} color={item.color} />
              </View>
              <View style={styles.notificationInfo}>
                <ThemedText style={styles.notificationTitle}>{item.title}</ThemedText>
                <ThemedText style={[styles.notificationDesc, { color: theme.textSecondary }]}>
                  {item.description}
                </ThemedText>
              </View>
              <Switch
                value={settings[item.key]}
                onValueChange={(value) => updateSettings({ [item.key]: value })}
                trackColor={{ false: theme.backgroundTertiary, true: item.color + "50" }}
                thumbColor={settings[item.key] ? item.color : theme.backgroundDefault}
              />
            </View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Quick Actions</ThemedText>
        <View style={styles.actionsRow}>
          <Pressable
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              await Notifications.scheduleNotificationAsync({
                content: {
                  title: "Test Notification",
                  body: "This is a test notification from Day with Islam",
                  sound: true,
                },
                trigger: null,
              });
            }}
            style={[styles.actionCard, { backgroundColor: theme.backgroundDefault }]}
          >
            <View style={[styles.actionIcon, { backgroundColor: AppColors.accent + "15" }]}>
              <Feather name="send" size={20} color={AppColors.accent} />
            </View>
            <ThemedText style={styles.actionText}>Test</ThemedText>
          </Pressable>

          <Pressable
            onPress={async () => {
              await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
              await Notifications.cancelAllScheduledNotificationsAsync();
            }}
            style={[styles.actionCard, { backgroundColor: theme.backgroundDefault }]}
          >
            <View style={[styles.actionIcon, { backgroundColor: theme.error + "15" }]}>
              <Feather name="x-circle" size={20} color={theme.error} />
            </View>
            <ThemedText style={styles.actionText}>Clear All</ThemedText>
          </Pressable>

          <Pressable
            onPress={handleOpenSettings}
            style={[styles.actionCard, { backgroundColor: theme.backgroundDefault }]}
          >
            <View style={[styles.actionIcon, { backgroundColor: theme.primary + "15" }]}>
              <Feather name="settings" size={20} color={theme.primary} />
            </View>
            <ThemedText style={styles.actionText}>Settings</ThemedText>
          </Pressable>
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(500)}
        style={[styles.infoCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <View style={[styles.infoIconContainer, { backgroundColor: AppColors.gold + "15" }]}>
          <Feather name="info" size={20} color={AppColors.gold} />
        </View>
        <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
          Notifications are scheduled based on your local prayer times. Make sure to enable 
          location access for accurate prayer time calculations.
        </ThemedText>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  permissionCard: {
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  permissionIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.xl,
  },
  permissionTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  permissionDesc: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: Spacing.xl,
  },
  permissionButton: {
    width: "100%",
    marginBottom: Spacing.lg,
  },
  settingsLink: {
    padding: Spacing.md,
  },
  settingsLinkText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  statusCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  statusIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
  },
  statusContent: {
    flex: 1,
  },
  statusTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  statusSubtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  notificationsList: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  notificationRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  notificationInfo: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  notificationDesc: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: "row",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  actionCard: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    ...Shadows.sm,
  },
  actionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  actionText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
  infoCard: {
    flexDirection: "row",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
