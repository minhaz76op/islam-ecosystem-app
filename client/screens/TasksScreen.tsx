import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  FadeInDown,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import {
  calculatePrayerTimes,
  formatPrayerTime,
  DailyPrayers,
} from "@/lib/prayer-times";
import {
  getCompletedPrayers,
  saveCompletedPrayer,
  CompletedPrayer,
} from "@/lib/storage";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

const PRAYER_ICONS: Record<string, string> = {
  fajr: "sunrise",
  dhuhr: "sun",
  asr: "cloud",
  maghrib: "sunset",
  isha: "moon",
};

export default function TasksScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme } = useTheme();

  const [prayers, setPrayers] = useState<DailyPrayers | null>(null);
  const [completedPrayers, setCompletedPrayers] =
    useState<CompletedPrayer | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = useCallback(async () => {
    const today = getTodayDate();
    const prayerTimes = calculatePrayerTimes();
    setPrayers(prayerTimes);

    const completed = await getCompletedPrayers(today);
    setCompletedPrayers(completed);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const handlePrayerComplete = async (
    prayerKey: keyof Omit<CompletedPrayer, "date">
  ) => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const today = getTodayDate();
    const isCompleted = completedPrayers?.[prayerKey] || false;
    await saveCompletedPrayer(today, prayerKey, !isCompleted);
    const updated = await getCompletedPrayers(today);
    setCompletedPrayers(updated);
  };

  const prayerKeys: (keyof Omit<CompletedPrayer, "date">)[] = [
    "fajr",
    "dhuhr",
    "asr",
    "maghrib",
    "isha",
  ];

  const completedCount = prayerKeys.filter(
    (key) => completedPrayers?.[key]
  ).length;

  const progressPercentage = (completedCount / 5) * 100;

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: tabBarHeight + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Animated.View
        entering={FadeInDown.delay(100).duration(500)}
        style={[
          styles.progressCard,
          { backgroundColor: theme.backgroundDefault },
        ]}
      >
        <View style={styles.progressHeader}>
          <ThemedText style={styles.progressTitle}>Today's Progress</ThemedText>
          <ThemedText
            style={[styles.progressPercent, { color: theme.primary }]}
          >
            {completedCount}/5
          </ThemedText>
        </View>
        <View
          style={[styles.progressBar, { backgroundColor: theme.backgroundTertiary }]}
        >
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.primary,
                width: `${progressPercentage}%`,
              },
            ]}
          />
        </View>
        <ThemedText
          style={[styles.progressSubtext, { color: theme.textSecondary }]}
        >
          {completedCount === 5
            ? "Masha'Allah! All prayers completed"
            : `${5 - completedCount} prayer${5 - completedCount !== 1 ? "s" : ""} remaining`}
        </ThemedText>
      </Animated.View>

      <ThemedText style={styles.sectionTitle}>Prayer Times</ThemedText>

      {prayerKeys.map((key, index) => {
        const prayer = prayers?.[key];
        const isCompleted = completedPrayers?.[key] || false;
        const isPast = prayer ? prayer.time < new Date() : false;

        return (
          <Animated.View
            key={key}
            entering={FadeInDown.delay(200 + index * 100).duration(500)}
          >
            <Pressable
              onPress={() => handlePrayerComplete(key)}
              style={[
                styles.prayerRow,
                {
                  backgroundColor: isCompleted
                    ? theme.primary + "15"
                    : theme.backgroundDefault,
                  borderColor: isCompleted ? theme.primary : theme.cardBorder,
                },
              ]}
            >
              <View style={styles.prayerLeft}>
                <View
                  style={[
                    styles.iconContainer,
                    {
                      backgroundColor: isCompleted
                        ? theme.primary
                        : theme.backgroundSecondary,
                    },
                  ]}
                >
                  <Feather
                    name={PRAYER_ICONS[key] as any}
                    size={20}
                    color={isCompleted ? "#FFFFFF" : theme.text}
                  />
                </View>
                <View>
                  <ThemedText style={styles.prayerName}>
                    {prayer?.name}
                  </ThemedText>
                  <ThemedText
                    style={[styles.prayerArabic, { color: theme.textSecondary }]}
                  >
                    {prayer?.arabicName}
                  </ThemedText>
                </View>
              </View>

              <View style={styles.prayerRight}>
                <ThemedText
                  style={[
                    styles.prayerTime,
                    { color: isCompleted ? theme.primary : theme.text },
                  ]}
                >
                  {prayer ? formatPrayerTime(prayer.time) : ""}
                </ThemedText>
                <View
                  style={[
                    styles.checkbox,
                    {
                      backgroundColor: isCompleted
                        ? theme.primary
                        : "transparent",
                      borderColor: isCompleted
                        ? theme.primary
                        : theme.textSecondary,
                    },
                  ]}
                >
                  {isCompleted ? (
                    <Feather name="check" size={14} color="#FFFFFF" />
                  ) : null}
                </View>
              </View>
            </Pressable>
          </Animated.View>
        );
      })}

      <Animated.View
        entering={FadeInDown.delay(700).duration(500)}
        style={[
          styles.qazaCard,
          { backgroundColor: AppColors.gold + "15", borderColor: AppColors.gold + "30" },
        ]}
      >
        <View style={styles.qazaHeader}>
          <Feather name="clock" size={20} color={AppColors.gold} />
          <ThemedText style={styles.qazaTitle}>Qaza Log</ThemedText>
        </View>
        <ThemedText style={[styles.qazaText, { color: theme.textSecondary }]}>
          Track your missed prayers here. Tap to add qaza prayers you need to
          make up.
        </ThemedText>
        <Pressable
          style={[styles.qazaButton, { backgroundColor: AppColors.gold }]}
        >
          <Feather name="plus" size={16} color="#FFFFFF" />
          <ThemedText style={styles.qazaButtonText}>Add Qaza</ThemedText>
        </Pressable>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    ...Shadows.sm,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  progressTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  progressPercent: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: Spacing.md,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressSubtext: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.lg,
  },
  prayerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    borderWidth: 1,
    ...Shadows.sm,
  },
  prayerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  prayerName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  prayerArabic: {
    fontSize: 14,
    marginTop: 2,
  },
  prayerRight: {
    alignItems: "flex-end",
    gap: Spacing.sm,
  },
  prayerTime: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  qazaCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginTop: Spacing.lg,
    borderWidth: 1,
  },
  qazaHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  qazaTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  qazaText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
    marginBottom: Spacing.lg,
  },
  qazaButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  qazaButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
});
