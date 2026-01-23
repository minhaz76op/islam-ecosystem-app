import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Pressable, TextInput, RefreshControl, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

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
}

interface FriendRequest {
  id: string;
  senderId: string;
  receiverId: string;
  status: string;
  createdAt: string;
  sender: User;
}

type TabType = "friends" | "requests" | "search";

export default function FriendsScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { user } = useAuth();
  const navigation = useNavigation<any>();

  const [activeTab, setActiveTab] = useState<TabType>("friends");
  const [friends, setFriends] = useState<User[]>([]);
  const [requests, setRequests] = useState<FriendRequest[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadFriends();
      loadRequests();
    }
  }, [user]);

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
      if (activeTab === "search") {
        searchUsers(searchQuery);
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery, activeTab]);

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

  const openChat = (friend: User) => {
    navigation.navigate("Chat", { friend });
  };

  const openChallenges = () => {
    navigation.navigate("Challenges");
  };

  const getInitials = (name: string | null, username: string): string => {
    const displayName = name || username;
    return displayName.slice(0, 2).toUpperCase();
  };

  if (!user) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.backgroundRoot }]}>
        <Feather name="users" size={64} color={theme.textSecondary} />
        <ThemedText style={styles.emptyTitle}>Sign in to Connect</ThemedText>
        <ThemedText style={[styles.emptySubtitle, { color: theme.textSecondary }]}>
          Create an account to find friends and compete in Islamic challenges
        </ThemedText>
        <Pressable
          style={[styles.primaryButton, { backgroundColor: theme.primary }]}
          onPress={() => navigation.navigate("Settings", { screen: "Login" })}
        >
          <ThemedText style={styles.primaryButtonText}>Sign In</ThemedText>
        </Pressable>
      </View>
    );
  }

  return (
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
      <View style={styles.tabContainer}>
        {(["friends", "requests", "search"] as TabType[]).map((tab) => (
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
              name={tab === "friends" ? "users" : tab === "requests" ? "user-plus" : "search"}
              size={16}
              color={activeTab === tab ? "#FFFFFF" : theme.text}
            />
            <ThemedText
              style={[styles.tabText, { color: activeTab === tab ? "#FFFFFF" : theme.text }]}
            >
              {tab === "friends" ? "Friends" : tab === "requests" ? `Requests${requests.length > 0 ? ` (${requests.length})` : ""}` : "Search"}
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

      {activeTab === "search" ? (
        <View style={[styles.searchContainer, { backgroundColor: theme.backgroundDefault }]}>
          <Feather name="search" size={20} color={theme.textSecondary} />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Search users by name..."
            placeholderTextColor={theme.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />
          {searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery("")}>
              <Feather name="x" size={18} color={theme.textSecondary} />
            </Pressable>
          ) : null}
        </View>
      ) : null}

      {activeTab === "friends" ? (
        friends.length > 0 ? (
          friends.map((friend, index) => (
            <Animated.View key={friend.id} entering={FadeInDown.delay(index * 50).duration(400)}>
              <Pressable
                onPress={() => openChat(friend)}
                style={[styles.friendCard, { backgroundColor: theme.backgroundDefault }]}
              >
                <View style={[styles.avatar, { backgroundColor: theme.primary + "20" }]}>
                  <ThemedText style={[styles.avatarText, { color: theme.primary }]}>
                    {getInitials(friend.displayName, friend.username)}
                  </ThemedText>
                </View>
                <View style={styles.friendInfo}>
                  <ThemedText style={styles.friendName}>
                    {friend.displayName || friend.username}
                  </ThemedText>
                  <ThemedText style={[styles.friendUsername, { color: theme.textSecondary }]}>
                    @{friend.username}
                  </ThemedText>
                </View>
                <Pressable
                  onPress={() => openChat(friend)}
                  style={[styles.iconButton, { backgroundColor: theme.primary + "15" }]}
                >
                  <Feather name="message-circle" size={18} color={theme.primary} />
                </Pressable>
              </Pressable>
            </Animated.View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <Feather name="users" size={48} color={theme.textSecondary} />
            <ThemedText style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              No friends yet. Search for users to connect!
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
                    style={[styles.actionButton, { backgroundColor: theme.success }]}
                  >
                    <Feather name="check" size={18} color="#FFFFFF" />
                  </Pressable>
                  <Pressable
                    onPress={() => respondToRequest(request.id, false)}
                    style={[styles.actionButton, { backgroundColor: theme.error }]}
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

      {activeTab === "search" ? (
        searchResults.length > 0 ? (
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
        ) : searchQuery.length < 2 ? (
          <View style={styles.emptyState}>
            <Feather name="search" size={48} color={theme.textSecondary} />
            <ThemedText style={[styles.emptyStateText, { color: theme.textSecondary }]}>
              Enter at least 2 characters to search
            </ThemedText>
          </View>
        ) : null
      ) : null}
    </ScrollView>
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
  primaryButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadius.lg,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
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
    fontSize: 13,
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
  friendInfo: {
    flex: 1,
    marginLeft: Spacing.md,
  },
  friendName: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
  },
  friendUsername: {
    fontSize: 13,
    fontFamily: "Poppins_400Regular",
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
  },
});
