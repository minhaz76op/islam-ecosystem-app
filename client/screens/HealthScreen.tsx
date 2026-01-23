import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable, TextInput, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeInRight } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import {
  getDietLog,
  saveDietLog,
  getExerciseLog,
  saveExerciseLog,
  getHealthProfile,
  saveHealthProfile,
  DietLog,
  ExerciseLog,
  Exercise,
  HealthProfile,
} from "@/lib/storage";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;
const WATER_GOAL = 8;

const EXERCISE_PRESETS = [
  { id: "walking", name: "Walking", icon: "navigation", caloriesPerMin: 5 },
  { id: "running", name: "Running", icon: "zap", caloriesPerMin: 10 },
  { id: "cycling", name: "Cycling", icon: "repeat", caloriesPerMin: 8 },
  { id: "yoga", name: "Yoga", icon: "heart", caloriesPerMin: 3 },
  { id: "weights", name: "Weights", icon: "activity", caloriesPerMin: 6 },
  { id: "swimming", name: "Swimming", icon: "droplet", caloriesPerMin: 9 },
];

function calculateBMI(weightKg: number, heightCm: number): number {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

function getBMICategory(bmi: number): { label: string; color: string } {
  if (bmi < 18.5) return { label: "Underweight", color: "#F59E0B" };
  if (bmi < 25) return { label: "Normal", color: "#10B981" };
  if (bmi < 30) return { label: "Overweight", color: "#F59E0B" };
  return { label: "Obese", color: "#EF4444" };
}

function getHealthSuggestions(profile: HealthProfile | null, dietLog: DietLog, exerciseLog: ExerciseLog): string[] {
  const suggestions: string[] = [];
  
  if (profile?.weight && profile?.height) {
    const bmi = calculateBMI(profile.weight, profile.height);
    if (bmi < 18.5) {
      suggestions.push("Consider increasing caloric intake with nutrient-rich foods");
      suggestions.push("Focus on strength training exercises");
    } else if (bmi >= 25) {
      suggestions.push("Try to maintain a caloric deficit through balanced meals");
      suggestions.push("Aim for 30+ minutes of cardio daily");
    }
  }
  
  if (dietLog.waterGlasses < 4) {
    suggestions.push("Drink more water - aim for 8 glasses daily");
  }
  
  if (exerciseLog.totalMinutes < 30) {
    suggestions.push("Try to exercise for at least 30 minutes today");
  }
  
  if (exerciseLog.steps < 5000) {
    suggestions.push("Take a walk to reach 10,000 steps daily");
  }
  
  if (dietLog.meals.length < 3) {
    suggestions.push("Remember to eat regular balanced meals");
  }
  
  if (suggestions.length === 0) {
    suggestions.push("Great job maintaining your health today!");
  }
  
  return suggestions;
}

type TabType = "overview" | "diet" | "exercise";

export default function HealthScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [healthProfile, setHealthProfile] = useState<HealthProfile | null>(null);
  const [dietLog, setDietLog] = useState<DietLog>({
    date: getTodayDate(),
    meals: [],
    waterGlasses: 0,
    notes: "",
  });
  const [exerciseLog, setExerciseLog] = useState<ExerciseLog>({
    date: getTodayDate(),
    exercises: [],
    totalCalories: 0,
    totalMinutes: 0,
    steps: 0,
  });

  const [showProfileModal, setShowProfileModal] = useState(false);
  const [heightInput, setHeightInput] = useState("");
  const [weightInput, setWeightInput] = useState("");
  const [showMealInput, setShowMealInput] = useState<string | null>(null);
  const [mealInput, setMealInput] = useState("");
  const [calorieInput, setCalorieInput] = useState("");
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null);
  const [durationInput, setDurationInput] = useState("");

  const loadData = useCallback(async () => {
    const today = getTodayDate();
    const profile = await getHealthProfile();
    if (profile) {
      setHealthProfile(profile);
      setHeightInput(profile.height?.toString() || "");
      setWeightInput(profile.weight?.toString() || "");
    }
    
    const diet = await getDietLog(today);
    if (diet) setDietLog(diet);
    
    const exercise = await getExerciseLog(today);
    if (exercise) setExerciseLog(exercise);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const saveProfile = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const profile: HealthProfile = {
      height: parseFloat(heightInput) || undefined,
      weight: parseFloat(weightInput) || undefined,
      updatedAt: Date.now(),
    };
    await saveHealthProfile(profile);
    setHealthProfile(profile);
    setShowProfileModal(false);
  };

  const updateDietLog = async (updates: Partial<DietLog>) => {
    const updated = { ...dietLog, ...updates };
    setDietLog(updated);
    await saveDietLog(updated);
  };

  const updateExerciseLog = async (exercises: Exercise[]) => {
    const totalCalories = exercises.reduce((sum, e) => sum + e.caloriesBurned, 0);
    const totalMinutes = exercises.reduce((sum, e) => sum + e.duration, 0);
    const updated = { ...exerciseLog, exercises, totalCalories, totalMinutes };
    setExerciseLog(updated);
    await saveExerciseLog(updated);
  };

  const handleWaterChange = async (change: number) => {
    await Haptics.selectionAsync();
    const newValue = Math.max(0, Math.min(20, dietLog.waterGlasses + change));
    await updateDietLog({ waterGlasses: newValue });
  };

  const handleAddMeal = async (type: string) => {
    if (!mealInput.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newMeal = {
      id: Date.now().toString(),
      type,
      name: mealInput.trim(),
      calories: calorieInput ? parseInt(calorieInput, 10) : undefined,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };
    await updateDietLog({ meals: [...dietLog.meals, newMeal] });
    setMealInput("");
    setCalorieInput("");
    setShowMealInput(null);
  };

  const handleStepsChange = async (change: number) => {
    await Haptics.selectionAsync();
    const newSteps = Math.max(0, exerciseLog.steps + change);
    const updated = { ...exerciseLog, steps: newSteps };
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

  const bmi = healthProfile?.weight && healthProfile?.height 
    ? calculateBMI(healthProfile.weight, healthProfile.height) 
    : null;
  const bmiCategory = bmi ? getBMICategory(bmi) : null;
  const suggestions = getHealthSuggestions(healthProfile, dietLog, exerciseLog);
  const totalCalories = dietLog.meals.reduce((sum, m) => sum + (m.calories || 0), 0);
  const waterProgress = (dietLog.waterGlasses / WATER_GOAL) * 100;
  const stepsProgress = (exerciseLog.steps / 10000) * 100;

  const renderTabs = () => (
    <View style={[styles.tabBar, { backgroundColor: theme.backgroundSecondary }]}>
      {(["overview", "diet", "exercise"] as TabType[]).map((tab) => (
        <Pressable
          key={tab}
          onPress={() => {
            Haptics.selectionAsync();
            setActiveTab(tab);
          }}
          style={[
            styles.tab,
            activeTab === tab && { backgroundColor: theme.primary },
          ]}
        >
          <ThemedText
            style={[
              styles.tabText,
              { color: activeTab === tab ? "#FFFFFF" : theme.textSecondary },
            ]}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </ThemedText>
        </Pressable>
      ))}
    </View>
  );

  const renderOverview = () => (
    <>
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <Pressable
          onPress={() => setShowProfileModal(true)}
          style={[styles.profileCard, { backgroundColor: theme.primary }]}
        >
          <View style={styles.profileHeader}>
            <View>
              <ThemedText style={styles.profileTitle}>Health Profile</ThemedText>
              <ThemedText style={styles.profileSubtitle}>
                {healthProfile?.height ? `${healthProfile.height} cm` : "Set height"} | {healthProfile?.weight ? `${healthProfile.weight} kg` : "Set weight"}
              </ThemedText>
            </View>
            <Feather name="edit-2" size={20} color="rgba(255,255,255,0.8)" />
          </View>
          {bmi ? (
            <View style={styles.bmiSection}>
              <View style={[styles.bmiCircle, { borderColor: bmiCategory?.color }]}>
                <ThemedText style={styles.bmiValue}>{bmi.toFixed(1)}</ThemedText>
                <ThemedText style={styles.bmiLabel}>BMI</ThemedText>
              </View>
              <View style={styles.bmiInfo}>
                <ThemedText style={[styles.bmiCategory, { color: bmiCategory?.color }]}>
                  {bmiCategory?.label}
                </ThemedText>
                <ThemedText style={styles.bmiRange}>
                  Normal range: 18.5 - 24.9
                </ThemedText>
              </View>
            </View>
          ) : (
            <ThemedText style={styles.profileHint}>
              Tap to add your height and weight for personalized suggestions
            </ThemedText>
          )}
        </Pressable>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <View style={[styles.statsGrid, { marginBottom: Spacing.xl }]}>
          <View style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="droplet" size={24} color={AppColors.accent} />
            <ThemedText style={styles.statValue}>{dietLog.waterGlasses}/{WATER_GOAL}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>Water</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="zap" size={24} color={AppColors.gold} />
            <ThemedText style={styles.statValue}>{totalCalories}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>Calories</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="activity" size={24} color="#10B981" />
            <ThemedText style={styles.statValue}>{exerciseLog.totalMinutes}</ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>Exercise</ThemedText>
          </View>
          <View style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}>
            <Feather name="navigation" size={24} color={theme.primary} />
            <ThemedText style={styles.statValue}>{(exerciseLog.steps / 1000).toFixed(1)}k</ThemedText>
            <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>Steps</ThemedText>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Suggestions</ThemedText>
        <View style={[styles.suggestionsCard, { backgroundColor: theme.backgroundDefault }]}>
          {suggestions.map((suggestion, index) => (
            <View key={index} style={styles.suggestionItem}>
              <View style={[styles.suggestionIcon, { backgroundColor: theme.primary + "15" }]}>
                <Feather name="check-circle" size={16} color={theme.primary} />
              </View>
              <ThemedText style={styles.suggestionText}>{suggestion}</ThemedText>
            </View>
          ))}
        </View>
      </Animated.View>
    </>
  );

  const renderDiet = () => (
    <>
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Water Intake</ThemedText>
        <View style={[styles.waterCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.waterControls}>
            <Pressable
              onPress={() => handleWaterChange(-1)}
              style={[styles.controlBtn, { backgroundColor: theme.backgroundSecondary }]}
            >
              <Feather name="minus" size={20} color={theme.text} />
            </Pressable>
            <View style={styles.waterDisplay}>
              <Feather name="droplet" size={28} color={AppColors.accent} />
              <ThemedText style={styles.waterCount}>{dietLog.waterGlasses}</ThemedText>
              <ThemedText style={[styles.waterGoal, { color: theme.textSecondary }]}>
                of {WATER_GOAL} glasses
              </ThemedText>
            </View>
            <Pressable
              onPress={() => handleWaterChange(1)}
              style={[styles.controlBtn, { backgroundColor: theme.primary }]}
            >
              <Feather name="plus" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.backgroundSecondary }]}>
            <View style={[styles.progressFill, { width: `${Math.min(100, waterProgress)}%`, backgroundColor: AppColors.accent }]} />
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Meals</ThemedText>
        {MEAL_TYPES.map((type) => {
          const meals = dietLog.meals.filter((m) => m.type === type);
          const isExpanded = showMealInput === type;
          return (
            <View key={type} style={[styles.mealCard, { backgroundColor: theme.backgroundDefault }]}>
              <Pressable
                onPress={() => {
                  Haptics.selectionAsync();
                  setShowMealInput(isExpanded ? null : type);
                }}
                style={styles.mealHeader}
              >
                <View style={[styles.mealIcon, { backgroundColor: theme.primary + "15" }]}>
                  <Feather
                    name={type === "Breakfast" ? "sunrise" : type === "Lunch" ? "sun" : type === "Dinner" ? "moon" : "coffee"}
                    size={18}
                    color={theme.primary}
                  />
                </View>
                <View style={styles.mealInfo}>
                  <ThemedText style={styles.mealType}>{type}</ThemedText>
                  <ThemedText style={[styles.mealCount, { color: theme.textSecondary }]}>
                    {meals.length} item{meals.length !== 1 ? "s" : ""}
                  </ThemedText>
                </View>
                <Feather name={isExpanded ? "chevron-up" : "plus"} size={18} color={theme.primary} />
              </Pressable>
              {meals.length > 0 ? (
                <View style={styles.mealsList}>
                  {meals.map((meal) => (
                    <ThemedText key={meal.id} style={[styles.mealItem, { color: theme.textSecondary }]}>
                      {meal.name} {meal.calories ? `(${meal.calories} cal)` : ""}
                    </ThemedText>
                  ))}
                </View>
              ) : null}
              {isExpanded ? (
                <View style={styles.mealInputRow}>
                  <TextInput
                    style={[styles.mealInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                    value={mealInput}
                    onChangeText={setMealInput}
                    placeholder="What did you eat?"
                    placeholderTextColor={theme.textSecondary}
                  />
                  <TextInput
                    style={[styles.calInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                    value={calorieInput}
                    onChangeText={setCalorieInput}
                    placeholder="Cal"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="numeric"
                  />
                  <Pressable onPress={() => handleAddMeal(type)} style={[styles.addBtn, { backgroundColor: theme.primary }]}>
                    <Feather name="check" size={18} color="#FFFFFF" />
                  </Pressable>
                </View>
              ) : null}
            </View>
          );
        })}
      </Animated.View>
    </>
  );

  const renderExercise = () => (
    <>
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Daily Steps</ThemedText>
        <View style={[styles.stepsCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.stepsControls}>
            <Pressable
              onPress={() => handleStepsChange(-500)}
              style={[styles.controlBtn, { backgroundColor: theme.backgroundSecondary }]}
            >
              <Feather name="minus" size={20} color={theme.text} />
            </Pressable>
            <View style={styles.stepsDisplay}>
              <Feather name="navigation" size={28} color={AppColors.gold} />
              <ThemedText style={styles.stepsCount}>{exerciseLog.steps.toLocaleString()}</ThemedText>
              <ThemedText style={[styles.stepsGoal, { color: theme.textSecondary }]}>of 10,000 steps</ThemedText>
            </View>
            <Pressable
              onPress={() => handleStepsChange(500)}
              style={[styles.controlBtn, { backgroundColor: theme.primary }]}
            >
              <Feather name="plus" size={20} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={[styles.progressBar, { backgroundColor: theme.backgroundSecondary }]}>
            <View style={[styles.progressFill, { width: `${Math.min(100, stepsProgress)}%`, backgroundColor: AppColors.gold }]} />
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Quick Add Exercise</ThemedText>
        <View style={styles.exerciseGrid}>
          {EXERCISE_PRESETS.map((preset, index) => {
            const isSelected = selectedExercise === preset.id;
            return (
              <Animated.View key={preset.id} entering={FadeInRight.delay(index * 50).duration(300)}>
                <Pressable
                  onPress={() => {
                    Haptics.selectionAsync();
                    setSelectedExercise(isSelected ? null : preset.id);
                  }}
                  style={[
                    styles.exerciseCard,
                    { backgroundColor: theme.backgroundDefault },
                    isSelected && { borderColor: theme.primary, borderWidth: 2 },
                  ]}
                >
                  <View style={[styles.exerciseIcon, { backgroundColor: theme.primary + "15" }]}>
                    <Feather name={preset.icon as any} size={20} color={theme.primary} />
                  </View>
                  <ThemedText style={styles.exerciseName}>{preset.name}</ThemedText>
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
                    <Pressable onPress={() => handleAddExercise(preset.id)} style={[styles.addBtn, { backgroundColor: theme.primary }]}>
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
        <Animated.View entering={FadeInDown.delay(300).duration(500)}>
          <ThemedText style={styles.sectionTitle}>Today's Workouts</ThemedText>
          <View style={[styles.workoutsList, { backgroundColor: theme.backgroundDefault }]}>
            {exerciseLog.exercises.map((exercise) => (
              <View key={exercise.id} style={styles.workoutItem}>
                <Feather name="activity" size={18} color={theme.primary} />
                <ThemedText style={styles.workoutName}>{exercise.name}</ThemedText>
                <ThemedText style={[styles.workoutMeta, { color: theme.textSecondary }]}>
                  {exercise.duration}min | {exercise.caloriesBurned}cal
                </ThemedText>
              </View>
            ))}
          </View>
        </Animated.View>
      ) : null}
    </>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.md,
          paddingBottom: insets.bottom + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        {renderTabs()}
        {activeTab === "overview" && renderOverview()}
        {activeTab === "diet" && renderDiet()}
        {activeTab === "exercise" && renderExercise()}
      </ScrollView>

      <Modal visible={showProfileModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.backgroundDefault }]}>
            <ThemedText style={styles.modalTitle}>Update Health Profile</ThemedText>
            <View style={styles.inputGroup}>
              <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>Height (cm)</ThemedText>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                value={heightInput}
                onChangeText={setHeightInput}
                placeholder="e.g., 170"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.inputGroup}>
              <ThemedText style={[styles.inputLabel, { color: theme.textSecondary }]}>Weight (kg)</ThemedText>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                value={weightInput}
                onChangeText={setWeightInput}
                placeholder="e.g., 70"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => setShowProfileModal(false)}
                style={[styles.modalBtn, { backgroundColor: theme.backgroundSecondary }]}
              >
                <ThemedText style={styles.modalBtnText}>Cancel</ThemedText>
              </Pressable>
              <Pressable onPress={saveProfile} style={[styles.modalBtn, { backgroundColor: theme.primary }]}>
                <ThemedText style={[styles.modalBtnText, { color: "#FFFFFF" }]}>Save</ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
  tabBar: {
    flexDirection: "row",
    borderRadius: BorderRadius.full,
    padding: 4,
    marginBottom: Spacing.xl,
  },
  tab: {
    flex: 1,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    alignItems: "center",
  },
  tabText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  profileCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  profileHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: Spacing.lg,
  },
  profileTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  profileSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  profileHint: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.7)",
  },
  bmiSection: {
    flexDirection: "row",
    alignItems: "center",
  },
  bmiCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginRight: Spacing.lg,
  },
  bmiValue: {
    fontSize: 18,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  bmiLabel: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.8)",
  },
  bmiInfo: { flex: 1 },
  bmiCategory: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  bmiRange: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.7)",
    marginTop: 2,
  },
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
  },
  statCard: {
    width: "47%",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    alignItems: "center",
    ...Shadows.sm,
  },
  statValue: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginTop: Spacing.sm,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  suggestionsCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  suggestionItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  suggestionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  suggestionText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  waterCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.sm,
  },
  waterControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.lg,
  },
  controlBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  waterDisplay: { alignItems: "center" },
  waterCount: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
    marginTop: Spacing.sm,
  },
  waterGoal: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  mealCard: {
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.md,
    overflow: "hidden",
    ...Shadows.sm,
  },
  mealHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
  },
  mealIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  mealInfo: { flex: 1 },
  mealType: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  mealCount: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  mealsList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  mealItem: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    paddingLeft: 52,
    marginBottom: 4,
  },
  mealInputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  mealInput: {
    flex: 1,
    height: 40,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  calInput: {
    width: 56,
    height: 40,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
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
  stepsDisplay: { alignItems: "center" },
  stepsCount: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginTop: Spacing.sm,
  },
  stepsGoal: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  exerciseGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.md,
    marginBottom: Spacing.xl,
  },
  exerciseCard: {
    width: 100,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    alignItems: "center",
    ...Shadows.sm,
  },
  exerciseIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  exerciseName: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    textAlign: "center",
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
    height: 36,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  workoutsList: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  workoutItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  workoutName: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  workoutMeta: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: Spacing.xl,
  },
  modalContent: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    ...Shadows.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xl,
    textAlign: "center",
  },
  inputGroup: {
    marginBottom: Spacing.lg,
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.sm,
  },
  modalInput: {
    height: 48,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  modalButtons: {
    flexDirection: "row",
    gap: Spacing.md,
    marginTop: Spacing.md,
  },
  modalBtn: {
    flex: 1,
    height: 48,
    borderRadius: BorderRadius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBtnText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
});
