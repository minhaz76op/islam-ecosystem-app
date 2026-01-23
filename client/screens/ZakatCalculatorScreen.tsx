import React, { useState } from "react";
import { View, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface AssetInput {
  label: string;
  labelBengali: string;
  value: string;
  icon: string;
}

export default function ZakatCalculatorScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [assets, setAssets] = useState<AssetInput[]>([
    { label: "Cash in Hand", labelBengali: "হাতে নগদ", value: "", icon: "dollar-sign" },
    { label: "Bank Balance", labelBengali: "ব্যাংক ব্যালেন্স", value: "", icon: "credit-card" },
    { label: "Gold Value", labelBengali: "সোনার মূল্য", value: "", icon: "award" },
    { label: "Silver Value", labelBengali: "রূপার মূল্য", value: "", icon: "circle" },
    { label: "Investment", labelBengali: "বিনিয়োগ", value: "", icon: "trending-up" },
    { label: "Business Assets", labelBengali: "ব্যবসায়িক সম্পদ", value: "", icon: "briefcase" },
    { label: "Property for Sale", labelBengali: "বিক্রয়ের জন্য সম্পত্তি", value: "", icon: "home" },
    { label: "Other Assets", labelBengali: "অন্যান্য সম্পদ", value: "", icon: "package" },
  ]);

  const [liabilities, setLiabilities] = useState<AssetInput[]>([
    { label: "Loans/Debts", labelBengali: "ঋণ", value: "", icon: "minus-circle" },
    { label: "Bills Due", labelBengali: "বকেয়া বিল", value: "", icon: "file-text" },
  ]);

  const [nisabThreshold, setNisabThreshold] = useState("5000");
  const [calculated, setCalculated] = useState(false);

  const updateAsset = (index: number, value: string) => {
    const newAssets = [...assets];
    newAssets[index].value = value;
    setAssets(newAssets);
    setCalculated(false);
  };

  const updateLiability = (index: number, value: string) => {
    const newLiabilities = [...liabilities];
    newLiabilities[index].value = value;
    setLiabilities(newLiabilities);
    setCalculated(false);
  };

  const calculateZakat = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setCalculated(true);
  };

  const totalAssets = assets.reduce((sum, a) => sum + (parseFloat(a.value) || 0), 0);
  const totalLiabilities = liabilities.reduce((sum, l) => sum + (parseFloat(l.value) || 0), 0);
  const netWorth = totalAssets - totalLiabilities;
  const nisab = parseFloat(nisabThreshold) || 0;
  const zakatDue = netWorth >= nisab ? netWorth * 0.025 : 0;

  const renderInput = (
    item: AssetInput,
    index: number,
    updateFn: (index: number, value: string) => void
  ) => (
    <Animated.View
      key={item.label}
      entering={FadeInDown.delay(100 + index * 50).duration(400)}
      style={[styles.inputCard, { backgroundColor: theme.backgroundDefault }]}
    >
      <View style={[styles.inputIcon, { backgroundColor: theme.primary + "15" }]}>
        <Feather name={item.icon as any} size={20} color={theme.primary} />
      </View>
      <View style={styles.inputContent}>
        <ThemedText style={styles.inputLabel}>{item.label}</ThemedText>
        <ThemedText style={[styles.inputLabelBengali, { color: theme.textSecondary }]}>
          {item.labelBengali}
        </ThemedText>
      </View>
      <TextInput
        style={[styles.input, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
        placeholder="0"
        placeholderTextColor={theme.textSecondary}
        keyboardType="numeric"
        value={item.value}
        onChangeText={(value) => updateFn(index, value)}
      />
    </Animated.View>
  );

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
        <View style={[styles.infoCard, { backgroundColor: theme.primary + "10" }]}>
          <Feather name="info" size={20} color={theme.primary} />
          <View style={styles.infoContent}>
            <ThemedText style={[styles.infoTitle, { color: theme.primary }]}>
              Zakat Rate: 2.5%
            </ThemedText>
            <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
              Zakat is obligatory when your wealth exceeds the Nisab threshold for one lunar year.
            </ThemedText>
          </View>
        </View>
      </Animated.View>

      <ThemedText style={styles.sectionTitle}>Assets / সম্পদ</ThemedText>
      {assets.map((item, index) => renderInput(item, index, updateAsset))}

      <ThemedText style={styles.sectionTitle}>Liabilities / দায়</ThemedText>
      {liabilities.map((item, index) => renderInput(item, index, updateLiability))}

      <View style={[styles.nisabCard, { backgroundColor: theme.backgroundDefault }]}>
        <ThemedText style={styles.nisabLabel}>Nisab Threshold (নিসাব)</ThemedText>
        <TextInput
          style={[styles.nisabInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
          placeholder="5000"
          placeholderTextColor={theme.textSecondary}
          keyboardType="numeric"
          value={nisabThreshold}
          onChangeText={(value) => {
            setNisabThreshold(value);
            setCalculated(false);
          }}
        />
      </View>

      <Pressable
        onPress={calculateZakat}
        style={[styles.calculateButton, { backgroundColor: theme.primary }]}
      >
        <Feather name="calculator" size={20} color="#FFFFFF" />
        <ThemedText style={styles.calculateButtonText}>Calculate Zakat</ThemedText>
      </Pressable>

      {calculated ? (
        <Animated.View entering={FadeInDown.duration(500)}>
          <View style={[styles.resultCard, { backgroundColor: theme.backgroundDefault }]}>
            <View style={styles.resultRow}>
              <ThemedText style={[styles.resultLabel, { color: theme.textSecondary }]}>
                Total Assets
              </ThemedText>
              <ThemedText style={styles.resultValue}>
                ${totalAssets.toLocaleString()}
              </ThemedText>
            </View>
            <View style={styles.resultRow}>
              <ThemedText style={[styles.resultLabel, { color: theme.textSecondary }]}>
                Total Liabilities
              </ThemedText>
              <ThemedText style={styles.resultValue}>
                -${totalLiabilities.toLocaleString()}
              </ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
            <View style={styles.resultRow}>
              <ThemedText style={[styles.resultLabel, { color: theme.textSecondary }]}>
                Net Worth
              </ThemedText>
              <ThemedText style={styles.resultValue}>
                ${netWorth.toLocaleString()}
              </ThemedText>
            </View>
            <View style={[styles.divider, { backgroundColor: theme.cardBorder }]} />
            <View style={styles.resultRow}>
              <ThemedText style={[styles.resultLabel, { color: theme.textSecondary }]}>
                Nisab Threshold
              </ThemedText>
              <ThemedText style={styles.resultValue}>
                ${nisab.toLocaleString()}
              </ThemedText>
            </View>
            <View
              style={[
                styles.zakatBox,
                { backgroundColor: zakatDue > 0 ? theme.primary + "15" : theme.backgroundSecondary },
              ]}
            >
              <ThemedText style={[styles.zakatLabel, { color: theme.primary }]}>
                {zakatDue > 0 ? "Zakat Due (যাকাত প্রদেয়)" : "Below Nisab"}
              </ThemedText>
              <ThemedText style={[styles.zakatAmount, { color: theme.primary }]}>
                ${zakatDue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </ThemedText>
            </View>
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
  infoCard: {
    flexDirection: "row",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    gap: Spacing.md,
    marginBottom: Spacing["2xl"],
  },
  infoContent: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  infoText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  inputCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
    gap: Spacing.md,
  },
  inputIcon: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContent: {
    flex: 1,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  inputLabelBengali: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  input: {
    width: 100,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.md,
    fontSize: 16,
    fontFamily: "Poppins_500Medium",
    textAlign: "right",
  },
  nisabCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginTop: Spacing.xl,
    ...Shadows.sm,
  },
  nisabLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.sm,
  },
  nisabInput: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  calculateButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginTop: Spacing.xl,
    gap: Spacing.sm,
  },
  calculateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  resultCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginTop: Spacing.xl,
    ...Shadows.md,
  },
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  resultLabel: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  resultValue: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  divider: {
    height: 1,
    marginVertical: Spacing.md,
  },
  zakatBox: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    marginTop: Spacing.md,
  },
  zakatLabel: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.xs,
  },
  zakatAmount: {
    fontSize: 32,
    fontFamily: "Poppins_700Bold",
  },
});
