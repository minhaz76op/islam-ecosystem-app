import React, { useState, useEffect, useRef, useCallback } from "react";
import { View, StyleSheet, FlatList, Pressable, TextInput, ListRenderItem } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import Animated, { FadeIn } from "react-native-reanimated";
import { useRoute, useNavigation, RouteProp } from "@react-navigation/native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";

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

interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  read: boolean;
  createdAt: string;
}

type ChatRouteParams = {
  Chat: { friend: User };
};

export default function ChatScreen() {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();
  const { user } = useAuth();
  const route = useRoute<RouteProp<ChatRouteParams, "Chat">>();
  const navigation = useNavigation();
  const flatListRef = useRef<FlatList>(null);

  const friend = route.params?.friend;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sending, setSending] = useState(false);
  const pollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: friend?.displayName || friend?.username || "Chat",
    });
  }, [friend, navigation]);

  const loadMessages = useCallback(async () => {
    if (!user || !friend) return;

    try {
      const response = await fetch(
        new URL(`/api/messages/${user.id}/${friend.id}`, getApiUrl()).toString()
      );
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.log("Error loading messages");
    }
  }, [user, friend]);

  const markAsRead = useCallback(async () => {
    if (!user || !friend) return;

    try {
      await fetch(new URL("/api/messages/read", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: user.id, senderId: friend.id }),
      });
    } catch (error) {
      console.log("Error marking messages as read");
    }
  }, [user, friend]);

  useEffect(() => {
    loadMessages();
    markAsRead();

    pollIntervalRef.current = setInterval(() => {
      loadMessages();
    }, 3000);

    return () => {
      if (pollIntervalRef.current) {
        clearInterval(pollIntervalRef.current);
      }
    };
  }, [loadMessages, markAsRead]);

  const sendMessage = async () => {
    if (!user || !friend || !inputText.trim() || sending) return;

    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSending(true);

    const messageContent = inputText.trim();
    setInputText("");

    try {
      const response = await fetch(new URL("/api/messages", getApiUrl()).toString(), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          senderId: user.id,
          receiverId: friend.id,
          content: messageContent,
        }),
      });

      if (response.ok) {
        const newMessage = await response.json();
        setMessages(prev => [...prev, newMessage]);
      }
    } catch (error) {
      console.log("Error sending message");
      setInputText(messageContent);
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDateHeader = (dateString: string): string => {
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }
    return date.toLocaleDateString();
  };

  const renderMessage: ListRenderItem<Message> = ({ item, index }) => {
    const isOwnMessage = item.senderId === user?.id;
    const showDateHeader =
      index === 0 ||
      new Date(messages[index - 1].createdAt).toDateString() !== new Date(item.createdAt).toDateString();

    return (
      <Animated.View entering={FadeIn.duration(200)}>
        {showDateHeader ? (
          <View style={styles.dateHeader}>
            <ThemedText style={[styles.dateHeaderText, { color: theme.textSecondary }]}>
              {formatDateHeader(item.createdAt)}
            </ThemedText>
          </View>
        ) : null}
        <View style={[styles.messageRow, isOwnMessage ? styles.ownMessageRow : styles.otherMessageRow]}>
          <View
            style={[
              styles.messageBubble,
              isOwnMessage
                ? [styles.ownMessageBubble, { backgroundColor: theme.primary }]
                : [styles.otherMessageBubble, { backgroundColor: theme.backgroundDefault }],
            ]}
          >
            <ThemedText
              style={[styles.messageText, { color: isOwnMessage ? "#FFFFFF" : theme.text }]}
            >
              {item.content}
            </ThemedText>
            <ThemedText
              style={[
                styles.messageTime,
                { color: isOwnMessage ? "rgba(255,255,255,0.7)" : theme.textSecondary },
              ]}
            >
              {formatTime(item.createdAt)}
            </ThemedText>
          </View>
        </View>
      </Animated.View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Feather name="message-circle" size={48} color={theme.textSecondary} />
      <ThemedText style={[styles.emptyStateText, { color: theme.textSecondary }]}>
        No messages yet. Start the conversation!
      </ThemedText>
      <ThemedText style={[styles.emptyStateSubtext, { color: theme.textSecondary }]}>
        Assalamu Alaikum!
      </ThemedText>
    </View>
  );

  if (!friend) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: theme.backgroundRoot }]}>
        <ThemedText>No chat selected</ThemedText>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      behavior="padding"
      keyboardVerticalOffset={0}
    >
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessage}
        keyExtractor={(item) => item.id}
        inverted={messages.length > 0}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={[
          styles.messageList,
          { paddingTop: headerHeight + Spacing.md },
        ]}
        showsVerticalScrollIndicator={false}
      />

      <View style={[styles.inputContainer, { paddingBottom: insets.bottom || Spacing.md }]}>
        <View style={[styles.inputWrapper, { backgroundColor: theme.backgroundDefault }]}>
          <TextInput
            style={[styles.textInput, { color: theme.text }]}
            placeholder="Type a message..."
            placeholderTextColor={theme.textSecondary}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={1000}
          />
          <Pressable
            onPress={sendMessage}
            disabled={!inputText.trim() || sending}
            style={[
              styles.sendButton,
              {
                backgroundColor: inputText.trim() ? theme.primary : theme.backgroundSecondary,
              },
            ]}
          >
            <Feather name="send" size={18} color={inputText.trim() ? "#FFFFFF" : theme.textSecondary} />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
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
  messageList: {
    paddingHorizontal: Spacing.md,
    paddingBottom: Spacing.md,
    flexGrow: 1,
  },
  dateHeader: {
    alignItems: "center",
    marginVertical: Spacing.md,
  },
  dateHeaderText: {
    fontSize: 12,
    fontFamily: "Poppins_500Medium",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
  },
  messageRow: {
    marginVertical: Spacing.xs,
  },
  ownMessageRow: {
    alignItems: "flex-end",
  },
  otherMessageRow: {
    alignItems: "flex-start",
  },
  messageBubble: {
    maxWidth: "80%",
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    ...Shadows.sm,
  },
  ownMessageBubble: {
    borderBottomRightRadius: BorderRadius.sm,
  },
  otherMessageBubble: {
    borderBottomLeftRadius: BorderRadius.sm,
  },
  messageText: {
    fontSize: 15,
    fontFamily: "Poppins_400Regular",
    lineHeight: 22,
  },
  messageTime: {
    fontSize: 10,
    fontFamily: "Poppins_400Regular",
    marginTop: Spacing.xs,
    alignSelf: "flex-end",
  },
  inputContainer: {
    paddingHorizontal: Spacing.md,
    paddingTop: Spacing.sm,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: BorderRadius.xl,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xs,
    gap: Spacing.sm,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins_400Regular",
    maxHeight: 100,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.full,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 2,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: Spacing["3xl"],
  },
  emptyStateText: {
    fontSize: 14,
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
    marginTop: Spacing.md,
  },
  emptyStateSubtext: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    marginTop: Spacing.sm,
  },
});
