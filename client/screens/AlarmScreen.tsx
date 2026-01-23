import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { getAlarmSettings, saveAlarmSettings, AlarmSettings } from "@/lib/storage";
import { calculatePrayerTimesForLocation, formatTime, PrayerTimesResult } from "@/lib/prayer-calculator";

const AZAN_SOUNDS = [
  { id: "default", name: "Default Azan", description: "Traditional Azan call" },
  { id: "makkah", name: "Makkah Style", description: "Grand Mosque of Makkah style" },
  { id: "madina", name: "Madina Style", description: "Prophet's Mosque style" },
  { id: "gentle", name: "Gentle Reminder", description: "Soft notification tone" },
];

const REMINDER_OPTIONS = [
  { value: 5, label: "5 minutes" },
  { value: 10, label: "10 minutes" },
  { value: 15, label: "15 minutes" },
  { value: 30, label: "30 minutes" },
];

export default function AlarmScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [settings, setSettings] = useState<AlarmSettings>({
    enabled: false,
    fajr: true,
    dhuhr: true,
    asr: true,
    maghrib: true,
    isha: true,
    azanSound: "default",
    reminderMinutes: 15,
  });
  const [prayerTimes, setPrayerTimes] = useState<PrayerTimesResult | null>(null);
  const [showSoundPicker, setShowSoundPicker] = useState(false);
  const [showReminderPicker, setShowReminderPicker] = useState(false);

  useEffect(() => {
    loadSettings();
    try {
      const times = calculatePrayerTimesForLocation(23.8103, 90.4125);
      setPrayerTimes(times);
    } catch (error) {
      console.error("Failed to calculate prayer times:", error);
    }
  }, []);

  const loadSettings = async () => {
    const saved = await getAlarmSettings();
    setSettings(saved);
  };

  const updateSettings = async (updates: Partial<AlarmSettings>) => {
    await Haptics.selectionAsync();
    const newSettings = { ...settings, ...updates };
    setSettings(newSettings);
    await saveAlarmSettings(newSettings);
  };

  const prayers = [
    { key: "fajr" as const, name: "Fajr", arabicName: "الفجر", icon: "sunrise", time: prayerTimes?.fajr },
    { key: "dhuhr" as const, name: "Dhuhr", arabicName: "الظهر", icon: "sun", time: prayerTimes?.dhuhr },
    { key: "asr" as const, name: "Asr", arabicName: "العصر", icon: "cloud", time: prayerTimes?.asr },
    { key: "maghrib" as const, name: "Maghrib", arabicName: "المغرب", icon: "sunset", time: prayerTimes?.maghrib },
    { key: "isha" as const, name: "Isha", arabicName: "العشاء", icon: "moon", time: prayerTimes?.isha },
  ];

  const selectedSound = AZAN_SOUNDS.find((s) => s.id === settings.azanSound);
  const selectedReminder = REMINDER_OPTIONS.find((r) => r.value === settings.reminderMinutes);

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
        style={[styles.masterCard, { backgroundColor: theme.primary }]}
      >
        <View style={styles.masterContent}>
          <View style={styles.masterIcon}>
            <Feather name="bell" size={28} color={theme.primary} />
          </View>
          <View style={styles.masterInfo}>
            <ThemedText style={styles.masterTitle}>Prayer Alarms</ThemedText>
            <ThemedText style={styles.masterSubtitle}>
              {settings.enabled ? "Alarms are active" : "Alarms are disabled"}
            </ThemedText>
          </View>
          <Switch
            value={settings.enabled}
            onValueChange={(value) => updateSettings({ enabled: value })}
            trackColor={{ false: "rgba(255,255,255,0.3)", true: "rgba(255,255,255,0.5)" }}
            thumbColor="#FFFFFF"
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Prayer Times</ThemedText>
        <View style={[styles.prayersList, { backgroundColor: theme.backgroundDefault }]}>
          {prayers.map((prayer, index) => (
            <View
              key={prayer.key}
              style={[
                styles.prayerRow,
                index < prayers.length - 1 && { borderBottomWidth: 1, borderBottomColor: theme.cardBorder },
              ]}
            >
              <View style={[styles.prayerIcon, { backgroundColor: theme.primary + "15" }]}>
                <Feather name={prayer.icon as any} size={20} color={theme.primary} />
              </View>
              <View style={styles.prayerInfo}>
                <View style={styles.prayerNames}>
                  <ThemedText style={styles.prayerName}>{prayer.name}</ThemedText>
                  <ThemedText style={[styles.prayerArabic, { color: theme.textSecondary }]}>
                    {prayer.arabicName}
                  </ThemedText>
                </View>
                <ThemedText style={[styles.prayerTime, { color: theme.textSecondary }]}>
                  {prayer.time && !isNaN(prayer.time.getTime()) ? formatTime(prayer.time) : "--:--"}
                </ThemedText>
              </View>
              <Switch
                value={settings[prayer.key]}
                onValueChange={(value) => updateSettings({ [prayer.key]: value })}
                trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
                thumbColor={settings[prayer.key] ? theme.primary : theme.backgroundDefault}
                disabled={!settings.enabled}
              />
            </View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Alarm Settings</ThemedText>
        <View style={[styles.settingsCard, { backgroundColor: theme.backgroundDefault }]}>
          <Pressable
            onPress={() => setShowSoundPicker(!showSoundPicker)}
            style={[styles.settingsRow, { borderBottomWidth: 1, borderBottomColor: theme.cardBorder }]}
          >
            <View style={[styles.settingsIcon, { backgroundColor: AppColors.gold + "20" }]}>
              <Feather name="volume-2" size={20} color={AppColors.gold} />
            </View>
            <View style={styles.settingsInfo}>
              <ThemedText style={styles.settingsLabel}>Azan Sound</ThemedText>
              <ThemedText style={[styles.settingsValue, { color: theme.textSecondary }]}>
                {selectedSound?.name || "Default Azan"}
              </ThemedText>
            </View>
            <Feather
              name={showSoundPicker ? "chevron-up" : "chevron-down"}
              size={20}
              color={theme.textSecondary}
            />
          </Pressable>

          {showSoundPicker ? (
            <View style={styles.pickerContainer}>
              {AZAN_SOUNDS.map((sound) => (
                <Pressable
                  key={sound.id}
                  onPress={() => {
                    updateSettings({ azanSound: sound.id });
                    setShowSoundPicker(false);
                  }}
                  style={[
                    styles.pickerOption,
                    settings.azanSound === sound.id && { backgroundColor: theme.primary + "10" },
                  ]}
                >
                  <View style={styles.pickerContent}>
                    <ThemedText
                      style={[
                        styles.pickerLabel,
                        settings.azanSound === sound.id && { color: theme.primary },
                      ]}
                    >
                      {sound.name}
                    </ThemedText>
                    <ThemedText style={[styles.pickerDesc, { color: theme.textSecondary }]}>
                      {sound.description}
                    </ThemedText>
                  </View>
                  {settings.azanSound === sound.id ? (
                    <Feather name="check" size={20} color={theme.primary} />
                  ) : null}
                </Pressable>
              ))}
            </View>
          ) : null}

          <Pressable
            onPress={() => setShowReminderPicker(!showReminderPicker)}
            style={styles.settingsRow}
          >
            <View style={[styles.settingsIcon, { backgroundColor: AppColors.accent + "20" }]}>
              <Feather name="clock" size={20} color={AppColors.accent} />
            </View>
            <View style={styles.settingsInfo}>
              <ThemedText style={styles.settingsLabel}>Reminder Before Prayer</ThemedText>
              <ThemedText style={[styles.settingsValue, { color: theme.textSecondary }]}>
                {selectedReminder?.label || "15 minutes"}
              </ThemedText>
            </View>
            <Feather
              name={showReminderPicker ? "chevron-up" : "chevron-down"}
              size={20}
              color={theme.textSecondary}
            />
          </Pressable>

          {showReminderPicker ? (
            <View style={styles.pickerContainer}>
              {REMINDER_OPTIONS.map((option) => (
                <Pressable
                  key={option.value}
                  onPress={() => {
                    updateSettings({ reminderMinutes: option.value });
                    setShowReminderPicker(false);
                  }}
                  style={[
                    styles.pickerOption,
                    settings.reminderMinutes === option.value && { backgroundColor: theme.primary + "10" },
                  ]}
                >
                  <ThemedText
                    style={[
                      styles.pickerLabel,
                      settings.reminderMinutes === option.value && { color: theme.primary },
                    ]}
                  >
                    {option.label}
                  </ThemedText>
                  {settings.reminderMinutes === option.value ? (
                    <Feather name="check" size={20} color={theme.primary} />
                  ) : null}
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(500)}
        style={[styles.infoCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <View style={[styles.infoIcon, { backgroundColor: theme.primary + "15" }]}>
          <Feather name="info" size={20} color={theme.primary} />
        </View>
        <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
          Prayer alarms will notify you at the exact prayer time based on your location. 
          Enable reminder notifications to prepare for prayer in advance.
        </ThemedText>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  masterCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  masterContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  masterIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.lg,
  },
  masterInfo: {
    flex: 1,
  },
  masterTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  masterSubtitle: {
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
  prayersList: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  prayerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  prayerIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  prayerInfo: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  prayerNames: {
    gap: 2,
  },
  prayerName: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  prayerArabic: {
    fontSize: 12,
  },
  prayerTime: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginRight: Spacing.md,
  },
  settingsCard: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  settingsRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  settingsIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  settingsInfo: {
    flex: 1,
  },
  settingsLabel: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  settingsValue: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },
  pickerContainer: {
    borderTopWidth: 1,
    borderTopColor: "rgba(0,0,0,0.05)",
  },
  pickerOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    paddingLeft: Spacing.lg + 44 + Spacing.md,
  },
  pickerContent: {
    flex: 1,
  },
  pickerLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  pickerDesc: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },
  infoCard: {
    flexDirection: "row",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  infoIcon: {
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
