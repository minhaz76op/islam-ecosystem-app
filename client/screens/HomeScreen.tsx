import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  RefreshControl,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withRepeat,
  withSequence,
  FadeInDown,
  FadeInRight,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import {
  calculatePrayerTimes,
  getNextPrayer,
  formatPrayerTime,
  getTimeUntilPrayer,
  DailyPrayers,
} from "@/lib/prayer-times";
import { getDuaForTimeOfDay, Dua } from "@/lib/duas";
import {
  getUserProfile,
  getCompletedPrayers,
  saveCompletedPrayer,
  getSunnahHabits,
  saveSunnahHabit,
  CompletedPrayer,
  SunnahHabit,
} from "@/lib/storage";

const SUNNAH_HABITS = [
  {
    id: "water",
    name: "Drink Water",
    icon: require("../../assets/images/sunnah/water.png"),
  },
  {
    id: "miswak",
    name: "Use Miswak",
    icon: require("../../assets/images/sunnah/miswak.png"),
  },
  {
    id: "smile",
    name: "Smile",
    icon: require("../../assets/images/sunnah/smile.png"),
  },
  {
    id: "charity",
    name: "Give Charity",
    icon: require("../../assets/images/sunnah/charity.png"),
  },
];

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good Morning";
  if (hour < 17) return "Good Afternoon";
  return "Good Evening";
}

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();

  const [userName, setUserName] = useState("Guest");
  const [prayers, setPrayers] = useState<DailyPrayers | null>(null);
  const [completedPrayers, setCompletedPrayers] =
    useState<CompletedPrayer | null>(null);
  const [sunnahHabits, setSunnahHabits] = useState<SunnahHabit[]>([]);
  const [currentDua, setCurrentDua] = useState<Dua | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [timeUntil, setTimeUntil] = useState("");

  const pulseScale = useSharedValue(1);

  const loadData = useCallback(async () => {
    const today = getTodayDate();
    const profile = await getUserProfile();
    if (profile?.name) {
      setUserName(profile.name);
    }

    const prayerTimes = calculatePrayerTimes();
    setPrayers(prayerTimes);

    const nextPrayer = getNextPrayer(prayerTimes);
    if (nextPrayer) {
      setTimeUntil(getTimeUntilPrayer(nextPrayer.time));
    }

    const completed = await getCompletedPrayers(today);
    setCompletedPrayers(completed);

    const habits = await getSunnahHabits(today);
    setSunnahHabits(habits);

    setCurrentDua(getDuaForTimeOfDay());
  }, []);

  useEffect(() => {
    loadData();

    pulseScale.value = withRepeat(
      withSequence(
        withSpring(1.05, { damping: 10 }),
        withSpring(1, { damping: 10 })
      ),
      -1,
      true
    );

    const interval = setInterval(() => {
      if (prayers) {
        const nextPrayer = getNextPrayer(prayers);
        if (nextPrayer) {
          setTimeUntil(getTimeUntilPrayer(nextPrayer.time));
        }
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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

  const handleSunnahHabit = async (habitId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const today = getTodayDate();
    const existing = sunnahHabits.find((h) => h.id === habitId);
    const habit: SunnahHabit = {
      id: habitId,
      name: SUNNAH_HABITS.find((h) => h.id === habitId)?.name || "",
      completed: !existing?.completed,
      date: today,
    };
    await saveSunnahHabit(habit);
    const updated = await getSunnahHabits(today);
    setSunnahHabits(updated);
  };

  const pulseStyle = useAnimatedStyle(() => ({
    transform: [{ scale: pulseScale.value }],
  }));

  const nextPrayer = prayers ? getNextPrayer(prayers) : null;

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

  return (
    <LinearGradient
      colors={
        isDark
          ? ["#0F1419", "#1A1F26", "#0F1419"]
          : [AppColors.background, "#E8F5E9", AppColors.background]
      }
      style={styles.container}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: insets.top + Spacing["2xl"],
          paddingBottom: tabBarHeight + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <View style={styles.profileRow}>
            <View
              style={[
                styles.avatarContainer,
                { backgroundColor: theme.primary },
              ]}
            >
              <Feather name="user" size={20} color="#FFFFFF" />
            </View>
            <View style={styles.headerButtons}>
              <Pressable 
                onPress={() => navigation.navigate("Calendar")}
                style={styles.headerBtn}
              >
                <Feather name="calendar" size={22} color={theme.textSecondary} />
              </Pressable>
              <Pressable style={styles.notificationBtn}>
                <Feather name="bell" size={22} color={theme.textSecondary} />
              </Pressable>
            </View>
          </View>

          <ThemedText style={styles.greeting}>
            As-salamu alaykum, {userName}
          </ThemedText>
          <ThemedText
            style={[styles.subGreeting, { color: theme.textSecondary }]}
          >
            {getGreeting()}. I hope this finds you in the best of Iman and
            health, In shaa Allah.
          </ThemedText>
        </Animated.View>

        <Animated.View entering={FadeInRight.delay(200).duration(600)}>
          <ThemedText style={styles.sectionTitle}>Sunnah Habits</ThemedText>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.sunnahScroll}
            contentContainerStyle={styles.sunnahContent}
          >
            {SUNNAH_HABITS.map((habit) => {
              const isCompleted = sunnahHabits.find(
                (h) => h.id === habit.id
              )?.completed;
              return (
                <Pressable
                  key={habit.id}
                  onPress={() => handleSunnahHabit(habit.id)}
                  style={[
                    styles.sunnahCard,
                    {
                      backgroundColor: isCompleted
                        ? theme.primary
                        : theme.backgroundDefault,
                      borderColor: isCompleted
                        ? theme.primary
                        : theme.cardBorder,
                    },
                  ]}
                >
                  <Image source={habit.icon} style={styles.sunnahIcon} />
                  <ThemedText
                    style={[
                      styles.sunnahName,
                      { color: isCompleted ? "#FFFFFF" : theme.text },
                    ]}
                  >
                    {habit.name}
                  </ThemedText>
                  {isCompleted ? (
                    <View style={styles.checkBadge}>
                      <Feather name="check" size={12} color="#FFFFFF" />
                    </View>
                  ) : null}
                </Pressable>
              );
            })}
          </ScrollView>
        </Animated.View>

        {nextPrayer ? (
          <Animated.View entering={FadeInDown.delay(300).duration(600)}>
            <Pressable
              onPress={() => navigation.navigate("DailySalah")}
              style={[
                styles.nextPrayerCard,
                { backgroundColor: theme.primary },
              ]}
            >
              <Animated.View style={[styles.prayerGlow, pulseStyle]}>
                <LinearGradient
                  colors={["rgba(255,255,255,0.2)", "transparent"]}
                  style={styles.glowGradient}
                />
              </Animated.View>
              <View style={styles.prayerCardContent}>
                <View>
                  <ThemedText style={styles.nextPrayerLabel}>
                    Next Prayer
                  </ThemedText>
                  <ThemedText style={styles.nextPrayerName}>
                    {nextPrayer.name}
                  </ThemedText>
                  <ThemedText style={styles.nextPrayerArabic}>
                    {nextPrayer.arabicName}
                  </ThemedText>
                </View>
                <View style={styles.prayerTimeContainer}>
                  <ThemedText style={styles.prayerTime}>
                    {formatPrayerTime(nextPrayer.time)}
                  </ThemedText>
                  <ThemedText style={styles.timeUntil}>
                    in {timeUntil}
                  </ThemedText>
                </View>
              </View>
            </Pressable>
          </Animated.View>
        ) : null}

        {currentDua ? (
          <Animated.View entering={FadeInDown.delay(400).duration(600)}>
            <View
              style={[
                styles.duaCard,
                {
                  backgroundColor: theme.backgroundDefault,
                  borderColor: theme.cardBorder,
                },
              ]}
            >
              <View style={styles.duaHeader}>
                <View
                  style={[styles.duaIconBg, { backgroundColor: AppColors.gold + "20" }]}
                >
                  <Feather name="book-open" size={18} color={AppColors.gold} />
                </View>
                <ThemedText style={styles.duaTitle}>
                  {currentDua.title}
                </ThemedText>
              </View>
              <ThemedText style={styles.duaArabic}>
                {currentDua.arabic}
              </ThemedText>
              <ThemedText
                style={[
                  styles.duaTransliteration,
                  { color: theme.textSecondary },
                ]}
              >
                {currentDua.transliteration}
              </ThemedText>
              <ThemedText style={styles.duaTranslation}>
                "{currentDua.translation}"
              </ThemedText>
            </View>
          </Animated.View>
        ) : null}

        <Animated.View entering={FadeInDown.delay(500).duration(600)}>
          <View style={styles.salahTrackerHeader}>
            <ThemedText style={styles.sectionTitle}>Daily Salah</ThemedText>
            <ThemedText
              style={[styles.salahCount, { color: theme.textSecondary }]}
            >
              {completedCount}/5 completed
            </ThemedText>
          </View>

          <View style={styles.salahGrid}>
            {prayerKeys.map((key) => {
              const prayer = prayers?.[key];
              const isCompleted = completedPrayers?.[key] || false;

              return (
                <Pressable
                  key={key}
                  onPress={() => handlePrayerComplete(key)}
                  style={[
                    styles.salahCard,
                    {
                      backgroundColor: isCompleted
                        ? theme.primary
                        : theme.backgroundDefault,
                      borderColor: isCompleted
                        ? theme.primary
                        : theme.cardBorder,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.salahRing,
                      {
                        borderColor: isCompleted ? "#FFFFFF" : theme.primary,
                        backgroundColor: isCompleted
                          ? "rgba(255,255,255,0.2)"
                          : "transparent",
                      },
                    ]}
                  >
                    {isCompleted ? (
                      <Feather name="check" size={16} color="#FFFFFF" />
                    ) : (
                      <ThemedText
                        style={[
                          styles.salahTime,
                          { color: theme.primary },
                        ]}
                      >
                        {prayer ? formatPrayerTime(prayer.time).split(" ")[0] : ""}
                      </ThemedText>
                    )}
                  </View>
                  <ThemedText
                    style={[
                      styles.salahName,
                      { color: isCompleted ? "#FFFFFF" : theme.text },
                    ]}
                  >
                    {prayer?.name}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    marginBottom: Spacing["2xl"],
  },
  profileRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  avatarContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  headerButtons: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  headerBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBtn: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  greeting: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  subGreeting: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  sunnahScroll: {
    marginHorizontal: -Spacing.lg,
    marginBottom: Spacing["2xl"],
  },
  sunnahContent: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  sunnahCard: {
    width: 100,
    height: 120,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    position: "relative",
    ...Shadows.md,
  },
  sunnahIcon: {
    width: 48,
    height: 48,
    marginBottom: Spacing.sm,
  },
  sunnahName: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
  },
  checkBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  nextPrayerCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    overflow: "hidden",
    ...Shadows.lg,
  },
  prayerGlow: {
    position: "absolute",
    top: -50,
    right: -50,
    width: 150,
    height: 150,
    borderRadius: 75,
    opacity: 0.5,
  },
  glowGradient: {
    flex: 1,
    borderRadius: 75,
  },
  prayerCardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  nextPrayerLabel: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    color: "rgba(255,255,255,0.7)",
    marginBottom: Spacing.xs,
  },
  nextPrayerName: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  nextPrayerArabic: {
    fontSize: 18,
    color: "rgba(255,255,255,0.8)",
    marginTop: Spacing.xs,
  },
  prayerTimeContainer: {
    alignItems: "flex-end",
  },
  prayerTime: {
    fontSize: 24,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  timeUntil: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.7)",
    marginTop: Spacing.xs,
  },
  duaCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    borderWidth: 1,
    ...Shadows.sm,
  },
  duaHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  duaIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  duaTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  duaArabic: {
    fontSize: 26,
    lineHeight: 44,
    textAlign: "right",
    marginBottom: Spacing.md,
  },
  duaTransliteration: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    fontStyle: "italic",
    marginBottom: Spacing.sm,
  },
  duaTranslation: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  salahTrackerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  salahCount: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  salahGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  salahCard: {
    width: "30%",
    aspectRatio: 1,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    ...Shadows.sm,
  },
  salahRing: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  salahTime: {
    fontSize: 10,
    fontFamily: "Poppins_600SemiBold",
  },
  salahName: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
  },
});
