import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { getExerciseLog, saveExerciseLog, ExerciseLog, Exercise } from "@/lib/storage";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

const EXERCISE_PRESETS = [
  { id: "walking", name: "Walking", icon: "navigation", caloriesPerMin: 5 },
  { id: "running", name: "Running", icon: "zap", caloriesPerMin: 10 },
  { id: "cycling", name: "Cycling", icon: "repeat", caloriesPerMin: 8 },
  { id: "swimming", name: "Swimming", icon: "droplet", caloriesPerMin: 9 },
  { id: "yoga", name: "Yoga", icon: "heart", caloriesPerMin: 3 },
  { id: "weights", name: "Weights", icon: "activity", caloriesPerMin: 6 },
];

export default function ExerciseScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [exerciseLog, setExerciseLog] = useState<ExerciseLog>({
    date: getTodayDate(),
    exercises: [],
    totalCalories: 0,
    totalMinutes: 0,
    steps: 0,
  });
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [durationInput, setDurationInput] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customName, setCustomName] = useState("");
  const [customDuration, setCustomDuration] = useState("");

  const loadData = useCallback(async () => {
    const today = getTodayDate();
    const log = await getExerciseLog(today);
    if (log) {
      setExerciseLog(log);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateExerciseLog = async (exercises: Exercise[]) => {
    const totalCalories = exercises.reduce((sum, e) => sum + e.caloriesBurned, 0);
    const totalMinutes = exercises.reduce((sum, e) => sum + e.duration, 0);
    const updated = { ...exerciseLog, exercises, totalCalories, totalMinutes };
    setExerciseLog(updated);
    await saveExerciseLog(updated);
  };

  const handleAddExercise = async (presetId: string) => {
    const duration = parseInt(durationInput, 10);
    if (!duration || duration <= 0) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const preset = EXERCISE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;

    const exercise: Exercise = {
      id: Date.now().toString(),
      name: preset.name,
      duration,
      caloriesBurned: duration * preset.caloriesPerMin,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };

    await updateExerciseLog([...exerciseLog.exercises, exercise]);
    setDurationInput("");
    setSelectedExercise(null);
  };

  const handleAddCustomExercise = async () => {
    if (!customName.trim() || !customDuration) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const duration = parseInt(customDuration, 10);
    const exercise: Exercise = {
      id: Date.now().toString(),
      name: customName.trim(),
      duration,
      caloriesBurned: duration * 5,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };

    await updateExerciseLog([...exerciseLog.exercises, exercise]);
    setCustomName("");
    setCustomDuration("");
    setShowCustomInput(false);
  };

  const handleRemoveExercise = async (exerciseId: string) => {
    await Haptics.selectionAsync();
    const exercises = exerciseLog.exercises.filter((e) => e.id !== exerciseId);
    await updateExerciseLog(exercises);
  };

  const handleUpdateSteps = async (change: number) => {
    await Haptics.selectionAsync();
    const newSteps = Math.max(0, exerciseLog.steps + change);
    const updated = { ...exerciseLog, steps: newSteps };
    setExerciseLog(updated);
    await saveExerciseLog(updated);
  };

  const stepsProgress = (exerciseLog.steps / 10000) * 100;

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
        style={[styles.summaryCard, { backgroundColor: theme.primary }]}
      >
        <View style={styles.summaryRow}>
          <View style={styles.summaryItem}>
            <Feather name="clock" size={24} color="rgba(255,255,255,0.8)" />
            <ThemedText style={styles.summaryValue}>{exerciseLog.totalMinutes}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Minutes</ThemedText>
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: "rgba(255,255,255,0.2)" }]} />
          <View style={styles.summaryItem}>
            <Feather name="zap" size={24} color="rgba(255,255,255,0.8)" />
            <ThemedText style={styles.summaryValue}>{exerciseLog.totalCalories}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Calories</ThemedText>
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: "rgba(255,255,255,0.2)" }]} />
          <View style={styles.summaryItem}>
            <Feather name="activity" size={24} color="rgba(255,255,255,0.8)" />
            <ThemedText style={styles.summaryValue}>{exerciseLog.exercises.length}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Workouts</ThemedText>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Daily Steps</ThemedText>
        <View style={[styles.stepsCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.stepsControls}>
            <Pressable
              onPress={() => handleUpdateSteps(-500)}
              style={[styles.stepsBtn, { backgroundColor: theme.backgroundSecondary }]}
            >
              <Feather name="minus" size={20} color={theme.text} />
            </Pressable>
            <View style={styles.stepsDisplay}>
              <Feather name="navigation" size={28} color={AppColors.gold} />
              <ThemedText style={styles.stepsCount}>{exerciseLog.steps.toLocaleString()}</ThemedText>
              <ThemedText style={[styles.stepsGoal, { color: theme.textSecondary }]}>
                of 10,000 steps
              </ThemedText>
            </View>
            <Pressable
              onPress={() => handleUpdateSteps(500)}
              style={[styles.stepsBtn, { backgroundColor: theme.primary }]}
            >
              <Feather name="plus" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={[styles.stepsProgress, { backgroundColor: theme.backgroundSecondary }]}>
            <View
              style={[
                styles.stepsProgressFill,
                { width: `${Math.min(100, stepsProgress)}%`, backgroundColor: AppColors.gold },
              ]}
            />
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <View style={styles.sectionHeader}>
          <ThemedText style={styles.sectionTitle}>Add Exercise</ThemedText>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync();
              setShowCustomInput(!showCustomInput);
            }}
            style={[styles.customBtn, { backgroundColor: theme.backgroundDefault }]}
          >
            <Feather name="edit-2" size={16} color={theme.primary} />
            <ThemedText style={[styles.customBtnText, { color: theme.primary }]}>Custom</ThemedText>
          </Pressable>
        </View>

        {showCustomInput ? (
          <Animated.View
            entering={FadeInDown.duration(300)}
            style={[styles.customCard, { backgroundColor: theme.backgroundDefault }]}
          >
            <TextInput
              style={[styles.customInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
              value={customName}
              onChangeText={setCustomName}
              placeholder="Exercise name"
              placeholderTextColor={theme.textSecondary}
            />
            <View style={styles.customRow}>
              <TextInput
                style={[styles.durationInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                value={customDuration}
                onChangeText={setCustomDuration}
                placeholder="Minutes"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
              />
              <Pressable
                onPress={handleAddCustomExercise}
                style={[styles.addBtn, { backgroundColor: theme.primary }]}
              >
                <Feather name="plus" size={20} color="#FFFFFF" />
              </Pressable>
            </View>
          </Animated.View>
        ) : null}

        <View style={styles.presetsGrid}>
          {EXERCISE_PRESETS.map((preset, index) => {
            const isSelected = selectedExercise === preset.id;

            return (
              <Animated.View
                key={preset.id}
                entering={FadeInRight.delay(index * 50).duration(300)}
                style={styles.presetWrapper}
              >
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedExercise(isSelected ? null : preset.id);
                  }}
                  style={[
                    styles.presetCard,
                    { backgroundColor: theme.backgroundDefault },
                    isSelected && { borderColor: theme.primary, borderWidth: 2 },
                  ]}
                >
                  <View style={[styles.presetIcon, { backgroundColor: theme.primary + "15" }]}>
                    <Feather name={preset.icon as any} size={24} color={theme.primary} />
                  </View>
                  <ThemedText style={styles.presetName}>{preset.name}</ThemedText>
                  <ThemedText style={[styles.presetCal, { color: theme.textSecondary }]}>
                    ~{preset.caloriesPerMin} cal/min
                  </ThemedText>
                </Pressable>

                {isSelected ? (
                  <View style={[styles.durationRow, { backgroundColor: theme.backgroundDefault }]}>
                    <TextInput
                      style={[styles.durationInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                      value={durationInput}
                      onChangeText={setDurationInput}
                      placeholder="Min"
                      placeholderTextColor={theme.textSecondary}
                      keyboardType="numeric"
                      autoFocus
                    />
                    <Pressable
                      onPress={() => handleAddExercise(preset.id)}
                      style={[styles.addBtn, { backgroundColor: theme.primary }]}
                    >
                      <Feather name="check" size={18} color="#FFFFFF" />
                    </Pressable>
                  </View>
                ) : null}
              </Animated.View>
            );
          })}
        </View>
      </Animated.View>

      {exerciseLog.exercises.length > 0 ? (
        <Animated.View entering={FadeInDown.delay(400).duration(500)}>
          <ThemedText style={styles.sectionTitle}>Today's Workouts</ThemedText>
          <View style={[styles.workoutsList, { backgroundColor: theme.backgroundDefault }]}>
            {exerciseLog.exercises.map((exercise, index) => (
              <View
                key={exercise.id}
                style={[
                  styles.workoutItem,
                  index < exerciseLog.exercises.length - 1 && {
                    borderBottomWidth: 1,
                    borderBottomColor: theme.cardBorder,
                  },
                ]}
              >
                <View style={[styles.workoutIcon, { backgroundColor: theme.primary + "15" }]}>
                  <Feather name="activity" size={18} color={theme.primary} />
                </View>
                <View style={styles.workoutInfo}>
                  <ThemedText style={styles.workoutName}>{exercise.name}</ThemedText>
                  <ThemedText style={[styles.workoutMeta, { color: theme.textSecondary }]}>
                    {exercise.duration} min • {exercise.caloriesBurned} cal • {exercise.time}
                  </ThemedText>
                </View>
                <Pressable onPress={() => handleRemoveExercise(exercise.id)}>
                  <Feather name="x" size={18} color={theme.textSecondary} />
                </Pressable>
              </View>
            ))}
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
  summaryCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryItem: {
    alignItems: "center",
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
    marginTop: Spacing.sm,
  },
  summaryLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  summaryDivider: {
    width: 1,
    height: 50,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  customBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    ...Shadows.sm,
  },
  customBtnText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  customCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  customInput: {
    height: 44,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.sm,
  },
  customRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  stepsCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  stepsControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  stepsBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  stepsDisplay: {
    alignItems: "center",
  },
  stepsCount: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    marginTop: Spacing.sm,
  },
  stepsGoal: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  stepsProgress: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  stepsProgressFill: {
    height: "100%",
    borderRadius: 4,
  },
  presetsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  presetWrapper: {
    width: "47%",
  },
  presetCard: {
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: "center",
    ...Shadows.sm,
  },
  presetIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  presetName: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  presetCal: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },
  durationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
    borderRadius: BorderRadius.md,
  },
  durationInput: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  workoutsList: {
    borderRadius: BorderRadius.xl,
    overflow: "hidden",
    ...Shadows.sm,
  },
  workoutItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  workoutIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  workoutInfo: {
    flex: 1,
  },
  workoutName: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  workoutMeta: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: 2,
  },
});
