import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Pressable, TextInput, RefreshControl, Alert, Modal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown, FadeIn } from "react-native-reanimated";
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { Spacing, BorderRadius, Shadows } from "@/constants/theme";
import { getApiUrl } from "@/lib/query-client";

interface User {
  id: string;
  username: string;
  displayName: string | null;
  avatarUrl: string | null;
  lastActive?: string;
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  createdAt: string;
  sender: User;
}

type TabType = "friends" | "requests" | "add";

export default function FriendsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<TabType>("friends");
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [userIdInput, setUserIdInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFriend, setSelectedFriend] = useState<User | null>(null);
  const [showFriendModal, setShowFriendModal] = useState(false);

  useFocusEffect(
    useCallback(() => {
      if (user) {
        loadFriends();
        loadRequests();
      }
    }, [user])
  );

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

  const loadRequests = async () => {
    if (!user) return;
    try {
      const response = await fetch(new URL(`/api/friends/requests/${user.id}`, getApiUrl()).toString());
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.log("Error loading requests");
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadFriends(), loadRequests()]);
    setRefreshing(false);
  }, [user]);

  const searchUsers = async (query: string) => {
    if (!user || query.length < 2) {
      setSearchResults([]);
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        new URL(`/api/users/search?query=${encodeURIComponent(query)}&userId=${user.id}`, getApiUrl()).toString()
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.log("Error searching users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeTab === "add" && searchQuery.length >= 2) {
        searchUsers(searchQuery);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab]);

  const addFriendById = async () => {
    if (!user || !userIdInput.trim()) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    const friendId = userIdInput.trim();
    
    if (friendId === user.id) {
      Alert.alert("Error", "You cannot add yourself as a friend");
      return;
    }

    setLoading(true);
    try {
      const userResponse = await fetch(new URL(`/api/users/${friendId}`, getApiUrl()).toString());
      
      if (!userResponse.ok) {
        Alert.alert("User Not Found", "No user found with this ID. Please check and try again.");
        setLoading(false);
        return;
      }

      const response = await fetch(new URL("/api/friends/request", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: user.id, receiverId: friendId }),
      });

      if (response.ok) {
        setUserIdInput("");
        Alert.alert("Success", "Friend request sent!");
      } else {
        const data = await response.json();
        Alert.alert("Error", data.error || "Failed to send request");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send friend request");
    } finally {
      setLoading(false);
    }
  };

  const sendFriendRequest = async (receiverId: string) => {
    if (!user) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const response = await fetch(new URL("/api/friends/request", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ senderId: user.id, receiverId }),
      });

      if (response.ok) {
        setSearchResults(prev => prev.filter(u => u.id !== receiverId));
        Alert.alert("Success", "Friend request sent!");
      } else {
        const data = await response.json();
        Alert.alert("Error", data.error || "Failed to send request");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send request");
    }
  };

  const respondToRequest = async (requestId: string, accept: boolean) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    try {
      const response = await fetch(new URL("/api/friends/respond", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ requestId, accept }),
      });

      if (response.ok) {
        setRequests(prev => prev.filter(r => r.id !== requestId));
        if (accept) {
          loadFriends();
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to respond to request");
    }
  };

  const removeFriend = async (friendId: string) => {
    if (!user) return;
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    Alert.alert(
      "Remove Friend",
      "Are you sure you want to remove this friend?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          style: "destructive",
          onPress: async () => {
            try {
              const response = await fetch(
                new URL(`/api/friends/${user.id}/${friendId}`, getApiUrl()).toString(),
                { method: "DELETE" }
              );

              if (response.ok) {
                setFriends(prev => prev.filter(f => f.id !== friendId));
                setShowFriendModal(false);
                setSelectedFriend(null);
              }
            } catch (error) {
              Alert.alert("Error", "Failed to remove friend");
            }
          },
        },
      ]
    );
  };

  const openChat = (friend: User) => {
    setShowFriendModal(false);
    navigation.navigate("Chat", { friend });
  };

  const openChallenges = () => {
    navigation.navigate("Challenges");
  };

  const openFriendModal = (friend: User) => {
    setSelectedFriend(friend);
    setShowFriendModal(true);
  };

  const getInitials = (name: string | null, username: string): string => {
    const displayName = name || username;
    return displayName.slice(0, 2).toUpperCase();
  };

  const isOnline = (lastActive?: string): boolean => {
    if (!lastActive) return Math.random() > 0.5;
    const lastActiveDate = new Date(lastActive);
    const now = new Date();
    const diffMinutes = (now.getTime() - lastActiveDate.getTime()) / (1000 * 60);
    return diffMinutes < 5;
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.backgroundRoot, paddingHorizontal: Spacing.xl }]}>
        <View style={[styles.signInCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={[styles.iconCircle, { backgroundColor: theme.primary + "20" }]}>
            <Feather name="users" size={48} color={theme.primary} />
          </View>
          <ThemedText style={styles.emptyTitle}>Sign in to Connect</ThemedText>
          <ThemedText style={[styles.emptySubtitle, { color: theme.textSecondary, textAlign: "center" }]}>
            Create an account to find friends, chat, and compete in Islamic challenges together
          </ThemedText>
          <Pressable
            style={[styles.primaryButton, { backgroundColor: theme.primary }]}
            onPress={() => navigation.getParent()?.navigate("Login")}
          >
            <Feather name="log-in" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <ThemedText style={styles.primaryButtonText}>Sign In</ThemedText>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundRoot }]}>
      <ScrollView
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
        <Animated.View entering={FadeIn.duration(400)} style={[styles.userIdCard, { backgroundColor: theme.backgroundDefault }]}>
          <View style={styles.userIdHeader}>
            <Feather name="hash" size={18} color={theme.primary} />
            <ThemedText style={styles.userIdLabel}>Your User ID</ThemedText>
          </View>
          <ThemedText style={[styles.userId, { color: theme.text }]} selectable>
            {user.id}
          </ThemedText>
          <ThemedText style={[styles.userIdHint, { color: theme.textSecondary }]}>
            Share this ID with friends so they can add you
          </ThemedText>
        </Animated.View>

        <View style={styles.tabContainer}>
          {(["friends", "requests", "add"] as TabType[]).map((tab) => (
            <Pressable
              key={tab}
              onPress={async () => {
                await Haptics.selectionAsync();
                setActiveTab(tab);
              }}
              style={[
                styles.tab,
                { backgroundColor: activeTab === tab ? theme.primary : theme.backgroundDefault },
              ]}
            >
              <Feather
                name={tab === "friends" ? "users" : tab === "requests" ? "inbox" : "user-plus"}
                size={16}
                color={activeTab === tab ? "#FFFFFF" : theme.text}
              />
              <ThemedText
                style={[styles.tabText, { color: activeTab === tab ? "#FFFFFF" : theme.text }]}
              >
                {tab === "friends" ? `Friends (${friends.length})` : tab === "requests" ? `Requests${requests.length > 0 ? ` (${requests.length})` : ""}` : "Add Friend"}
              </ThemedText>
            </Pressable>
          ))}
        </View>

        <Pressable
          onPress={openChallenges}
          style={[styles.challengesBanner, { backgroundColor: theme.primary }]}
        >
          <Feather name="award" size={24} color="#FFFFFF" />
          <View style={styles.challengesBannerContent}>
            <ThemedText style={styles.challengesBannerTitle}>Islamic Challenges</ThemedText>
            <ThemedText style={styles.challengesBannerSubtitle}>Compete with friends in good deeds</ThemedText>
          </View>
          <Feather name="chevron-right" size={24} color="#FFFFFF" />
        </Pressable>

        {activeTab === "add" ? (
          <Animated.View entering={FadeInDown.duration(400)}>
            <View style={[styles.addByIdCard, { backgroundColor: theme.backgroundDefault }]}>
              <View style={styles.addByIdHeader}>
                <Feather name="at-sign" size={20} color={theme.primary} />
                <ThemedText style={styles.addByIdTitle}>Add by User ID</ThemedText>
              </View>
              <ThemedText style={[styles.addByIdHint, { color: theme.textSecondary }]}>
                Enter the User ID of the person you want to add
              </ThemedText>
              <View style={styles.addByIdInputRow}>
                <TextInput
                  style={[styles.userIdInputField, { backgroundColor: theme.backgroundRoot, color: theme.text }]}
                  placeholder="Enter User ID..."
                  placeholderTextColor={theme.textSecondary}
                  value={userIdInput}
                  onChangeText={setUserIdInput}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={addFriendById}
                  disabled={!userIdInput.trim() || loading}
                  style={[
                    styles.addByIdButton,
                    { backgroundColor: userIdInput.trim() ? theme.primary : theme.textSecondary + "40" },
                  ]}
                >
                  {loading ? (
                    <ThemedText style={styles.addByIdButtonText}>...</ThemedText>
                  ) : (
                    <Feather name="send" size={18} color="#FFFFFF" />
                  )}
                </Pressable>
              </View>
            </View>

            <ThemedText style={styles.orDivider}>OR</ThemedText>

            <View style={[styles.searchContainer, { backgroundColor: theme.backgroundDefault }]}>
              <Feather name="search" size={20} color={theme.textSecondary} />
              <TextInput
                style={[styles.searchInput, { color: theme.text }]}
                placeholder="Search by phone number..."
                placeholderTextColor={theme.textSecondary}
                value={searchQuery}
                onChangeText={setSearchQuery}
                keyboardType="phone-pad"
              />
              {searchQuery.length > 0 ? (
                <Pressable onPress={() => setSearchQuery("")}>
                  <Feather name="x" size={18} color={theme.textSecondary} />
                </Pressable>
              ) : null}
            </View>

            {searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <Animated.View key={result.id} entering={FadeInDown.delay(index * 50).duration(400)}>
                  <View style={[styles.friendCard, { backgroundColor: theme.backgroundDefault }]}>
                    <View style={[styles.avatar, { backgroundColor: theme.accent + "20" }]}>
                      <ThemedText style={[styles.avatarText, { color: theme.accent }]}>
                        {getInitials(result.displayName, result.username)}
                      </ThemedText>
                    </View>
                    <View style={styles.friendInfo}>
                      <ThemedText style={styles.friendName}>
                        {result.displayName || result.username}
                      </ThemedText>
                      <ThemedText style={[styles.friendUsername, { color: theme.textSecondary }]}>
                        @{result.username}
                      </ThemedText>
                    </View>
                    <Pressable
                      onPress={() => sendFriendRequest(result.id)}
                      style={[styles.addButton, { backgroundColor: theme.primary }]}
                    >
                      <Feather name="user-plus" size={16} color="#FFFFFF" />
                      <ThemedText style={styles.addButtonText}>Add</ThemedText>
                    </Pressable>
                  </View>
                </Animated.View>
              ))
            ) : searchQuery.length >= 2 && !loading ? (
              <View style={styles.emptyState}>
                <Feather name="search" size={48} color={theme.textSecondary} />
                <ThemedText style={[styles.emptyStateText, { color: theme.textSecondary }]}>
                  No users found for "{searchQuery}"
                </ThemedText>
              </View>
            ) : null}
          </Animated.View>
        ) : null}

        {activeTab === "friends" ? (
          friends.length > 0 ? (
            friends.map((friend, index) => (
              <Animated.View key={friend.id} entering={FadeInDown.delay(index * 50).duration(400)}>
                <Pressable
                  onPress={() => openFriendModal(friend)}
                  style={[styles.friendCard, { backgroundColor: theme.backgroundDefault }]}
                >
                  <View style={styles.avatarContainer}>
                    <View style={[styles.avatar, { backgroundColor: theme.primary + "20" }]}>
                      <ThemedText style={[styles.avatarText, { color: theme.primary }]}>
                        {getInitials(friend.displayName, friend.username)}
                      </ThemedText>
                    </View>
                    <View
                      style={[
                        styles.onlineIndicator,
                        { backgroundColor: isOnline(friend.lastActive) ? "#22C55E" : theme.textSecondary },
                      ]}
                    />
                  </View>
                  <View style={styles.friendInfo}>
                    <ThemedText style={styles.friendName}>
                      {friend.displayName || friend.username}
                    </ThemedText>
                    <View style={styles.friendMeta}>
                      <ThemedText style={[styles.friendUsername, { color: theme.textSecondary }]}>
                        @{friend.username}
                      </ThemedText>
                      <View style={styles.statusDot} />
                      <ThemedText style={[styles.statusText, { color: isOnline(friend.lastActive) ? "#22C55E" : theme.textSecondary }]}>
                        {isOnline(friend.lastActive) ? "Online" : "Offline"}
                      </ThemedText>
                    </View>
                  </View>
                  <View style={styles.friendActions}>
                    <Pressable
                      onPress={() => openChat(friend)}
                      style={[styles.iconButton, { backgroundColor: theme.primary + "15" }]}
                    >
                      <Feather name="message-circle" size={18} color={theme.primary} />
                    </Pressable>
                  </View>
                </Pressable>
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Feather name="users" size={48} color={theme.textSecondary} />
              <ThemedText style={[styles.emptyStateText, { color: theme.textSecondary }]}>
                No friends yet. Add friends using their User ID or search by username!
              </ThemedText>
            </View>
          )
        ) : null}

        {activeTab === "requests" ? (
          requests.length > 0 ? (
            requests.map((request, index) => (
              <Animated.View key={request.id} entering={FadeInDown.delay(index * 50).duration(400)}>
                <View style={[styles.requestCard, { backgroundColor: theme.backgroundDefault }]}>
                  <View style={[styles.avatar, { backgroundColor: theme.accent + "20" }]}>
                    <ThemedText style={[styles.avatarText, { color: theme.accent }]}>
                      {getInitials(request.sender.displayName, request.sender.username)}
                    </ThemedText>
                  </View>
                  <View style={styles.friendInfo}>
                    <ThemedText style={styles.friendName}>
                      {request.sender.displayName || request.sender.username}
                    </ThemedText>
                    <ThemedText style={[styles.friendUsername, { color: theme.textSecondary }]}>
                      @{request.sender.username}
                    </ThemedText>
                  </View>
                  <View style={styles.requestActions}>
                    <Pressable
                      onPress={() => respondToRequest(request.id, true)}
                      style={[styles.actionButton, { backgroundColor: "#22C55E" }]}
                    >
                      <Feather name="check" size={18} color="#FFFFFF" />
                    </Pressable>
                    <Pressable
                      onPress={() => respondToRequest(request.id, false)}
                      style={[styles.actionButton, { backgroundColor: "#EF4444" }]}
                    >
                      <Feather name="x" size={18} color="#FFFFFF" />
                    </Pressable>
                  </View>
                </View>
              </Animated.View>
            ))
          ) : (
            <View style={styles.emptyState}>
              <Feather name="inbox" size={48} color={theme.textSecondary} />
              <ThemedText style={[styles.emptyStateText, { color: theme.textSecondary }]}>
                No pending friend requests
              </ThemedText>
            </View>
          )
        ) : null}
      </ScrollView>

      <Modal
        visible={showFriendModal}
        animationType="slide"
        transparent
        onRequestClose={() => setShowFriendModal(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setShowFriendModal(false)}>
          <Pressable style={[styles.modalContent, { backgroundColor: theme.backgroundDefault }]} onPress={() => {}}>
            {selectedFriend ? (
              <>
                <View style={styles.modalHeader}>
                  <View style={styles.modalAvatarContainer}>
                    <View style={[styles.modalAvatar, { backgroundColor: theme.primary + "20" }]}>
                      <ThemedText style={[styles.modalAvatarText, { color: theme.primary }]}>
                        {getInitials(selectedFriend.displayName, selectedFriend.username)}
                      </ThemedText>
                    </View>
                    <View
                      style={[
                        styles.modalOnlineIndicator,
                        { backgroundColor: isOnline(selectedFriend.lastActive) ? "#22C55E" : theme.textSecondary },
                      ]}
                    />
                  </View>
                  <ThemedText style={styles.modalName}>
                    {selectedFriend.displayName || selectedFriend.username}
                  </ThemedText>
                  <ThemedText style={[styles.modalUsername, { color: theme.textSecondary }]}>
                    @{selectedFriend.username}
                  </ThemedText>
                  <View style={[styles.modalStatusBadge, { backgroundColor: isOnline(selectedFriend.lastActive) ? "#22C55E20" : theme.textSecondary + "20" }]}>
                    <View
                      style={[
                        styles.modalStatusDot,
                        { backgroundColor: isOnline(selectedFriend.lastActive) ? "#22C55E" : theme.textSecondary },
                      ]}
                    />
                    <ThemedText style={[styles.modalStatusText, { color: isOnline(selectedFriend.lastActive) ? "#22C55E" : theme.textSecondary }]}>
                      {isOnline(selectedFriend.lastActive) ? "Online" : "Offline"}
                    </ThemedText>
                  </View>
                </View>

                <View style={styles.modalActions}>
                  <Pressable
                    onPress={() => openChat(selectedFriend)}
                    style={[styles.modalActionButton, { backgroundColor: theme.primary }]}
                  >
                    <Feather name="message-circle" size={20} color="#FFFFFF" />
                    <ThemedText style={styles.modalActionButtonText}>Send Message</ThemedText>
                  </Pressable>

                  <Pressable
                    onPress={() => {
                      setShowFriendModal(false);
                      openChallenges();
                    }}
                    style={[styles.modalActionButton, { backgroundColor: theme.accent }]}
                  >
                    <Feather name="award" size={20} color="#FFFFFF" />
                    <ThemedText style={styles.modalActionButtonText}>Challenge</ThemedText>
                  </Pressable>

                  <Pressable
                    onPress={() => removeFriend(selectedFriend.id)}
                    style={[styles.modalActionButton, { backgroundColor: "#EF4444" }]}
                  >
                    <Feather name="user-minus" size={20} color="#FFFFFF" />
                    <ThemedText style={styles.modalActionButtonText}>Remove Friend</ThemedText>
                  </Pressable>
                </View>

                <Pressable
                  onPress={() => setShowFriendModal(false)}
                  style={[styles.modalCloseButton, { backgroundColor: theme.backgroundRoot }]}
                >
                  <ThemedText style={styles.modalCloseButtonText}>Close</ThemedText>
                </Pressable>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: Spacing["2xl"],
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
    marginTop: Spacing.xl,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  signInCard: {
    padding: Spacing["2xl"],
    borderRadius: BorderRadius["2xl"],
    alignItems: "center",
    width: "100%",
    ...Shadows.md,
  },
  iconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: Spacing.lg,
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadius.lg,
    width: "100%",
    marginBottom: Spacing.md,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadius.lg,
    width: "100%",
    borderWidth: 2,
  },
  secondaryButtonText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  userIdCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  userIdHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
    marginBottom: Spacing.sm,
  },
  userIdLabel: {
    fontSize: 14,
    fontFamily: "Poppins_600SemiBold",
  },
  userId: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.xs,
  },
  userIdHint: {
    fontSize: 11,
    fontFamily: "Poppins_400Regular",
  },
  tabContainer: {
    flexDirection: "row",
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  tab: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  tabText: {
    fontSize: 11,
    fontFamily: "Poppins_500Medium",
  },
  challengesBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
  },
  challengesBannerContent: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  challengesBannerTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  challengesBannerSubtitle: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  addByIdCard: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.lg,
    ...Shadows.sm,
  },
  addByIdHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  addByIdTitle: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  addByIdHint: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.md,
  },
  addByIdInputRow: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  userIdInputField: {
    flex: 1,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
  },
  addByIdButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  addByIdButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  orDivider: {
    textAlign: "center",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
    marginBottom: Spacing.lg,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.lg,
    gap: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
  },
  friendCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  requestCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.md,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.sm,
    ...Shadows.sm,
  },
  avatarContainer: {
    position: "relative",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  onlineIndicator: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  friendInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  friendName: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  friendMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xs,
  },
  friendUsername: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
  },
  statusDot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: "#9CA3AF",
  },
  statusText: {
    fontSize: 12,
    fontFamily: "Poppins_400Regular",
  },
  friendActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  requestActions: {
    flexDirection: "row",
    gap: Spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.xs,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: Spacing.md,
    paddingHorizontal: Spacing.lg,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalContent: {
    borderTopLeftRadius: BorderRadius["2xl"],
    borderTopRightRadius: BorderRadius["2xl"],
    padding: Spacing.xl,
    paddingBottom: 40,
  },
  modalHeader: {
    alignItems: "center",
    marginBottom: Spacing.xl,
  },
  modalAvatarContainer: {
    position: "relative",
    marginBottom: Spacing.md,
  },
  modalAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  modalAvatarText: {
    fontSize: 28,
    fontFamily: "Poppins_700Bold",
  },
  modalOnlineIndicator: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  modalName: {
    fontSize: 22,
    fontFamily: "Poppins_700Bold",
    marginBottom: Spacing.xs,
  },
  modalUsername: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    marginBottom: Spacing.md,
  },
  modalStatusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.full,
    gap: Spacing.xs,
  },
  modalStatusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  modalStatusText: {
    fontSize: 13,
    fontFamily: "Poppins_500Medium",
  },
  modalActions: {
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  modalActionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
    gap: Spacing.sm,
  },
  modalActionButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  modalCloseButton: {
    alignItems: "center",
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.lg,
  },
  modalCloseButtonText: {
    fontSize: 15,
    fontFamily: "Poppins_500Medium",
  },
});
