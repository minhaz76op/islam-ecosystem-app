import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface SectionProps {
  number: string;
  title: string;
  children: React.ReactNode;
  theme: any;
  delay: number;
}

function Section({ number, title, children, theme, delay }: SectionProps) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(500)}>
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.numberBadge, { backgroundColor: theme.primary }]}>
            <ThemedText style={styles.numberText}>{number}</ThemedText>
          </View>
          <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        </View>
        {children}
      </View>
    </Animated.View>
  );
}

export default function TermsOfServiceScreen() {
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
      <Animated.View entering={FadeInDown.delay(100).duration(500)}>
        <ThemedText style={styles.lastUpdated}>Effective Date: January 2026</ThemedText>
        <ThemedText style={[styles.intro, { color: theme.textSecondary }]}>
          Welcome to Day with Islam. By using this application, you agree to these Terms of Service. Please read them carefully.
        </ThemedText>
      </Animated.View>

      <Section number="1" title="Acceptance of Terms" theme={theme} delay={200}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          By downloading, installing, or using Day with Islam, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the application.
        </ThemedText>
      </Section>

      <Section number="2" title="Description of Service" theme={theme} delay={250}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          Day with Islam is an Islamic lifestyle application designed to support Muslims in their daily worship, learning, and spiritual growth. The app provides features including but not limited to:
        </ThemedText>
        <View style={styles.bulletList}>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Prayer time calculations and reminders
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Quran reading and audio
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Duas and supplications
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Tasbih counter
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Islamic learning resources
          </ThemedText>
        </View>
      </Section>

      <Section number="3" title="User Accounts" theme={theme} delay={300}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          You may create an account to access additional features and sync your data. You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account.
        </ThemedText>
      </Section>

      <Section number="4" title="Religious Content Disclaimer" theme={theme} delay={350}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          The Islamic content provided in this application is for educational and devotional purposes only. While we strive for accuracy based on authentic sources (Quran and Hadith), this app should not be considered a substitute for guidance from qualified Islamic scholars.
        </ThemedText>
        <ThemedText style={[styles.text, { color: theme.textSecondary, marginTop: Spacing.sm }]}>
          For religious rulings (fatwa) or complex jurisprudential matters, please consult with qualified scholars.
        </ThemedText>
      </Section>

      <Section number="5" title="Prayer Times Accuracy" theme={theme} delay={400}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          Prayer times are calculated using established astronomical methods. However, times may vary based on your location settings and calculation method preferences. Users are encouraged to verify prayer times with their local mosque.
        </ThemedText>
      </Section>

      <Section number="6" title="Intellectual Property" theme={theme} delay={450}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          All content, design, and features of Day with Islam are the intellectual property of the developer, except for Quranic text and authentic Hadith which are part of Islamic heritage. You may not copy, modify, or distribute the app's proprietary content without permission.
        </ThemedText>
      </Section>

      <Section number="7" title="User Conduct" theme={theme} delay={500}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          Users agree to use the app in accordance with Islamic values and principles. Any misuse of the app or its features may result in account suspension.
        </ThemedText>
      </Section>

      <Section number="8" title="Limitation of Liability" theme={theme} delay={550}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          Day with Islam is provided "as is" without warranties of any kind. The developer is not liable for any damages arising from the use or inability to use the application.
        </ThemedText>
      </Section>

      <Section number="9" title="Changes to Terms" theme={theme} delay={600}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          We reserve the right to modify these terms at any time. Continued use of the app after changes constitutes acceptance of the new terms.
        </ThemedText>
      </Section>

      <Section number="10" title="Contact" theme={theme} delay={650}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          For questions about these Terms of Service, please contact:
        </ThemedText>
        <ThemedText style={[styles.email, { color: theme.primary }]}>
          minhazofficial5576@gmail.com
        </ThemedText>
      </Section>

      <Animated.View entering={FadeInDown.delay(700).duration(500)}>
        <View style={[styles.footer, { backgroundColor: theme.primary + "10" }]}>
          <Feather name="check-circle" size={20} color={theme.primary} />
          <ThemedText style={[styles.footerText, { color: theme.primary }]}>
            By using Day with Islam, you acknowledge that you have read and agree to these Terms of Service.
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
  lastUpdated: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.sm,
  },
  intro: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  section: {
    borderRadius: BorderRadius.xl,
    padding: Spacing.lg,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  numberText: {
    fontSize: 13,
    fontFamily: "Poppins_600SemiBold",
    color: "#FFFFFF",
  },
  sectionTitle: {
    flex: 1,
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  text: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  bulletList: {
    marginTop: Spacing.sm,
  },
  bulletItem: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    lineHeight: 24,
    paddingLeft: Spacing.sm,
  },
  email: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginTop: Spacing.sm,
  },
  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginTop: Spacing.md,
    gap: Spacing.md,
  },
  footerText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    lineHeight: 20,
  },
});
