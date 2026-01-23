import React, { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Pressable, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

interface MuezzinVoice {
  id: string;
  name: string;
  origin: string;
  style: string;
}

const MUEZZIN_VOICES: MuezzinVoice[] = [
  { id: "mishary", name: "Mishary Rashid Alafasy", origin: "Kuwait", style: "Beautiful & Melodious" },
  { id: "makkah", name: "Adhan from Masjid al-Haram", origin: "Makkah", style: "Classic Makkan" },
  { id: "madinah", name: "Adhan from Masjid an-Nabawi", origin: "Madinah", style: "Traditional Madinan" },
  { id: "abdulbasit", name: "Abdul Basit Abdul Samad", origin: "Egypt", style: "Egyptian Maqam" },
  { id: "sudais", name: "Abdul Rahman Al-Sudais", origin: "Saudi Arabia", style: "Dignified & Powerful" },
  { id: "simple", name: "Simple Adhan", origin: "Standard", style: "Clear & Simple" },
];

interface AdhanSettings {
  enabled: boolean;
  selectedVoice: string;
  fajrEnabled: boolean;
  dhuhrEnabled: boolean;
  asrEnabled: boolean;
  maghribEnabled: boolean;
  ishaEnabled: boolean;
  preAdhanReminder: number;
}

const DEFAULT_SETTINGS: AdhanSettings = {
  enabled: true,
  selectedVoice: "mishary",
  fajrEnabled: true,
  dhuhrEnabled: true,
  asrEnabled: true,
  maghribEnabled: true,
  ishaEnabled: true,
  preAdhanReminder: 10,
};

const STORAGE_KEY = "@adhan_settings";

export default function AdhanSettingsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme, isDark } = useTheme();

  const [settings, setSettings] = useState<AdhanSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setSettings(JSON.parse(stored));
      }
    } catch (error) {
      console.log("Error loading adhan settings");
    }
  };

  const saveSettings = async (newSettings: AdhanSettings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));
      setSettings(newSettings);
    } catch (error) {
      console.log("Error saving adhan settings");
    }
  };

  const handleVoiceSelect = async (voiceId: string) => {
    await Haptics.selectionAsync();
    saveSettings({ ...settings, selectedVoice: voiceId });
  };

  const handleToggle = async (key: keyof AdhanSettings) => {
    await Haptics.selectionAsync();
    saveSettings({ ...settings, [key]: !settings[key as keyof AdhanSettings] });
  };

  const selectedVoice = MUEZZIN_VOICES.find((v) => v.id === settings.selectedVoice);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["3xl"],
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
    >
      <Animated.View
        entering={FadeInUp.delay(100).duration(600)}
        style={[styles.headerCard, { backgroundColor: theme.primary }]}
      >
        <View style={styles.headerIcon}>
          <Feather name="volume-2" size={32} color="#FFFFFF" />
        </View>
        <ThemedText style={styles.headerTitle}>Adhan Notifications</ThemedText>
        <ThemedText style={styles.headerSubtitle}>
          Hear the beautiful call to prayer at each salah time
        </ThemedText>
        <View style={styles.masterToggle}>
          <ThemedText style={styles.toggleLabel}>Enable Adhan</ThemedText>
          <Switch
            value={settings.enabled}
            onValueChange={() => handleToggle("enabled")}
            trackColor={{ false: "rgba(255,255,255,0.3)", true: "rgba(255,255,255,0.5)" }}
            thumbColor={settings.enabled ? "#FFFFFF" : "#FFFFFF"}
          />
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(600)}>
        <ThemedText style={styles.sectionTitle}>Select Muezzin Voice</ThemedText>
        <View style={styles.voicesContainer}>
          {MUEZZIN_VOICES.map((voice, index) => {
            const isSelected = settings.selectedVoice === voice.id;
            return (
              <Pressable
                key={voice.id}
                onPress={() => handleVoiceSelect(voice.id)}
                style={[
                  styles.voiceCard,
                  {
                    backgroundColor: isSelected ? theme.primary : theme.backgroundDefault,
                    borderColor: isSelected ? theme.primary : theme.cardBorder,
                  },
                ]}
              >
                <View style={styles.voiceInfo}>
                  <ThemedText
                    style={[styles.voiceName, { color: isSelected ? "#FFFFFF" : theme.text }]}
                  >
                    {voice.name}
                  </ThemedText>
                  <ThemedText
                    style={[
                      styles.voiceOrigin,
                      { color: isSelected ? "rgba(255,255,255,0.8)" : theme.textSecondary },
                    ]}
                  >
                    {voice.origin} • {voice.style}
                  </ThemedText>
                </View>
                {isSelected ? (
                  <View style={styles.checkBadge}>
                    <Feather name="check" size={16} color="#FFFFFF" />
                  </View>
                ) : (
                  <View style={[styles.radioOuter, { borderColor: theme.textSecondary }]}>
                    <View style={styles.radioInner} />
                  </View>
                )}
              </Pressable>
            );
          })}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(600)}>
        <ThemedText style={styles.sectionTitle}>Prayer-Specific Settings</ThemedText>
        <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.prayerRow}>
            <View style={[styles.prayerIcon, { backgroundColor: "#6366F1" + "20" }]}>
              <Feather name="sunrise" size={18} color="#6366F1" />
            </View>
            <ThemedText style={styles.prayerName}>Fajr</ThemedText>
            <Switch
              value={settings.fajrEnabled}
              onValueChange={() => handleToggle("fajrEnabled")}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
              thumbColor={settings.fajrEnabled ? theme.primary : theme.backgroundDefault}
            />
          </View>
          <View style={styles.prayerRow}>
            <View style={[styles.prayerIcon, { backgroundColor: AppColors.gold + "20" }]}>
              <Feather name="sun" size={18} color={AppColors.gold} />
            </View>
            <ThemedText style={styles.prayerName}>Dhuhr</ThemedText>
            <Switch
              value={settings.dhuhrEnabled}
              onValueChange={() => handleToggle("dhuhrEnabled")}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
              thumbColor={settings.dhuhrEnabled ? theme.primary : theme.backgroundDefault}
            />
          </View>
          <View style={styles.prayerRow}>
            <View style={[styles.prayerIcon, { backgroundColor: "#F97316" + "20" }]}>
              <Feather name="cloud" size={18} color="#F97316" />
            </View>
            <ThemedText style={styles.prayerName}>Asr</ThemedText>
            <Switch
              value={settings.asrEnabled}
              onValueChange={() => handleToggle("asrEnabled")}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
              thumbColor={settings.asrEnabled ? theme.primary : theme.backgroundDefault}
            />
          </View>
          <View style={styles.prayerRow}>
            <View style={[styles.prayerIcon, { backgroundColor: "#EC4899" + "20" }]}>
              <Feather name="sunset" size={18} color="#EC4899" />
            </View>
            <ThemedText style={styles.prayerName}>Maghrib</ThemedText>
            <Switch
              value={settings.maghribEnabled}
              onValueChange={() => handleToggle("maghribEnabled")}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
              thumbColor={settings.maghribEnabled ? theme.primary : theme.backgroundDefault}
            />
          </View>
          <View style={[styles.prayerRow, { borderBottomWidth: 0 }]}>
            <View style={[styles.prayerIcon, { backgroundColor: "#8B5CF6" + "20" }]}>
              <Feather name="moon" size={18} color="#8B5CF6" />
            </View>
            <ThemedText style={styles.prayerName}>Isha</ThemedText>
            <Switch
              value={settings.ishaEnabled}
              onValueChange={() => handleToggle("ishaEnabled")}
              trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
              thumbColor={settings.ishaEnabled ? theme.primary : theme.backgroundDefault}
            />
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(600)}>
        <View style={[styles.infoCard, { backgroundColor: theme.primary + "10" }]}>
          <Feather name="info" size={18} color={theme.primary} />
          <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
            Adhan audio will play at the calculated prayer times for your location. Make sure notifications are enabled in your device settings.
          </ThemedText>
        </View>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing["2xl"],
    alignItems: "center",
    marginBottom: Spacing["2xl"],
    ...Shadows.lg,
  },
  headerIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
    marginBottom: Spacing.xs,
  },
  headerSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.85)",
    textAlign: "center",
    marginBottom: Spacing.xl,
  },
  masterToggle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
  },
  toggleLabel: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
    marginLeft: Spacing.xs,
  },
  voicesContainer: {
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  voiceCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    ...Shadows.sm,
  },
  voiceInfo: {
    flex: 1,
  },
  voiceName: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 2,
  },
  voiceOrigin: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  checkBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 0,
    height: 0,
    borderRadius: 5,
  },
  section: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    marginBottom: Spacing["2xl"],
    ...Shadows.sm,
  },
  prayerRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  prayerIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  prayerName: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  infoCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    gap: Spacing.md,
  },
  infoText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
