import React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

const appLogo = require("../../assets/images/app-logo.png");

const FEATURES = [
  {
    icon: "clock",
    title: "Prayer Times",
    description: "Accurate GPS-based prayer times with customizable notifications and Adhan sounds",
  },
  {
    icon: "book-open",
    title: "Holy Quran",
    description: "Complete Quran with Arabic text, English and Bengali translations",
  },
  {
    icon: "heart",
    title: "Daily Duas",
    description: "40+ authentic duas organized by categories with audio recitation",
  },
  {
    icon: "target",
    title: "Qibla Direction",
    description: "Find the direction of Kaaba from anywhere in the world",
  },
  {
    icon: "users",
    title: "Friends System",
    description: "Connect with friends, share progress, and complete Islamic challenges together",
  },
  {
    icon: "message-circle",
    title: "IslamicGPT",
    description: "AI-powered assistant for Islamic questions and guidance",
  },
  {
    icon: "repeat",
    title: "Tasbih Counter",
    description: "Digital counter for dhikr with haptic feedback and progress tracking",
  },
  {
    icon: "calendar",
    title: "Islamic Calendar",
    description: "Hijri calendar with important Islamic dates and holidays",
  },
  {
    icon: "sun",
    title: "Ramadan Timetable",
    description: "Complete Sehri and Iftar times for the blessed month",
  },
  {
    icon: "percent",
    title: "Zakat Calculator",
    description: "Calculate your Zakat obligation accurately",
  },
  {
    icon: "map-pin",
    title: "Mosque Locator",
    description: "Find nearby mosques using GPS location",
  },
  {
    icon: "award",
    title: "Islamic Quiz",
    description: "Test and improve your Islamic knowledge with quizzes",
  },
];

export default function AboutScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

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
        style={styles.headerSection}
      >
        <Image source={appLogo} style={styles.appLogo} resizeMode="contain" />
        <ThemedText style={styles.appName}>Day with Islam</ThemedText>
        <View style={[styles.versionBadge, { backgroundColor: theme.primary + "15" }]}>
          <ThemedText style={[styles.versionText, { color: theme.primary }]}>
            Version 1.0.0
          </ThemedText>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(600)}>
        <View style={[styles.descriptionCard, { backgroundColor: theme.backgroundDefault }]}>
          <ThemedText style={styles.descriptionTitle}>Your Complete Islamic Companion</ThemedText>
          <ThemedText style={[styles.descriptionText, { color: theme.textSecondary }]}>
            Day with Islam is a comprehensive Islamic lifestyle application designed to support your daily worship, learning, and spiritual growth. Whether you're tracking prayer times, reading Quran, learning duas, or connecting with fellow Muslims, this app provides everything you need for a fulfilling Islamic lifestyle.
          </ThemedText>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(600)}>
        <ThemedText style={styles.sectionTitle}>Features</ThemedText>
        <View style={styles.featuresGrid}>
          {FEATURES.map((feature, index) => (
            <Animated.View
              key={feature.title}
              entering={FadeInDown.delay(350 + index * 30).duration(500)}
              style={[styles.featureCard, { backgroundColor: theme.backgroundDefault }]}
            >
              <View style={[styles.featureIconBg, { backgroundColor: theme.primary + "15" }]}>
                <Feather name={feature.icon as any} size={20} color={theme.primary} />
              </View>
              <ThemedText style={styles.featureTitle}>{feature.title}</ThemedText>
              <ThemedText style={[styles.featureDesc, { color: theme.textSecondary }]}>
                {feature.description}
              </ThemedText>
            </Animated.View>
          ))}
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(700).duration(600)}>
        <View style={[styles.missionCard, { backgroundColor: theme.primary }]}>
          <Feather name="compass" size={28} color="#FFFFFF" style={styles.missionIcon} />
          <ThemedText style={styles.missionTitle}>Our Mission</ThemedText>
          <ThemedText style={styles.missionText}>
            To make Islamic knowledge and practices accessible to Muslims worldwide, helping them strengthen their connection with Allah and live according to the teachings of the Quran and Sunnah.
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
  headerSection: {
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  appLogo: {
    width: 120,
    height: 120,
    marginBottom: Spacing.lg,
  },
  appName: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.sm,
  },
  versionBadge: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
  },
  versionText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  descriptionCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing["2xl"],
    ...Shadows.sm,
  },
  descriptionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
  },
  descriptionText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.lg,
  },
  featuresGrid: {
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  featureCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    ...Shadows.sm,
  },
  featureIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.sm,
  },
  featureTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  featureDesc: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
  missionCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing["2xl"],
    alignItems: "center",
    ...Shadows.lg,
  },
  missionIcon: {
    marginBottom: Spacing.md,
  },
  missionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  missionText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 24,
  },
});
