import React, { useState } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

const QUESTIONS = [
  {
    id: 1,
    question: "How many pillars of Islam are there?",
    options: ["3", "4", "5", "6"],
    correct: 2,
    explanation: "The Five Pillars of Islam are: Shahada, Salah, Zakat, Sawm, and Hajj.",
  },
  {
    id: 2,
    question: "Which Surah is known as the 'Heart of the Quran'?",
    options: ["Al-Fatiha", "Al-Baqarah", "Ya-Sin", "Al-Ikhlas"],
    correct: 2,
    explanation: "Surah Ya-Sin is often referred to as the Heart of the Quran due to its central themes.",
  },
  {
    id: 3,
    question: "How many times a day do Muslims pray?",
    options: ["3", "4", "5", "7"],
    correct: 2,
    explanation: "Muslims pray 5 times a day: Fajr, Dhuhr, Asr, Maghrib, and Isha.",
  },
  {
    id: 4,
    question: "In which month was the Quran first revealed?",
    options: ["Shaban", "Ramadan", "Muharram", "Rajab"],
    correct: 1,
    explanation: "The Quran was first revealed to Prophet Muhammad (PBUH) during the month of Ramadan.",
  },
  {
    id: 5,
    question: "What is the first word revealed in the Quran?",
    options: ["Bismillah", "Iqra", "Alhamdulillah", "SubhanAllah"],
    correct: 1,
    explanation: "The first word revealed was 'Iqra' meaning 'Read' in Surah Al-Alaq.",
  },
];

type QuizState = "start" | "playing" | "result";

export default function QuizScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [quizState, setQuizState] = useState<QuizState>("start");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  const handleStartQuiz = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setQuizState("playing");
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
  };

  const handleSelectAnswer = async (index: number) => {
    if (selectedAnswer !== null) return;
    
    await Haptics.selectionAsync();
    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === QUESTIONS[currentQuestion].correct) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      setScore((s) => s + 1);
    } else {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
  };

  const handleNextQuestion = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizState("result");
    }
  };

  const getOptionStyle = (index: number) => {
    if (selectedAnswer === null) {
      return { backgroundColor: theme.backgroundDefault };
    }
    if (index === QUESTIONS[currentQuestion].correct) {
      return { backgroundColor: "#10B98120", borderColor: "#10B981" };
    }
    if (index === selectedAnswer && index !== QUESTIONS[currentQuestion].correct) {
      return { backgroundColor: "#EF444420", borderColor: "#EF4444" };
    }
    return { backgroundColor: theme.backgroundDefault };
  };

  if (quizState === "start") {
    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing["3xl"],
          paddingBottom: insets.bottom + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Animated.View
          entering={FadeInDown.duration(500)}
          style={styles.startContainer}
        >
          <View
            style={[styles.quizIcon, { backgroundColor: theme.primary + "15" }]}
          >
            <Feather name="help-circle" size={48} color={theme.primary} />
          </View>

          <ThemedText style={styles.startTitle}>Islamic Quiz</ThemedText>
          <ThemedText style={[styles.startSubtitle, { color: theme.textSecondary }]}>
            Test your knowledge of Islam with AI-powered questions
          </ThemedText>

          <View style={styles.statsRow}>
            <View style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}>
              <ThemedText style={[styles.statValue, { color: theme.primary }]}>
                {QUESTIONS.length}
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
                Questions
              </ThemedText>
            </View>
            <View style={[styles.statCard, { backgroundColor: theme.backgroundDefault }]}>
              <ThemedText style={[styles.statValue, { color: theme.primary }]}>
                ~5
              </ThemedText>
              <ThemedText style={[styles.statLabel, { color: theme.textSecondary }]}>
                Minutes
              </ThemedText>
            </View>
          </View>

          <Pressable
            onPress={handleStartQuiz}
            style={[styles.startButton, { backgroundColor: theme.primary }]}
          >
            <ThemedText style={styles.startButtonText}>Start Quiz</ThemedText>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </Pressable>
        </Animated.View>
      </ScrollView>
    );
  }

  if (quizState === "result") {
    const percentage = Math.round((score / QUESTIONS.length) * 100);
    const getMessage = () => {
      if (percentage >= 80) return "Excellent! MashaAllah!";
      if (percentage >= 60) return "Good job! Keep learning!";
      return "Keep practicing!";
    };

    return (
      <ScrollView
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing["3xl"],
          paddingBottom: insets.bottom + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
          flex: 1,
          justifyContent: "center",
        }}
      >
        <Animated.View
          entering={FadeIn.duration(500)}
          style={styles.resultContainer}
        >
          <View
            style={[
              styles.resultCircle,
              { backgroundColor: theme.primary + "15" },
            ]}
          >
            <ThemedText style={[styles.resultScore, { color: theme.primary }]}>
              {score}/{QUESTIONS.length}
            </ThemedText>
            <ThemedText style={[styles.resultPercentage, { color: theme.textSecondary }]}>
              {percentage}%
            </ThemedText>
          </View>

          <ThemedText style={styles.resultMessage}>{getMessage()}</ThemedText>

          <View style={styles.resultActions}>
            <Pressable
              onPress={handleStartQuiz}
              style={[styles.retryButton, { backgroundColor: theme.primary }]}
            >
              <Feather name="refresh-cw" size={20} color="#FFFFFF" />
              <ThemedText style={styles.retryButtonText}>Try Again</ThemedText>
            </Pressable>
          </View>
        </Animated.View>
      </ScrollView>
    );
  }

  const question = QUESTIONS[currentQuestion];

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={{
        paddingTop: headerHeight + Spacing.xl,
        paddingBottom: insets.bottom + Spacing["2xl"],
        paddingHorizontal: Spacing.lg,
      }}
    >
      <View style={styles.progressHeader}>
        <ThemedText style={[styles.progressText, { color: theme.textSecondary }]}>
          Question {currentQuestion + 1} of {QUESTIONS.length}
        </ThemedText>
        <View style={[styles.progressBar, { backgroundColor: theme.backgroundSecondary }]}>
          <View
            style={[
              styles.progressFill,
              {
                backgroundColor: theme.primary,
                width: `${((currentQuestion + 1) / QUESTIONS.length) * 100}%`,
              },
            ]}
          />
        </View>
      </View>

      <Animated.View
        key={currentQuestion}
        entering={FadeInDown.duration(400)}
        style={[styles.questionCard, { backgroundColor: theme.backgroundDefault }]}
      >
        <ThemedText style={styles.questionText}>{question.question}</ThemedText>
      </Animated.View>

      <View style={styles.optionsContainer}>
        {question.options.map((option, index) => (
          <Animated.View
            key={index}
            entering={FadeInDown.delay(100 + index * 50).duration(400)}
          >
            <Pressable
              onPress={() => handleSelectAnswer(index)}
              disabled={selectedAnswer !== null}
              style={[
                styles.optionButton,
                { borderColor: theme.cardBorder },
                getOptionStyle(index),
              ]}
            >
              <View
                style={[
                  styles.optionLetter,
                  {
                    backgroundColor:
                      selectedAnswer === index
                        ? index === question.correct
                          ? "#10B981"
                          : "#EF4444"
                        : theme.backgroundSecondary,
                  },
                ]}
              >
                <ThemedText
                  style={[
                    styles.optionLetterText,
                    {
                      color:
                        selectedAnswer === index ? "#FFFFFF" : theme.text,
                    },
                  ]}
                >
                  {String.fromCharCode(65 + index)}
                </ThemedText>
              </View>
              <ThemedText style={styles.optionText}>{option}</ThemedText>
              {selectedAnswer !== null && index === question.correct ? (
                <Feather name="check-circle" size={20} color="#10B981" />
              ) : null}
              {selectedAnswer === index && index !== question.correct ? (
                <Feather name="x-circle" size={20} color="#EF4444" />
              ) : null}
            </Pressable>
          </Animated.View>
        ))}
      </View>

      {showExplanation ? (
        <Animated.View
          entering={FadeIn.duration(300)}
          style={[
            styles.explanationCard,
            { backgroundColor: theme.primary + "10", borderColor: theme.primary + "30" },
          ]}
        >
          <View style={styles.explanationHeader}>
            <Feather name="info" size={18} color={theme.primary} />
            <ThemedText style={[styles.explanationTitle, { color: theme.primary }]}>
              Explanation
            </ThemedText>
          </View>
          <ThemedText style={[styles.explanationText, { color: theme.textSecondary }]}>
            {question.explanation}
          </ThemedText>

          <Pressable
            onPress={handleNextQuestion}
            style={[styles.nextButton, { backgroundColor: theme.primary }]}
          >
            <ThemedText style={styles.nextButtonText}>
              {currentQuestion < QUESTIONS.length - 1 ? "Next Question" : "See Results"}
            </ThemedText>
            <Feather name="arrow-right" size={18} color="#FFFFFF" />
          </Pressable>
        </Animated.View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  startContainer: {
    alignItems: "center",
  },
  quizIcon: {
    width: 100,
    height: 100,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing["2xl"],
  },
  startTitle: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.sm,
  },
  startSubtitle: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginBottom: Spacing["2xl"],
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.lg,
    marginBottom: Spacing["3xl"],
  },
  statCard: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    ...Shadows.sm,
  },
  statValue: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  statLabel: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["3xl"],
    borderRadius: BorderRadius.full,
    ...Shadows.md,
  },
  startButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  progressHeader: {
    marginBottom: Spacing["2xl"],
  },
  progressText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.sm,
  },
  progressBar: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 3,
  },
  questionCard: {
    padding: Spacing["2xl"],
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing["2xl"],
    ...Shadows.sm,
  },
  questionText: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    lineHeight: 28,
  },
  optionsContainer: {
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
  },
  optionLetter: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  optionLetterText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  optionText: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
  explanationCard: {
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
  },
  explanationHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  explanationTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  explanationText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  nextButtonText: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  resultContainer: {
    alignItems: "center",
  },
  resultCircle: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing["2xl"],
  },
  resultScore: {
    fontSize: 36,
    fontFamily: "Poppins_700Bold",
  },
  resultPercentage: {
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  resultMessage: {
    fontSize: 22,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing["3xl"],
  },
  resultActions: {
    gap: Spacing.md,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing["3xl"],
    borderRadius: BorderRadius.full,
    ...Shadows.md,
  },
  retryButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
});
