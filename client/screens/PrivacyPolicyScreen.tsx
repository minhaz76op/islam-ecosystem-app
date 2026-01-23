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
  icon: string;
  title: string;
  children: React.ReactNode;
  theme: any;
  delay: number;
}

function Section({ icon, title, children, theme, delay }: SectionProps) {
  return (
    <Animated.View entering={FadeInDown.delay(delay).duration(500)}>
      <View style={[styles.section, { backgroundColor: theme.backgroundDefault }]}>
        <View style={styles.sectionHeader}>
          <View style={[styles.iconBg, { backgroundColor: theme.primary + "15" }]}>
            <Feather name={icon as any} size={18} color={theme.primary} />
          </View>
          <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
        </View>
        {children}
      </View>
    </Animated.View>
  );
}

export default function PrivacyPolicyScreen() {
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
        <ThemedText style={styles.lastUpdated}>Last Updated: January 2026</ThemedText>
        <ThemedText style={[styles.intro, { color: theme.textSecondary }]}>
          Day with Islam is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information.
        </ThemedText>
      </Animated.View>

      <Section icon="database" title="Information We Collect" theme={theme} delay={200}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          We collect minimal information to provide you with a personalized Islamic experience:
        </ThemedText>
        <View style={styles.bulletList}>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Profile information (name, email) when you create an account
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Prayer times and location data (only when you grant permission)
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} App usage data to improve features and performance
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Prayer completion and habit tracking data
          </ThemedText>
        </View>
      </Section>

      <Section icon="shield" title="How We Use Your Information" theme={theme} delay={300}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          Your information is used exclusively to:
        </ThemedText>
        <View style={styles.bulletList}>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Provide accurate prayer times based on your location
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Sync your data across devices when logged in
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Send prayer notifications (if enabled)
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Improve app features and user experience
          </ThemedText>
        </View>
      </Section>

      <Section icon="lock" title="Data Security" theme={theme} delay={400}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          We implement industry-standard security measures to protect your personal information. Your data is encrypted in transit and at rest. We never sell or share your personal information with third parties for marketing purposes.
        </ThemedText>
      </Section>

      <Section icon="map-pin" title="Location Data" theme={theme} delay={500}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          Location access is optional and used only for:
        </ThemedText>
        <View style={styles.bulletList}>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Calculating accurate prayer times for your area
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Finding nearby mosques
          </ThemedText>
          <ThemedText style={[styles.bulletItem, { color: theme.text }]}>
            {"\u2022"} Determining Qibla direction
          </ThemedText>
        </View>
        <ThemedText style={[styles.text, { color: theme.textSecondary, marginTop: Spacing.sm }]}>
          You can revoke location permission at any time through your device settings.
        </ThemedText>
      </Section>

      <Section icon="users" title="Children's Privacy" theme={theme} delay={600}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          Day with Islam is suitable for users of all ages. We do not knowingly collect personal information from children under 13 without parental consent.
        </ThemedText>
      </Section>

      <Section icon="refresh-cw" title="Updates to This Policy" theme={theme} delay={700}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          We may update this Privacy Policy periodically. We will notify you of any significant changes through the app or via email if you have an account.
        </ThemedText>
      </Section>

      <Section icon="mail" title="Contact Us" theme={theme} delay={800}>
        <ThemedText style={[styles.text, { color: theme.textSecondary }]}>
          If you have questions about this Privacy Policy, please contact us at:
        </ThemedText>
        <ThemedText style={[styles.email, { color: theme.primary }]}>
          minhazofficial5576@gmail.com
        </ThemedText>
      </Section>
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
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.md,
  },
  sectionTitle: {
    fontSize: 16,
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
});
