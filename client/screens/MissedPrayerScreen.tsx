import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Pressable, TextInput } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";

interface MissedPrayer {
  id: string;
  name: string;
  nameBengali: string;
  count: number;
}

interface QadaLog {
  date: string;
  prayer: string;
  count: number;
}

const STORAGE_KEY = "@missed_prayers";
const LOG_KEY = "@qada_log";

const INITIAL_PRAYERS: MissedPrayer[] = [
  { id: "fajr", name: "Fajr", nameBengali: "ফজর", count: 0 },
  { id: "dhuhr", name: "Dhuhr", nameBengali: "যোহর", count: 0 },
  { id: "asr", name: "Asr", nameBengali: "আসর", count: 0 },
  { id: "maghrib", name: "Maghrib", nameBengali: "মাগরিব", count: 0 },
  { id: "isha", name: "Isha", nameBengali: "ইশা", count: 0 },
  { id: "witr", name: "Witr", nameBengali: "বিতর", count: 0 },
];

export default function MissedPrayerScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [prayers, setPrayers] = useState<MissedPrayer[]>(INITIAL_PRAYERS);
  const [qadaLog, setQadaLog] = useState<QadaLog[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPrayer, setSelectedPrayer] = useState<string | null>(null);
  const [addCount, setAddCount] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const prayersData = await AsyncStorage.getItem(STORAGE_KEY);
      const logData = await AsyncStorage.getItem(LOG_KEY);
      if (prayersData) setPrayers(JSON.parse(prayersData));
      if (logData) setQadaLog(JSON.parse(logData));
    } catch (error) {
      console.log("Error loading missed prayer data");
    }
  };

  const saveData = async (newPrayers: MissedPrayer[], newLog: QadaLog[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newPrayers));
      await AsyncStorage.setItem(LOG_KEY, JSON.stringify(newLog));
    } catch (error) {
      console.log("Error saving missed prayer data");
    }
  };

  const addMissedPrayer = async (id: string, count: number) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newPrayers = prayers.map((p) =>
      p.id === id ? { ...p, count: p.count + count } : p
    );
    const prayer = prayers.find((p) => p.id === id);
    const newLog = [
      { date: new Date().toISOString(), prayer: prayer?.name || "", count },
      ...qadaLog.slice(0, 49),
    ];
    setPrayers(newPrayers);
    setQadaLog(newLog);
    saveData(newPrayers, newLog);
    setShowAddModal(false);
    setAddCount("");
    setSelectedPrayer(null);
  };

  const completePrayer = async (id: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const prayer = prayers.find((p) => p.id === id);
    if (prayer && prayer.count > 0) {
      const newPrayers = prayers.map((p) =>
        p.id === id ? { ...p, count: Math.max(0, p.count - 1) } : p
      );
      const newLog = [
        { date: new Date().toISOString(), prayer: prayer.name, count: -1 },
        ...qadaLog.slice(0, 49),
      ];
      setPrayers(newPrayers);
      setQadaLog(newLog);
      saveData(newPrayers, newLog);
    }
  };

  const totalMissed = prayers.reduce((sum, p) => sum + p.count, 0);

  const getPrayerColor = (id: string): string => {
    const colors: Record<string, string> = {
      fajr: "#F59E0B",
      dhuhr: "#3B82F6",
      asr: "#10B981",
      maghrib: "#EC4899",
      isha: "#6366F1",
      witr: "#8B5CF6",
    };
    return colors[id] || theme.primary;
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
        <View style={[styles.summaryCard, { backgroundColor: theme.primary }]}>
          <View style={styles.summaryIcon}>
            <Feather name="clock" size={32} color="#FFFFFF" />
          </View>
          <ThemedText style={styles.summaryLabel}>Total Qada Prayers</ThemedText>
          <ThemedText style={styles.summaryCount}>{totalMissed}</ThemedText>
          <ThemedText style={styles.summaryLabelBengali}>
            মোট কাজা নামাজ
          </ThemedText>
        </View>
      </Animated.View>

      <ThemedText style={styles.sectionTitle}>Missed Prayers</ThemedText>
      <ThemedText style={[styles.sectionSubtitle, { color: theme.textSecondary }]}>
        Track and complete your Qada prayers
      </ThemedText>

      {prayers.map((prayer, index) => (
        <Animated.View
          key={prayer.id}
          entering={FadeInDown.delay(100 + index * 50).duration(400)}
        >
          <View style={[styles.prayerCard, { backgroundColor: theme.backgroundDefault }]}>
            <View style={styles.prayerHeader}>
              <View
                style={[styles.prayerIcon, { backgroundColor: getPrayerColor(prayer.id) + "20" }]}
              >
                <Feather
                  name="sun"
                  size={20}
                  color={getPrayerColor(prayer.id)}
                />
              </View>
              <View style={styles.prayerInfo}>
                <ThemedText style={styles.prayerName}>{prayer.name}</ThemedText>
                <ThemedText style={[styles.prayerNameBengali, { color: theme.textSecondary }]}>
                  {prayer.nameBengali}
                </ThemedText>
              </View>
              <View style={styles.countBadge}>
                <ThemedText
                  style={[
                    styles.countText,
                    { color: prayer.count > 0 ? theme.error : theme.success },
                  ]}
                >
                  {prayer.count}
                </ThemedText>
              </View>
            </View>

            <View style={styles.prayerActions}>
              <Pressable
                onPress={() => {
                  setSelectedPrayer(prayer.id);
                  setShowAddModal(true);
                }}
                style={[styles.actionButton, { backgroundColor: theme.error + "15" }]}
              >
                <Feather name="plus" size={16} color={theme.error} />
                <ThemedText style={[styles.actionText, { color: theme.error }]}>
                  Add Missed
                </ThemedText>
              </Pressable>

              <Pressable
                onPress={() => completePrayer(prayer.id)}
                style={[
                  styles.actionButton,
                  {
                    backgroundColor: prayer.count > 0 ? theme.success + "15" : theme.backgroundSecondary,
                  },
                ]}
                disabled={prayer.count === 0}
              >
                <Feather
                  name="check"
                  size={16}
                  color={prayer.count > 0 ? theme.success : theme.textSecondary}
                />
                <ThemedText
                  style={[
                    styles.actionText,
                    { color: prayer.count > 0 ? theme.success : theme.textSecondary },
                  ]}
                >
                  Completed
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </Animated.View>
      ))}

      {showAddModal && selectedPrayer ? (
        <View style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.5)" }]}>
          <View style={[styles.modal, { backgroundColor: theme.backgroundDefault }]}>
            <ThemedText style={styles.modalTitle}>Add Missed Prayers</ThemedText>
            <ThemedText style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
              How many {prayers.find((p) => p.id === selectedPrayer)?.name} prayers did you miss?
            </ThemedText>

            <TextInput
              style={[styles.modalInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
              placeholder="Enter count"
              placeholderTextColor={theme.textSecondary}
              keyboardType="numeric"
              value={addCount}
              onChangeText={setAddCount}
              autoFocus
            />

            <View style={styles.modalButtons}>
              <Pressable
                onPress={() => {
                  setShowAddModal(false);
                  setAddCount("");
                  setSelectedPrayer(null);
                }}
                style={[styles.modalButton, { backgroundColor: theme.backgroundSecondary }]}
              >
                <ThemedText style={styles.modalButtonText}>Cancel</ThemedText>
              </Pressable>
              <Pressable
                onPress={() => addMissedPrayer(selectedPrayer, parseInt(addCount) || 1)}
                style={[styles.modalButton, { backgroundColor: theme.primary }]}
              >
                <ThemedText style={[styles.modalButtonText, { color: "#FFFFFF" }]}>
                  Add
                </ThemedText>
              </Pressable>
            </View>
          </View>
        </View>
      ) : null}

      {qadaLog.length > 0 ? (
        <>
          <ThemedText style={styles.sectionTitle}>Recent Activity</ThemedText>
          {qadaLog.slice(0, 10).map((log, index) => (
            <Animated.View
              key={index}
              entering={FadeInDown.delay(50 + index * 20).duration(400)}
            >
              <View style={[styles.logItem, { backgroundColor: theme.backgroundDefault }]}>
                <View
                  style={[
                    styles.logIcon,
                    { backgroundColor: log.count > 0 ? theme.error + "15" : theme.success + "15" },
                  ]}
                >
                  <Feather
                    name={log.count > 0 ? "plus" : "check"}
                    size={14}
                    color={log.count > 0 ? theme.error : theme.success}
                  />
                </View>
                <View style={styles.logInfo}>
                  <ThemedText style={styles.logText}>
                    {log.count > 0
                      ? `Added ${log.count} ${log.prayer}`
                      : `Completed 1 ${log.prayer}`}
                  </ThemedText>
                  <ThemedText style={[styles.logDate, { color: theme.textSecondary }]}>
                    {new Date(log.date).toLocaleDateString()}
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
            About Qada Prayers
          </ThemedText>
          <ThemedText style={[styles.infoText, { color: theme.textSecondary }]}>
            Qada prayers are missed obligatory prayers that must be made up. It is recommended to pray them as soon as possible.
          </ThemedText>
          <ThemedText style={[styles.infoTextBengali, { color: theme.textSecondary }]}>
            কাজা নামাজ হলো ফরজ নামাজ যা ছুটে গেছে এবং তা অবশ্যই আদায় করতে হবে।
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
  summaryCard: {
    padding: Spacing["2xl"],
    borderRadius: BorderRadius.xl,
    alignItems: "center",
    marginBottom: Spacing["2xl"],
  },
  summaryIcon: {
    marginBottom: Spacing.md,
  },
  summaryLabel: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  summaryCount: {
    color: "#FFFFFF",
    fontSize: 48,
    fontFamily: "Poppins_700Bold",
  },
  summaryLabelBengali: {
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
  prayerCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  prayerHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  prayerIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  prayerInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  prayerName: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  prayerNameBengali: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  countBadge: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  countText: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
  },
  prayerActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  actionText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    width: "90%",
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    ...Shadows.lg,
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.xs,
  },
  modalSubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.lg,
  },
  modalInput: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
    marginBottom: Spacing.lg,
  },
  modalButtons: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  modalButton: {
    flex: 1,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  modalButtonText: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  logItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  logIcon: {
    width: 28,
    height: 28,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  logInfo: {
    marginLeft: Spacing.md,
  },
  logText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  logDate: {
    fontSize: 11,
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
  infoText: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    lineHeight: 20,
  },
  infoTextBengali: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.xs,
  },
});
