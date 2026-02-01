import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  RefreshControl,
  ImageBackground,
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
import { useAuth } from "@/contexts/AuthContext";
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
  getUserLevel,
  addXP,
  getDailyTasks,
  getDietLog,
  getExerciseLog,
  CompletedPrayer,
  SunnahHabit,
  UserLevel,
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

import { ImageModal } from "@/components/ImageModal";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight();
  const navigation = useNavigation<any>();
  const { theme, isDark } = useTheme();
  const { user } = useAuth();

  const [userName, setUserName] = useState("Guest");
  const [userAvatar, setUserAvatar] = useState<string | null>(null);
  const [isImageModalVisible, setIsImageModalVisible] = useState(false);
  const [prayers, setPrayers] = useState<DailyPrayers | null>(null);
  const [completedPrayers, setCompletedPrayers] =
    useState<CompletedPrayer | null>(null);
  const [sunnahHabits, setSunnahHabits] = useState<SunnahHabit[]>([]);
  const [currentDua, setCurrentDua] = useState<Dua | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [timeUntil, setTimeUntil] = useState("");
  const [userLevel, setUserLevel] = useState<UserLevel>({ level: 1, xp: 0, totalXp: 0 });
  const [activityStats, setActivityStats] = useState({ tasks: 0, prayers: 0, water: 0, exercise: 0 });

  const pulseScale = useSharedValue(1);

  const loadData = useCallback(async () => {
    const today = getTodayDate();
    
    // Show username when signed in, "Guest" when not signed in
    if (user) {
      setUserName(user.displayName || user.username || "User");
      if (user.avatarUrl) {
        setUserAvatar(user.avatarUrl);
      } else {
        setUserAvatar(null);
      }
    } else {
      // Not signed in - always show Guest
      setUserName("Guest");
      setUserAvatar(null);
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

    const level = await getUserLevel();
    setUserLevel(level);

    const tasks = await getDailyTasks(today);
    const completedTasks = tasks.filter((t) => t.completed).length;
    const diet = await getDietLog(today);
    const exercise = await getExerciseLog(today);
    setActivityStats({
      tasks: completedTasks,
      prayers: Object.values(completed || {}).filter(Boolean).length,
      water: diet?.waterGlasses || 0,
      exercise: exercise?.totalMinutes || 0,
    });
  }, [user]);

  useEffect(() => {
    loadData();
  }, [user, loadData]);

  useEffect(() => {
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
          paddingBottom: tabBarHeight + Spacing["4xl"] + 100, // Added extra space for floating button
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Animated.View
          entering={FadeInDown.delay(100).duration(600)}
          style={styles.header}
        >
          <View style={styles.profileRow}>
            <Pressable
              onPress={() => {
                if (userAvatar) {
                  setIsImageModalVisible(true);
                } else {
                  navigation.navigate("SettingsTab", { screen: "EditProfile" });
                }
              }}
              style={[
                styles.avatarContainer,
                { backgroundColor: theme.primary },
              ]}
            >
              {userAvatar ? (
                <Image source={{ uri: userAvatar }} style={styles.avatarImage} />
              ) : (
                <Feather name="user" size={20} color="#FFFFFF" />
              )}
            </Pressable>
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

        <Animated.View entering={FadeInDown.delay(150).duration(600)}>
          <View style={[styles.levelCard, { backgroundColor: theme.primary }]}>
            <View style={styles.levelHeader}>
              <View style={styles.levelBadge}>
                <ThemedText type="number" style={styles.levelNumber}>{userLevel.level}</ThemedText>
              </View>
              <View style={styles.levelInfo}>
                <ThemedText style={styles.levelTitle}>Level {userLevel.level}</ThemedText>
                <ThemedText style={styles.levelSubtitle}>{userLevel.xp}/100 XP to next level</ThemedText>
              </View>
              <View style={styles.xpBadge}>
                <Feather name="star" size={14} color={AppColors.gold} />
                <ThemedText type="number" style={styles.xpText}>{userLevel.totalXp}</ThemedText>
              </View>
            </View>
            <View style={styles.levelProgressBar}>
              <View style={[styles.levelProgressFill, { width: `${userLevel.xp}%` }]} />
            </View>
          </View>

          <View style={styles.activityRow}>
            <View style={[styles.activityCard, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="check-square" size={18} color={AppColors.accent} />
              <ThemedText type="number" style={styles.activityValue}>{activityStats.tasks}</ThemedText>
              <ThemedText style={[styles.activityLabel, { color: theme.textSecondary }]}>Tasks</ThemedText>
            </View>
            <View style={[styles.activityCard, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="sun" size={18} color={theme.primary} />
              <ThemedText type="number" style={styles.activityValue}>{activityStats.prayers}/5</ThemedText>
              <ThemedText style={[styles.activityLabel, { color: theme.textSecondary }]}>Prayers</ThemedText>
            </View>
            <View style={[styles.activityCard, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="droplet" size={18} color={AppColors.accent} />
              <ThemedText type="number" style={styles.activityValue}>{activityStats.water}</ThemedText>
              <ThemedText style={[styles.activityLabel, { color: theme.textSecondary }]}>Water</ThemedText>
            </View>
            <View style={[styles.activityCard, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="activity" size={18} color={AppColors.gold} />
              <ThemedText type="number" style={styles.activityValue}>{activityStats.exercise}m</ThemedText>
              <ThemedText style={[styles.activityLabel, { color: theme.textSecondary }]}>Active</ThemedText>
            </View>
          </View>

          <View style={styles.dashboardGrid}>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                navigation.navigate("DailyTask");
              }}
              style={[styles.dashboardCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View style={[styles.dashboardIcon, { backgroundColor: AppColors.accent + "20" }]}>
                <Feather name="check-square" size={24} color={AppColors.accent} />
              </View>
              <ThemedText style={styles.dashboardTitle}>Daily Tasks</ThemedText>
              <ThemedText style={[styles.dashboardSubtitle, { color: theme.textSecondary }]}>
                Organize your day
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                navigation.navigate("Health");
              }}
              style={[styles.dashboardCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View style={[styles.dashboardIcon, { backgroundColor: "#10B981" + "20" }]}>
                <Feather name="heart" size={24} color="#10B981" />
              </View>
              <ThemedText style={styles.dashboardTitle}>Health</ThemedText>
              <ThemedText style={[styles.dashboardSubtitle, { color: theme.textSecondary }]}>
                Diet & Exercise
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                navigation.navigate("DailySalah");
              }}
              style={[styles.dashboardCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View style={[styles.dashboardIcon, { backgroundColor: theme.primary + "20" }]}>
                <Feather name="sun" size={24} color={theme.primary} />
              </View>
              <ThemedText style={styles.dashboardTitle}>Daily Salah</ThemedText>
              <ThemedText style={[styles.dashboardSubtitle, { color: theme.textSecondary }]}>
                Prayer times
              </ThemedText>
            </Pressable>

            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                navigation.navigate("Calendar");
              }}
              style={[styles.dashboardCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View style={[styles.dashboardIcon, { backgroundColor: AppColors.gold + "20" }]}>
                <Feather name="calendar" size={24} color={AppColors.gold} />
              </View>
              <ThemedText style={styles.dashboardTitle}>Calendar</ThemedText>
              <ThemedText style={[styles.dashboardSubtitle, { color: theme.textSecondary }]}>
                Islamic dates
              </ThemedText>
            </Pressable>
          </View>
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

      <ImageModal
        visible={isImageModalVisible}
        imageUrl={userAvatar}
        onClose={() => setIsImageModalVisible(false)}
      />
      
      {/* Floating IslamicGPT Chat Button */}
      <Pressable
        style={[styles.fabContainer, { bottom: tabBarHeight + Spacing.lg }]}
        onPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          navigation.getParent()?.navigate("IslamicGPT");
        }}
      >
        <LinearGradient
          colors={[theme.primary, theme.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <Feather name="message-circle" size={24} color="#FFFFFF" />
        </LinearGradient>
        <View style={[styles.fabLabel, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText style={[styles.fabLabelText, { color: theme.text }]}>IslamicGPT</ThemedText>
        </View>
      </Pressable>
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
    overflow: "hidden",
  },
  avatarImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  dashboardGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  dashboardCard: {
    width: "47%",
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  dashboardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  dashboardTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: 2,
  },
  dashboardSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  levelCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  levelHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  levelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  levelNumber: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  levelInfo: {
    flex: 1,
  },
  levelTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  levelSubtitle: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  xpText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  levelProgressBar: {
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  levelProgressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
  activityRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  activityCard: {
    flex: 1,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    ...Shadows.sm,
  },
  activityValue: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    marginTop: 4,
  },
  activityLabel: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
  },
  fabContainer: {
    position: "absolute",
    right: Spacing.lg,
    alignItems: "center",
    zIndex: 100,
  },
  fabGradient: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.lg,
  },
  fabLabel: {
    marginTop: 6,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.sm,
    ...Shadows.sm,
  },
  fabLabelText: {
    fontSize: 9,
    fontFamily: "Poppins_600SemiBold",
  },
});
