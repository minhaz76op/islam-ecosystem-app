import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { getDietLog, saveDietLog, DietLog } from "@/lib/storage";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

const MEAL_TYPES = ["Breakfast", "Lunch", "Dinner", "Snacks"] as const;

const WATER_GOAL = 8;

export default function DietHealthScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [dietLog, setDietLog] = useState<DietLog>({
    date: getTodayDate(),
    meals: [],
    waterGlasses: 0,
    weight: undefined,
    notes: "",
  });
  const [showMealInput, setShowMealInput] = useState<string | null>(null);
  const [mealInput, setMealInput] = useState("");
  const [calorieInput, setCalorieInput] = useState("");

  const loadData = useCallback(async () => {
    const today = getTodayDate();
    const log = await getDietLog(today);
    if (log) {
      setDietLog(log);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateDietLog = async (updates: Partial<DietLog>) => {
    const updated = { ...dietLog, ...updates };
    setDietLog(updated);
    await saveDietLog(updated);
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

    const meals = [...dietLog.meals, newMeal];
    await updateDietLog({ meals });
    setMealInput("");
    setCalorieInput("");
    setShowMealInput(null);
  };

  const handleRemoveMeal = async (mealId: string) => {
    await Haptics.selectionAsync();
    const meals = dietLog.meals.filter((m) => m.id !== mealId);
    await updateDietLog({ meals });
  };

  const handleWaterChange = async (change: number) => {
    await Haptics.selectionAsync();
    const newValue = Math.max(0, Math.min(20, dietLog.waterGlasses + change));
    await updateDietLog({ waterGlasses: newValue });
  };

  const totalCalories = dietLog.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0);
  const waterProgress = (dietLog.waterGlasses / WATER_GOAL) * 100;

  const getMealsForType = (type: string) => dietLog.meals.filter((m) => m.type === type);

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
            <Feather name="zap" size={24} color="rgba(255,255,255,0.8)" />
            <ThemedText style={styles.summaryValue}>{totalCalories}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Calories</ThemedText>
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: "rgba(255,255,255,0.2)" }]} />
          <View style={styles.summaryItem}>
            <Feather name="droplet" size={24} color="rgba(255,255,255,0.8)" />
            <ThemedText style={styles.summaryValue}>{dietLog.waterGlasses}/{WATER_GOAL}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Glasses</ThemedText>
          </View>
          <View style={[styles.summaryDivider, { backgroundColor: "rgba(255,255,255,0.2)" }]} />
          <View style={styles.summaryItem}>
            <Feather name="activity" size={24} color="rgba(255,255,255,0.8)" />
            <ThemedText style={styles.summaryValue}>{dietLog.meals.length}</ThemedText>
            <ThemedText style={styles.summaryLabel}>Meals</ThemedText>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Water Intake</ThemedText>
        <View style={[styles.waterCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.waterControls}>
            <Pressable
              onPress={() => handleWaterChange(-1)}
              style={[styles.waterBtn, { backgroundColor: theme.backgroundSecondary }]}
            >
              <Feather name="minus" size={24} color={theme.text} />
            </Pressable>
            <View style={styles.waterDisplay}>
              <Feather name="droplet" size={32} color={AppColors.accent} />
              <ThemedText style={styles.waterCount}>{dietLog.waterGlasses}</ThemedText>
              <ThemedText style={[styles.waterGoal, { color: theme.textSecondary }]}>
                of {WATER_GOAL} glasses
              </ThemedText>
            </View>
            <Pressable
              onPress={() => handleWaterChange(1)}
              style={[styles.waterBtn, { backgroundColor: theme.primary }]}
            >
              <Feather name="plus" size={24} color="#FFFFFF" />
            </Pressable>
          </View>
          <View style={[styles.waterProgress, { backgroundColor: theme.backgroundSecondary }]}>
            <View
              style={[
                styles.waterProgressFill,
                { width: `${Math.min(100, waterProgress)}%`, backgroundColor: AppColors.accent },
              ]}
            />
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(500)}>
        <ThemedText style={styles.sectionTitle}>Meals</ThemedText>
        {MEAL_TYPES.map((type) => {
          const meals = getMealsForType(type);
          const isExpanded = showMealInput === type;

          return (
            <View
              key={type}
              style={[styles.mealCard, { backgroundColor: theme.backgroundDefault }]}
            >
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
                    size={20}
                    color={theme.primary}
                  />
                </View>
                <View style={styles.mealInfo}>
                  <ThemedText style={styles.mealType}>{type}</ThemedText>
                  <ThemedText style={[styles.mealCount, { color: theme.textSecondary }]}>
                    {meals.length} item{meals.length !== 1 ? "s" : ""}
                  </ThemedText>
                </View>
                <Feather
                  name={isExpanded ? "chevron-up" : "plus"}
                  size={20}
                  color={theme.primary}
                />
              </Pressable>

              {meals.length > 0 ? (
                <View style={styles.mealsList}>
                  {meals.map((meal) => (
                    <View key={meal.id} style={styles.mealItem}>
                      <View style={styles.mealItemInfo}>
                        <ThemedText style={styles.mealName}>{meal.name}</ThemedText>
                        <ThemedText style={[styles.mealTime, { color: theme.textSecondary }]}>
                          {meal.time} {meal.calories ? `• ${meal.calories} cal` : ""}
                        </ThemedText>
                      </View>
                      <Pressable onPress={() => handleRemoveMeal(meal.id)}>
                        <Feather name="x" size={18} color={theme.textSecondary} />
                      </Pressable>
                    </View>
                  ))}
                </View>
              ) : null}

              {isExpanded ? (
                <View style={styles.mealInputContainer}>
                  <TextInput
                    style={[styles.mealInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                    value={mealInput}
                    onChangeText={setMealInput}
                    placeholder="What did you eat?"
                    placeholderTextColor={theme.textSecondary}
                    autoFocus
                  />
                  <TextInput
                    style={[styles.calorieInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                    value={calorieInput}
                    onChangeText={setCalorieInput}
                    placeholder="Cal"
                    placeholderTextColor={theme.textSecondary}
                    keyboardType="numeric"
                  />
                  <Pressable
                    onPress={() => handleAddMeal(type)}
                    style={[styles.addMealBtn, { backgroundColor: theme.primary }]}
                  >
                    <Feather name="check" size={20} color="#FFFFFF" />
                  </Pressable>
                </View>
              ) : null}
            </View>
          );
        })}
      </Animated.View>

      <Animated.View
        entering={FadeInDown.delay(400).duration(500)}
        style={[styles.tipCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <View style={[styles.tipIcon, { backgroundColor: AppColors.primary + "15" }]}>
          <Feather name="heart" size={20} color={AppColors.primary} />
        </View>
        <ThemedText style={[styles.tipText, { color: theme.textSecondary }]}>
          Track your meals and water intake to maintain a healthy lifestyle. Aim for 8 glasses of water daily.
        </ThemedText>
      </Animated.View>
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
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
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
  waterBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  waterDisplay: {
    alignItems: "center",
  },
  waterCount: {
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
    marginTop: Spacing.sm,
  },
  waterGoal: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  waterProgress: {
    height: 8,
    borderRadius: 4,
    overflow: "hidden",
  },
  waterProgressFill: {
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
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  mealInfo: {
    flex: 1,
  },
  mealType: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  mealCount: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  mealsList: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.md,
  },
  mealItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingLeft: 44 + Spacing.md,
  },
  mealItemInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  mealTime: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  mealInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  mealInput: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  calorieInput: {
    width: 60,
    height: 44,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.sm,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
  addMealBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.md,
    ...Shadows.sm,
  },
  tipIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  tipText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
});
