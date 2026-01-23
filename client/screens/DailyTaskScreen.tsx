import React, { useState, useEffect, useCallback } from "react";
import { View, ScrollView, StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeInRight, Layout } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";
import { getDailyTasks, saveDailyTask, deleteDailyTask, DailyTask } from "@/lib/storage";

function getTodayDate(): string {
  return new Date().toISOString().split("T")[0];
}

export default function DailyTaskScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [newTask, setNewTask] = useState("");
  const [showInput, setShowInput] = useState(false);

  const loadTasks = useCallback(async () => {
    const today = getTodayDate();
    const loaded = await getDailyTasks(today);
    setTasks(loaded);
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  const handleAddTask = async () => {
    if (!newTask.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const task: DailyTask = {
      id: Date.now().toString(),
      title: newTask.trim(),
      completed: false,
      date: getTodayDate(),
      createdAt: Date.now(),
    };

    await saveDailyTask(task);
    setNewTask("");
    setShowInput(false);
    await loadTasks();
  };

  const handleToggleTask = async (task: DailyTask) => {
    await Haptics.selectionAsync();
    const updated = { ...task, completed: !task.completed };
    await saveDailyTask(updated);
    await loadTasks();
  };

  const handleDeleteTask = async (taskId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    await deleteDailyTask(taskId);
    await loadTasks();
  };

  const completedCount = tasks.filter((t) => t.completed).length;
  const progress = tasks.length > 0 ? (completedCount / tasks.length) * 100 : 0;

  const renderTask = ({ item, index }: { item: DailyTask; index: number }) => (
    <Animated.View
      entering={FadeInRight.delay(index * 50).duration(300)}
      layout={Layout.springify()}
    >
      <Pressable
        onPress={() => handleToggleTask(item)}
        onLongPress={() => handleDeleteTask(item.id)}
        style={[
          styles.taskCard,
          { backgroundColor: theme.backgroundDefault },
          item.completed && { opacity: 0.7 },
        ]}
      >
        <View
          style={[
            styles.checkbox,
            { borderColor: theme.primary },
            item.completed && { backgroundColor: theme.primary },
          ]}
        >
          {item.completed ? <Feather name="check" size={14} color="#FFFFFF" /> : null}
        </View>
        <ThemedText
          style={[
            styles.taskTitle,
            item.completed && { textDecorationLine: "line-through", color: theme.textSecondary },
          ]}
        >
          {item.title}
        </ThemedText>
        <Pressable onPress={() => handleDeleteTask(item.id)} style={styles.deleteBtn}>
          <Feather name="x" size={18} color={theme.textSecondary} />
        </Pressable>
      </Pressable>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing["4xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View
          entering={FadeInDown.delay(100).duration(500)}
          style={[styles.progressCard, { backgroundColor: theme.primary }]}
        >
          <View style={styles.progressContent}>
            <View>
              <ThemedText style={styles.progressLabel}>Today's Progress</ThemedText>
              <ThemedText style={styles.progressCount}>
                {completedCount}/{tasks.length} Tasks
              </ThemedText>
            </View>
            <View style={styles.progressCircle}>
              <ThemedText style={styles.progressPercent}>{Math.round(progress)}%</ThemedText>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(500)}>
          <View style={styles.sectionHeader}>
            <ThemedText style={styles.sectionTitle}>Tasks</ThemedText>
            <Pressable
              onPress={() => {
                Haptics.selectionAsync();
                setShowInput(!showInput);
              }}
              style={[styles.addButton, { backgroundColor: theme.primary }]}
            >
              <Feather name="plus" size={20} color="#FFFFFF" />
            </Pressable>
          </View>

          {showInput ? (
            <Animated.View
              entering={FadeInDown.duration(300)}
              style={[styles.inputCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <TextInput
                style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundSecondary }]}
                value={newTask}
                onChangeText={setNewTask}
                placeholder="Enter task..."
                placeholderTextColor={theme.textSecondary}
                autoFocus
                onSubmitEditing={handleAddTask}
              />
              <Pressable onPress={handleAddTask} style={[styles.submitBtn, { backgroundColor: theme.primary }]}>
                <Feather name="check" size={20} color="#FFFFFF" />
              </Pressable>
            </Animated.View>
          ) : null}

          {tasks.length === 0 ? (
            <View style={[styles.emptyCard, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="check-square" size={48} color={theme.textSecondary} />
              <ThemedText style={[styles.emptyText, { color: theme.textSecondary }]}>
                No tasks for today. Tap + to add one!
              </ThemedText>
            </View>
          ) : (
            <View style={styles.tasksList}>
              {tasks.map((task, index) => renderTask({ item: task, index }))}
            </View>
          )}
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(300).duration(500)}
          style={[styles.tipCard, { backgroundColor: theme.backgroundDefault }]}
        >
          <View style={[styles.tipIcon, { backgroundColor: AppColors.gold + "20" }]}>
            <Feather name="sun" size={20} color={AppColors.gold} />
          </View>
          <ThemedText style={[styles.tipText, { color: theme.textSecondary }]}>
            Long press on a task to delete it
          </ThemedText>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  progressCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.xl,
    ...Shadows.lg,
  },
  progressContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  progressLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    color: "rgba(255,255,255,0.8)",
  },
  progressCount: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  progressCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  progressPercent: {
    fontSize: 16,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
  },
  progressBar: {
    height: 8,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 4,
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
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    ...Shadows.sm,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
    ...Shadows.sm,
  },
  input: {
    flex: 1,
    height: 44,
    borderRadius: BorderRadius.md,
    paddingHorizontal: Spacing.md,
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
  },
  submitBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  tasksList: {
    gap: Spacing.sm,
  },
  taskCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  taskTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  deleteBtn: {
    width: 32,
    height: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing["3xl"],
    alignItems: "center",
    ...Shadows.sm,
  },
  emptyText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: Spacing.lg,
  },
  tipCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginTop: Spacing.xl,
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
  },
});
