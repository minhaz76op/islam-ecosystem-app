import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Pressable, TextInput, Switch } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface CharityReminder {
  id: string;
  type: "daily" | "weekly" | "monthly" | "yearly";
  amount: string;
  enabled: boolean;
  lastDonated?: string;
}

const STORAGE_KEY = "@charity_reminders";

export default function CharityReminderScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [reminders, setReminders] = useState<CharityReminder[]>([
    { id: "daily", type: "daily", amount: "1", enabled: false },
    { id: "weekly", type: "weekly", amount: "10", enabled: false },
    { id: "monthly", type: "monthly", amount: "50", enabled: true },
    { id: "yearly", type: "yearly", amount: "500", enabled: false },
  ]);

  const [totalDonated, setTotalDonated] = useState(0);
  const [donationHistory, setDonationHistory] = useState<{ date: string; amount: number }[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed.reminders) setReminders(parsed.reminders);
        if (parsed.totalDonated) setTotalDonated(parsed.totalDonated);
        if (parsed.history) setDonationHistory(parsed.history);
      }
    } catch (error) {
      console.log("Error loading charity data");
    }
  };

  const saveData = async (
    newReminders: CharityReminder[],
    newTotal: number,
    newHistory: { date: string; amount: number }[]
  ) => {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ reminders: newReminders, totalDonated: newTotal, history: newHistory })
      );
    } catch (error) {
      console.log("Error saving charity data");
    }
  };

  const toggleReminder = async (id: string) => {
    await Haptics.selectionAsync();
    const newReminders = reminders.map((r) =>
      r.id === id ? { ...r, enabled: !r.enabled } : r
    );
    setReminders(newReminders);
    saveData(newReminders, totalDonated, donationHistory);
  };

  const updateAmount = (id: string, amount: string) => {
    const newReminders = reminders.map((r) =>
      r.id === id ? { ...r, amount } : r
    );
    setReminders(newReminders);
    saveData(newReminders, totalDonated, donationHistory);
  };

  const logDonation = async (amount: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newTotal = totalDonated + amount;
    const newHistory = [
      { date: new Date().toISOString(), amount },
      ...donationHistory.slice(0, 9),
    ];
    setTotalDonated(newTotal);
    setDonationHistory(newHistory);
    saveData(reminders, newTotal, newHistory);
  };

  const getTypeLabel = (type: string): { label: string; bengali: string; icon: string } => {
    switch (type) {
      case "daily":
        return { label: "Daily Sadaqah", bengali: "দৈনিক সদকা", icon: "sun" };
      case "weekly":
        return { label: "Weekly Charity", bengali: "সাপ্তাহিক দান", icon: "calendar" };
      case "monthly":
        return { label: "Monthly Donation", bengali: "মাসিক দান", icon: "credit-card" };
      case "yearly":
        return { label: "Yearly Zakat", bengali: "বার্ষিক যাকাত", icon: "gift" };
      default:
        return { label: "Charity", bengali: "দান", icon: "heart" };
    }
  };

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
      <Animated.View entering={FadeInDown.duration(500)}>
        <View style={[styles.totalCard, { backgroundColor: theme.primary }]}>
          <Feather name="heart" size={32} color="#FFFFFF" />
          <ThemedText style={styles.totalLabel}>Total Donated This Year</ThemedText>
          <ThemedText style={styles.totalAmount}>
            ${totalDonated.toLocaleString()}
          </ThemedText>
          <ThemedText style={styles.totalLabelBengali}>
            এই বছর মোট দান করা হয়েছে
          </ThemedText>
        </View>
      </Animated.View>

      <ThemedText style={styles.sectionTitle}>Charity Reminders</ThemedText>
      <ThemedText style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
        Set up regular giving reminders
      </ThemedText>

      {reminders.map((reminder, index) => {
        const typeInfo = getTypeLabel(reminder.type);
        return (
          <Animated.View
            key={reminder.id}
            entering={FadeInDown.delay(100 + index * 50).duration(400)}
          >
            <View style={[styles.reminderCard, { backgroundColor: theme.backgroundDefault }]}>
              <View style={styles.reminderHeader}>
                <View style={[styles.iconBox, { backgroundColor: theme.primary + "15" }]}>
                  <Feather name={typeInfo.icon as any} size={20} color={theme.primary} />
                </View>
                <View style={styles.reminderInfo}>
                  <ThemedText style={styles.reminderLabel}>{typeInfo.label}</ThemedText>
                  <ThemedText style={[styles.reminderLabelBengali, { color: theme.textSecondary }]}>
                    {typeInfo.bengali}
                  </ThemedText>
                </View>
                <Switch
                  value={reminder.enabled}
                  onValueChange={() => toggleReminder(reminder.id)}
                  trackColor={{ false: theme.backgroundTertiary, true: theme.primary + "50" }}
                  thumbColor={reminder.enabled ? theme.primary : theme.textSecondary}
                />
              </View>

              <View style={styles.amountRow}>
                <ThemedText style={[styles.amountLabel, { color: theme.textSecondary }]}>
                  Amount:
                </ThemedText>
                <View style={styles.amountInputContainer}>
                  <ThemedText style={styles.currencySymbol}>$</ThemedText>
                  <TextInput
                    style={[
                      styles.amountInput,
                      { backgroundColor: theme.backgroundSecondary, color: theme.text },
                    ]}
                    value={reminder.amount}
                    onChangeText={(value) => updateAmount(reminder.id, value)}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor={theme.textSecondary}
                  />
                </View>
              </View>

              {reminder.enabled ? (
                <Pressable
                  onPress={() => logDonation(parseFloat(reminder.amount) || 0)}
                  style={[styles.donateButton, { backgroundColor: theme.success }]}
                >
                  <Feather name="check-circle" size={18} color="#FFFFFF" />
                  <ThemedText style={styles.donateButtonText}>Mark as Donated</ThemedText>
                </Pressable>
              ) : null}
            </View>
          </Animated.View>
        );
      })}

      <ThemedText style={styles.sectionTitle}>Quick Donate</ThemedText>
      <View style={styles.quickDonateRow}>
        {[5, 10, 25, 50, 100].map((amount) => (
          <Pressable
            key={amount}
            onPress={() => logDonation(amount)}
            style={[styles.quickDonateButton, { backgroundColor: theme.backgroundDefault }]}
          >
            <ThemedText style={[styles.quickDonateAmount, { color: theme.primary }]}>
              ${amount}
            </ThemedText>
          </Pressable>
        ))}
      </View>

      {donationHistory.length > 0 ? (
        <>
          <ThemedText style={styles.sectionTitle}>Recent Donations</ThemedText>
          {donationHistory.slice(0, 5).map((donation, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(100 + index * 30).duration(400)}
            >
              <View style={[styles.historyItem, { backgroundColor: theme.backgroundDefault }]}>
                <View style={[styles.historyIcon, { backgroundColor: theme.success + "15" }]}>
                  <Feather name="check" size={16} color={theme.success} />
                </View>
                <View style={styles.historyInfo}>
                  <ThemedText style={styles.historyAmount}>
                    ${donation.amount.toLocaleString()}
                  </ThemedText>
                  <ThemedText style={[styles.historyDate, { color: theme.textSecondary }]}>
                    {new Date(donation.date).toLocaleDateString()}
                  </ThemedText>
                </View>
              </View>
            </Animated.View>
          ))}
        </>
      ) : null}

      <View style={[styles.infoCard, { backgroundColor: theme.primary + "10" }]}>
        <Feather name="info" size={18} color={theme.primary} />
        <View style={styles.infoContent}>
          <ThemedText style={[styles.infoTitle, { color: theme.primary }]}>
            The Prophet (PBUH) said:
          </ThemedText>
          <ThemedText style={[styles.infoQuote, { color: theme.textSecondary }]}>
            "Charity does not decrease wealth." - Sahih Muslim
          </ThemedText>
          <ThemedText style={[styles.infoQuoteBengali, { color: theme.textSecondary }]}>
            "দান সম্পদ কমায় না।" - সহীহ মুসলিম
          </ThemedText>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  totalCard: {
    padding: Spacing["2xl"],
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  totalLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.md,
  },
  totalAmount: {
    color: "#FFFFFF",
    fontSize: 40,
    fontFamily: "Poppins_700Bold",
  },
  totalLabelBengali: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
    marginTop: Spacing.xl,
  },
  sectionSubtitle: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.lg,
  },
  reminderCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  reminderInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  reminderLabel: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  reminderLabelBengali: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  amountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  amountLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Spacing.md,
  },
  currencySymbol: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginRight: Spacing.xs,
  },
  amountInput: {
    width: 80,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  donateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  donateButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  quickDonateRow: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginTop: Spacing.md,
  },
  quickDonateButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    ...Shadows.sm,
  },
  quickDonateAmount: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  historyItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  historyIcon: {
    width: 32,
    height: 32,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  historyInfo: {
    marginLeft: Spacing.md,
  },
  historyAmount: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  historyDate: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  infoCard: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    gap: Spacing.md,
    marginTop: Spacing["2xl"],
    alignItems: "flex-start",
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  infoQuote: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    fontStyle: "italic",
    lineHeight: 20,
  },
  infoQuoteBengali: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.xs,
  },
});
