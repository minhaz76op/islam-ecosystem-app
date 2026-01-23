import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Pressable, TextInput, RefreshControl, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { getApiUrl } from "@/lib/query-client";

interface User {
  id: string;
  username: string;
  displayName: string | null;
}

interface Challenge {
  id: string;
  creatorId: string;
  opponentId: string;
  type: string;
  title: string;
  description: string | null;
  targetValue: number;
  creatorProgress: number;
  opponentProgress: number;
  status: string;
  startDate: string;
  endDate: string;
  creator: User;
  opponent: User;
}

const CHALLENGE_TYPES = [
  { id: "prayer_streak", name: "Prayer Streak", icon: "sun", description: "Complete daily prayers" },
  { id: "quran_reading", name: "Quran Reading", icon: "book", description: "Read pages of Quran" },
  { id: "tasbih_count", name: "Tasbih Count", icon: "repeat", description: "Complete dhikr counts" },
  { id: "dua_memorization", name: "Dua Memorization", icon: "heart", description: "Memorize new duas" },
  { id: "fasting", name: "Fasting", icon: "moon", description: "Complete fasting days" },
  { id: "charity", name: "Charity", icon: "gift", description: "Acts of charity" },
];

export default function ChallengesScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { user } = useAuth();

  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [friends, setFriends] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [targetValue, setTargetValue] = useState("7");
  const [challengeTitle, setChallengeTitle] = useState("");

  useEffect(() => {
    if (user) {
      loadChallenges();
      loadFriends();
    }
  }, [user]);

  const loadChallenges = async () => {
    if (!user) return;
    try {
      const response = await fetch(new URL(`/api/challenges/${user.id}`, getApiUrl()).toString());
      if (response.ok) {
        const data = await response.json();
        setChallenges(data);
      }
    } catch (error) {
      console.log("Error loading challenges");
    }
  };

  const loadFriends = async () => {
    if (!user) return;
    try {
      const response = await fetch(new URL(`/api/friends/${user.id}`, getApiUrl()).toString());
      if (response.ok) {
        const data = await response.json();
        setFriends(data);
      }
    } catch (error) {
      console.log("Error loading friends");
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadChallenges();
    setRefreshing(false);
  }, [user]);

  const createChallenge = async () => {
    if (!user || !selectedFriend || !selectedType || !challengeTitle || !targetValue) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    try {
      const response = await fetch(new URL("/api/challenges", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          creatorId: user.id,
          opponentId: selectedFriend.id,
          type: selectedType,
          title: challengeTitle,
          description: CHALLENGE_TYPES.find(t => t.id === selectedType)?.description,
          targetValue: parseInt(targetValue) || 7,
          endDate: endDate.toISOString(),
        }),
      });

      if (response.ok) {
        setShowCreateModal(false);
        resetCreateForm();
        loadChallenges();
      }
    } catch (error) {
      console.log("Error creating challenge");
    }
  };

  const respondToChallenge = async (challengeId: string, accept: boolean) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      await fetch(new URL("/api/challenges/respond", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ challengeId, accept }),
      });
      loadChallenges();
    } catch (error) {
      console.log("Error responding to challenge");
    }
  };

  const updateProgress = async (challengeId: string) => {
    if (!user) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const challenge = challenges.find(c => c.id === challengeId);
    if (!challenge) return;

    const isCreator = challenge.creatorId === user.id;
    const currentProgress = isCreator ? challenge.creatorProgress : challenge.opponentProgress;
    const newProgress = currentProgress + 1;

    try {
      await fetch(new URL("/api/challenges/progress", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          challengeId,
          oderId: user.id,
          progress: newProgress,
        }),
      });
      loadChallenges();
    } catch (error) {
      console.log("Error updating progress");
    }
  };

  const resetCreateForm = () => {
    setSelectedType(null);
    setSelectedFriend(null);
    setTargetValue("7");
    setChallengeTitle("");
  };

  const getProgressPercent = (current: number, target: number): number => {
    return Math.min((current / target) * 100, 100);
  };

  const getChallengeIcon = (type: string): string => {
    return CHALLENGE_TYPES.find(t => t.id === type)?.icon || "award";
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case "pending": return theme.warning;
      case "accepted": return theme.success;
      case "completed": return theme.primary;
      case "expired": return theme.error;
      default: return theme.textSecondary;
    }
  };

  const pendingChallenges = challenges.filter(c => c.status === "pending" && c.opponentId === user?.id);
  const activeChallenges = challenges.filter(c => c.status === "accepted");
  const completedChallenges = challenges.filter(c => c.status === "completed" || c.status === "expired");

  if (!user) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>Sign in to access challenges</ThemedText>
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
        contentContainerStyle={{
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing["2xl"],
          paddingHorizontal: Spacing.lg,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={theme.primary} />
        }
      >
        <View style={[styles.header, { backgroundColor: theme.primary }]}>
          <View>
            <ThemedText style={styles.headerTitle}>Islamic Challenges</ThemedText>
            <ThemedText style={styles.headerSubtitle}>
              Compete with friends in good deeds
            </ThemedText>
          </View>
          <Feather name="award" size={32} color="#FFFFFF" />
        </View>

        <Pressable
          onPress={() => setShowCreateModal(true)}
          style={[styles.createButton, { backgroundColor: theme.accent }]}
        >
          <Feather name="plus" size={20} color="#FFFFFF" />
          <ThemedText style={styles.createButtonText}>Create Challenge</ThemedText>
        </Pressable>

        {pendingChallenges.length > 0 ? (
          <>
            <ThemedText style={styles.sectionTitle}>Pending Invites</ThemedText>
            {pendingChallenges.map((challenge, index) => (
              <Animated.View key={challenge.id} entering={FadeInDown.delay(index * 50).duration(400)}>
                <View style={[styles.challengeCard, { backgroundColor: theme.backgroundDefault }]}>
                  <View style={styles.challengeHeader}>
                    <View style={[styles.challengeIcon, { backgroundColor: theme.warning + "20" }]}>
                      <Feather name={getChallengeIcon(challenge.type) as any} size={20} color={theme.warning} />
                    </View>
                    <View style={styles.challengeInfo}>
                      <ThemedText style={styles.challengeTitle}>{challenge.title}</ThemedText>
                      <ThemedText style={[styles.challengeFrom, { color: theme.textSecondary }]}>
                        From: {challenge.creator.displayName || challenge.creator.username}
                      </ThemedText>
                    </View>
                  </View>
                  <ThemedText style={[styles.challengeTarget, { color: theme.textSecondary }]}>
                    Target: {challenge.targetValue} | 7 days
                  </ThemedText>
                  <View style={styles.pendingActions}>
                    <Pressable
                      onPress={() => respondToChallenge(challenge.id, true)}
                      style={[styles.acceptButton, { backgroundColor: theme.success }]}
                    >
                      <Feather name="check" size={16} color="#FFFFFF" />
                      <ThemedText style={styles.actionButtonText}>Accept</ThemedText>
                    </Pressable>
                    <Pressable
                      onPress={() => respondToChallenge(challenge.id, false)}
                      style={[styles.declineButton, { backgroundColor: theme.error }]}
                    >
                      <Feather name="x" size={16} color="#FFFFFF" />
                      <ThemedText style={styles.actionButtonText}>Decline</ThemedText>
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            ))}
          </>
        ) : null}

        {activeChallenges.length > 0 ? (
          <>
            <ThemedText style={styles.sectionTitle}>Active Challenges</ThemedText>
            {activeChallenges.map((challenge, index) => {
              const isCreator = challenge.creatorId === user.id;
              const myProgress = isCreator ? challenge.creatorProgress : challenge.opponentProgress;
              const theirProgress = isCreator ? challenge.opponentProgress : challenge.creatorProgress;
              const opponent = isCreator ? challenge.opponent : challenge.creator;

              return (
                <Animated.View key={challenge.id} entering={FadeInDown.delay(index * 50).duration(400)}>
                  <View style={[styles.challengeCard, { backgroundColor: theme.backgroundDefault }]}>
                    <View style={styles.challengeHeader}>
                      <View style={[styles.challengeIcon, { backgroundColor: theme.success + "20" }]}>
                        <Feather name={getChallengeIcon(challenge.type) as any} size={20} color={theme.success} />
                      </View>
                      <View style={styles.challengeInfo}>
                        <ThemedText style={styles.challengeTitle}>{challenge.title}</ThemedText>
                        <ThemedText style={[styles.challengeVs, { color: theme.textSecondary }]}>
                          vs {opponent.displayName || opponent.username}
                        </ThemedText>
                      </View>
                      <Pressable
                        onPress={() => updateProgress(challenge.id)}
                        style={[styles.addProgressButton, { backgroundColor: theme.primary }]}
                      >
                        <Feather name="plus" size={18} color="#FFFFFF" />
                      </Pressable>
                    </View>

                    <View style={styles.progressSection}>
                      <View style={styles.progressRow}>
                        <ThemedText style={styles.progressLabel}>You</ThemedText>
                        <View style={[styles.progressBar, { backgroundColor: theme.backgroundSecondary }]}>
                          <View
                            style={[
                              styles.progressFill,
                              {
                                backgroundColor: theme.primary,
                                width: `${getProgressPercent(myProgress, challenge.targetValue)}%`,
                              },
                            ]}
                          />
                        </View>
                        <ThemedText style={styles.progressText}>
                          {myProgress}/{challenge.targetValue}
                        </ThemedText>
                      </View>
                      <View style={styles.progressRow}>
                        <ThemedText style={[styles.progressLabel, { color: theme.textSecondary }]}>
                          {opponent.displayName?.split(" ")[0] || opponent.username}
                        </ThemedText>
                        <View style={[styles.progressBar, { backgroundColor: theme.backgroundSecondary }]}>
                          <View
                            style={[
                              styles.progressFill,
                              {
                                backgroundColor: theme.accent,
                                width: `${getProgressPercent(theirProgress, challenge.targetValue)}%`,
                              },
                            ]}
                          />
                        </View>
                        <ThemedText style={[styles.progressText, { color: theme.textSecondary }]}>
                          {theirProgress}/{challenge.targetValue}
                        </ThemedText>
                      </View>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </>
        ) : null}

        {completedChallenges.length > 0 ? (
          <>
            <ThemedText style={styles.sectionTitle}>Past Challenges</ThemedText>
            {completedChallenges.slice(0, 5).map((challenge, index) => {
              const isCreator = challenge.creatorId === user.id;
              const myProgress = isCreator ? challenge.creatorProgress : challenge.opponentProgress;
              const theirProgress = isCreator ? challenge.opponentProgress : challenge.creatorProgress;
              const opponent = isCreator ? challenge.opponent : challenge.creator;
              const won = myProgress >= theirProgress && myProgress >= challenge.targetValue;

              return (
                <Animated.View key={challenge.id} entering={FadeInDown.delay(index * 50).duration(400)}>
                  <View style={[styles.pastChallengeCard, { backgroundColor: theme.backgroundDefault }]}>
                    <View style={[styles.statusBadge, { backgroundColor: won ? theme.success + "20" : theme.textSecondary + "20" }]}>
                      <Feather name={won ? "award" : "check"} size={14} color={won ? theme.success : theme.textSecondary} />
                      <ThemedText style={[styles.statusText, { color: won ? theme.success : theme.textSecondary }]}>
                        {won ? "Won" : "Completed"}
                      </ThemedText>
                    </View>
                    <ThemedText style={styles.pastChallengeTitle}>{challenge.title}</ThemedText>
                    <ThemedText style={[styles.pastChallengeVs, { color: theme.textSecondary }]}>
                      vs {opponent.displayName || opponent.username} | {myProgress} - {theirProgress}
                    </ThemedText>
                  </View>
                </Animated.View>
              );
            })}
          </>
        ) : null}

        {challenges.length === 0 ? (
          <View style={styles.emptyState}>
            <Feather name="award" size={64} color={theme.textSecondary} />
            <ThemedText style={[styles.emptyStateTitle, { color: theme.text }]}>
              No Challenges Yet
            </ThemedText>
            <ThemedText style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              Challenge your friends to compete in Islamic activities like prayer, Quran reading, and more!
            </ThemedText>
          </View>
        ) : null}
      </ScrollView>

      <Modal visible={showCreateModal} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={[styles.modal, { backgroundColor: theme.backgroundDefault }]}>
            <View style={styles.modalHeader}>
              <ThemedText style={styles.modalTitle}>Create Challenge</ThemedText>
              <Pressable onPress={() => { setShowCreateModal(false); resetCreateForm(); }}>
                <Feather name="x" size={24} color={theme.text} />
              </Pressable>
            </View>

            <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
              <ThemedText style={styles.modalLabel}>Challenge Type</ThemedText>
              <View style={styles.typeGrid}>
                {CHALLENGE_TYPES.map((type) => (
                  <Pressable
                    key={type.id}
                    onPress={() => setSelectedType(type.id)}
                    style={[
                      styles.typeCard,
                      {
                        backgroundColor: selectedType === type.id ? theme.primary + "20" : theme.backgroundSecondary,
                        borderColor: selectedType === type.id ? theme.primary : "transparent",
                      },
                    ]}
                  >
                    <Feather name={type.icon as any} size={24} color={selectedType === type.id ? theme.primary : theme.textSecondary} />
                    <ThemedText style={[styles.typeName, { color: selectedType === type.id ? theme.primary : theme.text }]}>
                      {type.name}
                    </ThemedText>
                  </Pressable>
                ))}
              </View>

              <ThemedText style={styles.modalLabel}>Challenge Title</ThemedText>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                placeholder="e.g., 7-Day Prayer Challenge"
                placeholderTextColor={theme.textSecondary}
                value={challengeTitle}
                onChangeText={setChallengeTitle}
              />

              <ThemedText style={styles.modalLabel}>Target (number to reach)</ThemedText>
              <TextInput
                style={[styles.modalInput, { backgroundColor: theme.backgroundSecondary, color: theme.text }]}
                placeholder="7"
                placeholderTextColor={theme.textSecondary}
                keyboardType="numeric"
                value={targetValue}
                onChangeText={setTargetValue}
              />

              <ThemedText style={styles.modalLabel}>Challenge Friend</ThemedText>
              {friends.length > 0 ? (
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.friendList}>
                  {friends.map((friend) => (
                    <Pressable
                      key={friend.id}
                      onPress={() => setSelectedFriend(friend)}
                      style={[
                        styles.friendChip,
                        {
                          backgroundColor: selectedFriend?.id === friend.id ? theme.primary : theme.backgroundSecondary,
                        },
                      ]}
                    >
                      <ThemedText style={[styles.friendChipText, { color: selectedFriend?.id === friend.id ? "#FFFFFF" : theme.text }]}>
                        {friend.displayName || friend.username}
                      </ThemedText>
                    </Pressable>
                  ))}
                </ScrollView>
              ) : (
                <ThemedText style={[styles.noFriendsText, { color: theme.textSecondary }]}>
                  Add friends first to challenge them
                </ThemedText>
              )}
            </ScrollView>

            <Pressable
              onPress={createChallenge}
              disabled={!selectedType || !selectedFriend || !challengeTitle}
              style={[
                styles.createChallengeButton,
                {
                  backgroundColor: selectedType && selectedFriend && challengeTitle ? theme.primary : theme.backgroundSecondary,
                },
              ]}
            >
              <ThemedText style={[styles.createChallengeButtonText, { color: selectedType && selectedFriend && challengeTitle ? "#FFFFFF" : theme.textSecondary }]}>
                Send Challenge
              </ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.xl,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 20,
    fontFamily: "Poppins_700Bold",
  },
  headerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  createButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  createButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.md,
    marginTop: Spacing.lg,
  },
  challengeCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.md,
    ...Shadows.sm,
  },
  challengeHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.md,
  },
  challengeIcon: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    justifyContent: "center",
    alignItems: "center",
  },
  challengeInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  challengeTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  challengeFrom: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  challengeVs: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  challengeTarget: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.md,
  },
  pendingActions: {
    flexDirection: "row",
    gap: Spacing.md,
  },
  acceptButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  declineButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  addProgressButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  progressSection: {
    gap: Spacing.sm,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
  },
  progressLabel: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    width: 60,
  },
  progressBar: {
    flex: 1,
    height: 8,
    borderRadius: BorderRadius.full,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: BorderRadius.full,
  },
  progressText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    width: 40,
    textAlign: "right",
  },
  pastChallengeCard: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: BorderRadius.full,
    gap: 4,
    marginBottom: Spacing.xs,
  },
  statusText: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },
  pastChallengeTitle: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  pastChallengeVs: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
  },
  emptyStateTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginTop: Spacing.lg,
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: Spacing.sm,
    paddingHorizontal: Spacing.xl,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modal: {
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    maxHeight: "90%",
    paddingBottom: Spacing["2xl"],
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: Spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
  },
  modalContent: {
    padding: Spacing.lg,
  },
  modalLabel: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
    marginBottom: Spacing.sm,
    marginTop: Spacing.md,
  },
  typeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.sm,
  },
  typeCard: {
    width: "31%",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    borderWidth: 2,
  },
  typeName: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
    marginTop: Spacing.xs,
    textAlign: "center",
  },
  modalInput: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  friendList: {
    flexDirection: "row",
    marginBottom: Spacing.lg,
  },
  friendChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.sm,
  },
  friendChipText: {
    fontSize: 14,
    fontFamily: "Poppins_500Medium",
  },
  noFriendsText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    paddingVertical: Spacing.lg,
  },
  createChallengeButton: {
    marginHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
  },
  createChallengeButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
});
