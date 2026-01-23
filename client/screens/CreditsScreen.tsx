import React from "react";
import { View, ScrollView, StyleSheet, Pressable, Linking } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows, AppColors } from "@/constants/theme";

export default function CreditsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const openFacebook = () => {
    Linking.openURL("https://www.facebook.com/minhazOFF76");
  };

  const openEmail = () => {
    Linking.openURL("mailto:minhazofficial5576@gmail.com");
  };

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
        <LinearGradient
          colors={[theme.primary, AppColors.accent]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoContainer}
        >
          <Feather name="award" size={48} color="#FFFFFF" />
        </LinearGradient>
        <ThemedText style={styles.appName}>Day with Islam</ThemedText>
        <ThemedText style={[styles.tagline, { color: theme.textSecondary }]}>
          An Islamic lifestyle application created to support daily worship, learning, and spiritual growth.
        </ThemedText>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(200).duration(600)}>
        <View style={[styles.card, { backgroundColor: theme.backgroundDefault }]}>
          <View style={[styles.cardIconBg, { backgroundColor: theme.primary + "15" }]}>
            <Feather name="code" size={20} color={theme.primary} />
          </View>
          <ThemedText style={styles.cardTitle}>Concept, Design & Development</ThemedText>
          <ThemedText style={styles.developerName}>Minhajul Islam</ThemedText>
          <View style={styles.socialRow}>
            <Pressable onPress={openFacebook} style={[styles.socialBtn, { backgroundColor: "#1877F2" }]}>
              <Feather name="facebook" size={18} color="#FFFFFF" />
            </Pressable>
            <Pressable onPress={openEmail} style={[styles.socialBtn, { backgroundColor: theme.primary }]}>
              <Feather name="mail" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(300).duration(600)}>
        <View style={[styles.card, { backgroundColor: theme.backgroundDefault }]}>
          <View style={[styles.cardIconBg, { backgroundColor: AppColors.gold + "15" }]}>
            <Feather name="book-open" size={20} color={AppColors.gold} />
          </View>
          <ThemedText style={styles.cardTitle}>Content Sources</ThemedText>
          <ThemedText style={[styles.cardText, { color: theme.textSecondary }]}>
            All Islamic content is based on:
          </ThemedText>
          <View style={styles.bulletList}>
            <View style={styles.bulletRow}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <ThemedText style={[styles.bulletText, { color: theme.text }]}>The Holy Qur'an</ThemedText>
            </View>
            <View style={styles.bulletRow}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <ThemedText style={[styles.bulletText, { color: theme.text }]}>Authentic Hadith collections</ThemedText>
            </View>
            <View style={styles.bulletRow}>
              <View style={[styles.bullet, { backgroundColor: theme.primary }]} />
              <ThemedText style={[styles.bulletText, { color: theme.text }]}>Trusted and widely accepted Islamic scholarly references</ThemedText>
            </View>
          </View>
          <ThemedText style={[styles.cardNote, { color: theme.textSecondary }]}>
            Care has been taken to ensure accuracy and authenticity.
          </ThemedText>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(400).duration(600)}>
        <View style={[styles.card, { backgroundColor: theme.backgroundDefault }]}>
          <View style={[styles.cardIconBg, { backgroundColor: "#10B981" + "15" }]}>
            <Feather name="heart" size={20} color="#10B981" />
          </View>
          <ThemedText style={styles.cardTitle}>Acknowledgements</ThemedText>
          <ThemedText style={[styles.cardText, { color: theme.textSecondary }]}>
            Sincere appreciation to the scholars and educators whose works have served as references for this application.
          </ThemedText>
          <ThemedText style={[styles.cardText, { color: theme.textSecondary, marginTop: Spacing.sm }]}>
            Gratitude is also extended to users whose feedback helps improve and refine the app.
          </ThemedText>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(500).duration(600)}>
        <View style={[styles.card, { backgroundColor: theme.backgroundDefault }]}>
          <View style={[styles.cardIconBg, { backgroundColor: AppColors.warning + "15" }]}>
            <Feather name="alert-circle" size={20} color={AppColors.warning} />
          </View>
          <ThemedText style={styles.cardTitle}>Disclaimer</ThemedText>
          <ThemedText style={[styles.cardText, { color: theme.textSecondary }]}>
            This application is provided for educational and devotional purposes only.
          </ThemedText>
          <ThemedText style={[styles.cardText, { color: theme.textSecondary, marginTop: Spacing.sm }]}>
            For religious rulings (fatwa) or detailed jurisprudential guidance, users should consult qualified Islamic scholars.
          </ThemedText>
        </View>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(600).duration(600)}>
        <View style={[styles.prayerCard, { backgroundColor: theme.primary }]}>
          <Feather name="star" size={24} color="#FFFFFF" style={styles.prayerIcon} />
          <ThemedText style={styles.prayerTitle}>Prayer</ThemedText>
          <ThemedText style={styles.prayerText}>
            May Allah accept this effort, forgive any shortcomings, and make it a means of ongoing benefit (Sadaqah Jariyah).
          </ThemedText>
          <ThemedText style={styles.ameen}>Ameen.</ThemedText>
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
  logoContainer: {
    width: 100,
    height: 100,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  appName: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  tagline: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    lineHeight: 22,
    paddingHorizontal: Spacing.lg,
  },
  card: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  cardIconBg: {
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.md,
  },
  cardTitle: {
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.sm,
  },
  developerName: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.md,
  },
  socialRow: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  cardText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  cardNote: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    fontStyle: "italic",
    marginTop: Spacing.md,
  },
  bulletList: {
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: Spacing.xs,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 8,
    marginRight: Spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  prayerCard: {
    borderRadius: BorderRadius.xl,
    padding: Spacing["2xl"],
    alignItems: "center",
    marginBottom: Spacing.lg,
    ...Shadows.lg,
  },
  prayerIcon: {
    marginBottom: Spacing.md,
  },
  prayerTitle: {
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
    color: "#FFFFFF",
    marginBottom: Spacing.sm,
  },
  prayerText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    color: "rgba(255,255,255,0.9)",
    textAlign: "center",
    lineHeight: 24,
  },
  ameen: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
    marginTop: Spacing.md,
  },
});
