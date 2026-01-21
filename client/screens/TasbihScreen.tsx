import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Pressable, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { LinearGradient } from "expo-linear-gradient";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withSequence,
  withRepeat,
  withTiming,
  Easing,
  FadeIn,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import {
  getTasbihCount,
  saveTasbihCount,
  saveTasbihSession,
  getTasbihHistory,
  TasbihSession,
} from "@/lib/storage";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const PRESETS = [
  { id: "subhanallah", arabic: "سُبْحَانَ اللهِ", english: "SubhanAllah", count: 33 },
  { id: "alhamdulillah", arabic: "الْحَمْدُ لِلَّهِ", english: "Alhamdulillah", count: 33 },
  { id: "allahuakbar", arabic: "اللهُ أَكْبَرُ", english: "Allahu Akbar", count: 34 },
  { id: "custom", arabic: "مخصص", english: "Custom", count: 100 },
];

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export default function TasbihScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const tabBarHeight = useBottomTabBarHeight();
  const { theme, isDark } = useTheme();

  const [count, setCount] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [history, setHistory] = useState<TasbihSession[]>([]);

  const buttonScale = useSharedValue(1);
  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(0);
  const rotation = useSharedValue(0);

  useEffect(() => {
    loadData();
    rotation.value = withRepeat(
      withTiming(360, { duration: 60000, easing: Easing.linear }),
      -1,
      false
    );
  }, []);

  const loadData = async () => {
    const savedCount = await getTasbihCount();
    setCount(savedCount);
    const savedHistory = await getTasbihHistory();
    setHistory(savedHistory);
  };

  const handleTap = useCallback(async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    buttonScale.value = withSequence(
      withSpring(0.95, { damping: 10 }),
      withSpring(1, { damping: 10 })
    );

    rippleScale.value = 0;
    rippleOpacity.value = 0.5;
    rippleScale.value = withTiming(2, { duration: 400 });
    rippleOpacity.value = withTiming(0, { duration: 400 });

    const newCount = count + 1;
    setCount(newCount);
    await saveTasbihCount(newCount);

    if (newCount >= selectedPreset.count && selectedPreset.id !== "custom") {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      await saveTasbihSession({
        date: getTodayDate(),
        preset: selectedPreset.english,
        count: newCount,
      });
    }
  }, [count, selectedPreset]);

  const handleReset = async () => {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    if (count > 0) {
      await saveTasbihSession({
        date: getTodayDate(),
        preset: selectedPreset.english,
        count,
      });
    }
    setCount(0);
    await saveTasbihCount(0);
    const savedHistory = await getTasbihHistory();
    setHistory(savedHistory);
  };

  const handlePresetChange = async (preset: typeof PRESETS[0]) => {
    await Haptics.selectionAsync();
    if (count > 0) {
      await saveTasbihSession({
        date: getTodayDate(),
        preset: selectedPreset.english,
        count,
      });
    }
    setSelectedPreset(preset);
    setCount(0);
    await saveTasbihCount(0);
  };

  const buttonAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: buttonScale.value }],
  }));

  const rippleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
  }));

  const rotatingStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const progress =
    selectedPreset.id === "custom"
      ? 0
      : Math.min((count / selectedPreset.count) * 100, 100);

  return (
    <LinearGradient
      colors={
        isDark
          ? ["#0F1419", "#1A1F26", "#0F1419"]
          : [AppColors.background, "#E8F5E9", AppColors.background]
      }
      style={styles.container}
    >
      <Animated.View
        style={[styles.mandalaContainer, rotatingStyle]}
        pointerEvents="none"
      >
        <View
          style={[
            styles.mandala,
            { borderColor: theme.primary + "10" },
          ]}
        />
        <View
          style={[
            styles.mandala,
            styles.mandala2,
            { borderColor: theme.primary + "08" },
          ]}
        />
        <View
          style={[
            styles.mandala,
            styles.mandala3,
            { borderColor: theme.primary + "05" },
          ]}
        />
      </Animated.View>

      <View
        style={[
          styles.content,
          {
            paddingTop: headerHeight + Spacing.xl,
            paddingBottom: tabBarHeight + Spacing.xl,
          },
        ]}
      >
        <Animated.View entering={FadeIn.duration(500)} style={styles.presetRow}>
          {PRESETS.slice(0, 3).map((preset) => (
            <Pressable
              key={preset.id}
              onPress={() => handlePresetChange(preset)}
              style={[
                styles.presetButton,
                {
                  backgroundColor:
                    selectedPreset.id === preset.id
                      ? theme.primary
                      : theme.backgroundDefault,
                  borderColor:
                    selectedPreset.id === preset.id
                      ? theme.primary
                      : theme.cardBorder,
                },
              ]}
            >
              <ThemedText
                style={[
                  styles.presetArabic,
                  {
                    color:
                      selectedPreset.id === preset.id ? "#FFFFFF" : theme.text,
                  },
                ]}
              >
                {preset.arabic}
              </ThemedText>
              <ThemedText
                style={[
                  styles.presetEnglish,
                  {
                    color:
                      selectedPreset.id === preset.id
                        ? "rgba(255,255,255,0.8)"
                        : theme.textSecondary,
                  },
                ]}
              >
                {preset.english}
              </ThemedText>
            </Pressable>
          ))}
        </Animated.View>

        <View style={styles.counterSection}>
          <ThemedText style={styles.arabicDisplay}>
            {selectedPreset.arabic}
          </ThemedText>

          <View style={styles.countContainer}>
            <ThemedText style={[styles.countText, { color: theme.primary }]}>
              {count}
            </ThemedText>
            {selectedPreset.id !== "custom" ? (
              <ThemedText
                style={[styles.targetText, { color: theme.textSecondary }]}
              >
                / {selectedPreset.count}
              </ThemedText>
            ) : null}
          </View>

          {selectedPreset.id !== "custom" ? (
            <View
              style={[
                styles.progressContainer,
                { backgroundColor: theme.backgroundSecondary },
              ]}
            >
              <View
                style={[
                  styles.progressFill,
                  { backgroundColor: theme.primary, width: `${progress}%` },
                ]}
              />
            </View>
          ) : null}
        </View>

        <View style={styles.buttonSection}>
          <Pressable onPress={handleTap} style={styles.tapButtonWrapper}>
            <Animated.View style={[styles.ripple, rippleAnimatedStyle]}>
              <View
                style={[
                  styles.rippleInner,
                  { backgroundColor: theme.primary },
                ]}
              />
            </Animated.View>
            <Animated.View
              style={[
                styles.tapButton,
                { backgroundColor: theme.primary },
                buttonAnimatedStyle,
              ]}
            >
              <ThemedText style={styles.tapButtonText}>TAP</ThemedText>
            </Animated.View>
          </Pressable>

          <Pressable
            onPress={handleReset}
            style={[
              styles.resetButton,
              { backgroundColor: theme.backgroundDefault },
            ]}
          >
            <Feather name="refresh-ccw" size={20} color={theme.text} />
            <ThemedText style={styles.resetText}>Reset</ThemedText>
          </Pressable>
        </View>

        {history.length > 0 ? (
          <View
            style={[
              styles.historyCard,
              { backgroundColor: theme.backgroundDefault + "80" },
            ]}
          >
            <ThemedText style={styles.historyTitle}>Recent Sessions</ThemedText>
            <View style={styles.historyList}>
              {history.slice(-3).reverse().map((session, index) => (
                <View key={index} style={styles.historyItem}>
                  <ThemedText
                    style={[styles.historyPreset, { color: theme.textSecondary }]}
                  >
                    {session.preset}
                  </ThemedText>
                  <ThemedText style={styles.historyCount}>
                    {session.count}
                  </ThemedText>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mandalaContainer: {
    position: "absolute",
    width: SCREEN_WIDTH * 1.5,
    height: SCREEN_WIDTH * 1.5,
    top: "50%",
    left: "50%",
    marginTop: -SCREEN_WIDTH * 0.75,
    marginLeft: -SCREEN_WIDTH * 0.75,
    alignItems: "center",
    justifyContent: "center",
  },
  mandala: {
    position: "absolute",
    width: SCREEN_WIDTH,
    height: SCREEN_WIDTH,
    borderRadius: SCREEN_WIDTH / 2,
    borderWidth: 1,
  },
  mandala2: {
    width: SCREEN_WIDTH * 1.2,
    height: SCREEN_WIDTH * 1.2,
    borderRadius: SCREEN_WIDTH * 0.6,
  },
  mandala3: {
    width: SCREEN_WIDTH * 1.4,
    height: SCREEN_WIDTH * 1.4,
    borderRadius: SCREEN_WIDTH * 0.7,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  presetRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing["3xl"],
  },
  presetButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    borderWidth: 1,
  },
  presetArabic: {
    fontSize: 14,
    marginBottom: 2,
  },
  presetEnglish: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
  },
  counterSection: {
    alignItems: "center",
    marginBottom: Spacing["4xl"],
  },
  arabicDisplay: {
    fontSize: 36,
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  countContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: Spacing.lg,
  },
  countText: {
    fontSize: 80,
    fontFamily: "Poppins_700Bold",
  },
  targetText: {
    fontSize: 24,
    fontFamily: "Poppins_400Regular",
    marginLeft: Spacing.sm,
  },
  progressContainer: {
    width: "60%",
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  buttonSection: {
    alignItems: "center",
    gap: Spacing.xl,
  },
  tapButtonWrapper: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  ripple: {
    position: "absolute",
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  rippleInner: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
  },
  tapButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.lg,
  },
  tapButtonText: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
    letterSpacing: 2,
  },
  resetButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: BorderRadius.full,
  },
  resetText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  historyCard: {
    marginTop: Spacing["3xl"],
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
  },
  historyTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  historyList: {
    gap: Spacing.sm,
  },
  historyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  historyPreset: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  historyCount: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
  },
});
